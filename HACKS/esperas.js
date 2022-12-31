(function() {
    var out = {};
    out.waitFor = '';
    //out.wait = true;
    return out;
})();



//CON IFRAME SELECOTOR ...VER EJE ICIMS_IFRAME_PAGINADOURL

(function() {
    var out = {};
    out.iframeSelector = "#icims_iframe_span > iframe"
    out.iframeWaitFor = "div.iCIMS_JobContent"
    return out;
  })();


  (function() {
    var out = {};
    
    
    
    out["pic"] = true; // Se debe usar únicamente para evaluar el comportamiento del jobsite más NO COMO UNA ESPERA
    
    
    
    out.waitFor = 'selector-de-los-jobs';
    out["wait"] = 1500;
    
    
    
    out.iframeSelector = '';
    out.iframeWaitFor = '';
    
    
    
     out["wait"] = true;
    
    
    
    location.reload(); // Refresh
    return out;
    })();

    (function() {
      var out = {};
      /*msg("Esperando 3 segundos..............");
      out.wait = 3000;
      out["html"] = true;
      out["pic"] = true;*/
      out.waitFor = "div.job-content";
      return out;
  })();


 // FUNCION WAIT FOR FUNCTION,,, SE COLOCA EN EL BEFORE EXTRACT O BEFORE JOBDESC
  // waitForFunction waits until the passed function returns true; otherwise it will wait for the timeout
(function() {
  let out = {};
  // waitForFunction structure, it is necessary to pass the function name and optional args if the function receives arguments; otherwise it could be empty
  out.waitForFunction = {
    "function": "waitForJobs",
    "args":[]
  };
  return out;
})();

// Edit this function as needed, to wait for a specific event or wait until the text you need appears finally return true to continue
function waitForJobs(){
  let auxWait = document.querySelector("div.ats-description");
  if (auxWait) {
    if (auxWait.textContent.indexOf('Description:') >-1 )
      return true 
  }
  return false
}