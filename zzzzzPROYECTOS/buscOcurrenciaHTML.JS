let salida=// CONTADOR DE PALABRAS

(()=>{
    var salida={};
    var revisar=document.querySelector('Body').innerHTML;
    var iframe=0;
    var jobtype=0;

    iframe=revisar?.match(/iframe/gmi)?.length;
    iframev=revisar?.match(/iframe/gmi);
    jobtype=revisar?.match(/jobtype|full time|part time|fulltime|parttime|partime/gmi)?.length;

    var info=`OCURRENCIAS DE LAS SIGUIENTES PALABRAS=
    iframe= ${iframe}`;
    salida.iframe=iframe;
    salida.viframe=iframev;
    salida.jobtype=jobtype;

    return salida;
})();


function buscOcurrenciaHTML(contenedor,selector,string,expR) {
    let resultado;
    let cont=0;

    if(contenedor!=null){
    var revisar=contenedor?.querySelector(selector)?.innerHTML;
        if(revisar?.match(expR)?.length){
        resultado=revisar?.match(expR)[0];
        return resultado;}
        }else{
            if(string?.match(expR)?.length){
            resultado=string?.match(expR)[0];
            return resultado;}
        }
}





// ULTIMA MEJORADA



function buscOcurrenciaHTML(contenedor,selector,string,expR) {
    let resultado;
    let revisar;

    if(contenedor!=null && selector!=null){
        revisar=contenedor?.querySelector(selector)?.innerHTML;
        if(revisar?.match(expR)?.length){
        resultado=revisar?.match(expR)[0];
        return resultado;}
        }else{
            if(contenedor!=null && selector==null){
                revisar=contenedor?.innerHTML;
                if(revisar?.match(expR)?.length){
                resultado=revisar?.match(expR)[0];
                return resultado;}

            }else{
                if(string?.match(expR)?.length){
                resultado=string?.match(expR)[0];
                return resultado;}
        }
    }
}


job.source_jobtype=buscOcurrenciaHTML(elem,null,"",/fulltime|full-time|part-time|full time|partime|parttime|part time|teilzeit|permanent|casual/gmi,false);
let fechas=buscOcurrenciaHTML(document,"body","",/\d{1,2}\/\d{1,2}\/\d{1,4}/gi);
job.source_empname=buscOcurrenciaHTML(document,"body","",/empname/gmi);



// buscOcurrenciaHTML(document.body,null,"",/uno|dos/gmi,false);
function buscOcurrenciaHTML(contenedor,selector,string,expR,verHTML) {
    let resultado;
    let revisar;

    if(contenedor!=null && selector!=null){
        revisar=contenedor?.querySelector(selector)?.innerHTML;
        if(verHTML)return revisar;
        if(revisar?.match(expR)?.length){
        resultado=revisar?.match(expR)[0];
        }
        }else{
            if(contenedor!=null && selector==null){
                revisar=contenedor?.innerHTML;
                if(verHTML)return revisar;
                if(revisar?.match(expR)?.length){
                resultado=revisar?.match(expR)[0];
                }

            }else{
                if(verHTML)return string;}
                if(string?.match(expR)?.length){
                resultado=string?.match(expR)[0];
        }
    }
     return resultado;
}