(function () {
    var out = {};
    out["pass_it"] = pass_it;
    out.pass_it.offSet += 20
    if (out.pass_it.offSet < out.pass_it.limit) {
      out["has_next_page"] = true;
    } else {
      out["has_next_page"] = false;
    }
    out["wait"] = false;
    return out;
  })();
  /*
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
    if (out["pass_it"]["jobs"] == 50) {
      var dom             = window.location.protocol + "//" + window.location.hostname;
      var pagConstant     = window.location.pathname.split("be/").shift() + "be/";
      var clientRequestID = window.location.href.split("clientRequestID=").pop().trim();
      var url = dom + pagConstant  + out["pass_it"].cont + "?clientRequestID=" + clientRequestID;
      out["pass_it"].cont += 50;
      window.location.href = url;
      out["has_next_page"] = true;
    } else {
      out["has_next_page"] = false;
    }
    return out;
  })();*/