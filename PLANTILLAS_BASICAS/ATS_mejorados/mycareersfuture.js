



COMENTARIO;
[Strategy: new] scanid()  Run time AVG: () add Jobtype, add experience_required, add source_salary, add dateposted and dateclosed_raw

// BEFORE EXTRACT
(function() {
    var out = {};
    out.waitFor = 'div.card.relative';
  //   msg("Esperando 3 segundos..............");
  //   out.wait = 3000;
  //   out["html"] = true;
  //   out["pic"] = true;
    return out;
})();




//EXTRACT
(function() {
    var out = {};
    var html_jobs = document.querySelectorAll('div.card.relative');
    var jobs = [];
    for (var x in html_jobs) {
        if (typeof html_jobs[x] == "function") continue;
        if (typeof html_jobs[x] == "number") continue;
        var job = {};
        var elem = html_jobs[x];


        job.title = elem.querySelector('a div.JobCard__job-title-flex___2R-sW span[data-cy="job-card__job-title"]').textContent.trim();
        job.url = elem.querySelector('a').href.trim();
        job.source_location = elem.querySelector('a div.JobCard__job-title-flex___2R-sW p[data-cy="job-card__location"]').textContent.trim();
        job.location = Locacion(job.source_location);
        // job.dateposted_raw = elem.querySelector('').textContent.trim();
        job.source_jobtype=elem.querySelector('a div.JobCard__job-title-flex___2R-sW p:nth-child(2)').textContent.trim();
        job.source_jobtype=Jobtype(job.source_jobtype);
        if(elem.querySelector('a div.JobCard__job-title-flex___2R-sW p:nth-child(5)'))job.experience_required = elem.querySelector('a div.JobCard__job-title-flex___2R-sW p:nth-child(5)').textContent.trim();
        if(elem.querySelector('div[data-cy="salary-info"]'))job.source_salary=elem.querySelector('div[data-cy="salary-info"]').textContent.trim();
        
        job.temp = 1;
        jobs.push(job);
    }

    out["jobs"] = jobs;
    return out;
})();

  function Jobtype(jobtyp) {
    var Jobtype=jobtyp.toLowerCase();
    
    var s_jobtype='';
    //var s_jobtype = 'Headquarters';  // Convertir la locacion en hq cuando no este en los if
    
/*  PARA SACAR MAS:  en minuscula la de indexOf
    if (Jobtype.indexOf("") > -1) {
        s_jobtype = (", ");
    }; 
    //Full-time, Part-time, Temporary, Permanent;
*/
    if (Jobtype.indexOf("full time") > -1) {
        s_jobtype = ("Full Time");
    };
    if (Jobtype.indexOf("full-time") > -1) {
        s_jobtype = ("Full Time");
    };
    if (Jobtype.indexOf("fulltime") > -1) {
        s_jobtype = ("Full Time");
    };
    if (Jobtype.indexOf("part-time") > -1) {
        s_jobtype = ("Part Time");
    };
    if (Jobtype.indexOf("parttime") > -1) {
        s_jobtype = ("Part Time");
    };
    if (Jobtype.indexOf("temporary") > -1) {
        s_jobtype = ("Temporary");
    };
    if (Jobtype.indexOf("permanent") > -1) {
        s_jobtype = ("Permanent");
    };

    
    return s_jobtype;
}

// version vacia para llenar
function Locacion(Locat) {
    var Locate=Locat.toLowerCase().trim();
    
    var location=Locate;
    //var location = 'Headquarters';  // Convertir la locacion en hq cuando no este en los if
    
/*  PARA SACAR MAS:  en minuscula la de indexOf
    if (Locate.indexOf("") > -1) {
        location = (", ");
    };
     //IGUALDAD
    if (Locate==("")) {
    location = (", ");
};
*/
if (Locate.indexOf("south") > -1) {
    location = ("Singapore, SG");
};
if (Locate.indexOf("north") > -1) {
    location = ("Singapore, SG");
};
if (Locate.indexOf("east") > -1) {
    location = ("Singapore, SG");
};
if (Locate.indexOf("west") > -1) {
    location = ("Singapore, SG");
};
if (Locate.indexOf("central") > -1) {
    location = ("Singapore, SG");
};
    return location;
}

// PAGINATION
(function() {
    var out = {};
    var clickable_elem=document.querySelector('button[aria-label="Next"]');
   clickable_elem!=null ? (clickable_elem.click(),out["has_next_page"] =true) :out["has_next_page"] =false;
    //out.waitFor = "a.jobdetail";
    return out;
})();


// BEFORE JOBDESCRIPTION

(function() {
    var out = {};
    out.waitFor = 'div.jobDescription';
  //   msg("Esperando 3 segundos..............");
  //   out.wait = 3000;
  //   out["html"] = true;
  //   out["pic"] = true;
    return out;
})();


// JOBDESCRIPTION
(function() {
    var out = {};
    var job = {};
    const formatDate = (value) => {
    let date = new Date(value);
    const withCero = n => n < 10 ? `0${n}` : n;
    return `${withCero(date.getMonth()+1)}/${withCero(date.getDate())}/${date.getFullYear()}`;
  }
    var selector = 'div.jobDescription';
    var remove_selectors = [];
    //var job = pass_it["job"];
    var full_html = document.querySelector(selector);
    if(document.querySelector('div[data-cy="salary-info"]'))job.source_salary=document.querySelector('div[data-cy="salary-info"]').textContent.trim();                        
    
    // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj /*
    if(document.querySelector('span#last_posted_date'))job.dateposted_raw=formatDate(document.querySelector('span#last_posted_date').textContent.replace('Posted','').trim());
    if(document.querySelector('span#expiry_date'))job.dateclosed_raw=formatDate(document.querySelector('span#expiry_date').textContent.replace('Closing on','').trim());
//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
    
    for (const a of full_html.querySelectorAll('a')) {
        a.remove(); //if you want to remove this selector
    }
    for (const a of full_html.querySelectorAll('script')) {
        a.remove(); //if you want to remove this selector
    }
    for (const a of full_html.querySelectorAll('style')) {
        a.remove(); //if you want to remove this selector
    }

    // remove something from the jobdatata
    if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {
        if (full_html.querySelector(remove_selector)) full_html.querySelector(remove_selector).remove();
    });
    if (typeof cleanHTML == "undefined") cleanHTML = function(x) {
        return x
    };
    if (typeof msg == "undefined") msg = console.log;



    job.html = full_html.innerHTML.trim();

    // job.html = removeTextBefore(job.html, '', false);
    // job.html = removeTextBefore(job.html, '', false);
    // job.html = removeTextBefore(job.html, '', false);

    // job.html = removeTextAfter(job.html, '', true);
    // job.html = removeTextAfter(job.html, '', true);
    // job.html = removeTextAfter(job.html, '', true);

    job.html = cleanHTML(job.html);
    var tmp = document.createElement('div');
    tmp.innerHTML = job.html;
    job.jobdesc = tmp.textContent.trim();
    job.jobdesc = cleanHTML(job.jobdesc);
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



//     ████████████████████████████████████████████████████████████████████  /*  
API DE MICAREERSFUTURE EN JSON  --> https://api.mycareersfuture.gov.sg/v2/jobs?limit=20&page=0&uen=201130733N
//*/// ████████████████████████████████████████████████████████████████████
// forma del json que encontre arriba, hay que organizarlo
(function() {
	var out = {};

  
 	 if(typeof pass_it == "undefined") pass_it = {};
  	if (!pass_it["cont"]) {
      out["pass_it"] = {
        "jobs": 0
      };
    } else {
      out["pass_it"] = pass_it;
    }
  

  	var element = document.querySelector("pre").textContent;
  	//msg(element); //Imprime el json
  
  	
  	var jobs = element.split('"title":"');
  	var cant = jobs.length;  
  	//msg("La cantidad de jobs es:"+cant);

  	var returnedJobs = [];
   	for (var aux=1;aux<cant;aux++){
	   var job = {};/*init*/
      
      job.title = jobs[aux].split(',')[0];
      job.url = jobs[aux].split('jobDetailsUrl":"')[1].split(',')[0].replace(/\"/g, '');
  	  job.reqid= jobs[aux].split('uuid":"')[1].split(',')[0].replace(/\"/g, '');
      
      job.temp = 090519;
      returnedJobs.push(job);
      
	}
  	msg(jobs);
  	msg(returnedJobs.length);
  
  	out["pass_it"]["jobs"] = returnedJobs.length;
	out["jobs"]= returnedJobs;
  	return out;
})();