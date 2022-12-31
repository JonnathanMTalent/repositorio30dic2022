//Plataforma livehire


//Before extract

(function () {
  var out = {};
  out.waitFor = "#job-listings > a"
  //out.pic = true;
  //out.html = true;
  return out;
})();

//Extract


(function() {
  var out = {};
  var html_jobs = document.querySelectorAll("#job-listings > a");
  var jobs = [];for(var x in html_jobs){

    if(typeof html_jobs[x] =="function") continue;
    if(typeof html_jobs[x] =="number") continue;
    var job = {};
    var elem = html_jobs[x];

    job.title = elem.querySelector("job-listing > div > div > h3").textContent.trim();
    job.reqid = elem.href.split("/")[6].trim();
    job.url = elem.href.trim();
    
    if( elem.querySelector("ul > li > i.icon.iconFont.glyph0142")){  
      job.location = elem.querySelector("ul > li > i.icon.iconFont.glyph0142").nextElementSibling.nextElementSibling.textContent.trim();
      job.location = job.location.replace(/\(.*?\)/g, '').replace(/\[.*?\]/g, '').replace(/\<.*?\>/g, '').replace(/[0-9]/g,'').trim();
    }else{
      job.location = "Belrose, New South Wales, AU";
    }

    if( elem.querySelector("ul > li > i.icon.iconFont.glyph0071")){  
      var posted = elem.querySelector("ul > li > i.icon.iconFont.glyph0071").nextElementSibling.nextElementSibling.textContent.trim();
      posted = posted.replace("a ","1 ").trim();
      job.dateposted_raw = dateAgo(posted," ",0,1)
    }


    if( elem.querySelector("tooltip > div.tooltip-container > div > span.content")){  
      var posted = elem.querySelector("tooltip > div.tooltip-container > div > span.content").textContent.replace("Published on ","").trim();
      posted = posted.replace(/Jan/gi,"01").replace(/Feb/gi,"02").replace(/Mar/gi,"03").trim();
      posted = posted.replace(/Apr/gi,"04").replace(/May/gi,"05").replace(/Jun/gi,"06").trim();
      posted = posted.replace(/Jul/gi,"07").replace(/Aug/gi,"08").replace(/Sep/gi,"09").trim();
      posted = posted.replace(/Oct/gi,"10").replace(/Nov/gi,"11").replace(/Dec/gi,"12").trim();
      posted = posted.split(" ");
      job.dateposted_raw = posted[1] +'/'+ posted[0] +'/'+ posted[2];
    }

    if( elem.querySelector("ul > li > i.icon.iconFont.glyph0141")){   
      job.source_jobtype = elem.querySelector("ul > li > i.icon.iconFont.glyph0141").nextElementSibling.nextElementSibling.textContent.trim();
    }

    if( elem.querySelector("ul > li > i.icon.iconFont.glyph0041")){  
      job.source_salary = elem.querySelector("ul > li > i.icon.iconFont.glyph0041").nextElementSibling.nextElementSibling.textContent.trim();
    }

    //job.logo = elem.querySelector("").getAttribute("src").trim();
    //job.source_empname = elem.querySelector("").textContent.trim();

    job.temp = 1;
    jobs.push(job);
  } 

  out["jobs"]= jobs;
  return out;
})();

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


//Infiniti pagination


(function() {
  var out = {};
  var button_more = '#show-more-button > span'; //1) SELECTOR DEl BOTON VER MAS JOBS

  //msg(pass_it);
  if (!pass_it["heights"]) out["pass_it"] = { "heights": [] };
  else out["pass_it"] = pass_it;

  out["has_next_page"] = true;
  if (out["pass_it"]["heights"].length > 3) {
      var last_three_heights = out["pass_it"]["heights"].slice(out["pass_it"]["heights"].length - 3);
      if (last_three_heights[0] == last_three_heights[1] && last_three_heights[1] == last_three_heights[2])
          out["has_next_page"] = false;
  }

  if (document.querySelectorAll(button_more).length == 1)
      document.querySelector(button_more).click();

  out["wait"] = true;
  out["pass_it"]["heights"].push(document.querySelectorAll("d#job-listings > a").length); // selector de los jobs
  return out;
})();



//Job data


(function() {
  var out = {};
  var job = {};
  var selector = "div#job-description";
  var remove_selectors = [];
  //var job = pass_it["job"];
  var full_html = document.querySelector(selector);
  // remove something from the jobdatata
  if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {if(full_html.querySelector(remove_selector)) full_html.querySelector(remove_selector).remove();});
  if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
  if (typeof msg == "undefined") msg = console.log;

  for(const a of full_html.querySelectorAll('p')){
    const text = a.textContent.trim();
    if(text.search(/Salary/i) > -1){
      let auxSalary = text.trim();
      if(auxSalary.search(/\£|\¥|\€|\$|\¢/g) > -1){
        job.source_salary = auxSalary.trim();
        job.source_salary = job.source_salary.split('(').shift().split("·").pop().trim();
      }
    }
  }


  for(const b of document.querySelectorAll('strong')) {
    if (b.textContent.includes('CLOSE')) {
      var closed = b.textContent.trim().split("days").pop().split(" on ").pop().trim();
      closed = closed.replace(/January/gi,"01").replace(/February/gi,"02").replace(/March/gi,"03").trim();
      closed = closed.replace(/April/gi,"04").replace(/May/gi,"05").replace(/June/gi,"06").trim();
      closed = closed.replace(/July/gi,"07").replace(/August/gi,"08").replace(/September/gi,"09").trim();
      closed = closed.replace(/October/gi,"10").replace(/November/gi,"11").replace(/December/gi,"12").trim();
      closed = closed.replace(",","").replace(".","").trim().split(" ");
      job.dateclosed_raw = closed[0] +'/'+ closed[1] +'/'+ closed[2];
    }
  }

  job.html      = full_html.innerHTML.trim();    


  //job.html = removeTextBefore(job.html, 'Job Purpose', false);

  job.html = removeTextAfter(job.html, 'APPLY NOW', true);
  job.html = removeTextAfter(job.html, 'How to apply:', true);
  job.html = removeTextAfter(job.html, 'If you have questions about this role', true);


  if(job.html.indexOf('@')>-1){
    var eliminar = job.html.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi).join('\n');
    job.html = job.html.replace(eliminar,'');
  }

  if (job.html.indexOf('https') > -1) { job.html = job.html.replace(/(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,""); }
  if (job.html.indexOf('http') > -1)  { job.html = job.html.replace(/(http?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,"");  } 
  if (job.html.indexOf('HTTPS') > -1) { job.html = job.html.replace(/(HTTPS?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,""); }
  if (job.html.indexOf('HTTP') > -1)  { job.html = job.html.replace(/(HTTP?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,"");  }
  if (job.html.indexOf('www') > -1)  { job.html = job.html.replace(/(www?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,"");  }


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



for(const a of document.querySelectorAll('li')) {
  if (a.textContent.includes('Closes')) {
    var closed = a.textContent.trim().split("days").pop().split("-").pop().trim();
    closed = closed.replace(" Jan ","/01/").trim();
    closed = closed.replace(" Feb ","/02/").trim();
    closed = closed.replace(" Mar ","/03/").trim(); 
    closed = closed.replace(" Apr ","/04/").trim();
    closed = closed.replace(" May ","/05/").trim();
    closed = closed.replace(" Jun ","/06/").trim();
    closed = closed.replace(" Jul ","/07/").trim();
    closed = closed.replace(" Aug ","/08/").trim();
    closed = closed.replace(" Sep ","/09/").trim();
    closed = closed.replace(" Oct ","/10/").trim();
    closed = closed.replace(" Nov ","/11/").trim();
    closed = closed.replace(" Dec ","/12/").trim();
    closed = closed.split("/");
    job.dateclosed_raw = closed[1] +'/'+ closed[0] +'/'+ closed[2];
  }
}