const express=require("express");
const app=express();
const bodyParser=require("body-parser");
const https=require("https");

app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
res.sendFile(__dirname+"/index.html");


app.post("/",function(req,res){

 
 const query=req.body.cityName;
const apiKey="82adfa8600bf0f944f8e1e7d2cab4866";
const unit="metric";
const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;
https.get(url,function(response){
    console.log(response.statusCode);
 
       
        response.on("data",function(data){
            const weatherData=JSON.parse(data);
            const temp=weatherData.main.temp
            const weatherDescription=weatherData.weather[0].description
            const icon=weatherData.weather[0].icon
            const imageURL="http://openweathermap.org/img/wn/"+icon+"@2x.png";
            res.write("<p>The weather is currently"+weatherDescription+"</p>");
            res.write("<h1>The temp in "+query+" is "+temp+" degress in Celcius</h1>");
            res.write("<image src="+ imageURL+">")
        res.send()
        });
    });
});


    
});

app.listen(process.env.PORT || 3000, function(){
console.log("Server is running in port 3000")
});