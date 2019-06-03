const {globalVariables} = require('./config/configuration');
const {selectOption} = require('./config/customFunction');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const hbs = require('express-handlebars');
const ejs = require('ejs');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const fileUpload = require('express-fileupload');
const passport = require('passport');
const app = express();


/*---Configure expresss----*/
app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.use(express.static(path.join(__dirname,'public')));


/* Configure Mongoose to COnnect to MongoDB */
const {mongoDB_URL,PORT} = require('./config/configuration');
mongoose.connect(mongoDB_URL)
    .then(response => {
        console.log('MongoDB connected successfully');
    }).catch(err => {
        console.log('MongoDB connected FAILD');
    });

/*-----Setup view Engine To Use Handlebars-------- */
app.set('view engine','ejs',{helpers : {select : selectOption}});
/*----------Setup method-OverRide-------- */
app.use(methodOverride('newMethod'));
/*-----Setup Flash and Session-------- */
app.use(session({
    secret : 'anysecret',
    saveUninitialized:true,
    resave : true,
}));

app.use(flash());

app.use(globalVariables);

app.use(fileUpload());

app.use(passport.initialize());
app.use(passport.session());
/*-------------------Routes------------------------*/
const defaultRoutes = require('./routes/defaultRoute');
const adminRoutes = require('./routes/adminRoute');

app.use('/',defaultRoutes);
app.use('/admin',adminRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});