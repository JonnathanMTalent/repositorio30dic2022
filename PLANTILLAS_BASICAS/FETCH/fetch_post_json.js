//INFINITY
//infinity
(() => {
  var out = {};
  out.pass_it = {
      "counter":1,
      "limit":0
  }
  return out;
})()

//EXTRACT
(async () => {
  var jobs = [];
  var out = {};
  out.pass_it=pass_it;

  //out["pass_it"] = pass_it;

  var json;
  var jsonDesc;
  var data = {"requests":[{"indexName":"prod_CCL_careers","params":"query=&maxValuesPerFacet=100&page="+out.pass_it.counter+"&facets=%5B%22field_location%22%2C%22field_vacancy_type%22%2C%22field_job_level%22%5D&tagFilters="}]};

  const resp = await fetch("https://v5k35cktwk-1.algolianet.com/1/indexes/*/queries?x-algolia-agent=Algolia%20for%20vanilla%20JavaScript%20(lite)%203.24.0%3Binstantsearch.js%202.1.4%3BJS%20Helper%202.21.2&x-algolia-application-id=V5K35CKTWK&x-algolia-api-key=ac6b3ef91a9d6a6a404f9ece266ca716", {
  "headers": {
    "accept": "application/json",
    "accept-language": "es-ES,es;q=0.9",
    "content-type": "application/x-www-form-urlencoded",
    "sec-ch-ua": "\"Chromium\";v=\"104\", \" Not A;Brand\";v=\"99\", \"Google Chrome\";v=\"104\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site"
  },
    method: 'POST',
    body: JSON.stringify(data)
});

  const result = await resp.json();
  //msg(result);

//   if (out.pass_it.offSet == 0)
//     out.pass_it.limit = result.total;
  out.pass_it.jobsPerPage=result.results[0].hitsPerPage;
  json = result.results[0].hits;
  out.pass_it.jobsInPage=json.length;
  //msg(json);
  msg('jobsPerPage: '+out.pass_it.jobsPerPage+' ..jobsInPage: '+out.pass_it.jobsInPage);
  for (var elem of json) {
    var job = {};
    // job.reqid = elem.bulletFields[0];
    job.title = elem.custom_title;
    job.reqid = elem.objectID;
    job.url=elem.url
    job.temp = 8;
    job.source_location=elem.field_location;
    job.source_location!='' && job.source_location!=null && job.source_location!=undefined? job.location=job.source_location.replace('USA','US') : job.location='Cambridge, UK';
    ///////////////////////////////
    if(job.title.length>0 && job.location!='' && job.location!=null && job.location!=undefined)jobs.push(job);
  }

  out.jobs = jobs;
  return out;
})();

//PAGINATION
(()=>{
  var out={};
  out.pass_it=pass_it;
  var { counter, jobsPerPage, jobsInPage } = out.pass_it;
  out.pass_it.counter+=1;
  out.has_next_page=jobsInPage==jobsPerPage?true:false;
  return out;
})()