(function() {
  var out = {};
  var job = {};
  var selector = "div#notice > div.AdvertParentContainer";

  if(document.querySelector(selector)) {
    var full_html = document.querySelector(selector);
    // remove something from the jobdatata
    if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
    if (typeof msg == "undefined") msg = console.log;

    //--------------------------JOB-INFO ------------------------------------//
    if(document.querySelector('script[type="application/ld+json"]')) {
      var info = document.querySelector('script[type="application/ld+json"]').textContent.replace(/\s+/g,"").replace(/@/gi,"");
      var info_json = JSON.parse(info);

      //job.source_salary = info_json.baseSalary.value.value;

      job.dateposted_raw = info_json.datePosted.split("-");
      job.dateposted_raw = job.dateposted_raw[1] + "/" + job.dateposted_raw[2] + "/" + job.dateposted_raw[0];

      //job.source_empname = info_json.hiringOrganization.name;

      var city  = info_json.jobLocation.address.addressLocality;
      var state = info_json.jobLocation.address.addressRegion;

      var loc = "";
      var array_loc = Array();

      if(city) array_loc.push(city);
      if(state) array_loc.push(state);

      if(array_loc.length) loc = array_loc.join(", ");
      job.location = loc;
    }

    for (const a of full_html.querySelectorAll('p')) {
      if (a.textContent.search(/salary\:/i)>-1){
        job.source_salary = a.textContent.trim().split(":")[1].trim();
        a.remove();
        msg(job.source_salary);
      } 
    }



    for (const a of full_html.querySelectorAll('div[style]')) { // Para el logo
      if (a.getAttribute("style").search(/logo-header/i)>-1){
        var logo1 = a.getAttribute("style").trim().split("url(")[1].split(");")[0];
        msg(logo1);

      } else if(a.getAttribute("style").search(/logo-image/i)>-1) {
        var logo2 = a.getAttribute("style").trim().split("url(")[1].split(");")[0];
        msg(logo2);			
      } else if(a.getAttribute("style").search(/-logo-/i)>-1) {
        var logo3 = a.getAttribute("style").trim().split("url(")[1].split(");")[0];
        msg(logo3);			
      }   

    }

    if(logo1) {
      job.logo = logo1;
    } else if(logo2) {
      job.logo = logo2;
    } else if (logo3) {
      job.logo = logo3;
    }

    for (const a of full_html.querySelectorAll('p')) { // Para el empname
      if (a.textContent.search(/location\:/i)>-1){
        var z = a.textContent.trim().split(":")[1].trim();
        a.remove();

        if(z.search(",")>-1) {
          job.source_empname = z.split(",")[0].trim();
          if(job.source_empname.search(/Red Barn/i)>-1) {job.source_empname = "Red Barn";}//-logo- TP
          if(job.source_empname.search(/The Two Willows/i)>-1) {job.source_empname = "The Two Willows";}//-logo- TP
          if(job.source_empname.search(/William Bourne/i)>-1) {job.source_empname = "William Bourne";}
          if(job.source_empname.search(/The Waterside Inn/i)>-1) {job.source_empname = "The Waterside Inn";}
          if(job.source_empname.search(/Cross Keys Hotel/i)>-1) {job.source_empname = "Cross Keys Hotel";}
          if(job.source_empname.search(/Slug and Lettuce/i)>-1) {job.source_empname = "Slug and Lettuce";}
          if(job.source_empname.search(/Golden Fleece/i)>-1) {job.source_empname = "Golden Fleece";}
          if(job.source_empname.search(/Library Islington/i)>-1) {job.source_empname = "";} //"Library Islington" es una librería...
          if(job.source_empname.search(/Hill Top Tap/i)>-1) {job.source_empname = "Hill Top Tap";}
          if(job.source_empname.search(/Three Horse Shoes/i)>-1) {job.source_empname = "Three Horse Shoes";}
          if(job.source_empname.search(/The Block & Gasket/i)>-1) {job.source_empname = "The Block & Gasket";}
          if(job.source_empname.search(/Northumberland Arms/i)>-1) {job.source_empname = "The Northumberland Arms";}
          if(job.source_empname.search(/Digby/i)>-1) {job.source_empname = "The Digby";}
          if(job.source_empname.search(/Oakwood/i)>-1) {job.source_empname = "The Oakwood";}

        } else {
          job.source_empname = '';
        }

      } else {
        z = '';
      }
    }


    if(job.logo.search(/slug/i)>-1 && job.source_empname == '') { job.source_empname = "Slug and Lettuce";}great-traditional
    //if(job.logo.search("great-traditional"))


    msg(job.logo + " -----------------REAL LOGO");
    msg(job.source_empname + " -------------REAL EMPNAME");

    //----------------------------------------------------------------------//
    // To Remove selectors 
    for (const a of full_html.querySelectorAll('a, img, script, style, button')) {
      if (a){
        a.remove();
      }
    }

    for(const a of full_html.querySelectorAll('p')){  //Varios p
      const text = a.textContent.trim();
      if(text.search(/Closing Date\:/i) > -1) a.remove();
      if(text.search(/ apply /i) > -1) a.remove();
      if(text.search(/cv/i) > -1) a.remove();
      if(text.search(/telephone/i) > -1) a.remove();
      if(text.search(/contact to/i) > -1) a.remove();
      if(text.search(/https/i) > -1) a.remove();
      if(text.search(/www./i) > -1) a.remove();
      if(text.search(/@/i) > -1) a.remove();
    }
    //----------------------------------------------------------------------//
    job.html      = full_html.innerHTML.trim();

    // --------------- removeTextBefore -----------

    //job.html = removeTextBefore(job.html, "", false);
    //job.html = removeTextBefore(job.html, "", false);

    // --------------- removeTextAfter -----------

    //job.html = removeTextAfter(job.html, "", true);
    //job.html = removeTextAfter(job.html, "", true);

    job.html      = cleanHTML(job.html);
    var tmp       = document.createElement('div');
    tmp.innerHTML = job.html;
    job.jobdesc   = tmp.textContent.trim();
    job.jobdesc   = cleanHTML(job.jobdesc);

    if(job.jobdesc.trim().length < 50){

      job.flag_active =  0;
      job.html        = "";
      job.jobdesc     = "";

    }

  } else {

    msg('\x1b[43m NO HAY SELECTOR \x1b[0m');
    job.flag_active =  0;
    job.html        = "";
    job.jobdesc     = "";

  }
  out["job"] = job;
  return out;

})();
function removeTextBefore(html, text, flag) {
  var newHtml = html;
  if (newHtml.indexOf(text) > -1) {
    newHtml = newHtml.split(text).pop();
    if (!flag) {
      newHtml = "<h3>" + text + "</h3>" + newHtml;
    }       
  }
  return newHtml;
}
function removeTextAfter(html, text, flag) {
  var newHtml = html;
  if (newHtml.indexOf(text) > -1) {
    newHtml = newHtml.split(text).shift();
    if (!flag) {
      newHtml = newHtml + "<p>" + text + "</p>";
    }       
  }
  return newHtml;
}