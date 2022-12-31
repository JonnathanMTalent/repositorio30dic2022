(function() {
    var out = {};
    var selector = 'a[class*="load-more-posts"]'; 
    var partial_text = "Load More Posts";  
    out["has_next_page"] = false;
    var all_elems = document.querySelectorAll(selector); 
    [].forEach.call(all_elems, function(elemento){
      if(out["has_next_page"]) return out;
      if(elemento.textContent.trim().indexOf(partial_text) != -1){
        elemento.click();
        out["has_next_page"] = true;
      }
    });     
    //tiempo de espera
    out["wait"] = true;
    return out;
  })();