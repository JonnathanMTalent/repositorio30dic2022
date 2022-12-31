(function () {
    //EL PASS_IT EN LA DESCRIPCION PUEDE TRAER SOLO EL TITULO,URL Y JOBID-NOREQID, USAMOS out.pass_it.job.url por ejemlo
    var out = {};
    var job = {};
    var jobid = window.location.href.split("&r=").pop(); //armamos el id a partir de la url
    var endpoint = "https://recruiting.adp.com/srccar/public/rest/1/185607" + jobid + "?rl=enUS";//cambiar ID
    //este endpoint es la url del json que nos aparece en el header, hay que armarla
    //msg(endpoint);
    $.ajax({
        url: endpoint,
        headers: {
            "Content-Type": "application/json;charset=UTF-8"
        },
        type: 'GET',
        async: false,
        success: function (result) {
            json=result;
            var full_html = json.fields[2].content; //aqui armamos la descripcion de lo que esta en el json
            //var full_html1= json.fields[3].content
            //var full_html1= json.fields[5].content


            job.html = full_html; // '</h3> +full_html1 + </h3> +full_html2 + </h3> +full_html5'
            job.html = cleanHTML(job.html);
            var tmp = document.createElement("DIV");
            tmp.innerHTML = job.html;
            job.jobdesc = tmp.textContent.trim();
        },
        error: function (error) {
            msg(error);
        }
    });
    out["job"] = job;
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











se declara el pass_it
out["pass_it"] = pass_it;
msg(out.pass_it)
con el msg puedes ver que te lleva
El resultado seria algo como: 
{"job":{"id":"0d09f7ff29a6","title":"Reservation Sales Training Supervisor - The Little Nell Hotel Group","link":"https://jobs.smartrecruiters.com/AspenSkiingCompany/743999838438428"}}
Entonces para sacar la url pones:
out.pass_it.job.link



//OTRA FORMA DE TRAER EL REQID
var jobid = window.location.href.split("&r=").pop().split(/\&|\#/).shift().trim();
var endpoint = "https://recruiting.adp.com/srccar/public/rest/1/1165711/job/" + jobid + "?rl=enUS";