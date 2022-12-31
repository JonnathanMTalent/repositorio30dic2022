//infinity
(function () {
  var out = {};
  out["pass_it"] = {
    "offSet": 0,
    "limit": 0
  };
  return out;
})();
//extract
(function() {
  var jobs = [];
  var out = {};
  out["pass_it"] = pass_it;
  var json;
  var data = {
      "size": 100,
      "source": "web",
      "brand_level_ids": [3557446],
      "postal_code_radius": "20",
      "start": out.pass_it.offSet,
      "sort": ["publish_date"],
      "sort_type": "desc"
  };
  $.ajax({
      url: 'https://gateway.harri.com/core/api/v1/harri_search/search_jobs',
      headers: {
          "accept": "application/json, text/plain, */*",
          "accept-language": "en-GB,en;q=0.9,es-CO;q=0.8,es;q=0.7",
          "content-type": "application/json;charset=UTF-8",
          "force-csrf": "true",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-site",
          "x-csrftoken": "null"
      },
      type: 'POST',
      data: JSON.stringify(data),
      dataType: "json",
      async: false,
      success: function(result) {
          json = result.data.results;
          out.pass_it.limit = result.data.hits;
          for (let elem of json) {
              for (let auxLoc of elem.locations) {
                  var job = {};
                  job.reqid = elem.id;
                  job.title = elem.position.name;
                  job.source_location = elem.locations[0].city;
                  job.location = auxLoc.formatted_address;
                  job.url = window.location.origin + '/' + elem.brand.slug + '/job/' + elem.id + '-';
                  var dateAux = new Date(elem.createdTime);
                  job.dateposted_raw = dateAux.toLocaleDateString("en-US");
                  //job.dateposted_raw = elem.createdTime.split('T').shift();
                  //job.dateposted_raw = job.dateposted_raw.split('-')[1] + '/' + job.dateposted_raw.split('-')[2] + '/' + job.dateposted_raw.split('-')[0];
                  //job.source_empname = elem.brand.name.split('-').shift();
                  job.temp = 96;
                  jobs.push(job);
              }
          }
      },
      error: function(error) {
          msg(error);
      }
  });

  out["jobs"] = jobs;
  return out;
})();
//pagination
(function () {
  var out = {};
  out["pass_it"] = pass_it;
  out.pass_it.offSet += 100;
  if (out.pass_it.offSet < out.pass_it.limit) {
    out["has_next_page"] = true;
  } else {
    out["has_next_page"] = false;
  }
  out["wait"] = false;
  return out;
})();
//description
(function () {
  var out = {};
  var job = {};
  //var job = pass_it["job"];

  var full_html = document.querySelector('div[id="job_description"]');

  if (full_html) {

    for (const a of full_html.querySelectorAll('table > tbody > tr > td')) {
      if (a.textContent.search(/Salario|Salary/ig) > -1 && a.nextElementSibling.textContent.match(/[0-9]/)) {
        job.source_salary = a.nextElementSibling.textContent.trim();
      }
    }

    var remove_selectors = ['a', 'script', 'i', 'img', 'style', 'button', 'figure', 'noscript', 'svg', 'form', 'input', 'iframe', 'link'];

    if (remove_selectors.length > 0) {
      remove_selectors.forEach(remove_selector => {
        for (const a of full_html.querySelectorAll(remove_selector)) {
          a.remove();
        }
      });
    }

    for (const a of full_html.querySelectorAll('p, span')) {
      if (a.textContent.search(/@|http|www./ig) > -1) {
        a.remove();
      }
    }

    if (typeof cleanHTML == "undefined") cleanHTML = function (x) { return x };
    if (typeof msg == "undefined") msg = console.log;

    job.html = full_html.innerHTML.trim();

    //job.html = removeTextBefore(job.html, '', false);
    job.html = removeTextAfter(job.html, /Traducir|Translate|Mostrar Original|Show Original/ig, true);

    job.html = cleanHTML(job.html);
    var tmp = document.createElement('div');
    tmp.innerHTML = job.html;
    job.jobdesc = tmp.textContent.trim();
    job.jobdesc = cleanHTML(job.jobdesc);
    if (job.jobdesc.length < 50) {
      job.html = " ";
      job.jobdesc = " ";
    }
  } else {
    job.html = " ";
    job.jobdesc = " ";
  }
  out["job"] = job;
  return out;

})();
function removeTextBefore(html, text, flag) {
  var newHtml = html;
  if (newHtml.search(text) > -1) {
    newHtml = newHtml.split(text).pop();
    if (!flag) {
      newHtml = "<h3>" + text + "</h3>" + newHtml;
    }
  }
  return newHtml;
}
function removeTextAfter(html, text, flag) {
  var newHtml = html;
  if (newHtml.search(text) > -1) {
    newHtml = newHtml.split(text).shift();
    if (!flag) {
      newHtml = newHtml + "<p>" + text + "</p>";
    }
  }
  return newHtml;
}