

// Ultipro multi-location. 
// Step Pag. 



// Extract 

//Extract
(function () {
  var jobs = [];
  var out = {};
  var totalCount;
  var json;

  if (!pass_it["cont"]) {
    out["pass_it"] = {
      "cont": 0,
      "jobs": 0,
      "totalCount":totalCount 
    };
  } else {
    out["pass_it"] = pass_it;
  }

  msg(out["pass_it"].cont);

    var data = {"opportunitySearch":{"Top":50,"Skip": out["pass_it"].cont,"QueryString":"","OrderBy":[{"Value":"postedDateDesc","PropertyName":"PostedDate","Ascending":false}],"Filters":[{"t":"TermsSearchFilterDto","fieldName":4,"extra":null,"values":[]},{"t":"TermsSearchFilterDto","fieldName":5,"extra":null,"values":[]},{"t":"TermsSearchFilterDto","fieldName":6,"extra":null,"values":[]}]},"matchCriteria":{"PreferredJobs":[],"Educations":[],"LicenseAndCertifications":[],"Skills":[],"hasNoLicenses":false,"SkippedSkills":[]}};

        $.ajax({
            url: window.location.protocol + "//" + window.location.hostname + window.location.pathname + "/JobBoardView/LoadSearchResults",                                            // 1) url
            headers: {                                                      
                "Accept": "application/json, text/javascript, */*; q=0.01",
                "Content-Type":"application/json; charset=utf-8"                // 2) headers
            },
            type: 'POST',                                               // 3) tipo
            dataType: "json",                                           // 4) data que retorna

            data: JSON.stringify(data),
            async: false,
            success: function (result) {
                msg("SUCCES");
                json  = result.opportunities; 
                totalCount = result.totalCount;
                //ToKen = result.;                                      // 5) ruta de los trabajos
                //msg(json.length);
                for (var i = 0; i < json.length; i++) {
                    var job = {};

                  var dom = window.location.origin + window.location.pathname + "OpportunityDetail?opportunityId=";
                  
                  var reqid = json[i].RequisitionNumber;
                  job.reqid = reqid;
                  
                  
                    job.title = json[i].Title;
                    job.url   = dom + json[i].Id;
                  	job.temp  = "2020";
                  
                    job.title = job.title.split(reqid).shift();
                    job.title = job.title.split(/Remote/i).shift();
                    job.title = job.title.replace(/\{.*?\}/g, '').trim();
                  
                      job.title = job.title.trim();
                      let lastCharTitle = job.title.substr(job.title.length -1);
                       if(lastCharTitle === "-"){job.title = job.title.slice(0,-1).trim();}
                
       
          
                    
                  
           	     /*----------DATE-POSTED----------------------------------*/
				    var datum = json[i].PostedDate;
                        datum = datum.split("T").shift().trim();
                        
                    job.dateposted_raw = getDateFormat(datum,"-",2,1,0);
				 /*------------------------------------------------------*/
               
                    if(json[i].Locations){
                      
                          var locs = json[i].Locations, w;
                              for(w in locs){
                                    if(typeof locs[w] =="function") continue;
                                    if(typeof locs[w] =="number") continue;

							    var jobw = {...job};


                                   //Location array "city, state, country"

                                        let city    = locs[w].Address.City;
                                        let state   = locs[w].Address.State;
                                        let country = locs[w].Address.Country.Name;

                                    var loc = "";
                                    var array_loc = Array();

                                    if(city && city.search(/Remote/i)==-1 & typeof city !== null) array_loc.push(city);
                                    if(state && typeof state !== null) array_loc.push(state.Name);
                                    if(country && typeof country !== null) array_loc.push(country);

								    if(array_loc.length) loc = array_loc.join(", ");

                                    jobw.location = loc;
                                
                                      // Split on city 2
                                      if(jobw.location.indexOf(",")>-1){
                                         let city = jobw.location.split(",")[0].trim();
                                              var preClean = jobw.title.split(city).shift().trim();
                                               if(preClean.length > 10){
                                                   jobw.title = jobw.title.split(city).shift().trim();
                                                      let lastChar = jobw.title.substr(jobw.title.length -1);
                                                        if(lastChar === "-" || lastChar === "," || lastChar === "(" || lastChar === "–"){
                                                          jobw.title = jobw.title.slice(0,-1);}
                                                        }else{
                                                          jobw.title = jobw.title.replace(city,"").trim();
                                                          jobw.title = jobw.title.trim().replace(/^\-|\–/,"").trim();
                                                          }
                                      }   
                                
                                   

					              jobs.push(jobw);
                              }
                      }  
              }
               out["pass_it"].cont+=50;
            },
            error: function (error) {
                msg(error);
            }
        });
    

    out["jobs"] = jobs;
    out["pass_it"]["jobs"] += jobs.length;
    out["pass_it"]["totalCount"] = totalCount;
    return out;
})();

function getDateFormat(dateRaw, cut, dayPosition, monthPosition, yearPosition) {
       dateRaw = dateRaw.replace(/\,/g,"").trim();
          
        let day   =  dateRaw.split(cut)[dayPosition].trim(), 
            month =  dateRaw.split(cut)[monthPosition].trim(), 
            year  = dateRaw.split(cut)[yearPosition].trim();

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


// Pag


//Pagination
  (function() {
    var out = {};

    out["pass_it"] = pass_it;
     var totalJobs = out["pass_it"]["totalCount"];
    
    msg(out["pass_it"].jobs);
    
    //stop condition
    if(out["pass_it"].jobs >= totalJobs){
      //go to next page
      out["has_next_page"] = false;
    } else {
      //try again
      out["has_next_page"] = true;
    }
    //out.waitFor = "";
    return out;
  })();