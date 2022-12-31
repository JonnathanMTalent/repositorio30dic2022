(function() {
    var out = {};
  
    if(typeof msg == "undefined") msg = function(x){return x;};
    
  
    out["pass_it"] = pass_it;
    
    
        if (out["pass_it"]["jobs"] < 10) {
        //last page
      out["has_next_page"] = false;
    } else if (out["pass_it"]["jobs"] > 0) {
       out["pass_it"].cont += 1;
      
      
      var beforePageVariable   = "https://livspace.skillate.com/_next/data/q45fuvLd2aUCK-TRTn0Ak/jobs.json?page="; 
      var afterPageVariable    = "&pageSize=10&department=&location=&title=&sortBy=&orderBy=ASC"; 
      
      var url = beforePageVariable + out["pass_it"].cont + afterPageVariable;


     
      window.location.href = url;
      msg(url);
      out["has_next_page"] = true;
    }
    else {
      out["has_next_page"] = false;
    }
  
    out["wait"] = true;
    return out;
    })();