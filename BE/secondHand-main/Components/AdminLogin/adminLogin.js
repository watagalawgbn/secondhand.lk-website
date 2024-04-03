const connection = require('../../Services/connection');

async function adminLogin(req, res) {
    console.log(req.body.email)
    const sql = "SELECT * FROM adminData WHERE email = ? AND password = ?";
    
    connection.query(sql, [req.body.email, req.body.password], (err, result) => {
        if (err) {
            console.error("Error executing SQL query:", err);
            return res.status(500).json({ error: "Internal server error" });
        }
        
        if (result.length > 0) {

            return res.status(200).json({ status: 200 });
        } else {
            return res.status(201).json({ status: 201, message: "Admin Not Found." });
        }
    });
}


module.exports = adminLogin;
