var infor=elem.querySelector('p').textContent.trim();
//msg(infor);
if(infor.indexOf('Type contract:')>-1 && infor.indexOf('Salaris')>-1){
job.source_jobtype = infor.split('Type contract:').pop().split('Salaris').shift().trim();
}



function recorte_palabras(contenedor,etiquetas,palabrai,palabraf,){
var infor=contenedor.querySelector(etiquetas).textContent.trim();
var retorno;
//msg(infor);
if(infor.indexOf(palabrai)>-1 && infor.indexOf(palabraf)>-1){
    retorno= infor.split(palabrai).pop().split(palabraf).shift().trim();
}else{
    retorno="NO SE ENCONTRO AL MENOS UNA DE LAS PALABRAS DE DIVISION"
}
return retorno;
}



function recorte_palabras(contenedor,etiquetas,palabrai,palabraf,mostrar){
    var infor=contenedor.querySelector(etiquetas).textContent.trim();
    var retorno;
    if(mostrar==true){
    return console.log(infor);
}else{
    if(palabrai!=null){
        if(infor.indexOf(palabrai)>-1){
            retorno= infor.split(palabrai).pop().trim();
        }else{
            retorno="NO SE ENCONTRO LA PALABRA DE DIVISION"
        }
    }

    return retorno;
}
    }

Correcta 1=

    function recorte_palabras(contenedor,selectores,palabrai,palabraf,funcionalidad){
        var infor=contenedor.querySelector(selectores).textContent.trim();
        var retorno;
        //if(contenedor.querySelector(selectores))
    switch (funcionalidad) {
        case "mostrar":
            return console.log(infor);
          break;
      
        case "inicial-final":
            if(infor.indexOf(palabrai)>-1 && infor.indexOf(palabraf)>-1){
                retorno= infor.split(palabrai).pop().split(palabraf).shift().trim();
            }else{
                retorno="NO SE ENCONTRO AL MENOS UNA DE LAS PALABRAS DE DIVISION"
            }
            return retorno;
          break;

        case "final":
            if(infor.indexOf(palabraf)>-1){
                retorno= infor.split(palabraf).pop().trim();
            }else{
                retorno="NO SE ENCONTRO LA PALABRA FINAL"
            }
            return retorno;
            break;

        case "inicial":
            if(infor.indexOf(palabrai)>-1){
                retorno= infor.split(palabrai).shift().trim();
            }else{
                retorno="NO SE ENCONTRO LA PALABRA INICIAL"
            }
            return retorno;
            break;
      
        case choice2:
            ejecuta este código
            break;
        // Se pueden incluir todos los casos que quieras
      
        default:
         return console.log("REVISAR LOS PARAMETROS INGRESADOS");
      }

    }


    segunga :

    //     ████████████████████████████████████████████████████████████████████  /*  
/*
contenedor:  div, elem, document
selectores: selecotores dondes esta el texto
palabrai:  palabra inicial  funcion: inicial; toma lo que esta a la izquierda (.shift)
                            funcion: inicial-final; tomo lo que esta en medio entre
palabraf: palabra final    funcion: final;  toma lo que esta a la derecha (.pop)
funcionalidad: mostrarD   muestra lo que hay (dinamic)
                mostrarB   muestra lo que hay (Navegadores)
*/
    function recorte_palabras(contenedor,selectores,palabrai,palabraf,funcionalidad){
        var infor;         //   var     , string   , string , string,   string
        var retorno;


        try {
            if(contenedor.querySelector(selectores)==null){
                funcionalidad="error en el selector";
            }else{
                 infor=contenedor.querySelector(selectores).textContent.trim();
            }
    
        switch (funcionalidad) {
            case "mostrarD":
                //return console.log(infor);
                return msg(infor);
              break;

              case "mostrarB":
                //return console.log(infor);
                return console.log(infor);
              break;
          
            case "inicial-final":
                if(infor.indexOf(palabrai)>-1 && infor.indexOf(palabraf)>-1){
                    retorno= infor.split(palabrai).pop().split(palabraf).shift().trim();
                }else{
                    retorno="NO SE ENCONTRO AL MENOS UNA DE LAS PALABRAS DE DIVISION"
                }
                return retorno;
              break;
    
            case "final":
                if(infor.indexOf(palabraf)>-1){
                    retorno= infor.split(palabraf).pop().trim();
                }else{
                    retorno="NO SE ENCONTRO LA PALABRA FINAL"
                }
                return retorno;
                break;
    
            case "inicial":
                if(infor.indexOf(palabrai)>-1){
                    retorno= infor.split(palabrai).shift().trim();
                }else{
                    retorno="NO SE ENCONTRO LA PALABRA INICIAL"
                }
                return retorno;
                break;
          
    
    
            case "error en el selector":
                return console.log("Error en el selector o contenedor");
                break;
         
          /*
            case choice2:
                ejecuta este código
                return
                break;
                */
            default:
             return console.log("REVISAR LOS PARAMETROS INGRESADOS");
          }
    
        }
          
          catch(e) {
            document.write(e.message);
            retorno="ERROR EN EL SELECTOR O EL CONTENEDOR";
            return retorno;
          }
          finally {
            // Always run this code regardless of error or not
            //this block is optional
          }
        
        }


//*/// ████████████████████████████████████████████████████████████████████

agregar limpiar texto que sea como un multilocation, agregar quitar numeros, y quitar letras, y quitar caracteres especiales
    //     █████████████████████████████████tercera 3███████████████████████████████████  /*  

    function recorte_palabras(contenedor,selectores,palabrai,palabraf,funcionalidad,limpiar,limpiarEsto,separador,limpiarGrupo){
        var infor;
        var retorno;


        try {
            if(contenedor.querySelector(selectores)==null){
                funcionalidad="error en el selector";
            }else{
                 infor=contenedor.querySelector(selectores).textContent.trim();
            }
    
        switch (funcionalidad) {
            case "mostrar":
                return console.log(infor);
              break;
          
            case "inicial-final":
                if(infor.indexOf(palabrai)>-1 && infor.indexOf(palabraf)>-1){
                    retorno= infor.split(palabrai).pop().split(palabraf).shift().trim();
                }else{
                    retorno="NO SE ENCONTRO AL MENOS UNA DE LAS PALABRAS DE DIVISION"
                }
                return retorno;
              break;
    
            case "final":
                if(infor.indexOf(palabraf)>-1){
                    retorno= infor.split(palabraf).pop().trim();
                }else{
                    retorno="NO SE ENCONTRO LA PALABRA FINAL"
                }
                return retorno;
                break;
    
            case "inicial":
                if(infor.indexOf(palabrai)>-1){
                    retorno= infor.split(palabrai).shift().trim();
                }else{
                    retorno="NO SE ENCONTRO LA PALABRA INICIAL"
                }
                return retorno;
                break;
          
    
    
            case "error en el selector":
                return console.log("Error en el selector o contenedor");
                break;
         
            case limpiar==true:
                ejecuta este código
                return
                break;
          /*
            case choice2:
                ejecuta este código
                return
                break;
                */
            default:
             return console.log("REVISAR LOS PARAMETROS INGRESADOS");
          }
    
        }
          
          catch(e) {
            document.write(e.message);
            retorno="ERROR EN EL SELECTOR O EL CONTENEDOR";
            return retorno;
          }
          finally {
            // Always run this code regardless of error or not
            //this block is optional
          }
        
        }


//*/// ████████████████████████████████████████████████████████████████████


funcioana bien 

function limpiarGrupo(separador,limpiarEsto,limpiarGrupo,reemplazarPor){
    var variableAlimpiar=limpiarEsto;
    if(limpiarGrupo.includes(separador)){
        var arreglo = limpiarGrupo.split(separador);
        for(var z=0;z<arreglo.length;z++){
        var limpia=arreglo[z];
        variableAlimpiar= variableAlimpiar.replace(limpia,reemplazarPor);
        }
        }else{
            if(limpiarGrupo!=''){
                variableAlimpiar= variableAlimpiar.replace(limpiarGrupo,reemplazarPor);
            }
        
        }
        return variableAlimpiar;
}