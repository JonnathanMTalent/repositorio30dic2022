/*Extract*/
(function() {
    var jobs = [];
    var out = {};
    if (typeof pass_it == "undefined") pass_it = {};
    if (typeof msg == "undefined") msg = console.log;
    if (!pass_it["cont"]) {
      out["pass_it"] = {
        cont: 1,
        limit: 0
      };
    } else {
      out["pass_it"] = pass_it;
    }
    //do {
    $.ajax({
      url: 'https://edmn.fa.us2.oraclecloud.com/hcmRestApi/resources/latest/recruitingCEJobRequisitions?onlyData=true&expand=requisitionList.secondaryLocations,flexFieldsFacet.values&finder=findReqs;siteNumber=CX_1,facetsList=LOCATIONS%3BWORK_LOCATIONS%3BTITLES%3BCATEGORIES%3BORGANIZATIONS%3BPOSTING_DATES%3BFLEX_FIELDS,limit=24,offset=' + out["pass_it"].cont, // 1) url
      headers: {                                                      
        "accept": "*/*",
        "Content-Type":"application/vnd.oracle.adf.resourcecollection+json"    // 2) headers
      },
      type: 'GET',                                        // 3) tipo
      dataType: "json",                                   // 4) data que retorna
      //data: data,
      async: false,
      success: function (result) {     
        var json = result.items[0].requisitionList;
        out["pass_it"].limit = result.items[0].TotalJobsCount;
        // 5) ruta de los trabajos
        //msg(json.length);
        for (var i = 0; i < json.length; i++) {
          var job = {};
          job.title = json[i].Title;
          job.url = "https://edmn.fa.us2.oraclecloud.com/hcmUI/CandidateExperience/en/sites/CX_1/requisitions/preview/" + json[i].Id;  
          job.source_location = json[i].PrimaryLocation;
          job.location = job.source_location;
          job.reqid = json[i].Id;
          //job.logo = json[i].;
          //job.source_apply_email = json[i].;
          //job.source_empname = json[i].;
          //job.source_jobtype = json[i].;
          //job.source_salary = json[i].;
          let auxdate = json[i].PostedDate.trim();
          job.dateposted_raw = new Date(auxdate).toLocaleDateString();
          //job.dateclosed_raw = json[i].;
          /*  var fecha = json[i].
             fecha = fecha.split(" ")[0].split("-");
             job.dateposted_raw =  fecha[1]+'/'+fecha[2]+'/'+fecha[0];*/
          job.temp = "BE24022022";
          jobs.push(job);
        }          
      },
      error: function(error){
        msg(error);
      }
    });    
    out["jobs"]= jobs;
    return out;
  })(); 
  /*Pagination*/
  (function() {
      var out = {};
      out["pass_it"] = pass_it;
      out["pass_it"].cont += 24;
      //msg(out["pass_it"].cont +" <======> "+ out["pass_it"].limit)  
      if(out["pass_it"].cont < out["pass_it"].limit){
          out["has_next_page"] = true;
      }else {
        out["has_next_page"] = false;          
      }
      return out;
  })();
  /*BeforeJobdesc*/
  (function() {
      var out = {};
      out.waitFor = "div.basic-formatter";
      return out;
  })();
  /*Jobdesc*/
  (function() {
    var out = {};
    var job = {};
    var selector = 'div.basic-formatter';
    var remove_selectors = [];
    //var job = pass_it["job"];
    var full_html = document.querySelector(selector);
    const $auxExperience = [...document.querySelectorAll('p')].find(e => e?.textContent.match(/\(?\d{1,2}\)?\s?\+?\s?(\s?(-|to|–)\s?\d{1,2}\+?)?\syears?/gi));
    if($auxExperience) {
      job.experience_required = $auxExperience.textContent.match(/\(?\d{1,2}\)?\s?\+?\s?(\s?(-|to|–)\s?\d{1,2}\+?)?\syears?/gi)[0];
    }
    for (const a of document.querySelectorAll('div.job-info-wrapper')) {    
      if (a.textContent.includes('Job Schedule')){ //can use search or match methods
        job.source_jobtype = a.textContent.replace(/Job Schedule/g,"").trim();
      } 
    }
    for (const a of document.querySelectorAll('img, a, script, style, button')) {
      a.remove(); //if you want to remove this selector
    }
    // remove something from the jobdatata
    if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {if(full_html.querySelector(remove_selector)) full_html.querySelector(remove_selector).remove();});
    if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
    if (typeof msg == "undefined") msg = console.log;
    job.html      = full_html.innerHTML.trim();   
    //job.html = removeTextBefore(job.html, 'Summary of Job Duties', false);
    job.html = removeTextAfter(job.html, 'To apply visit', true);
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