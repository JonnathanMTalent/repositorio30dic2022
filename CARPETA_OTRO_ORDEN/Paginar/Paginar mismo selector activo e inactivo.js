
//paginación con mismo selector activo e inactivo:

(function() {
    var out = {};
    var next_page_selector = "#next"; //selector to identify the next button
    var last_page_selector = "#next.navigation-link-disabled"; //selector to identify the last page

    var clickable_elem = document.querySelector(next_page_selector);

    //stop condition
    if (document.querySelector(last_page_selector)) {
        //last page
        out["has_next_page"] = false;
    } else if(clickable_elem){
        //go to next page
        clickable_elem.click();
        out["has_next_page"] = true;
    } else {
        //try again
        out["has_next_page"] = true;
    }

    out.waitFor = next_page_selector;
    return out;
})();



//Otro next page cuando a no tiene clase


(function() {
    var out = {};
    var next_page_selector = "div.paginator.paginator--bottom a"; //selector to identify the next button
    var last_page_selector = ""; //selector to identify the last page
  
    out["has_next_page"] = false;
  
    var clickable_elem = document.querySelectorAll(next_page_selector);
    for (const a of clickable_elem) {
      if(a.textContent.includes('Next')){
        a.click();
        out["has_next_page"] = true;
      } 
    }
  
    out.waitFor = "div.pb-4";
    return out;
  })();