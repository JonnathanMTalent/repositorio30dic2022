(() => {
    var out = {};
    out.pass_it = {
        "counter":0,
        "limit":0,
        "size":0,
    }
    return out;
})()

//extract

(function () {
    var jobs = [];
    var out = {};
    out.pass_it=pass_it;
    var json;
    const formatDate = (value) => {
    let date = new Date(value);
    const withCero = n => n < 10 ? `0${n}` : n;
    return `${withCero(date.getMonth()+1)}/${withCero(date.getDate())}/${date.getFullYear()}`;
  }
        var data = { "multilineEnabled": false, "sortingSelection": { "sortBySelectionParam": "3", "ascendingSortingOrder": "false" }, "fieldData": { "fields": { "KEYWORD": "", "LOCATION": "", "CATEGORY": "" }, "valid": true }, "filterSelectionParam": { "searchFilterSelections": [{ "id": "POSTING_DATE", "selectedValues": [] }, { "id": "LOCATION", "selectedValues": [] }, { "id": "JOB_FIELD", "selectedValues": [] }, { "id": "JOB_SCHEDULE", "selectedValues": [] }] }, "advancedSearchFiltersSelectionParam": { "searchFilterSelections": [{ "id": "ORGANIZATION", "selectedValues": [] }, { "id": "LOCATION", "selectedValues": [] }, { "id": "JOB_FIELD", "selectedValues": [] }, { "id": "JOB_NUMBER", "selectedValues": [] }, { "id": "URGENT_JOB", "selectedValues": [] }, { "id": "EMPLOYEE_STATUS", "selectedValues": [] }, { "id": "JOB_SHIFT", "selectedValues": [] }] }, "pageNo": out.pass_it.counter };            
        $.ajax({
            url: 'https://jefferies.taleo.net/careersection/rest/jobboard/searchjobs?lang=en&portal=8200100272',
            headers: {
            "accept": "application/json, text/javascript, */*; q=0.01",
            "accept-language": "es-ES,es;q=0.9",
            "content-type": "application/json",
            "sec-ch-ua": "\"Chromium\";v=\"104\", \" Not A;Brand\";v=\"99\", \"Google Chrome\";v=\"104\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "tz": "GMT-05:00",
            "tzname": "America/Bogota",
            "x-requested-with": "XMLHttpRequest"
            },
            type: 'POST',
            data: JSON.stringify(data),
            dataType: "json",
            async: false,
            success: function (result) {
                json = result.requisitionList;
                out.pass_it.limit = result.pagingData.totalCount;
                out.pass_it.size += result.pagingData.pageSize;
                for (var elem of json) {
                    var job = {};
                    job.reqid = elem.jobId;
                    job.title = elem.column[0];
                    job.source_location = elem.column[1];
                    job.location=elem.column[1].replace('["','').replace('"]','').split('-').reverse().join(',');
                    job.url = 'https://jefferies.taleo.net/careersection/jef_ex/jobdetail.ftl?job='+elem.contestNo+'&tz=GMT-05%3A00&tzname=America%2FBogota';
                    job.dateposted_raw = elem.column[2];
                    job.dateposted_raw= formatDate(job.dateposted_raw);
                    job.temp = 96;
                    jobs.push(job);
                }
                
            },
            error: function (error) {
                msg(error);
            }
        });

    out["jobs"] = jobs;
    return out;
})();

//pagination

(function () {
    const out = {};
    out.pass_it = pass_it;
    out.pass_it.counter += 1;
    const { counter, limit, size } = out.pass_it;
    out.has_next_page = size < limit;
    return out;
})();

//jobdesc

(function() {
    var out = {};
    var job = {};
    var selector = 'div[class="editablesection"]';
    var remove_selectors = [];
    //var job = pass_it["job"];
    var full_html = document.querySelector(selector);
    // remove something from the jobdatata
    if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {if(full_html.querySelector(remove_selector)) full_html.querySelector(remove_selector).remove();});
    if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
    if (typeof msg == "undefined") msg = console.log;
    document.querySelector('.titlepage').parentNode.remove()
    job.html      = full_html.innerHTML.trim();    
    job.source_jobtype = Contains(document.querySelectorAll('div[class="contentlinepanel"]'), 'Schedule:')
    msg(job.source_jobtype)
    job.html = removeTextBefore(job.html, 'Position Overview:', false);
    // job.html = removeTextBefore(job.html, 'Description', false);
    job.html = removeTextAfter(job.html, 'Primary Location', true);
    job.html      = cleanHTML(job.html);
    var tmp       = document.createElement('div');
    tmp.innerHTML = job.html;
    job.jobdesc   = tmp.textContent.trim();
    job.jobdesc   = cleanHTML(job.jobdesc);
    out["job"] = job;
    return out;
  
  })();
  function Contains(elementos, texto) {
    let result = ''
    elementos.forEach((a) => {
      if (a.textContent.includes(texto)) result = a.textContent.split(texto).pop().trim()
    })
    return result
  }
  function removeTextBefore(html, text, flag) {
    var newHtml = html;
    if (newHtml.indexOf(text) > -1) {
      newHtml = newHtml.split(text).pop();
      if (!flag) {
        newHtml = "<h3>" + text + "</h3>" + newHtml;
      }       
    }
    return newHtml;
  }
  function removeTextAfter(html, text, flag) {
    var newHtml = html;
    if (newHtml.indexOf(text) > -1) {
      newHtml = newHtml.split(text).shift();
      if (!flag) {
        newHtml = newHtml + "<p>" + text + "</p>";
      }       
    }
    return newHtml;
  }