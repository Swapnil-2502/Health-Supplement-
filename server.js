const express = require('express');
const http = require('http');
const path = require('path');
const nodemailer = require('nodemailer');

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
    const { fname, lname, email, cname, subject } = req.body;


    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'hajareswapnil.2502@gmail.com',
            pass: 'vnddrujectacaqsg'
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
        }else{
            console.log("Email send: ", info.response)
        }
    })
})

server.listen(port, function(){
    console.log("Starting Server on port: " + port)
})