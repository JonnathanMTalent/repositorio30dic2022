
(function() {
    var out = {};
    //var selector = "";  // selector donde esta la paginacion
    var url_base = 'https://workatlevy.com/jobs/joblist?page=';

    if (typeof pass_it == "undefined") pass_it = {};
    if (typeof msg == "undefined") msg = function(x) {
        return x;
    };

    if (!pass_it["cont"]) {
        out["pass_it"] = {
            "cont": 0,
            "jobs": 0
        };
    } else {
        out["pass_it"] = pass_it;
    }



    out["has_next_page"] = false;
    out["pass_it"].cont += 1;


    if (out["pass_it"]["jobs"] == 40) {
        var url = url_base + out["pass_it"]["cont"] + "&rp=40&sortname=&sortorder=&query=&qtype=";
        window.location.href = url
        out["has_next_page"] = true;
    } else {
        out["has_next_page"] = false;
    }

    out.waitFor = 'pre';
    return out;
})();
