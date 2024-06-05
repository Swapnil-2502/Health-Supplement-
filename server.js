const express = require('express');
const http = require('http');
const path = require('path');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const server = http.Server(app);
const port = 500;

app.set("port", port);
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve static HTML files
app.use(express.static(path.join(__dirname)));

app.post("/send_email", function(req,res){
    try{
        const { fname, lname, email, cname, subject } = req.body;


        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        })
    
        const mailOptions = {
            from: `${fname} ${lname} <${email}>`,
            to: `${email}`, // Replace with the client's email
            subject: 'New Contact Form Submission',
            text: `First Name: ${fname}\nLast Name: ${lname}\nEmail: ${email}\nCountry: ${cname}\nSubject: ${subject}`
          };
    
        transporter.sendMail(mailOptions, function(error,info){
            if(error){
                console.log(error)
            }else{
                console.log("Email send: ", info.response)
            }
        })
        res.json({ message: 'Email sent successfully' });
    }catch(error){
        console.error(error);
        res.status(500).json({ message: 'Error while sending the email' });
    }
   
})

app.post("/send_email_wholesale", function(req,res){
    const { fullname, mobilenumber, email, productsname } = req.body;


    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'hajareswapnil.2502@gmail.com',
            pass: 'vnddrujectacaqsg'
        }
    })

    const mailOptions = {
        from: `${fullname} <${email}>`,
        to: `${email}`, // Replace with the client's email
        subject: 'New Contact Form Submission',
        text: `First Name: ${fullname}\nMobile Number: ${mobilenumber}\nEmail: ${email}\nProduct Names: ${productsname}`
      };

    transporter.sendMail(mailOptions, function(error,info){
        if(error){
            console.log(error)
            res.status(500).json({message: 'Error while sending the email'});
        }else{
            console.log("Email send: ", info.response)
            res.status(200).json({message: 'Email sent successfully'});
        }
    })

    
})

server.listen(port, function(){
    console.log("Starting Server on port: " + port)
})