const express       = require("express"),
      bodyParser    = require("body-parser"),
      mongoose      = require("mongoose"),
      passport      = require("passport"),
      LocalStrategy = require("passport-local"),
      app           = express();
      
const Campground = require("./models/campground"),
      Comment    = require("./models/comment"),
      User       = require("./models/user"),
      seedDb     = require("./seeds");
      
mongoose.connect("mongodb:/localhost/yelp_camp_version6");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

      

