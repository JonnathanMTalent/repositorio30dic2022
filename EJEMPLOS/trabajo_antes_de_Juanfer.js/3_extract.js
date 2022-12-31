(function() {
    var returnedJobs = [];
    //var limite = document.querySelector('p[data-automation-id*="jobFoundText"]').textContent.trim().split("JOBS")[0].trim();
    //msg(limite);
    var out = {};
    if (typeof pass_it == "undefined") pass_it = {};
    if (!pass_it["cont"]) {
      out["pass_it"] = {
        "cont": 0,
        "jobs": 0,      
        "expected_jobs": 0
      };
    } else {
      out["pass_it"] = pass_it;
    }    			 
    var data = {"limit":20,"offset":out["pass_it"].cont,"appliedFacets":{},"searchText":""};	
    $.ajax({
      url : 'https://hyperiongrp.wd3.myworkdayjobs.com/wday/cxs/hyperiongrp/hyperion_external/jobs', 
      "headers": {
        "accept": "application/json",
        "accept-language": "en-US",
        "content-type": "application/json",
        "sec-ch-ua": "\"Google Chrome\";v=\"95\", \"Chromium\";v=\"95\", \";Not A Brand\";v=\"99\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin"
      },
      type : 'POST',
      data : JSON.stringify(data),
      dataType: "json",
      async : false,
      success : function(json){
        if(out["pass_it"].cont==0){
          //extract total jobs in first pagination
          var expected_jobs_str = json.total;
          out["pass_it"].expected_jobs = expected_jobs_str;
        }
  
        var jobs = json.jobPostings;      
        for (i in jobs) {
          var job = {}; /*init*/
          
          // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
          
          job.title = jobs[i].title;
          job.reqid = jobs[i].bulletFields[0];        
          //!!IMPORTANTEEEE:  Se debe cambiar la URL base del job para viajar a la descripcion.
          //!!IMPORTANTEEEE:  Se debe cambiar la URL base del enpoint que carga el JSON de la descripcion:
          job.url = "https://hyperiongrp.wd3.myworkdayjobs.com/en-US/hyperion_external"+ jobs[i].externalPath;
          //msg("ruta: "); msg(jobs[i].externalPath);        //posible valor del  complemento: /job/New-York---200-Madison-Avenue/Account-Supervisor_JR0034759-1	
          let endpoint = "https://hyperiongrp.wd3.myworkdayjobs.com/wday/cxs/hyperiongrp/hyperion_external"+ jobs[i].externalPath;        
          // enpoint is to make the peticion to return the json description.
          job.location = jobs[i].locationsText;
          
          
          
          //jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
             
             
              var json1 = getDescription2(job.url);  
              msg(json1);
              //var json1 = JSON.parse(getDescription2(job.url));  
              
               // job.html1 = JSON.parse(json1.jobPostingInfo.startDate)
              var datepost = JSON.parse(json1.jobPostingInfo.startDate)
              //msg("VARIABLE DATEPOST: "+ datepost)
              datepost= datepost.split("T").shift().split("-");
              job.dateposted_raw=datepost[1]+"/"+datepost[2]+"/"+datepost[0];
              
          
          // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
  
          //job.source_location = job.location;
          //-----------DESCRIPTION---------          
          var descripcion = getDescription(endpoint);
          let description_json =JSON.parse(descripcion);
          let locations_mult = [];
          if(description_json.jobPostingInfo.location){
            locations_mult.push(description_json.jobPostingInfo.location);            
            if(description_json.jobPostingInfo.additionalLocations){        
              let array_location_add = description_json.jobPostingInfo.additionalLocations;        
              locations_mult = locations_mult.concat(array_location_add);
            }
          }else {        
            // job without LOCATION
            job.location = "London, GB";
          }    
      // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
          //let date = description_json.jobPostingInfo.postedOn.replace("Posted","").trim();
          //date =dateAgo(date.replace(/\s+/gi, ' ').trim(), " ",0, 1);
          //job.dateposted_raw =date;
          
  
          
          
          
          
          
       // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
  
          job.source_jobtype = description_json.jobPostingInfo.timeType;
          job.html = description_json.jobPostingInfo.jobDescription //.description; 
          job.html = cleanHTML(job.html);
          var tmp = document.createElement("DIV");
          
      // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
  /*
          var full_html1 =description_json.jobPostingInfo.jobDescription 
          msg(" ESTE ES EL HTML DEL GETDESCRIPTION:  "+full_html1)
          var div1 = document.createElement("div");
          div1.innerHTML = full_html1;
  
          //sacar las variables
         // job.dateposted_raw=div.querySelectorAll('span.job-info')[0].textContent.trim();
          
          
          if(div1.querySelector('script[type="application/ld+json"]')){
          // Extract text on the script
          var html1=div1.querySelector('script[type="application/ld+json"]').textContent.trim().replace(/\s+/g,' ').replace(/\@/gi,"");
          //convert text to json
          var json=JSON.parse(html1);
          //ORIGINAL:  var date=json.graph[1].datePublished.split("T").shift().split("-");
          var date1=json.datePosted.split("T").shift().split("-");
          job.dateposted_raw=date1[1]+"/"+date1[2]+"/"+date1[0];
  
          }
          
          */
   // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
  
          
          
          tmp.innerHTML = job.html;          
          job.jobdesc = tmp.textContent.trim();
          //job.dateclosed_raw = dateclosed_returned(tmp);  //sent element with html description - enviar elemento con el html de la descripcion.        
          if (job.html.toLowerCase().indexOf("part time") > -1) { job.source_jobtype = "Part time"; }
          if (job.html.toLowerCase().indexOf("part-time") > -1) { job.source_jobtype = "Part time"; }
          if (job.html.toLowerCase().indexOf("full time") > -1) { job.source_jobtype = "Full time"; }
          if (job.html.toLowerCase().indexOf("full-time") > -1) { job.source_jobtype = "Full time"; }
  
          job.html = removeTextBefore(job.html, "Key responsibilities:", false);            
          job.html = removeTextAfter(job.html, "George Weston Limited recognizes", true);
          job.html      = cleanHTML(job.html);
          var tmp       = document.createElement('div');
          tmp.innerHTML = job.html;
          job.jobdesc   = tmp.textContent.trim();
          job.jobdesc   = cleanHTML(job.jobdesc);                  
          //------------------------------------------------//	
  
          job.temp = "12334-443-post";                
          locations_mult.map(location =>{
            var jobx = {...job};          
            jobx.location = location+", England";
            jobx.source_location = location; //- 21 Rue Glesener
            jobx.location = jobx.location.replace("remote","").trim();
            jobx.location = jobx.location.replace("Home - UK- England","london").trim();
            jobx.location = jobx.location.replace("Redhill - Betchworth House","redhill").trim();
            jobx.location = jobx.location.replace("- 21 Rue Glesener","").trim();
            returnedJobs.push(jobx);
          }) 
  
        }
      },
      error: function(error){
        msg(error);
      }
    });
    out['pass_it'].jobs = returnedJobs.length;
    out["jobs"]= returnedJobs;
    return out;
  })();
    function getDescription2(url) {
      var xhrrequest = new XMLHttpRequest();
      xhrrequest.open("GET", url, false); //URL del ajax que trae la información del job
      xhrrequest.setRequestHeader("Accept", "application/json,application/xml");
      xhrrequest.setRequestHeader("Accept-Language", "en-CA,en;q=0.8,en-GB;q=0.6,en-US;q=0.4,es;q=0.2");
      xhrrequest.setRequestHeader("Cache-Control", "no-cache");
      xhrrequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhrrequest.setRequestHeader("Pragma", "no-cache");
      var response = "";
      xhrrequest.onreadystatechange = function() {
        if (xhrrequest.readyState == 4 && xhrrequest.status == 200) {
          response = xhrrequest.responseText;
        }
      };
      xhrrequest.send();
      return response;
    }
  
  function getDescription(url) {
    var xhrrequest = new XMLHttpRequest();
    xhrrequest.open("GET", url, false); //URL del ajax que trae la información del job  
    xhrrequest.setRequestHeader("accept", "application/json");
    xhrrequest.setRequestHeader("accept-language", "en-US");
    xhrrequest.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhrrequest.setRequestHeader("sec-ch-ua", "\"Chromium\";v=\"94\", \" Not A;Brand\";v=\"99\", \"Opera GX\";v=\"80\"");
    xhrrequest.setRequestHeader("sec-ch-ua-mobile", "?0");
    xhrrequest.setRequestHeader("sec-ch-ua-platform", "\"Windows\"");
    xhrrequest.setRequestHeader("sec-fetch-dest", "empty");
    xhrrequest.setRequestHeader("sec-fetch-mode", "cors");
    xhrrequest.setRequestHeader("sec-fetch-site", "same-origin");
  
    var response = "";
    xhrrequest.onreadystatechange = function() {
      if (xhrrequest.readyState == 4 && xhrrequest.status == 200) {
        response = xhrrequest.responseText;
      }
    };
    xhrrequest.send();
    return response;
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
  
  /*
  function dateAgo (text, char_separator, position_value_DWMY, position_word_DWMY){
    var numberDWMY = parseInt(text.trim().split(char_separator)[position_value_DWMY],10); //obtengo el valor numerico del dia, sem, mes o año
    if(typeof text.split(char_separator)[position_word_DWMY]!=='undefined'){
      var dayWeekMonthYear = text.split(char_separator)[position_word_DWMY]
      }else{ var dayWeekMonthYear = text.split(char_separator)[text.split(char_separator).length - 1]};
    var date_Now = new Date();  //declaro un objeto tipo fecha
    var nDays = 0;
    if (dayWeekMonthYear.toUpperCase().search(/TODAY|NOW|HOUR/g)>-1){nDays = 0;}
    if (dayWeekMonthYear.toUpperCase().indexOf('YESTERDAY')>-1) {nDays = 1;}
    if (dayWeekMonthYear.toUpperCase().indexOf('DAYS')>-1){nDays = numberDWMY;}
    if (dayWeekMonthYear.toUpperCase().indexOf('WEEK')>-1){nDays = numberDWMY * 7;}
    if (dayWeekMonthYear.toUpperCase().indexOf('MONTH')>-1){nDays = numberDWMY * 30;}
    if (dayWeekMonthYear.toUpperCase().indexOf('YEAR')>-1){nDays = numberDWMY * 365;}   
    var dateJob    = date_Now.getDate() - nDays;     //resto dias de publicacion a la fecha actual
    var get_date   = date_Now.setDate(dateJob);      //obtengo la cantidad de mseg. desde 1 de Enero de 1970
    var datePosted = new Date(get_date);             //obtengo la fecha de publicacion.
    //Obtengo dia mes y Año
    var dd    = datePosted.getDate();                //devuelve el numero del dia del mes.
    var mm    = datePosted.getMonth()+1;             //getMonth devuelve valores de 0 a 11, se suma uno para llevarlo de 1 a 12.
    var yyyy  = datePosted.getFullYear().toString(); //devuelve el año.
    if (dd < 10){dd ='0'+dd;}
    if (mm < 10){mm ='0'+ mm;}
    dateJob= mm +'/'+dd+'/'+yyyy;
    return dateJob;
  }
  */