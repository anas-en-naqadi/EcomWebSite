showSpinner();
window.onload=function(){
   
    setTimeout(()=>{
        getDetails("Television");
        tvPage2();
    },1800)
   
    nom = localStorage.getItem('user_name');

    if(nom){
    document.getElementById('LoginL').style.display = "none";
    document.getElementById('nom-user').textContent=nom;
    document.getElementById('user').style.display = "block";
    document.getElementById('nom-user').style.display = "block";
    
    }
  
    };

    function tvPage2() {
  
        const productType = "Television";
      
        dataFetch(".tv-recommendation", productType);
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
         const id =  url.searchParams.get('id');
         document.querySelector('#id_prod').textContent =id;
         document.querySelector('#id_prod').style.display="none";
        let req = new XMLHttpRequest();
        req.open('GET',`http://localhost:3000/EcomWebSite-main2/Site%20Web%20Ecommerce/backend/PHP/ProductDetails/fetchDetails.php?id=${id}&type=${type}`);
        req.send();
        document.querySelector('span').textContent =id;
        req.onload =async function(){
            if(req.status === 200 || req.readyState===4){
                try{
                    const data =await JSON.parse(req.response);
                    if(data){
                        const table = document.getElementsByClassName('AllTvDetails')[0];
                        const rows = table.querySelectorAll('tr');
                        const img = document.getElementById('img');
                        
                    
                            const element = data; 
                            // data phone header
                                img.src = "/EcomWebSite-main2/Site Web Ecommerce/backend/IMAGES/TV/"+element.image;
                              
                                document.querySelector('.TvName').textContent = element.nom_tv;
                                document.querySelector('.TvMarque').textContent = element.marque;
                                document.querySelector('.TvPrice').textContent = element.prix +' DH';
                                document.querySelector('.TvStock').textContent = element.stock;
                                document.querySelector('#QantiteProduitID').setAttribute('max', element.stock);
                                if(element.stock >=1){
                                    document.querySelector('.NoTvInStock').textContent = "En Stock"
                                    document.querySelector('.NoTvInStock').style.color = "green"
                                  }else{
                                    document.querySelector('.NoTvInStock').textContent= "Epuise";
                                    document.querySelector('.NoTvInStock').style.color="red"
                                    const button = document.querySelector('.AddToChartBTN');
                                    button.disabled = true;
                                    button.style.cursor = "not-allowed";
                                }
                                 // data phone middle
                                 document.querySelector('.TvTailleEcran').textContent = element.taille_ecran;
                                 document.querySelector('.TvSmart').textContent = element.smart_tv;
                                document.querySelector('.TvTypeEcran').textContent = element.type_eclairage;
                                 document.querySelector('.TvResolution').textContent = element.resolution;
                                //   document.querySelector('.WatshColor').textContent = element.couleur;
                               
                                // data table
                                rows[0].querySelector('td:nth-child(2)').textContent = element.marque;
                                rows[1].querySelector('td:nth-child(2)').textContent = element.nom_tv;
                                rows[2].querySelector('td:nth-child(2)').textContent = element.taille_ecran;
                                // rows[3].querySelector('td:nth-child(2)').textContent = element.type_ecran;

                                rows[4].querySelector('td:nth-child(2)').textContent = element.smart_tv; 
                                rows[5].querySelector('td:nth-child(2)').textContent = element.type_eclairage;
                                rows[6].querySelector('td:nth-child(2)').textContent = element.norme_hd;
                                rows[7].querySelector('td:nth-child(2)').textContent = element.resolution;
                                rows[8].querySelector('td:nth-child(2)').textContent = element.wifi;
 
                               

                                rows[9].querySelector('td:nth-child(2)').textContent = element.poids; 
                                rows[10].querySelector('td:nth-child(2)').textContent = element.hauteur;
                                rows[11].querySelector('td:nth-child(2)').textContent = element.largeur;
                                rows[12].querySelector('td:nth-child(2)').textContent = element.profondeur;

    
                               
                                  hideSpinner();
                           
                        }else{
                            alert("wao");
                        }
                    }catch(error){
                    
                        console.log(error);
                    }
                }
    
            }
        
    }
    
    