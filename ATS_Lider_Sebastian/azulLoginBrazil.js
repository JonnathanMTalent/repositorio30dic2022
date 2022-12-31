(async () => {
    let out = {};
    //out["pass_it"] = pass_it;

    try {
        let jobs = [];
        let resp = await fetch("https://rh.bevap.com.br/rm/api/RhuVagasServerREST/GetVagasPorFiltro?filtros=%7B%22vaga%22:null,%22funcao%22:null,%22localidade%22:null%7D", {
            "headers": {
                "accept": "application/json, text/plain, */*",
                "accept-language": "en-GB,en;q=0.9,es-CO;q=0.8,es;q=0.7",
                "sec-ch-ua": "\".Not/A)Brand\";v=\"99\", \"Google Chrome\";v=\"103\", \"Chromium\";v=\"103\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin"
            },
            "referrer": "https://rh.bevap.com.br/RM/Rhu-BancoTalentos/",
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": null,
            "method": "GET",
            "mode": "cors",
            "credentials": "omit"
        });

        //Texto
        // let data = await resp.text();
        // let doc = document.createElement('div');
        // doc.innerHTML = data;
        // let htmlJobs = doc.querySelectorAll('Selector');

        //JSON
        const data = await resp.json();
        let htmlJobs = data.data;

        //msg(data);
        //out.pass_it.limit = data.;

        for (var i in htmlJobs) {
            let elem = htmlJobs[i];
            let job = {};
            job.reqid = elem.CodVaga;
            job.title = elem.Nome;
            job.url = `https://rh.bevap.com.br/RM/Rhu-BancoTalentos/#/RM/Rhu-BancoTalentos/painelVagas/detalhesVaga/questionarios?codColigada=${elem.CodColigada}&codSelecao=${elem.CodSelecao}&codVaga=${elem.CodVaga}`;
            job.source_location = elem.Localidade;
            job.location = job.source_location;
            job.temp = 96;

            jobs.push(job);
        }
        out["jobs"] = jobs;
    } catch (err) {
        console.log(err)
    }
    return out;
})();