const user = require("../models/client.js");
var serviceAccount = require("../yuktahanotifs-firebase-adminsdk-n8oul-d6c4a82482.json");
var admin = require("firebase-admin");
admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
function send(req,res,next){
    var options = {
        priority:"high",
        timeToLive:60*60*24
    };
    console.log(req.body);
    const fromId = req.body.fromAddress;
    const toId = req.body.toAddress;
    const msg = req.body.message;
    var payLoad = {
        data:{
            message:msg,
            fromId:fromId
        }
    }
    user.findOne({address:toId},(error,doc)=>{
        if (!error && doc){
            admin.messaging().sendToDevice(doc.token,payLoad,options)
                .then(function(response){
                    console.log(response);
                    return res.status(200).json({"error":false,"message":"Sent"});
                })
                .catch(function(error1){
                    console.log(error1);
                    return res.status(250).json({"error":true,"message":"Fail"});
                });
        }
        else if (!error) {
            return res.status(250).json({"error":true,"message":"Reciever not found"});
        }
        else {
            return res.status(250).json({"error":true,"message":"Fetch error"});
        }
    })
}
module.exports = send;
