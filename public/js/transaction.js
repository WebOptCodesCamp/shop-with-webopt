let customerlist =[];



async function loadcustomersfromserver(){

    const vom = await fetch("http://localhost:8000/needproduct",{method:"GET"});
    customerlist= await vom.json();

    
    const res = await fetch("http://localhost:8000/needcustomer",{method:"GET"});



    let data = await res.json();
let table = document.querySelector("#table2");
    data.forEach((dat,j)=>{

        let amountpaid= 0;
        for(i=0 ; i< dat.orders.length; i++){

            amountpaid += customerlist[dat.orders[i].ele].cost * dat.orders[i].quantity;
        }
        
let tr = document.createElement("tr");
for(i=0; i<5; i++){

    if(i===0){

        let td = document.createElement("td");
        td.style.padding="4px 16px";
        td.style.textAlign="center"
        td.style.fontFamily="monospace"
        td.style.color="black";
        td.innerHTML= "#456"+j;
        tr.appendChild(td);
    }else if (i===1){
        let td = document.createElement("td");
        td.style.padding="4px 16px";
        td.style.textAlign="center"
        td.style.fontFamily="monospace"
        
        td.style.color="black";
        td.innerHTML= amountpaid;
        tr.appendChild(td);


    }else if(i===2){
        let td = document.createElement("td");
        td.style.padding="4px 16px";
        td.style.textAlign="center"
        td.style.fontFamily="monospace"
         
        td.style.color="black";
        td.innerHTML= dat.mode;
        tr.appendChild(td);

    }else if(i===3){

        let td = document.createElement("td");
        td.style.padding="4px 16px";
        td.style.textAlign="center"
        td.style.fontFamily="monospace"

        td.style.color="black";
        td.innerHTML= dat.fulldate;
        tr.appendChild(td);

    }else{

        let td = document.createElement("td");
        let button = document.createElement("button");
        button.innerHTML="hide";
        button.style.background="transparent";
        button.addEventListener("click",(e)=>{
            Remove(j);
        })
        button.style.color="pink";
        button.style.border="1px solid lightgray";
        button.style.padding="4px 12px";
        button.style.borderRadius="5px";
        button.style.cursor="pointer"
        td.appendChild(button);
        td.style.padding="4px 16px";
        td.style.textAlign="center"
        td.style.fontFamily="monospace"

        td.style.color="green";
        
        tr.appendChild(td);

    }
}
table.appendChild(tr);
        
    })
    function Remove(x){
        console.log(x+1)

        table.deleteRow(x)
    }


}


loadcustomersfromserver();







    