import mysql from "mysql";
import dotenv from "dotenv";

dotenv.config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD
})

connection.connect((err) => {
    if(err) {
        console.log("Error connecting: ", err);

        return;
    }

    console.log("Connecting database success!")
})

export default connection;