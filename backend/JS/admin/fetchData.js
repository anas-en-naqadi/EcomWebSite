
document.addEventListener('DOMContentLoaded',function(){
 
 

 
})
 


function deleteRows() {
  var tab = document.getElementById('table');
  var rows = tab.querySelectorAll('tr');
  
  if (rows.length >= 1) {
    for (var i = 1; i < rows.length; i++) {
      rows[i].remove();
    }
    selectData();
  } else {
    alert("No rows to delete.");
  }
}



function selectData() {
  const req = new XMLHttpRequest();
  var select = document.getElementById("item-select").value;

  req.open(
    "GET",
    "http://localhost:3000/EcomWebSite-main2/Site%20Web%20Ecommerce/backend/PHP/Admin/getData.php?type=" + select
  );
  req.send();

  req.onload = function () {
    if (req.status === 200 || req.readyState === 4) {
      try {
        const data =JSON.parse( req.response);
       
        if (data && Array.isArray(data)) {
          const tab = document.getElementById("tbodyProd");
          data.forEach((element) => {
            const tr = document.createElement("tr");
            const td1 = document.createElement("td");
            const td2 = document.createElement("td");
            const img = document.createElement("img");
            const td3 = document.createElement("td");
            const td4 = document.createElement("td");
            const td5 = document.createElement("td");
            const td6 = document.createElement("td");
           
            if (select == "Ordinateurs") {
              td1.textContent = element.id_pc;
              img.src = "/EcomWebSite-main2/Site Web Ecommerce/backend/IMAGES/PC/"+element.image;
              td3.textContent = element.nom_pc;
            } else if (select == "Smart Watch") {
              td1.textContent = element.id_watch;
              img.src = "/EcomWebSite-main2/Site Web Ecommerce/backend/IMAGES/WATCH/"+element.image;
              td3.textContent = element.nom_watch;
            } else if (select == "Television") {
              td1.textContent = element.id_tv;
              img.src = "/EcomWebSite-main2/Site Web Ecommerce/backend/IMAGES/TV/"+element.image;
              td3.textContent = element.nom_tv;
            } else if (select == "Telephone") {
              td1.textContent = element.id_tel;
              img.src = "/EcomWebSite-main2/Site Web Ecommerce/backend/IMAGES/PHONE/"+element.image;
          
              td3.textContent = element.nom_tele;
            }
            
           
           
            td2.appendChild(img);
            td5.textContent = element.stock;
            td4.textContent = element.prix;
            const editBtn = document.createElement("button");
            editBtn.id = "green";
            editBtn.textContent = "Edit";
            td6.appendChild(editBtn);

            const deleteBtn = document.createElement("button");
            deleteBtn.id="red";
            deleteBtn.textContent = "Delete";
            td6.appendChild(deleteBtn);

            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);
            tr.appendChild(td5);
            tr.appendChild(td6);

            tab.appendChild(tr);
          });
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log("No response");
    }
  };
}


function findText(tableid,id,mssg) {
  let value = document.getElementById(id).value.toLowerCase(); // Get the search value
  const table = document.getElementById(tableid);
  const tr = table.querySelectorAll('tr');
  let check = true;
  tr.forEach(item => {
      let found = false;
      const td = item.querySelectorAll('td');

      td.forEach(val => {
          if (val.textContent.toLowerCase().includes(value)) {
              found = true; // If the text is found in any cell, set found to true
          }
      });

      // Show or hide the row based on the 'found' flag
      if (found) {
          item.style.display = "table-row"; // Show the row
          document.getElementById(mssg).style.display="none";
          check=false
      } else {
          item.style.display = "none"; // Hide the row
      }
  });
  if (check){
   
    document.getElementById(mssg).style.display="block";
    
  }
}

function countOrd(cls,wh){
  const table = document.getElementById(cls);
  const tr = table.querySelectorAll('tr');
  var nbRows = tr.length;
  document.getElementById(wh).textContent = nbRows;
  console.log("Number of rows: " + nbRows);
}
