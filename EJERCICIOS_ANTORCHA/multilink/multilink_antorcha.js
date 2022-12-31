Https://app.massnonprofitnet.org/jobs


Video 2 minuto 53 Grabaciones - OneDrive (sharepoint.com) 

En multilink primero entra a la pagina definida en la config luego pasa al pagination 

No necesita condicion de parada 

JOBSITE:  https://emealjobs.nttdata.com/es/ofertas-espana 

 

 

//2 ACCIONES A EJECUTAR template MULTILINK BASICO 

(function () { 

    var out = {}; 

    if (typeof pass_it == "undefined") pass_it = {}; 

    if (!pass_it["urls"]) { 

        out["pass_it"] = { 

            "urls": [“| Jobs NTT DATA EMEAL”,”| Jobs NTT DATA EMEAL”]                //ACCION1:COLOCAR LAS URL 

        }; 

    } else { 

        out["pass_it"] = pass_it; 

    } 

    if (out["pass_it"]["urls"].length > 0) { 

        var url = out["pass_it"].urls.shift(); 

        //msg(url); 

        window.location.href = url; 

        out["has_next_page"] = true; 

    } else { 

        out["has_next_page"] = false; 

    } 

    out.waitFor = '';  // ACCION2:COLOCAR EL SELECTOR A ESPERAR 

   //out.wait=true; 

    return out; 

})(); 

 

Ejemplo 4- Multilink paginado 

 

Blas 

// MULTILINK PAGINADO NEXT 

  //ACCION 1  LINEA 8 EL SELECTOR NEXT;   ACCION 2: LINEA 15 LAS URLS A PAGINAR 

/////////////////Paginacion   

//   JOBISITE :  https://emealjobs.nttdata.com/es/ofertas-espana?page=0 

(function() { 

    var out = {}; 

  

  var next_page_selector = 'li.next a'; // Selector del next 

  //var last_page_selector = ""; //Selector de la última página 

  

    if (typeof pass_it == "undefined") pass_it = {}; 

         if (!pass_it["urls"]) { 

         out["pass_it"] = { 

  

             "urls": ["https://https://emealjobs.nttdata.com/es/ofertas-moroco?page=0", 

                     "https://https://emealjobs.nttdata.com/es/ofertas-greece?page=0", 

                     "https://", 

                     "https://", 

                     "https://", 

                     "https://", 

                     "https://, 

                     "https://"]                //Colocar las urls 

         }; 

     } else { 

         out["pass_it"] = pass_it; 

     } 

  

    var clickable_elem = document.querySelector(next_page_selector); 

  

    //stop condition 

    if (!document.querySelector(next_page_selector)) { 

    out["has_next_page"] = false; 

          msg("ENTRAAA EN FALSO"); 

  

          if (out["pass_it"]["urls"].length > 0) { 

                    var url = out["pass_it"].urls.shift(); 

                        //msg(url); 

                  msg("PERO TIENE URL"); 

                    window.location.href = url; 

                    out["has_next_page"] = true; 

            } 

  

    } else { 

      msg("clickkk"); 

        clickable_elem.click(); 

        out["has_next_page"] = true; 

  

    } 

  out["wait"] = true; 

    //out["pic"] = true; 

    //out.waitFor = "a.item.hasImage"; 

    return out; 

})(); 

  

//////////////////////////////////// 

  

// Cuando el botón tiene ">" y desaparece ESTA EN EL TEMPLATE ORIGINAL 