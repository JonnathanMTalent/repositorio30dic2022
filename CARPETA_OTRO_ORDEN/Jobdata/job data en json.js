job data en json
// caso echo con einer
(function() {
  var job = {};
  var out = {};
  //var counter = 1;
  var limit = 0;
  var json;
  //do {
  var data = {};
  var id = window.location.href.split("r=").pop();
  $.ajax({
    url : 'https://recruiting.adp.com/srccar/public/rest/1/1301313/job/'+id+'?prc=RMPOD1&rl=enUS',
    headers: {
      "accept": "application/json, text/plain, */*",
      "accept-language": "es-ES,es;q=0.9",
      "sec-ch-ua": "\"Chromium\";v=\"92\", \" Not A;Brand\";v=\"99\", \"Google Chrome\";v=\"92\"",
      "sec-ch-ua-mobile": "?0",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "Content-Type": "application/json;charset=utf-8"
    },
    type : 'GET',
    //data : JSON.stringify(data),
    // dataType: "json",
    async : false,
    success : function(result){
      json = result;
      var full_html1 = json.fields[3].content;

      job.html ="<h3>"+full_html1 +"</h3>";
      
      job.html = cleanHTML(job.html);
      var tmp = document.createElement("DIV");
      tmp.innerHTML = job.html;
      job.jobdesc = tmp.textContent.trim();
    },
    error: function(error){
      msg(error);
    }
  });
  //} while (counter < limit);

  out["job"]= job;
  return out;
})();