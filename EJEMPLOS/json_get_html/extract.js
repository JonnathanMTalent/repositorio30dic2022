(function () {
    var jobs = [];
    var jobs2 = [];
    var out = {};
    var totalCount;
    var totalPages;
    var json;
   
    if (!pass_it["cont"]) {
      out["pass_it"] = {
        "cont": 0,
        "jobs": 0,
        //"jobs2": 0,// Cuando existe multi-location
        "totalCount":totalCount,
        "totalPages":totalPages
      };
    } else {
      out["pass_it"] = pass_it;
    }
  
      var data = "pg=" + out["pass_it"].cont; // + "";
  
          $.ajax({
              url: 'https://www.prnhealthservices.com/jobs',                                
              headers: { 
           
  
      "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
      "accept-language": "en-US,en-GB;q=0.9,en;q=0.8,es-ES;q=0.7,es;q=0.6",
      "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"101\", \"Google Chrome\";v=\"101\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"Windows\"",
      "sec-fetch-dest": "document",
      "sec-fetch-mode": "navigate",
      "sec-fetch-site": "same-origin",
      "sec-fetch-user": "?1",
      "upgrade-insecure-requests": "1"
  
                       
              },
              type: 'GET',                                     
              data: data,
              async: false,
              success: function (result) {
              json  = result;              
              totalPages = 0;
                  
                  
                  msg("SUCCES");
                
                        msg(window.location.href);
                      // Convertir un string JS a un objeto iterable
                      var js_string 	     = json;
                      var htmlObject       = document.createElement("div");
                      htmlObject.innerHTML = js_string
                      var html_jobs = htmlObject.querySelectorAll('li.clearfix.job'); 
                      var total= htmlObject.querySelector('span[class="total-pages"]')
                      totalPages = parseInt(total.textContent.trim());
                      msg("totalPages en extract ----->" + totalPages);
                
                      for(var x in html_jobs){
                        
                        if(typeof html_jobs[x] =="function") continue;
                          if(typeof html_jobs[x] =="number") continue;
  
                              var job  = {};
                              var elem = html_jobs[x];
                              var title_p1    = elem.querySelector("div.occupation");//.textContent.trim();
                              var title_p2 = elem.querySelector("div.specialty"); //.textContent.trim();
                              var title = "";
                              var array_title = Array();
                        
                              if(title_p1 !== null) array_title.push(title_p1.innerText);
                              if(title_p2 !== null) array_title.push(title_p2.innerText);
                              if(array_title.length) title = array_title.join(" ");
                              
                      job.title = title;
                      job.source_location=elem.querySelector("a").textContent.trim();
                      job.location = job.source_location;
                      job.url      = elem.querySelector("a").href.trim();
                      job.reqid = job.url.split("/")[9];
                      job.source_salary = elem.querySelector("div.specialty.p15").textContent.trim().replace("N/A","");
                      job.temp = "DEC-2021";
                      jobs.push(job);
        }
        out["pass_it"].cont++;
      },
      error: function (error) {
        msg(error);
      }
    }); 
      out["jobs"] = jobs;
      out["pass_it"]["jobs"] += jobs.length;
      out["pass_it"]["totalCount"] = totalCount;
      out["pass_it"]["totalPages"] = totalPages;
    return out;
  })();