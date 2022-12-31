(() => {
    let out = {};
    let job = [];
    typeof pass_it == "undefined" ? pass_it = {} : typeof pass_it == "undefined";
    !pass_it.cont ? out.pass_it = {
        "currentPage": 0,
        "expected_jobs": 0,
        "benefit": 0,
        "counter": 1,
        "limit": 0
    } : out.pass_it = pass_it;
    if (typeof cleanHTML == "undefined") cleanHTML = function(x) {
        return x;
    };
    const url = `https://jobs.citizensbank.com/benefits`;
    let home = getBenefit(url);
    let div = document.createElement("div");
    div.innerHTML = home;
    job.source_benefit = div.querySelector('[class="benefits-cp"]').textContent.trim();
    job.source_benefit = cleanHTML(job.source_benefit);
    job.source_benefit = cleanHTML(job.source_benefit);
    out.pass_it.benefit = job.source_benefit;
    return out;
})();
function getBenefit(url) {
    let xhrrequest = new XMLHttpRequest();
    xhrrequest.open("GET", url, false); //URL del ajax que trae la información del job  
    xhrrequest.setRequestHeader("accept", "application/json");
    xhrrequest.setRequestHeader("accept-language", "en-US");
    xhrrequest.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhrrequest.setRequestHeader("sec-ch-ua", "\"Chromium\";v=\"94\", \" Not A;Brand\";v=\"99\", \"Opera GX\";v=\"80\"");
    xhrrequest.setRequestHeader("sec-ch-ua-mobile", "?0");
    xhrrequest.setRequestHeader("sec-ch-ua-platform", "\"Windows\"");
    xhrrequest.setRequestHeader("sec-fetch-dest", "empty");
    xhrrequest.setRequestHeader("sec-fetch-mode", "cors");
    xhrrequest.setRequestHeader("sec-fetch-site", "same-origin");
    let response = "";
    xhrrequest.onreadystatechange = function() {
        if (xhrrequest.readyState == 4 && xhrrequest.status == 200) {
            response = xhrrequest.responseText;
        }
    };
    xhrrequest.send();
    return response;
}



//otra forma

//   ██████╗  ██████╗
//       ██║░██╔════╝
//       ██║░ █████╗
//    ██ ██║░  ╚═══██╗
//    █████║░ ██████╔╝ 
//    ╚════╝ ╚═════╝   ██
(async() => {
    let out = {};
    let job = {};
    const selector = 'description selector';
    const remove_selectors = [];
    //var job = pass_it["job"];
    const full_html = document.querySelector(selector);
    // remove something from the jobdatata
    if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {
        if (full_html.querySelector(remove_selector)) full_html.querySelector(remove_selector).remove();
    });
    if (typeof cleanHTML == "undefined") cleanHTML = function(x) {
        return x;
    };
    if (typeof msg == "undefined") msg = console.log;
    /*Extracting Benefits*/
    let url = `Url benefits`;
    const resp = await fetch(url),
        html = await resp.text(),
        div = document.createElement('div');
    div.innerHTML = html;
    job.source_benefit = div.querySelector('selector containing the benefits').textContent.trim();
    job.source_benefit = cleanHTML(job.source_benefit);
    /*in case you need to clean the benefits*/
    //job.source_benefit = removeTextBefore(job.source_benefit, 'Regular or Temporary:', true);
    //job.source_benefit = removeTextAfter(job.source_benefit, 'Description', true);
    job.html = full_html.innerHTML.trim();
    //job.html = removeTextBefore(job.html, 'Regular or Temporary:', true);
    //job.html = removeTextAfter(job.html, 'Description', true);
    job.html = cleanHTML(job.html);
    let tmp = document.createElement('div');
    tmp.innerHTML = job.html;
    job.jobdesc = tmp.textContent.trim();
    job.jobdesc = cleanHTML(job.jobdesc);
    /*concatenating benefits to the description*/
    job.jobdesc = `${job.jobdesc}\nBenefits\n${job.source_benefit}`;
    out.job = job;
    return out;
  })();
  function removeTextBefore(html, text, flag) {
    let newHtml = html;
    if (newHtml.indexOf(text) > -1) {
        newHtml = newHtml.split(text).pop();
        if (!flag) {
            newHtml = "<h3>" + text + "</h3>" + newHtml;
        }
    }
    return newHtml;
  }
  function removeTextAfter(html, text, flag) {
    let newHtml = html;
    if (newHtml.indexOf(text) > -1) {
        newHtml = newHtml.split(text).shift();
        if (!flag) {
            newHtml = newHtml + "<p>" + text + "</p>";
        }
    }
    return newHtml;
  }