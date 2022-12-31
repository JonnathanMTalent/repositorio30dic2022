//Myworkdays



//Espected jobs

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

  if(typeof pass_it == "undefined") pass_it = {};

  if (!pass_it["cont"]) {
    out["pass_it"] = {
      "cont": 0,
      "jobs": 0,
      "total_jobs":0,
      "expected_jobs":0
    };
  } else {
    out["pass_it"] = pass_it;
  }

  /* msg("***************************************");
    msg(out["pass_it"]);
    msg(window.location.href);
    msg("***************************************");
  */
  // msg(pass_it);

  var element = document.querySelector("pre").textContent;
  var json = JSON.parse(element);

  var jobs = json.body.children[0].children[0].listItems;
  var returnedJobs = [];	
  for(i in jobs) {
    var job = {};

    job.title = jobs[i].title.instances[0].text.split("-")[0];
    job.url = "https://globalhr.wd5.myworkdayjobs.com" + jobs[i].title.commandLink;

    if(jobs[i].subtitles.length > 1){
      job.location = jobs[i].subtitles[0].instances[0].text;
      job.location = job.location.split(":").pop().trim();
      job.location = job.location.replace(/\(.*?\)/g, '').replace(/\[.*?\]/g, '').replace(/\<.*?\>/g, '').replace(/[0-9]/g,'').replace(" ,",",").trim();
      job.location = job.location.replace("Remote Office","").trim();
      job.location = job.location.replace("Remote Location","").trim();
      job.location = job.location.replace("Corp","").trim();
      job.location = job.location.replace("Engine Comp","").trim();
      job.location = job.location.replace("IA Collins Rd NE ,","").trim();
      job.location = job.location.replace("Field Office -","").trim();
      //job.location = job.location.replace("","").trim();
    }else{
      job.location = 'Waltham, Massachusetts, USA';
    }


    if(jobs[i].subtitles.length > 2){
      var posted = jobs[i].subtitles[2].instances[0].text.replace('+','').trim();
      job.dateposted_raw = dateAgo(posted,' ',1,2);  
    }


    job.temp = 1;
    returnedJobs.push(job);
  }

  //msg(jobs);
  //msg(returnedJobs.length);
  out["pass_it"].jobs = returnedJobs.length;
  out["pass_it"].total_jobs = out["pass_it"].total_jobs + out["pass_it"].jobs;
  out["jobs"]= returnedJobs;
  return out;
})();



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


(function () {
  var out = {};
  var json =  JSON.parse(document.querySelector("pre").textContent);
  var jobs_number = json.body.children[0].children[0].listItems.length;    // número de jobs por página. Jobs amount per page
  var url_base = "https://globalhr.wd5.myworkdayjobs.com/REC_RTX_Ext_Gateway/fs/searchPagination/318c8bb6f553100021d223d9780d30be/";
  var selector = "";

  if (typeof pass_it == "undefined") pass_it = {};
  if (typeof msg == "undefined") msg = console.log;

  if (!pass_it["cont"]) {
    out["pass_it"] = {
      "cont": 0,
      "jobs": 0
    };
  } else {
    out["pass_it"] = pass_it;
  }


  msg("Jobs:"+jobs_number);
  msg("count!!!!!"+out["pass_it"].cont);

  if (jobs_number >= 50) {
    out["pass_it"].cont +=50;
    var url = url_base + out["pass_it"].cont;
    msg("url!!!!!"+url);
    window.location.href = url;

    out["has_next_page"] = true;
  }else  {
    out["has_next_page"] = false;
  }

  out["wait"] = true;
  return out;
})();



//Before jobdata

(function () {
  var out = {};
  out.waitFor = 'div[id*="richTextArea.jobPosting.jobDescription-input"] > div.GWTCKEditor-Disabled';
  //out.pic = true;
  //out.html = true;
  return out;
})();



//Jobdata


(function() {
  var out = {};
  var job = {};
  var selector = 'div[id*="richTextArea.jobPosting.jobDescription-input"] > div.GWTCKEditor-Disabled';
  var remove_selectors = [];
  //var job = pass_it["job"];
  var full_html = document.querySelector(selector);
  // remove something from the jobdatata
  if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {if(full_html.querySelector(remove_selector)) full_html.querySelector(remove_selector).remove();});
  if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
  if (typeof msg == "undefined") msg = console.log;

  if (document.querySelector('div[title*="time"]')){
    job.source_jobtype = document.querySelector('div[title*="time"]').textContent.trim();
  }

  job.html      = full_html.innerHTML.trim();  

  job.html = removeTextBefore(job.html, 'The role:', false);
  job.html = removeTextAfter(job.html, 'For more information', true);


  if (job.html.indexOf('https') > -1) { job.html = job.html.replace(/(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,""); }
  if (job.html.indexOf('http') > -1)  { job.html = job.html.replace(/(http?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,"");  } 
  if (job.html.indexOf('HTTPS') > -1) { job.html = job.html.replace(/(HTTPS?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,""); }
  if (job.html.indexOf('HTTP') > -1)  { job.html = job.html.replace(/(HTTP?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,"");  }
  if (job.html.indexOf('www') > -1)  { job.html = job.html.replace(/(www?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,"");  }

  let selectorExpre = 'div[id*="richTextArea.jobPosting.jobDescription-input"] > div.GWTCKEditor-Disabled'; //Selector del jobdata (también puede ser p, div, span)
  let regextwo = '[0-9]{1,2}[+] years|[0-9]{1,2} à [0-9]{1,2} années |[0-9]{1,2} ans|[0-9]{1,2} an minimum|[0-9]{1,2}ans|[0-9]{1,2}an|[0-9]{1,2} an |[0-9]{1,2}-[0-9]{1,2} years|> [0-9]{1,2} ans|[0-9]{1,2}–[0-9]{1,2} years|[0-9]{1,2} – [0-9]{1,2} years|[0-9]{1,2} – [0-9]{1,2} year|[0-9]{1,2} years|[0-9]{1,2} ans |[0-9]{1,2} à [0-9]{1,2} ans' // Validaciones
  for (const a of document.querySelectorAll(selectorExpre)) {
    if (a.textContent.match(/years in|expérience|experience|Experience|Expérience/gi)) {
      if (a.textContent.match(regextwo)) {
        job.experience_required = a.innerText.match(regextwo)[0];
        job.experience_required = job.experience_required.replace("18+ years","").trim();
        job.experience_required = job.experience_required.replace("50 years","").trim();
      }else{
        job.experience_required = '';
      }
    }
  }

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