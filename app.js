var express = require('express')
  , http = require('http');
var app = express();
var bodyParser = require("body-parser");
nodemailer = require("nodemailer");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));



app.get("/",function(req,res){
   res.render("form");
});

app.post("/postform",function(req,res){
	 const output = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>  
      <li>First Name: ${req.body.fname}</li>
      <li>Last Nmae: ${req.body.lname}</li>
      <li>Email: ${req.body.mail}</li>
      <li>Phone: ${req.body.phone}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.comment}</p>
  `;


     // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'sherlockwatsonb4@gmail.com', // generated ethereal user
        pass: '******'  // generated ethereal password
    },
    tls:{
      rejectUnauthorized:false
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
      from: '"Nodemailer check" <sherlockwatsonb4@gmail.com>', // sender address
      to: 'sankalps.singh.met17@itbhu.ac.in', // list of receivers
      subject: 'Node Contact Request', // Subject line
      text: 'Hello world?', // plain text body
      html: output // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);   
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
	  res.redirect("/");
  });
  });


app.listen(3000,function(){
   console.log("Server started!!!"); 
});
