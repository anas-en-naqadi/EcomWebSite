function sendData() {
    let req = new XMLHttpRequest();
    req.open('POST', "http://localhost:3000/EcomWebSite-main2/Site%20Web%20Ecommerce/backend/PHP/Accounts/NewAccount.php");

    req.onload = function() {
        if (this.status == 200 || req.readyState === 4) {
            try {
                const data = req.responseText;
             if(data){
                alert(data);
                document.getElementById('LogInFormID').style.display="block"
                document.getElementById('LogInFormID2').style.display="none"
             }
            } catch (error) {
                console.error(error);
            }
        } else {
            console.error("Error");
        }
    };

    req.onerror = function(error) {
        console.error(error);
    };

    const form = document.getElementById('LogInFormID2');
    const Fdata = new FormData(form);
    req.send(Fdata);
}
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('VB').addEventListener('click', sendData);
});



function checkData() {
    let req = new XMLHttpRequest();
   
    req.open('POST', "http://localhost:3000/EcomWebSite-main2/Site%20Web%20Ecommerce/backend/PHP/Accounts/login.php");
   
    req.onload = function() {
        if (this.status == 200 || req.readyState === 4) {
            try {
                
                const data = JSON.parse(req.response);
                
                if(data.status=="user"){
                    nom = data.user_name;
                    id = data.id_user;

                    if(nom && id){
                        
                        
                        localStorage.setItem('id_user',id);
                        localStorage.setItem('user_name', nom);
                        
                        console.log('Redirecting to next page');
                        window.location.href = 'http://localhost/EcomWebSite-main2/Site%20Web%20Ecommerce/Frontend/Html/index.html';
                    }
               
               }else if(data.status == "admin"){
                window.location.href = "http://localhost/EcomWebSite-main2/Site%20Web%20Ecommerce/Frontend/Html/orderAdmin.html";
               }
               else{
                const div = document.getElementsByClassName('message')[0];
                div.textContent = data.status;
              
            }
            } catch (error) {
                console.error(error);
            }
        } else {
            console.error("Error");
        }
    };

    req.onerror = function(error) {
        console.error(error);
    };

    const form = document.getElementById('LogInFormID');
    const Fdata = new FormData(form);
    req.send(Fdata);
    
}
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('VB').addEventListener('click', sendData);
});