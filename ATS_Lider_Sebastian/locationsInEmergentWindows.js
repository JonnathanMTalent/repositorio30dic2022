/*@code - ATS "Refine your search"
    job site reference: https://careers.bakerhughes.com/global/en/search-results?from=40&s=1 -- https://prnt.sc/22nldyu
                        https://careers.bcg.com/search-results
                        
  Change the url from parameter getDesc() and job.url domain.
*/
//Miranda
//Extract
(function () {
  var out = {};
  let jobs = [];
  if (pass_it["count"]) {
    out["pass_it"] = pass_it;
  } else {
    out["pass_it"] = {
      "count": 0,
      "limit": 0
    };
  }

  let htmlpage = getDesc(window.location.origin + "/us/en/search-results?keywords=&from=" + out["pass_it"]["count"] + "&s=1");
  let div = document.createElement("div");
  div.innerHTML = htmlpage;
  let script = [...div.querySelectorAll('script[type="text/javascript"]')].filter(e => e.textContent.includes('phApp = phApp'))[0]
  script = script.textContent.trim().split("phApp.ddo =").pop().split("phApp.experimentData").shift().replace("/*--&gt;*/", "").replace("};", "}").trim();
  let json = JSON.parse(script);
  //msg(json);
  let json_jobs = json.eagerLoadRefineSearch.data.jobs;
  /*    
  if(out["pass_it"].count > 0){
        json_jobs = json_jobs.slice(-10);
    }
  */

  out["pass_it"]["limit"] = json.eagerLoadRefineSearch.totalHits;
  json_jobs.forEach(elem => {
    let job = {};
    job.title = elem.title;
    job.url = window.location.origin + "/us/en/job/" + elem.reqId + "/";
    job.reqid = elem.reqId;

    job.dateposted_raw = elem.postedDate;
    let d = new Date(job.dateposted_raw);
    job.dateposted_raw = (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear();

    if (job.title.includes("Full-time")) job.source_jobtype = "Full-time";
    else if (job.title.includes("Internship")) job.source_jobtype = "Internship";
    else if (job.title.includes("Part-time")) job.source_jobtype = "Part-time";
    if (elem.multi_location) {
      job.location = elem.multi_location;
      job.source_location = elem.multi_location.join(", ");
    } else {
      job.location = elem.multi_location_array;
      if (elem.multi_location_array) {
        job.source_location = elem.multi_location_array.join(", ");
      }
    }

    job.temp = "Dec-2021";
    //job.location = elem.querySelector("").textContent.trim();
    //job.reqid = job.url.split("").pop();
    //job.reqid = elem.querySelector("").textContent.trim();
    //job.dateposted_raw = elem.querySelector("").textContent.trim();
    //job.dateclosed_raw = elem.querySelector("").textContent.trim();
    //job.logo = elem.querySelector("").getAttribute("src").trim();
    //job.source_apply_email = elem.querySelector("").textContent.trim();
    //job.source_empname = elem.querySelector("").textContent.trim();
    //job.source_jobtype = elem.querySelector("").textContent.trim();
    //job.source_salary = elem.querySelector("").textContent.trim();
    //job.experience_required = elem.querySelector("").textContent.trim();   
    //job.location = job.location.split("/")
    if (!job.location) { job.location = ["HQ"] };
    //msg(typeof(job.location));    
    //msg(job.location);      
    job.location.forEach(location => {
      var jobx = {};
      jobx = { ...job }
      jobx.location = location;
      jobs.push(jobx);
    })
  })

  out["jobs"] = jobs;
  return out;
})();
function getDesc(url) {

  var response = "";
  var data = {};
  $.ajax({
    url: url,
    headers: {
      "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
      "accept-language": "en,es-ES;q=0.9,es;q=0.8",
      "sec-ch-ua": "\"Chromium\";v=\"96\", \"Opera GX\";v=\"82\", \";Not A Brand\";v=\"99\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"Windows\"",
      "sec-fetch-dest": "document",
      "sec-fetch-mode": "navigate",
      "sec-fetch-site": "same-origin",
      "upgrade-insecure-requests": "1"
    },
    type: 'GET',
    //data : JSON.stringify(data),
    dataType: "html",
    async: false,
    success: function (result) {
      //msg("request successfull");
      //msg(result);
      response = result;
    },
    error: function (error) {
      msg(error);
    }
  });
  return response;
};
//Pagination
(function () {
  var out = {};
  out["pass_it"] = pass_it;
  out["pass_it"].count += 50;
  msg("count: " + out["pass_it"].count + " limit: " + out["pass_it"]["limit"]);

  if (out["pass_it"].count >= out["pass_it"].limit) {
    msg("\x1b[42mNo tenemos mas trabajos para extraer en el jobsite");
    out["has_next_page"] = false;

  } else { // Tiene mas jobs SI                   
    out["has_next_page"] = true;
  }

  //out.waitFor = ""; 
  return out;

})();

//Mia
//Extract
(function () {
  var jobs = [];
  var out = {};
  out["pass_it"] = pass_it;

  //var data = { "filters": [{ "page": counter, "limit": 100 }] }; //datos adicionales para el request
  $.ajax({
    url: window.location.origin + window.location.pathname + '?from=' + out.pass_it.offSet + '&s=1', //link del json
    headers: {
      "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
      "accept-language": "en-GB,en;q=0.9,es-CO;q=0.8,es;q=0.7",
      "cache-control": "no-cache",
      "pragma": "no-cache",
      "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"101\", \"Google Chrome\";v=\"101\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"Windows\"",
      "sec-fetch-dest": "document",
      "sec-fetch-mode": "navigate",
      "sec-fetch-site": "none",
      "sec-fetch-user": "?1",
      "upgrade-insecure-requests": "1"
    }, //se obtienen con el fetch
    type: 'GET',
    //data: JSON.stringify(data), //convierte a tipo String la variable 'data' cuando se usa en forma de JSON
    dataType: "html",
    async: false,
    success: function (result) {
      htmlpage = document.createElement('div');
      htmlpage.innerHTML = result;
      let script = [...htmlpage.querySelectorAll('script[type="text/javascript"]')].filter(e => e.textContent.includes('phApp = phApp'))[0]
      script = script.textContent.trim().split(/phApp\.ddo \=|\|\|/).pop().split("phApp.experimentData").shift().replace(/ *\/\*[^\*\/]*\/\* */g, "").replace("};", "}").trim();
      let json = JSON.parse(script);
      let json_jobs = json.eagerLoadRefineSearch.data.jobs;
      out.pass_it.limit = json.eagerLoadRefineSearch.totalHits;

      for (let elem of json_jobs) {
        let job = {};

        job.reqid = elem.reqId;
        job.title = elem.title;
        job.url = window.location.origin + window.location.pathname.replace('search-results', '') + "job/" + elem.reqId + "/";
        var dateAux = new Date(elem.postedDate);
        job.dateposted_raw = dateAux.toLocaleDateString("en-US");
        job.source_jobtype = elem.type;
        job.temp = 96;
        if (elem.multi_location) {
          for (let auxLoc of elem.multi_location) {
            let jobx = {
              ...job
            };
            jobx.source_location = "Available in " + elem.multi_location.length + " locations";
            jobx.location = auxLoc;
            jobs.push(jobx);
          }
        } else {
          job.source_location = elem.location;
          job.location = job.source_location;
          jobs.push(job);
        }
      }
    },
    error: function (error) {
      msg(error);
    }
  });

  out["jobs"] = jobs;
  return out;
})();
//Infinity
(function () {
  var out = {};
  out["pass_it"] = {
    "offSet": 0,
    "limit": 0
  };
  return out;
})();
//Pagination
(function () {
  var out = {};
  out["pass_it"] = pass_it;
  out.pass_it.offSet += 50;
  msg("OffSet: " + out.pass_it.offSet + "\nLimit: " + out.pass_it.limit);
  if (out.pass_it.offSet < out.pass_it.limit) {
    out["has_next_page"] = true;
  } else {
    out["has_next_page"] = false;
  }
  return out;
})();

//extractFetchConDescription
(async () => {
  let out = {};
  out["pass_it"] = pass_it;

  try {
      let jobs = [];

      let resp = await fetch(`${window.location.origin}${window.location.pathname}?from=${out.pass_it.offSet}&s=1`, {
          "headers": {
              "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
              "accept-language": "en-GB,en;q=0.9,es-CO;q=0.8,es;q=0.7",
              "sec-ch-ua": "\".Not/A)Brand\";v=\"99\", \"Google Chrome\";v=\"103\", \"Chromium\";v=\"103\"",
              "sec-ch-ua-mobile": "?0",
              "sec-ch-ua-platform": "\"Windows\"",
              "sec-fetch-dest": "document",
              "sec-fetch-mode": "navigate",
              "sec-fetch-site": "same-origin",
              "sec-fetch-user": "?1",
              "upgrade-insecure-requests": "1"
          },
          "referrer": window.location.href,
          "referrerPolicy": "strict-origin-when-cross-origin",
          "body": null,
          "method": "GET",
          "mode": "cors",
          "credentials": "include"
      });

      let data = await resp.text();
      let doc = document.createElement('div');
      doc.innerHTML = data;
      let script = [...doc.querySelectorAll('script[type="text/javascript"]')]
          .filter(e => e.textContent.includes('phApp = phApp'))[0]
          .textContent.trim()
          .split(/phApp\.ddo \=|\|\|/).pop()
          .split("phApp.experimentData").shift()
          .replace(/ *\/\*[^\*\/]*\/\* */g, "")
          .replace("};", "}").trim();
      let json = JSON.parse(script);
      let htmlJobs = json.eagerLoadRefineSearch.data.jobs;
      out.pass_it.limit = json.eagerLoadRefineSearch.totalHits;

      for (var i in htmlJobs) {
          let elem = htmlJobs[i];
          let job = {};
          job.reqid = elem.reqId;
          job.title = elem.title;
          job.url = `${window.location.origin}${window.location.pathname.replace('search-results', '')}job/${elem.reqId}/`;
          var dateAux = new Date(elem.postedDate);
          job.dateposted_raw = dateAux.toLocaleDateString("en-US");
          job.source_jobtype = elem.type;
          job.temp = 96;

          ////////////////////Description
          let respDesc = await fetch(job.url, {
              "headers": {
                  "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                  "accept-language": "en-GB,en;q=0.9,es-CO;q=0.8,es;q=0.7",
                  "cache-control": "no-cache",
                  "pragma": "no-cache",
                  "sec-ch-ua": "\".Not/A)Brand\";v=\"99\", \"Google Chrome\";v=\"103\", \"Chromium\";v=\"103\"",
                  "sec-ch-ua-mobile": "?0",
                  "sec-ch-ua-platform": "\"Windows\"",
                  "sec-fetch-dest": "document",
                  "sec-fetch-mode": "navigate",
                  "sec-fetch-site": "same-origin",
                  "sec-fetch-user": "?1",
                  "upgrade-insecure-requests": "1"
              },
              "referrer": window.location.href,
              "referrerPolicy": "strict-origin-when-cross-origin",
              "body": null,
              "method": "GET",
              "mode": "cors",
              "credentials": "include"
          });
          let dataDesc = await respDesc.text();
          msg(dataDesc)
          let docDesc = document.createElement('div');
          docDesc.innerHTML = dataDesc;
          let jsonDesc = JSON.parse([...docDesc.querySelectorAll('script[type="application/ld+json"]')]
              .filter(e => e.textContent.includes('description'))[0].textContent).description;
          var full_html = document.createElement("div");
          full_html.innerHTML = jsonDesc;

          if (full_html) {

              for (const a of full_html.querySelectorAll('p, span, li')) {
                  if (a.textContent.search(/@|http|www./ig) > -1) {
                      a.remove();
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

              if (typeof cleanHTML == "undefined") cleanHTML = function(x) {
                  return x
              };
              if (typeof msg == "undefined") msg = console.log;

              job.html = full_html.innerHTML.trim();

              //job.html = removeTextBefore(job.html, '', false);
              //job.html = removeTextAfter(job.html, '', true);

              job.html = cleanHTML(job.html);
              var tmp = document.createElement('div');
              tmp.innerHTML = job.html;
              job.jobdesc = tmp.textContent.trim();
              job.jobdesc = cleanHTML(job.jobdesc);
          }
          ///////////////////////////////
          if (elem.multi_location) {
              for (let auxLoc of elem.multi_location) {
                  let jobx = {
                      ...job
                  };
                  jobx.source_location = "Available in " + elem.multi_location.length + " locations";
                  jobx.location = auxLoc;
                  jobs.push(jobx);
              }
          } else {
              job.source_location = elem.location;
              job.location = job.source_location;
              jobs.push(job);
          }
      }
      out["jobs"] = jobs;
  } catch (err) {
      console.log(err)
  }
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