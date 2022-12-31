(function(){
    var out = {};
    var elmnt = document.querySelector('[class="load_more_jobs"]:not([style="display: none;"])');
    //ELEMENTO PARA PARAR LA PAGINAR
    var stop = document.querySelector('.dvinci-pagination-button.ng-hide');
    if(!elmnt){
      out["has_next_page"] = false;
    }else   if (elmnt) {
      elmnt.click();
      out["has_next_page"] = true;
    } else {
      out["has_next_page"] = true
    }
    out.waitFor =".load_more_jobs";
    
    if(!pass_it["firts"]){
      out["pass_it"] = {"firts": 1};
      out["has_next_page"] = true;
      out.waitFor = ".job_listings > li"
      //msg('msmsms')
    }
    
    //out.html = true;
   // out.pic = true;
    return out;
  })();