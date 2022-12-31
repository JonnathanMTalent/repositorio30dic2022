(function () {
    var out = {};
    var selector = 'li[class="pagination"] a';  // selector donde esta la paginacion
    if (typeof pass_it == "undefined") pass_it = {};
    if (!pass_it["cont"]) {
        out["pass_it"] = {
            "cont": 1
        };
    } else {
        out["pass_it"] = pass_it;
    }