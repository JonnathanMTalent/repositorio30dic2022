//  Organizar fecha en el extract


//Fecha extraida como atributo

var posted = elem.querySelector("").getAttribute("datetime").split("-");
    job.dateposted_raw = posted[1] +'/'+ posted[2] +'/'+ posted[0];

    if(elem.querySelector("span.open-date > time")){
        var posted = elem.querySelector("span.open-date > time").getAttribute("datetime").split("T").shift().trim();
        posted = posted.split("-");
        job.dateposted_raw = posted[1] +'/'+ posted[2] +'/'+ posted[0];
    }

    
if(elem.querySelector("span.open-date > time")){
    var closed = elem.querySelector("span.open-date > time").getAttribute("datetime").split("T").shift().trim();
    closed = closed.split("-");
    job.dateclosed_raw = closed[1] +'/'+ closed[2] +'/'+ closed[0];
}


//Extraer y organizar fecha

if(elem.querySelector("")){
    var posted = elem.querySelector("").textContent.trim().split("/");
    job.dateposted_raw = posted[1] +'/'+ posted[0] +'/'+ posted[2];
}

if(elem.querySelector("")){
    var closed = elem.querySelector("td:nth-child(1)").textContent.trim().split("/");
    job.dateclosed_raw = closed[1] +'/'+ closed[0] +'/'+ closed[2];
}


var posted = elem.querySelector("").textContent.trim();
    posted = posted.split("");
    job.dateposted_raw = posted[1] +'/'+ posted[0] +'/'+ posted[2];



//Dateposted validando si existe


if(elem.querySelector("")){
    var posted = elem.querySelector("").textContent.trim();
    
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

    posted = posted.replace(/January/gi,"/01/").replace(/February/gi,"/02/").replace(/March/gi,"/03/").trim();
    posted = posted.replace(/April/gi,"/04/").replace(/May/gi,"/05/").replace(/June/gi,"/06/").trim();
    posted = posted.replace(/July/gi,"/07/").replace(/August/gi,"/08/").replace(/September/gi,"/09/").trim();
    posted = posted.replace(/October/gi,"/10/").replace(/November/gi,"/11/").replace(/December/gi,"/12/").trim();

    posted = posted.replace(/January/gi,"01").replace(/February/gi,"02").replace(/March/gi,"03").trim();
    posted = posted.replace(/April/gi,"04").replace(/May/gi,"05").replace(/June/gi,"06").trim();
    posted = posted.replace(/July/gi,"07").replace(/August/gi,"08").replace(/September/gi,"09").trim();
    posted = posted.replace(/October/gi,"10").replace(/November/gi,"11").replace(/December/gi,"12").trim();

    posted = posted.replace(/Jan/gi,"01").replace(/Feb/gi,"02").replace(/Mar/gi,"03").trim();
    posted = posted.replace(/Apr/gi,"04").replace(/May/gi,"05").replace(/Jun/gi,"06").trim();
    posted = posted.replace(/Jul/gi,"07").replace(/Aug/gi,"08").replace(/Sep/gi,"09").trim();
    posted = posted.replace(/Oct/gi,"10").replace(/Nov/gi,"11").replace(/Dec/gi,"12").trim();

    posted = posted.replace(" January ","/01/").replace(" February ","/02/").replace(" March ","/03/").trim();
    posted = posted.replace(" April ","/04/").replace(" May ","/05/").replace(" June ","/06/").trim();
    posted = posted.replace(" July ","/07/").replace(" August ","/08/").replace(" September ","/09/").trim();
    posted = posted.replace(" October ","/10/").replace(" November ","/11/").replace(" December ","/12/").trim();

    posted = posted.replace("Monday","").trim();
    posted = posted.replace("Tuesday","").trim();
    posted = posted.replace("Wednesday","").trim(); 
    posted = posted.replace("Thursday","").trim();
    posted = posted.replace("Friday","").trim();
    posted = posted.replace("Saturday","").trim();
    posted = posted.replace("Sunday","").trim();


    posted = posted.replace("Mon","").trim();
    posted = posted.replace("Tue","").trim();
    posted = posted.replace("Wed","").trim(); 
    posted = posted.replace("Thu","").trim();
    posted = posted.replace("Fri","").trim();
    posted = posted.replace("Sat","").trim();
    posted = posted.replace("Sun","").trim();


    posted = posted.replace("st","").trim();
    posted = posted.replace("nd","").trim();
    posted = posted.replace("rd","").trim();
    posted = posted.replace("th","").trim();

    posted = posted.split("/");
    
    job.dateposted_raw = posted[1] +'/'+ posted[0] +'/'+ posted[2];
}



//Dateclosed validando si existe


if(elem.querySelector("")){
    var closed = elem.querySelector("").textContent.trim();
    
    closed = closed.replace(" Jan ","/01/").trim();
    closed = closed.replace(" Feb ","/02/").trim();
    closed = closed.replace(" Mar ","/03/").trim(); 
    closed = closed.replace(" Apr ","/04/").trim();
    closed = closed.replace(" May ","/05/").trim();
    closed = closed.replace(" Jun ","/06/").trim();
    closed = closed.replace(" Jul ","/07/").trim();
    closed = closed.replace(" Aug ","/08/").trim();
    closed = closed.replace(" Sep ","/09/").trim();
    closed = closed.replace(" Oct ","/10/").trim();
    closed = closed.replace(" Nov ","/11/").trim();
    closed = closed.replace(" Dec ","/12/").trim();

    closed = closed.replace(/January/gi,"/01/").replace(/February/gi,"/02/").replace(/March/gi,"/03/").trim();
    closed = closed.replace(/April/gi,"/04/").replace(/May/gi,"/05/").replace(/June/gi,"/06/").trim();
    closed = closed.replace(/July/gi,"/07/").replace(/August/gi,"/08/").replace(/September/gi,"/09/").trim();
    closed = closed.replace(/October/gi,"/10/").replace(/November/gi,"/11/").replace(/December/gi,"/12/").trim();

    closed = closed.replace(/January/gi,"01").replace(/February/gi,"02").replace(/March/gi,"03").trim();
    closed = closed.replace(/April/gi,"04").replace(/May/gi,"05").replace(/June/gi,"06").trim();
    closed = closed.replace(/July/gi,"07").replace(/August/gi,"08").replace(/September/gi,"09").trim();
    closed = closed.replace(/October/gi,"10").replace(/November/gi,"11").replace(/December/gi,"12").trim();

    closed = closed.replace(/Jan/gi,"01").replace(/Feb/gi,"02").replace(/Mar/gi,"03").trim();
    closed = closed.replace(/Apr/gi,"04").replace(/May/gi,"05").replace(/Jun/gi,"06").trim();
    closed = closed.replace(/Jul/gi,"07").replace(/Aug/gi,"08").replace(/Sep/gi,"09").trim();
    closed = closed.replace(/Oct/gi,"10").replace(/Nov/gi,"11").replace(/Dec/gi,"12").trim();

    closed = closed.replace("Monday","").trim();
    closed = closed.replace("Tuesday","").trim();
    closed = closed.replace("Wednesday","").trim(); 
    closed = closed.replace("Thursday","").trim();
    closed = closed.replace("Friday","").trim();
    closed = closed.replace("Saturday","").trim();
    closed = closed.replace("Sunday","").trim();

    closed = closed.replace("st","").trim();
    closed = closed.replace("nd","").trim();
    closed = closed.replace("rd","").trim();
    closed = closed.replace("th","").trim();

    closed = closed.split("/");
    
    job.dateclosed_raw = closed[1] +'/'+ closed[0] +'/'+ closed[2];
}



if(elem.querySelector('Selector de la fecha')){
    var posted = elem.querySelector('Selector de la fecha').textContent.trim();

    posted = posted.replace(/January/gi,"01").replace(/February/gi,"02").replace(/March/gi,"03");
    posted = posted.replace(/April/gi,"04").replace(/May/gi,"05").replace(/June/gi,"06");
    posted = posted.replace(/July/gi,"07").replace(/August/gi,"08").replace(/September/gi,"09");
    posted = posted.replace(/October/gi,"10").replace(/November/gi,"11").replace(/December/gi,"12");
    posted = posted.split("/");
    
    if(!posted.includes("2020")){
        posted = posted.concat("2020");
    }

    job.dateposted_raw = posted[1] +'/'+ posted[0] +'/'+ posted[2];
}



    if(posted[1].indexOf("Jan") > -1){posted[1] = "01";}
    if(posted[1].indexOf("Feb") > -1){posted[1] = "02";}
    if(posted[1].indexOf("Mar") > -1){posted[1] = "03";}
    if(posted[1].indexOf("Apr") > -1){posted[1] = "04";}
    if(posted[1].indexOf("May") > -1){posted[1] = "05";}
    if(posted[1].indexOf("Jun") > -1){posted[1] = "06";}
    if(posted[1].indexOf("Jul") > -1){posted[1] = "07";}
    if(posted[1].indexOf("Aug") > -1){posted[1] = "08";}
    if(posted[1].indexOf("Sep") > -1){posted[1] = "09";}
    if(posted[1].indexOf("Oct") > -1){posted[1] = "10";}
    if(posted[1].indexOf("Nov") > -1){posted[1] = "11";}
    if(posted[1].indexOf("Dec") > -1){posted[1] = "12";}




var closed = $(this).find("td:nth-child(5)").text().trim();
    //job.dateclosed_raw = $(this).find("td:nth-of-type(5)").html().split("<br>")[0].trim().split("-");
    if(closed.indexOf("20")>-1){
      var fecha = $(this).find("td:nth-of-type(5)").html().split("<br>")[0].trim().split("-");
      job.dateclosed_raw = fecha[1]+'/'+fecha[2]+'/'+fecha[0];   
      job.dateclosed_raw = job.dateclosed_raw.replace("Remains open until filled", "");
    }



//Organizar fecha en frances


if(elem.querySelector("")){
    var posted = elem.querySelector("").textContent.trim();

    posted = posted.replace(" janvier ","/01/").trim();
    posted = posted.replace(" février ","/02/").trim();
    posted = posted.replace(" mars ","/03/").trim(); 
    posted = posted.replace(" avril ","/04/").trim();
    posted = posted.replace(" mai ","/05/").trim();
    posted = posted.replace(" juin ","/06/").trim();
    posted = posted.replace(" juillet ","/07/").trim();
    posted = posted.replace(" août ","/08/").trim();
    posted = posted.replace(" septembre ","/09/").trim();
    posted = posted.replace(" octobre ","/10/").trim();
    posted = posted.replace(" novembre ","/11/").trim();
    posted = posted.replace(" décembre ","/12/").trim();
    posted = posted.split("/");

    job.dateposted_raw = posted[1] +'/'+ posted[0] +'/'+ posted[2];
}
if(document.querySelector("h3.general-page__date-start")){
  var posted = document.querySelector("h3.general-page__date-start").textContent.trim();
  posted = posted.replace(/janvier/gi,"01").replace(/février/gi,"02").replace(/mars/gi,"03").trim();
  posted = posted.replace(/avril/gi,"04").replace(/mai/gi,"05").replace(/juin/gi,"06").trim();
  posted = posted.replace(/juillet/gi,"07").replace(/août/gi,"08").replace(/septembre/gi,"09").trim();
  posted = posted.replace(/octobre/gi,"10").replace(/novembre/gi,"11").replace(/décembre/gi,"12").trim();
  posted = posted.split(" ");
  job.dateposted_raw = posted[1] +'/'+ posted[0] +'/'+ posted[2];
}

if(document.querySelector("h3.general-page__date-start")){
  var posted = document.querySelector("h3.general-page__date-start").textContent.trim();
  posted = posted.replace(/jan/gi,"01").replace(/fév/gi,"02").replace(/mar/gi,"03").trim();
  posted = posted.replace(/avr/gi,"04").replace(/mai/gi,"05").replace(/jui/gi,"06").trim();
  posted = posted.replace(/juil/gi,"07").replace(/août/gi,"08").replace(/sep/gi,"09").trim();
  posted = posted.replace(/oct/gi,"10").replace(/nov/gi,"11").replace(/déc/gi,"12").trim();
  posted = posted.split(" ");
  job.dateposted_raw = posted[1] +'/'+ posted[0] +'/'+ posted[2];
}


//En aleman


if(document.querySelector("h3.general-page__date-start")){
    var posted = document.querySelector("h3.general-page__date-start").textContent.trim();
    posted = posted.replace(/Januar/gi,"01").replace(/Februar/gi,"02").replace(/März/gi,"03").trim();
    posted = posted.replace(/April/gi,"04").replace(/Mai/gi,"05").replace(/juni/gi,"06").trim();
    posted = posted.replace(/juli/gi,"07").replace(/August/gi,"08").replace(/september/gi,"09").trim();
    posted = posted.replace(/Oktober/gi,"10").replace(/november/gi,"11").replace(/Dezember/gi,"12").trim();
    posted = posted.split(" ");
    job.dateposted_raw = posted[1] +'/'+ posted[0] +'/'+ posted[2];
  }


  //En neerlandes

for(const a of temp_html.querySelectorAll('h3.et_pb_module_header')) {
    if (a.textContent.includes('Sluitingsdatum')) {
      var closed = a.nextElementSibling.textContent.trim();
      closed = closed.replace(/januari/gi,"01").replace(/februari/gi,"02").replace(/maart/gi,"03").trim();
      closed = closed.replace(/april/gi,"04").replace(/mei/gi,"05").replace(/juni/gi,"06").trim();
      closed = closed.replace(/juli/gi,"07").replace(/augustus/gi,"08").replace(/september/gi,"09").trim();
      closed = closed.replace(/oktober/gi,"10").replace(/november/gi,"11").replace(/december/gi,"12").trim();
      closed = closed.split(" ");
      job.dateclosed_raw = closed[1] +'/'+ closed[0] +'/'+ closed[2];
    }
  }

  if(elem.querySelector("span.meta > span:nth-child(2)")){
    var posted = elem.querySelector("span.meta > span:nth-child(2)").textContent.trim().replace("Gepubliceerd op:","").trim();
    posted = posted.replace(/januari/gi,"01").replace(/februari/gi,"02").replace(/maart/gi,"03").trim();
    posted = posted.replace(/april/gi,"04").replace(/mei/gi,"05").replace(/juni/gi,"06").trim();
    posted = posted.replace(/juli/gi,"07").replace(/augustus/gi,"08").replace(/september/gi,"09").trim();
    posted = posted.replace(/oktober/gi,"10").replace(/november/gi,"11").replace(/december/gi,"12").trim();
    posted = posted.split(" ");
    job.dateposted_raw = posted[1] +'/'+ posted[0] +'/'+ posted[2];
  }


  //Italiano

  if(document.querySelector("h3.general-page__date-start")){
    var posted = document.querySelector("h3.general-page__date-start").textContent.trim();
    posted = posted.replace(/gennaio/gi,"01").replace(/febbraio/gi,"02").replace(/marzo/gi,"03").trim();
    posted = posted.replace(/aprile/gi,"04").replace(/maggio/gi,"05").replace(/giugno/gi,"06").trim();
    posted = posted.replace(/luglio/gi,"07").replace(/agosto/gi,"08").replace(/settembre/gi,"09").trim();
    posted = posted.replace(/ottobre/gi,"10").replace(/novembre/gi,"11").replace(/dicembre/gi,"12").trim();
    posted = posted.split(" ");
    job.dateposted_raw = posted[1] +'/'+ posted[0] +'/'+ posted[2];
  }


  // Ruso

  if(document.querySelector("h3.general-page__date-start")){
    var posted = document.querySelector("h3.general-page__date-start").textContent.trim();
    posted = posted.replace(/Январь/gi,"01").replace(/Февраль/gi,"02").replace(/Март/gi,"03").trim();
    posted = posted.replace(/Апрель/gi,"04").replace(/Май/gi,"05").replace(/Июнь/gi,"06").trim();
    posted = posted.replace(/Июль/gi,"07").replace(/Август/gi,"08").replace(/Сентябрь/gi,"09").trim();
    posted = posted.replace(/Октябрь/gi,"10").replace(/Ноябрь/gi,"11").replace(/Декабрь/gi,"12").trim();
    posted = posted.replace(",","").split(" ");
    job.dateposted_raw = posted[0] +'/'+ posted[1] +'/'+ posted[2];
  }





  //Concatenar año al final

  function meses(fecha){
    var today = new Date();
    var aux = fecha.split(" ")[0];
    var day = fecha.split(" ")[1];
    var year = today.getFullYear();
    //nombre de los meses en el idioma que necesites
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var fecha = (months.indexOf(aux)+1)+"/"+day+"/"+year;
    return fecha;
  }