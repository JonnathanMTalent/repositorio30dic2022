//Paginar por número de jobs por página

(function () {
    var out = {};
    var jobs_number = 15;    // número de jobs por página. Jobs amount per page
    var selector = "tr.GridPager td a";

    if (typeof pass_it == "undefined") pass_it = {};
    if (typeof msg == "undefined") msg = console.log;

    if (!pass_it["cont"]) {
        out["pass_it"] = {
            "cont": 1,
            "jobs": jobs_number
        };
    } else {
        out["pass_it"] = pass_it;
    }

    if (out["pass_it"]["jobs"] > 0) {
      	out["pass_it"].cont += 1;
        var all_elems = document.querySelectorAll(selector);
        [].forEach.call(all_elems, function(elemento){
            if(elemento.textContent.trim() == out["pass_it"].cont){                
              	//msg("click!!!!!"+elemento.textContent.trim());
                elemento.click();
              	out["has_next_page"] = true;
            }
        });  
    } else {
        out["has_next_page"] = false;
    }

    out.waitFor = '';
    return out;
})();