


// ADP step pag 

// Extract 


//Extract
(function () {
  var jobs = [];
  var jobs2 = [];
  var out = {};
  var totalCount;
  var totalPages;
  var json;
 
  if (!pass_it["cont"]) {
    out["pass_it"] = {
      "cont": 0,
      "jobs": 0,
      "jobs2": 0,// Cuando existe multi-location
      "totalCount":totalCount,
      "totalPages":totalPages
    };
  } else {
    out["pass_it"] = pass_it;
  }
    
        var data = {"filters":[{"name":"state","label":"State"},{"name":"city","label":"City"},{"name":"postingLocationCode","label":"Location"},{"name":"grp","label":"Area of Interest"},{"name":"typeOfFulltime","label":"Position Type"}],"results":{"pageTitle":"Search Results","zeroResultsMessage":"We're sorry but we have no job openings at this time that match your search criteria. Please try another search.","searchFailureMessage":"Oops! Something went wrong.  Search has encountered a problem. Try searching again","resultsFoundLabel":"results found","bookmarkText":"Bookmark This","pageSize":"100","sortOrder":"00001000","shareText":"Share","fields":[{"name":"ptitle","label":"Published Job Title"},{"name":"grp","label":"Area of Interest"},{"name":"typeOfFulltime","label":"Position Type"}]},"pagefilter":{"page":out["pass_it"].cont},"rl":"enUS"}
  
        $.ajax({
            url: 'https://recruiting.adp.com/srccar/public/rest/1/1191811/search/',
            headers: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            type: 'POST',
            data: JSON.stringify(data),
            dataType: "json",
            async: false,
            success: function(result) {
              
                json = result.jobs;
                totalPages = result.pages + 1;
              
              msg("totalPages en extract ----->" + totalPages);
              
                for (var i = 0; i < json.length; i++) {
                    var job = {};
                  
                    job.title = json[i].ptitle;
                    
                    job.url = json[i].url;
                  
        
         job.location = json[i].locationaddress[0];

               if(job.location.length<1){       


            var city   = json[i].city;
            var state  = json[i].state;

            var loc = "";
            var array_loc = Array();

            if(city) array_loc.push(city);
            if(state) array_loc.push(state);



            if(array_loc.length) loc = array_loc.join(", ");

                  job.location = loc.trim();
             
             }

jobs.push(job2);


                  job.location = job.location.replace(/[0-9]/g,"").trim();
                 

                    job.temp = 1998;
                    jobs.push(job);
                }
                out["pass_it"].cont++;
            },
            error: function(error) {
                msg(error);
            }
        });
   

    out["jobs"] = jobs;
    out["pass_it"]["jobs"] += jobs.length;
    out["pass_it"]["totalCount"] = totalCount;
    out["pass_it"]["totalPages"] = totalPages;
    return out;
})();


// Pag


//Pagination
  (function() {
    var out = {};

    out["pass_it"] = pass_it;
     
    let totalJobs   = out["pass_it"]["totalCount"];
    let totalPages  = out["pass_it"]["totalPages"];
   
    let currentAmountOfJobs = out["pass_it"].jobs;
    let currentPage = out["pass_it"].cont;
    
    //msg(out["pass_it"].jobs);
    //msg("totalPages -->" + totalPages);
    //msg("currentPage -->" + out["pass_it"].cont);

    
    //if(currentAmountOfJobs >= totalJobs){
    if(currentPage >= totalPages){
 
      out["has_next_page"] = false;
    } else {
  
      out["has_next_page"] = true;
    }
 
    return out;
  })();