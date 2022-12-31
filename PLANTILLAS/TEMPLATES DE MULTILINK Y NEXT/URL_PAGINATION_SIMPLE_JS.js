(function() {
    var out = {};
    var next_page_selector = "li.next > a"; //selector to identify the next button

    var clickable_elem = document.querySelector(next_page_selector);
    if (typeof pass_it == "undefined") pass_it = {};
    if (!pass_it["cont"]) {
        out["pass_it"] = {
            "cont": 1
        };
    } else {
        out["pass_it"] = pass_it;
    }
    //stop condition
    if (!clickable_elem) {
        //last page
        out["has_next_page"] = false;
    } else {
        //go to next page
        window.location.href = "https://jobs.everis.com/es/ofertas-mexico?page=" + out["pass_it"].cont;
        out["pass_it"].cont++;
        out["has_next_page"] = true;
    }
    out.waitFor = ".views-row";
    return out;
})();