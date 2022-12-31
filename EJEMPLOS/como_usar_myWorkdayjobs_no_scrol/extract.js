(function () {
    var jobs = [];
    var out = {};
    out["pass_it"] = pass_it;
    var json;
    var jsonDesc;
    var data = {
      "limit": 20,
      "offset": out.pass_it.offSet,
      "searchText": "",
      "appliedFacets": {}
    };
    $.ajax({
      url: 'https://sggovterp.wd102.myworkdayjobs.com/wday/cxs/sggovterp/PublicServiceCareers/jobs',
      headers: {
        "accept": "application/json",
        "accept-language": "en-US",
        "content-type": "application/json",
        "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"92\", \"Opera GX\";v=\"78\"",
        "sec-ch-ua-mobile": "?0",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin"
      },
      type: 'POST',
      data: JSON.stringify(data),
      dataType: "json",
      async: false,
      success: function (result) {
        if (out.pass_it.offSet == 0) {
          out.pass_it.limit = result.total;
        }
        if (out.pass_it.offSet < 2000) {
          json = result.jobPostings;
          for (var elem of json) {
            var job = {};
            job.reqid = elem.bulletFields[0];
            job.title = elem.title;
            job.url = 'https://sggovterp.wd102.myworkdayjobs.com/es/PublicServiceCareers'+ elem.externalPath;
            msg('Title: ' + job.title + '\nURL: ' + job.url);
            job.temp = 96;
            ///////////////////////////////
            $.ajax({
              url:   'https://sggovterp.wd102.myworkdayjobs.com/wday/cxs/sggovterp/PublicServiceCareers' + elem.externalPath,
              headers: {
                "accept": "application/json",
                "accept-language": "en-US",
                "content-type": "application/x-www-form-urlencoded",
                "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"92\", \"Opera GX\";v=\"78\"",
                "sec-ch-ua-mobile": "?0",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin"
              },
              type: 'GET',
              dataType: "json",
              async: false,
              success: function (result) {
                jsonDesc = result.jobPostingInfo;
                job.source_jobtype = jsonDesc.timeType;
                job.dateposted_raw = jsonDesc.startDate;
                job.dateposted_raw = job.dateposted_raw.split('-')[1] + '/' + job.dateposted_raw.split('-')[2] + '/' + job.dateposted_raw.split('-')[0];
                var full_html = document.createElement("div");
                full_html.innerHTML = jsonDesc.jobDescription;
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
                  job.html = full_html.innerHTML.trim();
                  //job.html = removeTextBefore(job.html, '', false);
                  //job.html = removeTextAfter(job.html, '', true);
                  job.html = cleanHTML(job.html);
                  var tmp = document.createElement('div');
                  tmp.innerHTML = job.html;
                  job.jobdesc = tmp.textContent.trim();
                  job.jobdesc = cleanHTML(job.jobdesc);
                }
                if (jsonDesc.additionalLocations) {
                  //var jobx = {};
                  //jobx = { ...job }
                  let auxArrLocs = [];
                  auxArrLocs.push(jsonDesc.location);
                  jsonDesc.additionalLocations.map(axloc => auxArrLocs.push(axloc));
                  job.source_location = auxArrLocs.join('\n');
                  job.location = jsonDesc.location.trim();
                  jobs.push(job);
                  for (let auxLoc of jsonDesc.additionalLocations) {
                    var jobx = {};
                    jobx = {
                      ...job
                    }
                    jobx.location = auxLoc.trim(); //editar aqui las locaciones (multilocation)
                    jobs.push(jobx);
                  }
                } else {
                  job.source_location = jsonDesc.location.trim();
                  job.location = jsonDesc.location.trim(); //editar aqui las locaciones
                  jobs.push(job);
                }
              },
              error: function (error) {
                msg(error);
              }
            });
            ///////////////////////////////
          }
        } else {
          var job = {};
          job.title = 'Ghost job, limit reached.';
          jobs.push(job);
          out.pass_it.offSet = out.pass_it.limit;
        }
      },
      error: function (error) {
        msg(error);
      }
    });
    out["jobs"] = jobs;
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
