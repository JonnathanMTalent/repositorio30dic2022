//////////////// Example
job.dateposted_raw = '06/12/2021'
if (validationDate(job.dateposted_raw) <= 180) jobs.push(job);
//////////////// Function
function validationDate(date) {
    const result = Math.abs(new Date() - new Date(date));
    return Math.trunc(result / (1000 * 3600 * 24));
}
// OUT:
// 437 días


//USANDO JOB FANTASMA
var jobf={title:job.url};
validationDate(job.dateposted_raw) <= 180 ? jobs.push(jobx) : (jobs.push(jobf));

