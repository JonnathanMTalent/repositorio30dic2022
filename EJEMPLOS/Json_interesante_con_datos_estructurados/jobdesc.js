// (function() {
//     var out = {};
//     var job = {};

//     const jobId = pass_it.job.reqid;
//     const endPoint = `https://noom.eightfold.ai/api/apply/v2/jobs/${jobId}?domain=noom.com`;

//     $.ajax({
//         url: endPoint,
//         type: 'GET',
//         async: false,
//         success: function({
//             job_description
//         }) {
//             //var selector = "";
//             var remove_selectors = [];
//             //var job = pass_it["job"];
//             const desc = document.createElement('DIV');
//             desc.innerHTML = job_description;
//             var full_html = desc;
//             // remove something from the jobdatata
//             if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {
//                 if (full_html.querySelector(remove_selector)) full_html.querySelector(remove_selector).remove();
//             });
//             if (typeof cleanHTML == "undefined") cleanHTML = function(x) {
//                 return x
//             };
//             if (typeof msg == "undefined") msg = console.log;
//             full_html.querySelectorAll('a, img, link, script, style, button, iframe').forEach(e => e.remove());
//             //[...full_html.querySelectorAll('*')].filter(e => e.textContent.match(/www|https?|@/gi)).forEach(e => e.remove());


//             full_html.innerHTML = full_html.innerHTML.replace(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g, '');
//             full_html.innerHTML = full_html.innerHTML.replace(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g, ''); //Remove email
//             full_html.innerHTML = full_html.innerHTML.replace(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g, '');
//             job.html = full_html.innerHTML.trim();
//             //job.html = removeTextBefore(job.html, 'Summary of Job Duties', false);
//             job.html = removeTextAfter(job.html, 'More About Noom', true);
//             job.html = cleanHTML(job.html);
//             var tmp = document.createElement('div');
//             tmp.innerHTML = job.html;
//             job.jobdesc = tmp.textContent.trim();
//             job.jobdesc = cleanHTML(job.jobdesc);

//         },
//         error: function(error) {
//             msg(error);
//         }
//     });

//     out["job"] = job;
//     return out;
// })();


// function removeTextBefore(html, text, flag) {
//     var newHtml = html;
//     if (newHtml.indexOf(text) > -1) {
//         newHtml = newHtml.split(text).pop();
//         if (!flag) {
//             newHtml = "<h3>" + text + "</h3>" + newHtml;
//         }
//     }
//     return newHtml;
// }

// function removeTextAfter(html, text, flag) {
//     var newHtml = html;
//     if (newHtml.indexOf(text) > -1) {
//         newHtml = newHtml.split(text).shift();
//         if (!flag) {
//             newHtml = newHtml + "<p>" + text + "</p>";
//         }
//     }
//     return newHtml;
// }