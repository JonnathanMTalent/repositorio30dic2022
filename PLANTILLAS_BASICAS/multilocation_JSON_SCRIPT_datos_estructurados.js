(function() {
    var out = {};
    var html_jobs = document.querySelectorAll("body > div > div > div > article > div > ul > li > a");
    var jobs = [];for(var x in html_jobs){
      if(typeof html_jobs[x] =="function") continue;
      if(typeof html_jobs[x] =="number") continue;
      var job = {};
      var elem = html_jobs[x];
      job.title = elem.querySelector("div.jv-job-list-name").textContent.trim();
      job.url = elem.href.trim() + '?__jvst=Job Board&__jvsd=talent';
      job.reqid = job.url.split('/').pop().split('?').shift();
  
      job.source_jobtype = elem.querySelector('div.jv-job-list-location').textContent.replace(/\n|  /g,"").split("  ")[1];
      job.reqid = job.url.split("job/").pop().split("?").shift();
  
      job.temp = 3452685;
          //     ████████████████████████████████████████████████████████████████████  /*  
      $.ajax({
      url: job.url, 
      headers: {
      "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
      "accept-language": "es-ES,es;q=0.9",
      "cache-control": "max-age=0",
      "sec-ch-ua": "\"Google Chrome\";v=\"105\", \"Not)A;Brand\";v=\"8\", \"Chromium\";v=\"105\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"Windows\"",
      "sec-fetch-dest": "document",
      "sec-fetch-mode": "navigate",
      "sec-fetch-site": "none",
      "sec-fetch-user": "?1",
      "upgrade-insecure-requests": "1"
      },
      type: 'GET',
      //poner acá el tipo de peticion JSON, HTML
      dataType: "html",
      async: false,
      success: function(resultD) {
          var jsonDesc = resultD
          //msg(jsonDesc)
      
          var div = document.createElement("div");
          div.innerHTML = jsonDesc;
          // msg(div.innerHTML)
          var desc = div.querySelector('div[class="jv-job-detail-description"]');
  
      
      for (const a of desc.querySelectorAll('a, button, script')) { // Borra todos los que encuentre
          if (a){ 
            a.remove(); 
          } 
        }
      
        job.html = desc.innerHTML.trim(); 
      
      
        //job.html = removeTextBefore(job.html, "", false);
        //job.html = removeTextAfter(job.html, "", false);
      
       //job.html = job.html.split("").shift();
       //job.html = job.html.split("").shift();
      
        //job.html = job.html.replace("","").trim();
      
        job.html      = cleanHTML(job.html);
        var tmp       = document.createElement('div');
        tmp.innerHTML = job.html;
        job.jobdesc   = tmp.textContent.trim();
        job.jobdesc   = cleanHTML(job.jobdesc);
        
        
        
        // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj multilocation  datos estructurados
              if(div.querySelector('script[type="application/ld+json"]')){
                  var html=div.querySelector('script[type="application/ld+json"]').textContent.trim().replace(/\s+/g,' ').replace(/\@/gi,"");
                  var json=JSON.parse(html);
                 //var date=json.graph[1].datePublished.split("T").shift().split("-");
               //  var date=json.datePosted.split("T").shift().split("-");
               //   job.dateposted_raw=date[1]+"/"+date[2]+"/"+date[0];
                
                    var locat=json.jobLocation;
                }
              
              
              var loc; var lo;
              lo=locat[0].address.addressLocality+', '+locat[0].address.addressRegion+', '+locat[0].address.addressCountry;
              if(locat.length>1){
               for(var i=1; i<locat.length ;i++){
                  loc= locat[i].address.addressLocality+', '+locat[i].address.addressRegion+', '+locat[i].address.addressCountry; 
                  lo+=' - '+loc;
              
                 }
              }
              
              if(lo.includes('-')){
                  var locations = lo.split('-');
                  for(var z=0;z<locations.length;z++){
                  var jobx = {...job};
                  jobx.location = locations[z].trim();
                  jobs.push(jobx);
                  }
                  }else{
                  job.location=lo;    
                  jobs.push(job);
                  }
      
  //*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
   //     ████████████████████████████████████████████████████████████████████  /*
      },
      error: function(error) {
          msg(error);
      }
      });
    } 
  
    out["jobs"]= jobs;
    return out;
  })();