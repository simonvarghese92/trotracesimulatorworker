const axios = require("axios");
const config = require("../config");

const auth = {
    getAcessToken: async () => {
        const response = await axios.post(`${config.apiBaseURL}/auth`,{
            email: config.email,
            password: config.password
        });
    
        if(response.status === 200){
            //Successfully fetched authenticaion token
            if(response.data && response.data.token){
                return response.data.token;
            }else{
                console.log("Fetched auth token but response data missing.");
            }
        }else if(response.status === 401){
            console.log("Invalid credentials");
        }else if(response.status === 503){
            //Server is busy
            console.log("Server is busy!");
        }
    }
};

module.exports = auth;