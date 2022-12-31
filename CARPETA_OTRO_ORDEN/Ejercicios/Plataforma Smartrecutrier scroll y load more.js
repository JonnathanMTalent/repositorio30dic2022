// Smartrecutrier scroll y button more

//Extract

(function() {
var out = {};
var html_jobs = document.querySelectorAll("li.opening-job > a");
var jobs = [];
for(var x in html_jobs){
  
  if(typeof html_jobs[x] =="function") continue;
  if(typeof html_jobs[x] =="number") continue;
  var job = {};
  var elem = html_jobs[x];
  
  job.title = elem.querySelector("h4").textContent.trim();
  job.reqid = elem.href.split("/")[4].split("-").shift().trim();
  job.url = elem.href.trim();
  job.location = elem.parentElement.parentElement.previousElementSibling.querySelector("h3").textContent.trim();
  
  //job.dateposted_raw = elem.querySelector("").textContent.trim();
  //job.logo = elem.querySelector("").getAttribute("src").trim();
  //job.source_apply_email = elem.querySelector("").textContent.trim();
  //job.source_empname = elem.querySelector("").textContent.trim();
  job.source_jobtype = elem.querySelector("p > span").textContent.trim();
  //job.source_salary = elem.querySelector("").textContent.trim();
  
  job.temp = 012021;
  jobs.push(job);
} 

out["jobs"]= jobs;
return out;
})();


//Infinite pagination

(function () {
    var out = {};
    // Crea un div para darle altura a la pagina
    var button_more = 'a.link.details-desc.js-more';
    var ref = document.querySelector('li.opening-job > a'); //Selector que contiene los jobs 
    var newEle = document.createElement('div');
    ref.appendChild(newEle);
    newEle.style.height = '6000px' // para darle altura a la pagina 
    msg(pass_it);
    if(!pass_it["heights"])    out["pass_it"] = {"heights":[]};
    else                     out["pass_it"] = pass_it;
  
    out["has_next_page"] = true;
    if(out["pass_it"]["heights"].length > 3){
      var last_three_heights = out["pass_it"]["heights"].slice(out["pass_it"]["heights"].length - 3); 
      if(last_three_heights[0] == last_three_heights[1] && last_three_heights[1] == last_three_heights[2])
        out["has_next_page"] = false;
    }
    window.scrollBy(0, document.body.scrollHeight);
  
    if (document.querySelectorAll(button_more).length > 0){
      document.querySelector(button_more).click() 
      msg('---Click al botón---');
    }
  
    out["wait"] = true;
    out["pic"] = true;
    out["html"] = true;
    out["pass_it"]["heights"].push(document.querySelectorAll('li.opening-job > a').length);//Selector de los JOBS
    return out;
  })();
