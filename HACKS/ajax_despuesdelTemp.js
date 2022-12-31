          // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj  AJAX PARA LA DESCRIPCION:
// jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
                        //poner después del temp
                        $.ajax({
                            //poner acá la URL
                            url: job.url, 
                            headers: {
                                //poner acá los headers
                            "accept-language": "es",
                            "content-type": "application/x-www-form-urlencoded",
                            "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"102\", \"Google Chrome\";v=\"102\"",
                            "sec-ch-ua-mobile": "?0",
                            "sec-ch-ua-platform": "\"Windows\"",
                            "sec-fetch-dest": "empty",
                            "sec-fetch-mode": "cors",
                            "sec-fetch-site": "same-origin"
                            },
                            type: 'GET',
                            //poner acá el tipo de peticion JSON, HTML
                            dataType: "html",
                            async: false,
                            success: function(resultD) {


                                //poner acá las variable que se van a extraer de la descripcion
                                var jsonDesc = resultD
                                // msg(jsonDesc)

                                // var selector = 'div[class="position-job-description"]';
                                // var remove_selectors = ['img', 'video', 'button', 'input', 'style', 'javascript', 'script'];
                                var div = document.createElement("div");

                                div.innerHTML = jsonDesc;

                                // msg(div.innerHTML)

                                if (div.querySelector('script[type="application/ld+json"]')) {
                                    // Extract text on the script
                                    var html = div.querySelector('script[type="application/ld+json"]').textContent.trim().replace(/\s+/g, ' ').replace(/\@/gi, "");
                                    //convert text to json
                                    var json = JSON.parse(html);
                                    //ORIGINAL: var date=json.graph[1].datePublished.split("T").shift().split("-");
                                    var date = json.datePosted.split("T").shift().split("-");
                                    job.dateposted_raw = date[1] + "/" + date[2] + "/" + date[0];
                                    var jobdesc = json.description;
                                    jobdesc = cleanHTML(jobdesc)
                                    job.html = jobdesc;
                                    // msg(job.html)
                                    job.jobdesc = jobdesc;
                                    //msg('desc: ' + job.jobdesc)
                                    if (json.employmentType) {
                                        job.source_jobtype = json.employmentType;
                                    }

                                }



                                // job.jobdesc = cleanHTML(job.jobdesc);


                            },
                            error: function(error) {
                                msg(error);
                            }
                        });


// jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
// jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj


/* -------------------------------------------------------------------------- */
/*                           PETICION DEVUELVE JSON                           */
/* -------------------------------------------------------------------------- */
let peticion = JSON.parse(getDesc(job.url));
var full_html = peticion.jobPostingInfo.jobDescription;
var div = document.createElement("div");
div.innerHTML = full_html
var desc = div;
/* -------------------------------------------------------------------------- */
/*                           PETICION DEVUELVE HTML                           */
/* -------------------------------------------------------------------------- */
var Datos = getDescn(job.url);
var div       = document.createElement("div");
div.innerHTML = Datos
var categoria = div.querySelector(".subJoblist");
msg(categoria);
function getDesc(url) {
    //let tries =0;
    //let flag =true;
    //  do{
    var response = "";
    var data = {};
    $.ajax({
        url: url,
        headers: {
        },
        type: 'GET',
        //data : JSON.stringify(data),
        dataType: "html",
        async: false,
        success: function (result) {
            msg("request successfull");
            response = result;
        },
        error: function (error) {
            msg("error en la peticion:-->");
            msg(error);
        }
    });
    return response;
};