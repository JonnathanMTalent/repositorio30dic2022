(function () {
    var out = {};
    if (pass_it["offSet"]) {
      out["pass_it"] = pass_it;
    } else {
      out["pass_it"] = {
        "offSet": 0,
        "limit": 0
      };
    }
    return out;
  })();