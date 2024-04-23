let productarea = document.getElementById("productarea");
let sellerarea = document.getElementById("sellerarea");
let prodtitle = document.getElementById("prodtitle");
let firstname = document.getElementById("firstname");
let lastname = document.getElementById("lastname");
let phone = document.getElementById("phone");
let sellerlocation = document.getElementById("location");
let email = document.getElementById("email");
let address = document.getElementById("address");
let selection = document.getElementById("myselect");
let savesellerbtn = document.getElementById("saveseller")

function showsellers(){

productarea.style.display="none";
document.getElementById("transaction").style.display="none";
document.getElementById("statistics").style.display="none"

sellerarea.style.display="block";
prodtitle.innerHTML="Sellers Lists";
}


function hidelist(){
document.getElementById("listofsellers").style.display="none";
document.getElementById("addnewseller").style.display="block";
}






savesellerbtn.addEventListener("click",(e)=>{
    e.preventDefault();

    if(firstname.value && lastname.value && phone.value && sellerlocation.value && email.value && address.value && selection.value){
      saveSellers();
      firstname.value="";
      lastname.value="";
      phone.value="";
      sellerlocation.value="";
      email.value="";
      address.value="";
    }  
})

const sellersURL = "http://localhost:8000/addseller";
async function saveSellers(){
 await fetch(sellersURL,{method:"POST",headers:{
    "Content-Type":"application/json"
},body:JSON.stringify(
    {firstname:firstname.value,
        lasttname:lastname.value,
        sellerlocation:sellerlocation.value,
        phonenumber:phone.value,
        address:address.value,
        gender:selection.value,
        email:email.value}
)})

}