var full_html = getHTML(job.url);
var div = document.createElement("div");
div.innerHTML = full_html
job.reqid = Contains(div.querySelectorAll('p'), 'Req ID:').split(':').pop().trim();
// ANTERIOR :  Ejemplos lineas arriba


//poner abajo de la funcion autoejecutable:
function getHTML(url){
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url, false)
    let response = "";
    xhr.onload = () =>{
      if(xhr.status == 200)
        response = xhr.responseText;
    }
    xhr.send();
    return response
  }