const express = require('express');
const http = require('http');
const path = require('path');
const nodemailer = require('nodemailer');
const cors = require('cors')
require('dotenv').config();

const app = express();
const server = http.Server(app);
const port = 500;

app.set("port", port);
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

// Serve static files from the 'public' directory
//app.use(express.static(path.join(__dirname, 'public')));

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
            html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
            <h2 style="background-color: #65b840; color: white; padding: 10px 15px;">New Contact Form Submission</h2>
            <div style="padding: 15px; border: 1px solid #3c434d; border-radius: 5px; color: #3c434d">
                <p><strong>First Name:</strong> ${fname}</p>
                <p><strong>Last Name:</strong> ${lname}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Country:</strong> ${cname}</p>
                <p><strong>Subject:</strong> ${subject}</p>
            </div>
        </div>`
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
    try{
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
            subject: 'New Wholesale Form Submission',
            html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
            <h2 style="background-color: #65b840; color: white; padding: 10px 15px;">New Wholesale Form Submission</h2>
            <div style="padding: 15px; border: 1px solid #3c434d; border-radius: 5px; color: #3c434d">
                <p><strong>Full Name:</strong> ${fullname}</p>
                <p><strong>Mobile Number:</strong> ${mobilenumber}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Product Names:</strong> ${productsname}</p>
            </div>
        </div>`
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
    }catch(error){
        console.error(error);
        res.status(500).json({ message: 'Error while sending the email' });
    }
})

server.listen(port, function(){
    console.log("Starting Server on port: " + port)
})