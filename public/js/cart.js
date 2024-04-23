let cart = [];
let cartlist =[];
let purschase =[];

async function loadcartlist(){

    const res = await fetch("http://localhost:8000/needproduct",{method:"GET"});
    const list = await res.json();
    list.forEach(li=>{
        cartlist.push(li)
    })
}

loadcartlist();



function addCart(id){
    purschase=[];
    let cartcontainer = document.getElementById("fillcart")
  cartcontainer.innerHTML="";
  document.getElementById("tb").innerHTML="";

   cart.push(id);
   document.querySelector(".amout").innerHTML=cart.length;
   let mainarray =[];
   let pass=[];
   let count =0;
   
   for(i=0; i<cart.length; i++){
       if(!pass.includes(cart[i])){
           let size = cart.filter(function(e){
               return e === cart[i];
           })
           let lk = cartlist.findIndex(v=> v.productID = id);
           mainarray.push({ele:cart[i],quantity:size.length});
       }
       pass.push(cart[i]);
   }
   
   mainarray.forEach(arr=>{
   
   let content = document.createElement("div");
   content.classList.add("makecart")
   content.innerHTML=`
   <div>
       <img src="./storage/uploads/${cartlist[arr.ele].url[0]}" alt="" class="cart-img">
   </div>
   <div>
       <h4 clas="cart-ti">${cartlist[arr.ele].title}</h4>
       <p class="price-val">Price <span>ksh ${cartlist[arr.ele].cost}</span></p>
       <p>quantity : ${arr.quantity}</p>
   </div>`;
   
   cartcontainer.appendChild(content);
   
   
   
   })
   let headrow = document.createElement("tr");
   for(i=0; i<3; i++){

    if(i===0){
        let th = document.createElement("th");
        th.style.padding="4px 16px";
        th.style.background="lightgray";
        th.style.color="white";
        th.innerHTML="Item-name";
        headrow.appendChild(th);
    }else if(i===1){
        let th = document.createElement("th");
        th.style.padding="4px 16px";
        th.style.background="lightgray";
        th.style.color="white";
        th.innerHTML="Item-price";
        headrow.appendChild(th);


    }else{

        let th = document.createElement("th");
        th.style.padding="4px 16px";
        th.style.background="lightgray";
        th.style.color="white";
        th.innerHTML="Item-quantity";
        headrow.appendChild(th);
    }
   }
document.getElementById("tb").appendChild(headrow);
   mainarray.forEach(val=>{

    let tr = document.createElement("tr");

    for(i=0; i<3; i++){
    if(i===0){
    let td = document.createElement("td");
    td.style.padding="4px 16px";
    td.style.background="white";
    td.style.color="black"
    td.innerHTML=cartlist[val.ele].title;
    tr.appendChild(td);
   }else if(i===1){
    let td = document.createElement("td");
    td.style.padding="4px 16px";
    td.style.background="white";
    td.innerHTML=cartlist[val.ele].cost;
    tr.appendChild(td);
   }else{

    let td = document.createElement("td");
    td.style.padding="4px 16px";
    td.style.background="white";
    td.innerHTML=val.quantity;
    tr.appendChild(td);
   }

    }
    document.getElementById("tb").appendChild(tr);
   })
   let calc =0;
for( i=0; i< mainarray.length; i++){
 let price = cartlist[mainarray[i].ele].cost;
 calc +=price * mainarray[i].quantity;
}
mainarray.forEach(r=>{
    purschase.push(r);
})
document.getElementById("mytot").innerHTML=calc+".00";
   console.log(mainarray)
   pass=[];
   mainarray=[];
   

}




document.getElementById("paynows").addEventListener("click",(e)=>{
    let customername = document.getElementById("customername");
    let customerphone = document.getElementById("customerphone");
    let customerlocation = document.getElementById("customerlocation");
    let customeroption= document.getElementById("customerselect");
    let mode = document.getElementById("mode");
    let customeremail = document.getElementById("customeremail");

    if(customername.value && customeremail.value && customerlocation.value && customerphone.value && customeroption.value && mode.value){
        if(purschase.length>0){
            let today = new Date();
            let date = today.getDate();
            let daynumber = today.getDay();
            let hours =today.getHours();
            let substraction = hours-12;
            let minutes = today.getMinutes();
            let time = "";
            let day ="";
            if(substraction>0){
                time = hours+":"+minutes +"PM";
            }else{
                time = hours+":"+minutes +"AM";
                
            }
            switch (daynumber) {
                case 1:
                    day ="Mon"
                    break;
                 case 2:
                    day ="Tue";
                    break;
                    case 3:
                        day ="Wed";
                        break;
                        case 4:
                            day ="Thu";
                            break;
                            case 5:
                                day ="Fri";
                                break;
                                case 6:
                                    day="Sat";
                                    break;
                default:
                    day ="Sun";
                    break;
            }
            let month = today.getUTCMonth()+1;
            let year = today.getFullYear();
            let fulldate = month+"/"+date+"/"+year;
            console.log(month,"month")
            let monthname ="";
            switch (month) {
                case 1:
                    monthname ="January";
                    break;
                    case 2:
                        monthname="February";
                        break;
                        case 3:
                            monthname="March";
                            break;
                            case 4:
                                monthname="April";
                                break;
                                case 5:
                                    monthname="May";
                                    break;
                                    case 6:
                                        monthname="June";
                                        break;
                                        case 7:
                                            monthname="July";
                                            break;
                                            case 8:
                                                monthname="August";
                                                break;
                                                case 9:
                                                    monthname="September";
                                                    break;
                                                    case 10:
                                                        monthname="October";
                                                        break;
                                                        case 11:
                                                            monthname="November";
                                                            break;
            
                default:
                    monthname="December";
                    break;
            }
        
        const obj ={

            customername:customername.value,
            customerlocation:customerlocation.value,
            customerphone:customerphone.value,
            customeroption:customeroption.value,
            mode:mode.value,
            orders:purschase,
            email:customeremail.value,
            fulldate,
            day,
            year,
            date,
            time,
            monthname,
            status:"Under verification"
        }
    
    savecustomer(obj)
    }
    }
})


const savecustomer = async(prof)=>{

 await fetch("http://localhost:8000/addcustomer",{method:"POST",headers:{
    "Content-Type":"application/json"
 },body:JSON.stringify(prof)})
    
}