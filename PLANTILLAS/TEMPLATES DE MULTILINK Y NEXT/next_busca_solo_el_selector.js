(function() {
    var out = {};
    var selec=anclas_texto_nodo('>',0,0,'ul.PaginationLinks li a');
    //var next_page_selector = "ul.PaginationLinks li:nth-child(6) a"; //selector to identify the next button

    //var clickable_elem = document.querySelector(next_page_selector);
    var clickable_elem = selec[0];

    //stop condition
    if (!clickable_elem) {
        //last page
        out["has_next_page"] = false;
    } else {
        //go to next page
        clickable_elem.click();
        out["has_next_page"] = true;
    }
    out.waitFor = "a.jobdetail";
    return out;
})();
function anclas_texto_nodo(ancladeTexto,quitarPrimeras, quitarUltimas,grupo_etiquetas){
    // anclas_texto_nodo(string, int, int, string)
    ; // "a, p, h1, span"  PONER TODAS LAS ETIQUETAS DONDE ESTE EL SIMBOLO O TEXTO GUIA
    var anclas=[];
    var grupo=[];
    var selectores=document.querySelectorAll(grupo_etiquetas);
    
    
    for (var x in selectores){
        // console.log(etiquetas[x])
        if(selectores[x].textContent){
        if (selectores[x].textContent.indexOf(ancladeTexto) > -1) {  
            grupo.push(selectores[x]);
              }
            }
    }
    
    for(var i=0+quitarPrimeras; i < grupo.length-quitarUltimas; i++){
        anclas.push(grupo[i])
    }
    return anclas;
    }