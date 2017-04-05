const express       = require("express"),
      app           = express(),
      bodyParser    = require("body-parser"),
      mongoose      = require("mongoose"),
      passport      = require("passport"),
      LocalStrategy = require("passport-local");
      
const Campground  = require("./models/campground"),
      Comment     = require("./models/comment"),
      User        = require("./models/user"),
      seedDB      = require("./seeds");
        
mongoose.connect("mongodb://localhost/yelp_camp_v6");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

seedDB();

app.get("/", (req, res) =>{
    res.render("landing");
});

app.get("*", (req, res) => {
    res.render("notfound"); 
});

app.listen(process.env.PORT, process.env.IP, () => {
   console.log("Server is up and running!"); 
});