
const fs = require("fs");


const NewProduct= (look)=>{
fs.readFile("./database/models/products.json",'utf8',(err,data)=>{


    if(err){
        console.log(`error while opening: ${err}`);
    }else{

        const database = JSON.parse(data);

        if(database.length>0){
            database.push(look);


            let convert = JSON.stringify(database,null,4);

            fs.writeFile("./database/models/products.json",convert,'utf8',err=>{

                if(err){
                    console.log(`error while saving the new record ${err}`);
                }else{
                 console.log("new product to the record successfully");
                }
            })
        }else{


            let me = JSON.stringify(look,null,4);

            fs.writeFile("./database/models/products.json",me,'utf8',err=>{

                if(err){
                    console.log(`error while saving the record${err}`)
                }else{
                    console.log("record saved")
                }
            })
        }
    }

})

}

module.exports = {NewProduct}