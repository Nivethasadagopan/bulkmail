const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json())

//install 
const nodemailer = require("nodemailer");

// Create a transporter using Ethereal test credentials.
// For production, replace with your actual SMTP server details.
const transporter = nodemailer.createTransport({
    service:"gmail",
  auth: {
    user: "nivethasadagopan83@gmail.com",
    pass: "gilz hsct ovbj xojz",
  },
});

// Send an email using async/await



app.get("/sendemail", function(req,res){
transporter.sendMail({
    from: "nivethasadagopan83@gmail.com",
    to: "nivethasadagopan83@gmail.com, Paishance.Bogart@InboxOrigin.com",
    subject: "Hello ✔",
    text: "Hello world?", // Plain-text version of the message
    html: "<b>Hello world?</b>", // HTML version of the message
  },
  function(error, info){
    if(error){
        console.log(error);
        res.send("error");
    }
    else{
        console.log("Email sent: " + info);
        res.send("Success")
    }
   });
    })
  

app.listen(5000, () => {
    console.log("Server is running on port 5000");
}
);

