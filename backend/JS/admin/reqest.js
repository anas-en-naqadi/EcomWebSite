function watch() {
  req = new XMLHttpRequest();
  req.open(
    "POST",
    "http://localhost:3000/EcomWebSite-main2/Site%20Web%20Ecommerce/backend/PHP/Admin/watch.php"
  );

  req.onload = function () {
    if (req.status === 200 || req.readyState === 4) {
      try {
        const data = req.response;
        if (data) {
          console.log(data);
          alert(data);
          
        } else {
          alert(" no data inserted ");
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log("Error: " + req.status); // Log the error status
    }
  };

  req.onerror = function () {
    console.error("Network error occurred");
  };
  var form3 = new FormData(document.getElementById("WatchForm"));
  
  req.send(form3);
  document.getElementById("WatchForm").reset();
}
function tv() {
  req = new XMLHttpRequest();
  req.open(
    "POST",
    "http://localhost:3000/EcomWebSite-main2/Site%20Web%20Ecommerce/backend/PHP/Admin/tv.php"
  );

  req.onload = function () {
    if (req.status === 200 || req.readyState === 4) {
      try {
        const data = req.response;
        if (data) {
          alert(data);
        } else {
          alert(" no data inserted ");
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log("Error: " + req.status); // Log the error status
    }
  };

  req.onerror = function () {
    console.error("Network error occurred");
  };
  var form3 = new FormData(document.getElementById("TvForm"));
  
  req.send(form3);
  document.getElementById("TvForm").reset();
}
function pc() {
  req = new XMLHttpRequest();
  req.open(
    "POST",
    "http://localhost:3000/EcomWebSite-main2/Site%20Web%20Ecommerce/backend/PHP/Admin/pc.php"
  );

  req.onload = function () {
    if (req.status === 200 || req.readyState === 4) {
      try {
        const data = req.response;
        if (data) {
          alert(data);
        } else {
          alert(" no data inserted ");
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log("Error: " + req.status); // Log the error status
    }
  };

  req.onerror = function () {
    console.error("Network error occurred");
  };
  var form3 = new FormData(document.getElementById("PcForm"));
  req.send(form3);
  document.getElementById("PcForm").reset();
}
function phone() {
  req = new XMLHttpRequest();
  req.open(
    "POST",
    "http://localhost:3000/EcomWebSite-main2/Site%20Web%20Ecommerce/backend/PHP/Admin/phone.php"
  );

  req.onload = function () {
    if (req.status === 200 || req.readyState === 4) {
      try {
        const data = req.response;
        if (data) {
          console.log(data);
          alert(data);
          
        } else {
          alert(" no data inserted ");
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log("Error: " + req.status); // Log the error status
    }
  };

  req.onerror = function () {
    console.error("Network error occurred");
  };
  var form1 = new FormData(document.getElementById("PhoneForm"));
  
  req.send(form1);


}
