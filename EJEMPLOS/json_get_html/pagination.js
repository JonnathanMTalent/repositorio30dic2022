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