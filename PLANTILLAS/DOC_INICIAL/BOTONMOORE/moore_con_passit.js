// cuenta los jobs que hay en cada momento y si son iguales
// a los jobs anteriores no pasa, 

(function() {
    var out = {};
    //var selectorscroll = '';
    var selectorjobs = 'div.dvinci-job-entry.well.well-sm';
    msg(pass_it);
    if (!pass_it["jobs_lengths"]) out["pass_it"] = { "jobs_lengths": [] };
    else out["pass_it"] = pass_it;
    out["has_next_page"] = true;
    if (out["pass_it"]["jobs_lengths"].length > 3) {
        var last_three_jobs = out["pass_it"]["jobs_lengths"].slice(-3);
        if (last_three_jobs[0] == last_three_jobs[1] && last_three_jobs[1] == last_three_jobs[2])
            out["has_next_page"] = false;
    }
 
    var next_page_selector = 'a[ng-click="paginationCtrl.nextPage()"]';
    var clickable_elem = document.querySelector(next_page_selector);  
    if(clickable_elem)clickable_elem.click();         
             
    //window.scrollBy(0, document.body.scrollHeight);   //ESTO SOLO FUNCIONA CUANDO EL SCROLL ES A TODA LA PÃGINA (BODY)
    //document.querySelector(selectorscroll).scrollBy(0, document.querySelector(selectorscroll).scrollHeight)
    out["wait"] = true;
    //out["pic"] = true;
    //out["html"]   = true;
    out["pass_it"]["jobs_lengths"].push(document.querySelectorAll(selectorjobs).length);
    return out;
})();


// MOORE CON PASSIT DE JUANCHO

//infinite pagination
(function(){
    var out = {};
    var jobs = document.querySelectorAll("div.listitem.job").length;
    var elmnt = document.querySelector(`button#loadMoreButton:not(button[style="display: none;"])`);
    if (typeof pass_it == "undefined") pass_it = {};
    if (typeof msg == "undefined") msg = function (x) { return x; };
    if (!pass_it["cont"]) {
      out["pass_it"] = {
        "cont": 0
      };
    } else {
      out["pass_it"] = pass_it;
    }
    if(out["pass_it"]["cont"]== jobs){
      out["has_next_page"] = false;
    }else if (elmnt) {
      elmnt.click();
      out["has_next_page"] = true;
    } else {
      out["has_next_page"] = false;
    }
    out["pass_it"]["cont"] = jobs;
    out["wait"]=true;
    return out;
  })()