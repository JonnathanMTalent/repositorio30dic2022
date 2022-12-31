//Infinity
(function () {
    var out = {};
    out['pass_it'] = {
      offSet: 1,
      limit: 0,
      urls: ["&filter={%22contract_type%22:[],%22employment_area%22:[],%22entry_level%22:[]}&with_event=true"]
    };
    return out;
  })();
  //extrac
  (async () => {
      let out = {};
      let jobs = [];
      out["pass_it"] = pass_it;
      //https://careers.lidl.co.uk/search_api/jobsearch?page=2&query=warehouse%20operative&filter={%22contract_type%22:[],%22employment_area%22:[],%22entry_level%22:[]}&with_event=true
      //https://careers.lidl.co.uk/search_api/jobsearch?page=2&query=shift%20manager&filter={%22contract_type%22:[],%22employment_area%22:[],%22entry_level%22:[]}&with_event=true
      try {
          const fetchPro = fetch(`https://careers.lidl.co.uk/search_api/jobsearch?page=${out.pass_it.offSet}${out.pass_it.urls.slice(0,1)}`, {
              "headers": {
                  "accept": "*/*",
                  "accept-language": "en,es-419;q=0.9,es;q=0.8",
                  "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"104\", \"Opera GX\";v=\"90\"",
                  "sec-ch-ua-mobile": "?0",
                  "sec-ch-ua-platform": "\"Windows\"",
                  "sec-fetch-dest": "empty",
                  "sec-fetch-mode": "cors",
                  "sec-fetch-site": "same-origin"
              },
              "referrer": `https://careers.lidl.co.uk/jobsearch?page=${out.pass_it.offSet}${out.pass_it.urls.slice(0,1)}`,
              "referrerPolicy": "strict-origin-when-cross-origin",
              "body": null,
              "method": "GET",
              "mode": "cors",
              "credentials": "include"
          });
          msg("\x1b[45m" + `https://careers.lidl.co.uk/search_api/jobsearch?page=${out.pass_it.offSet}${out.pass_it.urls.slice(0,1)}`)
          const resp = await fetchPro;
          // console.log(resp);
          let data = await resp.json();
          //console.log(data);
          //div = document.createElement("div");
          //div.innerHTML = data;
          let json = data.result.hits;
          out.pass_it.limit = data.result.count;
          for (let i = 0; i < json.length; i++) {
              var job = {};
              var elem = json[i];
              job.reqid = elem.jobId;
              job.title = elem.title;
              let track = elem.url;
              job.url = `https://careers.lidl.co.uk${track}`;
              job.location = elem.location.city;
              job.source_benefit = elem;
              let regex1 = /remote/gi;
              let alternative_location = job.location;
              job.source_location = alternative_location;
              //job.dateposted_raw = elem.querySelector('').textContent.trim();
              //job.logo = elem.querySelector('').getAttribute("src").trim();
              //job.source_apply_email = elem.querySelector('').textContent.trim();
              //job.source_empname = elem.querySelector('').textContent.trim();
              job.source_jobtype = elem.contractType;
              job.source_salary = elem.salaryValue;
              //All old conditions
              if (job.reqid == "129874") job.location = "Newbury, UK";
              var titletoinclude = /Retail Shift Manager\(30 to 40 hours\)|Retail Shift Manager \(35 to 40 hours\) |Retail Shift Manager \(40 hours\) |Retail Shift Manager \(40 Hours, New Store Opening\)|Retail Shift Manager \(Full time\) |Retail Shift Manager \(Night |Shift, 3 Months FTC\) |Retail Shift Manager \(Open Day, 14th September, 40 hours\)|Shift Manager|Shift Manager \(10 to 35 hours\) |Shift Manager \(20 hours\) |Shift Manager \(21 to 35 hours\) |Shift Manager \(25 to 30 hours\) |Shift Manager \(25 to 35 hours\) |Shift Manager \(30 hours\) |Shift Manager \(30 hours, Night |Shift\) |Shift Manager \(30 to 35 hours\) |Shift Manager \(30 to 40 hours\) |Shift Manager \(31 to 40 hours\)|Shift Manager \(31 to 40 hours, New Store Opening\) |Shift Manager \(35 hours\) |Shift Manager \(35 to 40 hours\) |Shift Manager \(35 to 40 Hours, Night |Shift\) |Shift Manager \(40 hours\) |Shift Manager \(40 hours, New Store Watton\) |Shift Manager \(Full Time\) |Shift Manager \(Full Time, New Store\) |Shift Manager \(Night Shift\) |Shift Manager \(Night Shift, 40 Hours\) |Shift Manager \(Part Time\) |Shift Manager \(Up to 30 Hours\) |Shift Manager \(Up to 40 hours\)/g;
              var titlefound = job.title.match(titletoinclude);
              if (titlefound) {
                  job.client_tag = "sm";
              }
              var titletoinclude2 = /Maintenance Warehouse Operative \(37\.5 hours\)|Senior Warehouse Operative \(30 to 40 Hours\)|Senior Warehouse Operative \(30 to 40 Hours, Fruit and Veg\)|Senior Warehouse Operative \(30 to 40 Hours, Goods In\)|Warehouse Operative|Warehouse Operative - Night Shifts|Warehouse Operative \( 30 to 40 Hours, PM Shift\)|Warehouse Operative \( Ambient Shift, 6:00am to 2:30pm\)|Warehouse Operative \(11 to 30 hours, PM and Night shifts\)|Warehouse Operative \(15:00 to 23:00\)|Warehouse Operative \(19:00 to 03:00\)|Warehouse Operative \(20 to 30 Hours, Evenings\)|Warehouse Operative \(21:30 to 05:30\)|Warehouse Operative \(30 to 40 Hours, Ambient\)|Warehouse Operative \(30 to 40 Hours, Chiller\)|Warehouse Operative \(30 to 40 Hours, Fruit & Veg\)|Warehouse Operative \(30 to 40 Hours, Night Shift\)|Warehouse Operative \(30 to 40 hours, Night shifts\)|Warehouse Operative \(40 Hours\)|Warehouse Operative \(Afternoon Shift\)|Warehouse Operative \(AM Shift Full, Part Time\)|Warehouse Operative \(AM Shift, Full Time\)|Warehouse Operative \(Distribution & Recycling\)|Warehouse Operative \(Evenings and Weekends, Chiller\)|Warehouse Operative \(Freezer Shift, 11:30am to 7:30pm\)|Warehouse Operative \(Fresh Shift, 2:00pm to 9:30pm\)|Warehouse Operative \(Full Time\)|Warehouse Operative \(Full Time, Night Shift\)|Warehouse Operative \(Goods In\)|Warehouse Operative \(Magna Park, 40 hours\)|Warehouse Operative \(Magna Park, Reach Truck, 40 hours\)|Warehouse Operative \(Morning Shift\)|Warehouse Operative \(Night Shift\)|Warehouse Operative \(Night Shift, 10:00pm to 6:30am\)|Warehouse Operative \(Night Shift, 35 to 40 Hours\)|Warehouse Operative \(Part Time\)|Warehouse Operative \(Part Time\/Full Time, Fixed Term\)|Warehouse Operative \(PM hours, 30 to 40 hours\)|Warehouse Operative \(PM Shift Full, Part Time\)|Warehouse Operative \(PM Shift, Chiller\)|Warehouse Operative \(PM Shift, Freezer\)|Warehouse Operative \(PM Shift, Fruit and Veg\)|Warehouse Operative \(PM shift, Part Time, 4pm to 10pm hours\)|Warehouse Operative \(Reach Truck\)|Warehouse Operative \(Twilight Shift\)|Warehouse Operative \(upto 20 hours, Weekend shifts\)|Warehouse Operative \(Weekends, Chiller\)|Warehouse Operative Afternoon Shift|Warehouse Operative Hiring Event 08.10.2022|Warehouse Operative Reach Truck|Warehouse Operatives|Warehouse Operative (Twilight Shift)/g;
              var titlefound2 = job.title.match(titletoinclude2);
              if (titlefound2) {
                  job.client_tag = "warehouse";
              }
              /* if (url.indexOf("query=shift") !== -1) {
                   job.client_tag = "sm";
               } 
               if (job.url.indexOf("customer-service-advisor-call-centre-department-140030") > -1) {
                   job.client_tag = "head office";
               }*/
              /*else {
                  job.client_tag = "warehouse";
              }*/
              job.temp = "BC08262022";
              if (job.reqid != "140030") {
                  jobs.push(job);
              }
          }
          const matchs = {
              title: /Warehouse Operative - Night Shifts|Warehouse Operative Afternoon Shift/gi,
              link: 'https://careers.lidl.co.uk/jobs/warehouse-operative-night-shift-170155|https://careers.lidl.co.uk/jobs/warehouse-operative-afternoon-shift-170159',
              location: /Doncaster, UK|Hatfield, UK|Conisbrough, UK/gi
          }
          jobs.forEach((j, i) => {
              if (j.title && j.url && j.location) {
                  if (j.title.match(matchs.title) && j.url.match(new RegExp(matchs.link, 'gi')) && j.location.match(matchs.location)) {
                      jobs[i].client_tag = 'Doncaster'
                  }
              }
          })
          jobs.length < 1 ? jobs.push({title:Math.random()}) : msg("Has Jobs")
          // console.log(jobs);
      } catch (error) {
          var job_fantasma = {
              title: "GHOST"
          };
          jobs.push(job_fantasma);
          throw err;
          // expected output: ReferenceError: nonExistentFunction is not defined
          // Note - error messages will vary depending on browser
      }
      out['jobs'] = jobs;
      out.pass_it.contjob += jobs.length;
      return out;
  })();
  //pagination
  (function () {
    var out = {};
    out["pass_it"] = pass_it;
    out.pass_it.offSet ++;
    msg(`${out.pass_it.contjob}.........${out.pass_it.limit}`);
    if (out.pass_it.contjob <= out.pass_it.limit) {
      out["has_next_page"] = true;
    } else {
      out["has_next_page"] = false;
      if (out["pass_it"]["urls"].length > 0) {
        out["pass_it"].urls.shift();
        msg('\x1b[36m%s\x1b[0m' + '...... '+out["pass_it"].urls);
        out["has_next_page"] = true;
      } else {
        out["has_next_page"] = false;
      }
    }
  //   out["wait"] = false;
    return out;
  })();