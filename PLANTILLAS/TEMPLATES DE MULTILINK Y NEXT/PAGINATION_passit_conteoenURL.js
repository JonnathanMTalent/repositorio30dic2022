//EN EL EXTRACT O EL INFINITY
if (typeof pass_it == "undefined") pass_it = {};
if (typeof msg == "undefined") msg = console.log;

if (!pass_it["cont"]) {
    out["pass_it"] = {
        "cont": 25,
        "jobs": 0
    };
} else {
    out["pass_it"] = pass_it;
}


// PAGINATION
(function() {
    var out = {};
    var jobs_number = 0; // número de jobs por página. Jobs amount per page
    var url_base = "https://careers.allstate.com/search/?q=&sortColumn=referencedate&sortDirection=desc&startrow=";
    var selector = "";

    if (typeof pass_it == "undefined") pass_it = {};
    if (typeof msg == "undefined") msg = console.log;

    if (!pass_it["cont"]) {
        out["pass_it"] = {
            "cont": 25,
            "jobs": 0
        };
    } else {
        out["pass_it"] = pass_it;
    }

    //msg("pagi: " + url_base + out["pass_it"].cont);
    //msg("pagi1: " + out["pass_it"].cont);
    var limitA = document.querySelector('span.paginationLabel').textContent.split('–')[1].split('of')[0].trim();

    var limitB = document.querySelector('span.paginationLabel').textContent.split('–')[1].split('of')[1].trim();

    if (limitA != limitB) {
        var url = url_base + out["pass_it"].cont;
        out["pass_it"].cont += 25;
        window.location.href = url;
        out["has_next_page"] = true;
    } else {
        out["has_next_page"] = false;
    }

    /*out["wait"] = true;
    out['pic'] = true;
    out['html'] = true;*/
    return out;
})();