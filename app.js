var express        = require("express");
var app            = express();
var bodyParser     = require("body-parser");
var mongoose       = require("mongoose");
var Testimonies    = require("./models/testimonies");
var Sub            = require("./models/sub");
var Resource       = require("./models/resource");

mongoose.connect("mongodb://localhost/67pastors");


app.use(bodyParser.urlencoded({extended: true}));



    





app.set("view engine", "ejs");


var sub = [{name: "67"}];



app.get("/", function(req,res){
	res.render("landing");
});

app.get("/member", function(req,res){
	res.render("member");
});
app.get("/about", function(req,res){
	res.render("about");
});



app.get("/moderator", function(req,res){
	res.render("moderator");
});



// Testimonies ===================================================================================

app.get("/testimonies", function(req, res){
    // Get all campgrounds from DB
    Testimonies.find({}, function(err, allTestimonies){
       if(err){
           console.log(err);
       } else {
          res.render("testimonies/index",{testimonies:allTestimonies});
       }
    });
});

app.post("/testimonies", function(req, res){
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var church = req.body.church;
    var desc = req.body.description;
    var newTestimoies = {name: name, image: image, church: church, description: desc}
   	Testimonies.create(newTestimoies, function(err,newlyCreated){
   		if(err){
   			console.log(err);
   		} else{
   			 res.redirect("/testimonies");
   		}
   	});
    //redirect back to campgrounds page
   
});

app.get("/testimonies/new", function(req, res){
   res.render("testimonies/new"); 
});

app.get("/testimonies/:id", function(req, res){
	
	Testimonies.findById(req.params.id, function(err, foundBlog){
		if(err){
			res.redirect("/testimonies");
		} else{ 
			res.render("testimonies/show", {testimonies: foundBlog})
		}
	})

});


//resource=============================================================================================


app.get("/resource", function(req, res){
    // Get all campgrounds from DB
    Resource.find({}, function(err, allResources){
       if(err){
           console.log(err);
       } else {
          res.render("resource/index",{resource:allResources});
       }
    });
});


app.post("/resource", function(req, res){
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var newResource = {name: name}
   	Resource.create(newResource, function(err,newlyCreated){
   		if(err){
   			console.log(err);
   		} else{
   			 res.redirect("/resource");
   		}
   	});
    //redirect back to campgrounds page
   
});

app.get("/resource/new", function(req, res){

	res.render("resource/new");

});

app.get("/resource/:id", function(req, res){
    //find the campground with provided ID
    Resource.findById(req.params.id).populate("sub").exec(function(err, resource){
        if(err){
            console.log(err);
        } else {
            
            //render show template with that campground
            res.render("resource/show", {resource: resource});
        }
    });
});

// subcatagories =================================================================================

app.get("/resource/:id/sub/new", function(req, res){
    // find campground by id
    Resource.findById(req.params.id, function(err, resource){
        if(err){
            console.log(err);
        } else {
             res.render("sub/new", {resource: resource});
        }
    })
});


app.post("/resource/:id", function(req, res){
   //lookup campground using ID
   var name = req.body.name;
   var description = req.body.description;
    var newSub = {name: name, description: description}
    Sub.create(newSub, function(err,newlyCreated){
      if(err){
        console.log(err);
      } else{
         res.redirect("/resource");
      }
    });
    //redirect
   //create new comment
   //connect new comment to campground
   //redirect campground show page
});







app.listen(3000, 'localhost', function(){
		console.log('app started');
});