const connection = require('../../Services/connection');
async function banuser(req, res){
    console.log(req.body.id)

    const sql = "UPDATE `secondhand`.`reports` SET `ban_status` = 1  WHERE (`reportid` = ?);";

    connection.query (sql ,[req.body.id],(err, result) =>{
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "error updating" });
        }else {
        return res.status(200).json (result)
    }
    });

}
module.exports = banuser;