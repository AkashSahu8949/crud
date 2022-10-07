const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/StudentRecord',
  {
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
    useFindAndModify:false
  }).then(()=>{
     console.log("Run Succefully");
  }).catch(()=>{
    console.log("Error in the code");    
  })

  
