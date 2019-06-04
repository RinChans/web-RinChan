module.exports = {
    selectOption : function(status,option) {
        return option.fn(this).replace(new RegExp('value=\"'+status+'\"'),'$&selected = "selected"');
    },
    isEmpty : function (obj){
        for(let key in obj){
            if(obj.hasOwnProperty(key)) {
                return false;
            }
        }
        return true;
    },
    isAuthenticated : (req,res,next) => {

        if(req.isAuthenticated()) {
            next();

        }
        else {
            res.redirect('/login');
        }
        
    },
    isAuthenticatedAdmin : (req,res,next) => {
        if(req.isAuthenticatedAdmin ()){
            next();
        }
        else {
            res.redirect('/admin/login');
        }
    }
}