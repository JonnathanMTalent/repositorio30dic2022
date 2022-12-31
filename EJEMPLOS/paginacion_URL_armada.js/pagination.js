(function () {
    var out = {};
    //out.wait=2000;
  
    var url_base = "http://careers.mpslimited.com/page/";
    var url_se = "/";

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
  

  var perpage_fijo = 20;
  var perpage_actual = document.querySelectorAll('div.template-blog article.nConfig-job-list').length;
    

    msg("perpage_fijo: \x1b[0m"+perpage_fijo);
    msg("perpage_actual: \x1b[0m"+perpage_actual);
  
  

  
  
  if(perpage_actual < perpage_fijo){
    msg('\x1b[41m Fin de la paginacion more \x1b[0m');
    out["has_next_page"] = false;
  }else{
    msg("\x1b[43m hay "+perpage_actual+" jobs de "+ perpage_fijo +" jobs\x1b[0m");
    var nuevaUrl = url_base+ (out["pass_it"].cont)+ url_se;
    out["pass_it"].cont++;
    msg("URL siguiente: \x1b[0m"+nuevaUrl);
    window.location.href = nuevaUrl;
    out["has_next_page"] = true; 
  }
  
  
  
   out["wait"] = true;
    return out;
})();