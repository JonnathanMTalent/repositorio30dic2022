//homesite: https://livspace.skillate.com/jobs?page=2&pageSize=10&department=&location=&title=&sortBy=&orderBy=ASC
//jobsite:https://livspace.skillate.com/_next/data/q45fuvLd2aUCK-TRTn0Ak/jobs.json?page=1&pageSize=10&department=&location=&title=&sortBy=&orderBy=ASC
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
      var jobs = json.pageProps.jobsData.rows; /*la ruta de los jobs.  Ej.:  var jobs = json.jobList;*/
    
    var returnedJobs = [];  
    for(i in jobs) {
          var job = {};/*init*/
        
      var dom = "https://livspace.skillate.com/jobs/"; // Domino del url
      
      
        job.title    = jobs[i].title;
        job.location =  jobs[i].location;
        job.url      = dom + jobs[i].id;
              //     ██████████████████████████████fecha en milissengundos██████████████████████████████████████  /*  
      const formatDate = (value) => {
        let date = new Date(value);
        const withCero = n => n < 10 ? `0${n}` : n;
        return `${withCero(date.getMonth()+1)}/${withCero(date.getDate())}/${date.getFullYear()}`;
      }
          var date1=jobs[i].updated_on;
          var d = new Date(date1);
          job.dateposted_raw=formatDate(d);
          
    //*/// ████████████████████████████████████████████████████████████████████
        job.source_jobtype = jobs[i].job_type;
        
        job.reqid = jobs[i].id;
        
          var full_html = jobs[i].description_external;
          var div       = document.createElement("div");
          div.innerHTML = full_html
          var desc = div;
  
            
           for (const a of desc.querySelectorAll('a, button, script')) { // Borra todos los que encuentre
              if (a){ 
                a.remove(); 
              } 
            }
  
            job.html = desc.innerHTML.trim(); 
          
            //job.html = removeTextBefore(job.html, "", false);
            //job.html = removeTextBefore(job.html, "", false);
        
           //job.html = job.html.split("").shift();
           //job.html = job.html.split("").shift();
  
  
            //job.html = job.html.replace("","").trim();
  
            job.html      = cleanHTML(job.html);
            var tmp       = document.createElement('div');
            tmp.innerHTML = job.html;
            job.jobdesc   = tmp.textContent.trim();
            job.jobdesc   = cleanHTML(job.jobdesc);
  
  
  
  
        
        
      
        //job.location = jobs[i].locationSelector;
  
  
        job.temp = "Jan-2020";
        
        returnedJobs.push(job);
      }
      
      out["pass_it"]["jobs"] = returnedJobs.length;
    out["jobs"]= returnedJobs;
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