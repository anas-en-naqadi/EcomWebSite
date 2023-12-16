showSpinner();
window.onload=function(){
    


nom = localStorage.getItem('user_name');

  if(nom){
  document.getElementById('LoginL').style.display = "none";
  document.getElementById('user').style.display = "block";
  document.getElementById('nom-user').textContent=nom;
  }
  setTimeout(()=>{
    getDetails("Telephone");
    phonePage1();
  },1800)
 

 
};
function phonePage1() {
 
  const productType = "Telephone";

  dataFetch(".phone-recomendation", productType);
}
function showSpinner() {
   
    document.getElementById("spinner").style.display = "block"; // Show the spinner
    // Optionally, show the spinner container as well if needed
    document.querySelector(".spinner-container").style.display = "block";
    // Perform any other operations after the document has fully loaded
  }
  
  function hideSpinner() {
    document.getElementById("spinner").style.display = "none"; // Hide the spinner
    document.querySelector(".spinner-container").style.display = "none";
  }

  function ShowLogInForm(){
    document.getElementById("OverLayID").style.display = 'block';
    document.getElementById("OverLayID2").style.display = 'none';
    document.body.style.overflowY = 'hidden';
}


function getDetails(type){
    const url = new URL(window.location.href);
    const id = url.searchParams.get('id');
    
    let req = new XMLHttpRequest();
    req.open('GET',`http://localhost:3000/EcomWebSite-main2/Site%20Web%20Ecommerce/backend/PHP/ProductDetails/fetchDetails.php?id=${id}&type=${type}`);
    req.send();
    const idProdElement = document.getElementById('id_prod');
    idProdElement.textContent=id;

    document.querySelector('#id_prod').style.display="none";
    req.onload =async function(){
        if(req.status === 200 || req.readyState===4){
            try{
                const data = await JSON.parse(req.response);
                if(data){

                    const table = document.getElementsByClassName('AllPhoneDetails')[0];
                    const rows = table.querySelectorAll('tr');
                    const img = document.getElementById('img');
                    
                
                        const element = data; 
                        // data phone header
                            img.src = "/EcomWebSite-main2/Site Web Ecommerce/backend/IMAGES/PHONE/"+element.image;
                           


                      
                            document.querySelector('.PhoneOS').textContent = element.se;
                            document.querySelector('.PhoneName').textContent = element.nom_tele;
                            document.querySelector('.PhoneMarque').textContent = element.marque;
                            document.querySelector('.PhonePrice').textContent = element.prix +' DH';
                            document.querySelector('.PhoneStock').textContent = element.stock;
                            document.querySelector('#QantiteProduitID').setAttribute('max', element.stock);
                            if(element.stock >=1){
                                document.querySelector('.NoPhoneInStock').textContent = "En Stock"
                                document.querySelector('.NoPhoneInStock').style.color = "green"
                               
                              }else{
                                document.querySelector('.NoPhoneInStock').textContent= "Epuise";
                                document.querySelector('.NoPhoneInStock').style.color="red"
                              
                                const button = document.querySelector('.AddToChartBTN');
                                button.disabled = true;
                                button.style.cursor = "not-allowed";
                              }
                          

                             // data phone middle
                             document.querySelector('.PhoneStockage').textContent = element.stockage;
                             document.querySelector('.PhoneReseau').textContent = element.reseau;
                              document.querySelector('.PhoneColor').textContent = element.couleur;
                           
                            // data table
                            rows[0].querySelector('td:nth-child(2)').textContent = element.marque;
                            rows[1].querySelector('td:nth-child(2)').textContent = element.nom_tele;
                            rows[2].querySelector('td:nth-child(2)').textContent = element.taille_ecran;
                            rows[3].querySelector('td:nth-child(2)').textContent = element.ram;
                            rows[4].querySelector('td:nth-child(2)').textContent = element.stockage; 
                            rows[5].querySelector('td:nth-child(2)').textContent = element.se;
                            rows[6].querySelector('td:nth-child(2)').textContent = element.reseau;
                            rows[7].querySelector('td:nth-child(2)').textContent = element.couleur;
                            rows[8].querySelector('td:nth-child(2)').textContent = element.qualite_camera;
                            rows[9].querySelector('td:nth-child(2)').textContent = element.battery;
                            rows[10].querySelector('td:nth-child(2)').textContent = element.hauteur; 
                            rows[11].querySelector('td:nth-child(2)').textContent = element.largeur;
                            rows[12].querySelector('td:nth-child(2)').textContent = element.profondeur;
                            rows[13].querySelector('td:nth-child(2)').textContent = element.poids;

                           
                            
                        
                    }else{
                        alert("wao");
                    }
                    hideSpinner();
                }catch(error){
                    
                    console.log(error);
                }
            }

        }
    
}

