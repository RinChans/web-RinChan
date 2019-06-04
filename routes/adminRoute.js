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

    passport.use( new LocalStrategy({
        usernameField : 'email',
        passReqToCallback : true
    },(req,email,password,done) => {
        Admin.findOne({email : email}).then( admin => {
            if( !admin ){
                return done(null,false,req.flash('error-message','Admin not found with this Email'));
            }
            bcrypt.compare(password, admin.password, (err, passwordMatched) => {
                if(err)
                    return err;
                
                if(!passwordMatched) {
                    return done(null,false,req.flash('error-message','Invalid username or Password'));
                }
                
                return done(null,admin, req.flash('success-message','Login SuccessFuly'));
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

/*--------All Post-----*/
router.route('/posts')
    .get(adminController.getPosts);
    

router.route('/posts/create')
    .get(adminController.createPosts)
    .post(adminController.submitPosts);
    
router.route('/posts/edit/:id')
    .get(adminController.editPosts)
    .put(adminController.editPostSubmit);


router.route('/posts/delete/:id')
    .delete(adminController.deletePosts);

/*----------Category Routes------------*/
router.route('/category')
    .get(adminController.getCategory)
    .post(adminController.createCategory);

router.route('/category/:id')
    .delete(adminController.deleteCategory);


router.route('/category/edit/:id')
    .get(adminController.editCategoryRoute)
    .post(adminController.editCategoryPostRoute);

/*----------ADMIN LOGIN AND RESGISTER------------*/
router.route('/login')
    .get(adminController.getLogin)
    .post(passport.authenticate('local',{
        successRedirect : '/admin',
        failureRedirect : '/admin/login',
        failureFlash : true,
        successFlash: true,
        session : true  
    }),adminController.loginPost);

router.route('/register')
    .get(adminController.getRegister)
    .post(adminController.registerPost);


module.exports = router;