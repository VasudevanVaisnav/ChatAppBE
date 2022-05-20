const user = require("../models/client.js");
function register(req,res,next){
    const fromId = req.body.fromAddress;
    user.findOne({address:fromId},(error,doc)=>{
        if (!error && doc){
            user.findOneAndUpdate({address:fromId},{$set:{token:req.body.token}},(error1,result)=>{
                if (!error1 && result){
                    res.status(200).json({"error":false,"message":"Updated"}); 
                }
                else{
                    return res.status(250).json({"error":true,"message":"Error Updating Data"});        
                }
            })
        }
        else if (!error){
            const data = new user({
                address:fromId,
                token:req.body.token
            });
            data.save().catch(err => {
                return res.status(250).json({"error":true,"message":"Register Failed"});
            }).then(result=>{
                console.log("Success");
                return res.status(200).json({"error":false,"message":"Ruccessfully Registered"});
            });
        }
        else{
            return res.status(250).json({"error":true,"message":"Error Fetching Data"});
        }
    })
}
module.exports = register;