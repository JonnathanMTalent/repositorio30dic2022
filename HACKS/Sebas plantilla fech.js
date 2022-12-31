(function () {
  let out = {};
  let counter = 1;
  let limit = 0;
  let json;
  //do {
  (async () => {
    try {
      const fetchPro = fetch(
        "https://jb.skillsmapafrica.com/JobSearch/JobBasicSearch",
        {
          method: "POST",
          mode: "cors", // no-cors, *cors, same-origin
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          credentials: "same-origin", // include, *same-origin, omit
          headers: {
            accept: "*/*",
            "accept-language": "en-US,en;q=0.9,es-US;q=0.8,es;q=0.7",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            dxcss:
              "/Images/favicon.ico,/Content/SkillsMapStyles.css,/Content/jqueryui/base/base.css,/Content/jqueryui/base/theme.css,/content/toastr.css,/Content/Jcrop.css,1_17,0_411,1_50,1_53,1_51,1_16,0_415,0_420,0_546,0_424,0_550,1_18,1_14,1_13,1_22,1_40,1_21,1_4",
            dxscript:
              "1_304,1_211,1_185,1_188,1_182,1_280,1_293,1_209,1_217,17_42,1_298,1_198,17_1,1_196,1_254,1_256,1_263,1_262,1_255,1_252,1_259,1_253,1_261,1_258,1_257,1_235,1_248,1_244,1_242,1_251,1_250,1_249,1_246,1_245,1_260,1_241,1_238,1_239,1_240,1_243,1_247,17_15,17_17,1_290,1_296,1_279,1_289,1_286,1_288,17_27,17_24,1_190,1_223,1_208,1_236,17_16,1_215",
            "sec-ch-ua":
              '"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"',
            "sec-ch-ua-mobile": "?0",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-newrelic-id": "VgcGUFBRCRAIUFNQBAQOVg==",
            "x-requested-with": "XMLHttpRequest",
          },
          redirect: "follow", // manual, *follow, error
          referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
          //body: JSON.stringify(data), // body data type must match "Content-Type" header
        }
      );
      //Puedes hacer destructuring. {variable que necesito }
      const resp = await fetchPro;
      console.log(resp);
      const data = await resp.json();
      //const dataString = JSON.stringify(data);
      console.log(data);
      let arr = data.map((jobx) => {
        let job = {};
        job.title = jobx.JobTitle;
        //job.location = jobs.positionOfLocation;
        //job.url = jobs.positionOfUrl;
        //job.dateposted_raw = elem.positionOfDatePosted;
        //job.dateclosed_raw = elem.positionOfDateClosed;
        //job.source_jobtype = elem.positionOfJobtype;
        //job.source_salary = elem.positionOfSalary;
        //job.source_empname = elem.positionOfEmpname;
        //job.logo = elem.positionOfLogo;
        //job.source_apply_email = elem.positionOfEmail;
        job.temp = "1";
        jobs.push(job);
      });
      out.jobs = arr;
    } catch (err) {
      console.log(err);
    }
  })();
  //} while(counter < limit);
  //console.log(out);
  return out;
})();
