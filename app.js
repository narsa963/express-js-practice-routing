//jshint esversion:6
const express=require("express");
const bodyParser =require("body-parser");
const request = require("request");
const https = require("https");

const app =express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
  res.sendFile(__dirname +"/Signup.html");
})
app.post("/", function(req, res){
  const firstName = req.body.fname
  const lastName = req.body.lname
  const email = req.body.email
  const data ={
      email_address:email,
      status:"subscribed",
      merge_fields:{
        FNAME:firstName,
        LNAME:lastName
      }
  }
  console.log(data);
  const jsonData = JSON.stringify(data);
  const url="https://us14.api.mailchimp.com/3.0/lists/b93787c038/members"
  const options={
    method:"POST",
    auth:"anystring:1740827be53d924825a45b9dbdd45014-us14"
  }
console.log(jsonData);
const request =  https.request(url, options, function(response){
    console.log(response);
    if(response.statusCode === 200){
      res.send("sucess");
    }else{
      res.send("there was an error")
    }
    response.on("data", function(data){
     console.log(JSON.parse(data));

    })
  });

  request.write(jsonData);
  request.end()


})

app.listen(3000, function(){
  console.log("server start is port on 3000");
})

//api
//1740827be53d924825a45b9dbdd45014-us14

//list ID
//b93787c038
