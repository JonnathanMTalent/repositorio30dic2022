//INFINITY
(function () {
    var out = {};
    out["pass_it"] = {
        "offSet": 0,
        "limit": 0,
        "jobsCount": 0
    };
    return out;
})();

// EXTRACT

(function() {
    let out = {};
    let jobs = [];
    out["pass_it"] = pass_it;
    let json;
    
    $.ajax({   //url del headers del json
        url : 'https://p'+out.pass_it.offSet+'ldkfkdsfkñs.com', // EL offSet es el numero que cambia la paginacion                  
        headers: {
    "accept": "application/json, text/plain, */*",
    "accept-language": "es-ES,es;q=0.9",
    "sec-ch-ua": "\".Not/A)Brand\";v=\"99\", \"Google Chrome\";v=\"103\", \"Chromium\";v=\"103\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site"
        },
        type: 'GET',
        dataType: "json",
        async: false,
        success: function(result) {
            
            json = result.data;
            out.pass_it.limit = result.total;
            if (json.length > 0) {
                msg('Hay jobs');
                for (var elem of json) {
                    var job = {};
                
                    
            job.title = elem.title  //LINEAS PARA SACAR LA INFO DE TUTULO Y TODO L OO OTRO
            job.url = 'armar la url de la descripcion '+elem.id;

            job.temp = 96;
            jobs.push(job);
            out.pass_it.jobsCount += 1;
            //msg(job.title+"  "+job.reqid);
            msg('JOBSCOUNT: '+out.pass_it.jobsCount+'__ LIMIT:'+out.pass_it.limit+' __OFSET: '+out.pass_it.offSet);
                }
            } else {
                msg('No hay Jobs');
                /*
                out.pass_it.limit = 0;
                var job = {};
                job.title = '5K limit reached. Ghost Job for: ';
                jobs.push(job);
                msg('JOBFANTASMA');
                */
            }
                            
                var job = {};
                //job.title = 'ghost job for '+out.pass_it.offSet;
                jobs.push(job);
               
        },
        error: function(error) {
            msg(error);
        }
    });
    out["jobs"] = jobs;
    return out;
})();


// PAGINATION

(function () {
    var out = {};
    out["pass_it"] = pass_it;
    out.pass_it.offSet += 30;
    if (out.pass_it.jobsCount < out.pass_it.limit) {
        out["has_next_page"] = true;
    } else {
        out["has_next_page"] = false;
    }
    out["wait"] = true;
    return out;
})();