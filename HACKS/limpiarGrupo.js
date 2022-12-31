FUNCIONAL COMPLETA CON TransformStreamDefaultController

function limpiarGrupo(separador,limpiarEsto,limpiarGrupo,reemplazarPor){
    var variableAlimpiar=limpiarEsto;
    var arreglo1, arreglo2, cant1=0,cant2=0;
    if(limpiarGrupo.includes(separador)){
        arreglo1 = limpiarGrupo.split(separador);
        cant1=arreglo1.length;
    }
    if(reemplazarPor.includes(separador)){
        arreglo2 = reemplazarPor.split(separador);
        cant2=arreglo2.length;
    }
    if(cant1>0 && cant1==cant2){
        for(var z=0;z<cant1;z++){
            var limpia=arreglo1[z];
            var reemp=arreglo2[z];
            variableAlimpiar= variableAlimpiar.replace(limpia,reemp);
        }

    }else{
    if(limpiarGrupo.includes(separador)){
        for(var v=0;v<arreglo1.length;v++){
        var limpia=arreglo1[v];
        variableAlimpiar= variableAlimpiar.replace(limpia,reemplazarPor);
        }
        }else{
            if(limpiarGrupo!=''){
                variableAlimpiar= variableAlimpiar.replace(limpiarGrupo,reemplazarPor);
            }
        
        }
    }
        return variableAlimpiar;
}






if(job.html.indexOf('@')>-1){
    var eliminar = job.html.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi).join('\n');
    job.html = job.html.replace(eliminar,'');
    }
    
    if (job.html.indexOf('https') > -1) { job.html = job.html.replace(/(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,""); }
    if (job.html.indexOf('http') > -1)  { job.html = job.html.replace(/(http?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,"");  } 
    if (job.html.indexOf('HTTPS') > -1) { job.html = job.html.replace(/(HTTPS?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,""); }
    if (job.html.indexOf('HTTP') > -1)  { job.html = job.html.replace(/(HTTP?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,"");  }
    if (job.html.indexOf('www') > -1)  { job.html = job.html.replace(/(www?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?/gi,"");  }
