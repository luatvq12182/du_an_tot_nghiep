import sql from "./../../config/database.js";

export const createNotification = (data) => {
    sql.query("INSERT INTO notifications SET ?", data, (err) => {
        if(err) throw err;
    })
}