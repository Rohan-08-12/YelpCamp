// if(process.env.NODE_ENV!=="production"){
//     require("dotenv").config();
// }
require("dotenv").config();




const express=require("express");
const mongoose=require("mongoose");
const path=require("path");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");
const ExpressError=require('./utils/ExpressError');
const flash=require("connect-flash");
const session=require("express-session");
const passport=require("passport");
const LocalStrategy=require("passport-local");
const User=require("./models/user");
const mongooseSanitize=require("express-mongo-sanitize");
const helmet=require("helmet");

const MongoDBStore=require("connect-mongo")(session);

// Routes
const campgroundRoutes=require("./routes/campground");
const reviewRoutes=require("./routes/reviews");
const userRoutes=require("./routes/user");

const app=express();

const dbUrl=process.env.DATABASE_URL || process.env.DB_URL;

// const dbUrl="mongodb://localhost:27017/yelp_camp";

mongoose.connect(dbUrl);


const db=mongoose.connection;
db.on("error",console.error.bind(console,"connection error"));
db.once("open",()=>{
    console.log("Database connected");
});

// EJS
app.engine("ejs",ejsMate);
app.set("view engine","ejs");

app.set("views",path.join(__dirname,"views"));

// Body parser
app.use(express.urlencoded({extended:true}));

// to use put and delete ..
app.use(methodOverride("_method"));

app.use(express.static(path.join(__dirname,"public")));

app.use(mongooseSanitize({
    replaceWith:"_",
}));

// Session

const store=new MongoDBStore({
    mongooseConnection:mongoose.connection,
    secret:"thisshouldbeabettersecret!",
    touchAfter:24*60*60
});

store.on("error",function(e){
    console.log("SESSION STORE ERROR",e);
})

const sessionConfig={
    store,
    name:"session",
    secret:"thisshouldbeabettersecret!",
    resave:false,
    saveUninitialized:true,
    cookie:{
        httpOnly:true,
        // secure:true,
        expires:Date.now()+1000*60*60*24*7,
        maxAge:1000*60*60*24*7
    }
}

app.use(session(sessionConfig));

// Flash
app.use(flash());
// Flash middleware


app.use(helmet());


const scriptSrcUrls = [
    "https://stackpath.bootstrapcdn.com/",
    "https://api.tiles.mapbox.com/",
    "https://api.mapbox.com/",
    "https://kit.fontawesome.com/",
    "https://cdnjs.cloudflare.com/",
    "https://cdn.jsdelivr.net",
];
const styleSrcUrls = [
    "https://kit-free.fontawesome.com/",
    "https://stackpath.bootstrapcdn.com/",
    "https://api.mapbox.com/",
    "https://api.tiles.mapbox.com/",
    "https://fonts.googleapis.com/",
    "https://use.fontawesome.com/",
];
const connectSrcUrls = [
    "https://api.mapbox.com/",
    "https://a.tiles.mapbox.com/",
    "https://b.tiles.mapbox.com/",
    "https://events.mapbox.com/",
];
const fontSrcUrls = [];
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: [],
            connectSrc: ["'self'", ...connectSrcUrls],
            scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
            styleSrc: ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net", ...styleSrcUrls],
            styleSrcElem: ["'self'", "https://cdn.jsdelivr.net", ...styleSrcUrls], // Allow stylesheets from CDN
            workerSrc: ["'self'", "blob:"],
            objectSrc: [],
            imgSrc: [
                "'self'",
                "blob:",
                "data:",
                "https://res.cloudinary.com/do3zj2fls/", // Ensure it matches your Cloudinary account
                "https://images.unsplash.com/",
            ],
            fontSrc: ["'self'", ...fontSrcUrls],
        },
    })
);



// Passport

app.use(passport.initialize());
// Make sure it is after session .
// Passport session - > enable persistent login sessions.
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

// Serialize -- > how to store user in session.
passport.serializeUser(User.serializeUser());
// Deserialize -- > How to get that user out of session
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{    
    res.locals.currentUser=req.user;
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    next();
})


// Home

app.get("/",(req,res)=>{
    res.render("home");
});

// campground endpoints
app.use("/campgrounds",campgroundRoutes);
// review endpoints
app.use("/campgrounds/:id/reviews",reviewRoutes);
// user endpoints
app.use("/",userRoutes);


app.all('*',(req,res,next)=>{
    next(new ExpressError('Page not found',404));
})

// Error 
app.use((err,req,res,next)=>{
    const {statusCode = 500}=err;
    if(!err.message) err.message="Something went wrong";
    res.status(statusCode).render('error',{err});
})


app.listen(3000,()=>{
    console.log("server started at 3000")
});