var express = require("express");
var router = express.Router();
var Bike = require("../models/bike");

//first page
router.get("/",function(req,res){
	// req.flash("success", "You Successfully Logged Out");
	res.render("home");
})
//
//second page
router.get("/index",isLoggedIn,function(req,res){
	Bike.find({},function(err, bikes){
		if(err){
			console.log(err);
		}
		else{
			res.render("index", {bikes:bikes});
		}
	})

})
//

router.get("/index/about",isLoggedIn,function(req,res){
	res.render("aboutus");
})

//admin login page
router.get("/index/admin",function(req,res){
	res.render("admin");
})
router.post("/index/admin",function(req,res){
	var username= req.body.username;
	var password= req.body.password;
	var user = "admin";
	var pass = "123";
	if(user === username && pass === password)
		{
		   res.render("option");	
		}
	else{
      res.redirect("/index/admin");
	}
	
})
//

//create
router.post("/index",isLoggedIn,function(req,res){
	Bike.create(req.body.bike,function(err,bikes){
		if(err){
			console.log("error")
		}
		else{
			res.redirect("index")
		}
	})
})
//
//new
router.get("/index/admin/create",function(req,res){
	res.render("new");
})
//

//edit
router.get("/index/edit",function(req,res){
	Bike.find({},function(err,bikes){
		if(err){
			console.log("error");
		}
		else{
			res.render("indextwo",{bikes: bikes})
		}
	})
})
router.get("/index/:id/edit",function(req,res){
	Bike.findById(req.params.id, function(err, editbike){
		if(err){
			console.log("error");
		}
		else{
			res.render("edit",{bike: editbike})
		}
	})
})
router.put("/index/:id",function(req,res){
	Bike.findByIdAndUpdate(req.params.id, req.body.bike, function(err, editbike){
		if(err){
			console.log("error");
		}
		else{
			res.redirect("/index/edit");
		}
	})
})

//

//delete
router.delete("/index/:id/delete",function(req,res){
	Bike.findByIdAndRemove(req.params.id,function(err){
		if(err){
			console.log("error")
		}
		else{
			res.redirect("/index/edit");
		}
	})
})

//
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