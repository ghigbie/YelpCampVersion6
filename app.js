const express    = require("express"),
      app        = express(),
      bodyParser = require("body-parser"),
      mongoose   = require("mongoose"),
      passport   = require("passport");
      
     // LocalStrategy =
const Campground  = require("./modles/campground"),
      Comment     = require("./modles/comment"),
      seedDB      = require("./seeds");
        