// ULTIMA ACTUALIZACION:

job.dateposted_raw=dateEstructurados(div,"datePublished", "datePosted");
job.dateclosed_raw=dateEstructurados(document,"dateFinish", "dateClosed")



function dateEstructurados(contenedor,date1, date2) {
  const formatDate = (value) => {
    let date = new Date(value);
    const withCero = n => n < 10 ? `0${n}` : n;
    return `${withCero(date.getMonth()+1)}/${withCero(date.getDate())}/${date.getFullYear()}`;
  }
  
  
  if(contenedor.querySelector('script[type="application/ld+json"]')){
    // Extract text on the script
    var html=contenedor.querySelector('script[type="application/ld+json"]').textContent.trim().replace(/\s+/g,' ').replace(/\@/gi,"");
  
   var json=JSON.parse(html);
    var date=''; var dateInJsonGraph={};var dateInJsonGraph2={}; var dateInJson={}; 
  

    var tipo=0;
  //GRAPH    


  dateInJsonGraph=json['@graph']?.find(e => (e?.hasOwnProperty(date1)) || (e?.hasOwnProperty(date2)));
  if(dateInJsonGraph){ tipo=1}else{
    dateInJsonGraph2=json['graph']?.find(e => (e?.hasOwnProperty(date1)) || (e?.hasOwnProperty(date2)));
    if(dateInJsonGraph2){tipo=2} else{
        dateInJson=json;
        if(dateInJson)tipo=3;
    }
    }  

//   dateInJsonGraph? tipo=1:
//   dateInJsonGraph2? tipo=2:
//   dateInJson? tipo=3: tipo=0;

  switch (tipo) {
    case 1:
        
            dateInJsonGraph.datePosted?date=dateInJsonGraph.datePosted:
            dateInJsonGraph.datePublished?date=dateInJsonGraph.datePublished:
            date=undefined;
        
      break;
  
    case 2:
        
            dateInJsonGraph2.datePosted?date=dateInJsonGraph2.datePosted:
            dateInJsonGraph2.datePublished?date=dateInJsonGraph2.datePublished:
            date=undefined;
        
      break;
    case 3:
        dateInJson.datePosted?date=dateInJson.datePosted:
        dateInJson.datePublished?date=dateInJson.datePublished:
        date=undefined;
        break;
  
    // Se pueden incluir todos los casos que quieras
  
    default:
      msg("No se encontro el tipo de date");
  }


  
  var resultado=date?formatDate(date):undefined;
  }
  return resultado  //jjms
  }




en esta hay un formato de dateclosed_raw que no extrae
  https://www.supplychainonline.co.uk/jobs/






















var job={};


// si es un iframe poner donde esta document el iframeDocument o lo que trae todo el html
if(document.querySelector('script[type="application/ld+json"]')){

    const formatDate = (value) => {
    let date = new Date(value);
    const withCero = n => n < 10 ? `0${n}` : n;
    return `${withCero(date.getMonth()+1)}/${withCero(date.getDate())}/${date.getFullYear()}`;
  }

  // Extract text on the script
  var json=JSON.parse(document.querySelector('script[type="application/ld+json"]').textContent.trim().replace(/\s+/g,' '));   // .replace('/*<![CDATA[*/','[').replace('/*]]>*/',']').trim());


  var date=''; var dateInJson={}; 
dateInJson=json['@graph']?.find(e => (e?.hasOwnProperty("datePublished")) || (e?.hasOwnProperty("datePosted")));
dateInJson.datePosted?date=dateInJson.datePosted:
dateInJson.datePublished?date=dateInJson.datePublished:
date='no se encontro';


    job.dateposted_raw=formatDate(date);
}



// PROBADA EN CONSOLA
let job={};  // DESCOMENTAR SI SE VA A PROBAR EN CONSOLA



const formatDate = (value) => {
  let date = new Date(value);
  const withCero = n => n < 10 ? `0${n}` : n;
  return `${withCero(date.getMonth()+1)}/${withCero(date.getDate())}/${date.getFullYear()}`;
}


if(document.querySelector('script[type="application/ld+json"]')){
  // Extract text on the script
  var html=document.querySelector('script[type="application/ld+json"]').textContent.trim().replace(/\s+/g,' ').replace(/\@/gi,"");

 var json=JSON.parse(html);
  var date=''; var dateInJsonGraph={}; var dateInJson={}; 

//GRAPH    
dateInJsonGraph=json['@graph']?.find(e => (e?.hasOwnProperty("datePublished")) || (e?.hasOwnProperty("datePosted")));
if(dateInJsonGraph){
    dateInJsonGraph.datePosted?date=dateInJsonGraph.datePosted:
    dateInJsonGraph.datePublished?date=dateInJsonGraph.datePublished:
    date=undefined;
}else{
let dateInJson=json?.find(e => (e?.hasOwnProperty("datePublished")) || (e?.hasOwnProperty("datePosted")));
if(dateInJson)
{
dateInJson.datePosted?date=dateInJson.datePosted:
dateInJson.datePublished?date=dateInJson.datePublished:
date=undefined;
}
}


if(date)job.dateposted_raw=formatDate(date);  //POSTED
// if(date)job.dateclosed_raw=formatDate(date);  //CLOSED
}



///////////////////////////////////////////////////////////////////////FUNCION

// PROBADA EN CONSOLA



// busca la fecha 

function dateEstructurados(contenedor) {
  const formatDate = (value) => {
    let date = new Date(value);
    const withCero = n => n < 10 ? `0${n}` : n;
    return `${withCero(date.getMonth()+1)}/${withCero(date.getDate())}/${date.getFullYear()}`;
  }
  
  
  if(contenedor.querySelector('script[type="application/ld+json"]')){
    // Extract text on the script
    var html=contenedor.querySelector('script[type="application/ld+json"]').textContent.trim().replace(/\s+/g,' ').replace(/\@/gi,"");
  
   var json=JSON.parse(html);
    var date=''; var dateInJsonGraph={}; var dateInJson={}; 
  
  //GRAPH    
  dateInJsonGraph=json['@graph']?.find(e => (e?.hasOwnProperty("datePublished")) || (e?.hasOwnProperty("datePosted")));
  if(dateInJsonGraph){
      dateInJsonGraph.datePosted?date=dateInJsonGraph.datePosted:
      dateInJsonGraph.datePublished?date=dateInJsonGraph.datePublished:
      date=undefined;
  }else{
  let dateInJson=json?.find(e => (e?.hasOwnProperty("datePublished")) || (e?.hasOwnProperty("datePosted")));
  if(dateInJson)
  {
  dateInJson.datePosted?date=dateInJson.datePosted:
  dateInJson.datePublished?date=dateInJson.datePublished:
  date=undefined;
  }
  }
  
  var resultado=date?formatDate(date):undefined;
  }
  return resultado  //jjms
  }


falta organizar este tipo de date
//https://www.tempo-team.nl/vacatures/563559/productiemedewerker-fulltime--met-doorgroeimogelijkheden%21

  ////////////////////////////////////////dateEstructurados/////////////////////////////////////////

  // forma de declarar la funcion
  job.dateposted_raw=dateEstructurados(div,"datePublished", "datePosted");
  job.dateclosed_raw=dateEstructurados(document,"dateFinish", "dateClosed")


// busca la fecha si existe en la etiqueta script json, buscara en json y en  json['@graph'] iterando dentro de 
// estos elementos buscando una propiedad con el nombre date1 y si no lo encuentra date2 

function dateEstructurados(contenedor,date1, date2) {
  const formatDate = (value) => {
    let date = new Date(value);
    const withCero = n => n < 10 ? `0${n}` : n;
    return `${withCero(date.getMonth()+1)}/${withCero(date.getDate())}/${date.getFullYear()}`;
  }
  
  
  if(contenedor.querySelector('script[type="application/ld+json"]')){
    // Extract text on the script
    var html=contenedor.querySelector('script[type="application/ld+json"]').textContent.trim().replace(/\s+/g,' ').replace(/\@/gi,"");
  
   var json=JSON.parse(html);
    var date=''; var dateInJsonGraph={}; var dateInJson={}; 
  
  //GRAPH    
  dateInJsonGraph=json['@graph']?.find(e => (e?.hasOwnProperty(date1)) || (e?.hasOwnProperty(date2)));
  if(dateInJsonGraph){
      dateInJsonGraph.datePosted?date=dateInJsonGraph.datePosted:
      dateInJsonGraph.datePublished?date=dateInJsonGraph.datePublished:
      date=undefined;
  }else{
  let dateInJson=json?.find(e => (e?.hasOwnProperty(date1)) || (e?.hasOwnProperty(date2)));
  if(dateInJson)
  {
  dateInJson.datePosted?date=dateInJson.datePosted:
  dateInJson.datePublished?date=dateInJson.datePublished:
  date=undefined;
  }
  }
  
  var resultado=date?formatDate(date):undefined;
  }
  return resultado  //jjms
  }




  // CON SWITH CASE
 caso con el span-json en un iframe
  https://careers-berkley.icims.com/jobs/8114/data-engineer/job



organizar esta forma:  dateInJson=json           //.datePosted;
  https://deseretmanagement.wd1.myworkdayjobs.com/en-US/DeseretBook/job/Draper/Seasonal-Church-Distribution-Sales-Associate_R5129
forma 2
https://jobs.staffingfuture.com/job/2566571-short-rate-sales-london-london-united-kingdom/
  ////////////////////////////////////////dateEstructurados/////////////////////////////////////////

  // forma de declarar la funcion
  job.dateposted_raw=dateEstructurados(div,"datePublished", "datePosted");
  job.dateclosed_raw=dateEstructurados(document,"dateFinish", "dateClosed");


// busca la fecha si existe en la etiqueta script json, buscara en json y en  json['@graph'] iterando dentro de 
// estos elementos buscando una propiedad con el nombre date1 y si no lo encuentra date2 

function dateEstructurados(contenedor,date1, date2) {
  const formatDate = (value) => {
    let date = new Date(value);
    const withCero = n => n < 10 ? `0${n}` : n;
    return `${withCero(date.getMonth()+1)}/${withCero(date.getDate())}/${date.getFullYear()}`;
  }
  
  
  if(contenedor.querySelector('script[type="application/ld+json"]')){
    // Extract text on the script
    var html=contenedor.querySelector('script[type="application/ld+json"]').textContent.trim().replace(/\s+/g,' ').replace(/\@/gi,"");
  
   var json=JSON.parse(html);
    var date=''; var dateInJsonGraph={};var dateInJsonGraph2={}; var dateInJson={}; 
  

    var tipo=0;
  //GRAPH    


  dateInJsonGraph=json['@graph']?.find(e => (e?.hasOwnProperty(date1)) || (e?.hasOwnProperty(date2)));
  if(dateInJsonGraph){ tipo=1}else{
    dateInJsonGraph2=json['graph']?.find(e => (e?.hasOwnProperty(date1)) || (e?.hasOwnProperty(date2)));
    if(dateInJsonGraph2){tipo=2} else{
        dateInJson=json?.find(e => (e?.hasOwnProperty(date1)) || (e?.hasOwnProperty(date2)));
        if(dateInJson)tipo=3;
    }
    }  

    




//   dateInJsonGraph? tipo=1:
//   dateInJsonGraph2? tipo=2:
//   dateInJson? tipo=3: tipo=0;

  switch (tipo) {
    case 1:
        
            dateInJsonGraph.datePosted?date=dateInJsonGraph.datePosted:
            dateInJsonGraph.datePublished?date=dateInJsonGraph.datePublished:
            date=undefined;
        
      break;
  
    case 2:
        
            dateInJsonGraph2.datePosted?date=dateInJsonGraph2.datePosted:
            dateInJsonGraph2.datePublished?date=dateInJsonGraph2.datePublished:
            date=undefined;
        
      break;
    case 3:
        dateInJson.datePosted?date=dateInJson.datePosted:
        dateInJson.datePublished?date=dateInJson.datePublished:
        date=undefined;
        break;
  
    // Se pueden incluir todos los casos que quieras
  
    default:
      msg("No se encontro el tipo de date");
  }


  
  var resultado=date?formatDate(date):undefined;
  }
  return resultado  //jjms
  }



  document.querySelectorAll('span#icims_iframe_span')[0].querySelector("iframe").contentDocument.querySelector('script[type="application/ld+json"]')


  let job={};
  let json=document?.querySelector('span#icims_iframe_span')?.querySelector("iframe")?.contentDocument?.querySelector('script[type="application/ld+json"]');
  if(json){
  json=json.textContent.trim();
  json=JSON.parse(json);
  json=json.datePosted;
  job.dateposted_raw=json;}






  