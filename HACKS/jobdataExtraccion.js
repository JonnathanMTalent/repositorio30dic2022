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



// convert string to html
const stringToHTML = (str) => new DOMParser().parseFromString(str, 'text/html').body;
msg(
    stringToHTML('<div><p>content text</p></div>').textContent.trim()
);