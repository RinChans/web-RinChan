
module.exports = {
<<<<<<< HEAD
    mongoDB_URL : `mongodb+srv://rinchan:ApKfuulQyMZF382r@cluster0-4gdeu.mongodb.net/test?retryWrites=true&w=majority`,
=======
    mongoDB_URL : `mongodb+srv://rinchan:8tTSxGxpnK3Qdvdl@cluster0-4gdeu.mongodb.net/test?retryWrites=true&w=majority`,
>>>>>>> 3a2c671d82bdb3913390e8fec31e67262407053f
    PORT : process.env.PORT || 3000,
    globalVariables : (req,res,next) => {
        res.locals.success_message = req.flash('success-message');
        res.locals.error_message = req.flash('error-message');
        next();
    }
}