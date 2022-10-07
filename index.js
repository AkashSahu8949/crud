const express = require('express');
const app = express();
const hbs = require('hbs'); 
const path = require('path');
const bodyParser = require('body-parser'); 
const fs = require('fs');
const multer = require('multer');


const upload_file = require('./helpers/image_helper.js') // It has Code for Image 

//const image_file = require('./helpers/file_helper.js');

app.use(bodyParser.urlencoded({ extended: true })); 

require("./db/conn");
const Student = require('./model/student'); 

const port = process.env.port || 5000;

app.use(express.static('./assets/images')); 
//app.use(express.static('./assets/files'));  

app.set('view engine','hbs');
app.set("views",path.join(__dirname,"./views/layouts"));

// Dsiplay Data 

var display = Student.find({});
 app.get('/',function(req,res,next){ 
    display.exec(function(err,data){
        if(err)throw err;
        console.log(display,'displayaaa');
         res.render('index',{title:'Employee Record',records:data});
    });
}); 

// Insert Data


app.post('/insert',upload_file.single('image'),function (req,res){

    
    //fileSave();
    console.log(req.file,);
    var data = new Student();

    data.name = req.body.name;
    data.email = req.body.email;
    data.mobile = req.body.mobile;
    data.roll = req.body.roll;
    data.gender = req.body.gender;
    data.image_file = req.file.filename;
    var save = data.save();
    console.log(req.body,'allbody');
      
    if (save)
       res.redirect('/');
    else
    console.log('Error during record insertion : ' + err);  
   });

app.get('/:id',function(req,res){
  var stu =  Student.findByIdAndRemove(req.params.id,(err,doc)=>{
      if (!err)
        {
        res.redirect('/');
        }
      else 
        {
        console.log('Failed to Delete Course Details: ' + err);
        }
   });
   console.log(stu,'stydidudhdhjd');
}); 


// To show select data on update element on edit.hbs page

app.get('/edit/:id', (req, res) => {
   Student.findById({_id:req.params.id},req.body, { new: true },(err,docs)=>{
      
          res.render('edit',{club:docs});
      
   })
});


// Now Update Data here using ID

app.post('/update/:id',(req,res)=>{

Student.findOneAndUpdate({ _id: req.body.id }, req.body, { new: true }, (err, doc) => {
    if (!err) { res.redirect('/'); }
    else {
        if (err.name == 'ValidationError') {
            handleValidationError(err, req.body);
            res.render("/", {
                viewTitle: 'Update data',
                Student: req.body
            });
        }
        else
            console.log('Error during record update : ' + err);
    }
});
});
app.listen(port,()=>{
    console.log('Listening on Port:',port);
});







