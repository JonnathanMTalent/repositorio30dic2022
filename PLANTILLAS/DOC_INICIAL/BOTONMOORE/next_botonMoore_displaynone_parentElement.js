(function() {
    var out = {};  
    //trae el atributo en forma de texto con el que vamos a comparar
    var selector = document.querySelector('a#LoadMoreJobs').parentElement.getAttribute('style')
    //.parentElement.classList.contains(“disabled”);
    out["has_next_page"] = false;
    if(selector !='display: none;'){
      //trae el selector o nodo donde se va a dar el click
      document.querySelector('a#LoadMoreJobs').click()
      out["has_next_page"] = true;
    }   
    //tiempo de espera
    out["wait"] = true;
    return out;
  })();


  //OTRO CON OPERADOR TERNARIO:

  (function() {
    var out = {};
    var selector = document.querySelector('p:last-child a[class="more-link button"]:not([style="display: none;"])');
    selector ? (selector.click(), out.has_next_page = true) : out.has_next_page = false;
    out.wait = true;
    return out;
    })();