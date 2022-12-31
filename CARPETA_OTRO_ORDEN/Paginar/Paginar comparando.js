//Paginar comparando


(function() {
  var out = {};
  var next_page_selector = "#cmdNext";
  var clickable_elem = document.querySelector(next_page_selector); 
  var textPaginador = document.querySelectorAll('span[id*="CurrentPage"]')[0].textContent.trim();
  var max = textPaginador.split(" of ").pop();
  var min = textPaginador.split(" of ").shift().split("Page: ").pop();
  msg(min + " ------------------- " + max);
  
  if (parseInt(min, 10) < parseInt(max, 10)) {/*elem-exist*/
       clickable_elem.click();
      out["has_next_page"] = true;
  } else {
      //try again
    out["has_next_page"] = false;
  }

  out["wait"] = true;
  return out;
})();


//Otro coparando en aleman


(function() {
  var out = {};
  var next_page_selector = "div.icon.itnav_next ";
  var clickable_elem = document.querySelector(next_page_selector); 
  var textPaginador = document.querySelectorAll('#async_object_66856 > div')[0].textContent.trim();

  var max = textPaginador.split("von").pop();
  var min = textPaginador.split("von").shift().split("bis").pop();
  msg(min + " ------------------- " + max);

  if (parseInt(min, 10) < parseInt(max, 10)) {/*elem-exist*/
    clickable_elem.click();
    out["has_next_page"] = true;
  } else {
    //try again
    out["has_next_page"] = false;
  }

  out["wait"] = true;
  return out;
})();



//Paginar comparando la cantidad de jobs

(function() {
  var out = {};
  if (!pass_it["cont"]) {
    out["pass_it"] = {
      "cont": 2          
    };
  } else {
    out["pass_it"] = pass_it;
  }
  var next_page_selector = 'a[data-dt-idx="'+out["pass_it"].cont+'"]'; // Selector del next  
  var clickable_elem = document.querySelector(next_page_selector);
  var stop = document.querySelector('div#VACANCY_KEY-list_info').innerText.split(' ').filter(value => value.search(/[0-9]/g)>-1);
  if (clickable_elem) {
    out["pass_it"].cont++;
    if(Number(stop[1]) ==  Number(stop[2])){
      out["has_next_page"] = false;
    }else{
      clickable_elem.click();
      out["has_next_page"] = true;
    }

  } else {      
    out["has_next_page"] = false;
  }

  out.waitFor = "table#VACANCY_KEY-list>tbody>tr";
  return out;
})();