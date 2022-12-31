(function () {
    const out = {};
    out.pass_it = pass_it;
    out.pass_it.count++;

    if (out.pass_it.count <= out.pass_it.limit) {
        out.has_next_page = true;
    } else {
        out.has_next_page = false;
    }

    return out;
})();