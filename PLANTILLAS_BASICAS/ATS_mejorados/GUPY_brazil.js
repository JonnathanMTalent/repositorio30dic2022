//fix format of date: add 0 , add lines to clean common expresions: www , https, @, etc, 

//fix format of date: add 0 , add lines to clean common expresions: www , https, @, etc, update temp for update the source_empname. Comunicado,Madelen Brito Carrera: Variable y/o campo source_empname, 


(async () => {
    let out = {};
    let hq = 'São Paulo, SP, BR';
        const formatDate = (value) => {
        let date = new Date(value);
        const withCero = n => n < 10 ? `0${n}` : n;
        return `${withCero(date.getMonth()+1)}/${withCero(date.getDate())}/${date.getFullYear()}`;}
    //out["pass_it"] = pass_it;
    if (typeof cleanHTML == "undefined") cleanHTML = function(x) {return x};
if (typeof msg == "undefined") msg = console.log;
    try {
        let jobs = [];
        let resp = await fetch(`https://${window.location.host.split('.').shift()}.gupy.io/`, {
            "headers": {
                "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                "accept-language": "en-GB,en;q=0.9,es-CO;q=0.8,es;q=0.7",
                "cache-control": "no-cache",
                "pragma": "no-cache",
                "sec-ch-ua": "\"Google Chrome\";v=\"105\", \"Not)A;Brand\";v=\"8\", \"Chromium\";v=\"105\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\"",
                "sec-fetch-dest": "document",
                "sec-fetch-mode": "navigate",
                "sec-fetch-site": "none",
                "sec-fetch-user": "?1",
                "upgrade-insecure-requests": "1"
            },
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": null,
            "method": "GET",
            "mode": "cors",
            "credentials": "include"
        });
        //JSON.stringify(data)
        //Texto
        let data = await resp.text();
        let doc = document.createElement('div');
        doc.innerHTML = data;
        if (doc.querySelector('div[class*="job-list"] tr')) {
            let htmlJobs = doc.querySelectorAll('div[class*="job-list"] tr');
            for (let elem of htmlJobs) {
                let job = {};
                job.reqid = elem.querySelector('a').href.split('/').pop().split('?').shift().trim();
                job.url = elem.querySelector('a').href.split('?').shift().trim();
                job.temp = 7;
                let respDesc = await fetch(job.url, {
                    "headers": {
                        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                        "accept-language": "en-GB,en;q=0.9,es-CO;q=0.8,es;q=0.7",
                        "upgrade-insecure-requests": "1"
                    },
                    "referrerPolicy": "strict-origin-when-cross-origin",
                    "body": null,
                    "method": "GET",
                    "mode": "cors",
                    "credentials": "include"
                });
                //JSON.stringify(data)
                //Texto
                let dataDesc = await respDesc.text();
                let docDesc = document.createElement('div');
                docDesc.innerHTML = dataDesc;
                if (docDesc.querySelector('script[id="__NEXT_DATA__"]')) {
                    let jobJSON = JSON.parse(docDesc.querySelector('script[id="__NEXT_DATA__"]').textContent);
                    job.title = jobJSON.title;
                    job.source_jobtype = jobJSON.employmentType;
                    
                    // let dateAux = new Date(jobJSON.datePosted);
                    // job.dateposted_raw = dateAux.toLocaleDateString("en-US");
                    let datess=jobJSON?.datePosted;
                if(datess!=undefined){
                    let dateposted_raw=formatDate(datess);
                    if(validarFormatoFecha(dateposted_raw))job.dateposted_raw=dateposted_raw;
                    }
                    // dateAux = new Date(jobJSON?.validThrough);
                    // job.dateclosed_raw = dateAux?.toLocaleDateString("en-US");
                    adatess=jobJSON?.validThrough;
                if(datess!=undefined){
                    let dateclosed_raw=formatDate(datess);
                    if(validarFormatoFecha(dateclosed_raw))job.dateclosed_raw=dateclosed_raw;
                    }
                    
                    
                    job.source_location = [];
                    job.source_location.push(jobJSON?.jobLocation?.address?.addressLocality?.split(',')?.shift());
                    job.source_location.push(jobJSON?.jobLocation?.address?.addressRegion);
                    job.source_location = job.source_location.filter(Boolean).join(", ");
                    job.location = job.source_location;
                    if (job.location == undefined || job.location == '' || job.location.match(/Remote Work/)) {
                        job.location = hq;
                    }
                    if (job.title.match(/Banco de Talentos|Talent Pool/i) || job.source_jobtype.match(/INTERN/i)) {
                        continue;
                    }
                    let full_html = document.createElement('div');
                    full_html.innerHTML = jobJSON["description"];
                    if (full_html) {
                        for (const a of full_html.querySelectorAll('p, span, li')) {
                            if (a.textContent.search(/@|http|www./ig) > -1) {
                                a.remove();
                            }
                        }
                        let remove_selectors = ['a', 'script', 'i', 'img', 'style', 'button', 'figure', 'noscript', 'svg', 'form', 'input', 'iframe', 'link'];
                        if (remove_selectors.length > 0) {
                            remove_selectors.forEach(remove_selector => {
                                for (const a of full_html.querySelectorAll(remove_selector)) {
                                    a.remove();
                                }
                            });
                        }
                        job.html = full_html.innerHTML.trim();
                        job.html = removeEmojis(job.html);
                        job.html = removeTextBefore(job.html, 'Descripción de la oferta', false);
                        job.html = removeTextAfter(job.html, 'Venha fazer parte deste time!!!', true);
                        //job.html = removeTextBefore(job.html, '', false);
                        //job.html = removeTextAfter(job.html, //, true);
                        
                        //clean emogis
job.html = job.html.replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '').trim();
if(job.html.indexOf('@')>-1){
    var eliminar = job.html?.replace(/\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+/gi,"");  } 
if(eliminar)job.html=eliminar;


if (job.html.indexOf('https') > -1) { job.html = job.html.replace(/(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,""); }
if (job.html.indexOf('http') > -1)  { job.html = job.html.replace(/(http?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,"");  } 
if (job.html.indexOf('HTTPS') > -1) { job.html = job.html.replace(/(HTTPS?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,""); }
if (job.html.indexOf('HTTP') > -1)  { job.html = job.html.replace(/(HTTP?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,"");  }
if (job.html.indexOf('www') > -1)  { job.html = job.html.replace(/(www?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,"");  }
                        job.html = cleanHTML(job.html);
                        let tmp = document.createElement('div');
                        tmp.innerHTML = job.html;
                        job.jobdesc = tmp.textContent.trim();
                        job.jobdesc = cleanHTML(job.jobdesc);
                        if (job.jobdesc.search(/BENEFICÍOS|Benefícios|O que você terá aqui/ig) > -1) job.source_benefit = job.jobdesc.split(/BENEFICÍOS|Benefícios/ig).pop()
                    }
                    jobs.push(job);
                } else if (docDesc.querySelector('div[class="description"]')) {
                    job.title = elem.querySelector('span[class="title"]').textContent.replace(/- [0-9]*/g, '').trim();
                    job.source_location = elem.querySelector('td:nth-child(2)').textContent.trim();
                    job.location = elem.querySelector('td:nth-child(2)').textContent.replace(/and Remote/ig, '').replace('/', ', ').trim();
                    if (job.location == undefined || job.location == '' || job.location.match(/Remote Work/)) {
                        job.location = hq;
                    }
                    job.source_jobtype = elem.querySelector('td:nth-child(3)').textContent.replace(/employee/i, '').trim();
                    if (job.title.match(/Banco de Talentos|Talent Pool/i) || job.source_jobtype.match(/INTERN/i)) {
                        continue;
                    }
                    let full_html = docDesc.querySelector('div[class="description"]');
                    if (full_html) {
                        for (const a of full_html.querySelectorAll('p, span, li')) {
                            if (a.textContent.search(/@|http|www./ig) > -1) {
                                a.remove();
                            }
                        }
                        let remove_selectors = ['a', 'script', 'i', 'img', 'style', 'button', 'figure', 'noscript', 'svg', 'form', 'input', 'iframe', 'link'];
                        if (remove_selectors.length > 0) {
                            remove_selectors.forEach(remove_selector => {
                                for (const a of full_html.querySelectorAll(remove_selector)) {
                                    a.remove();
                                }
                            });
                        }
                        job.html = full_html.innerHTML.trim();
                        job.html = removeEmojis(job.html);
                        job.html = removeTextBefore(job.html, 'Descripción de la oferta', false);
                        job.html = removeTextAfter(job.html, 'Venha fazer parte deste time!!!', true);
                        //job.html = removeTextBefore(job.html, '', false);
                        //job.html = removeTextAfter(job.html, //, true);
                        //clean emogis
job.html = job.html.replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '').trim();
if(job.html.indexOf('@')>-1){
    var eliminar = job.html?.replace(/\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+/gi,"");  } 
if(eliminar)job.html=eliminar;


if (job.html.indexOf('https') > -1) { job.html = job.html.replace(/(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,""); }
if (job.html.indexOf('http') > -1)  { job.html = job.html.replace(/(http?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,"");  } 
if (job.html.indexOf('HTTPS') > -1) { job.html = job.html.replace(/(HTTPS?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,""); }
if (job.html.indexOf('HTTP') > -1)  { job.html = job.html.replace(/(HTTP?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,"");  }
if (job.html.indexOf('www') > -1)  { job.html = job.html.replace(/(www?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,"");  }
                        job.html = cleanHTML(job.html);
                        let tmp = document.createElement('div');
                        tmp.innerHTML = job.html;
                        job.jobdesc = tmp.textContent.trim();
                        job.jobdesc = cleanHTML(job.jobdesc);
                        if (job.jobdesc.search(/BENEFICÍOS|Benefícios|O que você terá aqui/ig) > -1) job.source_benefit = job.jobdesc.split(/BENEFICÍOS|Benefícios/ig).pop()
                    }
                    jobs.push(job);
                }
            }
        } else if (doc.querySelector('ul[data-testid="job-list__list"] > li[data-testid="job-list__listitem"]')) {
            let htmlJobs = doc.querySelectorAll('ul[data-testid="job-list__list"] > li[data-testid="job-list__listitem"]');
            for (let elem of htmlJobs) {
                let job = {};
                job.reqid = elem.querySelector('a').href.split('/').pop().split('?').shift().trim();
                job.url = elem.querySelector('a').href.split('?').shift().trim();
                job.temp = 7;
                let respDesc = await fetch(job.url, {
                    "headers": {
                        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                        "accept-language": "en-GB,en;q=0.9,es-CO;q=0.8,es;q=0.7",
                        "upgrade-insecure-requests": "1"
                    },
                    "referrerPolicy": "strict-origin-when-cross-origin",
                    "body": null,
                    "method": "GET",
                    "mode": "cors",
                    "credentials": "include"
                });
                //JSON.stringify(data)
                //Texto
                let dataDesc = await respDesc.text();
                let docDesc = document.createElement('div');
                docDesc.innerHTML = dataDesc;
                if (docDesc.querySelector('script[id="__NEXT_DATA__"]')) {
                    let jobJSON = JSON.parse(docDesc.querySelector('script[id="__NEXT_DATA__"]').textContent);
                    job.title = jobJSON.props.pageProps.job.name;
                    job.source_jobtype = jobJSON.props.pageProps.job.jobType.split('vacancy_type_').pop().replace(/\_/g, ' ').replace('effective', 'Full Time');
                    
                    
                    // let dateAux = new Date(jobJSON.props.pageProps.job.publishedAt);
                    // job.dateposted_raw = dateAux.toLocaleDateString("en-US");
                    // dateAux = new Date(jobJSON?.props?.pageProps?.job?.expiresAt);
                    // job.dateclosed_raw = dateAux?.toLocaleDateString("en-US");
                                        // let dateAuxoLocaleDateString("en-US");
                    let datess=jobJSON?.props?.pageProps?.job?.publishedAt;
                if(datess!=undefined){
                    let dateposted_raw=formatDate(datess);
                    if(validarFormatoFecha(dateposted_raw))job.dateposted_raw=dateposted_raw;
                    }
                    datess=jobJSON?.props?.pageProps?.job?.expiresAt;
                if(datess!=undefined){
                    let dateclosed_raw=formatDate(datess);
                    if(validarFormatoFecha(dateclosed_raw))job.dateclosed_raw=dateclosed_raw;
                    }
                    
                    
                    job.source_location = [];
                    job.source_location.push(jobJSON?.props?.pageProps?.job?.addressCity);
                    job.source_location.push(jobJSON?.props?.pageProps?.job?.addressStateShortName);
                    job.source_location = job.source_location.filter(Boolean).join(", ");
                    job.location = job.source_location;
                    if (job.location == undefined || job.location == '' || job.location.match(/Remote Work/)) {
                        job.location = hq;
                    }
                    if (job.title.match(/Banco de Talentos|Talent Pool/i) || job.source_jobtype.match(/INTERN|Talent Pool|apprentice/i)) {
                        continue;
                    }
                    let full_html = document.createElement('div');
                    full_html.innerHTML = jobJSON.props.pageProps.job["description"] + jobJSON.props.pageProps.job?.responsibilities + jobJSON.props.pageProps.job?.prerequisites;
                    if (full_html) {
                        for (const a of full_html.querySelectorAll('p, span, li')) {
                            if (a.textContent.search(/@|http|www./ig) > -1) {
                                a.remove();
                            }
                        }
                        let remove_selectors = ['a', 'script', 'i', 'img', 'style', 'button', 'figure', 'noscript', 'svg', 'form', 'input', 'iframe', 'link'];
                        if (remove_selectors.length > 0) {
                            remove_selectors.forEach(remove_selector => {
                                for (const a of full_html.querySelectorAll(remove_selector)) {
                                    a.remove();
                                }
                            });
                        }
                        job.html = full_html.innerHTML.trim();
                        job.html = removeEmojis(job.html);
                        job.html = removeTextBefore(job.html, 'Descripción de la oferta', false);
                        job.html = removeTextAfter(job.html, 'Venha fazer parte deste time!!!', true);
                        //job.html = removeTextBefore(job.html, '', false);
                        //job.html = removeTextAfter(job.html, //, true);
                        //clean emogis
job.html = job.html.replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '').trim();
if(job.html.indexOf('@')>-1){
    var eliminar = job.html?.replace(/\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+/gi,"");  } 
if(eliminar)job.html=eliminar;


if (job.html.indexOf('https') > -1) { job.html = job.html.replace(/(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,""); }
if (job.html.indexOf('http') > -1)  { job.html = job.html.replace(/(http?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,"");  } 
if (job.html.indexOf('HTTPS') > -1) { job.html = job.html.replace(/(HTTPS?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,""); }
if (job.html.indexOf('HTTP') > -1)  { job.html = job.html.replace(/(HTTP?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,"");  }
if (job.html.indexOf('www') > -1)  { job.html = job.html.replace(/(www?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,"");  }
                        job.html = cleanHTML(job.html);
                        let tmp = document.createElement('div');
                        tmp.innerHTML = job.html;
                        job.jobdesc = tmp.textContent.trim();
                        job.jobdesc = cleanHTML(job.jobdesc);
                        if (job.jobdesc.search(/BENEFICÍOS|Benefícios|O que você terá aqui/ig) > -1) job.source_benefit = job.jobdesc.split(/BENEFICÍOS|Benefícios/ig).pop()
                    }
                    jobs.push(job);
                } else if (docDesc.querySelector('div[class="description"]')) {
                    job.title = elem.querySelector('a > div > div:nth-child(1)').textContent.replace(/- [0-9]*/g, '').trim();
                    job.source_location = elem.querySelector('a > div > div:nth-child(2)').textContent.trim();
                    job.location = elem.querySelector('a > div > div:nth-child(2)').textContent.replace(/and Remote/ig, '').replace('/', ', ').trim();
                    if (job.location == undefined || job.location == '' || job.location.match(/Remote Work/)) {
                        job.location = hq;
                    }
                    job.source_jobtype = elem.querySelector('a > div > div:nth-child(3)').textContent.replace(/employee/i, '').trim();
                    if (job.title.match(/Banco de Talentos|Talent Pool/i) || job.source_jobtype.match(/INTERN/i)) {
                        continue;
                    }
                    let full_html = docDesc.querySelector('div[class="description"]');
                    if (full_html) {
                        for (const a of full_html.querySelectorAll('p, span, li')) {
                            if (a.textContent.search(/@|http|www./ig) > -1) {
                                a.remove();
                            }
                        }
                        let remove_selectors = ['a', 'script', 'i', 'img', 'style', 'button', 'figure', 'noscript', 'svg', 'form', 'input', 'iframe', 'link'];
                        if (remove_selectors.length > 0) {
                            remove_selectors.forEach(remove_selector => {
                                for (const a of full_html.querySelectorAll(remove_selector)) {
                                    a.remove();
                                }
                            });
                        }
                        job.html = full_html.innerHTML.trim();
                        job.html = removeEmojis(job.html);
                        job.html = removeTextBefore(job.html, 'Descripción de la oferta', false);
                        job.html = removeTextAfter(job.html, 'Venha fazer parte deste time!!!', true);
                        //job.html = removeTextBefore(job.html, '', false);
                        //job.html = removeTextAfter(job.html, //, true);
                        //clean emogis
job.html = job.html.replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '').trim();
if(job.html.indexOf('@')>-1){
    var eliminar = job.html?.replace(/\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+/gi,"");  } 
if(eliminar)job.html=eliminar;


if (job.html.indexOf('https') > -1) { job.html = job.html.replace(/(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,""); }
if (job.html.indexOf('http') > -1)  { job.html = job.html.replace(/(http?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,"");  } 
if (job.html.indexOf('HTTPS') > -1) { job.html = job.html.replace(/(HTTPS?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,""); }
if (job.html.indexOf('HTTP') > -1)  { job.html = job.html.replace(/(HTTP?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,"");  }
if (job.html.indexOf('www') > -1)  { job.html = job.html.replace(/(www?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,"");  }
                        
                        job.html = cleanHTML(job.html);
                        let tmp = document.createElement('div');
                        tmp.innerHTML = job.html;
                        job.jobdesc = tmp.textContent.trim();
                        job.jobdesc = cleanHTML(job.jobdesc);
                        if (job.jobdesc.search(/BENEFICÍOS|Benefícios|O que você terá aqui/ig) > -1) job.source_benefit = job.jobdesc.split(/BENEFICÍOS|Benefícios/ig).pop()
                    }
                    jobs.push(job);
                }
            }
        }
        out["jobs"] = jobs;
    } catch (err) {
        throw err;
    }
    return out;
})();

function removeTextBefore(html, text, flag) {
    var newHtml = html;
    if (newHtml.search(text) > -1) {
        newHtml = newHtml.split(text).pop();
        if (!flag) {
            newHtml = "<h3>" + text + "</h3>" + newHtml;
        }
    }
    return newHtml;
}

function removeTextAfter(html, text, flag) {
    var newHtml = html;
    if (newHtml.search(text) > -1) {
        newHtml = newHtml.split(text).shift();
        if (!flag) {
            newHtml = newHtml + "<p>" + text + "</p>";
        }
    }
    return newHtml;
}
function validarFormatoFecha(campo) {
    var RegExPattern = /^\d{1,2}\/\d{1,2}\/\d{2,4}$/;
    if ((campo.match(RegExPattern)) && (campo!='')) {return true;} else { return false;} }

function removeEmojis(string) {
    var regex = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
    return string.replace(regex, '');
}
