(function () {
    var out = {};
    out["pass_it"] = pass_it;
      
    out["has_next_page"] = false;
    out["pass_it"].counter = out["pass_it"].counter + 20;
    //out["pass_it"].cont += 1;
    //msg("Jobs in the jobsite: "+out["pass_it"].jobslength);
    
    //msg('numero----->'+out["pass_it"].cont)
    if (out["pass_it"].stop_pag >= 20) {    
          out["has_next_page"] = true;
    } else {	    
          out["has_next_page"] = false;
    }
    //out.html=true;
    //out.wait = true;
    return out;
  })();