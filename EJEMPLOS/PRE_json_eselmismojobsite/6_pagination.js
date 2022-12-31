(function() {
    var out = {};
    
    if(typeof pass_it == "undefined") pass_it = {};
  if(typeof msg == "undefined") msg = function(x){return x;};

    if (!pass_it["cont"]) {
        out["pass_it"] = {
      "cont": 0,
      "jobs": 0
    };
  } else {
    out["pass_it"] = pass_it;
  }

    if (out["pass_it"]["jobs"] >= 50) {
      
  
      //hay que cambiar la variable dom por la que tengo en el extrac
      var dom                = "https://compassion.wd5.myworkdayjobs.com/CompassionCareers"; 
      var paginationConstant = "/fs/searchPagination/318c8bb6f553100021d223d9780d30be/";
      var clientRequestID    = "6ab4562fb6954654818bc49840aa9a07";
      
    var url = dom + paginationConstant + out["pass_it"].cont + "?clientRequestID=" + clientRequestID; 
        
      
    out["pass_it"].cont += 50;
    window.location.href = url;
    out["has_next_page"] = true;
  } else {
        out["has_next_page"] = false;
  }
    return out;
})();