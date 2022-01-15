
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

function bodyScrollingToggle(){
    document.body.classList.toggle("stop-scrolling");
}
/*------------portfolio filter and popup---------------*/

(()=>{
    const filterContainer=document.querySelector(".portfolio-filter");
    console.log(filterContainer);
    portfolioItemsContainer=document.querySelector(".portfolio-items");
    portfolioItems=document.querySelectorAll(".portfolio-item");
    popup=document.querySelector(".portfolio-popup");
    prevBtn=popup.querySelector(".pp-prev");
    nextBtn=popup.querySelector(".pp-next");
    closeBtn=popup.querySelector(".pp-close");
    projectDetailsContainer=popup.querySelector(".pp-details");
    projectDetailsBtn=popup.querySelector(".pp-project-details-btn");

    let itemIndex,slideIndex,screenshots;
    
    /*filter portfolio items */
    filterContainer.addEventListener("click",(event)=>{
        // console.log(event.target);
        if(!event.target.classList.contains("active")&&event.target.classList.contains("filter-item")){
            //deactivate previous active class
            filterContainer.querySelector(".active").classList.remove("active","outer-shadow");
            //Adding new active class
            event.target.classList.add("active","outer-shadow");
            //Get the data-target value of the current active class
            const target=event.target.getAttribute("data-target");

            portfolioItems.forEach((item)=>{
                if(target === item.getAttribute("data-category") || target=='all'){
                    item.classList.remove("hide");
                    item.classList.add("show");
                }else{
                    item.classList.remove("show");
                    item.classList.add("hide");
                }
            })
        }
    })

    portfolioItemsContainer.addEventListener("click",(event)=>{
        if(event.target.closest(".portfolio-item-inner")){
            const portfolioItem =event.target.closest(".portfolio-item-inner").parentElement;
            // console.log(portfolioItem);

            //get the portfolio item index
            itemIndex=Array.from(portfolioItem.parentElement.children).indexOf(portfolioItem);

            screenshots=portfolioItems[itemIndex].querySelector(".portfolio-item-img img").getAttribute("data-screenshots");

            //convert screenshots into array
            screenshots=screenshots.split(",");
            if(screenshots.length === 1){
                prevBtn.style.display="none";
                nextBtn.style.display="none";
            }else{
                prevBtn.style.display="block";
                nextBtn.style.display="block";
            }
            slideIndex=0;
            popupToggle();
            popupSlideShow();
            // popupDetailsToggle();
        }
    }) 

    closeBtn.addEventListener('click',()=>{
        popupToggle();
    })

    function popupToggle(){
        popup.classList.toggle("open");
        bodyScrollingToggle();
    }

    function popupSlideShow(){
        const imgSrc=screenshots[slideIndex];
        const popupImg=popup.querySelector(".pp-img");
        /*activate loader untill popuplog loaded */
        popup.querySelector(".pp-loader").classList.add("active");
        popupImg.src=imgSrc;
        popupImg.onload = () =>{
            //deactivate the loader after the popup image loaded
            popup.querySelector(".pp-loader").classList.remove("active");
        }

        popup.querySelector(".pp-counter").innerHTML=(slideIndex+1)+" of "+screenshots.length;
    }

    //next slide
    nextBtn.addEventListener("click",()=>{
        if(slideIndex === screenshots.length-1){
            slideIndex=0;
        }else{
            slideIndex++;
        }
        popupSlideShow();
    })

    //previous slide
     prevBtn.addEventListener("click", ()=>{
         if(slideIndex===0){
             slideIndex=screenshots.length-1;
         }else{
             slideIndex--;
         }
         popupSlideShow();
     })
     
     projectDetailsBtn.addEventListener("click",()=>{
         popupDetailsToggle();
     })


     function popupDetailsToggle(){
        if(projectDetailsContainer.classList.contains("active")){
            projectDetailsBtn.querySelector("i").classList.remove("fa-minus");
            projectDetailsBtn.querySelector("i").classList.add("fa-plus");
            projectDetailsContainer.classList.remove("active");
            projectDetailsContainer.style.maxHeight =0 + "px";
        }else{
            projectDetailsBtn.querySelector("i").classList.remove("fa-plus");
            projectDetailsBtn.querySelector("i").classList.add("fa-minus");
            projectDetailsContainer.classList.add("active");
            projectDetailsContainer.style.maxHeight =projectDetailsContainer.scrollHeight + "px";

            popup.scrollTo(0,projectDetailsContainer.offsetTop);
        }
     }

})();