const { Console } = require("console");

const express = require("express");
const path = require("path");
const { uuid } = require("uuidv4");
const { NewSeller } = require("./database/Newseller");
const { uploadImages } = require("./public/storage/multer");
const { NewProduct } = require("./database/NewProduct");
const { NewCustomer } = require("./database/NewCustomer");
const { Update } = require("./database/updat");

const app = express();

app.use(express.static(path.join(__dirname+"/public")))
app.use(express.static(path.join(__dirname+"/storage")))

app.use(express.json());

app.get("/",(req,res)=>{

    res.sendFile(path.join(__dirname+"/public/welcome.html"));
});

app.get("/addseller",(req,res)=>{


    res.sendFile(path.join(__dirname+"/database/models/sellers.json"))
})

app.post("/addseller",(req,res)=>{
    const {firstname,lasttname,sellerlocation,phonenumber,address,gender,email} = req.body;
    const uploadseller ={

        firstname,
        lasttname,
        sellerlocation,
        phonenumber,
        address,
        gender,
        email,
        sellerID:"seller"+ uuid()
    }
    console.log(uploadseller);
    NewSeller(uploadseller);
});
app.post("/addcustomer",(req,res)=>{
 const prof = req.body;

 NewCustomer(prof);

})

app.post("/addproduct",uploadImages.array("file",12),(req,res)=>{
    const images = req.files;
    
    
    
    res.send(images);

})


app.post("/details",(req,res)=>{
    const {title,info,choice,cost,url} = req.body;
    const dataobj ={
        title,
        info,
        choice,
        cost,
        url,
        productID:"item-no"+uuid()
    }
    NewProduct(dataobj);
})
app.get("/needproduct",(req,res)=>{
    res.sendFile(path.join(__dirname+"/database/models/products.json"))

    
})

app.get("/needcustomer",(req,res)=>{
    res.sendFile(path.join(__dirname+"/database/models/customers.json"))

})
app.get("/getcustomers",(req,res)=>{
    res.sendFile(path.join(__dirname+"/database/models/customers.json"))

})

app.post("/changestatus",(req,res)=>{

const {status,id} = req.body;
Update(status,id);

})

app.listen(8000,()=>{
    console.log('====================================');
    console.log("server started at port 4000");
    console.log('====================================');
})