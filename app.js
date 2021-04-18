const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const axios = require("axios");
const mongoose = require("mongoose");
const auth = require("./middlewares/auth");
const config = require("./config");
const Event = require("./models/event");

const app =  express();
let sess = {
    resave: true,
    saveUninitialized: true,
    secret: config.sessionSecret,
    cookie: { secure: true}
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.set("trust proxy", true);
app.use(session(sess));

const establishDBConnection = async () => {
    try {
        await mongoose.connect(config.dbConnectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        return true;
    } catch (error) {
        console.log("Mongo DB connection error", error);
        return false;
    }
};

const subscribe = async () => {
    try {
        // Request to results API route
        let response = await axios.get(`${config.apiBaseURL}/results`, {
            headers: { Authorization: `Bearer ${session.accessToken}`}
        });

        if(response.status === 200){
            //Saving event in DB
            Event.create(response.data, (err, event) => {
                if(err) console.log("Error in saving event!", err);
                console.log("Event saved!", event);
            });

            //Re-Subscribing to server events
            subscribe();
        }else if(response.status === 204){
            console.log("Request timed out! Re-subscribing..");

            //Re-Subscribing to server events
            subscribe();
        } 
    } catch (error) {
        if(response.status === 401){
            console.log("Auth token expired or missing!");

            //Regenerating access token
            session.accessToken = await auth.getAcessToken();
            //Re-Subscribing to server events
            subscribe();
        }else{
            console.log("Something went wrong with subscribe function!", error);
        }
    }
};

const runWorker = async () => {
    console.log("Worker is running..");
    
    //Generating access token
    session.accessToken = await auth.getAcessToken();

    //Subscribing to server events
    subscribe();
};

app.listen(config.port, async () => {
    console.log(`Trot race simulator subscribed worker started on port ${config.port}`);
    
    //Establishing database connection
    const dbConnected = await establishDBConnection();

    if(dbConnected){
        //Starting worker
        runWorker();
    }
});