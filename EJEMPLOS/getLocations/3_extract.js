//  https://wmg.wd1.myworkdayjobs.com/es/WMGUS

(function() {
    var jobs = [];
    var out = {};
    var counter = 0;
    var limit = 0;
    var json;
    let feedType = 'WMGUS';
    let urlRequest =`${window.location.origin}/wday/cxs/${window.location.host.split('.').shift()}/${feedType}/jobs`;
    let urlX = urlRequest//"https://bdc.wd10.myworkdayjobs.com/wday/cxs/bdc/BDC_Careers/jobs"
    if (!pass_it["cont"]) {
      out["pass_it"] = {
        "cont": 0,
        "jobs":0
      };
    } else {
      out["pass_it"] = pass_it;
    }//
    //do {
    var data = {
        "appliedFacets": {},
        "limit": 20,
        "offset": out["pass_it"].cont,
        "searchText": ""
    };
    $.ajax({
        url: urlX,
        headers: {
            "content-type": "application/json"
        },
        type: 'POST',
        data: JSON.stringify(data),
        dataType: "json",
        async: false,
        success: function(result) {
            json = result.jobPostings;
            limit = json.length>0?true:false;
            for (var i = 0; i < json.length; i++) {
                var job = {};
                var elem = json[i];
                job.title = elem.title;
                job.reqid = elem.bulletFields[0];
                job.source_location = elem.locationsText;
                job.location = elem.locationsText;
                job.url = `${window.location.origin}/wday/cxs/${window.location.host.split('.').shift()}/${feedType}${elem.externalPath}`//urlX.replace("/jobs","") + elem.externalPath;
                if (job.location?.search(/Locations/i) > -1) {
                    job.location = getLocations(job.url);
                }else{
                    job.location = !job.location ? ["Montréal, Quebec"]:[job.location];
                }
                //job.dateposted_raw = elem.positionOfDatePosted;
                //job.dateclosed_raw = elem.positionOfDateClosed;
                //job.source_jobtype = elem.positionOfJobtype;
                //job.source_salary = elem.positionOfSalary;         
                //job.source_empname = elem.positionOfEmpname;
                //job.logo = elem.positionOfLogo;
                //job.source_apply_email = elem.positionOfEmail;

                job.temp = "1";
                job.location.map(loc =>{
                  var jobw = {...job};
                  jobw.location = loc.replace(/Remote/gi,"").split(" - ").filter(a => a.search(/[0-9]/g)==-1).reverse().join(", ").trim();
                  jobs.push(jobw);
                })
            }
            counter = counter + 20;
        },
        error: function(error) {
            msg(error);
        }
    });
    //} while (limit);

    out["jobs"] = jobs;
    return out;
})();

function getLocations(urlDesc) {
    let loc = [];
    $.ajax({
        url: urlDesc,
        headers: {
            "content-type": "application/json"
        },
        type: 'GET',
        dataType: "json",
        async : false,
        success: function(result) {
            loc = result.jobPostingInfo.additionalLocations;
            loc.push(result.jobPostingInfo.location);
        },
        error: function(error) {
            msg(error);
        }
    });
    return loc;
}
/*(function () {
  var out = {};
  var jobs = [];
  msg('>>> Opening: ' + window.location.href);
  var element = document.querySelector("pre").textContent;
  var json = JSON.parse(element);
  var listItems = json.body.children[0].children[0].listItems;

  for (i in listItems) {
    const job = {}
    var {
      title: {
        commandLink: url,
        instances: [
          {
            text: title,
          },
        ],
      },
      subtitles: [{ instances: [{ text: ubicacion }] }, { instances: [{ text: id }] }, { instances: [{ text: fecha }] }],
    } = listItems[i]
    job.title = title;
    job.url = window.location.origin + url;
    job.dateposted_raw = dateAgo(fecha, " ", 1,2)
    job.source_location = ubicacion
    job.location = ubicacion.split('-').reverse().join().replace(/,/gi,', ').trim();
    job.location = job.location.split(' M6 ').pop().trim().split('Studio 6').pop().trim().replace(/ *\([^)]*\) *-/g, "");

    if (job.location.includes('Minneapolis-Lakeville, MN')) job.location ="Minneapolis, MN / Lakeville, MN"
    else if(job.location.includes('Minneapolis-Roseville, MN')) job.location = "Minneapolis, MN / Roseville, MN"
    else if(job.location.includes('G6CRP G6 Corporate')) job.location = "Carrollton, Texas"
    //  else if(job.location.includes('')) job.location = ""
    job.location = job.location.replace('142 W 36th St,','').replace('10391 Jefferson Boulevard,','');
    job.location = job.location.replace('1633 Broadway,','').replace('161 Bowery,','');
    job.location = job.location.replace('555 Washington Avenue,','').replace('511 Union Street,','');
    job.location = job.location.replace('Remote','').replace('777 S. Santa Fe Ave,','');
    if(job.location.indexOf("Locations")>-1){job.location = "777 S. Santa Fe Ave";}
    //job.location = job.location.replace('','').replace('','');

    job.reqid = id;
    job.temp = 2021
    if (job.location.includes("More")) {
      var json_desc = JSON.parse(getDescription(job.url));
      var array = json_desc.body.children[1].children[0].children;
      for (var i in array) {
        if (array[i].iconName == 'LOCATION') {
          let jobx = {};
          jobx.title = job.title;
          jobx.url = job.url;
          jobx.source_location = job.source_location
          jobx.location = array[i].imageLabel.split('-').reverse().join().replace(/,/gi,', ').trim();
          jobx.location = jobx.location.split(' M6 ').pop().trim().split('Studio 6').pop().trim().replace(/ *\([^)]*\) *-/g, "");
          jobx.location = jobx.location.replace('142 W 36th St,','').replace('10391 Jefferson Boulevard,','');
          jobx.location = jobx.location.replace('1633 Broadway,','').replace('161 Bowery,','');
          jobx.location = jobx.location.replace('555 Washington Avenue,','').replace('511 Union Street,','');
          jobx.location = jobx.location.replace('Remote','').replace('777 S. Santa Fe Ave,','');
          if(jobx.location.indexOf("Locations")>-1){job.location = "777 S. Santa Fe Ave";}
          jobx.reqid = job.reqid;
          jobx.dateposted_raw = job.dateposted_raw;

          jobx.temp = job.temp;
          jobs.push(jobx);
        }
      }
    }else if(' / '){
      let locs = job.location;
      locs = locs.split(' / ');
      for (l in locs) {
        let jobx = {};
        jobx.title = job.title;
        jobx.url = job.url;
        jobx.source_location = job.source_location
        jobx.location = locs[l].trim();
        if(jobx.location.indexOf("Locations")>-1){job.location = "777 S. Santa Fe Ave";}
        jobx.temp = job.temp;
        jobx.reqid = job.reqid;
        jobx.dateposted_raw = job.dateposted_raw;
        if (jobx.location.length > 0) {
          jobs.push(jobx);
        }
      }
    }else {
      job.location = job.location.split('-').reverse().join().replace(/,/gi,', ').trim().split('M6').pop().trim().split('Studio 6').pop().trim().replace(/ *\([^)]*\) *-/g, "");;
      job.location = job.location.replace('142 W 36th St,','').replace('10391 Jefferson Boulevard,','');
      job.location = job.location.replace('1633 Broadway,','').replace('161 Bowery,','');
      job.location = job.location.replace('555 Washington Avenue,','').replace('511 Union Street,','');
      job.location = job.location.replace('Remote','').replace('777 S. Santa Fe Ave,','');
      if(job.location.indexOf("Locations")>-1){job.location = "777 S. Santa Fe Ave";}
      jobs.push(job);
    }
  }
  out["jobs"] = jobs;
  return out;
})();
//! inland
function getDescription(url) {
  var xhrrequest = new XMLHttpRequest();
  xhrrequest.open("GET", url, false); //URL del ajax que trae la información del job
  xhrrequest.setRequestHeader("Accept", "application/json,application/xml");
  xhrrequest.setRequestHeader("Accept-Language", "en-CA,en;q=0.8,en-GB;q=0.6,en-US;q=0.4,es;q=0.2");
  xhrrequest.setRequestHeader("Cache-Control", "no-cache");
  xhrrequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhrrequest.setRequestHeader("Pragma", "no-cache");
  var response = "";
  xhrrequest.onreadystatechange = function () {
    if (xhrrequest.readyState == 4 && xhrrequest.status == 200) {
      //console.log(xhrrequest.responseText);
      response = xhrrequest.responseText;
    }
  };
  xhrrequest.send();
  return response;
}

function dateAgo(text, char_separator, position_value_DWMY, position_word_DWMY) {
  var numberDWMY = parseInt(text.trim().split(char_separator)[position_value_DWMY], 10); //obtengo el valor numerico del dia, sem, mes o año
  if (typeof text.split(char_separator)[position_word_DWMY] !== 'undefined') {
    var dayWeekMonthYear = text.split(char_separator)[position_word_DWMY]
    } else { var dayWeekMonthYear = text.split(char_separator)[text.split(char_separator).length - 1] };
  var date_Now = new Date();  //declaro un objeto tipo fecha
  var nDays = 0;
  if (dayWeekMonthYear.toUpperCase().search(/TODAY|HOUR/g) > -1) { nDays = 0; }
  if (dayWeekMonthYear.toUpperCase().indexOf('YESTERDAY') > -1) { nDays = 1; }
  if (dayWeekMonthYear.toUpperCase().indexOf('DAYS') > -1) { nDays = numberDWMY; }
  if (dayWeekMonthYear.toUpperCase().indexOf('WEEK') > -1) { nDays = numberDWMY * 7; }
  if (dayWeekMonthYear.toUpperCase().indexOf('MONTH') > -1) { nDays = numberDWMY * 30; }
  if (dayWeekMonthYear.toUpperCase().indexOf('YEAR') > -1) { nDays = numberDWMY * 365; }
  var dateJob = date_Now.getDate() - nDays;     //resto dias de publicacion a la fecha actual
  var get_date = date_Now.setDate(dateJob);      //obtengo la cantidad de mseg. desde 1 de Enero de 1970
  var datePosted = new Date(get_date);             //obtengo la fecha de publicacion.
  //Obtengo dia mes y Año
  var dd = datePosted.getDate();                //devuelve el numero del dia del mes.
  var mm = datePosted.getMonth() + 1;             //getMonth devuelve valores de 0 a 11, se suma uno para llevarlo de 1 a 12.
  var yyyy = datePosted.getFullYear().toString(); //devuelve el año.
  if (dd < 10) { dd = '0' + dd; }
  if (mm < 10) { mm = '0' + mm; }
  dateJob = mm + '/' + dd + '/' + yyyy;
  return dateJob;
}*/