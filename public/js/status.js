let searchbtn= document.querySelector(".search-btn");

let phonetxt = document.getElementById("phonetxt");

let emptyarray =[];

async function loadpreviousproduct(){

    let res = await fetch("http://localhost:8000/needproduct",{method:"GET"});
    let values= await res.json();
    
    values.forEach(x=>{
        emptyarray.push(x)
    })

        
    
   

}
loadpreviousproduct();
searchbtn.addEventListener("click",(e)=>{
    let val = phonetxt.value;
    if(val){

 getpurschase(val);


    }
})


async function getpurschase(val){

const res = await fetch("http://localhost:8000/needcustomer",{method:"GET"})
const data = await res.json();
let size = data.filter(dat=>dat.customerphone===val);
if(size){
    document.getElementById("givetable").innerHTML="";
    document.getElementById("givetable").innerHTML=`  <table id="table6">
    <th>Productname</th>
    <th>Productprice</th>
    <th>Quantity</th>
    <th>Date of Purchase</th>
    <th>Mode of Payment</th>
    <th>Seller</th>
    <th>Status</th>
</table>`;
    for(i=0; i<size.length; i++){

   for(j=0; j< size[i].orders.length; j++){

    let tr = document.createElement("tr");

 let td= document.createElement("td");
 let td1= document.createElement("td");
 let td2= document.createElement("td");
 let td3= document.createElement("td");
 let td4= document.createElement("td");
 let td5= document.createElement("td");
 let td6= document.createElement("td"); 


td5.style.padding="4px 16px";
td6.style.padding="4px 16px"
tr.style.fontFamily="monospace"

 td.innerHTML= emptyarray[size[i].orders[j].ele].title;
 
 td1.innerHTML= emptyarray[size[i].orders[j].ele].cost;
 td2.innerHTML = size[i].orders[j].quantity;
td3.innerHTML= size[i].fulldate;
td3.style.color="brown"
td4.innerHTML=size[i].mode;
td5.innerHTML=size[i].customeroption;
td6.innerHTML=size[i].status;
 tr.appendChild(td);
 tr.appendChild(td1);
  tr.appendChild(td2);
  tr.appendChild(td3);
  tr.appendChild(td4);
  tr.appendChild(td5);
  tr.appendChild(td6)

  if(td4.innerHTML==="Mpesa"){
    td4.style.color="green";
    td4.style.fontStyle="bold"
}else{
    td4.style.color="brown";
}

if(td6.innerHTML==="Delivered"){
    td6.style.color="blue";
    td6.style.fontWeight="900";
    td6.style.fontStyle="bold"
    
}else if(td6.innerHTML==="Cancelled"){
    td6.style.color="red";
    td6.style.fontWeight="900";
    td6.style.fontStyle="bold"

}else{
    td6.style.color="yellow";
    td6.style.fontWeight="900";
    td6.style.fontStyle="bold"
}
document.getElementById("table6").appendChild(tr)


   }
    }




    let table = document.getElementById("table6");
    for(i=1; i< table.rows.length; i++){

        if(i%2 !==0){
            table.rows[i].style.background ="rgb(102,90,110,0.4)"
        }
    }
}
}


