/*Extract*/
(function() {
    var jobs = [];
    var out = {};
    if (typeof pass_it == "undefined") pass_it = {};
    if (typeof msg == "undefined") msg = console.log;
    if (!pass_it["limit"]) {
      out["pass_it"] = {
        limit: 0,
        count: 0,
        jobs: 0
      };
    } else {
      out["pass_it"] = pass_it;
    }
    var data = {"partnerId":"25212","siteId":"6059","keyword":"","location":"","keywordCustomSolrFields":"OptionalReq,JobTitle,FORMTEXT2","locationCustomSolrFields":"FORMTEXT3","linkId":"","Latitude":0,"Longitude":0,"facetfilterfields":{"Facet":[]},"powersearchoptions":{"PowerSearchOption":[]},"SortType":"LastUpdated","pageNumber":out["pass_it"].count,"encryptedSessionValue":"^EJi3R4vO3wYELJejzRCFmSdLybsAO4tpZEHNsxeLWwTPKFpHhFcHpcyLSIUVueunnRzP2DiH7U1h07LPBSNy7VPOUAKzpYAEOc97yxdoJ3A="};
    //Nota: Siempre se debe cambiar la data, URL, URLJOB y los headers
    $.ajax({
      url: 'https://sjobs.brassring.com/TgNewUI/Search/Ajax/ProcessSortAndShowMoreJobs',
      headers: {
        "accept": "application/json, text/plain, */*",
        "accept-language": "es-ES,es;q=0.9",
        "content-type": "application/json;charset=UTF-8",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "sec-gpc": "1"
      },
      type: 'POST',                                        // 3) tipo
      dataType: "json",                                   // 4) data que retorna
      //data: data,
      data: JSON.stringify(data),
      async: false,
      success: function (result) {
        msg("SUCCES");
        var json = result.Jobs.Job;                                 // 5) ruta de los trabajos
        msg(json.length);
        //  msg(json);
        out["pass_it"].limit =  result.JobsCount;
        //msg("===========>"+out["pass_it"].limit)
        var stop = json;
        if(stop.length < 1){
          var seguir = false;
        }
        for (var i = 0; i < json.length; i++) {
          var job = {};
          job.title = json[i].Questions[9].Value;
          job.reqid = json[i].Questions[0].Value;
          job.url = "https://sjobs.brassring.com/TGnewUI/Search/home/HomeWithPreLoad?partnerid=25212&siteid=6059&PageType=JobDetails&jobid="+job.reqid;
          job.location = "Dallas, TX";
          if(json[i].Questions[11]){
            job.source_location = json[i].Questions[11].Value;
            job.location = job.source_location.split(" - ").reverse().join(", ").trim();
            job.location = job.location.split(/AFB ,|\-|AFB|\/|Headquarters|Consolidated ,|JBLM, |Center ,|Home|JBLM,/i).pop().replace(/ \(|\) | Exchange |McChordJBLM, |LakehurstJBMDL,/gi,"").trim().split(", ").slice(0,3).join(", ");
          }
          if(job.location.length<2){job.location = "Dallas, TX"}
          //job.dateposted_raw = json[i].Questions[6].Value;
          job.dateposted_raw = new Date(json[i].Questions[6].Value).toLocaleDateString();
          //busco jobtype que no tiene el Selector
          var jobtype = json[i].Questions[10].Value;
          if(jobtype.search(/permanent/i)>-1){job.source_jobtype = "Permanent";}
          if(jobtype.search(/part time|part-time/i)>-1){job.source_jobtype = "Part Time";}
          if(jobtype.search(/full-time|full time/i)>-1){job.source_jobtype = "Full Time";} 
          job.temp = "BC05132022";
          jobs.push(job);
        }          
      },
      error: function(error){
        msg(error);
      }
    });    
    out["jobs"]= jobs;
    out["pass_it"]["jobs"] = jobs.length;
    return out;
  })(); 
  /*Pagination*/
  (function() {
    var out = {};
    out["pass_it"] = pass_it;
    if( out["pass_it"]["jobs"] > 0){       
      out["pass_it"].count++
      out["has_next_page"] = true;
      msg(out["pass_it"]["jobs"])
    }else {
      out["has_next_page"] = false;          
    }
    return out;
  })();
  /*BeforeJobdesc*/
  (function() {
      var out = {};
      out.waitFor = 'div.questionClass.ng-scope';
      return out;
  })();
  /*Jobdesc*/
  (function() {
    var out = {};
    var job = {};
    var selector = 'div.questionClass.ng-scope';
    var remove_selectors = [];
    //var job = pass_it["job"];
    var full_html = document.querySelector(selector);
    const $auxExperience = [...document.querySelectorAll('li')].find(e => e?.textContent.match(/\(?\d{1,2}\)?\s?\+?\s?(\s?(-|to|–)\s?\d{1,2}\+?)?\syears?/gi));
    if($auxExperience) {
      job.experience_required = $auxExperience.textContent.match(/\(?\d{1,2}\)?\s?\+?\s?(\s?(-|to|–)\s?\d{1,2}\+?)?\syears?/gi)[0];
    }
    for (const a of document.querySelectorAll('div')) {
        if (a.textContent.search(/Salary Minimum/i)>-1){ //can use search or match methods
          job.source_salary = a.textContent.replace(/Salary Minimum/g,"").trim(); 
        } 
      }
    for (const a of document.querySelectorAll('img, a, script, style')) {
      a.remove(); //if you want to remove this selector
    }
    // remove something from the jobdatata
    if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {if(full_html.querySelector(remove_selector)) full_html.querySelector(remove_selector).remove();});
    if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
    if (typeof msg == "undefined") msg = console.log;
    job.html      = full_html.innerHTML.trim();   
    job.html = removeTextBefore(job.html, 'Job Description', false);
    job.html = removeTextAfter(job.html, 'Salary Minimum', true);
    job.html = job.html.replace(/[a-z0-9_\-\+\.]+@[a-z0-9\-]+\.([a-z]{2,4})(?:\.[a-z]{2})?|\.com|\d{3}-\d{3}-\d{4}/gm,'');
    job.html = job.html.replace(/\b(([\w-]+:\/\/?|www[.])[^\s()<>]+(?:\([\w\d]+\)|([^[:punct:]\s]|\/)))|[a-z0-9_\-\+\.]+@[a-z0-9\-]+\.([a-z]{2,4})(?:\.[a-z]{2})?|www\.|http:|https:|\.com|\d{3}-\d{3}-\d{4}/gm,'');
    job.html      = cleanHTML(job.html);
    var tmp       = document.createElement('div');
    tmp.innerHTML = job.html;
    job.jobdesc   = tmp.textContent.trim();
    job.jobdesc   = cleanHTML(job.jobdesc);
    out["job"] = job;
    return out;
  })();
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