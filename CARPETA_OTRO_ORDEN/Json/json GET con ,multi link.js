(function() {
  var jobs = [];
  var out = {};
  var counter = 1;
  var limit = 0;
  var json;
  let codigoURL=['490','500','498']
  do {    
    var data = {};
    $.ajax({
      url : 'https://emploi.avisto.com/api/public/offers/company/'+codigoURL.shift(),
      headers: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      type : 'GET',
      data : JSON.stringify(data),
      dataType: "json",
      async : false,
      success : function(result){

        json = result;
        //limit = result.positionLimit;
        for(var i = 0; i<json.length; i++) {
          var job = {};
          var elem = json[i];
          job.title = elem.title;
          job.reqid = elem.id;
          job.source_location = elem.locality
          job.location = elem.locality.replace(/\d/g,"").replace(/[0-9]+/, "");
          job.url = "https://emploi.mecagine.com/offers/"+job.reqid+"/null/"+encodeURIComponent(job.title);    
          var posted =  elem.job_startdate.split("T").shift().split("-");
          job.dateposted_raw = posted[1]+"/"+posted[2]+"/"+posted[0]; 
          var closed = elem.expiration_date.split("T").shift().split("-");
          job.dateclosed_raw = closed[1]+"/"+closed[2]+"/"+closed[0];
          //job.source_jobtype = elem.positionOfJobtype;
          //job.source_salary = elem.positionOfSalary;         
          //job.source_empname = elem.positionOfEmpname;
          //job.logo = elem.positionOfLogo;
          //job.source_apply_email = elem.positionOfEmail;

          job.temp = "312";
          jobs.push(job);
        }
        counter = counter + 1;

      },
      error: function(error){
        //msg(error);
      }
    });
    limit=codigoURL.length
    //msg("tamaño: "+limit)
  } while (limit > 0);

  out["jobs"]= jobs;
  return out;
})();