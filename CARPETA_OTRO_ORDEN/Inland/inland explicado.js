//iland sencillo  explicado 

// before extact

(function() {
	var out = {};
  
	if (typeof pass_it == "undefined") 
      pass_it = {};

  	if (!pass_it["cont"]) {
    	out["pass_it"] = {
      		"cont": 0,
		    "salir":false

    	};
  	} else {
    	out["pass_it"] = pass_it;
    }
  
  var SelectorJobs = "div.job-item.job-items-3.clearfix" //+out["pass_it"]["cont"]+")"; // selector de los jobs
  var elem = document.querySelectorAll(SelectorJobs)[out["pass_it"].cont];
     
  if (elem){
    out["pass_it"]["title"] = elem.querySelector("div.job-item-job-title.has-data").textContent.trim();
    out["pass_it"]["location"] = elem.querySelector("div.job-item-detail.job-item-location.has-data.has-next").textContent.trim();
    //out["pass_it"]["url"] =  window.location.href;
    //out["pass_it"]["dateposted_raw"] =
    
  	elem.click();
    
    out.waitFor = "div.job-description"; // espera por el selector de la descripcion
  }
  else{
    msg("EN EL FALSE DE BEFORE")
    out["pass_it"]["salir"] = true;
  }
  

    return out;
})();

//***** extact*****//
(function() {

    var out = {};
    var jobs = [];
    out["pass_it"] = pass_it;
    if (out["pass_it"]["salir"]){
      var job = {};
      job.title = 'holaa';
      jobs.push(job);
    }else{
  
      if (document.querySelector("div.job-description")){ // selector de las descripciones
        var job = {};
        job.title = out["pass_it"]["title"]//document.querySelector(".c-job-details__title").textContent.replace(/\[.*?\]/g, '').trim();
        job.location = out["pass_it"]["location"] //document.querySelector(".c-job-details__overview__value:nth-of-type(2)").textContent.trim();
        //job.url = out["pass_it"]["url"]// por si en algun momento se requiere mandar la url desde el before starck
        //job.url =   document.querySelector("div.job-url a").href.trim() //window.location.href; // dejo este por si la url s epuede construir
        //job.url = //window.location.href; //este es  para sacar  la url de la ventana que esta 
        job.url = document.querySelector("div.job-url > a").href.trim(); //  para sacar la url  si esta en un selector del job data
  
        job.html = document.querySelector("div.job-description").innerHTML.trim(); // selector de las descripciones
  
        //job.html = removeTextBefore(job.html, "Wat ga je doen?", false);
        //job.html = removeTextAfter(job.html, "Vragen?", true);
        // job.html 		= cleanHTML(job.html);
        // job.jobdesc     = job.html.replace(/&nbsp;/g," ").replace(/\<(.*?)\>/g, ""); // clean tags
        // job.jobdesc     = cleanHTML(job.jobdesc);
        job.html      = cleanHTML(job.html);
        var tmp       = document.createElement('div');
        tmp.innerHTML = job.html;
        job.jobdesc   = tmp.textContent.trim();
        job.jobdesc   = cleanHTML(job.jobdesc);
  
  
        job.temp = 1;
        jobs.push(job);
  
      }	
    }
  
    out["jobs"] = jobs;
    return out;
  
  
  })();
  
  
  function removeTextBefore(html, text, flag) {
    let newHtml = html;
    if (newHtml.indexOf(text) > -1) {
      newHtml = newHtml.split(text).pop();
      if (!flag) {
        newHtml = "<h3>" + text + "</h3>" + newHtml;
      }  		
    }
    return newHtml;
  }
  
  function removeTextAfter(html, text, flag) {
    let newHtml = html;
    if (newHtml.indexOf(text) > -1) {
      newHtml = newHtml.split(text).shift();
      if (!flag) {
        newHtml = newHtml + "<p>" + text + "</p>";
      }  		
    }
    return newHtml;
  }

  //*************paginacion*************** */

  (function () {
    var out = {};
     
      out["pass_it"] = pass_it;
       out["pass_it"].cont += 1;
        window.location.href = 'https://hire.myavionte.com/app/careers/#/jobs/EtnB8FiDM4U/MoaInVnOAMg//';// url del job site
  
    
  if (out["pass_it"]["salir"])
      out["has_next_page"] = false;
  else
      out["has_next_page"] = true;
  
    out.waitFor = 'div.job-item.job-items-3.clearfix'; // espera por selector de los jobs
    return out;
  })();