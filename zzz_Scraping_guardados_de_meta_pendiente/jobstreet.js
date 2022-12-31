//jobstreet
//https://www.jobstreet.com.sg/en/job-search/jobs-at-master-systems-marine-pte-ltd/
FURUNO SINGAPORE	
https://talent.com/private/tools/jobs/pageCompanyView.php?id=154392

(function() {
    var out = {};
    const formatDate = (value) => {
    let date = new Date(value);
    const withCero = n => n < 10 ? `0${n}` : n;
    return `${withCero(date.getMonth()+1)}/${withCero(date.getDate())}/${date.getFullYear()}`;
  }
    //document.querySelector('h1[class="sx2jih0 zcydq84u _18qlyvc0 _18qlyvc1x _18qlyvc3 _18qlyvca"]').click();
    var html_jobs = document.querySelectorAll('div[class="sx2jih0 zcydq85a zcydq8n cC-kh_0"]');
    // var html_jobs = document.querySelectorAll('#contentContainer > div.sx2jih0.zcydq85a > div > div > div > div.sx2jih0.zcydq8r.zcydq8p._16wtmva0 > div > div > div > div.sx2jih0.zcydq85a.zcydq8n.cC-kh_0');
    var jobs = [];
    for (var x in html_jobs) {
        if (typeof html_jobs[x] == "function") continue;
        if (typeof html_jobs[x] == "number") continue;
        var job = {};
        var elem = html_jobs[x];


        job.title = elem.querySelector('div.sx2jih0.zcydq86m h1').textContent.trim();
        var full_html=elem.querySelector('div[data-automation="jobDescription"]');
        
        let aux = Array.from(elem.querySelectorAll('span')).filter(x => x.textContent.search(/Posted on/gmi) > -1);
        aux[0]!=null ? job.dateposted_raw=formatDate(aux[0].textContent.replace('Posted on','').trim()) : job.dateposted_raw='';
        const auxExperience = [...elem.querySelectorAll('li')].find(e => e?.textContent.match(/\(?\d{1,2}\)?\s?\+?\s?(\s?(-|to|–)\s?\d{1,2}\+?)?\syears?/gi));
        if (auxExperience) {
            job.experience_required = auxExperience.textContent.match(/\(?\d{1,2}\)?\s?\+?\s?(\s?(-|to|–)\s?\d{1,2}\+?)?\syears?/gi)[0];
        }
        job.source_location = '';
        job.location = 'Singapore, SG';
        // job.dateposted_raw = elem.querySelector('').textContent.trim();
        // job.source_benefit=elem.querySelector('').textContent.trim();
        
        

        var desc = full_html;
        // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj 
        /*
        let aux = Array.from(div.querySelectorAll('li')).filter(x => x.textContent.search(/years/gmi) > -1);
        aux[0]!=null ? job.experience_required=aux[0].textContent.trim().match(/\d-\d\s|\d\s|(\d)|years/ig)?.join('') : job.experience_required='';
        //*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
        
        for (const a of desc.querySelectorAll('a, button, script')) { // Borra todos los que encuentre
            if (a){ 
              a.remove(); 
            } 
          }
        
          job.html = desc.innerHTML.trim(); 
        
        
          //job.html = removeTextBefore(job.html, "", false);
          //job.html = removeTextAfter(job.html, "", false);
        
         //job.html = job.html.split("").shift();
         //job.html = job.html.split("").shift();
        
          //job.html = job.html.replace("","").trim();
        
          job.html      = cleanHTML(job.html);
          var tmp       = document.createElement('div');
          tmp.innerHTML = job.html;
          job.jobdesc   = tmp.textContent.trim();
          job.jobdesc   = cleanHTML(job.jobdesc);

        
        job.temp = 1;
        jobs.push(job);
    }

    out["jobs"] = jobs;
    return out;
})();