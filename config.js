const config = {
    port: process.env.PORT || 3000,
    sessionSecret: "I3ry$Nk6TF7+artxnDS2zxB3c#xQx-@3fNP8-$",
    dbConnectionString: process.env.DB_CONNECTION_STRING || "mongodb://mongo:27017/trotracesimulator",
    apiBaseURL: process.env.API_BASE_URL || "http://35.207.169.147",
    email: process.env.EMAIL || "test@gmail.com",
    password: process.env.PASSWORD || "lTgAYaLP9jRs",
}

module.exports = config;