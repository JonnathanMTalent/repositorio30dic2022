var divisiones=(function() {
	var out1 = {};
  	 var html_jobs1 =document.querySelectorAll('.entry-content h2[id*="vendedor-jardinagem-e-decoracao"], h2[id*="2-comprador-a"]');
  	var jobs1 = [];
    for(var x in html_jobs1){
    	if(typeof html_jobs1[x] =="function") continue;
      	if(typeof html_jobs1[x] =="number") continue;
    	var job1 = {};
    	var elem1 = html_jobs1[x];
      //Creating a container to be able to extract using selectors
    	job1.title1 = elem1.textContent.trim().substring(2);
      
       	job1.temp1 = 1;
    	jobs1.push(job1);
  	} 
  
	out1["jobs1"]= jobs1;
  	return out1;
})();


//divisiones.jobs1[0]



(function() {
	var out = {};
     var html_jobs = document.querySelectorAll('.entry-content h2[id*="vendedor-jardinagem-e-decoracao"], h2[id*="2-comprador-a"]');
  	var jobs = [];for(var x in html_jobs){
    	if(typeof html_jobs[x] =="function") continue;
      	if(typeof html_jobs[x] =="number") continue;
    	var job = {};
    	var elem = html_jobs[x];
    	job.title = elem.textContent.trim().substring(2);
   	 	job.url = window.location.href;
    	job.location = 'São Paulo, BR';
        job.html = document.querySelector('div[class*="entry-content clearfix"]').innerHTML.trim();
		var num=positions(job.title, divisiones.jobs1); 
		// ** Cleaning **
		// *************************************************
		job.html.replace(/[\uD83C-\uDBFF\uDC00-\uDFFF]+/g, '');
		// job.html = removeTextBefore(job.html, 'Overview:', true);

	  job.html = removeTextBefore(job.html, job.title, true);
      job.html = removeTextAfter(job.html, num, true);
    
		//job.html = cleanHTML(job.html);
		// *************************************************

		let tmp = document.createElement('div');
		tmp.innerHTML = job.html;
		job.jobdesc = tmp.textContent.trim();
		//job.jobdesc = cleanHTML(job.jobdesc);
		job.temp = 1;
		jobs.push(job);
	}
	out['jobs'] = jobs;
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
  function positions(title, array){
  	let pos=0;
	var text=" ";
	for(let i=0; i<array.length; i++){
	  if(title===array[i].title1){
		 n=i+1;
		 if(n<array.length){
			 text=array[n].title1;
			 return text;
		 }
	  }
	}
  }
