showSpinner();
window.onload = function () {
  setTimeout(() => {
    getUserInfo("allAdresse");
  }, 500);

 

 
 
};
var total = localStorage.getItem("total");

document.getElementById("SousTotalPriceID").textContent = parseFloat(total).toFixed(2)
  .replace(".", ",")
  .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
document.getElementById("TotalPriceID").textContent = parseFloat(total).toFixed(2)
  .replace(".", ",")
  .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  document.getElementById('OrdDetailsContainerID').style.display="none"
function getComfOrderDetails(type) {
  let req = new XMLHttpRequest();
  let total = 0;
  req.open(
    "GET",
    `http://localhost:3000/EcomWebSite-main2/Site%20Web%20Ecommerce/backend/PHP/OrdersComfirm/passOrder.php?type=${type}`
  );

  req.onload = function () {
    if (req.status === 200 || req.readyState === 4) {
      console.log(req.response);
      const data = JSON.parse(req.response);

      if (data) {
        if (type == "orderDetails") {
          document.getElementsByName("UserName")[0].value =
            data.nom + " " + data.prenom;
          document.getElementById("UserEmailID").value = data.email;

          document.getElementsByName("UserPhone")[0].value = data.phone;
          document.getElementsByName("TrackingNo")[0].value = data.tracking_no;
          document.getElementsByName("UserVille")[0].value = data.ville;
          document.getElementsByName("UserAdresse")[0].value =
            data.address_line_1;
          document.getElementsByName("UserCP")[0].value = data.code_postal;
          document.getElementsByName("OrderDate")[0].value = data.created_at;
          document.getElementsByName("Payment")[0].value = data.methode_pay;
          document.getElementsByClassName("TotalPriceValue")[0].value =
            data.total;
          document.getElementById("statutID").value = data.status;
        } else if (type == "OrderProd") {
          const container = document.getElementById("tbody");
          for (let i = 0; i < data.length; i++) {
            let tr = document.createElement("tr");
            let td1 = document.createElement("td");
            let img = document.createElement("img");
            let td2 = document.createElement("td");
            let td3 = document.createElement("td");
            let td4 = document.createElement("td");
            td1.className = "ProdectIMG";
            img.src = data[i].image;
            td1.appendChild(img);

            td2.className = "ProdectName";
            td2.textContent = data[i].nom_prod;
            td3.className = "ProdectPrice";
            td3.textContent = data[i].prix;
            td4.className = "ProdectQuantite";
            td4.textContent = data[i].qty;
            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);
            container.appendChild(tr);
            if (data[i].qty >= 1) {
              total += data[i].prix * data[i].qty;
            } else {
              total += data[i].prix;
            }
          }

          document.querySelector(".TotalPriceValue").textContent = total;

        }
        hideSpinner();
      } else {
        alert(data.status);
        hideSpinner()
      }
    }
  };
  req.send();
}

function deleteAdd(id) {
  let req = new XMLHttpRequest();
  // Provide the URL for the POST request
  req.open(
    "GET",
    `http://localhost:3000/EcomWebSite-main2/Site%20Web%20Ecommerce/backend/PHP/Admin/delete.php?id=${id}`
  );

  req.onload = function () {
    if (req.status === 200 || req.readyState === 4) {
      const data = JSON.parse(req.response);

      alert(data.status);
      showAllAdresse("allAdresse");
    } else {
      console.error("request failed", req.status);
    }
  };

  req.send();
}
function showSpinner() {
  // This code will execute after the entire document and spinner element are fully loaded
  document.getElementById("spinner").style.display = "block"; // Show the spinner
  // Optionally, show the spinner container as well if needed
  document.querySelector(".spinner-container").style.display = "block";
  // Perform any other operations after the document has fully loaded
}

function hideSpinner() {
  document.getElementById("spinner").style.display = "none"; // Hide the spinner
  document.querySelector(".spinner-container").style.display = "none";
}

function showToast() {
  const toast = document.getElementById("toast");
  toast.classList.add("visible");
  toast.classList.remove("hidden");
  console.log("it worked");
  setTimeout(() => {
    toast.classList.remove("visible");
    toast.classList.add("hidden");
  }, 3000); // 3000 milliseconds (3 seconds) - adjust as needed
}

function codOrder() {
  let req = new XMLHttpRequest();
  // Provide the URL for the POST request
  req.open(
    "POST",
    "http://localhost:3000/EcomWebSite-main2/Site%20Web%20Ecommerce/backend/PHP/OrdersComfirm/insertInOrder.php"
  );

  const divs = document.getElementsByClassName("AdresseDiv");
  let idAdd; // Declare idAdd outside the loop to make it accessible later
  let payId;

  for (let i = 0; i < divs.length; i++) {
    const input = divs[i].querySelector("input");

    if (input.checked) {
      idAdd = divs[i].querySelector(".idAdd").textContent;
    }
  }
  payId = null;
  const id_user = localStorage.getItem("id_user");

  // Ensure 'payId' is defined (I assume you're setting it elsewhere)
  if (typeof payId !== "undefined" && typeof idAdd !== "undefined") {
    req.onload = function () {
      if (req.status === 200 || req.readyState === 4) {
        const data = JSON.parse(req.response);

        alert(data.status);
        sendEmail();
       
      } else {
        console.error("request failed", req.status);
      }
    };

    var form = new FormData();
    form.append("id_add", idAdd);
    form.append("pay_id", payId);
    form.append("id_user", id_user);
    form.append("pay_meth", "COD");
    form.append("status", "pending"); // Corrected the variable name here

    req.send(form);
  } else {
    console.error("Either payId or idAdd is undefined. Unable to send data.");
  }
}


function sendEmail() {
  showSpinner();
  let id = localStorage.getItem("id_user");

  let req = new XMLHttpRequest();
  req.open(
    "GET",
    `http://localhost:3000/EcomWebSite-main2/Site%20Web%20Ecommerce/backend/PHP/OrdersComfirm/emailComf.php?id=${id}`
  );
  req.onload = async () => {
    if (req.status === 200 || req.readyState === 4) {
      const messg = await req.response;
      
      document.getElementById("s3id").classList.add("ActiveNbr")
      document.getElementById("UserAdresseID").style.display = 'none';
      document.getElementById("PaymentID1").style.display = 'none';
      document.querySelector('.TotalPricesCont').style.display = "none";
      document.querySelector('.OrdDetailsContainer').style.display="none"
      document.getElementById('email-message').textContent=messg
      document.getElementById('email-message').style.display="block"
    
     hideSpinner()
    } else {
      console.error("error sending request");
    }
  };
  req.send();
}
