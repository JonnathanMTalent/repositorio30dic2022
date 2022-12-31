//JOBSTREET JSON FETCH


//infinity
(() => {
    var out = {};
    out.pass_it = {
        "counter":1,
        "jobsPerPage":0,
        "jobsInPage":0
    }
    return out;
})()


//EXTRACT
(async () => {
    let out = {};
     out["pass_it"] = pass_it;
     var codigo=79141;  // ESTE ES EL CODIGO QUE CAMBIA EN EL FETCH SEGUN LA COMPANY
    if (typeof cleanHTML == "undefined") cleanHTML = function(x) {
        return x
    };
    if (typeof msg == "undefined") msg = console.log;
    try {
        let jobs = [];
        const resp = await fetch("https://api-js.prod.companyreview.co/jobs/"+codigo+"?page="+out.pass_it.counter+"&language=en&country=sg", {
  "headers": {
    "accept": "*/*",
    "accept-language": "es-ES,es;q=0.9",
    "sec-ch-ua": "\"Google Chrome\";v=\"105\", \"Not)A;Brand\";v=\"8\", \"Chromium\";v=\"105\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site",
    "x-api-key": "77GsVyxVDN5HQN1eUOZ4t3R6zx0awW3Y5eZHzFr6"
  },
  "referrer": "https://www.jobstreet.com.sg/",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": null,
  "method": "GET",
  "mode": "cors",
  "credentials": "omit"
});
        const data = await resp.json();
        out.pass_it.jobsPerPage=data.paging.per_page;
        out.pass_it.jobsInPage = data.data.length;
        msg('jobsPerPage: '+out.pass_it.jobsPerPage+' jobsInPage'+out.pass_it.jobsInPage);
        for(let x = 0 ; x < data.data.length ; x++){ //poner el contenedor de  los jobs
            let elem = data.data[x];  //poner tambien el contenedor de los jobs
            let job = {};
            job.title = elem.position_title;
            job.url = elem.url;
            job.reqid=elem.id;
            job.source_location = elem.work_location_addresses[0];
            job.location = Locacion(job.source_location);
            job.experience_required=elem.years_of_experience+'Years';
            if(elem.salary_display_flag)job.source_salary=elem.min_monthly_salary+'-'+max_monthly_salary+'per month';

            job.temp = `jonnathan M`;
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




  function Locacion(Locat) {
    var Locate=Locat.toLowerCase();
    
    var location=Locate;
    //var location = 'Headquarters';  // Convertir la locacion en hq cuando no este en los if
    
/*  PARA SACAR MAS:  en minuscula la de indexOf
    if (Locate.indexOf("") > -1) {
        location = (", ");
    };
*/

if (Locate.indexOf("utrecht") > -1) {
    location = ("Utrecht, Netherlands");
};
if (Locate.indexOf("ho chi minh") > -1) {
    location = ("Ho Chi Minh, Vietnam");
};
if (Locate.indexOf("singapore") > -1) {
    location = ("singapore, SG");
};
if (Locate.indexOf("arundel") > -1) {
    location = ("Arundel, UK");
};
if (Locate.indexOf("ireland") > -1) {
    location = ("Ireland, IE");
};

if (Locate.indexOf("jeddah") > -1) {
    location = ("Jeddah, Saudi Arabia");
};
if (Locate.indexOf("malaysia") > -1) {
    location = ("Malaysia, MY");
};
if (Locate.indexOf("indonesia") > -1) {
    location = ("Indonesia, ID");
};
if (Locate.indexOf("cambodia") > -1) {
    location = ("Cambodia, KH");
};


if (Locate.indexOf("mexico city") > -1) {
    location = ("Mexico City, Mexico");
};
if (Locate.indexOf("são paulo") > -1) {
    location = ("Sao Paulo, Brazil");
};
if (Locate.indexOf("auckland  ") > -1) {
    location = ("Auckland  , New Zealand");
};
if (Locate.indexOf("brisbane ") > -1) {
    location = ("Brisbane , Australia");
};
if (Locate.indexOf("phnom penh") > -1) {
    location = ("Phnom Penh, Camboya");
};
if (Locate.indexOf("kuala lumpur") > -1) {
    location = ("Kuala Lumpur, Malasia");
};
if (Locate.indexOf("bangkok") > -1) {
    location = ("Bangkok, Tailandia");
};
if (Locate.indexOf("taipei") > -1) {
    location = ("Taipei, Taiwán");
};
if (Locate.indexOf("hanoi") > -1) {
    location = ("Hanoi, Vietnam");
};
if (Locate.indexOf("jakarta") > -1) {
    location = ("Jakarta, Indonesia");
};
if (Locate.indexOf("angra dos reis") > -1) {
    location = ("Angra Dos Reis, Brazil");
};    
if (Locate.indexOf("ho chi minh ") > -1) {
    location = ("Ho Chi Minh , Vietnam");
};
if (Locate.indexOf("sydney") > -1) {
    location = ("Sydney, Australia");
};
if (Locate.indexOf("dubai") > -1) {
    location = ("Dubai, United Arab Emirates");
};
if (Locate.indexOf(" 	rio de janeiro") > -1) {
    location = ("Rio de Janeiro, Brazil");
};
if (Locate.indexOf("wuxi ") > -1) {
    location = ("wuxi , China");
};
if (Locate.indexOf("tianjin") > -1) {
    location = ("Tianjin, China");
};
if (Locate.indexOf("kunming") > -1) {
    location = ("Kunming, China");
};
if (Locate.indexOf("needham") > -1) {
    location = ("Needham, US");
};
if (Locate.indexOf("culver") > -1) {
    location = ("Culver, US");
};
if (Locate.indexOf("salt lake city") > -1) {
    location = ("Salt Lake City, US");
};
if (Locate.indexOf("prague") > -1) {
    location = ("Prague, Czech Republic");
};
if (Locate.indexOf("utah") > -1) {
    location = ("Utah, US");
};
if (Locate.indexOf("saopaulo") > -1) {
    location = ("Saopaulo, Brazil");
};
if (Locate.indexOf("stockholm") > -1) {
    location = ("Stockholm, Sweden");
};
if (Locate.indexOf("istanbul") > -1) {
    location = ("Istanbul, Turkey");
};

if (Locate.indexOf("abudhabi") > -1) {
    location = ("Abudhabi, United Arab Emirates");
};
if (Locate.indexOf("seattle") > -1) {
    location = ("Seattle, US");
};



    if (Locate.indexOf("nytroy") > -1) {
        location = ("Troy, US");
    };
    if (Locate.indexOf("leavesden") > -1) {
        location = ("Leavesden, UK");
    };
    if (Locate.indexOf("neuilly") > -1) {
        location = ("Neuilly, France");
    };
    if (Locate.indexOf("montreal") > -1) {
        location = ("Montreal, Canada");
    };
    if (Locate.indexOf("united kingdom") > -1) {
        location = ("United kingdom, UK");
    };
    if (Locate.indexOf("georgia") > -1) {
        location = ("Georgia, US");
    };
    if (Locate.indexOf("los angeles") > -1) {
        location = ("Los angeles, US");
    };
    if (Locate.indexOf("wakirkland") > -1) {
        location = ("Wakirkland, US");
    };
    if (Locate.indexOf("washington") > -1) {
        location = ("Washington, US");
    };

    if (Locate.indexOf("carlsbad") > -1) {
        location = ("Carlsbad, US");
    };
    if (Locate.indexOf("tokyo") > -1) {
        location = ("Tokyo, Japan");
    };
    if (Locate.indexOf("burbank") > -1) {
        location = ("Burbank, US");
    };

    if (Locate.indexOf("london") > -1) {
        location = ("London, UK ");
    };
    if (Locate.indexOf("san francisco") > -1) {
        location = ("San Francisco, US");
    };
    if (Locate.indexOf("atlanta") > -1) {
        location = ("Atlanta, US");
    };
    if (Locate.indexOf("detroit") > -1) {
        location = ("Detroit, US");
    };
    if (Locate.indexOf("dallas") > -1) {
        location = ("Dallas, US");
    };
    if (Locate.indexOf("boston") > -1) {
        location = ("Boston, US");
    };
    if (Locate.indexOf("new york") > -1) {
        location = ("New York, US");
    };
    if (Locate.indexOf("hong kong") > -1) {
        location = ("Hong Kong, China");
    };
    if (Locate.indexOf("houston") > -1) {
        location = ("Houston, TX, US");
    };
    if (Locate.indexOf("woking") > -1) {
        location = ("Woking, UK");
    };
    if (Locate.indexOf("jersey city") > -1) {
        location = ("Jersey City, US");
    };
    if (Locate.indexOf("pisa") > -1) {
        location = ("Pisa, Italy");
    };
    if (Locate.indexOf("dublin") > -1) {
        location = ("Dublin, Ireland");
    };
    if (Locate.indexOf("toronto") > -1) {
        location = ("Toronto, Canada");
    };
    if (Locate.indexOf("chicago") > -1) {
        location = ("Chicago, US");
    };
    if (Locate.indexOf("budapest") > -1) {
        location = ("Budapest, Hungary");
    };
    if (Locate.indexOf("pune") > -1) {
        location = ("Pune, India");
    };
    if (Locate.indexOf("loyang") > -1) {
        location = ("Loyang, China");
    };
    if (Locate.indexOf("california") > -1) {
        location = ("California, US");
    };
    if (Locate.indexOf("texas") > -1) {
        location = ("Texas, US");
    };
    if (Locate.indexOf("bremen") > -1) {
        location = ("Bremen, Germany");
    };
    if (Locate.indexOf("amsterdam") > -1) {
        location = ("Amsterdam, Netherlands");
    };
    if (Locate.indexOf("madrid") > -1) {
        location = ("Madrid, España");
    };
    if (Locate.indexOf("dimmitt") > -1) {
        location = ("Dimmitt, US");
    };
    if (Locate.indexOf("winterthur") > -1) {
        location = ("Winterthur, Switzerland");
    };
    // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj INDIA jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj /*
    if (Locate.indexOf("delhi") > -1) {
        location = ("Delhi, India");
    };
    if (Locate.indexOf("bangalore") > -1) {
        location = ("Bangalore, India");
    };
    if (Locate.indexOf("gurugram") > -1) {
        location = ("Gurugram, India");
    };
    if (Locate.indexOf("noida") > -1) {
        location = ("Noida, India");
    };
    if (Locate.indexOf("mumbai") > -1) {
        location = ("Mumbai, India");
    };
//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj FILIPINAS jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
    if (Locate.indexOf("manila") > -1) {
        location = ("Manila, Filipinas");
    };
    // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj Chinajjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj /*
    if (Locate.indexOf("shanghai") > -1) {
        location = ("Shanghai, China");
    };
    if (Locate.indexOf("beijing") > -1) {
        location = ("Beijing, China");
    };
    if (Locate.indexOf("zhuhai") > -1) {
        location = ("Zhuhai, China");
    };
//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
//  jjjjjjjjjjjjjjjjjjjj SINGAPORE JJJJJJJJJJJJJJJJJJJJJJJJ
    if (Locate.indexOf("toa payoh") > -1) {
        location = ("Toa Payoh, Singapore");
    };
    if (Locate.indexOf("sengkang") > -1) {
        location = ("SengKang, Singapore");
    };
    if (Locate.indexOf("outram") > -1) {
        location = ("Outram, Singapore");
    };
    if (Locate.indexOf("tuas") > -1) {
        location = ("Tuas, Singapore");
    };
    if (Locate.indexOf("bright vision hospital") > -1) {
        location = ("Singapore, SG");
    };
    if (Locate.indexOf("shenton") > -1) {
        location = ("Shenton, Singapore");
    };
    if (Locate.indexOf("braddell") > -1) {
        location = ("Singapore, SG");
    };
    if (Locate.indexOf("hai phong") > -1) {
        location = ("Hai Phong, Vietnam");
    };
        if (Locate.indexOf("chonburi") > -1) {
        location = ("Chonburi, Tailandia");
    };
        if (Locate.indexOf("hải phòng") > -1) {
        location = ("Hai Phong, Vietnam");
    };
        if (Locate.indexOf("karawang") > -1) {
        location = ("karawang, Indonesia");
    };
    if (Locate.indexOf("zurich") > -1) {
        location = ("Zurich, Swiss");
    };
        if (Locate.indexOf("Hoofddorp") > -1) {
        location = ("Hoofddorp, Holland");
    };
        if (Locate.indexOf("Vaduz") > -1) {
        location = ("Vaduz, Swiss");
    };
    if (Locate.indexOf("edinburgh") > -1) {
        location = ("Edinburgh, Scotland");
    };
    if (Locate.indexOf("seoul") > -1) {
        location = ("Seoul, South Korea");
    };
    
    return location;
}







//PAGINATION
(()=>{
    var out={};
    out.pass_it=pass_it;
    var { counter, jobsPerPage, jobsInPage } = out.pass_it;
    out.pass_it.counter+=1;
    out.has_next_page=jobsInPage==jobsPerPage?true:false;
    return out;
})()



// DESCRIPCION
(async () => {
    let out = {};
    var job = {};
    const formatDate = (value) => {
    let date = new Date(value);
    const withCero = n => n < 10 ? `0${n}` : n;
    return `${withCero(date.getMonth()+1)}/${withCero(date.getDate())}/${date.getFullYear()}`;
  }
    var selector = `div[data-automation="jobDescription"]`;
    var remove_selectors = ['a', 'script', 'i', 'img', 'style', 'button', 'figure', 'noscript', 'svg', 'form', 'input', 'iframe', 'link'];
    try {
        const url = window.location.href
        const resp = await fetch(url, {
            "headers": {
                "accept": "*/*"
            }
        });
        const data = await resp.text();
        const parseDoc = new DOMParser();
        const doc = parseDoc.parseFromString(data, 'text/html')
        //DATEPOSTED
        let aux = Array.from(doc.querySelectorAll('div.sx2jih0.zcydq86a')).filter(x => x.textContent.search(/Posted on/gmi) > -1);
        aux[0]!=null ? job.dateposted_raw=formatDate(aux[0].textContent.replace('Posted on','').trim()) : job.dateposted_raw='';
        //JOBTYPE
        aux = Array.from(document.querySelectorAll('div.sx2jih0._17fduda0._17fduda5')).filter(x => x.textContent.search(/Job Type/gmi) > -1);
        aux[0]!=null ? job.source_jobtype=aux[0].textContent.replace('Job Type','').trim() : job.source_jobtype='';
        //Benefits
        aux = Array.from(document.querySelectorAll('div[data-automation*="job-details"] > div')).filter(x => x.textContent.search(/Job Highlights/gmi) > -1);
    aux[0]!=null ? job.source_benefit=aux[0].textContent.trim() : job.source_benefit='';
        
        
        var full_html = doc.querySelector(selector);
        if (full_html) {
            // remove something from the jobdatata
            if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {
                if (full_html.querySelector(remove_selector)) full_html.querySelector(remove_selector).remove();
            });
            if (typeof cleanHTML == "undefined") cleanHTML = function(x) {
                return x
            };
            if (typeof msg == "undefined") msg = console.log;
            job.html = full_html.innerHTML.trim();
            //limpieza de las descripciones
            //job.html = removeTextBefore(job.html, ``, false);
            //job.html = removeTextAfter(job.html, ``, true);
            //job.html = removeTextAfter(job.html, ``, true);
            //job.html = removeTextAfter(job.html, ``, true);
            job.html = cleanHTML(job.html);
            var tmp = document.createElement('div');
            tmp.innerHTML = job.html;
            job.jobdesc = tmp.textContent.trim();
            job.jobdesc = cleanHTML(job.jobdesc);
        }
    } catch (err) {
        console.log(err)
    }
    out["job"] = job;
    console.table(job)
    return out;
  })();
  function removeTextBefore(html, text, flag) {
    var newHtml = html;
    if (newHtml.indexOf(text) > -1) {
        newHtml = newHtml.split(text).pop();
        if (!flag) {
            newHtml = "<h3>" + text + "</h3>" + newHtml;
        }
    }
    return newHtml;
  }
  function removeTextAfter(html, text, flag) {
    var newHtml = html;
    if (newHtml.indexOf(text) > -1) {
        newHtml = newHtml.split(text).shift();
        if (!flag) {
            newHtml = newHtml + "<p>" + text + "</p>";
        }
    }
    return newHtml;
  }