//Paginar con infinite scroll


//Infinite pagination


(function(){
  var out = {};
  var selectorscroll = 'selector_scroll';
  var selectorjobs = 'selector_jobs';

  msg(pass_it);

  if(!pass_it["heights"]) out["pass_it"] = {"heights":[]}; //CREA UN ARRAY VACIO QUE CONTENDRA KLA CANTIDAD DE JOBS POR SCROLL.
  else                    out["pass_it"] = pass_it;


  out["has_next_page"] = true;//SE ESTABLECE EL FLAG DE PAGINACION EN TRUE PARA QUE INTENTE 
  if(out["pass_it"]["heights"].length > 3){ //SI LA LONGITUD DEL ARRAY HEIGTHS ES MAYOR A 3
    var last_three_heights = out["pass_it"]["heights"].slice(out["pass_it"]["heights"].length - 3); //CREA UNA VARIABLE QUE SE QUEDA SIEMPRE CON LAS 3 ULTIMAS POSICIONES
    if(last_three_heights[0] == last_three_heights[1] && last_three_heights[1] == last_three_heights[2])//COMPARA ESAS ULTIMAS 3 POSICIONES EN CASO DE SER CIERTO ESTABLECE EL FLAG DE PAGINACION EN FALSE
      out["has_next_page"] = false;
  }


  document.querySelector(selectorscroll).scrollBy(0,document.querySelector(selectorscroll).scrollHeight)//SE HACE UN SCROLL VERTICAL EN LONGITUD DE PIXELES POR EL TAMAÑO DEL SCROLL

  //out["wait"] = true;
  //out["pic"]  = true;
  //out["html"]   = true;
  out["pass_it"]["heights"].push(document.querySelectorAll(selectorjobs).length);//SE ALMACENA EN EL ARRAY LA CANTIDAD DE JOB POR SCROLL.
  return out;
})();



//Otro scroll

(function(){​​
  var out = {​​​​​​​​​}​​​​​​​​​​​​​​​​;
  var selectorscroll = 'selector_scroll';
  var selectorjobs = 'selector_jobs';

  msg(pass_it);

  if(!pass_it["heights"]) out["pass_it"] = {​​​​​​​​​​​​​​​​"heights":[]}​​​​​​​​​​​​​​​​; //CREA UN ARRAY VACIO QUE CONTENDRA KLA CANTIDAD DE JOBS POR SCROLL.
  else                    out["pass_it"] = pass_it;
 

  out["has_next_page"] = true;//SE ESTABLECE EL FLAG DE PAGINACION EN TRUE PARA QUE INTENTE 
  if(out["pass_it"]["heights"].length > 3){​​​​​​​​​​​​​​​​ //SI LA LONGITUD DEL ARRAY HEIGTHS ES MAYOR A 3
      var last_three_heights = out["pass_it"]["heights"].slice(out["pass_it"]["heights"].length - 3); //CREA UNA VARIABLE QUE SE QUEDA SIEMPRE CON LAS 3 ULTIMAS POSICIONES
      if(last_three_heights[0] == last_three_heights[1] && last_three_heights[1] == last_three_heights[2])//COMPARA ESAS ULTIMAS 3 POSICIONES EN CASO DE SER CIERTO ESTABLECE EL FLAG DE PAGINACION EN FALSE
        out["has_next_page"] = false;
  }​​​​​​​​​​​​​​​​

 
document.querySelector(selectorscroll).scrollBy(0,document.querySelector(selectorscroll).scrollHeight)//SE HACE UN SCROLL VERTICAL EN LONGITUD DE PIXELES POR EL TAMAÑO DEL SCROLL

  //out["wait"] = true;
  //out["pic"]  = true;
  //out["html"]   = true;
  out["pass_it"]["heights"].push(document.querySelectorAll(selectorjobs).length);//SE ALMACENA EN EL ARRAY LA CANTIDAD DE JOB POR SCROLL.
  return out;
}​​​​​​​​​​​​​​​​)();


//Scroll si o si


(function () {
  var out = {};
  // Crea un div para darle altura a la pagina
  var ref = document.querySelector('div.listing__jobs'); //Selector que contiene los jobs 
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

  out["wait"] = true;
  out["pic"] = true;
  out["html"] = true;
  out["pass_it"]["heights"].push(document.querySelectorAll('article.job').length);//Selector de los JOBS
  return out;
})();