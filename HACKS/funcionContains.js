//ejemplo
job.reqid = Contains(div.querySelectorAll('p'), 'Req ID:').split(':').pop().trim();

//poner avajo de la funcion autoejecutable
function Contains(elementos, texto) { 
    let result = "";
    elementos.forEach(a => { if (a.textContent.includes(texto)) result = a.textContent})
    return result;
  }