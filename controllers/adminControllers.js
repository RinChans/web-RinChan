
const Film = require('../models/FilmModel').Film;
const Admin = require('../models/AdminModel').Admin;
const Category = require('../models/CategoryModel').Category;
const Cineplex = require('../models/CineplexModel').Cineplex;
const Cinema = require('../models/CinemaModel').Cinema;
const Showtime = require('../models/ShowtimeModel').Showtime;
const {isEmpty} = require('../config/customFunction');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

module.exports = {
    index : (req,res) => {
        res.render('admin/index');
    },
    getFilms: (req,res) => {
        Film.find()
            .populate('cinema')
            .then(Films => {
                res.render('admin/film/index',{Films : Films});
            }).catch(err => {
                console.log(err);
            });
    },
    submitFilms : (req,res) => {
        // Check file : Uploads
        let fileName = '';
        console.log(req.files);
        if(!isEmpty(req.files)) {
            const file = req.files.uploadFile;
            fileName = file.name;
            const uploadDir = 'public/uploads';

            file.mv(uploadDir+"/"+fileName, (err) => {
                if (err) {
                    throw err; 
                }
            })
        }
        const newFilm = new Film({
            title : req.body.title,
            cinema : req.body.cinema,
            primiereDate : req.body.primiereDate,
            file :`/uploads/${fileName}`,
            time : req.body.time,
            trailer : req.body.trailer,
            creationDate : Date.now()
        });
        newFilm.save()
            .then(Film => {
                req.flash('success-message','Film created successfully');
                res.redirect('/admin/film'); 
            }).catch(err => {
                console.log(err);
            })
    },
    createFilms : (req,res) => {
        Cinema.find()
            .populate('cinema')
            .then(cinema => {
                res.render('admin/film/create',{Cinema : cinema});
            }).catch(err => {
                console.log(err);
            });
    },
    editFilms : (req,res) => {
        const id = req.params.id;

        Film.findById(id)
            .then(Films => {
               Category.find()
                    .then(cats => {
                        res.render('admin/film/edit',{Films : Films , Category : cats});
                    });
            }).catch(err => {
                console.log(err);
            });
    },
    editFilmSubmit : (req,res) => {
        const commentAllow = req.body.allowComment ? true : false;

        const id = req.params.id;
        Film.findById(id)
            .then(Film => {
                Film.title = req.body.title;
                Film.status = req.body.status;
                Film.allowComment = commentAllow;
                Film.description = req.body.description;
                Film.category = req.body.category;

                Film.save()
                    .then(updateFilm => {
                        req.flash('success-message',`The Film ${updateFilm.title} has been updated `);
                        res.redirect('/admin/film');
                    })
            })
    },
    deleteFilms : (req,res) => {
        const id = req.params.id;
        Film.findByIdAndDelete(id)
            .then(deleteFilm => {
                req.flash('success-message',`The Film ${deleteFilm.title} has been deleted`);
                res.redirect('/admin/film');
            })
    },
    getCategory : (req,res) => {
        Category.find()
            .then(cats => {
                res.render('admin/category/index',{Category : cats});
            })
    },
    createCategory : (req,res) => {
        const CategoryName = req.body.name;
        
        if(CategoryName){
            const newCategory = new Category({
                title : CategoryName
            });
            newCategory.save()
                .then(category => {
                    res.status(200).json(category);
                })
        }
    },
    deleteCategory : (req,res) =>{
        const id = req.params.id;
        Category.findByIdAndDelete(id)
            .then(deleteCategory => {
                req.flash('success-message',`The category ${deleteCategory.title} has been deleted`);
                res.redirect('/admin/category');
            })
    },
    editCategoryRoute : async (req,res) => {
        const catID = req.params.id;
        const cats = await Category.find();

        Category.findById(catID)
            .then(cat => {
                res.render('admin/category/edit',{Categorys : cat, Category : cats});
            })
    },
    editCategoryFilmRoute : (req,res) => {
        const catID = req.params.id;
        const newTitle = req.body.name;
        
        if(newTitle){
            Category.findById(catID).then(category => {
                category.title = newTitle;
                category.save().then(updated =>{
                    res.status(200).json({url : '/admin/category'});
                })
            })
        }
    },

    /*---------------ADMIN LOGIN AND REGISTER------------------*/
    getLogin : (req,res) => {
        res.render('admin/login');
    },
    // loginFilm : (req,res) => {
    //     passport.use( new LocalStrategy({
    //         usernameField : 'email',
    //         passReqToCallback : true
    //     },(req,email,password,done) => {
    //         Admin.findOne({email : email}).then( admin => {
    //             if( !admin ){
    //                 return done(null,false,req.flash('error-message','Admin not found with this Email'));
    //             }
    //             bcrypt.compare(password, admin.password, (err, passwordMatched) => {
    //                 if(err)
    //                     return err;
                    
    //                 if(!passwordMatched) {
    //                     return done(null,false,req.flash('error-message','Invalid username or Password'));
    //                 }
                    
    //                 return done(null,admin, req.flash('success-message','Login SuccessFuly'));
    //             })
    //         })
    //     }));
    //     passport.serializeUser(function(user, done) {
    //         done(null, user.id);
    //       });
          
    //       passport.deserializeUser(function(id, done) {
    //         User.findById(id, function(err, user) {
    //           done(err, user);
    //         });
    //       });
    // },
    getRegister : (req,res) => {
        res.render('admin/register');
    },
    registerFilm : (req,res) => {
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
        if(!req.body.password ){
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
            Admin.findOne({email : req.body.email}).then(admin => {
                if (admin) {
                    req.flash('error-message', `Email already exists, Try to login`);
                    res.redirect('/admin/login');
                }
                else {
                    const newAdmin = new Admin(req.body);

                    bcrypt.genSalt(10, (err,salt) => {
                        bcrypt.hash(newAdmin.password, salt ,(err,hash) => {
                            newAdmin.password = hash;
                            newAdmin.save().then(admin => {
                            req.flash('success-message', `You are now Registered`);
                            res.redirect('/admin/login');
                            });
                        });
                    });
                }
            });
        }
    },
    getCineplex :async (req,res) => {
        await Cineplex.find()
            .then(cineplex => {
                res.render('admin/cineplex/index', {Cineplex : cineplex});
            }).catch(err => {
                console.log(err);
            });
    },
    createCineplex : (req,res) => {
        res.render('admin/cineplex/create');
    },
    SubmitCineplex : (req,res) => {
        const newCineplex = new Cineplex({
            title : req.body.title,
            address : req.body.address
        })
        newCineplex.save()
            .then(cineplex => {
                req.flash('success-message','Cineplex created successfuly');
                res.redirect('/admin/cineplex');
            }).catch(err => {
                console.log(err);
            })
    },
    deleteCineplex : (req,res) => {
        const id = req.params.id ;
        Cineplex.findByIdAndDelete(id)
            .then(deleteCine => {
                req.flash('success-message',`Delete ${deleteCine.title} successfuly`);
                res.redirect('/admin/cineplex');
            })
    },
    getCinema : (req,res) => {
        Cinema.find()
            .populate('cineplex')
            .then(cinema => {
                res.render('admin/cinema', {Cinema : cinema});
            }).catch(err => {
                console.log(err);
            })
    },
    createCinema : (req,res) => {
        Cineplex.find()
            .populate('cineplexe')
            .then(cineplex => {
                res.render('admin/cinema/create', {Cineplex : cineplex});
            }).catch(err => {
                console.log(err);
            })
    },
    summitCinema : (req,res) => {
        const newCinema = new Cinema({
            title : req.body.title,
            cineplex : req.body.cineplex,
            typeCinema : req.body.typeCinema,
            horizoncal : req.body.horizoncal,
            vertical : req.body.vertical
        });
        newCinema.save()
            .then(cimemaSub => {
                req.flash('success-message','Created Cinema successfuly');
                res.redirect('/admin/cinema');
            })
    },
    deleteCinema : (req,res) => {
        const id = req.params.id;
        Cinema.findByIdAndDelete(id)
            .then(deleteCinema => {
                req.flash('success-message',`Delete cinema ${deleteCinema.title} successfuly`);
                res.redirect('/admin/cinema');
            }).catch(err => {
                console.log(err);
            })
    },
    getShowtime : (req,res) => {
       Showtime.find()
            .populate('cinema')
            .populate('film')
            .then(showtime => {
                res.render('admin/showtime/index',{Showtime : showtime});
            }).catch(err => {
                console.log(err);
            })
    },
    createShowtime : (req,res) => {
        Cinema.find()
            .populate('cinema')
            .then(cinema => {
                Film.find()
                    .populate('film')
                    .then(Film => {
                        res.render('admin/showtime/create', {Cinema : cinema, Films : Film});
                    })
            })
    },
    submitShowtime : (req,res) => {
        const newShowTime = new Showtime({
            film : req.body.film,
            cinema : req.body.cinema,
            begin : req.body.begin,
            end : req.body.end,
            price : req.body.price
        });
        newShowTime.save()
            .then(showtime => {
                req.flash('success-message','Created ShowTime Successfuly');
                res.redirect('/admin/showtime');
            }).catch(err =>{
                console.log(err);
            })
    },
    deleteShowtime : (req,res) => {
        const id = req.params.id;
        Showtime.findByIdAndDelete(id)
            .then(deleteShowtime => {
                req.flash('success-message',`Deleted ${deleteShowtime.title} successfuly`);
                res.redirect('/admin/showtime');
            }).catch(err => {
                console.log(err);
            })
    }
}