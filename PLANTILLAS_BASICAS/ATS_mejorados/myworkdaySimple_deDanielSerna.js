//Scroll
// instrucciones: Usar el job site asi: "https://wd1.myworkdaysite.com/recruiting/onto/ONTO_Careers"
//  GETJOBDATA: "NO" 
//extract
(function () {
    var jobs = [];
    var out = {};
    out["pass_it"] = pass_it;
    var counter = 1;
    var limit = 0;
    var json;
    var jsonDesc;
    $.ajax({
      url: window.location.origin + window.location.pathname + '/fs/searchPagination/318c8bb6f553100021d223d9780d30be/' + out.pass_it.offSet,
      headers: {
        "accept": "application/json,application/xml",
        "accept-language": "en-GB,en;q=0.9,es-CO;q=0.8,es;q=0.7",
        "content-type": "application/x-www-form-urlencoded",
        "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"92\", \"Opera GX\";v=\"78\"",
        "sec-ch-ua-mobile": "?0",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "sessionsecuretoken": "smstg2gg4nji819fpo60k0j8et",
        "stats-perf": "08277f793a1f47af8b1cec3b61f3357d,713,,0",
        "x-workday-client": "2021.39.009"
      },
      type: 'GET',
      dataType: "json",
      async: false,
      success: function (result) {
        json = result;
        if (out.pass_it.offSet == 0) {
          var descPath = getPath(json, "number.paginationCount");
          descPath = descPath.split('.').slice(0, -1).join('.') + '.value';
          out["pass_it"].limit = setToValue(json, descPath);
        }
        var descPath = getPath(json, "facetSearchResultList");
        descPath = descPath.split('.').slice(0, -1).join('.') + '.listItems';
        var jobList = setToValue(json, descPath);
        if (jobList) {
          for (var elem of jobList) {
            var job = {};
            //job.title = elem.title.instances[0].text;
            job.url = window.location.protocol + "//" + window.location.hostname + elem.title.commandLink + '?codes=NEUVOO';
            job.source_location = elem.subtitles[0].instances[0].text;
            //msg('Title: ' + job.title + '\nURL: ' + job.url);
            job.temp = 96;
            //-----------DESCRIPTION---------
            $.ajax({
              url: job.url,
              headers: {
                "accept": "application/json,application/xml",
                "accept-language": "en-GB,en;q=0.9,es-CO;q=0.8,es;q=0.7",
                "content-type": "application/x-www-form-urlencoded",
                "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"92\", \"Opera GX\";v=\"78\"",
                "sec-ch-ua-mobile": "?0",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "x-workday-client": "2021.39.009"
              },
              type: 'GET',
              dataType: "json",
              async: false,
              success: function (result) {
                jsonDesc = result;
                job.title = jsonDesc.windowTitle;
                msg('Title: ' + job.title + '\nURL: ' + job.url);
                var descPath = getPath(jsonDesc, "richTextArea.jobPosting.jobDescription");
                descPath = descPath.split('.').slice(0, -1).join('.') + '.text';
                var full_html = document.createElement('div');
                full_html.innerHTML = setToValue(jsonDesc, descPath);
                for (const a of full_html.querySelectorAll('p, span, li')) {
                  if (a.textContent.search(/@|http|www\./ig) > -1) {
                    a.remove();
                  }
                }
                job.html = full_html.innerHTML.trim();
                job.html = removeTextBefore(job.html, "Job Description", false);
                job.html = removeTextAfter(job.html, /To Apply|Location:/, true);
                job.html = cleanHTML(job.html);
                var tmp = document.createElement('div');
                tmp.innerHTML = job.html;
                job.jobdesc = tmp.textContent.trim();
                job.jobdesc = cleanHTML(job.jobdesc);
                //---------MULTILOCATION-------------------
                var descJson = JSON.parse(jsonDesc.structuredDataAttributes.data);
                if (typeof descJson !== 'undefined') {
                  job.dateposted_raw = getDateFormat(descJson.datePosted, '-', 2, 1, 0)
                }
                var descPath = getPath(jsonDesc, "labeledImage.JOB_TYPE");
                if (descPath) {
                  descPath = descPath.split('.').slice(0, -1).join('.') + '.imageLabel';
                  job.source_jobtype = setToValue(jsonDesc, descPath);
                }
                var descPath = getPath(jsonDesc, "labeledImage.JOB_REQ");
                if (descPath) {
                  descPath = descPath.split('.').slice(0, -1).join('.') + '.imageLabel';
                  job.reqid = setToValue(jsonDesc, descPath);
                }
                var descPath = getPath(jsonDesc, "labeledImage.LOCATION");
                if (descPath) {
                  descPath = descPath.split('.').slice(0, -2).join('.');
                  var arrayAuxLoc = setToValue(jsonDesc, descPath);
                  let axloc = [];
                  arrayAuxLoc.map(alx => axloc.push(alx.imageLabel));
                  for (let auxLoc of arrayAuxLoc) {
                    if (auxLoc.ecid == 'labeledImage.LOCATION') {
                      var jobx = {};
                      jobx = { ...job }
                      jobx.source_location = axloc.join('\n');
                      jobx.location = auxLoc.imageLabel + ''; //editar aqui las locaciones
                      jobs.push(jobx);
                    }
                  }
                } else {
                  jobx.source_location = '';
                  job.location = 'HQ - No Location available';
                  jobs.push(job);
                }
              },
              error: function (error) {
                msg(error);
              }
            });
            //-----------END DESCRIPTION---------
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
  function getPath(obj, value, path) {
    try {
      if (typeof obj !== 'object') {
        return;
      }
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          var t = path;
          var v = obj[key];
          if (!path) {
            newPath = key;
          } else {
            newPath = path + '.' + key;
          }
          if (v === value) {
            return newPath;
          } else if (typeof v !== 'object') {
            newPath = t;
          }
          var res = getPath(v, value, newPath);
          if (res) {
            return res;
          }
        }
      }
    } catch (e) {
      msg(e.message);
    }
  }
  function setToValue(obj, path) {
    path = path.split('.');
    for (var i of path) {
      obj = obj[i];
    }
    return obj
  }
  function getDateFormat(dateRaw, cut, dayPosition, monthPosition, yearPosition) {
    dateRaw = dateRaw.replace(/\,/g, "").replace(/\./g, "").trim();
    let day = dateRaw.split(cut)[dayPosition].trim(),
      month = dateRaw.split(cut)[monthPosition].trim(),
      year = dateRaw.split(cut)[yearPosition].trim();
    day = day.replace(/rd|st|th/i, "").trim();
    if (day < 10 && day.length < 2) { day = "0" + day; }
    if (year.length == 2) { year = "20" + year; }
    if (dateRaw.search(/[a-z]/gi) > -1) {
      //English, Dutch, French
      if (month.search(/jan/i) > -1) { month = "01"; }
      if (month.search(/feb|fÃ©v/i) > -1) { month = "02"; }
      if (month.search(/mar|maar/i) > -1) { month = "03"; }
      if (month.search(/apr|avr/i) > -1) { month = "04"; }
      if (month.search(/may|mai|mei/i) > -1) { month = "05"; }
      if (month.search(/jun|juin/i) > -1) { month = "06"; }
      if (month.search(/jul|juil/i) > -1) { month = "07"; }
      if (month.search(/aug|aoÃ»t/i) > -1) { month = "08"; }
      if (month.search(/sep/i) > -1) { month = "09"; }
      if (month.search(/oct|okt/i) > -1) { month = "10"; }
      if (month.search(/nov/i) > -1) { month = "11"; }
      if (month.search(/dec|dÃ©c/i) > -1) { month = "12"; }
    }
    var datum = month + "/" + day + "/" + year;
    return datum;
  }
  //pagination
  (function () {
    var out = {};
    out["pass_it"] = pass_it;
    out.pass_it.offSet += 50;
    if (out.pass_it.offSet < out.pass_it.limit) {
      out["has_next_page"] = true;
    } else {
      out["has_next_page"] = false;
    }
    out["wait"] = false;
    return out;
  })();
  //infinity
  (function () {
    var out = {};
    out["pass_it"] = {
      "offSet": 0,
      "limit": 0
    };
    return out;
  })();


  //multilink
  //infinity
  (function () {
    var out = {};
    out["pass_it"] = {
      "offSet": 0,
      "limit": 0,
      "multiLinks": ['https://bbby.wd5.myworkdayjobs.com/bed_bath_beyond_distribution_jobs', 'https://bbby.wd5.myworkdayjobs.com/harmon_face_values_jobs', 'https://bbby.wd5.myworkdayjobs.com/buy_buy_baby_jobs', 'https://bbby.wd5.myworkdayjobs.com/bed_bath_beyond_jobs', 'https://bbby.wd5.myworkdayjobs.com/harmon_face_values_careers', 'https://bbby.wd5.myworkdayjobs.com/buy_buy_baby_careers', 'https://bbby.wd5.myworkdayjobs.com/bed_bath_beyond_careers'],
      "linkPos": 0
    };
    return out;
  })();
  //pagination
  (function () {
    var out = {};
    out["pass_it"] = pass_it;
    out.pass_it.offSet += 50;
    if (out.pass_it.offSet < out.pass_it.limit) {
      out["has_next_page"] = true;
    } else {
      out["has_next_page"] = false;
      out["pass_it"]["linkPos"] += 1;
      if (out["pass_it"]["linkPos"] < out["pass_it"]["multiLinks"].length) {
        out["has_next_page"] = true;
        out.pass_it.offSet = 0;
        out.pass_it.limit = 0;
      }
    }
    out["wait"] = false;
    return out;
  })();


  
  /* en el extract
  msg('Current URL: ' + out.pass_it.multiLinks[out.pass_it.linkPos]);
  url: out.pass_it.multiLinks[out.pass_it.linkPos] + '/fs/searchPagination/318c8bb6f553100021d223d9780d30be/' + out.pass_it.offSet, //scroll
  url: window.location.origin + '/wday/cxs/' + window.location.host.split('.').shift().replace(/\-/g, '_') + '/' + out.pass_it.multiLinks[out.pass_it.linkPos].split('/').pop() + '/jobs', //pagination
  */















  //Pagination 
  //instrucciones: Usar el job site asi: https://mckesson.wd3.myworkdayjobs.com/External_Careers
  //extract
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
      url: window.location.origin + '/wday/cxs/' + window.location.host.split('.').shift().replace(/\-/g, '_') + window.location.pathname.replace(/\/[a-z][a-z]\-[A-Z][A-Z]|\/[a-z][a-z]/, '') + '/jobs',
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
            if(elem.bulletFields){
              job.reqid = elem.bulletFields[0];
              }
              job.title = elem.title;
              job.url = window.location.origin + window.location.pathname.replace(/\/[a-z][a-z]\-[A-Z][A-Z]|\/[a-z][a-z]/, '') + elem.externalPath;
              msg('Title: ' + job.title + '\nURL: ' + job.url);
              if(!job.reqid){
                  job.reqid = job.url.split("_").pop().trim();
              }
            job.temp = 96;
            ///////////////////////////////
            $.ajax({
              url: window.location.origin + '/wday/cxs/' + window.location.host.split('.').shift().replace(/\-/g, '_') + window.location.pathname.replace(/\/[a-z][a-z]\-[A-Z][A-Z]|\/[a-z][a-z]/, '') + elem.externalPath,
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
                  

                  /*for (const a of document.querySelectorAll('P')) {

                    if (a.textContent.match(/UAMS offers amazing benefits/gi)) {
                        job.source_benefit = a.nextElementSibling.textContent.trim();
                    }
                    if (a.textContent.match(/Salary Information/gi)) {
                        job.source_salary = a.nextSibling.textContent.trim();
                    }

                }*/

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

                full_html.querySelectorAll('a, img, link, script, style, button, iframe, figure, picture').forEach(e => e.remove());
                full_html.innerHTML = full_html.innerHTML.replace(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g, '');
                full_html.innerHTML = full_html.innerHTML.replace(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g, ''); //Remove email
                full_html.innerHTML = full_html.innerHTML.replace(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g, '');
                full_html.innerHTML = full_html.innerHTML.replace(/(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g, '');


                job.html = full_html.innerHTML.trim();
                //job.html = removeTextBefore(job.html, 'your Candidate Home page.', true);
                //job.html = removeTextBefore(job.html, 'Summary of Job Duties:', false);
                //job.html = removeTextAfter(job.html, 'Recruitment Contact Information', true);
                //job.html = removeTextAfter(job.html, 'All application materials must be', true);
                //job.html = removeTextAfter(job.html, 'Additional Information:', true);
                job.html = cleanHTML(job.html);
                var tmp = document.createElement('div');
                tmp.innerHTML = job.html;
                job.jobdesc = tmp.textContent.trim();
                job.jobdesc = cleanHTML(job.jobdesc);

                job.html = job.html.replace(/[a-z0-9_\-\+\.]+@[a-z0-9\-]+\.([a-z]{2,4})(?:\.[a-z]{2})?|\.com|\d{3}-\d{3}-\d{4}/gm, '');
                job.html = job.html.replace(/\b(([\w-]+:\/\/?|www[.])[^\s()<>]+(?:\([\w\d]+\)|([^[:punct:]\s]|\/)))|[a-z0-9_\-\+\.]+@[a-z0-9\-]+\.([a-z]{2,4})(?:\.[a-z]{2})?|www\.|http:|https:|\.com|\d{3}-\d{3}-\d{4}/gm, '');

                if (job.html.indexOf('@') > -1) job.html = job.html.replace(/\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+/gi, "");
                if (job.html.indexOf('https') > -1) job.html = job.html.replace(/(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi, "");
                if (job.html.indexOf('http') > -1) job.html = job.html.replace(/(http?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi, "");
                if (job.html.indexOf('HTTPS') > -1) job.html = job.html.replace(/(HTTPS?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi, "");
                if (job.html.indexOf('HTTP') > -1) job.html = job.html.replace(/(HTTP?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi, "");
                if (job.html.indexOf('www') > -1) job.html = job.html.replace(/(www?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi, "");
                if (job.html.indexOf('WWW') > -1) job.html = job.html.replace(/(WWW?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi, "");

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




  //pagination
  (function () {
    var out = {};
    out["pass_it"] = pass_it;
    out.pass_it.offSet += 20;
    if (out.pass_it.offSet < out.pass_it.limit) {
      out["has_next_page"] = true;
    } else {
      out["has_next_page"] = false;
    }
    out["wait"] = false;
    return out;
  })();




  //infinity
  (function () {
    var out = {};
    out["pass_it"] = {
      "offSet": 0,
      "limit": 0
    };
    return out;
  })();





  //Scroll
// instrucciones: Usar el job site asi: "https://wd1.myworkdaysite.com/recruiting/onto/ONTO_Careers"
//  GETJOBDATA: "NO" 
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
(async () => {
  let out = {};
  out["pass_it"] = pass_it;
  let jobs = [];
  try {
      let resp = await fetch(window.location.origin + window.location.pathname + "/fs/searchPagination/318c8bb6f553100021d223d9780d30be/" + out.pass_it.offSet, {
          "headers": {
              "accept": "application/json,application/xml",
              "accept-language": "en-GB,en;q=0.9,es-CO;q=0.8,es;q=0.7",
              "content-type": "application/x-www-form-urlencoded",
              "sec-ch-ua": "\".Not/A)Brand\";v=\"99\", \"Google Chrome\";v=\"103\", \"Chromium\";v=\"103\"",
              "sec-ch-ua-mobile": "?0",
              "sec-ch-ua-platform": "\"Windows\"",
              "sec-fetch-dest": "empty",
              "sec-fetch-mode": "cors",
              "sec-fetch-site": "same-origin",
              "session-secure-token": "bqs25a0rnvtp2tm164v063fs0u",
              "stats-perf": "08f6210f1d7440d8917f6654d2563d3a,821,,0",
              "x-workday-client": "2022.27.24"
          },
          "referrer": window.location.href,
          "referrerPolicy": "no-referrer-when-downgrade",
          "body": null,
          "method": "GET",
          "mode": "cors",
          "credentials": "include"
      });
      let data = await resp.json();
      if (out.pass_it.offSet == 0) {
          var descPath = getPath(data, "number.paginationCount");
          descPath = descPath.split('.').slice(0, -1).join('.') + '.value';
          out.pass_it.limit = setToValue(data, descPath);
      }
      var descPath = getPath(data, "facetSearchResultList");
      descPath = descPath.split('.').slice(0, -1).join('.') + '.listItems';
      var htmlJobs = setToValue(data, descPath);
      if (htmlJobs) {
          for (var i in htmlJobs) {
              let elem = htmlJobs[i];
              var job = {};
              job.url = window.location.protocol + "//" + window.location.hostname + elem.title.commandLink + '?codes=NEUVOO';
              job.source_location = elem.subtitles[0].instances[0].text;
              job.temp = 96;
              //-----------DESCRIPTION---------
              let respDesc = await fetch(job.url, {
                  "headers": {
                      "accept": "application/json,application/xml",
                      "accept-language": "en-GB,en;q=0.9,es-CO;q=0.8,es;q=0.7",
                      "content-type": "application/x-www-form-urlencoded",
                      "sec-ch-ua": "\".Not/A)Brand\";v=\"99\", \"Google Chrome\";v=\"103\", \"Chromium\";v=\"103\"",
                      "sec-ch-ua-mobile": "?0",
                      "sec-ch-ua-platform": "\"Windows\"",
                      "sec-fetch-dest": "empty",
                      "sec-fetch-mode": "cors",
                      "sec-fetch-site": "same-origin",
                      "session-secure-token": "bqs25a0rnvtp2tm164v063fs0u",
                      "stats-perf": "4eed7edd9cca42bebe838f296fc87f05,572,0,",
                      "x-workday-client": "2022.27.24"
                  },
                  "referrer": window.location.href,
                  "referrerPolicy": "no-referrer-when-downgrade",
                  "body": null,
                  "method": "GET",
                  "mode": "cors",
                  "credentials": "include"
              });
              let dataDesc = await respDesc.json();
              job.title = dataDesc.windowTitle;
              msg('Title: ' + job.title + '\nURL: ' + job.url);
              var descPath = getPath(dataDesc, "richTextArea.jobPosting.jobDescription");
              descPath = descPath.split('.').slice(0, -1).join('.') + '.text';
              var full_html = document.createElement('div');
              full_html.innerHTML = setToValue(dataDesc, descPath);
              for (const a of full_html.querySelectorAll('p, span, li')) {
                  if (a.textContent.search(/@|http|www\./ig) > -1) {
                      a.remove();
                  }
              }
              job.html = full_html.innerHTML.trim();
              job.html = removeTextBefore(job.html, "Job Description", false);
              job.html = removeTextAfter(job.html, /To Apply|Location:/, true);
              job.html = cleanHTML(job.html);
              var tmp = document.createElement('div');
              tmp.innerHTML = job.html;
              job.jobdesc = tmp.textContent.trim();
              job.jobdesc = cleanHTML(job.jobdesc);
              //---------MULTILOCATION-------------------
              var descJson = JSON.parse(dataDesc.structuredDataAttributes.data);
              if (typeof descJson !== 'undefined') {
                  job.dateposted_raw = getDateFormat(descJson.datePosted, '-', 2, 1, 0)
              }
              var descPath = getPath(dataDesc, "labeledImage.JOB_TYPE");
              if (descPath) {
                  descPath = descPath.split('.').slice(0, -1).join('.') + '.imageLabel';
                  job.source_jobtype = setToValue(dataDesc, descPath);
              }
              var descPath = getPath(dataDesc, "labeledImage.JOB_REQ");
              if (descPath) {
                  descPath = descPath.split('.').slice(0, -1).join('.') + '.imageLabel';
                  job.reqid = setToValue(dataDesc, descPath);
              }
              var descPath = getPath(dataDesc, "labeledImage.LOCATION");
              if (descPath) {
                  descPath = descPath.split('.').slice(0, -2).join('.');
                  var arrayAuxLoc = setToValue(dataDesc, descPath);
                  let axloc = [];
                  arrayAuxLoc.map(alx => axloc.push(alx.imageLabel));
                  for (let auxLoc of arrayAuxLoc) {
                      if (auxLoc.ecid == 'labeledImage.LOCATION') {
                          var jobx = {};
                          jobx = {
                              ...job
                          }
                          jobx.source_location = axloc.join('\n');
                          jobx.location = auxLoc.imageLabel + ''; //editar aqui las locaciones
                          jobs.push(jobx);
                      }
                  }
              } else {
                  job.source_location = '';
                  job.location = 'HQ - No Location available';
                  jobs.push(job);
              }
          }
      } else {
          var job = {};
          job.title = 'Ghost job, limit reached.';
          jobs.push(job);
          out.pass_it.offSet = out.pass_it.limit;
      }
      out["jobs"] = jobs
  } catch (err) {
       throw err
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
function getPath(obj, value, path) {
  try {
      if (typeof obj !== 'object') {
          return;
      }
      for (var key in obj) {
          if (obj.hasOwnProperty(key)) {
              var t = path;
              var v = obj[key];
              if (!path) {
                  newPath = key;
              } else {
                  newPath = path + '.' + key;
              }
              if (v === value) {
                  return newPath;
              } else if (typeof v !== 'object') {
                  newPath = t;
              }
              var res = getPath(v, value, newPath);
              if (res) {
                  return res;
              }
          }
      }
  } catch (e) {
      msg(e.message);
  }
}
function setToValue(obj, path) {
  path = path.split('.');
  for (var i of path) {
      obj = obj[i];
  }
  return obj
}
function getDateFormat(dateRaw, cut, dayPosition, monthPosition, yearPosition) {
  dateRaw = dateRaw.replace(/\,/g, "").replace(/\./g, "").trim();
  let day = dateRaw.split(cut)[dayPosition].trim(),
      month = dateRaw.split(cut)[monthPosition].trim(),
      year = dateRaw.split(cut)[yearPosition].trim();
  day = day.replace(/rd|st|th/i, "").trim();
  if (day < 10 && day.length < 2) {
      day = "0" + day;
  }
  if (year.length == 2) {
      year = "20" + year;
  }
  if (dateRaw.search(/[a-z]/gi) > -1) {
      //English, Dutch, French
      if (month.search(/jan/i) > -1) {
          month = "01";
      }
      if (month.search(/feb|fÃ©v/i) > -1) {
          month = "02";
      }
      if (month.search(/mar|maar/i) > -1) {
          month = "03";
      }
      if (month.search(/apr|avr/i) > -1) {
          month = "04";
      }
      if (month.search(/may|mai|mei/i) > -1) {
          month = "05";
      }
      if (month.search(/jun|juin/i) > -1) {
          month = "06";
      }
      if (month.search(/jul|juil/i) > -1) {
          month = "07";
      }
      if (month.search(/aug|aoÃ»t/i) > -1) {
          month = "08";
      }
      if (month.search(/sep/i) > -1) {
          month = "09";
      }
      if (month.search(/oct|okt/i) > -1) {
          month = "10";
      }
      if (month.search(/nov/i) > -1) {
          month = "11";
      }
      if (month.search(/dec|dÃ©c/i) > -1) {
          month = "12";
      }
  }
  var datum = month + "/" + day + "/" + year;
  return datum;
}
//pagination
(function () {
  var out = {};
  out["pass_it"] = pass_it;
  out.pass_it.offSet += 50;
  if (out.pass_it.offSet < out.pass_it.limit) {
      out["has_next_page"] = true;
  } else {
      out["has_next_page"] = false;
  }
  out["wait"] = false;
  return out;
})();



//Pagination 
//instrucciones: Usar el job site asi: https://mckesson.wd3.myworkdayjobs.com/External_Careers
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
(async () => {
  let out = {};
  out["pass_it"] = pass_it;
  try {
      let jobs = [];
      let resp = await fetch(window.location.origin + '/wday/cxs/' + window.location.host.split('.').shift().replace(/\-/g, '_') + window.location.pathname.replace(/\/[a-z][a-z]\-[A-Z][A-Z]\/|\/[a-z][a-z]\//, '/') + '/jobs', {
          "headers": {
              "accept": "application/json",
              "accept-language": "en-US",
              "content-type": "application/json",
              "sec-ch-ua": "\".Not/A)Brand\";v=\"99\", \"Google Chrome\";v=\"103\", \"Chromium\";v=\"103\"",
              "sec-ch-ua-mobile": "?0",
              "sec-ch-ua-platform": "\"Windows\"",
              "sec-fetch-dest": "empty",
              "sec-fetch-mode": "cors",
              "sec-fetch-site": "same-origin"
          },
          "referrer": "https://mckesson.wd3.myworkdayjobs.com/External_Careers",
          "referrerPolicy": "strict-origin-when-cross-origin",
          "body": JSON.stringify({
              "limit": 20,
              "offset": out.pass_it.offSet,
              "searchText": "",
              "appliedFacets": {}
          }),
          "method": "POST",
          "mode": "cors",
          "credentials": "include"
      });
      const data = await resp.json();
      let htmlJobs = data.jobPostings;
      if (out.pass_it.offSet == 0) {
          out.pass_it.limit = data.total;
      }
      if (out.pass_it.offSet < 2000) {
          for (let i in htmlJobs) {
              let elem = htmlJobs[i];
              if (!elem.title) continue;
              let job = {};
              job.reqid = elem.bulletFields[0];
              job.title = elem.title;
              job.url = window.location.origin + window.location.pathname.replace(/\/[a-z][a-z]\-[A-Z][A-Z]|\/[a-z][a-z]/, '') + elem.externalPath;
              msg('Title: ' + job.title + '\nURL: ' + job.url);
              job.temp = 96;
              ///////////////////////////////
              let respDec = await fetch(window.location.origin + '/wday/cxs/' + window.location.host.split('.').shift().replace(/\-/g, '_') + window.location.pathname.replace(/\/[a-z][a-z]\-[A-Z][A-Z]\/|\/[a-z][a-z]\//, '/') + elem.externalPath, {
                  "headers": {
                      "accept": "application/json",
                      "accept-language": "en-US",
                      "content-type": "application/x-www-form-urlencoded",
                      "sec-ch-ua": "\".Not/A)Brand\";v=\"99\", \"Google Chrome\";v=\"103\", \"Chromium\";v=\"103\"",
                      "sec-ch-ua-mobile": "?0",
                      "sec-ch-ua-platform": "\"Windows\"",
                      "sec-fetch-dest": "empty",
                      "sec-fetch-mode": "cors",
                      "sec-fetch-site": "same-origin"
                  },
                  "referrer": job.url,
                  "referrerPolicy": "strict-origin-when-cross-origin",
                  "body": null,
                  "method": "GET",
                  "mode": "cors",
                  "credentials": "include"
              });
              const dataDesc = await respDec.json();
              let jsonDesc = dataDesc.jobPostingInfo;
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
                  full_html.querySelectorAll('a, img, link, script, style, button, iframe, figure, picture').forEach(e => e.remove());
                  full_html.innerHTML = full_html.innerHTML.replace(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g, '');
                  full_html.innerHTML = full_html.innerHTML.replace(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g, ''); //Remove email
                  full_html.innerHTML = full_html.innerHTML.replace(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g, '');
                  full_html.innerHTML = full_html.innerHTML.replace(/(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g, '');
  
  
                  job.html = full_html.innerHTML.trim();
                  //job.html = removeTextBefore(job.html, 'your Candidate Home page.', true);
                  //job.html = removeTextBefore(job.html, 'Summary of Job Duties:', false);
                  //job.html = removeTextAfter(job.html, 'Recruitment Contact Information', true);
                  //job.html = removeTextAfter(job.html, 'All application materials must be', true);
                  //job.html = removeTextAfter(job.html, 'Additional Information:', true);
                  job.html = cleanHTML(job.html);
                  var tmp = document.createElement('div');
                  tmp.innerHTML = job.html;
                  job.jobdesc = tmp.textContent.trim();
                  job.jobdesc = cleanHTML(job.jobdesc);
  
                  job.html = job.html.replace(/[a-z0-9_\-\+\.]+@[a-z0-9\-]+\.([a-z]{2,4})(?:\.[a-z]{2})?|\.com|\d{3}-\d{3}-\d{4}/gm, '');
                  job.html = job.html.replace(/\b(([\w-]+:\/\/?|www[.])[^\s()<>]+(?:\([\w\d]+\)|([^[:punct:]\s]|\/)))|[a-z0-9_\-\+\.]+@[a-z0-9\-]+\.([a-z]{2,4})(?:\.[a-z]{2})?|www\.|http:|https:|\.com|\d{3}-\d{3}-\d{4}/gm, '');
  
                  if (job.html.indexOf('@') > -1) job.html = job.html.replace(/\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+/gi, "");
                  if (job.html.indexOf('https') > -1) job.html = job.html.replace(/(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi, "");
                  if (job.html.indexOf('http') > -1) job.html = job.html.replace(/(http?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi, "");
                  if (job.html.indexOf('HTTPS') > -1) job.html = job.html.replace(/(HTTPS?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi, "");
                  if (job.html.indexOf('HTTP') > -1) job.html = job.html.replace(/(HTTP?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi, "");
                  if (job.html.indexOf('www') > -1) job.html = job.html.replace(/(www?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi, "");
                  if (job.html.indexOf('WWW') > -1) job.html = job.html.replace(/(WWW?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi, "");
  
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
          }
      } else {
          var job = {};
          job.title = 'Ghost job, limit reached.';
          jobs.push(job);
          out.pass_it.offSet = out.pass_it.limit;
      }
      out["jobs"] = jobs;
  } catch (err) {
      throw err
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



//extract Variante Recruiting
(async () => {
  let out = {};
  out["pass_it"] = pass_it;
  try {
      let jobs = [];
      let resp = await fetch(window.location.origin + '/wday/cxs' + window.location.pathname.replace(/\/[a-z][a-z]\-[A-Z][A-Z]\/|\/[a-z][a-z]\//g, '/').replace(/\/recruiting\//g, '/') + '/jobs', {
          "headers": {
              "accept": "application/json",
              "accept-language": "en-US",
              "content-type": "application/json",
              "sec-ch-ua": "\".Not/A)Brand\";v=\"99\", \"Google Chrome\";v=\"103\", \"Chromium\";v=\"103\"",
              "sec-ch-ua-mobile": "?0",
              "sec-ch-ua-platform": "\"Windows\"",
              "sec-fetch-dest": "empty",
              "sec-fetch-mode": "cors",
              "sec-fetch-site": "same-origin"
          },
          "referrer": "https://mckesson.wd3.myworkdayjobs.com/External_Careers",
          "referrerPolicy": "strict-origin-when-cross-origin",
          "body": JSON.stringify({
              "limit": 20,
              "offset": out.pass_it.offSet,
              "searchText": "",
              "appliedFacets": {}
          }),
          "method": "POST",
          "mode": "cors",
          "credentials": "include"
      });
      const data = await resp.json();
      let htmlJobs = data.jobPostings;
      if (out.pass_it.offSet == 0) {
          out.pass_it.limit = data.total;
      }
      if (out.pass_it.offSet < 2000) {
          for (let i in htmlJobs) {
              let elem = htmlJobs[i];
              if (!elem.title) continue;
              let job = {};
              job.reqid = elem.bulletFields[0];
              job.title = elem.title;
              job.url = window.location.origin + window.location.pathname.replace(/\/[a-z][a-z]\-[A-Z][A-Z]\/|\/[a-z][a-z]\//g, '/') + elem.externalPath;
              msg('Title: ' + job.title + '\nURL: ' + job.url);
              job.temp = 96;
              ///////////////////////////////
              let respDec = await fetch(window.location.origin + '/wday/cxs' + window.location.pathname.replace(/\/[a-z][a-z]\-[A-Z][A-Z]\/|\/[a-z][a-z]\//g, '/').replace(/\/recruiting\//g, '/') + elem.externalPath, {
                  "headers": {
                      "accept": "application/json",
                      "accept-language": "en-US",
                      "content-type": "application/x-www-form-urlencoded",
                      "sec-ch-ua": "\".Not/A)Brand\";v=\"99\", \"Google Chrome\";v=\"103\", \"Chromium\";v=\"103\"",
                      "sec-ch-ua-mobile": "?0",
                      "sec-ch-ua-platform": "\"Windows\"",
                      "sec-fetch-dest": "empty",
                      "sec-fetch-mode": "cors",
                      "sec-fetch-site": "same-origin"
                  },
                  "referrer": job.url,
                  "referrerPolicy": "strict-origin-when-cross-origin",
                  "body": null,
                  "method": "GET",
                  "mode": "cors",
                  "credentials": "include"
              });
              const dataDesc = await respDec.json();
              let jsonDesc = dataDesc.jobPostingInfo;
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
          }
      } else {
          var job = {};
          job.title = 'Ghost job, limit reached.';
          jobs.push(job);
          out.pass_it.offSet = out.pass_it.limit;
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
//pagination
(function () {
  var out = {};
  out["pass_it"] = pass_it;
  out.pass_it.offSet += 20;
  if (out.pass_it.offSet < out.pass_it.limit) {
      out["has_next_page"] = true;
  } else {
      out["has_next_page"] = false;
  }
  out["wait"] = false;
  return out;
})();