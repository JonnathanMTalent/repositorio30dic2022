

SE ARMA LA URL DEL API ASI:
https://careers.smartrecruiters.com/WesternDigital     URL ORIGINAL
https://api.smartrecruiters.com/v1/companies/WesternDigital/postings/?limit=100&offset=1


// EXTRACT

(function() {
    var out = {};
     
     if(typeof pass_it == "undefined") pass_it = {};
       if (!pass_it["cont"]) {
         out["pass_it"] = {
           "cont": 1,
           "jobs": 0
         };
       } else {
         out["pass_it"] = pass_it;
       }
     
       var element = document.querySelector("pre").textContent;
       var json = JSON.parse(element);
       var jobs = json.content; 
     
     var returnedJobs = [];  
     for(i in jobs) {
           var job = {};/*init*/
       
         var company = window.location.pathname.split("companies/").pop().split("/postings").shift().trim();
         var dom     = "https://jobs.smartrecruiters.com/" + company +"/"; // Domino del url
      
         job.title    = jobs[i].name;
         job.url      = dom + jobs[i].id + "?utm_source=talent";
       
         //job.title = job.title.split("£").shift().trim();
         job.reqid = jobs[i].refNumber.trim();    
       
        //Location array "city, state, country"
          /*--------------------------------------------------*/
             var city    = jobs[i].location.city;
             var state   = jobs[i].location.region;
             var country = jobs[i].location.country.toUpperCase().trim();
             
             var loc = "";
             var array_loc = Array();
   
             if(city) array_loc.push(city);
             if(state) array_loc.push(state);
             if(country) array_loc.push(country);
             
             if(array_loc.length) loc = array_loc.join(", ");
   
           job.location = loc.replace(/[0-9]/g,'').trim();
           job.source_location = loc;
       /*	if(jobs[i].location.address){
               job.street_location = loc +", "+ jobs[i].location.address
           }     
           */
   
         /*----------DATE-POSTED-------------------------------------*/
                //2020-03-21
               let datum = jobs[i].releasedDate.split("T")[0];
                   datum = datum.trim();
                  let cut = "-";
             
               
               let day   =  datum.split(cut)[2];
               let month =  datum.split(cut)[1];
               let year  =  datum.split(cut)[0];
             
              job.dateposted_raw  = month +"/"+  day +"/"+ year;
   
         
       /* .-------------JOB TYPE----------------------*/
       job.source_jobtype = jobs[i].typeOfEmployment.label;
    
         job.temp = 2322;
         
         returnedJobs.push(job);
       }
       
       out["pass_it"]["jobs"] = returnedJobs.length;
     out["jobs"]= returnedJobs;
       return out;
   })();
   
   
// BEFORE PAGINATION

(function() {
	var out = {};
  	out.waitFor = "#jPaginationHldr"
    return out;
})();



// PAGINATION

(function() {
    var out = {};
  
    if(typeof msg == "undefined") msg = function(x){return x;};
    
  
   out["pass_it"] = pass_it;
    
    
        if (out["pass_it"]["jobs"] < 100) {
        //last page
      out["has_next_page"] = false;
    } else if (out["pass_it"]["jobs"] > 0) {
       out["pass_it"].cont += 100;
      
      let company              = window.location.pathname.split("companies/").pop().split("/postings").shift().trim();
      var beforePageVariable   = "https://api.smartrecruiters.com/v1/companies/" + company + "/postings/?limit=100&offset=";
      //var afterPageVariable    = "&_=1584887075565"; 
      
      var url = beforePageVariable + out["pass_it"].cont; // + afterPageVariable;

      window.location.href = url;
      msg(url);
      out["has_next_page"] = true;
    }
    else {
      out["has_next_page"] = false;
    }
  
    out["wait"] = true;
    return out;
    })(); 



    // JOBDESCRIPTION


    (function() {
        var out = {};
        var job = {};
        var selector = 'div[itemprop="description"]';
        var remove_selectors = ['a', 'input', 'div.alert', 'img', 'button',
            'script', 'style'
        ];
        // TO Remove selectors 
        let links = document.querySelectorAll('a,script,input,button,style,form');
        links.forEach(elemento => elemento.remove());
    
        for (const a of document.querySelectorAll('p, span, li')) {
            if (a.textContent.search(/@|www.|http/gi) > -1) {
                a.remove();
            }
        }
    
    
        //var job = pass_it["job"];  
    
        var full_html = document.querySelector(selector);
    
        if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {
            if (full_html.querySelector(remove_selector)) full_html.querySelector(remove_selector).remove();
        });
        if (typeof cleanHTML == "undefined") cleanHTML = function(x) {
            return x
        };
        if (typeof msg == "undefined") msg = console.log;
    
        for (const a of full_html.querySelectorAll('li')) {
            if (a.textContent.search(/experience/gi) > -1 && a.textContent.search(/year/gi) > -1 && a.textContent.search(/[0-9]/g) > -1) {
                job.experience_required = a.textContent.trim();
            }
        }
    
        var full_html_text = full_html.textContent;
    
        job.html = full_html.innerHTML.replace(/&nbsp;/g, ' ').trim();
    
        job.html = removeTextBefore(job.html, "Job Description", false);
        //job.html = removeTextBefore(job.html, "", false);
    
        job.html = job.html.split("If you need a reasonable")[0];
    
    
    
        
        //job.html = removeTextAfter(job.html, "Additional Information", true);
    
        job.html = cleanHTML(job.html);
        var tmp = document.createElement('div');
        tmp.innerHTML = job.html;
        job.jobdesc = tmp.textContent.trim();
        job.jobdesc = cleanHTML(job.jobdesc);
        if (job.jobdesc.search(/Compensation & Benefits Details/) > -1) {
            job.source_benefit = job.jobdesc;
            job.source_benefit = removeTextBefore(job.source_benefit, `Compensation & Benefits Details`, true);
            job.source_benefit = removeTextAfter(job.source_benefit, 'Additional Information', true);
        }
        //msg(job.source_benefit)
        job.html = cleanFromPointaToB_false(job.html,'Please contact us at','Compensation & Benefits Details'); 
        job.jobdesc = cleanFromPointaToB_false(job.jobdesc,'Please contact us at','Compensation & Benefits Details');
        // job.html = removeTextAfter(job.html, " Please contact us at", true);
        // job.jobdesc = removeTextAfter(job.jobdesc, " Please contact us at", true);
        out["job"] = job;
        return out;
    
    })();
    
    function removeTextBefore(html, text, flag) {
        var newHtml = html;
        if (newHtml.indexOf(text) > -1) {
            newHtml = newHtml.split(text).pop();
            if (!flag) {
                newHtml = text + " " + newHtml;
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
    
    
    function cleanFromPointaToB_false(text, a, b) {
        var a = text.indexOf(a),
            b = text.indexOf(b);
        if (a > -1 && b > -1) {
            let a_b = text.slice(a, b);
            text = text.replace(a_b, "").trim();
        }
        return text;
    }
    
    