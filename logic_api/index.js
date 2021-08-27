const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

var DB = {
     
     stocks : [
          {
               id:1,
               ticker:"egie3",
               year:"2020",
               price: 110
          },
          {
               id:2,
               ticker:"wege3",
               year:"2019",
               price: 40
          },
          {
               id:3,
               ticker:"tsla3",
               year:"2021",
               price: 200
          },
          {
               id:4,
               ticker:"rail3",
               year:"2022",
               price: 5
          }
     ]
}

app.get("/stocks", (req, res)=>{
     res.statusCode = 200;
     res.json(DB.stocks);
});

app.get("/stock/:id", (req, res)=>{
     
     if(isNaN(req.params.id)){
          res.sendStatus(400);
     }else{

          var id = parseInt(req.params.id);

          var stock = DB.stocks.find(stock => stock.id == id);

          if(stock == undefined){
               res.sendStatus(404)
          }else{
               res.statusCode = 200;
               res.json(stock);
          }
     }
});

app.post("/stock",(req, res)=>{

     var {ticker, price, year} = req.body;

     DB.stocks.push({
          id:5,
          ticker,
          year,
          price
     });

     res.sendStatus(200);

});

app.delete("/stock/:id",(req, res)=>{

     if(isNaN(req.params.id)){
          res.sendStatus(400);
     }else{

          var id = parseInt(req.params.id);

          var stock = DB.stocks.findIndex(stock => stock.id == id);

          if(stock == -1){
               res.sendStatus(404);
          }else{
               DB.stocks.splice(stock,1);
               res.sendStatus(200);
          }
          
     }

});

app.put("/stock/:id",(req, res)=>{
     if(isNaN(req.params.id)){
          res.sendStatus(400);
     }else{

          var id = parseInt(req.params.id);

          var stock = DB.stocks.find(stock => stock.id == id);

          if(stock == undefined){
               res.sendStatus(404)
          }else{

               var {ticker, price, year} = req.body;

               if(ticker != undefined){
                    stock.ticker = ticker;
               }

               if(price != undefined){
                    stock.price = price;
               }

               if(year != undefined){
                    stock.year = year;
               }

               res.sendStatus(200);
          }
     }
});

app.listen(8080, ()=>{
     console.log("API in the air");
});