//Url: https://joinus.decathlon.fr/fr/annonces

//Extract

(function (){
  var jobs = [];
  var out = {};
  var cont = 0;
  var json;

  var seguir = true;
  do{
    /* var data = {
      "area":"", 
      "sector": "",
      "salary":"", 
      "type": "", 
      "ordering": "relevance",
      "Itemid": 986,
      "cid": "",
      "jobs_scope": "external"

    };*/
    $.ajax({
      url : "https://joinus.decathlon.fr/fr/careers-sites/job-ads-more/12912/0/"+cont+"/0?reset=0&filters=%7B%22_last%22%3Anull%2C%22brands%22%3A%7B%22brand%22%3A%5B%5D%2C%22mark%22%3A%5B%5D%7D%2C%22loc%22%3A0%2C%22service%22%3Anull%2C%22contract%22%3Anull%2C%22workingTime%22%3Anull%2C%22bbox%22%3Anull%7D",
      headers: {                                                      
        "accept": "application/json, text/plain, */*",
        "Content-Type":"application/json"    // 2) headers
      },
      type: 'GET',                                        // 3 tipo
      // 4 data que retorna
      //data: data,
      //data: JSON.stringify(data),
      async: false,
      success: function (result) {
        msg("\x1b[45m loading jobs...");
        json = result.jobAds;


        var stop = json;

        if(stop.length < 1){
          seguir = false;
        }

        for(var i = 0; i<json.length; i++) {
          var job = {};

          job.title = json[i].title;
          var ID = json[i].id;
          //var loc = result.joined.addressByJobAd[ID];
          //job.location = result.joined.address[loc]["formatted"].replace(/\d/g,"").trim()+', FR';
          var loc = json[i].address_id;
          job.location = result.joined.address[loc]["formatted"].replace(/\d/g,"").trim()+', FR'; 

          var type= json[i].contract_type_id;
          job.source_jobtype = result.joined.contract_type[type];
          job.url = result.joined.apply_url[ID]; 
          for( var j in result.joined.apply_url[ID]){
            job.url =  result.joined.apply_url[ID][j];
          }
          /*  var fecha = json[i].
                                    fecha = fecha.split(" ")[0].split("-");
                                    job.dateposted_raw =  fecha[1]+'/'+fecha[2]+'/'+fecha[0];*/
          job.temp = 1;
          jobs.push(job);
        }
        cont += 20;
      },
      error: function (error) {
        msg(error);
      }
    });
  } while (seguir == true);                                 // 6) condicion de parada
  out["jobs"] = jobs;
  return out;
})();