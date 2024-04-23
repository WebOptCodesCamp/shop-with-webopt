let webopt = document.getElementById("webopt");

webopt.style.display="none";

let btnadmin = document.querySelector("button");

let adminemail = document.getElementById("email");
let adminpass = document.getElementById("password");

btnadmin.addEventListener("click",(e)=>{

    e.preventDefault();
  if(adminemail.value && adminpass.value){
    

    getadmin(adminemail.value,adminpass.value);


}
})



function getadmin(x,y){

    if(x=="webopt@gmail.com" && y == "42413646"){
        window.open("./admin.html");
    }else{
        
        adminemail.value="";
        adminpass.value="";
        alert("Incorrect credentials")
        return;
    }
}



function gotoecorm(){

    window.open("./ecormmerce.html");
}

