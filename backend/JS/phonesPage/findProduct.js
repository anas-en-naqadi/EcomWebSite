

function filterData(classe) {
  const parent = document.querySelector(`.${classe}`);
  var elements = parent.querySelectorAll('.Element');

  const val = document.getElementsByName('Search')[0].value.toLowerCase();
 
  elements.forEach(element => {
    const productName = element.querySelector('span:nth-child(3)');
  
    if (productName && productName.textContent) {

      const nameText = productName.textContent.toLowerCase();
    

      if (nameText.includes(val)) {
        element.style.display = '';
      } else {
        element.style.display = 'none';
      }
    } else {
      console.error('Product name or textContent not found in Element');
    }
  });
}