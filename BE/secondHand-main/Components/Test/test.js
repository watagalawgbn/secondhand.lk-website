//__________________Test function__________________



module.exports = async function test(req, res){
    return res.status(200).json({message: "Test function works!"});
}