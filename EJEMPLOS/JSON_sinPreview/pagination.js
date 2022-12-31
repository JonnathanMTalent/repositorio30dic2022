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



/*
(function () {
    var out  = {};
    //out.wait = 1000;
  
    var url_base           = "https://www.prnhealthservices.com/jobs?pg=";//https://www.prnhealthservices.com/jobs?pg=0
    var main_loop_selector = "body > div.wrap > div.page-content.interior-content > div > div > div > ul.job-list > li.clearfix.job";


    if (typeof pass_it == "undefined") pass_it = {};
    if (typeof msg == "undefined") msg = function(x){return x; };

    if (!pass_it["cont"]) {
        out["pass_it"] = {
            "cont": 0,
            "jobs": 0
        };
    } else {
        out["pass_it"] = pass_it;
    }
  

  var perpage_fijo = 25;
  var perpage_actual = document.querySelectorAll(main_loop_selector).length;
    

    msg("perpage_fijo: \x1b[0m"+perpage_fijo);
    msg("perpage_actual: \x1b[0m"+perpage_actual);
  
 if(perpage_actual < perpage_fijo){
    msg('\x1b[41m The pagination has finished \x1b[0m');
    out["has_next_page"] = false;
  }else{
    msg("\x1b[33m    \x1b[4m "+perpage_actual+" jobs de "+ perpage_fijo +" jobs\x1b[0m");
    var nuevaUrl = url_base+ out["pass_it"].cont;
    out["pass_it"].cont++;
    msg("URL siguiente: \x1b[0m"+nuevaUrl);
    window.location.href = nuevaUrl;
    out["has_next_page"] = true; 
  }
  
  
  //out.waitFor = "";
   //out["wait"] = true;
    return out;
})();


/*(function() {
    var out = {};
  var next_page_selector = 'a[class="next-page"]'; //selector to identify the next button
  var clickable_elem = document.querySelector(next_page_selector);

    //stop condition
    if(clickable_elem){
        //go to next page
      clickable_elem.click();
        out["has_next_page"] = true;
  } else {
        //try again
      out["has_next_page"] = false;
  }
    msg(document.querySelectorAll('div.job-box.col-12.col-md-6').length);
    out.waitFor = "button.btn.btn-blue-ml.d-block.mx-auto";
    return out;
})();*/