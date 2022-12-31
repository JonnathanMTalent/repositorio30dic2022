
(function () {
    const out = {};
    const jobs = [];
    const html_jobs = document.querySelectorAll('.vsr-grid-job');
  
    if (html_jobs.length > 0) {
      for (let x in html_jobs) {
        if (typeof html_jobs[x] === 'function') continue;
        if (typeof html_jobs[x] === 'number') continue;
  
        const job = {};
        const elem = html_jobs[x];
  
        job.title = elem.querySelector('.vsr-job__title a').textContent.trim();
        job.url = elem.querySelector('.vsr-job__title a').href.trim();
        job.reqid = job.url.split('vacancies/').pop().split('/').shift();
        job.source_location = elem.querySelector('[id^="div_VacV_LocationID_"]').textContent.trim();
        job.source_location =  job.source_location.replace("Location","").trim();
        job.location = elem.querySelector('[id^="div_VacV_LocationID_"]').textContent.trim().replace("Location","").replace("date closed is before last 24 hours","Surbiton, Surrey");
  
        if (job.location.search(/Mobile|Not Specified|Restaurants/i) > -1) {job.location = 'United Kingdom';}
  
        job.source_jobtype = elem.querySelector('[id^="div_VacV_VacancyTypeID_"]').textContent.trim().replace("Job Type","");
  
        let salary = elem.querySelector('[id^="div_VacV_DisplaySalary_"]').textContent.trim();
        if (salary.indexOf('£') > -1) {
          job.source_salary = salary.split(/Up to|Package|up to|Circa/).pop().split(/per|pa|ph|\+|DOE|dependant/).shift().replace(/£Competitive \&|£competitive/g,"");
        }
  
        job.dateposted_raw = elem.querySelector('[id^="div_VacV_DatePosted_"]').textContent.trim().replace(/Date Posted|date closed is before last 24 hours/g,"");
        job.dateposted_raw = getDateFormat(job.dateposted_raw, " ", 0, 1, 2);
        //msg(job.dateposted_raw)
        job.temp = '454646';
  
        jobs.push(job);
      }
    } else {
      const job = {};
      job.title = 'No jobs';
      jobs.push(job);
    }
  
    const seen = new Set();
    let jobsfiltered = jobs.filter(item => {
      const duplicate = seen.has(item.title + item.location + item.url + item.reqid);
      seen.add(item.title + item.location + item.url + item.reqid);
      return !duplicate;
    });
  
    out['jobs'] = jobsfiltered;
    return out;
  })();