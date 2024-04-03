const connection = require('../../Services/connection');


async function userchat(req, res){
    const sql = "SELECT * FROM secondhand.userchat;";

    connection.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Cant chat with user" });
        }

        if (result.length > 0) {
            return res.status(200).json({ status: 200, result });
        } else {
            return res.status(202).json({ message: "Data not found" });
        }
    });
}
module.exports = userchat