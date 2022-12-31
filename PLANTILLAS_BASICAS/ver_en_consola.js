//modo de uso: printJob(job) , ubicar en el punto hasta donde quieren que se muetren los datos. 
//recomendado: poner debajo del out[job] = job para observar todas la variables.
function printJob(job) {
    let claves = Object.keys(job);
    msg(`\n \x1b[31m INICIO JOB.....\x1b[39m`)
    for (let i = 0; i < claves.length; i++) {
        let clave = claves[i];
        msg(`${"\x1b[32m"+claves[i]}:`)
        msg(job[clave])
    }
    msg(`\x1b[31m FIN JOB.....\n \x1b[39m`)
}