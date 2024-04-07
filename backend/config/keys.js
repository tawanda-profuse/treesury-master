require('dotenv').config(); // Load ENV variables

dbPassword = process.env.dbPassword;

module.exports = {
    mongoURI: dbPassword
};
