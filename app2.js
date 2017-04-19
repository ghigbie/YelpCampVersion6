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
seedDb();      

//PASSPORT CONFIGURATION
app.use(require("express-session")({
      secret: "Dogs are very awesome",
      resave: false,
      saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", (req, res) => {
      res.render("landing");
});

app.get("*", (req, res) => {
      res.render("notfound");
});

app.listen(process.env.PORT, process.env.IP, () => {
   console.log("Server is listening...");   
});
