
showSpinner();
window.onload=function(){
    nom = localStorage.getItem('user_name');

    if(nom){
    document.getElementById('LoginL').style.display = "none";
    document.getElementById('nom-user').textContent=nom;
    document.getElementById('nom-user').style.display = "block";
    document.getElementById('user').style.display = "block";
    
    
    }
    setTimeout(()=>{
        getDetails("Pc");
pcPage1();
      },1800)
   


    };

    function pcPage1() {

        const productType = "Ordinateurs";
      
        dataFetch(".pc-recommendation", productType);
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
         const id = url.searchParams.get('id');
         document.querySelector('#id_prod').textContent =id;
         document.querySelector('#id_prod').style.display="none";
        let req = new XMLHttpRequest();
        req.open('GET',`http://localhost:3000/EcomWebSite-main2/Site%20Web%20Ecommerce/backend/PHP/ProductDetails/fetchDetails.php?id=${id}&type=${type}`);
        req.send();
    document.querySelector('span').textContent =id;
    document.querySelector('span').style.display="none";
        req.onload = async function(){
            if(req.status === 200 || req.readyState===4){
                try{
                    const data = await JSON.parse(req.response);
                    if(data){
                        const table = document.getElementsByClassName('AllPcDetails')[0];
                        const rows = table.querySelectorAll('tr');
                        const img = document.getElementById('img');
                        
                    
                            const element = data; 
                            // data phone header
                                img.src = "/EcomWebSite-main2/Site Web Ecommerce/backend/IMAGES/PC/"+element.image;
                              
                                document.querySelector('.PcName').textContent = element.nom_pc;
                                document.querySelector('.PcOS1').textContent = element.se;
                                document.querySelector('.PcPrice').textContent = element.prix +' DH';
                                
                                document.querySelector('.PcMarque').textContent = element.marque;
                                document.querySelector('.PcStock').textContent=element.stock;
                                document.querySelector('#QantiteProduitID').setAttribute('max', element.stock);
                                if(element.stock >=1){
                                    document.querySelector('.NoPcInStock').textContent = "En Stock"
                                    document.querySelector('.NoPcInStock').style.color = "green"
                                  }else{
                                    document.querySelector('.NoPcInStock').textContent= "Epuise";
                                    document.querySelector('.NoPcInStock').style.color="red"
                                    const button = document.querySelector('.AddToChartBTN');
                                    button.disabled = true;
                                    button.style.cursor = "not-allowed";
                                    document.querySelector('.DecrementQ').disabled= true;
                                    document.querySelector('.IncrementQ').disabled = true;
                                    document.querySelector('#QantiteProduitID').value = 0;
                                    
                                    
                                }
                                 // data phone middle
                                 document.querySelector('.PcProcesseur').textContent = element.processeur;
                                 document.querySelector('.PcRAM').textContent = element.ram;
                                 document.querySelector('.PcDisque').textContent = element.stockage;
                                 document.querySelector('.PcOS2').textContent = element.se;
                                
                               
                                // data table
                                rows[0].querySelector('td:nth-child(2)').textContent = element.marque;
                                rows[1].querySelector('td:nth-child(2)').textContent = element.nom_pc;
                                
                                rows[2].querySelector('td:nth-child(2)').textContent = element.taille_ecran;
                                rows[3].querySelector('td:nth-child(2)').textContent = element.processeur;

                                rows[4].querySelector('td:nth-child(2)').textContent = element.ram;
                                rows[5].querySelector('td:nth-child(2)').textContent = element.type_stockage;
                                rows[6].querySelector('td:nth-child(2)').textContent = element.stockage;

                                rows[7].querySelector('td:nth-child(2)').textContent = element.se;
                                rows[8].querySelector('td:nth-child(2)').textContent = element.couleur;
                                rows[9].querySelector('td:nth-child(2)').textContent = element.carte_graphique;
                                rows[10].querySelector('td:nth-child(2)').textContent = element.frequence;
                                rows[11].querySelector('td:nth-child(2)').textContent = element.battery;
                                
 
                                rows[12].querySelector('td:nth-child(2)').textContent = element.hauteur;
                                rows[13].querySelector('td:nth-child(2)').textContent = element.largeur;
                                rows[14].querySelector('td:nth-child(2)').textContent = element.profondeur;
                                rows[15].querySelector('td:nth-child(2)').textContent = element.poids;
    
                               
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
    
    