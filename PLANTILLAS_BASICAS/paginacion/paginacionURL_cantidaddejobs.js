
(function () {
    var out = {};
    var url_base = "https://www.dystar.com/careers/page/";
    if (typeof pass_it == "undefined") pass_it = {};
    if (typeof msg == "undefined") msg = function(x){return x; };
    if (!pass_it["cont"]) {
      out["pass_it"] = {
        "cont": 1,
        "jobs": 0
      };
    } else {
      out["pass_it"] = pass_it;
    }
    var perpage_fijo = "10";
    var perpage_actual = document.querySelectorAll('div[class="joblist "]').length;
    msg("perpage_fijo: "+perpage_fijo);
    msg("perpage_actual: "+perpage_actual);
    if (perpage_actual >= perpage_fijo){
      out["pass_it"].cont++;
      var nuevaUrl = url_base+ out["pass_it"].cont +'/';
      msg("\x1b[45m URL siguiente:\x1b[45m"+nuevaUrl);
      window.location.href = nuevaUrl;
      out["has_next_page"] = true; 
    } else {
      msg('\x1b[41m NO HAY MAS PAGINA ');
      out["has_next_page"] = false;
    }
    //out["wait"]=true;
    //out.waitFor = 'div[class="joblist "]';
    return out;
  })();



  // otra version:

  (function() {
    var out = {};
    if (typeof pass_it == "undefined") pass_it = {};
    if (!pass_it["cont"]) {
      out["pass_it"] = {
        "cont": 25
      };
    } else {
      out["pass_it"] = pass_it;
    }
    var html_jobs = document.querySelectorAll("tbody > tr.data-row");
    //stop condition
    if (html_jobs.length < 25) {
        //last page
        out["has_next_page"] = false;
    } else {
        //go to next page
        window.location.href = "https://careers.starhub.com/search/?q=&sortColumn=referencedate&sortDirection=desc&startrow=" +  out["pass_it"].cont;
      	msg(window.location.href)  
      	out["pass_it"].cont+=25;
        out["has_next_page"] = true;
    }
    out.waitFor = "tbody > tr.data-row";
    return out;
})();
