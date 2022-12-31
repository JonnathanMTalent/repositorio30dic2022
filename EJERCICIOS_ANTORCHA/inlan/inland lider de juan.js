//infinity
(function() {
  var out = {};
  out.pass_it = {
    cont: 0,
    totalJobs: 0,
    jobs: []
  }
  return out;
})();
//before
(function () {
  let out = {};
  out["pass_it"] = pass_it;
  let container = document.querySelectorAll('Selector de los Jobs'); // Main job container
  msg(container.length);
  if (out["pass_it"].totalJobs === 0) {
    let jobs = []; // This will contain all the extracted jobs
    for (let elem of container) {
      let job = {};
      job.title = elem.querySelector('.job_title a').textContent.trim();
      job.source_location = elem.querySelector('.job_location').textContent.trim();
      job.location = job.source_location;
      job.temp = 96;
      jobs.push(job);
    }
    out["pass_it"].jobs = jobs;
    out["pass_it"].totalJobs = jobs.length;
  }
  container[out["pass_it"].cont].querySelector("a").click();
  msg("Clicked Job = " + out["pass_it"].jobs[out["pass_it"].cont].title);
  out.waitFor = 'Selector de la descripcion';
  return out;
})();
//extract 
(function () {
  var out = {};
  var jobs = [];
  out["pass_it"] = pass_it;
  var job = out["pass_it"].jobs[out["pass_it"].cont];
  var full_html = document.querySelector('Selector de la descripcion');
  if (typeof cleanHTML == "undefined") cleanHTML = function (x) {
    return x
  };
  if (typeof msg == "undefined") msg = console.log;
  if (full_html) {
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
    //job.html = removeTextAfter(job.html, //, true);
    job.html = cleanHTML(job.html);
    var tmp = document.createElement('div');
    tmp.innerHTML = job.html;
    job.jobdesc = tmp.textContent.trim();
    job.jobdesc = cleanHTML(job.jobdesc);
  }
  window.history.back();
  //document.querySelector('').click();
  jobs.push(job);
  out["jobs"] = jobs;
  out.waitFor = 'Selector de los jobs';
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
//Pagination
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

//pagination numeric
(function () {
  var out = {};
  out["pass_it"] = pass_it;
  if (out["pass_it"].cont < (out["pass_it"].totalJobs - 1)) {
    out["pass_it"].cont += 1;
    out["has_next_page"] = true;
    msg("Another Job");
  } else {
    out["has_next_page"] = false;
    out["pass_it"].countPage += 1;
    var all_elems = document.querySelectorAll('div[class="paging-container"] a');
    [].forEach.call(all_elems, function (elemento) {
      if (elemento.textContent.trim() == out["pass_it"].countPage) {
        //msg("click!!!!!"+elemento.textContent.trim());
        elemento.click();
        msg("Another page");
        out["pass_it"].cont = 0;
        out["pass_it"].totalJobs = 0;
        out["has_next_page"] = true;
      }
    });
  }
  //if (out["pass_it"].cont == 1) {
  //  out["pass_it"].cont = (out["pass_it"].totalJobs - 1);
 // }
  return out;
})();