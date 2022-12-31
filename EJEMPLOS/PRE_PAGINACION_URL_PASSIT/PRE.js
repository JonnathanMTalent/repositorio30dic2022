// JOBSITE: https://compassion.wd5.myworkdayjobs.com/CompassionCareers/fs/searchPagination/318c8bb6f553100021d223d9780d30be/0?

//HOMEPAGE: https://www.compassion.com

// BEFORE EXTRACT
(function() {
    var out = {};
    out.waitFor = "pre";
    out.pic = true;
    return out;
  })();

// jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
// jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj

//EXTRACT

(function() {
    var out = {};
  
    if(typeof pass_it == "undefined") pass_it = {};
    if (!pass_it["cont"]) {
      out["pass_it"] = {
        "cont": 50,
        "jobs": 0
      };
    } else {
      out["pass_it"] = pass_it;
    }
  
    var returnedJobs = [];    
  
    var element = document.querySelector("pre").textContent;
  
    var json = JSON.parse(element);
    var jobs = json.body.children[0].children[0].listItems;
  
  
    for(i in jobs) {
      var job = {};
  
      job.title = jobs[i].title.instances[0].text;
  
      var url_part = jobs[i].title.commandLink.split("job/").pop();
      var url_extra = `https://compassion.wd5.myworkdayjobs.com/wday/cxs/compassion/CompassionCareers/job/${url_part}`;
      job.url = window.location.origin + jobs[i].title.commandLink;
      if (typeof jobs[i].subtitles[1]!='undefined'){
        job.source_location = jobs[i].subtitles[1].instances[0].text;
        job.location = jobs[i].subtitles[1].instances[0].text;
      }	
      else{
        job.location = 'Colorado Springs, CO';
        job.source_location = '';
      }
  
      job.reqid = job.url.split("_").pop().trim();
  
      if(typeof jobs[i].subtitles[2]!='undefined'){
        job.dateposted_raw = dateAgo(jobs[i].subtitles[2].instances[0].text.replace("+", ""), " ", 1, 2);
      }else{
        job.dateposted_raw = dateAgo(jobs[i].subtitles[1].instances[0].text.replace("+", ""), " ", 1, 2);
      }
  
      job.temp = '2022-22-04';
  
      var concat = job.url.split("job/").pop().trim();
      var json_desc = JSON.parse(getDescription(`https://compassion.wd5.myworkdayjobs.com/wday/cxs/compassion/CompassionCareers/job/${concat}`));//se concatena la url del json que contiene la info del job
      job.source_jobtype = json_desc.jobPostingInfo.timeType;
  
      //Multilocation
      if (job.location.indexOf("Location") > -1) {     
  
  
  
        var array = json_desc.jobPostingInfo.additionalLocations;
        array.push(json_desc.jobPostingInfo.location)
  
        for(var i in array){
          if(array[i] != 'LOCATION'){
            var jobx = {};
            jobx ={...job};
  
            jobx.location = array[i];
            jobx.source_location = jobx.location;
            jobx.source_jobtype = json_desc.jobPostingInfo.timeType;
  
            if(jobx.location.search(/Remote/ig)>-1){jobx.location = 'Colorado Springs, CO';}
  
            returnedJobs.push(jobx);
          }
        }
      }
      else{
  
        if(job.location.search(/Remote/ig)>-1){job.location = 'Colorado Springs, CO';}
        returnedJobs.push(job);
      }
  
    }
  
    out["pass_it"]["jobs"] = jobs.length;
    out["jobs"]= returnedJobs;
    return out;
  })();
  
  
  
  function getDescription(url) {
    var xhrrequest = new XMLHttpRequest();
    xhrrequest.open("GET", url, false); 
    xhrrequest.setRequestHeader("Accept","application/json,application/xml");
    xhrrequest.setRequestHeader("Accept-Language","en-CA,en;q=0.8,en-GB;q=0.6,en-US;q=0.4,es;q=0.2");
    xhrrequest.setRequestHeader("Cache-Control","no-cache");
    xhrrequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    xhrrequest.setRequestHeader("Pragma","no-cache");
    var response = "";
    xhrrequest.onreadystatechange = function() {
      if(xhrrequest.readyState == 4 && xhrrequest.status == 200) 
      {
        response = xhrrequest.responseText;
      }
    };
  
  
    xhrrequest.send(); 
    return response;
  }
  
  function dateAgo (text, char_separator, position_value_DWMY, position_word_DWMY){
    var numberDWMY = parseInt(text.trim().split(char_separator)[position_value_DWMY],10); //obtengo el valor numerico del dia, sem, mes o año
    if(typeof text.split(char_separator)[position_word_DWMY]!=='undefined'){
      var dayWeekMonthYear = text.split(char_separator)[position_word_DWMY]
      }else{ var dayWeekMonthYear = text.split(char_separator)[text.split(char_separator).length - 1]};
    var date_Now = new Date();  //declaro un objeto tipo fecha
    var nDays = 0;
    if (dayWeekMonthYear.toUpperCase().search(/TODAY|HOUR/g)>-1){nDays = 0;}
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
    if (mm<10){mm ='0'+ mm;}
    dateJob= mm +'/'+dd+'/'+yyyy;
    return dateJob;
  }

  // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
// jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj

//PAGINATION

(function() {
    var out = {};
    
    if(typeof pass_it == "undefined") pass_it = {};
  if(typeof msg == "undefined") msg = function(x){return x;};

    if (!pass_it["cont"]) {
        out["pass_it"] = {
      "cont": 0,
      "jobs": 0
    };
  } else {
    out["pass_it"] = pass_it;
  }

    if (out["pass_it"]["jobs"] >= 50) {
      
  
      //hay que cambiar la variable dom por la que tengo en el extrac
      var dom                = "https://compassion.wd5.myworkdayjobs.com/CompassionCareers"; 
      var paginationConstant = "/fs/searchPagination/318c8bb6f553100021d223d9780d30be/";
      var clientRequestID    = "6ab4562fb6954654818bc49840aa9a07";
      
    var url = dom + paginationConstant + out["pass_it"].cont + "?clientRequestID=" + clientRequestID; 
        
      
    out["pass_it"].cont += 50;
    window.location.href = url;
    out["has_next_page"] = true;
  } else {
        out["has_next_page"] = false;
  }
    return out;
})();

// JOBDESCRIPTION

(function() {
    var out = {};
    var job = {};
  
    if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
    if (typeof msg == "undefined") msg = console.log;
    // estas dos variables es lo mismo que en el extrac pero en el concat le cambio job.url por window.location
    var concat = window.location.href.split("job/").pop().trim();
    var company_site = window.location.href.split("/job").shift().trim();
    var json_desc = JSON.parse(getDescription(`https://compassion.wd5.myworkdayjobs.com/wday/cxs/compassion/CompassionCareers/job/${concat}`));
  
    var full_html = json_desc.jobPostingInfo.jobDescription;
  
    job.html      = full_html.trim();    
  
    //Other
    job.html = removeTextAfter(job.html, 'Why work here?', true);
  
    job.html = job.html.replace(/[\w|.-]+@[\w|-]+(\.[\w-]+){1,4}|\d{3,}|www\.\S+|(https|http):\/\/\S+|\(\d+\)/gi, "");
    job.html = job.html.replace(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi,"");
  
  
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
  
  function getDescription(url) {
    var xhrrequest = new XMLHttpRequest();
    xhrrequest.open("GET", url, false); //URL del ajax que trae la información del job
    xhrrequest.setRequestHeader("Accept","application/json,application/xml");
    xhrrequest.setRequestHeader("Accept-Language","en-CA,en;q=0.8,en-GB;q=0.6,en-US;q=0.4,es;q=0.2");
    xhrrequest.setRequestHeader("Cache-Control","no-cache");
    xhrrequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    xhrrequest.setRequestHeader("Pragma","no-cache");
    var response = "";
    xhrrequest.onreadystatechange = function() {
      if(xhrrequest.readyState == 4 && xhrrequest.status == 200) 
      {
        //console.log(xhrrequest.responseText);
        response = xhrrequest.responseText;
      }
    };
  
  
    xhrrequest.send(); 
    return response;
  }