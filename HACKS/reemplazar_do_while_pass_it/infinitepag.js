//infinity
(() => {
    var out = {};
    out.pass_it = {
        "counter":0,
        "limit":0
    }
    return out;
})()
// poner en el extract

out.pass_it = pass_it;
out.pass_it.counter+=1;
out.pass_it.limit=500;

//PAGINATION

(function() {
    var out = {};
    out.pass_it = pass_it;
    out.pass_it.counter += 25;
    if(out.pass_it.limit > out.pass_it.counter){
        out.has_next_page = true;
    }else{
        out.has_next_page = false;
    }
    return out;
})();


//OTRO PAGINATION MAS ELEGANTE

(function () {
    const out = {};
    out.pass_it = pass_it;
    out.pass_it.counter += 20;
    const { counter, limit } = out.pass_it;
    out.has_next_page = counter <= limit;
    return out;
})();