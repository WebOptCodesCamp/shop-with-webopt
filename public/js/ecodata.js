let homeproductlists = document.getElementById("homeproductlist");

let homeproductURL = "http://localhost:8000/needproduct";
async function Loadhomeproduct(){


const res =await fetch(homeproductURL,{method:"GET"});

let data = await res.json();
data.forEach((element,i) => {
  let sm = element.productID;
    let box = document.createElement("div");
    box.classList.add("card");
    box.innerHTML=`<img src="./storage/uploads/${element.url[0]}" class="card-thumb" onclick="showrelated(${i})"/>
    <h4 class="card-name">${element.title}</h4>
    <p class="card-price">price: ksh <span>${element.cost}</span></p>
    <button class="card-btn" onclick="addCart(${i})">Add to cart <button>
    
    `;
    homeproductlists.appendChild(box);

});

}


Loadhomeproduct();

function makepayment(){

  document.getElementById("home").style.display="none";
  document.getElementById("category").style.display="none"
  document.getElementById("related").style.display="none"
  document.getElementById("payment").style.display="block"
  document.getElementById("status").style.display="none"

}

function showstatus(){
  document.getElementById("home").style.display="none";

  document.getElementById("category").style.display="none"
  document.getElementById("related").style.display="none"
  document.getElementById("status").style.display="block"
  document.getElementById("paynows").style.display="none"

}


function showcategory(){


  document.getElementById("home").style.display="none";
  document.getElementById("category").style.display="block"
  document.getElementById("related").style.display="none";
  document.getElementById("status").style.display="none"

  
}
function showhome(){
  document.getElementById("home").style.display="block";
  document.getElementById("category").style.display="none"
  document.getElementById("related").style.display="none"

  document.getElementById("status").style.display="none"
  
  


}


function showrelated(h){
  document.getElementById("selectprod").innerHTML="";
  document.getElementById("relatedlist").innerHTML="";
  document.getElementById("home").style.display="none";
  document.getElementById("category").style.display="none"
  document.getElementById("related").style.display="block";



  async function Loadrelatedproduct(){


    const res =await fetch(homeproductURL,{method:"GET"});
    
    let data = await res.json();
    data.forEach((element,i) => {
      let sm = element.productID;
        let box = document.createElement("div");
        box.classList.add("sltflt");
        box.innerHTML=` <div>
        <img src="./storage/uploads/${element.url[0]}" alt="">
    </div>
    <div>
        <h3>${element.title}</h3>
        <h5 style="margin-top: 15px;">price : $ 48.78 </h5>
        <h2 class="moreinfo">More information about the product</h2>
        <p style="font-weight: 100;font-style: italic;">${element.info}
        </p>
      <button class="orangebtn" onclick="addCart(${i})">Add to cart <button>


    </div>`;
    if(i===h){
        document.getElementById("selectprod").appendChild(box);}
    
    });



    data.forEach((element,i) => {
    
      let sm = element.productID;
        let box = document.createElement("div");
        box.classList.add("card");
        box.innerHTML=`<img src="./storage/uploads/${element.url[0]}" class="card-thumb"/>
        <h4 class="card-name">${element.title}</h4>
        <p class="card-price">price: ksh <span>${element.cost}</span></p>
        <button class="card-btn" onclick="addCart(${i})"  style="background:green; border:4px solid green">Add to cart <button>
        
        `;
        
        if(element.choice===data[h].choice && i!==h){
        document.getElementById("relatedlist").appendChild(box);
        }
      
      
        
    
    });

    
    }
    
    
    Loadrelatedproduct();
    


}

async function Loadshoeproduct(){


  const res =await fetch(homeproductURL,{method:"GET"});
  
  let data = await res.json();
  data.forEach((element,i) => {
    
    let sm = element.productID;
      let box = document.createElement("div");
      box.classList.add("card");
      box.innerHTML=`<img src="./storage/uploads/${element.url[0]}" class="card-thumb"/>
      <h4 class="card-name">${element.title}</h4>
      <p class="card-price">price: ksh <span>${element.cost}</span></p>
      <button class="card-btn" onclick="addCart(${i})">Add to cart <button>
      
      `;
      
      if(element.choice ==="laptop" || element.choice==="phone"){
      document.getElementById("shoearea").appendChild(box);
      }
    
    
      
  
  });
  
  }
  Loadshoeproduct();


  async function Loadbagproduct(){


    const res =await fetch(homeproductURL,{method:"GET"});
    
    let data = await res.json();
    data.forEach((element,i) => {
      
      let sm = element.productID;
        let box = document.createElement("div");
        box.classList.add("card");
        box.innerHTML=`<img src="./storage/uploads/${element.url[0]}" class="card-thumb"/>
        <h4 class="card-name">${element.title}</h4>
        <p class="card-price">price: ksh <span>${element.cost}</span></p>
        <button class="card-btn" onclick="addCart(${i})">Add to cart <button>
        
        `;
        
        if(element.choice ==="bag"){
        document.getElementById("bagarea").appendChild(box);
        }
      
      
        
    
    });
    
    }
    Loadbagproduct();



    async function loadsellerstochoose(){

      const res = await fetch("http://localhost:8000/addseller",{method:"GET"});
      const data = await res.json();
document.getElementById("sellersselect").style.display="flex";
document.getElementById("sellersselect").style.overflowX="scroll";



      data.forEach(dat=>{

        let con = document.createElement("div");
        con.classList.add("con-box");
        con.innerHTML=`<h5> Name: <span>${dat.firstname+" " + dat.lasttname}</span></h5>
        <h5> Location: <span>${dat.sellerlocation}</span></h5>
        <h5> Phone: <span>${dat.phonenumber}</span></h5>
        <h5> Address: <span>${dat.address}</span></h5>
        <h5> Gender: <span>${dat.gender}</span></h5>
        
        `
        document.getElementById("sellersselect").appendChild(con);
      })

      data.forEach(dat=>{
        let option = document.createElement("option");
        option.setAttribute("value",  dat.firstname+" " +dat.lasttname)
        option.innerHTML= dat.firstname+" " +dat.lasttname;
        document.getElementById("customerselect").appendChild(option)
      })

    }

    loadsellerstochoose();