
const fs = require("fs");


const NewCustomer = (mycustomer)=>{
fs.readFile("./database/models/customers.json",'utf8',(err,data)=>{


    if(err){
        console.log(`error while opening: ${err}`);
    }else{

        const database = JSON.parse(data);

        if(database.length>0){
            database.push(mycustomer);


            let convert = JSON.stringify(database,null,4);

            fs.writeFile("./database/models/customers.json",convert,'utf8',err=>{

                if(err){
                    console.log(`error while saving the new customer ${err}`);
                }else{
                 console.log("new customer added to the record successfully");
                }
            })
        }else{


            let me = JSON.stringify(mycustomer,null,4);

            fs.writeFile("./database/models/customers.json",me,'utf8',err=>{

                if(err){
                    console.log(`error while saving the customer${err}`)
                }else{
                    console.log("customer saved")
                }
            })
        }
    }

})

}

module.exports = {NewCustomer}