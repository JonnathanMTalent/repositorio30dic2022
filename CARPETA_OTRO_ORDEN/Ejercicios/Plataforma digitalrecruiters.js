//Url: https://joinus.decathlon.fr/fr/annonces

//Extract

(function() {
    var jobs = [];
    var out = {};
  
    out["pass_it"] = pass_it;
  
    var counter = 1;
    var limit = 0;
    var json;
    do {
  
    $.ajax({
      url : "https://joinus.decathlon.fr/fr/careers-sites/job-ads-more/12912/0/"+counter+"/0?reset=0&filters=%7B%22_last%22%3Anull%2C%22brands%22%3A%7B%22brand%22%3A%5B%5D%2C%22mark%22%3A%5B%5D%7D%2C%22loc%22%3A0%2C%22service%22%3Anull%2C%22contract%22%3Anull%2C%22workingTime%22%3Anull%2C%22bbox%22%3Anull%7D",
             
      headers: {
  
        "accept": "application/json, text/plain, */*",
        "Content-Type": "application/json"
        
      },
      type : 'GET',
      //data : JSON.stringify(data),
      dataType: "json",
      async : false,
      success : function(result){
        json = result.jobAds;
        out["pass_it"]["total"] = result;
  
        //  out["pass_it"]["long"] = result..length;
        // msg(result.totalCount);
        //msg(out["pass_it"].total);
        //limit = result.pages +1;
        for(var i = 0; i<json.length; i++) {
          var job = {};
  
          job.title = json[i].title;
          var ID = json[i].id;
          //var loc = result.joined.addressByJobAd[ID];
          //job.location = result.joined.address[loc]["formatted"].replace(/\d/g,"").trim()+', FR';
          var loc = json[i].address_id;
          job.location = result.joined.address[loc]["formatted"].replace(/\d/g,"").trim()+', FR'; 
  
          var type= json[i].contract_type_id;
          job.source_jobtype = result.joined.contract_type[type];
          job.url = result.joined.apply_url[ID]; 
          for( var j in result.joined.apply_url[ID]){
            job.url =  result.joined.apply_url[ID][j];
          }
          
          //job.url = out["pass_it"]["url"].split('/JobBoardView/')[0]+'/OpportunityDetail?opportunityId='+json[i].Id;
          //job.location = json[i].Locations[0].Address.City +', '+ json[i].Locations[0].Address.State.Name + ", " + json[i].Locations[0].Address.Country.Code;
          //job.logo = elem.querySelector("").getAttribute("src").trim();
          //job.source_apply_email = elem.querySelector("").textContent.trim();
          //var fecha = json[i].PostedDate.split('T')[0];
          //job.dateposted_raw = fecha.split('-')[1]+'/'+fecha.split('-')[2]+'/'+fecha.split('-')[0];
          //job.source_empname = "Securitas";
          //job.source_jobtype = elem.querySelector("").textContent.trim();
          //job.source_salary = elem.querySelector("").textContent.trim();
  
          job.temp = 2020;
          jobs.push(job);
        }
        counter = counter += 20;
      },
      error: function(error){
        msg(error);
      }
    });
    } while (json.length >= 20);
  
    out["jobs"]= jobs;
    return out;
  })();


//Jobdata

(function() {
    var out = {};
    var job = {};
    var selector = "#home > div";
    var remove_selectors = [];
    //var job = pass_it["job"];
    var full_html = document.querySelector(selector);
    // remove something from the jobdatata
    if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {if(full_html.querySelector(remove_selector)) full_html.querySelector(remove_selector).remove();});
    if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
    if (typeof msg == "undefined") msg = console.log;
  
    var fecha = document.querySelector("div.job-ad-republished-at > span").textContent.split("Offre publiée le ").pop();
      fecha = fecha.split("/");
        job.dateposted_raw = fecha[1] +'/'+ fecha[0] +'/'+ fecha[2];
        //msg(job.dateposted_raw);
    
    job.html      = full_html.innerHTML.trim();    
    
    //job.html = removeTextBefore(job.html, 'Summary of Job Duties', false);
    job.html = removeTextAfter(job.html, 'Offre publiée le', true);
    job.jobdesc = removeTextAfter(job.html, 'Offre publiée le', true);
    
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