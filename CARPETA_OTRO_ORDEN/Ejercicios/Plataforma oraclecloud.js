//Con jason

//Extract

(function () {
  var jobs = [];
  var out = {};
  var cont = 0;
  var json;
  var seguir = true;
  //var ToKen;
  do {
    //var data = ;

    $.ajax({

      url: 'https://hcmn.fa.ap1.oraclecloud.com/hcmRestApi/resources/latest/recruitingCEJobRequisitions?onlyData=true&expand=requisitionList.secondaryLocations,flexFieldsFacet.values&finder=findReqs;siteNumber=CX_1001,facetsList=LOCATIONS%3BWORK_LOCATIONS%3BTITLES%3BCATEGORIES%3BPOSTING_DATES%3BFLEX_FIELDS,limit=24,offset='+cont, // 1) url

      headers: {    

        "accept": "*/*",
        "accept-language": "en",
        "content-type": "application/vnd.oracle.adf.resourceitem+json;charset=utf-8",
        "ora-irc-language": "en",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin"                         

      },

      type: 'GET',                                                      
      dataType: "json",                                                    
      //data: data,
      //data: JSON.stringify(data),
      async: false,
      success: function (result) {

        msg("SUCCES");
        json  = result.items[0].requisitionList; 

        var stop = json.length;
        if(stop < 1){
          seguir = false;
        }

        //ToKen = result.;                                                
        //msg(json.length);
        for (var i = 0; i < json.length; i++) {
          var job = {};

          job.title = json[i].Title;
          //job.location = json[i].PrimaryLocation + ", " + json[i].PrimaryLocationCountry;

          var job_id = json[i].Id;
          job.url   = "https://hcmn.fa.ap1.oraclecloud.com/hcmUI/CandidateExperience/en/sites/CX_1001/job/" + job_id;

          var posted = json[i].PostedDate.split("T").shift();
          posted = posted.split("-");
          job.dateposted_raw = posted[1] +'/'+ posted[2] +'/'+ posted[0];

          job.temp  = 102020;

          jobs.push(job);
        }
        cont +=24;
      },
      error: function (error) {
        msg(error);
      }
    });
  } while (seguir == true);                                          

  out["jobs"] = jobs;
  return out;
})();



//Normal


//Extract
(function() {
  var out = {};
  var html_jobs = document.querySelectorAll('div.search-results-container.loaded > ul > li[class="joblist-grid-item"]');
  var jobs = [];for(var x in html_jobs){
    
    if(typeof html_jobs[x] =="function") continue;
    if(typeof html_jobs[x] =="number") continue;
    var job = {};
    var elem = html_jobs[x];
    
    job.title = elem.querySelector("div.item-header > div > h3").textContent.trim();
    job.title = job.title.replace("- Full time","").replace("- Part time","").trim();
    
    var job_id = elem.getAttribute("data-keep-in-view-id").trim();
    job.url = "https://egny.fa.ap1.oraclecloud.com/hcmUI/CandidateExperience/en/sites/CX/job/" + job_id + "/?utm_medium=jobshare";
    
    job.location = elem.querySelector("span.job-location").textContent.trim();
    //job.dateposted_raw = elem.querySelector("").textContent.trim();
    //job.logo = elem.querySelector("").getAttribute("src").trim();
    //job.source_apply_email = elem.querySelector("").textContent.trim();
    //job.source_empname = elem.querySelector("").textContent.trim();
    //job.source_jobtype = elem.querySelector("").textContent.trim();
    //job.source_salary = elem.querySelector("").textContent.trim();
    
    job.temp = 1;
    
    jobs.push(job);
  } 

  out["jobs"]= jobs;
  return out;
})();



//Infiniti pagination

(function(){
  var out = {};

  //msg(pass_it);
  if(!pass_it["heights"])	out["pass_it"] = {"heights":[]};
  else 					out["pass_it"] = pass_it;

  out["has_next_page"] = true;
  if(out["pass_it"]["heights"].length > 3){
    var last_three_heights = out["pass_it"]["heights"].slice(out["pass_it"]["heights"].length - 3); 
    if(last_three_heights[0] == last_three_heights[1] && last_three_heights[1] == last_three_heights[2])
      out["has_next_page"] = false;
  }

  window.scrollBy(0, document.body.scrollHeight);

  out.wait = 10000;
  //out["pic"] 	= true;
  //out["html"] 	= true;
  out["pass_it"]["heights"].push(document.body.scrollHeight);
  return out;
})();


//Jobdata

(function() {
  var out = {};
  var job = {};
  var selector = 'div[data-bind="html: job().description"]';
  var remove_selectors = [];
  //var job = pass_it["job"];
  var full_html = document.querySelector(selector);
  // remove something from the jobdatata
  if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {if(full_html.querySelector(remove_selector)) full_html.querySelector(remove_selector).remove();});
  if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
  if (typeof msg == "undefined") msg = console.log;

  for(const a of document.querySelectorAll('span')) {
    if (a.textContent.includes('time')) {
      job.source_jobtype = a.textContent.trim();
    }
  }

  
  if (document.querySelector('div.job-details-list > div > ul.job-info-values > li')){
    job.location = document.querySelector('div.job-details-list > div > ul.job-info-values > li').textContent.trim();
    job.location = job.location.replace(/\(.*?\)/g, '').replace(/\[.*?\]/g, '').replace(/\<.*?\>/g, '').replace(/[0-9]/g,'').trim();
    job.location = job.location.replace("Level","").replace("LS","").replace("DL","").replace(" A ","").trim();
    job.location = job.location.replace(" , ","").trim();
  }else{
    job.location = 'Sydney, NSW, AU';
  }

  job.html      = full_html.innerHTML.trim();   

  //job.html = removeTextBefore(job.html, 'Summary of Job Duties', false);
  //job.html = removeTextAfter(job.html, 'Application Instructions', true);

  if(job.html.indexOf('@')>-1){
    var eliminar = job.html.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi).join('\n');
    job.html = job.html.replace(eliminar,'');
  }

  if (job.html.indexOf('https') > -1) { job.html = job.html.replace(/(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,""); }
  if (job.html.indexOf('http') > -1)  { job.html = job.html.replace(/(http?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,"");  } 
  if (job.html.indexOf('HTTPS') > -1) { job.html = job.html.replace(/(HTTPS?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,""); }
  if (job.html.indexOf('HTTP') > -1)  { job.html = job.html.replace(/(HTTP?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,"");  }


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