const express = require('express');
const router = express.Router();
const User = require('../models/UserModel').User;
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const defaultControllers = require('../controllers/defaultControllers');
router.all('/*',(req,res,next) => {
    req.app.locals.layout = 'default';
    next();
})
/*--Index---*/
router.route('/')
    .get(defaultControllers.index);

    //Defining Local Strategy

    passport.use(new LocalStrategy({
        usernameField : 'email',
        passReqToCallback: true
    }, (req, email, password, done ) => {
        User.findOne({email : email}).then( user => {
            if (!user) {
                return done(null,false,req.flash('error-message','User not found with this email'));
            }

            bcrypt.compare(password, user.password, ( err, passwordMatched) => {
                if (err) {
                    return err;
                }

                if(!passwordMatched) {
                    return done(null,false, req.flash('error-message','Invalid username or Password'));
                }

                return done(null, user, req.flash('success-message','Login Successful')); 
            })
        })
    }));
    passport.serializeUser(function(user, done) {
        done(null, user.id);
      });
      
      passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
          done(err, user);
        });
      });
/*--Login---*/
router.route('/login')
    .get(defaultControllers.loginGet)
    .post(passport.authenticate('local', {
        successRedirect : '/',
        failureRedirect : '/login',
        failureFlash : true,
        successFlash: true,
        session : true
    }),defaultControllers.loginPost);
/*--LOGOUT---*/

router.route('/logout')
    .get(defaultControllers.LogOutPost);

/*--Register---*/
router.route('/register')
    .get(defaultControllers.registerGet)
    .post(defaultControllers.registerPost);

/*------------Single Page Film--------------*/

router.route('/single/:id')
    .get(defaultControllers.getSingle);
    

/*------------SHOW TIME : SUAT CHIEU--------------*/

router.route('/showtime/:id')
    .get(defaultControllers.Getshowtime);

/*------------Infomation : Thong tin-------------*/
router.route('/infomation/:id')
    .get(defaultControllers.infomation)
    .post(defaultControllers.PostInfomation);
module.exports = router;
