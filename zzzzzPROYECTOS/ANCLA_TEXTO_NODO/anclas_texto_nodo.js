let beneficios = Array.from(document.querySelectorAll('p')).filter(x => x.textContent.trim() == 'Benefícios');
if (beneficios.length > 0)job.source_benefit = beneficios[0].nextElementSibling.textContent.trim();
   
   
   
   //Entrega un array con los nodos que contengan un texto o simbolo especificado
    //jobsite de ejemplo : https://www.afterdigital.co.uk/careers/
    // se llamo la funcion de esta manera: var experimento=anclas_texto_nodo("→",0,3,"a, p");
    // aqui se uso el simbolo de texto: → que estaba en  los nodos que necesitaba
    //como tambien estaba en unos ultimos elementos inutiles se eliminiaron
    // en caso de tener elemetnos inutiles al principio cuantificarlos en quitarPrimeras
    function anclas_texto_nodo(ancladeTexto,quitarPrimeras, quitarUltimas,grupo_etiquetas){
        // anclas_texto_nodo(string, int, int, string)
        ; // "a, p, h1, span"  PONER TODAS LAS ETIQUETAS DONDE ESTE EL SIMBOLO O TEXTO GUIA
        var anclas=[];
        var grupo=[];
        var selectores=document.querySelectorAll(grupo_etiquetas);
        
        
        for (var x in selectores){
            // console.log(etiquetas[x])
            if(selectores[x].textContent){
            if (selectores[x].textContent.indexOf(ancladeTexto) > -1) {  
                grupo.push(selectores[x]);
                  }
                }
        }
        
        for(var i=0+quitarPrimeras; i < grupo.length-quitarUltimas; i++){
            anclas.push(grupo[i])
        }
        return anclas;
        }



        //con el selector div:

        function anclas_texto_nodo(div,ancladeTexto,quitarPrimeras, quitarUltimas,grupo_etiquetas){
            // anclas_texto_nodo(string, int, int, string)
            ; // "a, p, h1, span"  PONER TODAS LAS ETIQUETAS DONDE ESTE EL SIMBOLO O TEXTO GUIA
            var anclas=[];
            var grupo=[];
            var selectores=div.querySelectorAll(grupo_etiquetas);
            
            
            for (var x in selectores){
                // console.log(etiquetas[x])
                if(selectores[x].textContent){
                if (selectores[x].textContent.indexOf(ancladeTexto) > -1) {  
                    grupo.push(selectores[x]);
                      }
                    }
            }
            
            for(var i=0+quitarPrimeras; i < grupo.length-quitarUltimas; i++){
                anclas.push(grupo[i])
            }
            return anclas;
            }