// var nbrPages = 4;

// window.onload = function () {
//     let myDiv = document.getElementById("nextpagesid");

//     for (let i = 0; i < nbrPages + 4; i++) {
//         if (i == 0) {
//             let firstPage = document.createElement("a");
//             firstPage.classList.add("FirstPage");
//             firstPage.id = "FirstPageID";
//             firstPage.href = "#";
//             firstPage.addEventListener("click" , function(){
//                 GotoFirstPage();
//             });
//             myDiv.appendChild(firstPage);
//         } else if (i == 1) {
//             let previousPage = document.createElement("a");
//             previousPage.classList.add("PreviousPageToLeft");
//             previousPage.id = "PreviousPageToLeftID";
//             previousPage.href = "#";
//             previousPage.addEventListener("click" , function(){
//                 PreviousPage();
//             });
//             myDiv.appendChild(previousPage);
//         } else if (i == nbrPages + 2) {
//             let nextPage = document.createElement("a");
//             nextPage.classList.add("NextPageToRight", "Active");
//             nextPage.id = "NextPageToRightID";
//             nextPage.addEventListener("click", function () {
//                 movetonextpage();
//             });
//             nextPage.href = "#";
//             myDiv.appendChild(nextPage);
//         } else if (i == nbrPages + 3) {
//             let lastPage = document.createElement("a");
//             lastPage.classList.add("LastPage", "Active");
//             lastPage.id = "lastPageID";
//             lastPage.href = "#";
//             lastPage.addEventListener("click" , function(){
//                 GotoLastPage();
//             });
//             myDiv.appendChild(lastPage);
//         } else {
//             let NewPageLink = document.createElement("a");
//             NewPageLink.classList.add("newdiv");
//             NewPageLink.id = `NewPageLinkID_${i - 1}`;
//             NewPageLink.href = "#";
//             NewPageLink.textContent = `${i - 1}`;
//             myDiv.appendChild(NewPageLink);
//             NewPageLink.addEventListener("click", function () {
//                 setCurrentPage(i -1); 
//             });
//         }
//     }
//     setCurrentPage(1);
// };

// function setCurrentPage(pageNumber) {
//     const pageLinks = document.querySelectorAll(".newdiv");

//     pageLinks.forEach(link => link.classList.remove("CurrentPage"));

//     pageLinks[pageNumber -1].classList.add("CurrentPage");

//     const isFirstOrSecondPage = pageNumber >= 2;
//     if (isFirstOrSecondPage) {
//         document.getElementById("FirstPageID").classList.add("FirstPage", "Active");
//         document.getElementById("PreviousPageToLeftID").classList.add("PreviousPageToLeft", "Active");
//     } else {
//         document.getElementById("FirstPageID").classList.remove("Active");
//         document.getElementById("PreviousPageToLeftID").classList.remove("Active");
//     }
//     console.log("Page " + (pageNumber) + " selected");

//     const IsNotLastPage = pageNumber!= nbrPages;
//     if(IsNotLastPage){
//         document.getElementById("lastPageID").classList.add("Active");
//         document.getElementById("NextPageToRightID").classList.add("Active");
//     }
//     else{
//         document.getElementById("lastPageID").classList.remove("Active");
//         document.getElementById("NextPageToRightID").classList.remove("Active");
//     }
// }

// function movetonextpage() {
//     const currentPageLink = document.querySelector(".newdiv.CurrentPage");
//     const currentIndex = Array.from(currentPageLink.parentNode.children).indexOf(currentPageLink);
//     setCurrentPage(currentIndex);
// }

// function GotoLastPage(){
//     const pageLinks = document.querySelectorAll(".newdiv");
//     pageLinks.forEach(link => link.classList.remove("CurrentPage"));
//     pageLinks[pageLinks.length-1].classList.add("CurrentPage");
//     document.getElementById("FirstPageID").classList.add("FirstPage", "Active");
//     document.getElementById("PreviousPageToLeftID").classList.add("PreviousPageToLeft", "Active");
//     document.getElementById("lastPageID").classList.remove("Active");
//     document.getElementById("NextPageToRightID").classList.remove("Active");
// }

// function PreviousPage(){
//     const currentPageLink = document.querySelector(".newdiv.CurrentPage");
//     const currentIndex = Array.from(currentPageLink.parentNode.children).indexOf(currentPageLink);
//     setCurrentPage(currentIndex - 2);
// }

// function GotoFirstPage(){
//     const pageLinks = document.querySelectorAll(".newdiv");
//     pageLinks.forEach(link => link.classList.remove("CurrentPage"));
//     pageLinks[0].classList.add("CurrentPage");
//     document.getElementById("FirstPageID").classList.remove("Active");
//     document.getElementById("PreviousPageToLeftID").classList.remove("Active");
// }