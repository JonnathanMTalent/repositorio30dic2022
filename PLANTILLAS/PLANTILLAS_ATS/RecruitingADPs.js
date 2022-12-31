

(function() {
    var jobs = [];
    var out = {};
    var counter = 1;
    var limit = 0;
    var json;
    do {
      var data = {"filters":[{"name":"state","label":"State"},{"name":"city","label":"City"},{"name":"grp","label":"Area of Interest"},{"name":"typeOfFulltime","label":"Full-Time/Part-Time"},{"name":"regTemp","label":"Regular/Seasonal"}],"results":{"pageTitle":"Search Results","zeroResultsMessage":"We're sorry but we have no job openings at this time that match your search criteria. Please try another search.","searchFailureMessage":"Oops! Something went wrong.  Search has encountered a problem. Try searching again","resultsFoundLabel":"results found","bookmarkText":"Bookmark This","pageSize":"250","sortOrder":"00001000","shareText":"Share","fields":[{"name":"ptitle","label":"Published Job Title"},{"name":"allAddresses","label":"All Addresses"},{"name":"num","label":"Req Num"}]},"pagefilter":{"page":counter},"rl":"enUS"};
      $.ajax({
        url: 'https://recruiting.adp.com/srccar/public/rest/1/1364113/search/', // URL de ejemplo: https://recruiting.adp.com/srccar/public/rest/1/1223051/search/
  
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        },
        type: 'POST',
        data: JSON.stringify(data),
        //dataType: "json",
        async: false,
        success: function(result) {
          json = result.jobs;
          limit = result.pages + 1;
          for (var i = 0; i < json.length; i++) {
            var job = {};
  
            var title = json[i].ptitle;
            job.source_jobtype = json[i].typeOfFulltime;
            if (title.search(/\(/) > -1) {
              job.title = title.replace(/\(.*?\)/g, '').replace(/\[.*?\]/g, '').replace(/\<.*?\>/g, '').trim();
              var jobtype = title.split(/\(/).pop().split(/\)/).shift().trim();
              if(jobtype.includes('FULL TIME') || jobtype.includes('Full Time'))job.source_jobtype='Full Time';
              if(jobtype.includes('FULL_TIME') || jobtype.includes('Full_Time'))job.source_jobtype='Full Time';
              if(jobtype.includes('FULLTIME') || jobtype.includes('Fulltime'))job.source_jobtype='Full Time';
              if(jobtype.includes('Full-TIme')) job.source_jobtype='Full Time';
              if(jobtype.includes('FULL-TIME') || jobtype.includes('Full-time') || jobtype.includes('Full-Time') || jobtype.includes('full-time'))job.source_jobtype='Full Time';
              if(jobtype.includes('CASUAL') || jobtype.includes('Casual'))job.source_jobtype='Casual';
              if(jobtype.includes('CONTRACT') || jobtype.includes('Contract'))job.source_jobtype='Contract';
              if(jobtype.includes('PART-TIME') || jobtype.includes('Part-Time'))job.source_jobtype='Part Time';
              if(jobtype.includes('PART TIME') || jobtype.includes('Part Time'))job.source_jobtype='Part Time';
              if(jobtype.includes('PARTTIME') || jobtype.includes('Parttime'))job.source_jobtype='Part Time'; 
              if(jobtype.includes('Full-Time/Part-Time'))job.source_jobtype='Full-Time/Part-Time';
              if(jobtype.includes('Regular full-time'))job.source_jobtype='Regular full-time';
              if(jobtype.includes('PERMANENT') || jobtype.includes('Permanent'))job.source_jobtype='Permanent';
            }
            else {job.title = title;}
  
            job.reqid = json[i].num;
            job.url = json[i].url;
  
            job.location = json[i].city + ", " + json[i].state;
            job.source_location = json[i].city + ", " + json[i].state;
            
  
  
            job.temp = "3/19/2022";
            jobs.push(job);
          }
          counter = counter + 1;
        },
        error: function(error) {
          msg(error);
        }
      });
    } while (counter < limit);
  
    out["jobs"] = jobs;
    return out;
  })();


  // *****************


  
  (function () {
    var out = {};
    var job = {};
    var json;
    var jobid = window.location.href.split("&r=").pop();
    var endpoint = "https://recruiting.adp.com/srccar/public/rest/1/1450815/job/" + jobid + "?prc=RMPOD3&rl=enUS";
    msg(endpoint);
    $.ajax({
      url: endpoint,
      headers: {
        "accept": "application/json, text/plain, */*",
        "accept-language": "es,es-ES;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
        "prefer": "safe",
        "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"100\", \"Microsoft Edge\";v=\"100\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin"
      },
      type: 'GET',
      async: false,
      success: function (result) {
        json = result;
        
        //  job.location = json.fields[5].content.split('-').pop();
        //msg(job.location);
        //    job.source_jobtype = json.fields[3].content;
        //  msg(job.source_jobtype);
        var full_html = json.fields[0].content;
        
        //var full_html = json.fields[0].label;
        //var full_html2 = json.fields[3].label;
        //var full_html3 = json.fields[3].content;
    
        //job.html = full_html + "</h3>" + full_html1 + "<h3>" + full_html2 + "</h3>" + full_html3;
        job.html = "<div>" + full_html + "</div>";
        
        
        //job.html = removeTextBefore(job.html, '', false);
      //job.html = removeTextBefore(job.html, '', false);
        job.html = job.html.replaceAll(/APPLY NOW!/ig,"");
        job.html = removeTextAfter(job.html, 'HOW TO APPLY', true);
        job.html = removeTextAfter(job.html, 'click here for more information', true);
        
        
        if (job.html.indexOf('https') > -1) { job.html = job.html.replace(/(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi, ""); }
        if (job.html.indexOf('http') > -1) { job.html = job.html.replace(/(http?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi, ""); }
        if (job.html.indexOf('HTTPS') > -1) { job.html = job.html.replace(/(HTTPS?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi, ""); }
        if (job.html.indexOf('HTTP') > -1) { job.html = job.html.replace(/(HTTP?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi, ""); }
        if (job.html.indexOf('www') > -1) { job.html = job.html.replace(/(www?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi, ""); }
  
        job.html = cleanHTML(job.html);
        var tmp = document.createElement('div');
        tmp.innerHTML = job.html;
        job.jobdesc = tmp.textContent.trim();
        job.jobdesc = cleanHTML(job.jobdesc);
        //msg(job)
  
      },
      error: function (error) {
        msg(error);
      }
    });
  
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
      


      // ***********************************


/****** EXTRACT******/
(function() {
  var jobs = [];
  var out = {};
  var counter = 1;
  var limit = 0;
  var json;
  var countries = {
    AL:"Alabama", AK:"Alaska", AZ:"Arizona", AR:"Arkansas", CA:"California", CO: "Colorado", CT: "Connecticut", DE: "Delaware" ,
    FL: "Florida", GA: "Georgia", HI: "Hawaii", ID: "Idaho", IL: "llinois", IN: "Indiana", IA: "Iowa", KS:"Kansas", KY:"entucky", 
    LA:"Louisiana", ME:"Maine", MD:"Maryland", MA:"Massachusetts", MI:"Míchigan", MN:"Minnesota", MS:"Mississippi", MO:"Missouri",
    MT:"Montana", NE:"Nebraska", NV:"Nevada", NH:"New Hampshire", NJ:"New Jersey", NM:"New Mexico", NY:"New York", NC:"North Carolina",
    ND:"North Dakota", OH:"Ohio", OK:"Oklahoma", OR:"Oregon", PA:"Pennsylvania", RI:"Rhode Island", SC:"South Carolina", SD:"South Dakota",
    TN:"Tennessee", TX:"Texas", UT:"Utah", VT:"Vermont", VA: "Virginia", WA: "Washington", WV: "West", WI: "Wisconsin", WY: "Wyoming","ARG-L":"Argentina"
  }
  do {
    var data ={"filters":[{"name":"grp","label":"Area of Interest"},{"name":"payType","label":"Position Type"},{"name":"locationCode","label":"Location"}],"results":{"pageTitle":"Search Results","zeroResultsMessage":"We're sorry but we have no job openings at this time that match your search criteria. Please try another search.","searchFailureMessage":"Oops! Something went wrong.  Search has encountered a problem. Try searching again","resultsFoundLabel":"results found","bookmarkText":"Bookmark This","pageSize":"250","sortOrder":"00001000","shareText":"Share",
        "fields":[{"name":"ptitle","label":"Published Job Title"},{"name":"num","label":"Req Num"},{"name":"locationCode","label":"Location (Site)"},{"name":"payType","label":"Base Pay Type"}]},"pagefilter":{"page":counter},"rl":"enUS"}
    $.ajax({
      url : 'https://recruiting.adp.com/srccar/public/rest/1/695141/search/',
      headers: {
        "Content-Type": "application/json"
      },
      type : 'POST',
      data : JSON.stringify(data),
      dataType: "json",
      async : false,
      success : function(result){
        json = result.jobs;
        limit = result.pages +1;
        for(var i = 0; i<json.length; i++) {
          var job = {};
          job.title = json[i].ptitle;
          job.url = json[i].url;
          var geoUS = new Geo(Object.keys(countries),Object.values(countries));

         // msg (`${json[i].city} ⇝ ${json[i].state}`);
        
          var newLocation = geoUS.doCleaning( json[i].state); 
          job.location = json[i].city + ", " +newLocation[0];
          job.source_location = json[i].city + ", " +newLocation[0];

          job.source_jobtype = json[i].type;
          //job.logo = elem.querySelector("").getAttribute("src").trim();
          //job.source_apply_email = elem.querySelector("").textContent.trim();
          //job.source_empname = elem.querySelector("").textContent.trim();
         // job.source_jobtype =json[i].typeOfFulltime;
          //job.source_salary = elem.querySelector("").textContent.trim();
          
          if (json[i].description.length < 200) job.flag_active = 0; 
          job.temp = '11/03/2021';
          job.reqid = json[i].num;
          jobs.push(job);
        }
        counter = counter + 1;
      },
      error: function(error){
        msg(error);
      }
    });
  } while (counter < limit);

  out["jobs"]= jobs;
  return out;
})();

function Geo(countryCodesArr, countriesArr) {
  this.countryCodesArr = countryCodesArr;
  this.countriesArr = countriesArr;
  this.doCleaning = (word)=>{
    var result, countryResult;
    result = this.doSearch(this.countryCodesArr,word);
    countryResult = this.countriesArr[result];
    return new Array(countryResult, result);
  }
  this.doSearch = (arraySearch, targetValue)=> {
    let arrayDoSearch = arraySearch;
    let length = arrayDoSearch.length;
    for(var item = 0; item<length; item++){
      if(arrayDoSearch[item] === targetValue){
        console.log('\033[36m Find');
        return item;
      }
    }  
  }
}