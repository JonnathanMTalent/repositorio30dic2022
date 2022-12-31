//infinity
(() => {
    var out = {};
    out.pass_it = {
        "counter":0,
        "limit":0
    }
    return out;
})()
// poner en el extract

out.pass_it = pass_it;
out.pass_it.counter+=1;
out.pass_it.limit=500;
out.pass_it.limit = json.length>0?true:false;
//PAGINATION

(function() {
    var out = {};
    out.pass_it = pass_it;
    out.pass_it.counter += 25;
    if(out.pass_it.limit > out.pass_it.counter){
        out.has_next_page = true;
    }else{
        out.has_next_page = false;
    }
    return out;
})();


//OTRO PAGINATION MAS ELEGANTE

(function () {
    const out = {};
    out.pass_it = pass_it;
    out.pass_it.counter += 20;
    const { counter, limit } = out.pass_it;
    out.has_next_page = counter <= limit;
    return out;
})();

//otra mas elegante aun:
out.pass_it.limit = json.length>0?true:false;

(()=>{
    var out={};
    out.pass_it=pass_it;
    out.pass_it.counter+=12;
    out.has_next_page=out.pass_it.limit;
    return out;
})()

//PASSIT EN LA DESCRIPCION:  SOLO TITLE, LINK, JOBID
se declara el pass_it
out["pass_it"] = pass_it;
msg(out.pass_it)
con el msg puedes ver que te lleva
El resultado seria algo como: 
{"job":{"id":"0d09f7ff29a6","title":"Reservation Sales Training Supervisor - The Little Nell Hotel Group","link":"https://jobs.smartrecruiters.com/AspenSkiingCompany/743999838438428"}}
Entonces para sacar la url pones:
out.pass_it.job.link




//infinity
(() => {
    var out = {};
    out.pass_it = {
        "counter":0,
        "jobsPerPage":0,
        "jobsInPage":0
    }
    return out;
})()

//PAGINATION
(()=>{
    var out={};
    out.pass_it=pass_it;
    var { counter, jobsPerPage, jobsInPage } = out.pass_it;
    out.pass_it.counter+=jobsPerPage;
    out.has_next_page=jobsInPage==jobsPerPage?true:false;
    return out;
})()

         out.pass_it.jobsPerPage=20;
         out.pass_it.jobsInPage = contenedor.length;
         msg('jobsPerPage: '+out.pass_it.jobsPerPage+' jobsInPage'+out.pass_it.jobsInPage);