//infinite pag

(()=> {
    const out = {};
    if (typeof pass_it == "undefined") pass_it = {};
    if (!pass_it.cont) {
      out.pass_it = {
        cont: 0,
        totalJobs: 0,
        newPage: true,
        jobs: [],
        pages: 0
      };
    } else {
      out.pass_it = pass_it;
    }
    return out;
  })();

  //BEFORE EXTRACT

  (() => {
    let out = {};
    out.pass_it = pass_it;
    if (out.pass_it.newPage) {
        out.pass_it.pages++;
        msg("pagina actual:" + out.pass_it.pages);
        let container = Array.from(document.querySelectorAll('div.job-item:not([class*="job-items-header"])')); // Main job container    
        let jobs = container.reduce((jobsArr, elem) => {
            let job = {};
            job.title = elem.querySelector('div[class*="job-item-job-title has-data"]').textContent.trim();
            job.location = elem.querySelector('div[class*="job-item-location has-data"]').textContent.trim();
            jobsArr.push(job);
            return jobsArr;
        }, []);
        out.pass_it.jobs = jobs;
        out.pass_it.totalJobs = jobs.length;
        container[out.pass_it.cont].click();
    } else {
        let container = Array.from(document.querySelectorAll('div.job-item:not([class*="job-items-header"])')); // Main job container    
        container[out.pass_it.cont].click();
        msg("Clicked Job = " + out.pass_it.jobs[out.pass_it.cont].title);
    }
    out.waitFor = "div#job"; // desc selector
    out.wait = true;
    return out;
  })();

  // EXTRACT

  // extract
  (() => {
    const out = {};
    const jobs = [];
    const selector = "div#job"; // description selector
    out.pass_it = pass_it;
    let job = out.pass_it.jobs[out.pass_it.cont];
    let remove_selectors = ["a", "script", "style", "input", "button", "img"];
    const full_html = document.querySelector(selector);
    if (typeof cleanHTML == "undefined") cleanHTML = function(x) {
        return x;
    };
    if (typeof msg == "undefined") msg = console.log;
    if (full_html) {
        job.url = window.location.href;
        job.reqid = job.url.split("/").pop().trim();
        job.temp = 1;
        job.html = full_html.innerHTML.replace(/&nbsp;/g, " ").trim();
        job.html = job.html.replace(/[\w|.-]+@[\w|-]+(\.[\w-]+){1,4}|\+?\d{3,}|\+\d+|www.\S+|https?\S+|\(\d+\)/gi, "");
        //job.html = removeTextBefore(job.html, "This is what you'll do:", false);
        //job.html = removeTextAfter(job.html, 'Application Instructions', true);   
        job.html = cleanHTML(job.html);
        let tmp = document.createElement('div');
        tmp.innerHTML = job.html;
        job.jobdesc = tmp.textContent.trim();
        job.jobdesc = cleanHTML(job.jobdesc);
        job.jobdesc = job.jobdesc.replace(/<[^>]*>?/g, "");
    } else {
        job.flag_active = 0;
    }
    window.history.back();
    //document.querySelectorAll("td:nth-child(4) input")[out.pass_it.cont].click(); // back button
    jobs.push(job);
    out.jobs = jobs;
    out.wait = true;
    out.waitFor = 'div.job-item:not([class*="job-items-header"])'; // jobs selector
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

  //PAGINATION

  (()=> {
    const out = {};
    out.pass_it = pass_it;
    if (out.pass_it.cont < out.pass_it.totalJobs - 1) {
        out.pass_it.cont += 1;
        out.pass_it.newPage = false;
        out.has_next_page = true;
        msg("Another Job");
    }  else {
            out.has_next_page = false;
            out.pass_it.newPage = false;
        }
    
    msg(out.pass_it.cont);
    out.waitFor = 'div.job-item:not([class*="job-items-header"])';
    out.wait = true;
    return out;
  })();