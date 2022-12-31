(function () {
    var jobs = [];
    var out = {};
    out["pass_it"] = pass_it;
    var counter = 1;
    var limit = 0;
    var json;
    var jsonDesc;
    msg(out.pass_it.offSet);
    var data = { "limit": 20, "offset": out.pass_it.offSet, "searchText": "", "appliedFacets": {} };
    $.ajax({
      url: window.location.origin + '/wday/cxs/' + window.location.host.split('.').shift() + window.location.pathname + '/jobs',
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
        }else if(out.pass_it.offSet < 2000){
        json = result.jobPostings;
        for (var elem of json) {
          var job = {};
          job.reqid = elem.bulletFields[0];
          job.title = elem.title;
          //job.location = elem.positionOfLocation;
          job.url = window.location.href + elem.externalPath;
          msg('Title: ' + job.title + '\nURL: ' + job.url);
          job.dateposted_raw = elem.postedOn.replace('+', '');
          job.dateposted_raw = dateAgo(job.dateposted_raw, " ", 1, 2);
          job.temp = '11/30/2021';
          ///////////////////////////////
          $.ajax({
            url: window.location.origin + '/wday/cxs/' + window.location.host.split('.').shift() + window.location.pathname + elem.externalPath,
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
                if (typeof cleanHTML == "undefined") cleanHTML = function (x) { return x };
                if (typeof msg == "undefined") msg = console.log;
                job.html = full_html.innerHTML.trim();
                //job.html = removeTextBefore(job.html, '', false);
                //job.html = removeTextAfter(job.html, '', true);
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
              if (jsonDesc.additionalLocations) {
                var countReqId = 0;
                var jobx = {};
                jobx = { ...job }
                jobx.location = jsonDesc.jobRequisitionLocation.descriptor.slice(0, jsonDesc.jobRequisitionLocation.descriptor.length - 1).replace(',', ', ').trim().split('(').shift();
                jobs.push(jobx);
                for (let auxLoc of jsonDesc.additionalLocations) {
                  var jobx = {};
                  jobx = { ...job }
                  jobx.reqid = job.reqid + '-' + parseInt(countReqId + 1);
                  jobx.location = auxLoc.slice(0, auxLoc.length - 1).replace(',', ', ').trim().replaceAll('(Job Posting','').split('(').shift();
                  if(jobx.location.match(/Home|Mobile|Remote/gmi)){jobx.location= 'Washington, District of Columbia';}
                  if(jobx.location.match(/Harborside Plaz/gmi)){jobx.location= 'Harborside PlJersey, NJ, US';}
                  jobs.push(jobx);
                  countReqId += 1;
                }
              } else {
                job.location = jsonDesc.jobRequisitionLocation.descriptor.slice(0, jsonDesc.jobRequisitionLocation.descriptor.length - 1).replace(',', ', ').trim().split('(').shift();
                if(job.location.match(/Home|Mobile|Remote/gmi)){job.location= 'Washington, District of Columbia';}
                if(job.location.match(/Harborside Plaz/gmi)){job.location= 'Harborside PlJersey, NJ, US';}
                jobs.push(job);
              }
            },
            error: function (error) {
              msg(error);
            }
          });
          ///////////////////////////////
        }
        counter = counter + 1;
        }else {
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
  function dateAgo(text, char_separator, position_value_DWMY, position_word_DWMY) {
    var numberDWMY = parseInt(text.trim().split(char_separator)[position_value_DWMY], 10); //obtengo el valor numerico del dia, sem, mes o año
    if (typeof text.split(char_separator)[position_word_DWMY] !== 'undefined') {
      var dayWeekMonthYear = text.split(char_separator)[position_word_DWMY]
    } else { var dayWeekMonthYear = text.split(char_separator)[text.split(char_separator).length - 1] };
    var date_Now = new Date();  //declaro un objeto tipo fecha
    var nDays = 0;
    if (dayWeekMonthYear.toUpperCase().search(/TODAY|NOW|HOUR/g) > -1) { nDays = 0; }
    if (dayWeekMonthYear.toUpperCase().indexOf('YESTERDAY') > -1) { nDays = 1; }
    if (dayWeekMonthYear.toUpperCase().indexOf('DAYS') > -1) { nDays = numberDWMY; }
    if (dayWeekMonthYear.toUpperCase().indexOf('WEEK') > -1) { nDays = numberDWMY * 7; }
    if (dayWeekMonthYear.toUpperCase().indexOf('MONTH') > -1) { nDays = numberDWMY * 30; }
    if (dayWeekMonthYear.toUpperCase().indexOf('YEAR') > -1) { nDays = numberDWMY * 365; }
    var dateJob = date_Now.getDate() - nDays;     //resto dias de publicacion a la fecha actual
    var get_date = date_Now.setDate(dateJob);      //obtengo la cantidad de mseg. desde 1 de Enero de 1970
    var datePosted = new Date(get_date);             //obtengo la fecha de publicacion.
    //Obtengo dia mes y Año
    var dd = datePosted.getDate();                //devuelve el numero del dia del mes.
    var mm = datePosted.getMonth() + 1;             //getMonth devuelve valores de 0 a 11, se suma uno para llevarlo de 1 a 12.
    var yyyy = datePosted.getFullYear().toString(); //devuelve el año.
    if (dd < 10) { dd = '0' + dd; }
    if (mm < 10) { mm = '0' + mm; }
    dateJob = mm + '/' + dd + '/' + yyyy;
    return dateJob;
  }
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
  
  
  
  
  //(function() {
  //  var jobs = [];
  //  var out = {};
  //  var counter = 1;
  //  var limit = 0;
  //  var json;
  //  //do {
  //  var data = {};
  //  $.ajax({
  //    url : 'https://finra.wd1.myworkdayjobs.com/wday/cxs/finra/FINRA/jobs',
  //    headers: {
  //      "Content-Type": "application/json;charset=UTF-8"
  //    },
  //    type : 'POST',
  //    data : JSON.stringify(data),
  //    dataType: "json",
  //    async : false,
  //    success : function(result){
  //      json = result.jobPostings;
  //      limit = result.total;
  //      for(var i = 0; i<json.length; i++) {
  //
  //        var elem = json[i];
  //
  //        var location = elem.locationsText.split('(').shift().trim();
  //
  //        if (	location.search(/Locations/gmi)	>	-1){
  //
  //          var full_html = getDescription('https://finra.wd1.myworkdayjobs.com/en-US/FINRA' + elem.externalPath);
  //          msg('https://finra.wd1.myworkdayjobs.com/en-US/FINRA' + elem.externalPath);
  //          var div = document.createElement("div");
  //          div.innerHTML = full_html
  //          var desc = div.querySelector('div.css-cygeeu > div > dl');
  //          msg (desc)
  //
  //        }else{
  //          var job = {};
  //          job.reqid = elem.externalPath.split('_').pop().trim();
  //          job.title = elem.title;
  //          job.location = elem.locationsText.split('(').shift().trim();
  //          job.url = 'https://finra.wd1.myworkdayjobs.com/en-US/FINRA' + elem.externalPath;
  //          job.temp = "11/22/2021";
  //          jobs.push(job);
  //        }
  //
  //      }
  //      counter = counter + 1;
  //    },
  //    error: function(error){
  //      msg(error);
  //    }
  //  });
  //  // } while (counter < limit);
  //
  //  out["jobs"]= jobs;
  //  return out;
  //})();
  //
  //
  //function getDescription(url) {
  //  var xhrrequest = new XMLHttpRequest();
  //  xhrrequest.open("GET", url, false); //URL del ajax que trae la información del job
  //  var response = "";
  //  xhrrequest.onreadystatechange = function() {
  //    if (xhrrequest.readyState == 4 && xhrrequest.status == 200) {
  //      //console.log(xhrrequest.responseText);
  //      response = xhrrequest.responseText;
  //    }
  //  };
  //  xhrrequest.send();
  //  return response;
  //}
  
  //(function () {
  //  var returnedJobs = [];
  //  var out = {};
  //  if (typeof pass_it == "undefined") pass_it = {};
  //  if (!pass_it["cont"]) {
  //    out["pass_it"] = {
  //      "cont": 0,
  //      "jobs": 0,
  //      "expected_jobs": 0
  //    };
  //  } else {
  //    out["pass_it"] = pass_it;
  //  }
  //  let endpoint = window.location.href.split("/0/").shift().split("/fs/").shift() + "/fs/searchPagination/318c8bb6f553100021d223d9780d30be/" + out["pass_it"].cont;
  //  msg(endpoint);
  //  var data = {};
  //  $.ajax({
  //    url: endpoint,
  //    headers: {
  //      "accept": "application/json,application/xml",
  //      "accept-language": "en,es;q=0.9,en-CA;q=0.8,es-419;q=0.7,en-US;q=0.6",
  //      "content-type": "application/x-www-form-urlencoded",
  //      "sec-fetch-dest": "empty",
  //      "sec-fetch-mode": "cors",
  //      "sec-fetch-site": "same-origin",
  //      "sec-gpc": "1",
  //      "stats-perf": "735878cec60544f0881b0a2776d1be57,1129,,0",
  //      "workday-client-manifest-id": "mvp",
  //      "x-workday-client": "2021.18.009"
  //    },
  //    type: 'GET',
  //    //data : JSON.stringify(data),
  //    dataType: "json",
  //    async: false,
  //    success: function (json) {
  //      if (out["pass_it"].cont == 0) {
  //        //extract total jobs in first pagination
  //        var descPath = getPath(json, "number.paginationCount");
  //        descPath = descPath.split('.').slice(0, -1).join('.') + '.value';
  //        var expected_jobs_str = setToValue(json, descPath);
  //        //var expected_jobs_str = json.body.children[0].facetContainer.paginationCount.value;
  //        out["pass_it"].expected_jobs = expected_jobs_str;
  //      }
  //      var descPath = getPath(json, "facetSearchResultList");
  //      descPath = descPath.split('.').slice(0, -1).join('.') + '.listItems';
  //      var jobs = setToValue(json, descPath);
  //      //var jobs = json.body.children[1].children[0].listItems;
  //      for (i in jobs) {
  //        var job = {}; /*init*/
  //        job.title = jobs[i].title.instances[0].text;
  //        job.url = window.location.protocol + "//" + window.location.hostname + jobs[i].title.commandLink + '?codes=NEUVOO';
  //        msg('Title: ' + job.title + '\nURL: ' + job.url);
  //        //-----------DESCRIPTION---------
  //        var json = JSON.parse(getDescription(job.url));
  //        var descPath = getPath(json, /*"richTextArea.jobPosting.jobDescription"*/'.css-1dr8quw');
  //        descPath = descPath.split('.').slice(0, -1).join('.') + '.text';
  //        //job.html = json.openGraphAttributes.description.replace(/[\w|.-]+@[\w|-]+(\.[\w-]+){1,4}|\+?\d{3,}|\+\d+|www\.\S+|https?\S+|\(\d+\)|\S+\.com|<\/?[^>]+(>|$)/gi, "");
  //        var full_html = document.createElement('div');
  //        full_html.innerHTML = setToValue(json, descPath);
  //        for (const a of full_html.querySelectorAll('p, span, li')) {
  //          if (a.textContent.search(/@|http|www\.|www\.oxfordproperties\.com|\.com/ig) > -1) {
  //            a.remove();
  //          }
  //        }
  //        job.html = full_html.innerHTML.trim();
  //        job.html = removeTextBefore(job.html, "Job Description", false);
  //        job.html = removeTextAfter(job.html, /To Apply|Location:/, true);
  //        job.html = cleanHTML(job.html);
  //        var tmp = document.createElement('div');
  //        tmp.innerHTML = job.html;
  //        job.jobdesc = tmp.textContent.trim();
  //        job.jobdesc = cleanHTML(job.jobdesc);
  //        //---------MULTILOCATION-------------------
  //        job.temp = 96;
  //        var descPath = getPath(json, "labeledImage.POSTED_DATE");
  //        if (descPath) {
  //          descPath = descPath.split('.').slice(0, -1).join('.') + '.imageLabel';
  //          job.dateposted_raw = setToValue(json, descPath);
  //          job.dateposted_raw = dateAgo(job.dateposted_raw, " ", 0, 1);
  //        }
  //        var descPath = getPath(json, "labeledImage.JOB_TYPE");
  //        if (descPath) {
  //          descPath = descPath.split('.').slice(0, -1).join('.') + '.imageLabel';
  //          job.source_jobtype = setToValue(json, descPath);
  //        }
  //
  //        var descPath = getPath(json, "labeledImage.JOB_REQ");
  //        if (descPath) {
  //          descPath = descPath.split('.').slice(0, -1).join('.') + '.imageLabel';
  //          job.reqid = setToValue(json, descPath);
  //        }
  //        var descPath = getPath(json, "labeledImage.LOCATION");
  //        if (descPath) {
  //          descPath = descPath.split('.').slice(0, -2).join('.');
  //          var arrayAuxLoc = setToValue(json, descPath);
  //          var countReqId = 0;
  //          for (let auxLoc of arrayAuxLoc) {
  //            if (auxLoc.ecid == 'labeledImage.LOCATION') {
  //              var jobx = {};
  //              jobx = { ...job }
  //              jobx.reqid = job.reqid + '-' + parseInt(countReqId + 1);
  //              jobx.location = auxLoc.imageLabel + '';
  //              if(jobx.location.search(/Remote Job Posting|ada/i)>-1){jobx.location = "Ada, OK, US";}
  //              returnedJobs.push(jobx);
  //              countReqId += 1;
  //            }
  //          }
  //        } else {
  //          job.location = 'Ada, OK, US';
  //          returnedJobs.push(job);
  //        }
  //      }
  //    },
  //    error: function (error) {
  //      msg(error);
  //    }
  //  });
  //  out['pass_it'].jobs = returnedJobs.length;
  //  out["jobs"] = returnedJobs;
  //  return out;
  //})();
  //function getDescription(url) {
  //  var xhrrequest = new XMLHttpRequest();
  //  xhrrequest.open("GET", url, false); //URL del ajax que trae la información del job
  //  xhrrequest.setRequestHeader("Accept", "application/json,application/xml");
  //  xhrrequest.setRequestHeader("Accept-Language", "en-CA,en;q=0.8,en-GB;q=0.6,en-US;q=0.4,es;q=0.2");
  //  xhrrequest.setRequestHeader("Cache-Control", "no-cache");
  //  xhrrequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  //  xhrrequest.setRequestHeader("Pragma", "no-cache");
  //  var response = "";
  //  xhrrequest.onreadystatechange = function () {
  //    if (xhrrequest.readyState == 4 && xhrrequest.status == 200) {
  //      response = xhrrequest.responseText;
  //    }
  //  };
  //  xhrrequest.send();
  //  return response;
  //}
  //function removeTextBefore(html, text, flag) {
  //  var newHtml = html;
  //  if (newHtml.search(text) > -1) {
  //    newHtml = newHtml.split(text).pop();
  //    if (!flag) {
  //      newHtml = "<h3>" + text + "</h3>" + newHtml;
  //    }
  //  }
  //  return newHtml;
  //}
  //function removeTextAfter(html, text, flag) {
  //  var newHtml = html;
  //  if (newHtml.search(text) > -1) {
  //    newHtml = newHtml.split(text).shift();
  //    if (!flag) {
  //      newHtml = newHtml + "<p>" + text + "</p>";
  //    }
  //  }
  //  return newHtml;
  //}
  //function dateAgo(text, char_separator, position_value_DWMY, position_word_DWMY) {
  //  var numberDWMY = parseInt(text.trim().split(char_separator)[position_value_DWMY], 10); //obtengo el valor numerico del dia, sem, mes o año
  //  if (typeof text.split(char_separator)[position_word_DWMY] !== 'undefined') {
  //    var dayWeekMonthYear = text.split(char_separator)[position_word_DWMY]
  //    } else { var dayWeekMonthYear = text.split(char_separator)[text.split(char_separator).length - 1] };
  //  var date_Now = new Date();  //declaro un objeto tipo fecha
  //  var nDays = 0;
  //  if (dayWeekMonthYear.toUpperCase().search(/TODAY|NOW|HOUR/g) > -1) { nDays = 0; }
  //  if (dayWeekMonthYear.toUpperCase().indexOf('YESTERDAY') > -1) { nDays = 1; }
  //  if (dayWeekMonthYear.toUpperCase().indexOf('DAYS') > -1) { nDays = numberDWMY; }
  //  if (dayWeekMonthYear.toUpperCase().indexOf('WEEK') > -1) { nDays = numberDWMY * 7; }
  //  if (dayWeekMonthYear.toUpperCase().indexOf('MONTH') > -1) { nDays = numberDWMY * 30; }
  //  if (dayWeekMonthYear.toUpperCase().indexOf('YEAR') > -1) { nDays = numberDWMY * 365; }
  //  var dateJob = date_Now.getDate() - nDays;     //resto dias de publicacion a la fecha actual
  //  var get_date = date_Now.setDate(dateJob);      //obtengo la cantidad de mseg. desde 1 de Enero de 1970
  //  var datePosted = new Date(get_date);             //obtengo la fecha de publicacion.
  //  //Obtengo dia mes y Año
  //  var dd = datePosted.getDate();                //devuelve el numero del dia del mes.
  //  var mm = datePosted.getMonth() + 1;             //getMonth devuelve valores de 0 a 11, se suma uno para llevarlo de 1 a 12.
  //  var yyyy = datePosted.getFullYear().toString(); //devuelve el año.
  //  if (dd < 10) { dd = '0' + dd; }
  //  if (mm < 10) { mm = '0' + mm; }
  //  dateJob = mm + '/' + dd + '/' + yyyy;
  //  return dateJob;
  //}
  //function getPath(obj, value, path) {
  //  try {
  //    if (typeof obj !== 'object') {
  //      return;
  //    }
  //    for (var key in obj) {
  //      if (obj.hasOwnProperty(key)) {
  //        var t = path;
  //        var v = obj[key];
  //        if (!path) {
  //          newPath = key;
  //        } else {
  //          newPath = path + '.' + key;
  //        }
  //        if (v === value) {
  //          return newPath;
  //        } else if (typeof v !== 'object') {
  //          newPath = t;
  //        }
  //        var res = getPath(v, value, newPath);
  //        if (res) {
  //          return res;
  //        }
  //      }
  //    }
  //  } catch (e) {
  //    msg(e.message);
  //  }
  //}
  //function setToValue(obj, path) {
  //  path = path.split('.');
  //  for (var i of path) {
  //    obj = obj[i];
  //  }
  //  return obj
  //}
  
  //(function() {
  //  var out = {};
  //
  //  if(typeof pass_it == "undefined") pass_it = {};
  //  if (!pass_it["cont"]) {
  //    out["pass_it"] = {
  //      "cont": 0,
  //      "jobs":0,
  //      "expected_jobs":0
  //    };
  //  } else {
  //    out["pass_it"] = pass_it;
  //  }
  //
  //  var returnedJobs = [];    
  //
  //  var element = document.querySelector("pre").textContent;
  //  //msg(element);
  //  var json = JSON.parse(element);
  //  var jobs = json.body.children[0].children[0].listItems;
  //
  //  if(out["pass_it"].cont == 0) out["pass_it"].expected_jobs = json.body.children[0].facetContainer.paginationCount.value;
  //  //msg(typeof(jobs));
  //  for(i in jobs) {
  //    var job = {};/*init*/
  //    // msg("Entre")
  //    job.title = jobs[i].title.instances[0].text;
  //    job.url = window.location.origin + jobs[i].title.commandLink;
  //    job.reqid = jobs[i].subtitles[0].instances[0].text;
  //    if(jobs[i].subtitles[1])
  //      job.location = jobs[i].subtitles[1].instances[0].text;
  //
  //    job.temp = 1;
  //    //msg(job.location)
  //    //if(job.location.indexOf("More") > -1){
  //
  //    aux = getDescription(job.url)
  //    var json_desc = JSON.parse(aux);
  //    var array = json_desc.body.children[1].children[0].children;	 
  //    var html = JSON.parse(json_desc.structuredDataAttributes.data);
  //
  //    //job.dateposted_raw = html.datePosted;
  //    aux_date = html.datePosted.split("-");
  //    job.dateposted_raw = aux_date[1]+"/"+aux_date[2]+"/"+aux_date[0];
  //    job.source_jobtype = json_desc.body.children[1].children[1].children[1].imageLabel;
  //
  //    job.html 		= html.description;
  //    //job.html = removeTextBefore(job.html, 'Summary of Job Duties', false);
  //    //job.html = removeTextAfter(job.html, 'Application Instructions', true);	
  //    job.html = removeTextAfter(job.html, "To be considered for this position, please submit an application.", true);
  //    job.html = removeTextBefore(job.html, "Essential Job Functions:", false);
  //    if(job.html.indexOf('@')>-1){
  //      var eliminar = job.html.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi).join('\n');
  //      job.html = job.html.replace(eliminar,'');
  //    }
  //    if (job.html.indexOf('https') > -1) { job.html = job.html.replace(/(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,""); }
  //    if (job.html.indexOf('http') > -1)  { job.html = job.html.replace(/(http?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,"");  } 
  //    if (job.html.indexOf('HTTPS') > -1) { job.html = job.html.replace(/(HTTPS?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,""); }
  //    if (job.html.indexOf('HTTP') > -1)  { job.html = job.html.replace(/(HTTP?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,"");  }
  //    if (job.html.indexOf('www') > -1)  { job.html = job.html.replace(/(www?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,"");  }
  //
  //    job.html 		= cleanHTML(job.html);
  //    var tmp       = document.createElement("DIV");
  //    tmp.innerHTML = job.html;
  //    job.jobdesc 	= tmp.textContent.trim();
  //    job.jobdesc = cleanHTML(job.jobdesc);
  //
  //
  //    for(var i in array){
  //      if(array[i].iconName == 'LOCATION'){
  //        var jobx = {};
  //        jobx = Object.assign({}, job);
  //        //jobx.title = job.title;
  //        //jobx.url = job.url; 
  //        var l = array[i].imageLabel.replace('(Job Posting)','');
  //
  //        if(l.trim() != jobx.title.trim()){
  //          jobx.location = l;
  //        } else {
  //          jobx.location = "Washington, DC";
  //        }
  //        //jobx.temp = job.temp;
  //        //msg(jobx)
  //        if(jobx.title.indexOf('Open application') > -1) {jobx.title = '';}
  //        if(jobx.title.length > 0){
  //          returnedJobs.push(jobx);
  //        }		  		  
  //      }
  //    }
  //    /*}else{
  //      returnedJobs.push(job);
  //    }*/
  //  }
  //  out["pass_it"]["jobs"] = returnedJobs.length;
  //  out["jobs"]= returnedJobs;
  //  return out;
  //})();
  //
  //function getDescription(url) {
  //  var xhrrequest = new XMLHttpRequest();
  //  xhrrequest.open("GET", url, false); //URL del ajax que trae la información del job
  //  xhrrequest.setRequestHeader("Accept","application/json,application/xml");
  //  xhrrequest.setRequestHeader("Accept-Language","en-CA,en;q=0.8,en-GB;q=0.6,en-US;q=0.4,es;q=0.2");
  //  xhrrequest.setRequestHeader("Cache-Control","no-cache");
  //  xhrrequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
  //  xhrrequest.setRequestHeader("Pragma","no-cache");
  //  var response = "";
  //  xhrrequest.onreadystatechange = function() {
  //    if(xhrrequest.readyState == 4 && xhrrequest.status == 200) 
  //    {
  //      //console.log(xhrrequest.responseText);
  //      response = xhrrequest.responseText;
  //    }
  //  };
  //  xhrrequest.send(); 
  //  return response;
  //}
  //function removeTextBefore(html, text, flag) {
  //  var newHtml = html;
  //  if (newHtml.indexOf(text) > -1) {
  //    newHtml = newHtml.split(text).pop();
  //    if (!flag) {
  //      newHtml = "<h3>" + text + "</h3>" + newHtml;
  //    }  		
  //  }
  //  return newHtml;
  //}
  //
  //function removeTextAfter(html, text, flag) {
  //  var newHtml = html;
  //  if (newHtml.indexOf(text) > -1) {
  //    newHtml = newHtml.split(text).shift();
  //    if (!flag) {
  //      newHtml = newHtml + "<p>" + text + "</p>";
  //    }  		
  //  }
  //  return newHtml;
  //}
  
  
  
  
  /*
  (function() {
    var out = {};
    if(typeof pass_it == "undefined") pass_it = {};
    if (!pass_it["cont"]) {
      out["pass_it"] = {
        "cont": 50,
        "jobs": 0
      };
    } else {
      out["pass_it"] = pass_it;
    }
    var element = document.querySelector("pre").textContent;
    var json = JSON.parse(element);
    var jobs = json.body.children[0].children[0].listItems;
    var returnedJobs = [];  
    for(j in jobs) {
      var job = {};
      job.title = jobs[j].title.instances[0].text;
      job.url   = window.location.protocol + "//" + window.location.hostname + jobs[j].title.commandLink;
      job.reqid = jobs[j].id;
      job.temp = "Feb-202320";
      if (job.title.length > 1){
        var json_desc = JSON.parse(getDescription(job.url));
        var array = json_desc.body.children[1].children[0].children;
        var loc = array[0].imageLabel;
        if(typeof loc != 'undefined'){
          for(var i in array){
            if(array[i].iconName == 'LOCATION'){
              var jobx = {};
              jobx.title    = job.title;
              jobx.url      = job.url;
              var l = array[i].imageLabel.replace('(Job Posting)','');
  
              if(l.trim() != jobx.title.trim()){
                jobx.location = l;
              } else {
                jobx.location = "Washington, DC";
              }
  
              jobx.reqid = job.reqid;
              jobx.temp      = job.temp;
              //msg(jobx)
              if(jobx.title.indexOf('Open application') > -1) {jobx.title = '';}
              if(jobx.title.length > 0){
                returnedJobs.push(jobx);
              }
            }
          }
        } else {
          var jobx = {};
          jobx.title    = job.title;
          jobx.url      = job.url; 
          var l = job.title.split("-").pop().replace('(Job Posting)','').trim();
          if(l.trim() != jobx.title.trim()){
                jobx.location = l;
              } else {
                jobx.location = "Washington, DC";
              }
          jobx.reqid = job.reqid;
          jobx.temp      = job.temp;
          if(jobx.title.length > 0){
            returnedJobs.push(jobx);
          }
        }
      }
    }
    //    msg(jobs);
    //    msg(returnedJobs.length);
    out["pass_it"]["jobs"] = jobs.length;
    out["jobs"]= returnedJobs;
    return out;
  })();
  function getDescription(url) {
    var xhrrequest = new XMLHttpRequest();
    xhrrequest.open("GET", url, false); //URL del ajax que trae la información del job
    xhrrequest.setRequestHeader("Accept","application/json,application/xml");
    xhrrequest.setRequestHeader("Accept-Language","en-CA,en;q=0.8,en-GB;q=0.6,en-US;q=0.4,es;q=0.2");
    xhrrequest.setRequestHeader("Cache-Control","no-cache");
    xhrrequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    xhrrequest.setRequestHeader("Pragma","no-cache");
    var response = "";
    xhrrequest.onreadystatechange = function() {
      if(xhrrequest.readyState == 4 && xhrrequest.status == 200) 
      {
        //console.log(xhrrequest.responseText);
        response = xhrrequest.responseText;
      }
    };
    xhrrequest.send(); 
    return response;
  }*/