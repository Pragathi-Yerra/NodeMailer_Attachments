var nodemailer = require('nodemailer');
const express = require('express')
const app = express()
const fs = require('fs')
app.use(express.json())
const multer = require('multer')
const storage = multer.diskStorage({
    destination : function(req,file,cb){
        if(!fs.existsSync(__dirname + '/uploads'))
        {
            fs.mkdirSync(__dirname+'/uploads')
        }
        cb(null,'./uploads')
    },
    filename : function(req,file,cb){
        cb(null, file.originalname)
    }
})
const upload = multer({storage:storage})
var transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port:'465',
  sender:'gmail',
  auth: {
    user: 'ysspragathi@gmail.com',
    pass: 'nlcfmckvnkgttnhc'
  }
});
app.get('/sendemail',upload.array('attachments'), (req,res)=>{
    let attachments = []
    for(var i=0;i<req.files.length;i++){
        let fileDetails ={
            filename : req.files[i].filename,
            path:req.files[i].path
        }
        attachments.push(fileDetails)
    }
    var mailOptions = {
        from: 'nodemailer@gmail.com',
        to: 'ysspragathi@gmail.com',
        subject: 'Sending Email using Node.js',
        text: 'That was easy!',
        html:'<h1>Hello wordl</h1>',
        attachments: attachments
      };
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
          res.send("something went wrong")
        } else {
            res.send({status:'ok',data:info})
          console.log('Email sent: ' + info.response);
        }
      });
})
app.listen(8080,()=>{
    console.log("connected to backend")
})