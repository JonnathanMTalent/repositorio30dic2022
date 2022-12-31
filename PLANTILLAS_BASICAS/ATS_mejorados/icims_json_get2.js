//https://careers.ulta.com/careers/jobs?keywords=&location=&limit=100&page=3

//infinity

(function () {
    var out = {};
    out["pass_it"] = {
        "offSet": 1,
        "limit": 0,
        "jobsCount": 0
    };
    return out;
})();


//extract

(function() {
    let out = {};
    let jobs = [];
    out["pass_it"] = pass_it;
    let json;
    const formatDate = (value) => {
    let date = new Date(value);
    const withCero = n => n < 10 ? `0${n}` : n;
    return `${withCero(date.getMonth()+1)}/${withCero(date.getDate())}/${date.getFullYear()}`;
    }
    
    $.ajax({   //url del headers del json
        url : 'https://careers.ulta.com/api/jobs?keywords=&location=&limit=100&page='+out.pass_it.offSet+'&sortBy=relevance&descending=false&internal=false&userId=dc6adac4-f436-4a42-85b0-4baaddffac6f&sessionId=f7c1e51b-a2fd-4039-9426-2f53a3af9f1a&deviceId=4250067518&domain=ulta.jibeapply.com', // EL offSet es el numero que cambia la paginacion
        headers: {
        "accept": "application/json, text/plain, */*",
        "accept-language": "es-ES,es;q=0.9",
        "sec-ch-ua": "\"Chromium\";v=\"104\", \" Not A;Brand\";v=\"99\", \"Google Chrome\";v=\"104\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin"
        },
        type: 'GET',
        dataType: "json",
        async: false,
        success: function(result) {
            
            json = result.jobs;
            out.pass_it.jobsCount=json.length>0 ? true : false;
            out.pass_it.limit = result.totalCount;
            if (json.length > 0) {
                msg('Hay jobs');
                for (var elem of json) {
                    var job = {};
                
                    
                    
            job.title = elem.data.title  //LINEAS PARA SACAR LA INFO DE TUTULO Y TODO L OO OTRO
            job.source_location=elem.data.full_location;
            job.location=job.source_location+", "+elem.data.country_code;
            job.dateposted_raw=elem.data.posted_date;
            job.dateposted_raw=formatDate(job.dateposted_raw);
            job.url=elem.data.apply_url;
            job.reqid=elem.data.slug;
            
            let desc1=elem.data.description;
            let desc2=elem.data.qualifications;
            let desc3=elem.data.responsibilities;
            
        var full_html = "";
        
        full_html += "<h3>" + desc1 + "</h3><br/>";
        full_html += "<h3>" + desc2 + "</h3><br/>";
        full_html += "<h3>" + desc3 + "</h3><br/>";
        full_html += "<br/>";
        

        job.html = full_html;

        job.html = cleanHTML(job.html);
        var tmp = document.createElement("DIV");
        tmp.innerHTML = job.html;
        job.jobdesc = tmp.textContent.trim();
         
        job.jobdesc.indexOf('year of relevant work experience')>-1 ? job.experience_required= job.jobdesc.split('year of relevant work experience').shift().split('Experience').pop().trim().match(/\d-\d\s|\d\s|(\d)|years/ig)?.join('')+' years':job.experience_required='';
            
            //job.url = 'armar la url de la descripcion '+elem.id;

            job.temp = 96;
            jobs.push(job);
            //out.pass_it.jobsCount += 1;
            //msg(job.title+"  "+job.reqid);
            //msg('JOBSCOUNT: '+out.pass_it.jobsCount+'__ LIMIT:'+out.pass_it.limit+' __OFSET: '+out.pass_it.offSet);
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

//pagination

(()=>{
    var out={};
    out.pass_it=pass_it;
    out.pass_it.offSet+=1;
    //out.pass_it.jobsCount+=100;
    out.has_next_page=out.pass_it.jobsCount;
    return out;
})()
