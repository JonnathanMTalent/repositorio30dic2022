//Json post
// http://boo1.neuvoo.com/boo3-web/spider/add-step.php?style=dark&id=192291


(function() {
  var jobs = [];
  var out = {};
  var counter = 0;
  var limit = 0;
  var json;
  do {
    var data = {"query":{"sort-job_title":null,"sort-last_write_date":"DESC","filters":[]},"page":counter};
    $.ajax({
      url : 'https://mozaikrh-dvt.remo.jobs/jobs/query',
      headers: {
        "acept": "*/*",
        "Content-Type": "application/json;charset=UTF-8"
      },
      type : 'POST',
      data : JSON.stringify(data),
      dataType: "json",
      async : false,
      success : function(result){
        json = result.offers;
        limit = result.count;
        for(var i = 0; i<json.length; i++) {
          var job = {};
          var elem = json[i];
          job.title = elem.job_title;
          job.title = job.title.replace(/\(.*?\)/g, '').replace(/\[.*?\]/g, '').replace(/\<.*?\>/g, '').replace(/[0-9]/g,'').trim();
          
          if(elem.geo){
          	job.location = elem.geo[0].location;
          }else{
            job.location = "France";
          }
          
          job.location = job.location.replace(/\(.*?\)/g, '').replace(/\[.*?\]/g, '').replace(/\<.*?\>/g, '').replace(/[0-9]/g,'').trim();
          
          job.url = "https://mozaikrh-dvt.remo.jobs/jobs/offer/" + elem._id;                    
          var fecha = elem.last_write_date.split("T").shift().trim();
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
          //job.source_apply_email = elem.positionOfEmail;
         
          job.temp = "1";
          jobs.push(job);
        }
        counter = counter + 1;
      },
      error: function(error){
        msg(error);
      }
    });
  } while (counter < limit);

  out["jobs"]= jobs;
  return out;
})();