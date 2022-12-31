// extract
(function() {
    var out = {};
    if(typeof pass_it == "undefined") pass_it = {};
      if (!pass_it["cont"]) {
        out["pass_it"] = {
          "cont": 0,
          "jobs": 0
        };
      } else {
        out["pass_it"] = pass_it;
      }
      var element = document.querySelector("pre").textContent;
      var json = JSON.parse(element);
      var jobs = json.data; /*la ruta de los jobs.  Ej.:  var jobs = json.jobList;*/
    var returnedJobs = [];  
    for(i in jobs) {
          var job = {};/*init*/
      var dom = "https://visionairepartners.com/wp-content/plugins/bullhorn-oscp/#/jobs/"; // Domino del url
        job.title    = jobs[i].title;
        job.url      = dom + jobs[i].id;
        //job.location = jobs[i].locationSelector;
        job.temp = "Jan-2020";
        returnedJobs.push(job);
      }
      out["pass_it"]["jobs"] = returnedJobs.length;
    out["jobs"]= returnedJobs;
      return out;
  })();
  //PAGINATION
  (function() {
      var out = {};
      if(typeof msg == "undefined") msg = function(x){return x;};
      out["pass_it"] = pass_it;
          if (out["pass_it"]["jobs"] < 30) {
          //last page
        out["has_next_page"] = false;
      } else if (out["pass_it"]["jobs"] > 0) {
         out["pass_it"].cont += 30;
        var beforePageVariable   = "https://public-rest33.bullhornstaffing.com/rest-services/17EG1/search/JobOrder?start="; 
        var afterPageVariable    = "&query=(isOpen:1)%20AND%20(isDeleted:0)&fields=id,title,publishedCategory(id,name),address(city,state,countryName),employmentType,dateLastPublished,publicDescription,isOpen,isPublic,isDeleted,publishedZip,salary,salaryUnit&count=30&sort=-dateLastPublished&showTotalMatched=true"; 
        var url = beforePageVariable + out["pass_it"].cont + afterPageVariable;
        window.location.href = url;
        msg(url);
        out["has_next_page"] = true;
      }
      else {
        out["has_next_page"] = false;
      }
      out["wait"] = true;
      return out;
      })();