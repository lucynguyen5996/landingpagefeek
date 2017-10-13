const express = require('express')
const app = express()
const path = require('path')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')
const credentials = require('./emailConfig.json')

app.use(express.static('public'));
app.use(favicon('public/favicon.png')); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.get('/', function (req, res) {
  res.sendFile(path.resolve(__dirname,'public/indexEN.html'));
});
/*app.get('/vi', function (req, res) {
  res.sendFile(path.resolve(__dirname,'public/indexVI.html'));
});*/

app.post('/contact',function(req,res){
  var transporter = nodemailer.createTransport({
    service:"Gmail",
    auth:{
      user: credentials.email,
      pass: credentials.password
    }
  });

  var mailOptions = {
    from: "gencrm.gcalls@gmail.com",
    to: "thuy.nguyen@intern.gcalls.co",
    subject: `Message from ${req.body.your_name} (${req.body.your_mail})- ${req.body.your_subject}`,
    generateTextFromHTML: true,
    html: `<p>You have a new message from ${req.body.your_name} with email: ${req.body.your_mail}</p>
        <b>Message content:</b>
        <p>${req.body.your_message}</p>
        <i>Thanks</i>`
  };
      var resp={};
  transporter.sendMail(mailOptions,function(error,response){
    if (error) {
      console.log(error);
      resp.error="Error!!!";
    } else {
      console.log(res);
      resp.text='Email sent!';
    }
    transporter.close();
    // console.log(resp);
    res.send(resp);
  })
})

app.listen(3030, function () {
  console.log('Example app listening on port 3030!')
})