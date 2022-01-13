
/*----------about section tabs----------*/

(() =>{//this fucntion gets automatically called .

    const aboutSection=document.querySelector(".about-section");
    tabsContainer=document.querySelector(".about-tabs");
    
    tabsContainer.addEventListener("click",(event) =>{
       /*If the selected item has class 'tab-item' and does not have class 'active' then*/  
        if(event.target.classList.contains("tab-item")&& !event.target.classList.contains("active")){
           const target= event.target.getAttribute("data-target");
           /*deactivate existing tab item and acitvate clicked tab item*/
           tabsContainer.querySelector(".active").classList.remove("active","outer-shadow");

           event.target.classList.add("outer-shadow","active");

           /*deactivate existing active 'tab-content' and add new active 'tab-content'*/
           aboutSection.querySelector(".tab-content.active").classList.remove("active");
           
           aboutSection.querySelector(target).classList.add("active");
        }
    })
})();