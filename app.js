const express = require("express");
const https=require("https");
const bodyParser=require("body-parser");

const app=express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
  res.sendFile(__dirname +"/index.html");
})

app.post("/",function(req,res){
 
const query=req.body.cityName;
const apiKey="ccbe1afe237e6be81a871a018bf5ae05";
const unit="metric";
const url="https://api.openweathermap.org/data/2.5/weather?q="+ query+"&appid="+ apiKey +"&units="+unit;

https.get(url,function(response){
  console.log(response.statusCode);

  response.on("data",function(data){
    const weatherData=JSON.parse(data);

    //const location=weatherData.name;
    const temp=weatherData.main.temp;
    const description=weatherData.weather[0].description;
    const icon=weatherData.weather[0].icon;
    const imageURL="https://openweathermap.org/img/wn/"+ icon +"@2x.png"
  
   
    res.write("<h1>the temperature in "+ query+" is "+temp+" degrees Celcious</h1>")
    res.write("<p>The weather is "+description+"</p>")
    res.write("<img src="+imageURL+">");
    res.send();
  })
});
})


app.listen(process.env.PORT ||3000,function(){
  console.log("server is running on port 3000");
})