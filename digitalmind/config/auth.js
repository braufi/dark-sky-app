module.exports = {
    ensureAutheticated: (req, res, next) => {
        if(req.isAuthenticated())
        {
            return next();
        }
        req.flash('error_msg', 'You should log in to view this page!');
        res.redirect('/users/login');
    }
}