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
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate)); //User.authenticate comes is a method that comes with passport local mongoose
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", (req, res) =>{
    res.render("landing");
});

//INDEX - show all campgrounds
app.get("/campgrounds", (req, res) =>{
    Campground.find({}, (err, allCampgrounds) => {
        if(err){
            console.log("THERE WAS A PROBLEM - CAMPGROUNDS");
            console.log(err);
        }else{
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
        }
    });
});

//CREATE - add new campground to DB
app.post("/campgrounds", (req, res)=> {
    //get form data
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    //creates new campground
    var newCampground = {name: name, image: image, description: description};
    Campground.create(newCampground, (err, newlyCreated) => {
        if(err){
            console.log("THERE WAS AN ERROR - POST CAMPGROUNDS");
            console.log(err);
        }else{
            res.redirect("/campgrounds");
        }
    });
});
//NEW - show form to create a new campground
app.get("campgrounds/new", (req, res)=>{
   res.render("campgroounds/new"); 
});


//SHOW - shows more information about one campground - this needs to be positoned AFTER "/campgrounds/new"
app.get("/campgrounds/:id", (req, res) => {
   Campground.findById(req.params.id).populate("comments").exec((err, foundCampground) => {
       if(err){
           console.log("THERE WAS A PROBLEM - CAMPGROUNDS/:ID");
           console.log(err);
       }else{
           console.log(foundCampground);
           res.render("campgrounds/show", {campground: foundCampground});
       }
   }); 
});

// ======================
// COMMENTS ROUTE
// ======================
app.get("/campgrounds/:id/comments/new", (req, res) =>{
   //find campground by id
   Campground.findById(req.params.id, (err, campground) => {
       if(err){
           console.log(err);
       }else{
          res.render("comments/new", {campground: campground});
       }
   });
});

app.post("/campgrounds/:id/comments", (req, res) => {
    //lookup campground using ID
    Campground.findById(req.params.id, (err, campground) => {
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }else{
            console.log(req.body.commet);
            Comment.create(req.body.comment, (err, comment) => { //create a new comment
                if(err){
                    console.log(err);
                }else{
                    campground.comments.push(comment); //connect new commet to campground
                    campground.save();
                    res.redirect("/campgroounds/" + campground._id); //redirect campground show page
                }
            });
        }
    });
});


//=============
//AUTH ROUTES
//=============

//show register form
app.get("/register", (req, res) => {
   res.render("register"); 
});

app.get("*", (req, res) => {
    res.render("notfound"); 
});

app.listen(process.env.PORT, process.env.IP, () => {
   console.log("Server is up and running!"); 
});