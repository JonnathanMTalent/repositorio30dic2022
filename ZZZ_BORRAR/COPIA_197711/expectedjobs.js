(function() {
    var out = {};
    var regex = /\d+/;
    if (typeof msg === 'undefined') msg = console.log;
    var element = document.querySelector("pre").textContent;
    var json = JSON.parse(element);
    var expected_jobs_str = json.body.children[0].facetContainer.paginationCount.value;
    var expected_jobs = regex.exec(expected_jobs_str)[0];
    out["expected_jobs"] = expected_jobs;
    return out;
  })();