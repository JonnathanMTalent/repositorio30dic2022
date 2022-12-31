//Jobs Length
(function() {
    var out = {};
    // var selectorscroll = 'BARRA DE DESPLAZAMIENTO para hacer scroll';
    var selectorjobs = 'selector de los jobs';
    msg(pass_it);
    if (!pass_it["jobs_lengths"]) out["pass_it"] = {
        "jobs_lengths": []
    };
    else out["pass_it"] = pass_it;
    out["has_next_page"] = true;
    if (out["pass_it"]["jobs_lengths"].length > 3) {
        var last_three_jobs = out["pass_it"]["jobs_lengths"].slice(-3);
        if (last_three_jobs[0] == last_three_jobs[1] && last_three_jobs[1] == last_three_jobs[2]) {
            out["has_next_page"] = false;
        }
    }
    window.scrollBy(0, document.body.scrollHeight);   //ESTO SOLO FUNCIONA CUANDO EL SCROLL ES A TODA LA PÃGINA (BODY)
    // document.querySelector(selectorscroll).scrollBy(0, document.querySelector(selectorscroll).scrollHeight);
    out["wait"] = true;
    out["pass_it"]["jobs_lengths"].push(document.querySelectorAll(selectorjobs).length);
    return out;
})();
//Event Page Length
(function() {
    var out = {}
    var event = new Event('scroll');
    if (!pass_it["heights"]) out["pass_it"] = {
        "heights": []
    };
    else out["pass_it"] = pass_it;
    out["has_next_page"] = true;
    if (out["pass_it"]["heights"].length > 3) {
        var last_three_heights = out["pass_it"]["heights"].slice(out["pass_it"]["heights"].length - 3);
        if (last_three_heights[0] == last_three_heights[1] && last_three_heights[1] == last_three_heights[2]) {
            out["has_next_page"] = false;
        }
    }
    window.scrollBy(0, document.body.scrollHeight);
    window.dispatchEvent(event);
    out["wait"] = true;
    out["pass_it"]["heights"].push(document.body.scrollHeight);
    msg(out.pass_it)
    return out;
})();
// Infinite Pag
(function() {
    var out = {};
    msg(pass_it);
    if (!pass_it["heights"]) out["pass_it"] = {
        "heights": []
    };
    else out["pass_it"] = pass_it;
    out["has_next_page"] = true;
    if (out["pass_it"]["heights"].length > 3) {
        var last_three_heights = out["pass_it"]["heights"].slice(out["pass_it"]["heights"].length - 3);
        if (last_three_heights[0] == last_three_heights[1] && last_three_heights[1] == last_three_heights[2])
            out["has_next_page"] = false;
    }
    window.scrollBy(0, document.body.scrollHeight);
    out["wait"] = true;
    out["pass_it"]["heights"].push(document.body.scrollHeight);
    msg(out.pass_it)
    return out;
})();