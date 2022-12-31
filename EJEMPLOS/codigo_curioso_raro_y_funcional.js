/****************************ejemplo 1************************************/

(function() {

  //declarando un objecto anonima
  var out = {};

  // elemento a (etiqueta) que contiene el atributo style contenga la palabra display none 
  // not: es un metodo que devuelve elementos que no coincide con ciertos criterios.  
  var selector = "a#more_posts:not([style*='display: none;'])"; 

  // el texto que contiene el selector
  var partial_text = "";  

  // se le asigna valor false para indicar que no existe paginas.
  out["has_next_page"] = false;


  //ciclo de la paginación
    //Metodo donde obtendremos el todos los elemento del documento 
  var all_elems = document.querySelectorAll(selector); 

  //[]es una matriz vacia no se utliza, solo para dar acceso a prototipos .forEach
  //call se utiliza para ejecutar la función en la lista de nodo de la matriz
  //se utiliza el forEachejecutar el recorrido de elemento asignado

  [].forEach.call(all_elems, function(elemento){
      if(out["has_next_page"]) return out;

      // indexOf: es un metodo devuelve la posicion de la primera aparicion de un valor, buscar ese texto en ese elemento. el devuelve -1 si el valor a buscar nunca ocurre.
      //textContent: es una propieda donde se establece o devuelve el contenido del texto del nodoespecificado

      if(elemento.textContent.trim().indexOf(partial_text) != -1){

      //El evento .click que se produce cuando se hace click en un elemento
          elemento.click();

          out["has_next_page"] = true;
      }
  });		


  //tiempo de espera
  out["wait"] = true;
  return out;
})();











https://www.dnca-investments.com/carrieres


(function() {
	var out = {};
  	var jobs = [];
	var jobsSelector = 'div.wrap > main > div > section > div.container > div.career-offers > div.col-md-8.col-xs-12 > div > div';  //SELECTOR DE LOS JOBS
  
  $(jobsSelector).each(function( index ) {
      var job = {};
      job.title = $(this).find("a > div").text().replace(/\[.*?\]/g, '').trim();
      job.location = $(this).find(" div.col-md-6.col-sm-6.col-xs-6.col-xxs-12.subtitles-offre > p > span:nth-child(5)").text().trim()+", FR";
    // job.location = boo.cleanLoc(job.location, '', remap); 
    // job.multilocation = "";
      job.url = "https://www.dnca-investments.com"+$(this).find("a").attr("href");
    // job.logo = $(this).find("").attr("src");
    // job.source_apply_email = $(this).find("").text();
    // job.source_empname = $(this).find("").text();
      job.source_jobtype = $(this).find("div.col-md-6.col-sm-6.col-xs-6.col-xxs-12.subtitles-offre > p > span:nth-child(3)").text();
    // job.source_salary = $(this).find("").text();
    /*var fecha = $(this).find('time[itemprop="datePosted"]').attr("datetime").split("T")[0].split("-");
     job.dateposted_raw = fecha[1]+'/'+fecha[2]+'/'+fecha[0];*/
      job.dateposted_raw = $(this).find("div.col-md-6.col-sm-6.col-xs-6.col-xxs-12.subtitles-offre > p > span:nth-child(1)").text();
    var year = job.dateposted_raw.split('/').pop().trim();
  var month = job.dateposted_raw.split('/')[1].trim();
  var day = job.dateposted_raw.split('/')[0].trim();

  job.dateposted_raw = month+'/'+day+'/'+year;
    
     job.reqid = $(this).find("a").attr("href").split('/')[2];
    // job.html = $(this).find("").html();
    // job.html = boo.cleanHTML(job.html);
    job.temp = 23;
    	jobs.push(job);
});
  
	out["jobs"]= jobs;
  	return out;
})();