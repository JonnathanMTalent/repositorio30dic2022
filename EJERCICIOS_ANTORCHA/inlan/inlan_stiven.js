//  https://rmbiccjobs.engageats.co.uk/LoginV2.aspx?enc=vDVLPY6BrOnmx9szwB5icMU/Bp97ap1BlI/jb0LhRYVeoh/cn5bYgvW%209EbbSw7a

//infinity

(function() {
	var out = {};
  	  if (typeof pass_it == "undefined") pass_it = {};
  if (!pass_it["cont"]) {
    out["pass_it"] = {
      cont: 0,
      totalJobs: 0,
      cont_page:1,
      jobs: []
    }
  }
  else {
    out["pass_it"] = pass_it;
  }
    out.waitFor = '#ctl00_CPH1_vcyS_vsGrid_ctl00 > tbody>tr';
    return out;
})();

//before extract
(function() {
    let out = {};
    out["pass_it"] = pass_it;
    let container = Array.from(document.querySelectorAll('#ctl00_CPH1_vcyS_vsGrid_ctl00 > tbody>tr')); // Main job container
    msg(container.length);
    if (out["pass_it"].totalJobs === 0) {
        let jobs = []; // This will contain all the extracted jobs
        for (let elem of container) {
            let job = {};
            job.title = elem.querySelector('.VacTitle').textContent.trim();
            job.source_location = "",
                job.location = "Londod,UK"
            job.dateposted_raw = elem.querySelector("table > tbody > tr > td:nth-child(3)").textContent.trim();

            job.dateposted_raw = getDateFromText(job.dateposted_raw, "/", true)
            /*job.source_location = elem.querySelector('div[class*="job-item-location"]').textContent.trim();
            job.location = job.source_location;
            var dateAux = new Date(elem.querySelector('div[class*="job-item-post-date"]').textContent.trim());
            job.dateposted_raw = dateAux.toLocaleDateString("en-US");*/
            job.temp = 96;
            jobs.push(job);
        }
        out["pass_it"].jobs = jobs;
        out["pass_it"].totalJobs = jobs.length;
        container[out["pass_it"].cont].querySelector('input[class*="gridImageButton icon btnCommonView"]').click();
        //msg("Clicked Job = " + out["pass_it"].jobs[out["pass_it"].cont].title);
    } else {
        container[out["pass_it"].cont]?.querySelector('input[class*="gridImageButton icon btnCommonView"]').click();
        //msg("Clicked Job = " + out["pass_it"].jobs[out["pass_it"].cont].title);
    }
    out.waitFor = '.descWidth .unorderListPadding';
   //out.wait= true;
    return out;
})();

function getDateFromText(date_text, separator, is_dateposted) {
  const current_data = new Date();
  const current_year = current_data.getFullYear();
  const current_month = current_data.getMonth(); //4
  const days_of_the_months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  let leap_year = false;
  if (((current_year % 4 == 0) && (current_year % 100 != 0)) || (current_year % 400 == 0)) {
      days_of_the_months[1] = 29; //is a leap year
      leap_year = true;
  }
  const datetext_aaray = date_text.split(separator);
  let numer_in_datetext = 0;
  let days_conter = 0;
  datetext_aaray.forEach(word => {
      if (word.match(/\d+/)) numer_in_datetext = parseInt(word);
      if (word.match(/Today|Now|Hours?|minutes?|Hoy|Ahora|Horas?|minutos|aujourd'hui|maintenant|heures?/i)) days_conter = 0;
      else if (word.match(/Yesterday|Ayer|Hier/i)) days_conter = 1;
      else if (word.match(/Days?|Días?|jours?/i)) days_conter = numer_in_datetext;
      else if (word.match(/Weeks?|Semanas|semaines?/i)) days_conter = numer_in_datetext * 7;
      else if (word.match(/Months?|Mes(es)?|mois/i)) {
          const n = days_of_the_months.length;
          let index_months;
          if (is_dateposted) index_months = (current_month - numer_in_datetext >= 0) ? current_month - numer_in_datetext : 12 - Math.abs(current_month - numer_in_datetext); //to dateposted
          else index_months = current_month; //to dateclosed
          for (j = 0; j < numer_in_datetext; j++) {
              days_conter += days_of_the_months[(index_months % n + n) % n]; //Accessing the month array circularly
              index_months += 1;
          }
      } else if (word.match(/Years?|Años?|années?/i)) {
          if (leap_year) days_conter = numer_in_datetext * 366;
          else days_conter = numer_in_datetext * 365;
      }
      if (days_conter != 0) return;
  });
  //days of the current month + - days to close the job
  let total_days = current_data.getDate();
  if (is_dateposted) total_days -= days_conter;
  else total_days += days_conter;
  const mls_to_get_dateclosed = current_data.setDate(total_days); //amount of mlg from Jan 1, 1970 to (current date - posted date)
  const dateclosed = new Date(mls_to_get_dateclosed); //posted date
  let month = (dateclosed.getMonth() + 1) < 10 ? `0${(dateclosed.getMonth() + 1)}` : (dateclosed.getMonth() + 1);
  let day = (dateclosed.getDate()) < 10 ? `0${(dateclosed.getDate())}` : (dateclosed.getDate());
  const dateclosed_formated = `${month}/${day}/${dateclosed.getFullYear()}`; //posted date in M/D/Y format
  return dateclosed_formated;
}


//extract
(function () {
    var out = {};
    var jobs = [];
    out["pass_it"] = pass_it;
    var job = out["pass_it"].jobs[out["pass_it"].cont];
    var full_html = document.querySelector('.descWidth .unorderListPadding');
    // remove something from the jobdatata
    if (typeof cleanHTML == "undefined") cleanHTML = function (x) { return x };
    if (typeof msg == "undefined") msg = console.log;
    if (full_html) {
      job.url = window.location.href;
      //job.reqid = job.url.split('=').pop().trim();
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
    //window.history.back();
    window.location.href ="https://rmbiccjobs.engageats.co.uk/LoginV2.aspx?enc=vDVLPY6BrOnmx9szwB5icMU/Bp97ap1BlI/jb0LhRYVeoh/cn5bYgvW%209EbbSw7a"
    //document.querySelector('div[class="job-actions-back"] button').click();
  //   document.querySelector('input[id$="VacancySearchButton"]').click();
    jobs.push(job);
    out["jobs"] = jobs;
    out.html=true;
    out.waitFor = '#ctl00_CPH1_vcyS_vsGrid_ctl00 > tbody>tr';
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
  
//BEFORE PAGINATION

(()=> {
    let out = {};
    out.wait = true
    out.waitFor = '.rgPageNext';//Job selector /// selector
    return out;
})();


//PAGINATION

//pagination
(function () {
    var out = {};
    out["pass_it"] = pass_it;
    var selector = '[class="rgPagerCell NextPrevAndNumeric"]>div.rgWrap>a';
    if (out["pass_it"].cont < (out["pass_it"].totalJobs - 1)) {
      out["pass_it"].cont += 1;
      out["has_next_page"] = true;
    }
    //stop condition
    else {
      out["has_next_page"] = false;
      out["pass_it"].cont_page += 1;
          var all_elems = document.querySelectorAll(selector);
          [].forEach.call(all_elems, function(elemento) {
              if (elemento.textContent.trim() == out["pass_it"].cont_page) {
                  //msg("click!!!!!"+elemento.textContent.trim());
                  elemento.click();
                  out["has_next_page"] = true;
                  out["pass_it"].cont=0;
                  out["pass_it"].totalJobs=0;
  
                  //msg('__________________OTRAAAAAAAAAAAAAAA '+out["pass_it"].cont_page)
                  
              }
          });
    }
    msg(out["pass_it"].cont);
    out.waitFor = '#ctl00_CPH1_vcyS_vsGrid_ctl00 > tbody>tr';
    out.pic=true;
    out.html=true;
    //out.html=true;
    return out;
  })();
  
  
