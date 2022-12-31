//Indexar un xml en boo 3.1


(function() {
    var out = {};
  var myxml = "<channel>"+document.querySelector("html").innerHTML.split("</refinelist>")[1].split("</channel>")[0]+"</channel>";
  //Es importante quedarse solo con la porción XML que nos interesa antes de aplicar el parser
   //msg(myxml);  
  var parser = new DOMParser();
   var xmlDoc = parser.parseFromString(myxml, "text/xml");
  var html_jobs = xmlDoc.getElementsByTagName("item");
  var jobs = [];for(var x in html_jobs){
    if(typeof html_jobs[x] =="function") continue;
    if(typeof html_jobs[x] =="number") continue;
    var job = {};
    var elem = html_jobs[x];
    job.title = elem.getElementsByTagName("title")[0].childNodes[0].nodeValue;
    job.reqid = elem.getElementsByTagName("refNo")[0].childNodes[0].nodeValue;
    job.url = elem.getElementsByTagName("link")[0].childNodes[0].nodeValue + "?utm_source=neuvoo";
    job.dateposted_raw = elem.getElementsByTagName("pubDate")[0].childNodes[0].nodeValue;
    //job.dateposted_raw = dateAndrea(job.dateposted_raw, "/", 0, 1, 2, "...","",false);
    job.temp = 6;
    jobs.push(job);
  } 
  out["jobs"]= jobs;
  return out;
 
})();