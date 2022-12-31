DATOS ESTRUCTURADASO,, CASO DE ICIMS CON JSON ESCONDIDO

//
if(document.querySelector('script[type="application/ld+json"]')){
  // Extract text on the script
  var html=document.querySelector('script[type="application/ld+json"]').textContent.trim().replace(/\s+/g,' ').replace(/\@/gi,"");
  //convert text to json
  var json=JSON.parse(html);
 //ORIGINAL:  var date=json.graph[1].datePublished.split("T").shift().split("-");
 var date=json.datePosted.split("T").shift().split("-");
  job.dateposted_raw=date[1]+"/"+date[2]+"/"+date[0];


  var desc=json.description;
  //job.jobdesc = removeTextBefore(job.jobdesc, 'Responsibilities', false);
  //job.jobdesc = removeTextAfter(job.jobdesc, 'Equal Employment Opportunity', true);
  //msg("Descripcion="+desc);
    
    job.html = desc;
    // msg(job.html)
    job.jobdesc = cleanHTML(desc);

}

var iframe='iframe[id="icims_content_iframe"]';
var iframedocuement=document.querySelector(iframe).contentWindow.document;
var html=iframedocuement.querySelector('script[type="application/ld+json"]').textContent.trim().replace(/\s+/g,'').replace(/\@/gi,"");
//convert text to json
var json=JSON.parse(html);


var date=json.datePosted.split("T").shift().split("-");
console.log("Date posted: "); dateposted_raw= date[1]+"/"+date[2]+"/"+date[0];

var datec=json.validThrough.split("T").shift().split("-");
console.log("Date posted: "); dateclosed_raw= datec[1]+"/"+datec[2]+"/"+datec[0];

// jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
// jjjjjjjjjjjjjjjjjjjjjjjjjFORMA 2jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj


//OTRO FORMATO DE DATOS ESTRUCTURADOS
if(document.querySelector('script[type="application/ld+json"]')){
  // Extract text on the script
  var t=JSON.parse(document.querySelector('script[type="application/ld+json"]').textContent);
  var dto=t["@graph"][2].datePublished
  //convert text to json
 //ORIGINAL:  var date=json.graph[1].datePublished.split("T").shift().split("-");
 var date=dto.split("T").shift().split("-");
  var dateposted_raw=date[1]+"/"+date[2]+"/"+date[0];
}

// jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
// jjjjjjjjjjjjjjjjjjjjjjjjjFORMA 3jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
//t["@graph"][0].datePublished

if(document.querySelector('script[type="application/ld+json"]')){
  // Extract text on the script
  var t=JSON.parse(document.querySelector('script[type="application/ld+json"]').textContent);
  var dto=t["@graph"][0].datePublished
  //convert text to json
 //ORIGINAL:  var date=json.graph[1].datePublished.split("T").shift().split("-");
 var date=dto.split("T").shift().split("-");
  var dateposted_raw=date[1]+"/"+date[2]+"/"+date[0];
}



//     ███████████████████████████████ con formatDate y limpiando las puntas del json █████████████████████████████████████  /*  
var job={};

if(document.querySelector('script[type="application/ld+json"]')){

    const formatDate = (value) => {
    let date = new Date(value);
    const withCero = n => n < 10 ? `0${n}` : n;
    return `${withCero(date.getMonth()+1)}/${withCero(date.getDate())}/${date.getFullYear()}`;
  }
  // Extract text on the script
  var t=JSON.parse(document.querySelector('script[type="application/ld+json"]').textContent.replace('/*<![CDATA[*/','[').replace('/*]]>*/',']').trim());
  var dto=t[0]["@graph"][2].datePublished

    job.dateposted_raw=formatDate(dto);
  //convert text to json
 //ORIGINAL:  var date=json.graph[1].datePublished.split("T").shift().split("-");

}

//*/// ████████████████████████████████████████████████████████████████████
