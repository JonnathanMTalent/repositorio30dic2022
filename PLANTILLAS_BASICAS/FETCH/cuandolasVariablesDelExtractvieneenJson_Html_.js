//fetch limpia 
(async () => {
    let out = {};
     out["pass_it"] = pass_it;
    if (typeof msg == "undefined") msg = console.log;
    try {
        let jobs = [];
        const resp = await fetch("https://karriere.xxxlutz.de/admin/component/edit/Jobs_View_Component/View/json-data?start="+out.pass_it.counter+"&limit=20&componentId=67-496-view&form_description=&form_position=&form_region=&form_office=&form_coordinates=&form_distance=30&form_ed_DE-AH=false&form_ed_DE-PART=false&form_ed_DE-FULL=false", {
  "headers": {
    "accept": "application/json, text/javascript, */*; q=0.01",
    "accept-language": "es-ES,es;q=0.9",
    "sec-ch-ua": "\"Google Chrome\";v=\"107\", \"Chromium\";v=\"107\", \"Not=A?Brand\";v=\"24\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "x-requested-with": "XMLHttpRequest"
  },
  "referrer": "https://karriere.xxxlutz.de/jobs?form_description=&form_coordinates=&form_distance=30&form_ed_DE-AH=false&form_ed_DE-TZ=false&form_ed_DE-TG=false&form_ed_DE-VZ=false&form_ed_DE-VT=false&form_ed_DE-VTG=false&67-496-view-searchForm=true&67-496-view-searchForm-post=true",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": null,
  "method": "GET",
  "mode": "cors",
  "credentials": "include"
});
        const data = await resp.json();
        msg("En el data hay: "+data); // ver lo que trae el json
        out.pass_it.jobsPerPage=20;
        out.pass_it.jobsInPage = data.rows.length;
        // msg('jobsPerPage: '+out.pass_it.jobsPerPage+' jobsInPage'+out.pass_it.jobsInPage);
        for(let x = 0 ; x < data.rows.length ; x++){ //poner el contenedor de  los jobs
            let elem = data.rows[x];  //poner tambien el contenedor de los jobs
            let job = {};
            var elemento = elem.content;

            
            //ARMANDO EL ELEMENTO:
 
            let desc='<div id="jobdesc"><h3>'+elemento+'</h3></div>';
            const parseDoc = new DOMParser();
            const doc = parseDoc.parseFromString(desc, 'text/html')
            // msg('En el doc hay: '+doc);
            
//     ███████████████████████████████ variables█████████████████████████████████████  /*  
            job.title=doc.querySelector('a div div[class*="item item--first"] div.itemInner').textContent.trim();
            job.source_jobtype=doc?.querySelector('a div div[class*="item item__employment  item__employment--mobileWide "] div.itemInner')?.textContent.trim();
            job.source_location=doc.querySelector('a div div[class*="item item--region"] div.itemInner').textContent.trim();
            job.url=doc.querySelector('a[class*="xxxlutzkarrierecenter-jobsView__jobLink"]').href.trim();
            job.location=job.source_location.split(' ').pop();
//*/// ████████████████████████████████████████████████████████████████████
            
        

            job.temp = `jjjms`;
            jobs.push(job)
        }
        //descomentar si se usará un html
        // const data = await resp.text();
        // const parseDoc = new DOMParser();
        // const doc = parseDoc.parseFromString(data, 'text/html')
        out["jobs"] = jobs;
        return out;
    } catch (err) {
        throw err;
    }
})();

