//https://www.tdcx.com/careers/details?jobId=89904&country=Malaysia&page=1 
//fetch limpia 
(async () => {
    let out = {};
    var job = {};
    out.pass_it=pass_it;
    let reqid=out.pass_it.job.link.split('/').pop();
    msg('Reqid=  '+reqid);
    try {
        let jobs = [];
        const resp = await fetch("https://api.tdcx.com/jobs/"+reqid, {
  "headers": {
    "accept": "application/json, text/plain, */*",
    "accept-language": "es-ES,es;q=0.9",
    "if-none-match": "W/\"140c-P/Ar2IYADgocFNFjLqt9EQN9Ukk\"",
    "sec-ch-ua": "\"Chromium\";v=\"104\", \" Not A;Brand\";v=\"99\", \"Google Chrome\";v=\"104\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-site"
  },
  "referrer": "https://www.tdcx.com/",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": null,
  "method": "GET",
  "mode": "cors",
  "credentials": "omit"
});
        const data = await resp.json();
        var remove_selectors = ['a', 'script', 'i', 'img', 'style', 'button', 'figure', 'noscript', 'svg', 'form', 'input', 'iframe', 'link'];
        //out.pass_it.limit=data.noOfPages;
        var htmlin = "";
        for(let x = 0 ; x < data.job.length ; x++){ //poner el contenedor de  los jobs
            let elem = data.job[x];  //poner tambien el contenedor de los jobs
            let job = {};
            htmlin += "<h3>" + elem.content + "</h3><br/>"; 
           
            // jobs.push(job)
        }
var div       = document.createElement("div");
div.innerHTML = htmlin;
var full_html= div
          if (full_html) {
               //remove something from the jobdatata
              if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {
                  if (full_html.querySelector(remove_selector)) full_html.querySelector(remove_selector).remove();
              });
              if (typeof cleanHTML == "undefined") cleanHTML = function(x) {
                  return x
              };
              if (typeof msg == "undefined") msg = console.log;
               job.html =full_html.innerHTML.trim();
              //limpieza de las descripciones
              job.html = removeTextBefore(job.html, `What is your mission?`, false);
              //job.html = removeTextAfter(job.html, ``, true);
              //job.html = removeTextAfter(job.html, ``, true);
              //job.html = removeTextAfter(job.html, ``, true);
              job.html = cleanHTML(job.html);
              var tmp = document.createElement('div');
              tmp.innerHTML = job.html;
              job.jobdesc = tmp.textContent.trim();
              job.jobdesc = cleanHTML(job.jobdesc);
          }
          jobs.push(job)
        //descomentar si se usará un html
        // const data = await resp.text();
        // const parseDoc = new DOMParser();
        // const doc = parseDoc.parseFromString(data, 'text/html')
        
        out["job"] = jobs[0];
        console.table(job)
        return out;
    } catch (err) {
        throw err;
        console.log(err);
    }
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


