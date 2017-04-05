const express       = require("express"),
      app           = express(),
      bodyParser    = require("body-parser"),
      mongoose      = require("mongoose"),
      passport      = require("passport"),
      LocalStrategy = require("passport-local");
      
const Campground  = require("./modles/campground"),
      Comment     = require("./modles/comment"),
      User        = require("./models/user"),
      seedDB      = require("./seeds");
        