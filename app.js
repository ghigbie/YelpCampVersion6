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

//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Once again my dog is super cute!",
    resave: false,
    saveUnitialize: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate)); //User.authenticate comes is a method that comes with passport local mongoose

app.get("/", (req, res) =>{
    res.render("landing");
});

app.get("*", (req, res) => {
    res.render("notfound"); 
});

app.listen(process.env.PORT, process.env.IP, () => {
   console.log("Server is up and running!"); 
});