
    
    document.addEventListener('DOMContentLoaded',function(){
      
 fetchFilter("marque");
 fetchFilter("se");
 fetchFilter("couleur");


    });



let currentPage = 1; // Initialize the current page number
const productsPerPage = 16; // Number of products to display per page

const addMoreButton = document.getElementById('add_more');
addMoreButton.addEventListener('click', function () {
  currentPage++; // Increment the current page number

  dataFetch('.ListProducts', 'Telephone',0, currentPage, productsPerPage);
  
 

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
    req.open("GET", `http://localhost:3000/EcomWebSite-main2/Site%20Web%20Ecommerce/backend/PHP/filters/phoneFilter.php?type=${type}`);
    req.send();

    req.onload = function () {
        try {
            if (req.status === 200 || req.readyState === 4) {
                const data = JSON.parse(req.responseText);
                if (data.length >= 1) {
                    const div = document.createElement('div');
                    const span = document.createElement('span');
var name ;
                    span.className = "sidbarElement";
                    div.className = "filter";

                    if (type === "marque") {
                        span.textContent = "Marques";
                        name = "marque";
                    } else if (type === "se") {
                        span.textContent = "SYSTÈME D'EXPLOITATION";
                        name = "se";
                    } else if (type === "couleur") {
                        span.textContent = "COULEUR";
                        name = "couleur";
                    }

                    div.appendChild(span);

                    data.forEach(item => {
                        const inp = document.createElement('input');
                        inp.type = "checkbox";
                        inp.className = "sidbarCheckbox";
                        inp.value = item[type];
                        

                        inp.addEventListener('change', function() {
                            // Insérer ici le code que vous souhaitez exécuter lorsqu'un input est modifié
                            if (this.checked) {
                                displayProd("none");
                                
                                getFilters("Television", this.value, "phone");
                            }else{

                                removeFilteredElements(this.value);
                                
                                displayProd("block");
                            }
                        });

                        const label = document.createElement('label');
                        label.textContent = item[type];
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

function getSelectedFilters() {
    const checkboxes = document.querySelectorAll('.sidbarCheckbox:checked');
    const formData = new FormData();

    checkboxes.forEach(checkbox => {
        const categorySpan = checkbox.parentNode.querySelector('.sidbarElement').textContent;
        let categoryName;
      
        if (categorySpan === "Marques") {
            categoryName = "marque";
        } else if (categorySpan === "SYSTÈME D'EXPLOITATION") {
            categoryName = "se";
        } else if (categorySpan === "COULEUR") {
            categoryName = "couleur";
        }
        
        const checkboxValue = checkbox.value;
        
        // Append checkbox value to FormData under the category name
        formData.append(categoryName + '[' + checkboxValue + ']', checkboxValue);
    });
    
    return formData;
}





