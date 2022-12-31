//Json GET, petición en el extract y en el jobdata

//URL: https://secure3.saashr.com/ta/6027032.careers?CareersSearch
//Scanid = http://boo1.neuvoo.com/boo3-web/spider/add-step.php?style=dark&id=194300


(function () {
  var jobs = [];
  var out = {};
  // var cont = 1;
  var json;
  //var ToKen;
  //do {
  //var data = ;

  $.ajax({ // URL - JSON GET 

    url: 'https://secure3.saashr.com/ta/rest/ui/recruitment/companies/%7C6027032/job-requisitions?offset=0&ein_id=&_=1602201838475', // 1) url

    headers: {    

      "Accept": "application/json, text/javascript, */*; q=0.01",
      "Content-Type":"application/json;charset=UTF-8"                               // 2) headers

    },

    type: 'GET',                                                                      // 3) tipo
    dataType: "json",                                                                 // 4) data que retorna
    //data: data,
    //data: JSON.stringify(data),
    async: false,
    success: function (result) {

      msg("SUCCES");
      json  = result.job_requisitions; 
      //ToKen = result.;                                                    // 5) ruta de los trabajos
      //msg(json.length);
      for (var i = 0; i < json.length; i++) {
        var job = {};

        var dom = window.location.protocol + "//" + window.location.hostname + window.location.pathname + "?ShowJob=";

        job.title = json[i].job_title.split(" - ").shift().trim();
        job.url   = dom + json[i].id;
        job.source_jobtype = json[i].job_categories[0].trim();

        job.temp  = 102020;

        // LOCATION         
        if(json[i].location){// If the location selector exists

          let city    = json[i].location.city;
          let state   = json[i].location.state;
          let country = json[i].location.country;

          let loc = "";
          let array_loc = Array();

          if(city) array_loc.push(city);
          if(state) array_loc.push(state);
          if(country) array_loc.push(country);

          if(array_loc.length) loc = array_loc.join(", ");
          job.location = loc;

        }else{
          job.location = "Mammoth Lakes, California, US";
        } 

        jobs.push(job);
      }
      // cont++;
    },
    error: function (error) {
      msg(error);
    }
  });
  //  } while (json.length > 0);                                                    // 6) condicion de parada

  out["jobs"] = jobs;
  return out;
})();


//Jobdata

(function() {
    var out = {};
    var job = {};
    var selector  = 'div.job-details';
  
    var full_html = document.querySelector(selector); 
    var full_html_text = full_html.innerText;
  
    // To Remove selectors 
    for (const a of full_html.querySelectorAll('h3.job-title, a, img, script, style, button')) {
      if (a){
        a.remove();
      }
    }
  
    var check = $("li.det-level-2.clearfix:contains(Employee Type:)");
    if(check !== null){
      if(check.text().length > 2){
        job.source_jobtype = $("li.det-level-2.clearfix:contains(Employee Type:)").text().split(":").pop().trim();
      } 
    }
  
    /* 
  for (const a of full_html.querySelectorAll('div.field-label.label-1')) {
      if (a.textContent.search(/Employee Type/g)>-1){
            //job.location = a.textContent.trim();
            job.source_jobtype = a.textContent.split(":").pop().trim();
           // a.remove();
      } 
  }
    */
    if(cleanHTML(full_html_text).trim().length < 200){
  
      job.flag_active =  0;
      job.html        = "";
      job.jobdesc     = "";
  
    }else{
  
      job.html = full_html.innerHTML.trim();
  
      job.html = removeTextBefore(job.html, "Description", false);
      //job.html = removeTextBefore(job.html, "", false);
      //job.html = removeTextBefore(job.html, "", false);
      //job.html = removeTextBefore(job.html, "", false);
  
      //job.html = job.html.split("").shift();
      //job.html = job.html.split("").shift();
      //job.html = job.html.split("").shift();
      //job.html = job.html.split("").shift();
  
      //job.html = job.html.replace("","");
      //job.html = job.html.replace("","");
  
      job.html    = cleanHTML(job.html.trim());
      job.jobdesc = job.html;
    }
  
    out["job"] = job;
    return out;
  
  })();
  
  function removeTextBefore(html, text, flag) {
    var newHtml = html;
    if (newHtml.indexOf(text) > -1) {
      newHtml = newHtml.split(text).pop();
      if (!flag) {
        newHtml = "<h3>" + text + "</h3>" + newHtml;
      }
    }
    return newHtml;
  }
  
  function getDateFormat(dateRaw, cut, dayPosition, monthPosition, yearPosition) {
    dateRaw = dateRaw.replace(/\,/g,"").trim();
    let day   =  dateRaw.split(cut)[dayPosition],
        month =  dateRaw.split(cut)[monthPosition],
        year  = dateRaw.split(cut)[yearPosition];
  
    if(dateRaw.search(/[a-z]/gi)>-1){ 
      if(month.search(/jan/i)>-1){month = "01";}
      if(month.search(/feb/i)>-1){month = "02";}
      if(month.search(/mar/i)>-1){month = "03";}
      if(month.search(/apr/i)>-1){month = "04";}
      if(month.search(/may/i)>-1){month = "05";}
      if(month.search(/jun/i)>-1){month = "06";}
      if(month.search(/jul/i)>-1){month = "07";}
      if(month.search(/aug/i)>-1){month = "08";}
      if(month.search(/sep/i)>-1){month = "09";}
      if(month.search(/oct/i)>-1){month = "10";}
      if(month.search(/nov/i)>-1){month = "11";}
      if(month.search(/dec/i)>-1){month = "12";}
    }
    var datum = month +"/"+  day +"/"+ year;
    return datum;
  }