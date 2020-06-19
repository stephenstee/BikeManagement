var express = require("express");
var Customer = require("../models/customer");
var router = express.Router();

// Customer.create({
// 	fname:"stephen",
// 	lname: "stee",
// 	dob: "12051999",
// 	phone: "9999999",
// 	address: "ahjbjahdbfjahbfd",
// 	favbike: "ktm"
// },function(err, customer){
// 	if(err){
// 		console.log(err);
// 	}else{
// 		console.log(customer);
// 	}
// })


router.get("/user",function(req,res){
// var count = 0;	
	Customer.find({},function(err,customer){
		if(err){
			console.log(err);
		}
		else{
			// count++;
			res.render("userindex", {customers:customer});
		}
	})
})


router.get("/user/new",function(req,res){
	res.render("newuser");
})

router.post("/user",function(req,res){
  Customer.create(req.body.customer,function(err, customer){
	  if(err){
		  res.redirect("/user");
	  }else{
		  console.log(customer);
		  res.redirect("/index");
	  }
  })
})

router.get("/user/:id",function(req,res){
	Customer.findById(req.params.id,function(err,customer){
		if(err){
			console.log(err);
		}else{
			res.render("usershow", {customer:customer});
		}
	})
})

module.exports = router;