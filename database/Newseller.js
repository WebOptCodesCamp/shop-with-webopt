
const fs = require("fs");


const NewSeller = (myseller)=>{
fs.readFile("./database/models/sellers.json",'utf8',(err,data)=>{


    if(err){
        console.log(`error while opening: ${err}`);
    }else{

        const database = JSON.parse(data);

        if(database.length>0){
            database.push(myseller);


            let convert = JSON.stringify(database,null,4);

            fs.writeFile("./database/models/sellers.json",convert,'utf8',err=>{

                if(err){
                    console.log(`error while saving the new user ${err}`);
                }else{
                 console.log("new user added to the record successfully");
                }
            })
        }else{


            let me = JSON.stringify(myseller,null,4);

            fs.writeFile("./database/models/sellers.json",me,'utf8',err=>{

                if(err){
                    console.log(`error while saving the seller${err}`)
                }else{
                    console.log("user saved")
                }
            })
        }
    }

})

}

module.exports = {NewSeller}