// https://www.portek.com/contact/careers/
//EJEMPLO FUNCIONAL


// divisiones que filtra repetidos
var divisiones=(function() {
	var out1 = {};
  	 var html_jobs1 =document.querySelectorAll('strong');
  	var jobs1 = [];
    for(var x in html_jobs1){
    	if(typeof html_jobs1[x] =="function") continue;
      	if(typeof html_jobs1[x] =="number") continue;
    	var job1 = {};
    	var elem1 = html_jobs1[x];
      //Creating a container to be able to extract using selectors
    	job1.title1 = elem1.textContent.trim();
      
       	job1.temp1 = 1;
           if(job1.title1.search(/\b[A-Z]{1,}\b/)>-1){
            if(job1.title1.indexOf('VOUS POUVEZ ENVOYER VOTRE CV EN CLIQUANT ICI')==-1)jobs1.push(job1);
           }
  	} 
      const seen = new Set();
    let jobsfiltered = jobs1.filter(item => {
      const duplicate = seen.has(item.title1);
      seen.add(item.title1);
      return !duplicate;
    });
  
	out1['jobs'] = jobsfiltered;
  	return out1;
})();

 // DIVIDIENDO CON EL HTML
var divisiones=(function() {
	var out1 = {};
  	 var html_jobs1 =document.querySelector('#content > section > p:nth-child(3)').innerHTML.split('<br>');
  	var jobs1 = [];
    for(var x in html_jobs1){
    	if(typeof html_jobs1[x] =="function") continue;
      	if(typeof html_jobs1[x] =="number") continue;
    	var job1 = {};
    	var elem1 = html_jobs1[x];
      //Creating a container to be able to extract using selectors
    	job1.title1 = elem1
      
       	job1.temp1 = 1;
           
                //usar esta linea cuando no esta limpiando bien el job.html
               //eso ocurre porque hay alguna diferencia en la forma como esta estructurado el html y como se tomo esta division
               //suelen ser espacios o etiquetas que no estan es mejor tomar un elemento muy sencillo
            if(elem1.length>0)jobs1.push(job1);
           
  	} 
  
	out1["jobs1"]= jobs1;
  	return out1;
})();



var divisiones=(function() {
	var out1 = {};
  	 var html_jobs1 =document.querySelectorAll('p strong');
  	var jobs1 = [];
    for(var x in html_jobs1){
    	if(typeof html_jobs1[x] =="function") continue;
      	if(typeof html_jobs1[x] =="number") continue;
    	var job1 = {};
    	var elem1 = html_jobs1[x];
      //Creating a container to be able to extract using selectors
    	job1.title1 = elem1.parentElement.textContent.trim();
      
       	job1.temp1 = 1;
           if(job1.title1.search(/Position:/)>-1){
               job1.title1=job1.title1.replace('Position:','').trim(); //usar esta linea cuando no esta limpiando bien el job.html
               //eso ocurre porque hay alguna diferencia en la forma como esta estructurado el html y como se tomo esta division
               //suelen ser espacios o etiquetas que no estan es mejor tomar un elemento muy sencillo
            if(job1.title1.indexOf('VOUS POUVEZ ENVOYER VOTRE CV EN CLIQUANT ICI')==-1)jobs1.push(job1);
           }
  	} 
  
	out1["jobs1"]= jobs1;
  	return out1;
})();



(function() {
	var out = {};
     var con=0;
  	var jobs = [];for(let i=0; i<divisiones.jobs1.length;i++){
    	var job = {};
    	
    	job.title = divisiones.jobs1[con].title1;
   	 	job.url = window.location.href;
    	job.location = 'Singapore, SG';
        job.html = document.querySelector('div.ck-content').innerHTML.trim();
		var num=positions(job.title, divisiones.jobs1); 
		
		      if (typeof cleanHTML == "undefined") cleanHTML = function(x) {
        return x
      };
      if (typeof msg == "undefined") msg = console.log;
		// ** Cleaning **
		// *************************************************
		//job.html.replace(/[\uD83C-\uDBFF\uDC00-\uDFFF]+/g, '');

	  job.html = removeTextBefore(job.html, job.title, true);
      job.html = removeTextAfter(job.html, num, true);
      
    //   job.html = job.html.split(job.title).pop();
    //  job.html = job.html.split(num).shift();
    
		job.html = cleanHTML(job.html);
		// *************************************************

		let tmp = document.createElement('div');
		tmp.innerHTML = job.html;
		job.jobdesc = tmp.textContent.trim();
		job.jobdesc = cleanHTML(job.jobdesc);
		
// PONER DE AQUI EN ADELANTE LAS VARIABLES A BUSCAR USANDO EL TMP
		job.temp = 1;
        con++;
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



//EJEMPLO ORIGINAL


//https://equipement-camion.com/emploi/

var divisiones=(function() {
	var out1 = {};
  	 var html_jobs1 =document.querySelectorAll('strong');
  	var jobs1 = [];
    for(var x in html_jobs1){
    	if(typeof html_jobs1[x] =="function") continue;
      	if(typeof html_jobs1[x] =="number") continue;
    	var job1 = {};
    	var elem1 = html_jobs1[x];
      //Creating a container to be able to extract using selectors
    	job1.title1 = elem1.textContent.trim();
      
       	job1.temp1 = 1;
           if(job1.title1.search(/\b[A-Z]{1,}\b/)>-1){
            if(job1.title1.indexOf('VOUS POUVEZ ENVOYER VOTRE CV EN CLIQUANT ICI')==-1)jobs1.push(job1);
           }
  	} 
  
	out1["jobs1"]= jobs1;
  	return out1;
})();


//divisiones.jobs1[0]



(function() {
	var out = {};
     var html_jobs =document.querySelectorAll('div.row');
     var con=0;
  	var jobs = [];for(let i=0; i<divisiones.jobs1.length;i++){
    	var job = {};
    	
    	job.title = divisiones.jobs1[con];
   	 	job.url = window.location.href;
    	job.location = 'France';
        job.html = document.querySelector('div.row').innerHTML.trim();
		var num=positions(job.title, divisiones.jobs1); 
		// ** Cleaning **
		// *************************************************
		//job.html.replace(/[\uD83C-\uDBFF\uDC00-\uDFFF]+/g, '');
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
        con++;
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