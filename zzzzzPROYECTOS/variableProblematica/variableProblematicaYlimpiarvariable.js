function variableCondicionada(selector,contenedor,alternativa,){
    var valor;

    if(contenedor.querySelector(selector)){
        valor=contenedor.querySelector(selector).textContent.trim();
    }else{
        valor=alternativa;
    }

    return valor;
}
USAR
.getAttribute('data-href');








function limpialinks(limpiar){
    
    
    
    const remove_selectors = [
        'a',
        'img',
        'svg',
        'video',
        'button',
        'input',
        'style',
        'javascript',
        'script',
    ];
    
    if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {
        if (limpiar.querySelector(remove_selector)) limpiar.querySelector(remove_selector).remove();
    });
    
    


    if(limpiar.indexOf('@')>-1){
        var eliminar = limpiar.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi).join('\n');
        limpiar = limpiar.replace(eliminar,'');
      }
    
      if (limpiar.indexOf('https') > -1) { limpiar = limpiar.replace(/(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,""); }
      if (limpiar.indexOf('http') > -1)  { limpiar = limpiar.replace(/(http?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,"");  } 
      if (limpiar.indexOf('HTTPS') > -1) { limpiar = limpiar.replace(/(HTTPS?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,""); }
      if (limpiar.indexOf('HTTP') > -1)  { limpiar = limpiar.replace(/(HTTP?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,"");  }
      if (limpiar.indexOf('www') > -1)  { limpiar = limpiar.replace(/(www?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,"");  }
    limpiar = limpiar.replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '').trim();
    

    
    let limpiado=limpiar;

    return limpiado
}