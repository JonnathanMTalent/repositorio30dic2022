(function () {
  var jobs = [];
  var out = {};
  var cont = 1;
  var data;
  if (typeof msg == "undefined") msg = console.log;
  do {
    $.ajax({
      //    https://careerlink.wendys-careers.com/search?category=crew,operations,corporate&city=&state=&zip=&keyword=&page=
      //
      url: 'https://careerlink.wendys-careers.com/search?category=&city=&state=&zip=&keyword=&page='+cont,//'https://careerlink.wendys-careers.com/search?category=crew,operations,corporate&city=&state=&zip=&keyword=&page='+cont,                                            // 1) url
      headers: {
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "accept-language": "es-US,es;q=0.9,en-US;q=0.8,en;q=0.7,es-419;q=0.6",
      },
      type: 'GET',                                        // 3) tipo
      dataType: "json",                                  // 4) data que retorna
      //data: data,
      //data: JSON.stringify(data),
      async: false,
      success: function (result) {
        msg("loading jobs...");
        data = result.jobs;                                 // 5) ruta de los trabajos
        //msg(json.length);
        for(i in data) {
          var job = {};
          job.title = data[i].title;
          job.location = data[i].city+', '+data[i].state;
          job.street_location = "Wendy's, " + data[i].address + ', ' + job.location;
          job.url = "https://wendys-careers.com/job-search/posting/"+ job.title.replace(/ /g, "-") +"/"+  data[i].id;
          let o = new Intl.DateTimeFormat('en', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
          })
          job.reqid = data[i].id
          job.dateposted_raw = o.format(new Date(data[i].start_date))


          job.temp = 10;
          jobs.push(job);
        }
        cont++;
      },
      error: function (error) {
        msg(error);
      }
    });
  } while (cont <= 550);                                 // 6) condicion de parada
  out["jobs"] = jobs;
  return out;
})();
