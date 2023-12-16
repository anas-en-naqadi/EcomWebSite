










document.getElementById("table").addEventListener("click", function (event) {
  if (event.target.id === "red") {
    const row = event.target.closest("tr"); // Find the closest table row
    const id = row.querySelector("td:first-child").textContent; // Get the ID from the first <td>
    const select = document.getElementById("item-select").value;
  

    let req = new XMLHttpRequest();
    req.open(
      "GET",
      `http://localhost:3000/EcomWebSite-main2/Site%20Web%20Ecommerce/backend/PHP/Admin/delete.php?type=${select}&idi=${id}`
    );
    req.send();

    req.onload = function () {
      try {
        if (req.status === 200 || req.readyState === 4) {
          const data = req.response;
          if (data) {
            alert(data);
            row.remove();
          } else {
            alert("row not deleted");
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
  }
  if (event.target.id === "green") {
    const row = event.target.closest("tr"); // Find the closest table row
    const id = row.querySelector("td:first-child").textContent; // Get the ID from the first <td>
    const select = document.getElementById("item-select").value;
    const upd = document.getElementById("upd");

    let req = new XMLHttpRequest();
    req.open(
      "GET",
      `http://localhost:3000/EcomWebSite-main2/Site%20Web%20Ecommerce/backend/PHP/Admin/getForUpdate.php?type=${select}&idi=${id}`
    );
    req.send();
    const form = document.getElementById("update");
    req.onload = function () {
      try {
        if (req.status === 200 || req.readyState === 4) {
          const data = JSON.parse(req.responseText);

          if (data && data.length > 0) {
            // Your code to populate form inputs with retrieved data
            // Make sure to adjust the property names according to your actual data structure
            const inputs = form.querySelectorAll("input");
            const div = document.getElementsByClassName("modal-content")[0];
            const div1 = document.getElementsByClassName("modal")[0];
            if (select === "Ordinateurs") {
              inputs[0].value = data[0]["nom_pc"];
            } else if (select === "Smart Watch") {
              inputs[0].value = data[0]["nom_watch"];
            } else if (select === "Television") {
              inputs[0].value = data[0]["nom_tv"];
            } else if (select === "Telephone") {
              inputs[0].value = data[0]["nom_tele"];
            }

            inputs[2].value = data[0]["prix"];
            inputs[3].value = data[0]["stock"];
       
          
            div1.style.display = "block";
            div.style.display = "block";
            upd.onclick = function () {
              update(id,select,div,div1);
            };
          }
        } else {
          alert("row data fetched");
        }
      } catch (error) {
        console.error(error);
      }
    };
  }
});


function update(id, type, div, div1) {
  const formData = new FormData(document.getElementById("update"));
  
  // Get the image file from an input element
  const imageFile = document.getElementById('imag').files[0];
  
  // Append the image file to the FormData object
  formData.append('image', imageFile);

  // Append the 'type' to the FormData object
  formData.append('type', type);

  const xhr = new XMLHttpRequest();
  xhr.open("POST", `http://localhost:3000/EcomWebSite-main2/Site%20Web%20Ecommerce/backend/PHP/Admin/update.php?id=${id}`);
  // Remove the following line as you're sending FormData, not JSON
  // xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onload = function () {
    if (xhr.status === 200) {
      const response = xhr.responseText;
      alert(response);
      div1.style.display = "none";
      div.style.display = "none";
      deleteRows();
    } else {
      console.error("Failed to update data. Status:", xhr.status);
    }
  };

  xhr.onerror = function () {
    console.error("Request failed");
  };

  // Send the FormData object as the request body
  xhr.send(formData);
}

document.getElementById('closeUpd').addEventListener('click', function() {
  document.getElementById('model').style.display = "none";
  document.getElementById('myModal').style.display = "none";
});
