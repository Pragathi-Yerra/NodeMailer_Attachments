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
    user: '', //mailid
    pass: '' //password from app passwords
  }
});

app.get('/sendemail',upload.single('attachments'), async(req,res)=>{
   console.log("path is",req.file.path)
    var mailOptions = {
        from: 'nodemailer@gmail.com',
        to: '', //mailid
        subject: 'Sending Email using Node.js',
        text: 'That was easy!',
        html:'<h1>Hello wordl</h1>',
        attachments: [
            {
            filename : req.file.filename,
            path:req.file.path
            }
        ]
      };
      console.log("mailOptions",mailOptions)
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