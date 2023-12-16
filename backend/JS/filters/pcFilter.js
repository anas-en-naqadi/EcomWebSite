


document.addEventListener('DOMContentLoaded',function(){
    fetchFilter("se");
    fetchFilter("type_stockage");
    fetchFilter("marque");
    fetchFilter("ram");
});
    
    

    
let currentPage = 1; // Initialize the current page number
const productsPerPage = 16; // Number of products to display per page

// Fetch the initial products for the first page


// Add event listener to "Add More" button
const addMoreButton = document.getElementById('add_more');
addMoreButton.addEventListener('click', function () {
  currentPage++; // Increment the current page number



  dataFetch('.PcLists', 'Ordinateurs',0, currentPage, productsPerPage);



});
  





function displayProd(val){
    const container = document.querySelectorAll(".Element");
    container.forEach((element)=>{
        element.style.display = val;
    })
    

}
function fetchFilter(type) {
    const form = document.getElementById('form');
    const req = new XMLHttpRequest();
    req.open("GET", `http://localhost:3000/EcomWebSite-main2/Site%20Web%20Ecommerce/backend/PHP/filters/pcFilter.php?type=${type}`);
    req.send();

    req.onload = function () {
        try {
            if (req.status === 200 || req.readyState === 4) {
                const data = JSON.parse(req.responseText);
                if (data.length >= 1) {
                    const div = document.createElement('div');
                    const span = document.createElement('span');

                    span.className = "sidbarElement";
                    div.className = "filter";

                    if (type === "ram") {
                        span.textContent = "MEMOIRE RAM";
                    } else if (type === "processeur") {
                        span.textContent = "PROCESSEUR";
                    }else if (type === "type_stockage") {
                        span.textContent = "STOCKAGE";
                    }else if (type === "se") {
                        span.textContent = "SYSTÈME D'EXPLOITATION";
                    }else if (type === "marque") {
                        span.textContent = "Marques";
                    }

                    div.appendChild(span);

                    data.forEach(item => {
                        const inp = document.createElement('input');
                        inp.type = "checkbox";
                        inp.className = "sidbarCheckbox";
                        const label = document.createElement('label');
                       
                       
                            inp.value = item[type];
                            label.textContent = item[type];
                        
                        
                        inp.addEventListener('change', function() {
                            // Insérer ici le code que vous souhaitez exécuter lorsqu'un input est modifié
                            if (this.checked) {
                               
                                getFilters(span.textContent, this.value,"pc");
                                displayProd("none");
                                
                            } else {

                                removeFilteredElements(this.value);
                                
                                displayProd("block");
                            }
                        });

                       
                        const br = document.createElement('br');

                        div.appendChild(inp);
                        div.appendChild(label);
                        div.appendChild(br);
                    });

                    form.appendChild(div);
                }
            }
        } catch (error) {
            console.error(error);
        }
    }
}
