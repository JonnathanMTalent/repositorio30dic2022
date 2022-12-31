//Infiniti pagination:


(function() {
    let out = {};
  let selector = "a#more-jobs:not([style*='display: none;'])";   //Este es el selector que solo aparece cuando se da click en load more
  let partial_text = "";
    out["has_next_page"] = false;

 let all_elems = document.querySelectorAll(selector);
 [].forEach.call(all_elems, function(elemento){
      if(out["has_next_page"]) return out;
      if(elemento.textContent.trim().indexOf(partial_text) != -1){
          elemento.click();
          out["has_next_page"] = true;
      }
  });        
  
    out["wait"] = true;
    return out;
})();





// Paginar load more, infiniti pagination


(function() {
    var out = {};
    var button_more = 'button'; //1) SELECTOR DEl BOTON VER MAS JOBS

    //msg(pass_it);
    if (!pass_it["heights"]) out["pass_it"] = { "heights": [] };
    else out["pass_it"] = pass_it;

    out["has_next_page"] = true;
    if (out["pass_it"]["heights"].length > 3) {
        var last_three_heights = out["pass_it"]["heights"].slice(out["pass_it"]["heights"].length - 3);
        if (last_three_heights[0] == last_three_heights[1] && last_three_heights[1] == last_three_heights[2])
            out["has_next_page"] = false;
    }

    if (document.querySelectorAll(button_more).length == 1)
        document.querySelector(button_more).click();

    out["wait"] = true;
    out["pass_it"]["heights"].push(document.querySelectorAll("div.careers-jobs-list-styles__jobsList--3_v12 > ul > li > div  ").length); // selector de los jobs
    return out;
})();



//Load mora, espera por los jobs


(function(){
    var out = {};
    out.waitFor = "#ajax_posts > div.grid > div.grid__item h3 a"
    var jobs = document.querySelectorAll("#ajax_posts > div.grid > div.grid__item h3 a").length;
    var elment = document.querySelector("button#careers_more_posts");
    
    if (typeof pass_it == "undefined") pass_it = {};
    if (typeof msg == "undefined") msg = function (x) { return x; };
    if (!pass_it["cont"]) {
      out["pass_it"] = {
        "cont": 0
      };
    } else {
      out["pass_it"] = pass_it;
    }
  
  
    msg("=====> " + jobs);
    msg("=====> " + out["pass_it"]["cont"]);
  
    if(out["pass_it"]["cont"]== jobs){
      out["has_next_page"] = false;
    }else if (elment) {
  
      elment.click();
      out["has_next_page"] = true;
    } else {
      out["has_next_page"] = false;
    }
  
    out["pass_it"]["cont"] = jobs;
    out["wait"]=true;
    return out;
  })();


  //Otro


  (function(){
    var out = {};
    var elmnt = document.querySelector('#recent-jobs > p > a[style="display:block"]');
  
    if (elmnt) {
      elmnt.click();
      out["has_next_page"] = true;
    } else {
      out["has_next_page"] = false;
    }
  
    out["wait"] = true;
    out["html"] = true;
    out["pic"] = true;
    return out;
  })();