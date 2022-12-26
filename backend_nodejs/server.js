import dotenv from "dotenv";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

import cors from "cors";
import helmet from "helmet";
import compression from "compression"; 
import bodyParser from "body-parser";

import { createNotification } from "./app/utils/notification.js";
import sql from "./config/database.js";
import { NOTIFICATION_TYPE } from "./constants/index.js";

dotenv.config();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST
const ORIGIN_CLIENT = process.env.ORIGIN_CLIENT;

const app = express();
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(bodyParser.json());

const httpServer = createServer(app);

const io = new Server(httpServer, {
    path: "/sskpi/",
    cors: {
        origin: ORIGIN_CLIENT,
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {

    socket.on("push_notification", (data) => {
        // console.log("req", data);
        createNotification(data);

        io.emit("res_notification", data);

    })

})

httpServer.listen(PORT, HOST);

app.post("/api/node/notifications", (req, res) => {
    console.log(req.body);

    sql.query("SELECT * FROM notifications", (err, results, fields) => {
        if(err) throw err;
        
        const response = results
            .filter(item => Number(item.userCreated) !== req.body.id)
            .filter(item => NOTIFICATION_TYPE[item.type].indexOf(req.body.role) !== -1)
            .reverse();
            
        res.json(response);
    })
})

