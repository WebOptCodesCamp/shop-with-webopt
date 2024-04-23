//javascript for product lists area
let areaproduct = document.getElementById("proditemsarea");
const produrl = "http://localhost:8000/needproduct";
let myarray =[];
let count =0;

async function loadproducts(){

const prodata = await fetch(produrl,{method:"GET"});
val = await prodata.json();
for(i=0; i<val.length; i++){
for(j=0; j<val.length; j++){
    if(j!==i && val[j].productID === val[i].productID){
        count+=1;
    }
}
if(count<1){
myarray.push(val[i]);}
count=0;
}


myarray.forEach(myarr=>{

    let productarea = document.createElement("div");
    productarea.classList.add("productarea");
    productarea.style.cursor="pointer";
    productarea.style.marginTop="12px";
    productarea.innerHTML= `<div class="prodcard">
    <img src="./storage/uploads/${myarr.url[0]}" alt="">
    <h3>${myarr.title}</h3>
    <p>Price <span>ksh ${myarr.cost} </span></p>
    </div>`;
    
    areaproduct.appendChild(productarea);
    areaproduct.style.overflowY ="scroll";
    
    })

}

loadproducts();

console.log("your array",myarray);

let table = document.querySelector("#table1");
const sellersurl ="http://localhost:8000/addseller";

async function loadsellers(){

    const res = await fetch(sellersurl,{method:"GET"});

    let val = await res.json();
    val.forEach(seller=>{
        let tr = document.createElement("tr");
        for(i=0; i<7;i++){

            if(i===0){
                let td = document.createElement("td");
                td.style.padding="10px 35px";
                td.style.fontFamily="monospace";
                td.innerHTML=seller.firstname;
                tr.appendChild(td);

            }else if(i===1){
                let td = document.createElement("td");
                td.style.padding="10px 35px";
                td.style.fontFamily="monospace";
                td.innerHTML=seller.lasttname;
                tr.appendChild(td);

            }else if(i===2){
                let td = document.createElement("td");
                td.style.padding="10px 35px";
                td.style.fontFamily="monospace";
                td.innerHTML=seller.sellerlocation;
                tr.appendChild(td);
                
            }else if(i===3){
                let td = document.createElement("td");
                td.style.padding="10px 35px";
                td.style.fontFamily="monospace";
                td.innerHTML=seller.phonenumber;
                tr.appendChild(td);

                
            }else if(i===4){
                let td = document.createElement("td");
            td.style.padding="10px 35px";
            td.style.fontFamily="monospace";
            td.innerHTML=seller.address;
            tr.appendChild(td);



                
            }else if(i===5){

                let td = document.createElement("td");
                td.style.padding="10px 35px";
                td.style.fontFamily="monospace";
                td.innerHTML=seller.gender;
                tr.appendChild(td);
                
            }else{
                let td = document.createElement("td");
                td.style.padding="10px 35px";
                td.style.fontFamily="monospace";
                td.style.color="cyan"

                td.innerHTML=seller.email;
                tr.appendChild(td);



            }
        }


table.appendChild(tr);

    })


}

loadsellers();