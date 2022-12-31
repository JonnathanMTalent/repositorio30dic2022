(function () {
    var out = {};
    var url_base = "https://jobs-fmglobal.icims.com/jobs/search?pr=";
    var selector = "a.invisible > span.halflings-menu-right";
  
    if (typeof msg == "undefined") msg = console.log;
  
    out["pass_it"] = pass_it;
  
    var iframe_selector = "#icims_iframe_span > iframe";   
    var iframeDocument = document.querySelector(iframe_selector).contentWindow.document;
    //msg(document.querySelector(selector));
    if (iframeDocument.querySelector(selector)) {
      // condición de parada. Stop condition
      out["has_next_page"] = false;
    } else if (out["pass_it"]["jobs"] > 0) {
      out["pass_it"].cont += 1;
      var url = url_base + out["pass_it"].cont;
  
      window.location.href = url;
      out["has_next_page"] = true;
    } else {
      out["has_next_page"] = true;
    }
  
    out.iframeSelector = "#icims_content_iframe";
    out.iframeWaitFor = "div.row";
    return out;
  })();