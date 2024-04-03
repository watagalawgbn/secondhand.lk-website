const connection = require('../../Services/connection');

    async function adminLogout(req, res) {
        req.session.destroy(err => {
            if (err) {
                console.error("Error destroying session:", err);

                return res.status(500).json({ error: "Internal server error" });
            }
    
            
            res.status(200).json({ message: "Logout successful" });
        });
    }


module.exports = adminLogout;