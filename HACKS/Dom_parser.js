//EN UN JSON PARA PASEARLO EJ


json = result;
  
var js_string 	     = json;
var htmlObject       = document.createElement("div");
htmlObject.innerHTML = js_string

  
parser = new DOMParser();
htmlObject = parser.parseFromString(js_string, "text/html");
html_jobs = htmlObject.querySelectorAll('div.row'); 

  

totalPages = Number(htmlObject.querySelector('h2.iCIMS_SubHeader.iCIMS_SubHeader_Jobs').innerText.split(" of ").pop().trim());