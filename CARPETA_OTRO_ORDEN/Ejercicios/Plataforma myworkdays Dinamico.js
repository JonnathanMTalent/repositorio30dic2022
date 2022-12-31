/*
MYWORKDAY DINAMICO
  instrucciones:
     Cambiar la URL del spider config> ejemplo formato normal job site: "https://prudential.wd3.myworkdayjobs.com/prudential"
     GETJOBDATA: "NO" 
     La URL que va en el config del spider no debe terminar en "/"
*/
//Extract
(function() {
  var returnedJobs = [];
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
  
  let endpoint = window.location.href.split("/0/").shift().split("/fs/").shift()+"/fs/searchPagination/318c8bb6f553100021d223d9780d30be/"+out["pass_it"].cont;
  msg(endpoint);
    var data = {};
    $.ajax({
      url : endpoint,
      headers: {                
              "accept": "application/json,application/xml",
              "accept-language": "en,es;q=0.9,en-CA;q=0.8,es-419;q=0.7,en-US;q=0.6",
              "content-type": "application/x-www-form-urlencoded",
              "sec-fetch-dest": "empty",
              "sec-fetch-mode": "cors",
              "sec-fetch-site": "same-origin",
              "sec-gpc": "1",
              "stats-perf": "735878cec60544f0881b0a2776d1be57,1129,,0",
              "workday-client-manifest-id": "mvp",
              "x-workday-client": "2021.18.009"
      },
      type : 'GET',
      //data : JSON.stringify(data),
      dataType: "json",
      async : false,
      success : function(json){
        if(out["pass_it"].cont==0){
            //extract total jobs in first pagination
            var expected_jobs_str = json.body.children[0].facetContainer.paginationCount.value;
            out["pass_it"].expected_jobs = expected_jobs_str;
        }
        
        var jobs = json.body.children[0].children[0].listItems;
        for (i in jobs) {
          var job = {}; /*init*/
          job.title = jobs[i].title.instances[0].text.split("-")[0];
          job.reqid = jobs[i].id;
          if (job.title) {
            jobs[i].subtitles.forEach(item =>{
              let text = item.instances[0].text;
              if(!text.includes('Full time') && !text.includes('Permanent') && !text.includes('Posted') && text.search(/[0-9]/)== -1){
                job.location = text.trim();
              }
            });                 
          } 
          job.url = window.location.protocol + "//" + window.location.hostname + jobs[i].title.commandLink;
          if (job.location) {
            //-----------DESCRIPTION---------
            var json = JSON.parse(getDescription(job.url));                                    
            job.html = json.openGraphAttributes.description;                    
            job.html = cleanHTML(job.html);
            var tmp = document.createElement("DIV");
            tmp.innerHTML = job.html;
            job.jobdesc = tmp.textContent.trim();
            
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
            
            //---------MULTILOCATION-------------------
            job.temp = 25;                                    
            var array = json.body.children[1].children[1].children;
            var array2 = json.body.children[1].children[0].children;
            array = array2.concat(array);
            array=array.sort().reverse();
            let locations =[];
            for (var i in array) {                            
              if(array[i].iconName){
                if (array[i].iconName.trim().toUpperCase() == 'JOB_TYPE') {
                  job.source_jobtype = array[i].imageLabel;
                }                
                if (array[i].iconName.trim().toUpperCase() == 'POSTED_DATE') {                                                      
                  let date = array[i].imageLabel.replace("Posted","").trim();
                   date =dateAgo(date.replace(/\s+/gi, ' ').trim(), " ",0, 1);
                   job.dateposted_raw =date;
                }                 
                if (array[i].iconName.trim().toUpperCase() == 'LOCATION') {                  
                  locations.push(array[i].imageLabel.replace(/1|2|3|4|5|6|7|8|9|0/gi, ""));
                }
                if(i == array.length-1){                  
                  locations.map(loc =>{
                    var jobx = {...job};
                    jobx.location = loc.trim();                    
                    returnedJobs.push(jobx);
                  })
                }
                
              }
            }              
          }
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
function getDescription(url) {
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
//Pagination 
(function() {
    var out = {};
    if (typeof msg == "undefined") msg = function(x) { return x; };
    out["pass_it"] = pass_it;
    if (out["pass_it"].expected_jobs <= (out["pass_it"].cont + 50)) {            
      out["has_next_page"] = false;
    } else if (out["pass_it"].jobs > 0) {
        out["pass_it"].cont += 50;          
        out["has_next_page"] = true;
    }  
    out.waitFor = 'pre';
    out.wait= true;
    return out;
})();