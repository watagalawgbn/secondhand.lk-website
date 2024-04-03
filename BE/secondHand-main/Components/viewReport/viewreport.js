const connection = require('../../Services/connection');


async function viewreport(req, res){
    const sql = "SELECT * FROM secondhand.reports WHERE ban_status = 0;";

    // Assuming 'connection' object is already defined elsewhere in your code
    connection.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Error in getting vehicle data" });
        }

        if (result.length > 0) {
            return res.status(200).json({ status: 200, result });
        } else {
            return res.status(202).json({ message: "Data not found" });
        }
    });
}

module.exports = viewreport