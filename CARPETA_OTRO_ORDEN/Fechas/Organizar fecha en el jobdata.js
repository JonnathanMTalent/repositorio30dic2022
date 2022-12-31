//Organizar fecha en el jobdata


var posted = document.querySelector("td:nth-child(1)").textContent.trim().split("/");
job.dateposted_raw = posted[1] +'/'+ posted[0] +'/'+ posted[2];


var closed = document.querySelector("td:nth-child(1)").textContent.trim().split("/");
job.dateclosed_raw = closed[1] +'/'+ closed[0] +'/'+ closed[2];


//Fecha extraida como atributo


var posted = document.querySelector("").getAttribute("datetime").split("-");
job.dateposted_raw = posted[1] +'/'+ posted[2] +'/'+ posted[0];


//Extraer y organizar fecha

var posted = document.querySelector("").textContent.trim();
    posted = posted.split("");
    job.dateposted_raw = posted[1] +'/'+ posted[0] +'/'+ posted[2];



    if (document.querySelector("#job-content > p > span.open-date > time")){
        var posted = document.querySelector("#job-content > p > span.open-date > time").getAttribute("datetime").trim();
        posted = posted.split("T").shift().trim().split("-");
        job.dateposted_raw = posted[1] +'/'+ posted[2] +'/'+ posted[0];
    }
    

    if (document.querySelector("#job-content > p > span.close-date > time")){
        var closed = document.querySelector("#job-content > p > span.close-date > time").getAttribute("datetime").trim();
        closed = closed.split("T").shift().trim().split("-");
        job.dateclosed_raw = closed[1] +'/'+ closed[2] +'/'+ closed[0];
    }




//Dateposted validando si existe


if(document.querySelector("")){
    var posted = document.querySelector("").textContent.trim();
    
    posted = posted.replace(" Jan ","/01/").trim();
    posted = posted.replace(" Feb ","/02/").trim();
    posted = posted.replace(" Mar ","/03/").trim(); 
    posted = posted.replace(" Apr ","/04/").trim();
    posted = posted.replace(" May ","/05/").trim();
    posted = posted.replace(" Jun ","/06/").trim();
    posted = posted.replace(" Jul ","/07/").trim();
    posted = posted.replace(" Aug ","/08/").trim();
    posted = posted.replace(" Sep ","/09/").trim();
    posted = posted.replace(" Oct ","/10/").trim();
    posted = posted.replace(" Nov ","/11/").trim();
    posted = posted.replace(" Dec ","/12/").trim();

    posted = posted.replace("st","").trim();
    posted = posted.replace("nd","").trim();
    posted = posted.replace("rd","").trim();
    posted = posted.replace("th","").trim();

    posted = posted.split("/");
    
    job.dateposted_raw = posted[1] +'/'+ posted[0] +'/'+ posted[2];
}