(function () {
    var out = {};
    var job = {};
    var json;
    var jobid = pass_it["job"].url.split("&r=").pop();
    var endpoint = "https://recruiting.adp.com/srccar/public/rest/1/99001/job/" + jobid + "?prc=RMPOD4&rl=enUS";
    msg(endpoint);
    $.ajax({
      url: endpoint,
      headers: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      type: 'GET',
      async: false,
      success: function (result) {
        json = result;

        var full_html1 = json.fields[0].content;
        var full_html = json.fields[0].label;
        var full_html2 = json.fields[1].label;
        var full_html3 = json.fields[1].content;

        job.html = "<h3>" + full_html + "</h3>" + full_html1 + "<h3>" + full_html2 + "</h3>" + full_html3;
        job.html = cleanHTML(job.html);
        var tmp = document.createElement("DIV");
        tmp.innerHTML = job.html;
        job.jobdesc = tmp.textContent.trim();

      },
      error: function (error) {
        msg(error);
      }
    });

    out["job"] = job;
    return out;
  })();