//before extract
(function () {
    let out = {};
    if (typeof pass_it == "undefined") pass_it = {};
    if (!pass_it["cont"]) {
      out["pass_it"] = {
        cont: 0,
        totalJobs: 0,
        jobs: []
      }
    }
    else {
      out["pass_it"] = pass_it;
    }
    let container = Array.from(document.querySelectorAll('div[class="jobs-list"] > div:not(:first-child)')); // Main job container
    msg(container.length);
    if (out["pass_it"].totalJobs === 0) {
      let jobs = [];// This will contain all the extracted jobs
      for (let elem of container) {
        let job = {};
        job.title = elem.querySelector('div[class*="job-item-job-title"]').textContent.trim();
        job.source_location = elem.querySelector('div[class*="job-item-location"]').textContent.trim();
        job.location = job.source_location;
        var dateAux = new Date(elem.querySelector('div[class*="job-item-post-date"]').textContent.trim());
        job.dateposted_raw = dateAux.toLocaleDateString("en-US");
        job.temp = 96;
        jobs.push(job);
      }
      out["pass_it"].jobs = jobs;
      out["pass_it"].totalJobs = jobs.length;
      container[out["pass_it"].cont].click();
      msg("Clicked Job = " + out["pass_it"].jobs[out["pass_it"].cont].title);
    }
    else {
      container[out["pass_it"].cont].click();
      msg("Clicked Job = " + out["pass_it"].jobs[out["pass_it"].cont].title);
    }
    out.waitFor = 'div[class="job-description"] > span:nth-child(2)';
    return out;
  })();
  //extract
  (function () {
    var out = {};
    var jobs = [];
    out["pass_it"] = pass_it;
    var job = out["pass_it"].jobs[out["pass_it"].cont];
    var full_html = document.querySelector('div[class="job-description"] > span:nth-child(2)');
    // remove something from the jobdatata
    if (typeof cleanHTML == "undefined") cleanHTML = function (x) { return x };
    if (typeof msg == "undefined") msg = console.log;
    if (full_html) {
      job.url = document.querySelector('div[class="job-url"] a').href.trim();
      job.reqid = job.url.split('=').pop().trim();
      for (const a of full_html.querySelectorAll('p, span, li')) {
        if (a.textContent.search(/@|http|www./ig) > -1) {
          a.remove();
        }
      }
      var remove_selectors = ['a', 'script', 'i', 'img', 'style', 'button', 'figure', 'noscript', 'svg', 'form', 'input', 'iframe', 'link'];
      if (remove_selectors.length > 0) {
        remove_selectors.forEach(remove_selector => {
          for (const a of full_html.querySelectorAll(remove_selector)) {
            a.remove();
          }
        });
      }
      job.html = full_html.innerHTML.trim();
      //job.html = removeTextBefore(job.html, '', false);
      job.html = removeTextAfter(job.html, /If this role interests you/, true);
      job.html = cleanHTML(job.html);
      var tmp = document.createElement('div');
      tmp.innerHTML = job.html;
      job.jobdesc = tmp.textContent.trim();
      job.jobdesc = cleanHTML(job.jobdesc);
    }
    window.history.back();
    //document.querySelector('div[class="job-actions-back"] button').click();
    jobs.push(job);
    out["jobs"] = jobs;
    out.waitFor = 'div[class="jobs-list"] > div:not(:first-child)';
    return out;
  })();
  function removeTextBefore(html, text, flag) {
    var newHtml = html;
    if (newHtml.search(text) > -1) {
      newHtml = newHtml.split(text).pop();
      if (!flag) {
        newHtml = "<h3>" + text + "</h3>" + newHtml;
      }
    }
    return newHtml;
  }
  function removeTextAfter(html, text, flag) {
    var newHtml = html;
    if (newHtml.search(text) > -1) {
      newHtml = newHtml.split(text).shift();
      if (!flag) {
        newHtml = newHtml + "<p>" + text + "</p>";
      }
    }
    return newHtml;
  }
  //pagination
  (function () {
    var out = {};
    out["pass_it"] = pass_it;
    if (out["pass_it"].cont < (out["pass_it"].totalJobs - 1)) {
      out["pass_it"].cont += 1;
      out["has_next_page"] = true;
    }
    //stop condition
    else {
      out["has_next_page"] = false;
    }
    msg(out["pass_it"].cont);
    return out;
  })();