//Paginar preguntando por selector next


(function () {
  var out = {};
  var selector = "tbody nobr a";  // selector donde esta la paginacion
  var texto = 'Next';  //parte del texto (siguiente)
  out["has_next_page"] = false;

  var all_elems = document.querySelectorAll(selector);
  [].forEach.call(all_elems, function(elemento){
    if(elemento.textContent.trim().indexOf("Next")>-1){                
      //msg("click!!!!!"+elemento.textContent.trim());
      elemento.click();
      out["has_next_page"] = true;
    }
  });  

  out.waitFor = 'tbody nobr a';
  return out;
})()