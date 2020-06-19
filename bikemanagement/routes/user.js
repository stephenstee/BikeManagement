var express = require("express");
var router = express.Router();
var User = require("../models/user");
var passport = require("passport");


router.get("/register",function(req,res){
	res.render("register");
})

router.post("/register",function(req,res){
	
	User.register(new User({username: req.body.username }), req.body.password,function(err,user){
		if(err){
			return res.render("/register");
		}
		passport.authenticate("local")(req,res,function(){
			res.render("newuser");
		})
									  
	})
})

router.get("/login", function(req,res){
	res.render("login");
})

router.post("/login",passport.authenticate("local",{
	successRedirect: "/index",
	failureRedirect: "/login"
}),function(req,res){
	
});

router.get("/logout",function(req,res){
	req.logout();
	// req.flash("success", "Successfully loggout out");
	res.redirect("/");
})

function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
				
	}
	else{
		req.flash("error","Login In First");
		res.redirect("/login");
	}
}
module.exports = router;