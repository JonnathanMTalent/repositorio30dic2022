(function() {
    var out = {};  
    out["pass_it"] = pass_it;
    let expJ = document.querySelector(`p[data-automation-id="jobFoundText"]`).textContent.split(" ")[0];
    out["pass_it"].cont += 20;
    msg(out["pass_it"].cont + " ------- " + expJ)
    if(out["pass_it"].cont > expJ){
        out["has_next_page"] = false; 
    }else{
        out["has_next_page"] = true; 
    }
    
    out["wait"] = false;
    return out;
  })();