const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
    path: path.resolve(__dirname, `.env.${process.env.NODE_ENV}`)
});

module.exports = {
    NODE_ENV : process.env.NODE_ENV || 'development',
    FRONTEND_SERVER : process.env.FRONTEND_SERVER || 'http://localhost:5173',
    SERVER_PORT : process.env.SERVER_PORT || 3000,
    IO_PORT : process.env.IO_PORT || 3001,
    MONGO_URL : process.env.MONGO_URL || undefined,
    JDOODLE_BASEURL: process.env.JDOODLE_BASEURL || 'https://api.jdoodle.com/v1/execute',
    JDOODLE_CLIENT_ID: process.env.JDOODLE_CLIENT_ID || undefined,
    JDOODLE_CLIENT_SECRET: process.env.JDOODLE_CLIENT_SECRET || undefined,
    LIGHTHOUSE_KEY: process.env.LIGHTHOUSE_KEY || undefined,
}