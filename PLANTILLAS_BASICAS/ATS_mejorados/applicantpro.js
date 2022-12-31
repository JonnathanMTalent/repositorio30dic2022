//EXTRACT

(function() {
	var out = {};
     var html_jobs = document.querySelectorAll("a.list-group-item.strip-side-borders");
  	var jobs = [];for(var x in html_jobs){
    	if(typeof html_jobs[x] =="function") continue;
      	if(typeof html_jobs[x] =="number") continue;
    	var job = {};
    	var elem = html_jobs[x];
    	job.title = elem.querySelector("h4").textContent.trim().split("(").shift().split(" - Kinston").shift();
    	job.url = elem.href.trim();
    	job.location = elem.querySelector(" ul > li:nth-child(1)").textContent.trim();
    	job.source_location = elem.querySelector(" ul > li:nth-child(1)").textContent.trim();
        job.reqid = job.url.split("bs/").pop().split('/').shift();
        job.source_jobtype = elem.querySelector(" ul > li:nth-child(2)").textContent.trim();
		
       	job.temp = 1416;
    	jobs.push(job);
  	} 
  
	out["jobs"]= jobs;
  	return out;
})();

// PAGINATION
(function() {
    var out = {};  
    out["has_next_page"] = false;  
    out["wait"] = false;
    return out;
})();



// JOBDESC

(function () {
    var out = {};
    var job = {};
    //var jobPassit = pass_it["job"];
    var full_html = document.querySelector('div[class="col-sm-7"] div:nth-child(4)');
    if (full_html) {
// //*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjj//EXPERIENCE REQUIRED jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj 
if(!job.experience_required){
let experience=[];  for (let li of document.querySelectorAll("p,li")) {
    if (/years|year|month|Months|anni|ans|mesi|jaar|maand|años|anno|jahre|år|månader|månad|years|year|month|Months|anni|ans|mesi|jaar|maand|años|anno|jahre|mês|meses|ano|anos/i.test(li.textContent) && /experience|Experience|esperienza|expérience|werkervaring|experiencia|erfahrung|erfarenhet|experiência/i.test(li.textContent)
      && /\d|one|two|three|four|five|six|seven|eight|nine|ten|ett|två|tre|Fyra|Fem|Sex|sju|åtta|nio|tio|um|dois|três|quatro|cinco|seis|sete|oito|nove|dez/gmi.test(li.textContent))
      experience.push(li.textContent);
  }
  if(experience[0]!=undefined){if(experience[0].length<400)job.experience_required=experience[0].replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]\[U+2728])/g, '').trim();}
}
//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjj jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj 

        for (const a of full_html.querySelectorAll('p, span, li')) {
            if (a.textContent.search(/@|http|www./ig) > -1) {
                a.remove();
            }
        }
        var remove_selectors = ['a', 'script', 'i', 'img', 'style', 'button', 'figure', 'noscript', 'svg', 'form', 'input', 'iframe', 'link'];
        if (remove_selectors.length > 0) {
            remove_selectors.forEach(remove_selector => {
                for (const a of full_html.querySelectorAll(remove_selector)) {
                    a.remove();
                }
            });
        }
        job.source_salary = document.querySelector('ul[class="job-items"]>li:nth-child(2)').textContent.trim()
        if (typeof cleanHTML == "undefined") cleanHTML = function (x) { return x };
        if (typeof msg == "undefined") msg = console.log;
        job.html = full_html.innerHTML.trim();
        // job.html = removeTextBefore(job.html, '', false);
        //job.html = removeTextAfter(job.html, //, true);
        
        job.html = removeTextBefore(job.html, 'Duties and Responsibilities:', false);
        job.html = removeTextAfter(job.html, "Sonoran Schools' goal is to provide a superior", true);
        
        job.html = cleanHTML(job.html);
        var tmp = document.createElement('div');
        tmp.innerHTML = job.html;
        job.jobdesc = tmp.textContent.trim();
        job.jobdesc = cleanHTML(job.jobdesc);
    }
    out["job"] = job;
    return out;
})();
function removeTextBefore(html, text, flag) {
    var newHtml = html;
    if (newHtml.search(text) > -1) {
        newHtml = newHtml.split(text).pop();
        if (!flag) {
            newHtml = "<h3>" + text + "</h3>" + newHtml;
        }
    }
    return newHtml;
}
function removeTextAfter(html, text, flag) {
    var newHtml = html;
    if (newHtml.search(text) > -1) {
        newHtml = newHtml.split(text).shift();
        if (!flag) {
            newHtml = newHtml + "<p>" + text + "</p>";
        }
    }
    return newHtml;
}