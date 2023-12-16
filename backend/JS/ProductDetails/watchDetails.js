showSpinner();
window.onload=function(){
    setTimeout(()=>{
        getDetails("Watch");
        watchPage1()
    },1800)
    
    nom = localStorage.getItem('user_name');

    if(nom){
    document.getElementById('LoginL').style.display = "none";
    document.getElementById('nom-user').textContent=nom;
    document.getElementById('user').style.display = "block";
    document.getElementById('nom-user').style.display = "block";
    
    }
  
    };
    
function watchPage1() {
 
    const productType = "SmartWatch";
  
    dataFetch(".watch-recommendation", productType);
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

      function ShowLogInForm(){
        document.getElementById("OverLayID").style.display = 'block';
        document.getElementById("OverLayID2").style.display = 'none';
        document.body.style.overflowY = 'hidden';
    }
    
    function getDetails(type){
        const url = new URL(window.location.href);
         const id =url.searchParams.get('id');
         document.querySelector('#id_prod').textContent =id;
         document.querySelector('#id_prod').style.display="none";
        let req = new XMLHttpRequest();
        req.open('GET',`http://localhost:3000/EcomWebSite-main2/Site%20Web%20Ecommerce/backend/PHP/ProductDetails/fetchDetails.php?id=${id}&type=${type}`);
        req.send();
        document.querySelector('span').textContent =id;
        req.onload =async function(){
            if(req.status === 200 || req.readyState===4){
                try{
                    const data = await JSON.parse(req.response);
                    if(data){
                        const table = document.getElementsByClassName('AllWatshDetails')[0];
                        const rows = table.querySelectorAll('tr');
                        const img = document.getElementById('img');
                        
                    
                            const element = data; 
                            // data phone header
                                img.src = "/EcomWebSite-main2/Site Web Ecommerce/backend/IMAGES/WATCH/"+element.image;
                              
                                document.querySelector('.WatshName').textContent = element.nom_watch;
                                document.querySelector('.WatshMarque').textContent = element.marque;
                                document.querySelector('.WatshPrice').textContent = element.prix +' DH';
                                document.querySelector('.WatshStock').textContent = element.stock;
                                document.querySelector('#QantiteProduitID').setAttribute('max', element.stock);
                                if(element.stock >=1){
                                    document.querySelector('.NoWatshInStock').textContent = "En Stock"
                                    document.querySelector('.NoWatshInStock').style.color = "green"
                                   
                                  }else{
                                    document.querySelector('.NoWatshInStock').textContent= "Epuise";
                                    document.querySelector('.NoWatshInStock').style.color="red"
                                    const button = document.querySelector('.AddToChartBTN');
                                    button.disabled = true;
                                    button.style.cursor = "not-allowed";
                                }
                                 // data phone middle
                                 document.querySelector('.WatshDiametre').textContent = element.diametre;
                                 document.querySelector('.WatshPoids').textContent = element.poids;
                                //   document.querySelector('.WatshColor').textContent = element.couleur;
                               
                                // data table
                                rows[0].querySelector('td:nth-child(2)').textContent = element.marque;
                                rows[1].querySelector('td:nth-child(2)').textContent = element.nom_watch;
                                rows[2].querySelector('td:nth-child(2)').textContent = element.diametre;
                                // rows[3].querySelector('td:nth-child(2)').textContent = element.couleur;
                                rows[4].querySelector('td:nth-child(2)').textContent = element.poids; 
                                rows[5].querySelector('td:nth-child(2)').textContent = element.hauteur;
                                rows[6].querySelector('td:nth-child(2)').textContent = element.largeur;
                                rows[7].querySelector('td:nth-child(2)').textContent = element.profondeur;

    
hideSpinner();                               
                                  
                            
                        }else{
                            alert("no data sent form db");
                        }
                    }catch(error){
                      
                        console.log(error);
                    }
                }
    
            }
        
    }
    
    