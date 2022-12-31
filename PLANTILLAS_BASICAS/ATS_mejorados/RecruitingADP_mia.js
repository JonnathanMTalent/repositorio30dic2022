JOBSITE ASI   
https://recruiting.adp.com/srccar/public/RTI.home?c=1168251&d=ExternalCareerSiteGS


//infinity
(() => {
    var out = {};
    out.pass_it = {
        "counter":0,
        "limit":0
    }
    return out;
})()

//Extract:

(function () {
    var jobs = [];
    var out = {};
    var json;
    out.pass_it=pass_it;
    // do {
        var data = {"filters":[],"results":{"pageTitle":"Search Results","zeroResultsMessage":"We're sorry but we have no job openings at this time that match your search criteria. Please try another search.","searchFailureMessage":"Oops! Something went wrong.  Search has encountered a problem. Try searching again","resultsFoundLabel":"results found","bookmarkText":"Bookmark This","pageSize":"100","sortOrder":"00001000","shareText":"Share","fields":[{"name":"ptitle","label":"Published Job Title"},{"name":"grp","label":"Area of Interest"},{"name":"typeOfFulltime","label":"Position Type"}]},"pagefilter":{"page":out.pass_it.counter},"rl":"enUS"};
        $.ajax({
            url: 'https://recruiting.adp.com/srccar/public/rest/1/1363251/search/',
            headers: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            type: 'POST',
            data: JSON.stringify(data),
            dataType: "json",
            async: false,
            success: function (result) {
                msg("SUCCESSSSSSSSSSSSSSSS");
                json = result.jobs;
                out.pass_it.limit = result.pages + 1;
                for (var i = 0; i < json.length; i++) {
                    var job = {};
                    job.title = json[i].ptitle;
                    job.title = job.title;
					
                    job.source_location = json[i].city;
                    job.location=Locacion(job.source_location);
                    job.url = json[i].url;
                   // job.reqid = job.url.split("=").pop();
                    job.reqid = json[i].num;
                    job.source_jobtype = json[i].typeOfFulltime;
                  
                    job.temp = "asd";
                    jobs.push(job);
                }
                //out.pass_it.counter += 1;
              	msg("cantidad de jobs => " + jobs.length);
            },
            error: function (error) {
                msg(error);
            }
        });
    // } while (counter < limit);

    out["jobs"] = jobs;
    return out;
})();


  
  // FUNCION COMPLETA: 
  
  function Locacion(Locat) {
    var Locate=Locat.toLowerCase().trim();
    
    var location=Locate;
    //var location = 'Headquarters';  // Convertir la locacion en hq cuando no este en los if
    
/*  PARA SACAR MAS:  en minuscula la de indexOf
    if (Locate.indexOf("") > -1) {
        location = (", ");
    };
 //IGUALDAD
    if (Locate==("")) {
    location = (", ");
};
*/
if (Locate.indexOf("ottawa") > -1) {
    location = ("Ottawa, Canada");
};
if (Locate.indexOf("calgary") > -1) {
    location = ("Calgary, Canada");
};
if (Locate.indexOf("chennai") > -1) {
    location = ("Chennai, India");
};
if (Locate.indexOf("cochin") > -1) {
    location = ("Cochin, India");
};
if (Locate.indexOf("coimbatore") > -1) {
    location = ("Coimbatore, India");
};
if (Locate.indexOf("kolkata") > -1) {
    location = ("kolkata, India");
};

if (Locate==("india")) {
    location = ("india, IN");
};

if (Locate==("philippines")) {
    location = ("Philippines, PH");
};
if (Locate==("vietnam")) {
    location = ("Vietnam, VN");
};
if (Locate==("australia")) {
    location = ("Australia, AU");
};
if (Locate==("thailand")) {
    location = ("Thailand, TH");
};
if (Locate==("singapore")) {
    location = ("Singapore, SG");
};
if (Locate==("ireland")) {
    location = ("Ireland, IE");
};




if (Locate.indexOf("utrecht") > -1) {
    location = ("Utrecht, Netherlands");
};
if (Locate.indexOf("ho chi minh") > -1) {
    location = ("Ho Chi Minh, Vietnam");
};

if (Locate.indexOf("arundel") > -1) {
    location = ("Arundel, UK");
};

if (Locate.indexOf("jeddah") > -1) {
    location = ("Jeddah, Saudi Arabia");
};

if (Locate==("malaysia")) {
    location = ("Malaysia, MY");
};

if (Locate==("indonesia")) {
    location = ("Indonesia, ID");
};
if (Locate==("cambodia")) {
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
if (Locate.indexOf("rio de janeiro") > -1) {
    location = ("Rio de Janeiro, Brazil");
};
if (Locate.indexOf("wuxi") > -1) {
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

    if (Locate==("united kingdom")) {
        location = ("United kingdom, U");
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
    if (Locate.indexOf("saskatchewan") > -1) {
        location = ("Saskatchewan, CA");
    };
    
    return location;
}

//PAGINATION
(function () {
    const out = {};
    out.pass_it = pass_it;
    out.pass_it.counter += 1;
    const { counter, limit } = out.pass_it;
    out.has_next_page = counter < limit;
    return out;
})();

//JOBDESCRIPTION
(function () {
    var out = {};
    var job = {};
    var json;
    var jobid = pass_it["job"].link.split("&r=").pop();
    var endpoint = "https://recruiting.adp.com/srccar/public/rest/1/1363251/job/" + jobid + "?prc=RMPOD3&rl=enUS";
    msg("el endpoint es "+endpoint);
    $.ajax({
        url: endpoint,
        headers: {
            "Content-Type": "application/json;charset=UTF-8"
        },
        type: 'GET',
        async: false,
        success: function (result) {
            json = result;
           
            var full_html1 = json.fields[0].content;
            var full_html = json.fields[0].label;
            var full_html2 = json.fields[1].label;
            var full_html3 = json.fields[1].content;
            var full_html4 = json.fields[2].label;
            var full_html5 = json.fields[2].content;
            
            job.html = "<h3>" + full_html + "</h3>" + full_html1 + "<h3>" + full_html2 + "</h3>" + full_html3+ "</h3>" + full_html4+ "</h3>" + full_html5;
            job.html = cleanHTML(job.html);
            var tmp = document.createElement("DIV");
            tmp.innerHTML = job.html;
            job.jobdesc = tmp.textContent.trim();
            job.jobdesc = cleanHTML(job.jobdesc);
            
            
            const auxExperience = [...tmp.querySelectorAll('li')].find(e => e?.textContent.match(/\(?\d{1,2}\)?\s?\+?\s?(\s?(-|to|–)\s?\d{1,2}\+?)?\syears?/gi));
            if (auxExperience) {
                job.experience_required = auxExperience.textContent.match(/\(?\d{1,2}\)?\s?\+?\s?(\s?(-|to|–)\s?\d{1,2}\+?)?\syears?/gi)[0];
            }
            job.jobdesc = tmp.textContent.trim();

        },
        error: function (error) {
            msg(error);
        }
    });

    out["job"] = job;
    return out;
})();