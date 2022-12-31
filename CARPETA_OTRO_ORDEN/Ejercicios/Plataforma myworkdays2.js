//My workdays con multilocation


//Before Extract

  (function() {
    var out = {};
    try{
      var element = document.querySelector("pre").textContent;
      //msg(element);
      var json = JSON.parse(element);
      var jobs = json.body.children[0].children[0].listItems;;  // ruta donde estan los jobs
      out["json"] = jobs;
    }catch(error){
      out["wait"] = 500; // un poco de tiempo json

    }

    return out;
  })();


//Expected jobs

(function() {
var out = {};

var regex = /\d+/;

if (typeof msg === 'undefined') msg = console.log;

var element = document.querySelector("pre").textContent;
var json = JSON.parse(element);
var expected_jobs_str = json.body.children[0].facetContainer.paginationCount.value;

var expected_jobs = regex.exec(expected_jobs_str)[0];

out["expected_jobs"] = expected_jobs;

return out;
})();



//Extract

(function() {
  var out = {};
  // var html_jobs = document.querySelectorAll("");
  //  This gives you an HTMLElement object
  if(typeof pass_it == "undefined") pass_it = {};
  if (!pass_it["cont"]) {
    out["pass_it"] = {
      "cont": 0,
      "jobs": 0
    };
  } else {
    out["pass_it"] = pass_it;
  }
  var jobs =  pass_it["json"];
  var returnedJobs = [];
    var element = document.querySelector("pre").textContent;
    //msg(element);
    var json = JSON.parse(element);
    var jobs = json.body.children[0].children[0].listItems;
  
  //msg(typeof(jobs));
  for(i in jobs) {
    var job = {};/*init*/
    // msg("Entre")
    job.title = jobs[i].title.instances[0].text;
    job.reqid = jobs[i].subtitles[0].instances[0].text;
    job.url = "https://bb.wd3.myworkdayjobs.com" + jobs[i].title.commandLink ;
    job.location = jobs[i].subtitles[1].instances[0].text;
    //job.location = job.location;

    if(jobs[i].subtitles.length > 2){
      var posted = jobs[i].subtitles[2].instances[0].text.replace('+','').trim();
      job.dateposted_raw = dateAgo(posted,' ',1,2);  
    }



    job.temp = 3312;
    //msg(job.location)
    if(job.location.indexOf("More") > -1){
      var json_desc = JSON.parse(getDescription(job.url));
      var array = json_desc.body.children[1].children[0].children;
      for(var i in array){
        if(array[i].iconName == 'LOCATION'){
          var jobx = {};
          jobx.title = job.title;
          jobx.reqid = job.reqid;
          jobx.url = job.url; 
          jobx.dateposted_raw = job.dateposted_raw;
          jobx.location = array[i].imageLabel;
          jobx.temp = job.temp;
          //msg(jobx)
          returnedJobs.push(jobx);
        }
      }
    }
    else{
      returnedJobs.push(job);
    }
  }
  //msg(jobs);
  //msg(returnedJobs.length);
  out["pass_it"]["jobs"] += returnedJobs.length;
  out["jobs"]= returnedJobs;
  return out;
})();

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


function dateAgo (text, char_separator, value_DWMY, position_DWMY){  
  var numberDWMY = parseInt(text.trim().split(char_separator)[value_DWMY],10); //obtengo el valor numerico del dia, sem, mes o año
  if(typeof text.split(char_separator)[position_DWMY]!=='undefined'){
    var dayWeekMonthYear = text.split(char_separator)[position_DWMY]
    }else{ var dayWeekMonthYear = text.split(char_separator)[text.split(char_separator).length - 1]};
  var date_Now = new Date();  //declaro un objeto tipo fecha
  var nDays = 0;
  if (dayWeekMonthYear.toUpperCase().indexOf('TODAY')>-1 || dayWeekMonthYear.toUpperCase().indexOf('HOUR')>-1){nDays = 0;}
  if (dayWeekMonthYear.toUpperCase().indexOf('YESTERDAY')>-1) {nDays = 1;}
  if (dayWeekMonthYear.toUpperCase().indexOf('DAYS')>-1){nDays = numberDWMY;}
  if (dayWeekMonthYear.toUpperCase().indexOf('WEEK')>-1){nDays = numberDWMY * 7;}
  if (dayWeekMonthYear.toUpperCase().indexOf('MONTH')>-1){nDays = numberDWMY * 30;}
  if (dayWeekMonthYear.toUpperCase().indexOf('YEAR')>-1){nDays = numberDWMY * 365;}
  var dateJob    = date_Now.getDate() - nDays;//resto dias de publicacion a la fecha actual
  var get_date   = date_Now.setDate(dateJob); //obtengo la cantidad de mseg. desde 1 de Enero de 1970
  var datePosted = new Date(get_date);        //obtengo la fecha de publicacion.
  //Obtengo dia mes y Año
  var dd    = datePosted.getDate();           //devuelve el numero del dia del mes.
  var mm    = datePosted.getMonth()+1;        //getMonth devuelve valores de 0 a 11, se suma uno para llevarlo de 1 a 12.
  var yyyy  = datePosted.getFullYear().toString(); //devuelve el año.
  if (dd < 10){dd ='0'+dd;}  
  if (mm<10){mm ='0'+ mm;}  
  dateJob= mm +'/'+dd+'/'+yyyy;
  return dateJob;
}



//Paginación


(function() {
  var out = {};

  out["pass_it"] = pass_it;


  var element = document.querySelector("pre").textContent;
  //msg(element);
  var json = JSON.parse(element);
  var total_jobs = json.body.children[0].facetContainer.paginationCount.value;
  var jobs = json.body.children[0].children[0].listItems;
  //var per_page = json.meta.perPage;


  msg("========>" + jobs.length);


  if(jobs.length == 50){
    out["pass_it"].cont += 50;
    var url = "https://bb.wd3.myworkdayjobs.com/BlackBerry/fs/searchPagination/318c8bb6f553100021d223d9780d30be/" + out["pass_it"].cont +"?clientRequestID=f5573a206ef049998beb9b82c25ce1ba";

    window.location.href = url;
    out["has_next_page"] = true;
  }else{

    out["has_next_page"] =false;
  }

  out.waitFor = 'pre';
  return out;
})();


//Job descripción con clientRequestID



(function() {
  var out = {};
  var job = {};
  //var job = pass_it["job"];

  var xhrrequest = new XMLHttpRequest();
  xhrrequest.open("GET", window.location.href, false);
  xhrrequest.setRequestHeader("Accept","application/json,application/xml");
  xhrrequest.setRequestHeader("Accept-Language","en-CA,en;q=0.8,en-GB;q=0.6,en-US;q=0.4,es;q=0.2");
  xhrrequest.setRequestHeader("Cache-Control","no-cache");
  xhrrequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
  xhrrequest.setRequestHeader("Pragma","no-cache");

  var hola = "";
  xhrrequest.onreadystatechange = function() {
    //return xhrrequest.status;
    //hola = "[Y]-> " + xhrrequest.status;
    if(xhrrequest.readyState == 4 && xhrrequest.status == 200) 
      //console.log(xhrrequest.responseText);
    {
      //console.log(xhrrequest.responseText);
      hola = xhrrequest.responseText;
      //msg(hola);
      var json = JSON.parse(hola);

      job.source_jobtype = json.body.children[1].children[1].children[1].imageLabel;

      job.html    = json.openGraphAttributes.description;      


      for(const a of document.querySelectorAll('p')){
        const text = a.textContent;
        if(text.indexOf('#LI-') > -1){
          a.remove();//reover el selector si coincide con la palabra clave.
        }
      }

      for (const a of tmp.querySelectorAll('li')) {
        if (a.textContent.includes('experience') && a.textContent.search(/[0-9]/g)>-1){
          job.experienced_required = a.textContent;
        }
      }

      job.html =  removeTextBefore(job.html, "Job Description:", true); 

      job.html =  removeTextAfter(job.html, "We are an Equal Opportunity Employer", true);  
      job.html =  removeTextAfter(job.html, "Check out our EEO policy", true); 


      job.html      = cleanHTML(job.html);
      var tmp       = document.createElement('div');
      tmp.innerHTML = job.html;
      job.jobdesc   = tmp.textContent.trim();
      job.jobdesc   = cleanHTML(job.jobdesc);

    }   
  };

  xhrrequest.send();  

  out["job"] = job;
  return out;
})();

function removeTextBefore(html, text, flag) {
  var newHtml = html;
  if (newHtml.indexOf(text) > -1) {
    newHtml = newHtml.split(text).pop();
    if (!flag) {
      newHtml = "" + text + "" + newHtml;
    }    
  }
  return newHtml;
}

function removeTextAfter(html, text, flag ) {
  var newHtml = html;
  if (newHtml.indexOf(text) > -1) {
    newHtml = newHtml.split(text).shift();
    if (!flag) {
      newHtml = newHtml + "<p>" + text + "</p>";
    }    
  }
  return newHtml;
}
   
//paginacion con condicion de parada a las 2k de paginaciones
(function() {
  var out = {};

  out["pass_it"] = pass_it;


  var element = document.querySelector("pre").textContent;
  //msg(element);
  var json = JSON.parse(element);
  var total_jobs = json.body.children[0].facetContainer.paginationCount.value;
  var jobs = json.body.children[0].children[0].listItems;
  //var per_page = json.meta.perPage;

  // msg("========>" + jobs.length+" Variable de jobs"+out["pass_it"]["jobs"]);

  if( out["pass_it"]["Njobs"] !='Yes'){
    if(jobs.length == 50){
      out["pass_it"].cont += 50;
      var url = "https://psu.wd1.myworkdayjobs.com/PSU_Staff/fs/searchPagination/318c8bb6f553100021d223d9780d30be/" + out["pass_it"].cont +"?clientRequestID=4081c264672e45179d63de6c341cf09b";

      window.location.href = url;
      out["has_next_page"] = true;
    }
  }else{

    out["has_next_page"] =false;
  }

  out.waitFor = 'pre';
  return out;
})();
