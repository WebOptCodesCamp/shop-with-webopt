let productstitlegraph=[];
productgraphcost=[];
productcompare =[];
async function loadproductsforgraphing(){
let res = await fetch("http://localhost:8000/needproduct",{method:"GET"});
const data = await res.json();
data.forEach(element => {
    productcompare.push(element)
    productstitlegraph.push(element.title);
    productgraphcost.push(element.cost);
});



}
loadproductsforgraphing();
let passdata =[];
let checkpass=[];
 let goplot =[]

 let productnameplot =[];
let productamountplot =[];
 async function needcustomerdetails(){


    const res = await fetch("http://localhost:8000/needcustomer",{method:"GET"});
    const data = await res.json();

    for(i=0; i< data.length; i++){

        for(j=0; j<data[i].orders.length; j++){

            for(t=0; t< data[i].orders[j].quantity; t++){
                passdata.push(data[i].orders[j].ele)
            }
        }
    }
    for(i=0; i<passdata.length; i++){

        if(!checkpass.includes(passdata[i])){
            let  size = passdata.filter(dat=>dat === passdata[i]);
            
            goplot.push({ele:passdata[i],amount:size.length})
        }
        checkpass.push(passdata[i])
    }

    

goplot.forEach(pt=>{
    productnameplot.push("hey")
    productamountplot.push(pt.amount)
})
 }

 needcustomerdetails();

 



console.log(productamountplot)

 const ctx = document.getElementById("graph1")


 new Chart(ctx, {
  type: 'bar',
  data: {
    labels: productstitlegraph,
    datasets: [{
      label: 'Cost Per Item',
      data: productgraphcost,
      borderWidth: 1,
      backgroundColor:["#3e97cd","#8e5ea2","#3cba9f","#e8c3b9","#c45850s"]
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});


new Chart(document.querySelector("canvas"), {
  type: 'line',
  data: {
    labels: productnameplot,
    datasets: [{
      label: 'Quantity of Sales Per Item',
      data: productamountplot,
      backgroundColor:["#c45850","#e8c3b9","rgba(179,181,198,1)","rgba(255,99,132,1)"],
      borderColor:["#8e5ea2","#3cba9f","#e8c3b9"],
      borderWidth: 1,
      
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});






