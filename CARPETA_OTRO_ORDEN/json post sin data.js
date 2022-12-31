// json post sin data

(function() {
  var jobs = [];
  var out = {};
  //var counter = 0;
  //var limit = 0;
  var json;
  // do {
  //var data = {};
  $.ajax({
    url : 'https://api.talentclue.com/jswidget-ajax/jswidget/jobs/468145b661f6e1b17a96cb8e08f51ad8/eyJvcCI6MSwicG9zaXRpb24iOltdLCJjZGVmIjoiMzYyIiwic3VicyI6IjAiLCJsYW5nIjoiY2EiLCJpbmR1c3RyeSI6W119',
    headers: {
      "accept": "application/json",
      "accept-language": "es-419,es;q=0.9",
      "content-type": "application/json",
      "sec-ch-ua": "\"Chromium\";v=\"92\", \" Not A;Brand\";v=\"99\", \"Google Chrome\";v=\"92\"",
      "sec-ch-ua-mobile": "?0",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "cross-site",
      "x-requested-with": "XMLHttpRequest"
    },
    type : 'POST',
    //data : JSON.stringify(data),
    dataType: "json",
    async : false,
    success : function(result){

      msg("loading jobs...")

      //json = result.jobs;

      Object.entries(result).forEach(([key, value]) => {
        json = value;
      });


      let fun_result = Object.values(json)  
      //msg(fun_result);    
      //let claves = Object.keys(result.jobs)

      //g(fun_result);

      //json = fun_result.jobs

      //msg(claves)
      //limit = result.count;
      for(var i = 0; i< fun_result.length; i++) {
        var job = {};
        var elem = fun_result[i];
        job.title = elem.title;
        job.title = job.title.replace(/\(.*?\)/g, '').replace(/\[.*?\]/g, '').replace(/\<.*?\>/g, '').replace(/[0-9]/g,'').trim();


        if(elem.city != ""){
          job.location = elem.city + ", " + elem.country_iso;
        }else{
        	job.location = elem.country_iso;
        }
        job.url = elem.url;                 
        /* var fecha = elem.last_write_date.split("T").shift().trim();
        fecha = fecha.split("-");
        job.dateposted_raw = fecha[1] +'/'+ fecha[2] +'/'+ fecha[0];

        //job.dateclosed_raw = elem.positionOfDateClosed;
        if(elem.company){
          job.source_empname = elem.company;
        }else{
          job.source_empname = "Mozaïk RH";
        }
        job.source_empname = job.source_empname.replace("-","Mozaïk RH").trim();

        job.source_jobtype = elem.contract[0];
        //job.source_salary = elem.positionOfSalary;
        //job.logo = elem.positionOfLogo;
        //job.source_apply_email = elem.positionOfEmail;*/

        job.temp = "1";
        jobs.push(job);
      }
      // counter = counter + 1;
    },
    error: function(error){
      msg(error);
    }
  });
  // } while (counter < limit);

  out["jobs"]= jobs;
  return out;
})();

//Ejemplo  epresect
// json post sin data

(function() {
    var jobs = [];
    var out = {};
    //var counter = 0;
    //var limit = 0;
    var json;
    // do {
    //var data = {};
    $.ajax({
      url : 'https://api.talentclue.com/jswidget-ajax/jswidget/jobs/ee0417aeb440dc3ed34ff4ac1c53d2e2/eyJvcCI6MSwicG9zaXRpb24iOltdLCJjZGVmIjpmYWxzZSwic3VicyI6IjAiLCJsYW5nIjoiZXMiLCJpbmR1c3RyeSI6W119',
      headers: {
        "accept": "application/json",
        "accept-language": "es-419,es;q=0.9",
        "content-type": "application/json",
        "sec-ch-ua": "\"Chromium\";v=\"92\", \" Not A;Brand\";v=\"99\", \"Google Chrome\";v=\"92\"",
        "sec-ch-ua-mobile": "?0",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "cross-site",
        "x-requested-with": "XMLHttpRequest"
      },
      type : 'POST',
      //data : JSON.stringify(data),
      dataType: "json",
      async : false,
      success : function(result){
  
        msg("loading jobs...")
  
        //json = result.jobs;
  
        Object.entries(result).forEach(([key, value]) => {
          json = value;
        });
  
  
        let fun_result = Object.values(json)  
        //msg(fun_result);    
        //let claves = Object.keys(result.jobs)
  
        //g(fun_result);
  
        //json = fun_result.jobs
  
        //msg(claves)
        //limit = result.count;
        for(var i = 0; i< fun_result.length; i++) {
          var job = {};
          var elem = fun_result[i];
          job.title = elem.title;
          job.title = job.title.replace(/\(.*?\)/g, '').replace(/\[.*?\]/g, '').replace(/\<.*?\>/g, '').replace(/[0-9]/g,'').trim();
  
  
          if(elem.city != ""){
            job.location = elem.city + ", " + elem.country_iso;
          }else{
            job.location = elem.country_iso;
          }
          job.url = elem.url;  
          job.reqid = job.url.split("/")[5];
          var fecha = elem.post_date.split("/");
          job.dateposted_raw = fecha[1] +'/'+ fecha[0] +'/'+ fecha[2];
  
          //job.dateclosed_raw = elem.positionOfDateClosed;
          /* if(elem.company){
            job.source_empname = elem.company;
          }else{
            job.source_empname = "Mozaïk RH";
          }
          job.source_empname = job.source_empname.replace("-","Mozaïk RH").trim();*/
  
          var contract = elem.contract_label;
          var jornada = elem.shift_label;
          if(contract) {
            if(jornada)  {
              job.source_jobtype = contract+", "+jornada;
            }
            else {
              job.source_jobtype = contract; 
            }
          }
          else {
            if(jornada) {
              job.source_jobtype = jornada; 
            }
          }
  
  
          //job.source_salary = elem.positionOfSalary;
          //job.logo = elem.positionOfLogo;
          //job.source_apply_email = elem.positionOfEmail;*/
  
          job.temp = "12";
          if(job.title.indexOf("TRABAJA CON NOSOTROS")==-1)
          {
            jobs.push(job);
          }
        }
        // counter = counter + 1;
      },
      error: function(error){
        msg(error);
      }
    });
    // } while (counter < limit);
  
    out["jobs"]= jobs;
    return out;
  })();