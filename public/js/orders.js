async function loadcustomerorders(){
const res = await fetch("http://localhost:8000/getcustomers",{method:"GET"});

let data = await res.json();
const bam = await fetch("http://localhost:8000/needproduct",{method:"GET"});
let bamdata = await bam.json();
let wrapcon = document.getElementById("orderscontent");

let i=0;
while( i<data.length){
    console.log(data[i])
    let pos = i+3;
    let div = document.createElement("div");
    div.classList.add("statusview");
   div.innerHTML=`
    <div class="asideorders">
        <div>
            <p style="font-size: 12px; font-style: bold;display: flex;margin-top: 30px; margin-left: 30px; "><img src="icons/download-4.png" alt="" style="margin-right: 20px; width: 20px; height: 20px;"> <span>${data[i].day},${data[i].monthname} ${data[i].date},${data[i].year} ${data[i].time}</span></p>
        </div>
        <div>
            <select name="select" id="changestatus${i}" style="margin-top: 30px; margin-right: 30px;padding: 4px 12px;
            border: 1px solid lightgray;
            outline: none;">
                <option value="Transported">Transported</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>

            </select>
        </div>
    </div>
    <hr class="ordershr">
    <div class="flexordersbox">
        <div style="margin-left: 30px;">
        <div class="fleximgdet">
            <img src="./images/Profile-Avatar-PNG-Picture.png" class="profile1" alt="" style="width: 30px;height: 30px;">
            <div>
                <h4>Customer</h4>
                <p><span>${data[i].customername}</span><br>
                <span>${data[i].email}</span>
            <br>
        <span>${data[i].customerphone}</span></p>
        <h5 style="color: blue; margin-top: 14px;cursor: pointer;">View Profile</h5>
            </div>
        </div>
        
        </div>
        <div>
    
            <div class="fleximgdet">
                <img src="./icons/download-2.png"  alt="" style="width: 30px;height: 30px;">
                <div>
                    <h4>Transportation</h4>
                    <p style="font-weight: 50;font-size: 14px; color: lightgray; margin-top: 6px;">Shipping: <span style="color: black;">Fargo express</span></p>
                    <p style="font-weight: 50;font-size: 14px; color: lightgray; margin-top: 6px;">Payment method: <span style="color: black;">${data[i].mode}</span></p>
                    <p style="font-weight: 50;font-size: 14px; color: lightgray;margin-top: 6px;">Status: <span style="color: black;">${data[i].status}</span></p>
                    
                    
            <h5 style="color: blue; margin-top: 12px; cursor: pointer;">Download</h5>
                </div>
            </div>
        </div>
        <div>
            <div class="fleximgdet">
                <img src="./icons/icons8-home-24.png" class="profile1" alt="" style="width: 30px;height: 30px;">
                <div>
                    <h4>Deliver to</h4>
                    <p style="font-weight: 50;font-size: 14px; color: lightgray; margin-top: 6px;">Town: <span style="color: black;">${data[i].customerlocation} , Kenya</span></p>
                    <p style="font-weight: 50;font-size: 14px; color: lightgray; margin-top: 6px;">Street: <span style="color: black;">${data[i].customerlocation} </span></p>
                    <p style="font-weight: 50;font-size: 14px; color: lightgray;margin-top: 6px;">From: <span style="color: black;">Nairobi</span></p>
                    
            <h5 style="color: blue; margin-top: 12px; cursor: pointer;">open map</h5>
                </div>
            </div>
    
        </div>
    </div>
    <div class="orderstable">
        <table id="table${i+3}" style=" width: 70%;
        border-collapse: collapse;
        margin-left: 30px;" >
    <tr>
        <th class="th1" style="width: 300px;">Product</th><th class="th1">Quantity</th><th class="th1">Unit Price</th><th class="th1" style="width: 250px;">Total</th>
    
    </tr>



    
    
        </table>
    
        <div class="end">
            <button class="savechanges" style="cursor: pointer;" onclick="changeStat(${i})">Save changes</button>
        </div>
    </div>
    
    
        `;if(data[i].status==="Under verification" || data[i].status==="Transported"){
       wrapcon.appendChild(div);

        let table3 = document.getElementById("table"+pos.toString());
  let subtotal =0;
        data[i].orders.forEach(val=>{

            let tr = document.createElement("tr");
            tr.style.border="1px solid lightgray";
            tr.innerHTML=` <td style=" display: flex;align-items: center;" ><img src="./storage/uploads/${bamdata[val.ele].url[0]}" alt="" class="table-img"/><div> <span class="table-title">${bamdata[val.ele].title}</span></div></td>
            <td style=" border: 1px solid lightgray;padding-left: 12px;">${val.quantity}</td>
            <td  style=" border: 1px solid lightgray;padding-left: 12px;">ksh ${bamdata[val.ele].cost}</td>
            <td style=" border: 1px solid lightgray;padding-left: 12px;" >ksh ${val.quantity*bamdata[val.ele].cost}</td>`;
            table3.appendChild(tr)
            subtotal += val.quantity*bamdata[val.ele].cost;
        })
        let tr = document.createElement("tr");
        tr.style.border=" 1px solid lightgray";
        tr.innerHTML=` <td></td>
        <td></td>
        <td></td>
        <td>
    
    <p style="color: lightgray;">Subtotal:     <span style="color: black; font-size: 14px;margin-left: 20px;">ksh ${subtotal+".00"}</span></p>
    <p style="color: lightgray;">Shipping cost:     <span style="color: black; font-size: 14px;margin-left: 20px;">ksh 200.00</span></p>
    <p style="color: lightgray;">Subtotal:     <span style="color: black; font-size: 14px;margin-left: 20px;">ksh ${subtotal+200+".00"}</span></p>
    
        </td>`;

        table3.appendChild(tr);
        console.log(i)}
        
        i++;
        
    }
}


loadcustomerorders();


function changeStat(r){
let mn = "changestatus"+r.toString();
let makeit = document.getElementById(mn).value;
alert(r)
updateCustomerstatus(makeit,r);
}

async function updateCustomerstatus(m,d){

    const res = await fetch("http://localhost:8000/changestatus",{method:"POST",headers:{
        "Content-Type":"application/json"
    },body:JSON.stringify({status:m,id:d})});
}
