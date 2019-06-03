
const Post = require('../models/PostModel').Post;
const Category = require('../models/CategoryModel').Category;
const {isEmpty} = require('../config/customFunction');


module.exports = {
    index : (req,res) => {
        res.render('admin/index');
    },
    getPosts: (req,res) => {
        Post.find()
        .populate('category')
            .then(posts => {
                res.render('admin/posts/index',{posts : posts});
            }).catch(err => {
                console.log(err);
            });
    },
    submitPosts : (req,res) => {
        const allowCommentIsShow = req.body.allowComment ? true : false;
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
        const newPost = new Post({
            title : req.body.title,
            status : req.body.status,
            description :  req.body.description,
            allowComment : allowCommentIsShow,
            category : req.body.category,
            file :`/uploads/${fileName}`,
            creationDate : Date.now()
        });
        newPost.save()
            .then(post => {
                req.flash('success-message','Post created successfully');
                res.redirect('/admin/posts');
            }).catch(err => {
                console.log(err);
            })
    },
    createPosts : (req,res) => {
        Category.find()
            .then(cats => {
                res.render('admin/posts/create', {Category : cats});
            })
    },
    editPosts : (req,res) => {
        const id = req.params.id;

        Post.findById(id)
            .then(posts => {
               Category.find()
                    .then(cats => {
                        res.render('admin/posts/edit',{posts : posts , Category : cats});
                    });
            }).catch(err => {
                console.log(err);
            });
    },
    editPostSubmit : (req,res) => {
        const commentAllow = req.body.allowComment ? true : false;

        const id = req.params.id;
        Post.findById(id)
            .then(post => {
                post.title = req.body.title;
                post.status = req.body.status;
                post.allowComment = commentAllow;
                post.description = req.body.description;
                post.category = req.body.category;

                post.save()
                    .then(updatePost => {
                        req.flash('success-message',`The Post ${updatePost.title} has been updated `);
                        res.redirect('/admin/posts');
                    })
            })
    },
    deletePosts : (req,res) => {
        const id = req.params.id;
        Post.findByIdAndDelete(id)
            .then(deletePost => {
                req.flash('success-message',`The post ${deletePost.title} has been deleted`);
                res.redirect('/admin/posts');
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
    editCategoryPostRoute : (req,res) => {
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
    }
}