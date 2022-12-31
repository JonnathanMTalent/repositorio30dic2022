            // DESCRIPCION:
            let full_html= "<h3>" + desc1 + "</h3><br/>"+"<h3>" + desc2 + "</h3><br/>";
            

            var div       = document.createElement("div");
            div.innerHTML = full_html;
            var desc = div;
            
            const auxExperience = [...desc.querySelectorAll('p, li, div')].find(e => e?.textContent.match(/\(?\d{1,2}\)?\s?\+?\s?(\s?(-|to|–)\s?\d{1,2}\+?)?\syears?/gi));
            if (auxExperience) {
                job.experience_required = auxExperience.textContent.match(/\(?\d{1,2}\)?\s?\+?\s?(\s?(-|to|–)\s?\d{1,2}\+?)?\syears?/gi)[0];
            }
            
            
            for (const a of desc.querySelectorAll('a, button, script')) { // Borra todos los que encuentre
                if (a){ 
                  a.remove(); 
                } 
              }
            
              job.html = desc.innerHTML.trim(); 
            
            
              //job.html = removeTextBefore(job.html, "", false);
              //job.html = removeTextAfter(job.html, "", false);
            
             //job.html = job.html.split("").shift();
             //job.html = job.html.split("").shift();
            
              //job.html = job.html.replace("","").trim();
            
              job.html      = cleanHTML(job.html);
              var tmp       = document.createElement('div');
              tmp.innerHTML = job.html;
              job.jobdesc   = tmp.textContent.trim();
              job.jobdesc   = cleanHTML(job.jobdesc);