/*Extract*/
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
    var jobs = json.data; /*la ruta de los jobs.  Ej.:  var jobs = json.jobList;*/
    
    var returnedJobs = [];  
    for(i in jobs) {
      var job = {};/*init*/
      //var dom = ""; // Domino del url
      job.title = jobs[i].title;
      job.url = jobs[i].detailsLink;
      job.source_location = jobs[i].terms[0];
      job.location = job.source_location.trim();
      job.dateposted_raw = dateAgo(jobs[i].publishedTime, ' ', 1, 2);
      //job.dateposted_raw = jobs[i].publishedTime;
      //job.logo = elem.querySelector("").getAttribute("src").trim();
      //job.source_apply_email = elem.querySelector("").textContent.trim();
      //job.source_empname = elem.querySelector("").textContent.trim();
      job.source_jobtype = jobs[i].terms[1];
      job.source_salary = jobs[i].terms[2].split('/').shift();
      job.temp = "1";
      returnedJobs.push(job);
    }
  
    out["pass_it"]["jobs"] = returnedJobs.length;
    out["jobs"]= returnedJobs;
    return out;
  })();
  
  
  function dateAgo(text, char_separator, value_DWMY, position_DWMY) {
    var numberDWMY = parseInt(text.trim().split(char_separator)[value_DWMY], 10); //obtengo el valor numerico del dia, sem, mes o año
    if (typeof text.split(char_separator)[position_DWMY] !== 'undefined') {
      var Day_Week_Month_Year = text.split(char_separator)[position_DWMY]
      } else { var Day_Week_Month_Year = text.split(char_separator)[text.split(char_separator).length - 1] };
    var date_Now = new Date(); //declaro un objeto tipo fecha
    var nDays = 0;
    if (Day_Week_Month_Year.toUpperCase().indexOf('TODAY') > -1 || Day_Week_Month_Year.toUpperCase().indexOf('HOUR') > -1) {
      nDays = 0;
    } if (Day_Week_Month_Year.toUpperCase().indexOf('YESTERDAY') > -1) {
      nDays = 1;
    } if (Day_Week_Month_Year.toUpperCase().indexOf('DAYS') > -1) {
      nDays = numberDWMY;
    } if (Day_Week_Month_Year.toUpperCase().indexOf('WEEK') > -1) {
      nDays = numberDWMY * 7;
    } if (Day_Week_Month_Year.toUpperCase().indexOf('MONTH') > -1) {
      nDays = numberDWMY * 30;
    } if (Day_Week_Month_Year.toUpperCase().indexOf('YEAR') > -1) {
      nDays = numberDWMY * 365;
    }
    var dateJob = date_Now.getDate() - nDays; //resto dias de publicacion a la fecha actual
    var get_date = date_Now.setDate(dateJob); //obtengo la cantidad de mseg. desde 1 de Enero de 1970
    var datePosted = new Date(get_date); //obtengo la fecha de publicacion.
    //Obtengo dia mes y Año
    var day = datePosted.getDate(); //devuelve el numero del dia del mes.
    var month = datePosted.getMonth() + 1; //getMonth devuelve valores de 0 a 11, se suma uno para llevarlo de 1 a 12.
    var year = datePosted.getFullYear().toString(); //devuelve el año.
    if (day < 10) {
      day = '0' + day.toString().trim();
    } else { day = day.toString().trim(); }
    /*Obtengo mes*/
    if (month < 10) {
      month = '0' + month.toString();
    } else { month = month.toString(); }
  
    dateJob = month + '/' + day + '/' + year;
    return dateJob;
  }
  
  /*Pagination*/
  (function () {
    var out = {};
  
    if (typeof pass_it == "undefined") pass_it = {};
    if (typeof msg == "undefined") msg = function (x) { return x; };
    //var element = document.querySelector("pre").textContent;
    //var element = JSON.parse(document.querySelector("pre").textContent);
    //Aqui sacamos los jobs
    //var expected_jobs_str = element["start"]; // SE AGREGA SELECTOR DE CONTADOR DE JOBS
    ///msg(expected_jobs_str);
    if (!pass_it["cont"]) {
      out["pass_it"] = {
        "cont": 1,
        "jobs": 100
        //"expected_jobs":expected_jobs_str
      };
    } else {
      out["pass_it"] = pass_it;
    }
  
    //msg("====>"+out["pass_it"]["jobs"])
  
    if(out["pass_it"]["jobs"] < 100 && out["pass_it"]["jobs"] > 0){
      out["has_next_page"] = false;
      //msg("====> if");
    }
    else if (out["pass_it"].jobs > 0) {
      out["pass_it"].cont += 1;
      var url = "https://gorillajobs.com.au/api/jobs?limit=100&page=" + out["pass_it"].cont;
      //msg("=====> else if" + url);
      window.location.href = url;
      out["has_next_page"] = true;
    } else {
      out["has_next_page"] = true;
      //msg("===> else")
    }
    
    out["wait"] = true;
    return out;
  })();