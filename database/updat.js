

const fs = require("fs");


const Update = (status,id)=>{
fs.readFile("./database/models/customers.json",'utf8',(err,data)=>{


    if(err){
        console.log(`error while opening: ${err}`);
    }else{

        const database = JSON.parse(data);

        if(database.length>0){
            database[id].status =status;


            let convert = JSON.stringify(database,null,4);

            fs.writeFile("./database/models/customers.json",convert,'utf8',err=>{

                if(err){
                    console.log(`error while changing the status of the customer ${err}`);
                }else{
                 console.log("new changes added successfully");
                }
            })
        }
    }

})

}

module.exports = {Update}

