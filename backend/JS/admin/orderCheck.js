document.addEventListener("DOMContentLoaded", function () {
  setOrderDetails("orders");
  setOrderDetails("users");
});

function clearTable() {
  const tbody = document.getElementById("tbody");
  while (tbody.firstChild) {
    tbody.removeChild(tbody.firstChild);
  }
}
function clearOrder() {
  const tbody = document.getElementById("tbody2");
  while (tbody.firstChild) {
    tbody.removeChild(tbody.firstChild);
  }
}
function setOrderDetails(type, id_user, id_cmd) {
  let total = 0;
  let req = new XMLHttpRequest();

  req.open(
    "GET",
    `http://localhost:3000/EcomWebSite-main2/Site%20Web%20Ecommerce/backend/PHP/Admin/orderCheck.php?id=${id_user}&type=${type}&cmd=${id_cmd}`
  );

  req.onload = function () {
    if (req.status === 200 || req.readyState === 4) {
      const data = JSON.parse(req.response);

      if (data) {
        if (type == "validate") {
          alert(data.status);
          location.reload();
        } else if (type == "orderDetails") {
          document.getElementsByName("UserName")[0].value =
            data[0].nom + " " + data[0].prenom;
          document.getElementsByName("UserEmail")[0].value = data[0].email;
          document.getElementsByName("UserPhone")[0].value = data[0].phone;
          document.getElementsByName("TrackingNo")[0].value =
            data[0].tracking_no;
          document.getElementsByName("UserVille")[0].value = data[0].ville;
          document.getElementsByName("UserAdresse")[0].value =
            data[0].address_line_1;
          document.getElementsByName("UserCP")[0].value = data[0].code_postal;
          document.getElementsByName("OrderDate")[0].value = data[0].created_at;
          document.getElementsByName("Payment")[0].value = data[0].methode_pay;
          document.getElementById("status").textContent = data[0].status;
          if (data[0].status == "confirmed") {
            document.getElementById("cmplt").style.display = "none";
            document.getElementById("annl").style.display = "none";
            document.querySelector(".UpdateBTN").style.display = "none";
          } else {
            document.getElementById("cmplt").style.display = "block";
            document.getElementById("annl").style.display = "block";
            document.querySelector(".UpdateBTN").style.display = "block";
          }
          document.getElementById("id_cmd").textContent = data[0].id_cmd;
          document.getElementsByClassName("TotalPriceValue")[0].value =
            data[0].total;
        }  else if (type == "OrderProd") {
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
        else if (type == "orders") {
          const container = document.getElementById("tbody2");

          if (data.length >= 1) {
            for (let i = 0; i < data.length; i++) {
              const tr = document.createElement("tr");
              const td1 = document.createElement("td");
              const td2 = document.createElement("td");
              const td3 = document.createElement("td");
              const td4 = document.createElement("td");
              const td5 = document.createElement("td");
              const td6 = document.createElement("td");
              const td7 = document.createElement("td");
              const button = document.createElement("button");
              button.textContent = "Voir Details";
              button.addEventListener("click", function () {
                const parent = this.parentElement.parentElement;

                const id_user =
                  parent.querySelector("td:nth-child(2)").textContent;
                const id_cmd =
                  parent.querySelector("td:nth-child(1)").textContent;
                clearTable();

                setOrderDetails("orderDetails", id_user, id_cmd);
                setOrderDetails("OrderProd", 0, id_cmd);

                ShowDetails();
              });
              button.classList.add("ViewOrderDetails");

              td7.appendChild(button);

              td1.textContent = data[i].id_cmd;
              td2.textContent = data[i].id_user;
              td3.textContent = data[i].tracking_no;
              td4.textContent = data[i].total;
              td5.textContent = data[i].created_at;
              td6.textContent = data[i].status;

              tr.appendChild(td1);
              tr.appendChild(td2);

              tr.appendChild(td3);

              tr.appendChild(td4);

              tr.appendChild(td5);

              tr.appendChild(td6);
              tr.appendChild(td7);

              container.appendChild(tr);
            }
          } else if (data.length === 1 && data[0].status === "no data found") {
            document.getElementById("no-data").textContent = data.status;
          } else {
            console.error("error data format");
          }
        }  else if (type == "users") {
          const container = document.getElementById("tbody3");

          if (data.length >= 1) {
            for (let i = 0; i < data.length; i++) {
              const tr = document.createElement("tr");
              const td1 = document.createElement("td");
              const td2 = document.createElement("td");
              const td3 = document.createElement("td");
              const td4 = document.createElement("td");
              const td5 = document.createElement("td");
              const td6 = document.createElement("td");
              const td7 = document.createElement("td");
            
              td1.textContent = data[i].id_user;
              td2.textContent = data[i].nom;
              td3.textContent = data[i].prenom;
              td4.textContent = data[i].email;
              td5.textContent = data[i].pass
              td6.textContent = data[i].phone;
              td7.textContent = data[i].created_at;

              tr.appendChild(td1);
              tr.appendChild(td2);

              tr.appendChild(td3);

              tr.appendChild(td4);

              tr.appendChild(td5);

              tr.appendChild(td6);
              tr.appendChild(td7);

              container.appendChild(tr);
              document.getElementById('ProduitDetails').style.display="flex";
            }
          } else if (data.length === 1 && data[0].status === "no data found") {
            document.getElementById("no-data").textContent = data.status;
          } else {
            console.error("error data format");
          }
        } 
        countOrd('tbody3','UserCounter');
        countOrd('tbody2','OrdersCounter');
      } else {
        alert(data.status);
      }
    }
  };
  req.send();
}

function cancelOrder(element) {
  const tr = element.parentElement;

  const id = tr.querySelector("#id_cmd").textContent;
  const type = tr.querySelector("#statutID").value;

  if (type == "Completer") {
    setOrderDetails("validate", 0, id);
  } else {
    var select = "order";

    let req = new XMLHttpRequest();

    req.open(
      "GET",
      `http://localhost:3000/EcomWebSite-main2/Site%20Web%20Ecommerce/backend/PHP/Admin/delete.php?type=${select}&idi=${id}`
    );

    req.send();

    req.onload = function () {
      if (req.status === 200 || req.readyState === 4) {
        try {
          const data = req.responseText;
          if (data) {
            alert(data);

            clearOrder();
            location.reload();
          }
        } catch (error) {
          console.error(error);
        }
      }
    };
    req.onerror = function (error) {
      console.error(error);
    };
  }
}
