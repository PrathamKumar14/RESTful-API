// jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/wikiDB", {useNewUrlParser: true, useUnifiedTopology: true});

const articleSchema = {
  title: String,
  content: String
};

const Article = mongoose.model("Article", articleSchema);

app.get("/articles", function(req, res){
  Article.find({}, function(err, foundArticles){
    if(!err){
      res.send(foundArticles);
    }
    else{
      res.send(err);
    }
  });
});

app.post("/articles", function(req, res){
  const newArticle = new Article({
    title: req.body.title,
    content: req.body.content
  });

  newArticle.save(function(err){
    if(!err){
      res.send("Successful");
    }
    else{
      res.send(err);
    }
  });
});

app.listen(3000, function(){
  console.log("server started at port 3000");
});
