
//ButtonMore

// Infinite pag 

(function() {
  var out = {};
  var button_more = ''; //SELECTOR DEl BOTON VER MAS JOBS
  var selector_jobs = ''; //SELECTOR DE LOS JOBS
  
  
  msg(pass_it);
  
  if (!pass_it["heights"]) 
  out["pass_it"] = { 
  "heights": [], //NUMERO DE JOBS, ESTRAIDOS POR CICLO.
  "cont": 1 
  };
   
  else out["pass_it"] = pass_it;
  
  
  out["has_next_page"] = true;
  
  //CONDICION DE EXISTENCIA DEL BOTON LOADMORE
  if (document.querySelectorAll(button_more).length > 0){
  document.querySelector(button_more).click() 
  msg('---Click al botón---');
  }else{
  out["has_next_page"] = false;
  }
  
  
  var targetPage = document.querySelectorAll(selector_jobs).length;
  
  //CONDICION DE PARADA, VALIDANDO SI LA ULTIMA POSICION DE ARRAY ES IGUAL AL TOTAL DE JOB POR CICLO
  if (out["pass_it"]["heights"][out["pass_it"]["heights"].length - 1] == document.querySelectorAll(selector_jobs).length)
  out["has_next_page"] = false;
  else {
  out.waitForFunction = {
  "function": waitForPage.toString(),
  "args": [targetPage, selector_jobs]
  };
  }
  
  //GUARDA EN LA POSICION DEL ARRAY, EL NUMERO DE JOBS EXTRAIDO POR CICLO.
  out["pass_it"]["heights"].push(document.querySelectorAll(selector_jobs).length);
  
  //ESPERA POR EL SELECTOR LOS JOBS (IMPORTANTE)
  //out.waitFor = "";
  out.pic = true;
  return out;
  })();
  
  
  function waitForPage(target, jobs) {
      var current = document.querySelectorAll(jobs).length;
      msg('Target'+parseInt(target) < 'Current'+parseInt(current));
      return parseInt(target) < parseInt(current)
  }
  


//ButtonMore1

(function() {
    var out = {};
    //out.pic=true;
    var next_page_selector = ""; 
    var clickable_elem = document.querySelector(next_page_selector);
    var perpage_actual = document.querySelector("").getAttribute("style"); 
    var selector_temp = document.querySelector("").getAttribute("style"); 
    //stop condition
    if (perpage_actual == 'display: none;') {
      //last page
      out["has_next_page"] = false;
    } else{
      //go to next page
      clickable_elem.click();
      if(selector_temp == 'display: none;') {
          msg('cargo');
      }
      else {
           out.waitFor = '';
      }
        out["pic"] = true;  
    out["has_next_page"] = true;
    }
      //try again
    out["wait"] = true;
    return out;
  })();

//ButtonMore2
(function(){
  var out = {};

  //msg(pass_it);
  if(!pass_it["heights"])	out["pass_it"] = {"heights":[]};
  else 					out["pass_it"] = pass_it;

  out["has_next_page"] = true;
  if(out["pass_it"]["heights"].length > 3){
    var last_three_heights = out["pass_it"]["heights"].slice(out["pass_it"]["heights"].length - 3); 
    if(last_three_heights[0] == last_three_heights[1] && last_three_heights[1] == last_three_heights[2])
      out["has_next_page"] = false;
  }

  //window.scrollBy(0, document.body.scrollHeight);
  var selector_button = '';
  var clickeable_element = document.querySelector(selector_button)
  if(clickeable_element){
    clickeable_element.click();
  }

  out["wait"] = true;
  out["pass_it"]["heights"].push(document.body.scrollHeight);
  return out;
})();


//Otro ButtonMore

(function() {
  	var out = {};
	var next_page_selector = ''; //selector to identify the next button
	//var last_page_selector = ""; //selector to identify the last page
 	
    var clickable_elem = document.querySelector(next_page_selector);
  
  	//stop condition
   if(clickable_elem){
      	//go to next page
    	clickable_elem.click();
      	out["has_next_page"] = true;
    } else {
      	//try again
    	out["has_next_page"] = false;
    }

  	out.waitFor = "";//Selector Jobs
  	out.pic = true;
  	out.html = true;
  	
  	return out;
})();

//Button More3

(function() {
  	var out = {};
    var selector = "";
    var partial_text = "";
  	out["has_next_page"] = false;

    var all_elems = document.querySelectorAll(selector);
    [].forEach.call(all_elems, function(elemento){
        if(out["has_next_page"]) return out;
        if(elemento.textContent.trim().indexOf(partial_text) != -1){
            elemento.click();
            out["has_next_page"] = true;
        }
    });		
	
  	out["wait"] = true;
  	return out;
})();

//Button More4

(function(){
    var out = {};
    var cli = "a[id*='umantis-selectList-btn-loadMore']"; //selector del boton more
    //if (msg == "undefined") msg = console.log;

    var bool = document.querySelector("").style.display=="none"?false:true;// Selector del ButtonMore

    if(bool){console.log(document.querySelector(cli));
      document.querySelector(cli).click();
      //msg('\x1b[43m EL boton aun existe \x1b[0m');
      out["has_next_page"] = true; 
      //clickMore(a);
    } else {
      //msg('\x1b[41m Fin de la paginacion more \x1b[0m');
      out["has_next_page"] = false;
    } 
  
    //out["wait"] = 10000;
    out["pic"] = true;
    return out;
})(); 
//Button MORE 6

(function(){
  var out = {};

  //msg(pass_it);
  if(!pass_it["heights"])	out["pass_it"] = {"heights":[]};
  else 					out["pass_it"] = pass_it;

  out["has_next_page"] = true;
  if(out["pass_it"]["heights"].length > 3){
    var last_three_heights = out["pass_it"]["heights"].slice(out["pass_it"]["heights"].length - 3); 
    if(last_three_heights[0] == last_three_heights[1] && last_three_heights[1] == last_three_heights[2])
      out["has_next_page"] = false;
  }

  //window.scrollBy(0, document.body.scrollHeight);
  var selector_button = '#show-more-button';
  var clickeable_element = document.querySelector(selector_button)
  if(clickeable_element){
    msg("Click!!!")
    clickeable_element.click();
  }

  out["wait"] = true;
  out["pass_it"]["heights"].push(document.body.scrollHeight);
  return out;
})();




//Otro
(function(){
  	var out = {};
  	
  	//msg(pass_it);
  	if(!pass_it["heights"])	out["pass_it"] = {"heights":[]};
  	else 					out["pass_it"] = pass_it;
  	
  	var noButton = document.querySelector("a.more-link.button[style='display: none;']")
  	//msg(pass_it);
    if (!noButton){
      var buttonMore = document.querySelector("a.more-link.button")
      if (buttonMore) {
       	buttonMore.click()
        out["has_next_page"] = true;
        msg(document.querySelector("a.more-link.button > span").textContent)
      }
      noButton = document.querySelector("a.more-link.button[style='display: none;']")
    } else {
      out["has_next_page"] = false;
    }
    out.wait = true;
  	return out;
})();


//Y Otro
(function() {
  var out = {};
  var clickable_elem = document.querySelector('a.more-link.button[style="display:block"]');
  var min = parseInt(document.querySelector("a.more-link.button > span").textContent.trim());

  if(clickable_elem && min > 0){
    //go to next page
    clickable_elem.click();
    out["has_next_page"] = true;
  } else {
    //try again
    out["has_next_page"] = false;
  }
  out.waitFor = "a.more-link.button";
  out['html'] = true; // Almacenar el DOM HTML
  msg('\x1b[45m Imagen aquí \x1b[45m')
  out['pic'] = true; // Tomar una captura
  return out;
})();


//Finalmente
//Es similar a next, pero este va en infinite pag, evalua la existencia del botón
(function(){
  var out = {};


  var button_next_selector  = '';
  var stop_page_selector    = '';

  var button_next_elem = document.querySelector(button_next_selector);
  var stop_page_elem = document.querySelector(stop_page_selector);
  if(stop_page_elem){
      out["has_next_page"] =  false;
  }else{
      button_next_elem.click();
      out["has_next_page"] = true;
  }
  out.waitFor = button_next_selector;
  out["wait"]= 2000;

  return out;
})();