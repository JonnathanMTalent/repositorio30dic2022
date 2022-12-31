(function() {
    var out = {};
    var next_page_selector = "a.next"; //selector to identify the next button

    var clickable_elem = document.querySelector(next_page_selector);

    //stop condition
    if (!clickable_elem) {
        //last page
        out["has_next_page"] = false;
    } else {
        //go to next page
        clickable_elem.click();
        out["has_next_page"] = true;
    }
    out.waitFor = "a.jobdetail";
    return out;
})();



//next mas corta
(function() {
    var out = {};
    var clickable_elem=document.querySelector('a[aria-label="View next page"]:not(a[class="au-target aurelia-hide"])');
   clickable_elem!=null ? (clickable_elem.click(),out["has_next_page"] =true) :msg('No hay mas paginas');
    //out.waitFor = "a.jobdetail";
    return out;
})();



(function() {
    var out = {};
    var clickable_elem=document.querySelector('a[aria-label="Next page"]');
   clickable_elem!=null ? (clickable_elem.click(),out["has_next_page"] =true) :out["has_next_page"] =false;
    //out.waitFor = "a.jobdetail";
    return out;
})();