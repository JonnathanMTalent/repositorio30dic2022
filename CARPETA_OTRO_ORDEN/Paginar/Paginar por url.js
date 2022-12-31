// Paginar por url


(function () {
  var out = {};
  var selector = "ul.ts-ol-pagination-list.PrecSuivant a";  // selector donde esta la paginacion
  var url_base = 'https://foncia-recrute.talent-soft.com/offre-de-emploi/liste-toutes-offres.aspx?page=';

  if (typeof pass_it == "undefined") pass_it = {};

  if (!pass_it["cont"]) {
    out["pass_it"] = {
      "cont": 1
    };
  } else {
    out["pass_it"] = pass_it;
  }

  out["has_next_page"] = false;
  out["pass_it"].cont += 1;

  var all_elems = document.querySelectorAll(selector);
  [].forEach.call(all_elems, function(elemento){
    if(elemento.textContent.trim() == out["pass_it"].cont){                
      var url = url_base + out["pass_it"]["cont"]; 
      window.location.href = url
      out["has_next_page"] = true;
    }
  });  

  out.waitFor = 'li.ts-offer-list-item';
  return out;
})();



//Otro

(function () {
  var out = {};
  out.waitFor = 'div[class="list-group"] a'; //COLOCAR SELECTOR POR EL CUAL ESPERAR

  var url_base = "https://iit.it/careers/openings?page="; //COLOCAR URL

  if (typeof pass_it == "undefined") pass_it = {};
  if (typeof msg == "undefined") msg = function(x){return x; };

  if (!pass_it["cont"]) {
    out["pass_it"] = {
      "cont": 2,
      "jobs": 0
    };
  } else {
    out["pass_it"] = pass_it;
  }

  var perpage_fijo = "10"; //CANTIDAD ELEMENTOS POR PAGINA
  var perpage_actual = document.querySelectorAll('div[class="list-group"] a').length; //COLOCAR SELECTOR PARA EXTRAER JOBS

  msg("perpage_fijo: "+perpage_fijo);
  msg("perpage_actual: "+perpage_actual);

  if (perpage_actual >= perpage_fijo){
    var nuevaUrl = url_base+ out["pass_it"].cont;
    out["pass_it"].cont++;
    msg("\x1b[45m URL siguiente:\x1b[45m"+nuevaUrl);
    window.location.href = nuevaUrl;
    out["has_next_page"] = true; 
  } else {
    msg('\x1b[41m NO HAY MAS PAGINA ');
    out["has_next_page"] = false;

  }

  return out;
})();