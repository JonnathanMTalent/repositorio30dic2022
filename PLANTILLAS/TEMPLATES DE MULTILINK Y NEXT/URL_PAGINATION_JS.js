(function () {
    var out = {};
    var jobs_number = 0;    // número de jobs por página. Jobs amount per page
    var url_base = "";  // url con la que se arma la url final
    var selector = "";  //valdra como condicion de parada
    if (typeof pass_it == "undefined") pass_it = {};
    if (typeof msg == "undefined") msg = console.log;
    if (!pass_it["cont"]) {
        out["pass_it"] = {
            "cont": jobs_number, 
            "jobs": 0
        };
    } else {
        out["pass_it"] = pass_it;
    }
    if (out["pass_it"]["jobs"] > 0) {
        var url = url_base + out["pass_it"].cont;
        out["pass_it"].cont += jobs_number;
        window.location.href = url;
        out["has_next_page"] = true;
    } else {
        out["has_next_page"] = false;
    }
    if (out["pass_it"]["jobs"] > 0) {
        var url = url_base + out["pass_it"].cont;
        out["pass_it"].cont += jobs_number;
        window.location.href = url;
        out["has_next_page"] = true;
    } else if (!document.querySelector(selector)) {
        // condición de parada. Stop condition
        out["has_next_page"] = false;
    } else {
        out["has_next_page"] = true;
    }
    out["wait"] = true;
    return out;
})();


// PONER EN EL EXTRACT
if(typeof pass_it == "undefined") pass_it = {};
if (!pass_it["cont"]) {
  out["pass_it"] = {
    "cont": 1,
    "jobs": 0
  };
} else {
  out["pass_it"] = pass_it;
}


//ESTO AL FINAL AL LADO DE return out;

out["pass_it"]["jobs"] = returnedJobs.length;
out["jobs"]= returnedJobs;
return out;
})();