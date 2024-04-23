let addbtn = document.querySelector(".add");
let productbody = document.getElementById("productbody");
let producttitle = document.querySelector("#prodtitle");
let addproductbody = document.getElementById("addproductbody");
function showproducts(){
    sellerarea.style.display="none";
    productarea.style.display="block";
    document.getElementById("transaction").style.display="none";
    document.getElementById("orders").style.display="none";
    document.getElementById("statistics").style.display="none"
    document.getElementById("content").style.background="lightgray"
    

}

function showstatistics(){

    sellerarea.style.display="none";
    productarea.style.display="none";
    document.getElementById("transaction").style.display="none";
    document.getElementById("orders").style.display="none";
    document.getElementById("statistics").style.display="block"
    document.getElementById("content").style.background="rgba(75,123,133,0.5)"
}
function showorders(){
    document.getElementById("content").style.background="lightgray"

    sellerarea.style.display="none";
    productarea.style.display="none";
    document.getElementById("transaction").style.display="none";
    document.getElementById("orders").style.display="block";
    document.getElementById("statistics").style.display="none"

}

function showtransaction(){
    sellerarea.style.display="none";
    productarea.style.display="none";
    document.getElementById("transaction").style.display="block";
    document.getElementById("orders").style.display="none";
    document.getElementById("statistics").style.display="none"
    document.getElementById("content").style.background="lightgray"

}

addbtn.addEventListener("click",(e)=>{


    productbody.style.display ="none";
    producttitle.innerHTML ="Add new Product";
    addproductbody.style.display ="block";
});

let productname = document.getElementById("productname");
let description = document.getElementById("description");
let file = document.getElementById("file");
let imagearea = document.getElementById("images");
let price = document.getElementById("price");
let category = document.querySelector(".select");
let savebtn = document.querySelector(".addprod");
let openfile = document.getElementById("open");
let agree = document.getElementById("agree");
let array =[];
openfile.addEventListener("click",(e)=>{

    file.click();

})

file.addEventListener("change",(e)=>{

    files = e.target.files;
    array=[];

    for(let i=0; i<files.length; i++){

        array.push(files[i]);
    }


array.forEach(arr=>{
    let placeimage = document.createElement("div");
    let imageurl = URL.createObjectURL(arr);
    placeimage.classList.add("imagebox");
    placeimage.style.marginLeft="20px"
placeimage.innerHTML =`<img src="${imageurl}" style="width:100%;height:100%; margin-left:20px"/>`

imagearea.appendChild(placeimage);
})

})


savebtn.addEventListener("click",(e)=>{
    e.preventDefault();
    
if(productname.value && description.value && price.value && category.value && array.length>0){
    
let form = new FormData();

for(let y of array){
    form.append("file",y);
}
uploadImages(form);



}



})


const ImageUrl = "http://localhost:8000/addproduct";
const DetailsUrl = "http://localhost:8000/details"
let lists =[];
const uploadImages = async(body)=>{

    const res = await fetch(ImageUrl,{method:"POST",body});

    let data = await res.json();
    

    for(x of data){
    lists.push(x.filename);

    }

    if(lists.length>0){
document.getElementById("later").style.display="block";
document.getElementById("any").style.display="none";
        
    }
    
    
   
    
}


document.getElementById("later").addEventListener("click",(e)=>{
    
    sendProducts();
})

let detailsURL = "http://localhost:8000/details"
async function sendProducts(){
    
    const ok = await fetch(detailsURL,{method:"POST",headers:{
        "Content-Type":"application/json"
    },body:JSON.stringify(
        {title:productname.value,
            info:description.value,
            choice:category.value,
            cost:price.value,
            url:lists}
    )});
}
