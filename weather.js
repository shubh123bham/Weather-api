const express=require('express');
const https= require('https');
const bodyParser=require('body-parser');
const { urlencoded } = require('body-parser');

const app=express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    
    res.sendFile(__dirname+"/index.html");
    
    
});

app.post("/",function(req,res){
    var city=req.body.city;
    var url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=152d68aa8ef56133c4cb7d43cf91f5f4&units=metric";
   
    https.get(url, function(response){
        response.on("data",function(data)
        {
          var weather=JSON.parse(data).main.temp;
          var des=JSON.parse(data).weather[0].description;
          var iconId=JSON.parse(data).weather[0].icon;

          var img="http://openweathermap.org/img/wn/"+iconId+ "@2x.png";

          res.write("<p>The weather description is " +des+ "<p>");
          res.write("<h1>The weather tempreature is " +weather+ "</h1>");
          res.write("<img src=" +img+ ">");
          res.send();
        }
         );
    });
});

app.listen(3000, function(req,res){
    console.log("Server is running on the port 3000");
});

