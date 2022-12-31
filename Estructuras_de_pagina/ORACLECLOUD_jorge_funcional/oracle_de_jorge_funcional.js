(function () {
    var jobs = [];
    var out = {};
    var cont = 0;
    var json;

  
 // do {

    //var data =  ;

        $.ajax({
            url: 'https://ejjc.fa.us6.oraclecloud.com/hcmRestApi/resources/latest/recruitingCEJobRequisitions?onlyData=true&expand=requisitionList.secondaryLocations,flexFieldsFacet.values&finder=findReqs;siteNumber=CX,facetsList=LOCATIONS%3BWORK_LOCATIONS%3BTITLES%3BCATEGORIES%3BORGANIZATIONS%3BPOSTING_DATES%3BFLEX_FIELDS,limit=25,sortBy=POSTING_DATES_DESC',                                                                             // 1) url
            headers: {                                                      
                "accept": "*/*",
                "Content-Type":"application/vnd.oracle.adf.resourceitem+json;charset=utf-8",              // 2) headers
            },
            type: 'GET',                                        // 3) tipo
            dataType: "json",                                   // 4) data que retorna
            //data: data,
           // data: JSON.stringify(data),
            async: false,
            success: function (result) {
                msg("SUCCES");
                json = result.items[0].requisitionList;                                 // 5) ruta de los trabajos
				//msg(json.length);
                for (var i = 0; i < json.length; i++) {
                    var job = {};

                    var dom = "https://ejjc.fa.us6.oraclecloud.com/hcmUI/CandidateExperience/en/sites/CX/requisitions/preview/";


                    job.title    = json[i].Title;
                    job.url      = dom+json[i].Id;
                    job.location = json[i].PrimaryLocation;
                    

                    //job.source_jobtype = json[i].jobtypeSelector;
                    //job.source_salary = json[i].jobtypeSelector;


    				//job.logo = json[i].logoSelector;
   					//job.source_empname = json[i].empnameSelector;
                    //job.source_apply_email = json[i].emailSelector;
    				
    				
    				//job.dateposted_raw = json[i].datepostedSelector;
              


                    /*  var fecha = json[i].
                        fecha = fecha.split(" ")[0].split("-");
                        job.dateposted_raw =  fecha[1]+'/'+fecha[2]+'/'+fecha[0];*/

                    job.temp = 1;

                    jobs.push(job);
                }
                cont +=24;
            },
            error: function (error) {
                msg(error);
            }
        });
  // } while (json.length > 0);                                 // 6) condicion de parada

    out["jobs"] = jobs;
    return out;
})();




// ESTA JOBDESC NO ESTA PROBADA PERO EL EXTRACT SI

(function() {
    var out = {};
    var job = {};
    var selector = "div.job-details";
    var remove_selectors = ["style"];
    //var job = pass_it["job"];
    var full_html = document.querySelector(selector);
    // remove something from the jobdatata
    if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {if(full_html.querySelector(remove_selector)) full_html.querySelector(remove_selector).remove();});
    if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
    if (typeof msg == "undefined") msg = console.log;
  
    job.html      = full_html.innerHTML.trim();    
    //job.html = removeTextBefore(job.html, 'Summary of Job Duties', false);
    job.html = removeTextAfter(job.html, 'Apply Now', true);
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