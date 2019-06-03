const express = require('express');
const router =  express.Router();
const adminController = require('../controllers/adminControllers');


router.all('/*',(req,res,next) => {
    
    req.app.locals.layout = 'admin';
    next();
})

/*--------Index Admin-----*/
router.route('/')
    .get(adminController.index);


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

module.exports = router;