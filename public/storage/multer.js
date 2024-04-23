const multer = require("multer");
const { uuid } = require("uuidv4");

var store =  multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,__dirname+"/uploads")
    },
    filename:(req,file,cb)=>{
        cb(null,"photo"+"madebyoparero"+uuid()+"save.png")
    }
})


const uploadImages  = multer({storage:store});

module.exports ={uploadImages}