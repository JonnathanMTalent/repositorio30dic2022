//Infinite pagination
(function() {
    var out = {};
    out.pass_it = {
        "cont": 0,
        "totalJobs": 0,
        "jobs": []
    }
    return out;
})();
//before extract
(function() {
    let out = {};
    out.pass_it = pass_it;
    //selector de los jobs
    let container = Array.from(document.querySelectorAll('tbody tr')); // Main job container
    console.log(container.length);
    if (out["pass_it"].totalJobs === 0) {
        let jobs = []; // This will contain all the extracted jobs
        for (let elem of container) {
            let job = {};
            job.title = elem.querySelector('td:nth-child(1)').textContent.trim();
            msg(job.title)
            job.source_location = elem.querySelector('td:nth-child(3)').textContent.trim();
            job.location = job.source_location;
            job.temp = 'test';
            job.logo = elem.querySelector(`td:nth-child(4) img`).src
            job.source_empname = elem.querySelector(`td:nth-child(4) img`).alt
            jobs.push(job);
        }
        out["pass_it"].jobs = jobs;
        console.table(jobs)
        out["pass_it"].totalJobs = jobs.length;
    }
    //si el boton está dentro de una etiqueta poner: container[out["pass_it"].cont].querySelector('').click()
    container[out["pass_it"].cont].click();
    console.log("Clicked Job = " + out["pass_it"].jobs[out["pass_it"].cont].title);
    //selector del boton al que se le hace click
    out.waitFor = 'div[class="w-row mt50"]';
    return out;
})();
//extract
(function() {
    var out = {};
    var jobs = [];
    out["pass_it"] = pass_it;
    var job = out["pass_it"].jobs[out["pass_it"].cont];
    //selector de la descripcion
    var full_html = document.querySelector('div[class="w-row mt50"]');
    // remove something from the jobdatata
    if (typeof cleanHTML == "undefined") cleanHTML = function(x) {
        return x
    };
    if (typeof msg == "undefined") msg = console.log;
    if (full_html) {
        //selector para generar la url, en caso de no se posible ar window.location.href
        job.url = window.location.href
        job.reqid = job.url.split('=').pop().trim();
        for (const a of full_html.querySelectorAll('p, span, li')) {
            if (a.textContent.search(/@|http|www./ig) > -1) {
                a.remove();
            }
        }
        var remove_selectors = ['a', 'script', 'i', 'img', 'style', 'button', 'figure', 'noscript', 'svg', 'form', 'input', 'iframe', 'link'];
        if (remove_selectors.length > 0) {
            remove_selectors.forEach(remove_selector => {
                for (const a of full_html.querySelectorAll(remove_selector)) {
                    a.remove();
                }
            });
        }
        job.html = full_html.innerHTML.trim();
        //job.html = removeTextBefore(job.html, '', false);
        job.html = removeTextAfter(job.html, /If this role interests you/, true);
        job.html = cleanHTML(job.html);
        var tmp = document.createElement('div');
        tmp.innerHTML = job.html;
        job.jobdesc = tmp.textContent.trim();
        job.jobdesc = cleanHTML(job.jobdesc);
    }
    //boton para regresar, si no se puede con la flecha definir el boton con un selector.
    window.history.back();
    // document.querySelector('').click();
    jobs.push(job);
    out["jobs"] = jobs;
    //esperar por el selector de todos los jobs.
    out.waitFor = 'tbody tr';
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
//pagination
(function() {
    var out = {};
    out["pass_it"] = pass_it;
    if (out["pass_it"].cont < (out["pass_it"].totalJobs - 1)) {
        out["pass_it"].nextPage = false;
        out["pass_it"].cont += 1;
        out["has_next_page"] = true;
        msg("Another Job");
    } 
    // else {
    //     var next_page_selector = ''; //selector del btn nex
    //     var clickable_elem = document.querySelector(next_page_selector).nextElementSibling;
    //     //stop condition    
    //     if (!clickable_elem) {
    //         //last page      msg("END OF PAGINATION");
    //         out["has_next_page"] = false;
    //         out["pass_it"].nextPage = false;
    //     } else {
    //         //go to next page      
    //         msg("Another page");
    //         out["pass_it"].cont = 0;
    //         out["pass_it"].totalJobs = 0;
    //         clickable_elem.click();
    //         out["has_next_page"] = true;
    //         out["pass_it"].nextPage = true;
    //     }
    // }
    msg(out["pass_it"].cont);
    //esperar por el selector con todos los jobs
    out.waiFort = 'tbody tr';
    out.wait = true
    return out;
})();