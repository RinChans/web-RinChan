const express = require('express');
const router =  express.Router();
const Admin  = require('../models/AdminModel.js').Admin;
const adminController = require('../controllers/adminControllers');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const {isAuthenticatedAdmin} = require('../config/customFunction');

router.all('/*',(req,res,next) => {
    req.app.locals.layout = 'admin';
    next();
})

/*--------Index Admin-----*/
router.route('/')
    .get(adminController.index);
    
    //getter login

    // passport.use( new LocalStrategy({
    //     usernameField : 'email',
    //     passReqToCallback : true
    // },(req,email,password,done) => {
    //     Admin.findOne({email : email}).then( admin => {
    //         if( !admin ){
    //             return done(null,false,req.flash('error-message','Admin not found with this Email'));
    //         }
    //         bcrypt.compare(password, admin.password, (err, passwordMatched) => {
    //             if(err)
    //                 return err;
                
    //             if(!passwordMatched) {
    //                 return done(null,false,req.flash('error-message','Invalid username or Password'));
    //             }
                
    //             return done(null,admin, req.flash('success-message','Login SuccessFuly'));
    //         })
    //     })
    // }));
    // passport.serializeUser(function(user, done) {
    //     done(null, user.id);
    //   });
      
<<<<<<< HEAD
    // passport.deserializeUser(function(id, done) {
    //     User.findById(id, function(err, user) {
    //       done(err, user);
    //     });
    // });
=======
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
          done(err, user);
        });
    });
>>>>>>> 3a2c671d82bdb3913390e8fec31e67262407053f

/*--------All Film-----*/
router.route('/film')
    .get(adminController.getFilms);
    

router.route('/film/create')
    .get(adminController.createFilms)
    .post(adminController.submitFilms);
    
router.route('/film/edit/:id')
    .get(adminController.editFilms)
    .put(adminController.editFilmSubmit);


router.route('/film/delete/:id')
    .delete(adminController.deleteFilms);

/*----------Category Routes------------*/
router.route('/category')
    .get(adminController.getCategory)
    .post(adminController.createCategory);

router.route('/category/:id')
    .delete(adminController.deleteCategory);


router.route('/category/edit/:id')
    .get(adminController.editCategoryRoute)
    .post(adminController.editCategoryFilmRoute);

/*----------ADMIN LOGIN AND RESGISTER------------*/
<<<<<<< HEAD
// router.route('/login')
//     .get(adminController.getLogin)
//     .post(passport.authenticate('local',{
//         successRedirect : '/admin',
//         failureRedirect : '/admin/login',
//         failureFlash : true,
//         successFlash: true,
//         session : true  
//     }),adminController.loginFilm);
=======
router.route('/login')
    .get(adminController.getLogin)
    .post(passport.authenticate('local',{
        successRedirect : '/admin',
        failureRedirect : '/admin/login',
        failureFlash : true,
        successFlash: true,
        session : true  
    }),adminController.loginFilm);
>>>>>>> 3a2c671d82bdb3913390e8fec31e67262407053f

router.route('/register')
    .get(adminController.getRegister)
    .post(adminController.registerFilm);

/*--------------CINEPLEX :  CUM RAP-----------------*/
router.route('/cineplex')
    .get(adminController.getCineplex);


router.route('/cineplex/create')
    .get(adminController.createCineplex)
    .post(adminController.SubmitCineplex);

router.route('/cineplex/delete/:id')
    .delete(adminController.deleteCineplex);


/*--------------CINEMA : RAP PHIM -----------------*/    

router.route('/cinema')
    .get(adminController.getCinema);

router.route('/cinema/create')
    .get(adminController.createCinema)
    .post(adminController.summitCinema);

router.route('/cinema/delete/:id')
    .delete(adminController.deleteCinema);


//-------------SHOWTIME : SUAT CHIEU--------------//

router.route('/showtime')
    .get(adminController.getShowtime);

router.route('/showtime/create')
    .get(adminController.createShowtime)
    .post(adminController.submitShowtime);
<<<<<<< HEAD
=======

>>>>>>> 3a2c671d82bdb3913390e8fec31e67262407053f

router.route('/showtime/delete/:id')
    .delete(adminController.deleteShowtime);

module.exports = router;