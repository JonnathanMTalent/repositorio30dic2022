(function() {
    var out = {};  
    //trae el atributo en forma de texto con el que vamos a comparar
    var selector = document.querySelector('div[class="tile-more-results-container"]').getAttribute('style')
    out["has_next_page"] = false;
    if(selector !='display: none;'){
      //trae el selector o nodo donde se va a dar el click
      document.querySelector('#tile-more-results').click()
      out["has_next_page"] = true;
    }   
    //tiempo de espera
    out["wait"] = true;
    return out;
  })();