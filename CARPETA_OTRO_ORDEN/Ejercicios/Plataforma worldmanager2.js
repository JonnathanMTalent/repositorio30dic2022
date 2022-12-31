//Extract


(function() {
  var out = {};
  var html_jobs = document.querySelectorAll('ul#list > li[class*="position textColour"]');
  var jobs = [];
  for(var x in html_jobs){
    if(typeof html_jobs[x] =="function") continue;
    if(typeof html_jobs[x] =="number") continue;
    var elem = html_jobs[x];

    //Obtenemos id del jobs para buscar locations desde XML, ya que contiene multilocations
    var job_id = elem.querySelector("h2 a").href.split("id=").pop().split("&").shift().trim();
    //msg("JOB ID: "+job_id);
    //Generamos URL para obtener xml con locations
    var locationsurl = "https://bread.worldmanager.com/careers/includes/locations.php?jobID="+job_id+"&state=";
    //Abrimos url para obtener XML con locations
    var locations_xml = getDescription(locationsurl);
    var div = document.createElement("div"); 
    div.innerHTML = locations_xml;
    //msg("LOCATIONS XML: "+locations_xml);
    var locations = div.getElementsByTagName('marker');
    //Validamos si el XML no contiene data e insertamos el job con location principal
    if(locations.length === 0){
      var loc = elem.querySelector("span.LocationNameColour").textContent.replace(/ *\([^)]*\) *|Location:|- \d{4}|\d Locations|DFO/g, "").trim();
      var job = {};
      job.title = elem.querySelector("h2 a").textContent.trim();
      job.url = elem.querySelector("h2 a").href.trim()+"&utm_source=neuvoo";
      //var location = location.querySelector("strong").textContent.replace(/ *\([^)]*\) *|Location:|- \d{4}|\d Locations/g, "").trim();
      job.location = (loc) ? loc+", Australia" : "Hobart, Australia";
      job.temp = 1;
      jobs.push(job);
    }
    //Bucle para insertar jobs segun cantidad de locations
    for (var l in locations) { 
      if(typeof locations[l] =="function") continue;
      if(typeof locations[l] =="number") continue;
      var city = locations[l].getAttribute('city').trim();
      var state = locations[l].getAttribute('state').trim();
      var loc = "";
      var array_loc = Array();

      if(city) array_loc.push(city);
      if(state) array_loc.push(state);

      if(array_loc.length) loc = array_loc.join(", ");
      //msg("LOC: "+loc);


      var job = {};
      job.title = elem.querySelector("h2 a").textContent.split(/- Banjo|-Banjo|Banjo/).shift().trim();
      job.url = elem.querySelector("h2 a").href.trim()+"&utm_source=neuvoo";
      //var location = location.querySelector("strong").textContent.replace(/ *\([^)]*\) *|Location:|- \d{4}|\d Locations/g, "").trim();
      job.location = (loc) ? loc+", Australia" : "Adelaide, Australia";
      job.temp = 1;
      jobs.push(job);
    } 
  }
  out["jobs"]= jobs;
  return out;
})();

function getDescription(url) {
  msg("GET LOCATIONS");
  var xhrrequest = new XMLHttpRequest();
  xhrrequest.open("GET", url, false); //URL del ajax que trae la información del job

  var response = "";
  xhrrequest.onreadystatechange = function() {
    if(xhrrequest.readyState == 4 && xhrrequest.status == 200) 
    {
      //console.log(xhrrequest.responseText);
      response = xhrrequest.responseText;
    }
  };

  xhrrequest.send(); 
  return response;
}



