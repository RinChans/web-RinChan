<<<<<<< HEAD
const Film = require('../models/FilmModel.js').Film;
const Showtime = require('../models/ShowtimeModel').Showtime;
=======
const Post = require('../models/FilmModel.js').Post;
>>>>>>> 3a2c671d82bdb3913390e8fec31e67262407053f
const User  = require('../models/UserModel.js').User;
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

module.exports = {
    index: (req, res) => {
       Film.find()
            .then(film =>{
                res.render('default/index', {Film : film});
            }).catch(err => {
                console.log(err);
            })
    },
    loginGet: (req,res) => {
        res.render('default/login');
    },
    loginPost : (req,res) =>{
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
    },
    registerGet : (req,res) => {
        res.render('default/register');
    },
    registerPost : (req,res) => {
        let errors = [];

        if(!req.body.fullname){
            errors.push({message : 'Fullname is mandaroty'});
        }
        if(!req.body.email){
            errors.push({message : 'Email is mandaroty'});
        }
        if(!req.body.phone){
            errors.push({message : 'Phone is mandaroty'});
        }
        if(!req.body.password !== req.body.passworConfig){
            errors.push({message : 'password do not match'});
        }

        if(errors.length < 0) {
            res.render('default/register', {
                errors: errors,
                fullname : req.body.fullname,
                email : req.body.email
            });
        }

        else {
            User.findOne({email : req.body.email}).then(user => {
                if (user) {
                    req.flash('error-message', `Email already exists, Try to login`);
                    res.redirect('/login');
                }
                else {
                    const newUser = new User(req.body);

                    bcrypt.genSalt(10, (err,salt) => {
                        bcrypt.hash(newUser.password, salt ,(err,hash) => {
                            newUser.password = hash;
                            bcrypt.hash(newUser.passworConfig,salt,(err,hash) => {
                                    newUser.passworConfig = hash;
                                    newUser.save().then(user => {
                                    req.flash('success-message', `You are now Registered`);
                                    res.redirect('/login');
                                });
                            })
                        });
                    });
                }
            });
        }
    },
    getSingle : (req,res) => {
        const id = req.params.id;
        Film.findById(id)
            .populate('cinema')
            .then(Film => {
                res.render('default/single', {film : Film});
                console.log(Film);
            })
    },
    Getshowtime : (req,res) => {
        const id = req.params.id ;
        Film.findById(id)
            .then(Film => {
                Showtime.find()
                    .populate('cinema')
                    .populate('film')
                    .then(Showtime => {
                        res.render('default/showtime/index', {Film : Film, Showtime : Showtime});
                    })
            })
    }
    
}