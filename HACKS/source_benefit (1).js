/* ⟢ ⊱⊱ ⟢  ⟢ ⊱⊱ ⟢  ⟢ ⊱⊱ ⟢  ⟢ ⊱⊱ ⟢  ⟢ ⊱⊱ ⟢  ⟢ ⊱⊱ ⟢  ⟢ ⊱⊱ ⟢  ⟢ ⊱⊱ ⟢  ⟢ ⊱⊱ ⟢  ⟢ ⊱⊱ ⟢  ⟢ ⊱⊱ ⟢  ⟢ ⊱⊱ ⟢  ⟢ ⊱⊱ ⟢  ⟢ ⊱⊱ ⟢  ⟢ ⊱⊱ ⟢  ⟢ ⊱⊱ ⟢  ⟢ ⊱⊱ ⟢ 
                                                                //██████╗░░██████╗
                                                                //██╔══██╗██╔════╝
                                                                //██║░░██║╚█████╗░
                                                                //██║░░██║░╚═══██╗
                                                                //██████╔╝██████╔╝
                                                                //╚═════╝░╚═════╝░
 ⟢ ⊱⊱ ⟢  ⟢ ⊱⊱ ⟢  ⟢ ⊱⊱ ⟢  ⟢ ⊱⊱ ⟢  ⟢ ⊱⊱ ⟢  ⟢ ⊱⊱ ⟢  ⟢ ⊱⊱ ⟢  ⟢ ⊱⊱ ⟢  ⟢ ⊱⊱ ⟢  ⟢ ⊱⊱ ⟢  ⟢ ⊱⊱ ⟢  ⟢ ⊱⊱ ⟢  ⟢ ⊱⊱ ⟢  ⟢ ⊱⊱ ⟢  ⟢ ⊱⊱ ⟢  ⟢ ⊱⊱ ⟢  ⟢ ⊱⊱ ⟢ */
 
 /* -------------------------------------------------------------------------- */
/*                    LA INFORMACION ESTA EN UN CONTENEDOR                    */
/* -------------------------------------------------------------------------- */

/*
    https://jobs.jobconvo.com/job/MzI3-consultor-senior-1-a-4/1b52b2fa-7f2c-48a9-886c-277a21d98162/?career_page=44f88192-2f8f-4a38-8fbb-1be674e95516&source=
    link de donde fue inspirado el codigo
*/


let beneficios = Array.from(document.querySelectorAll('p')).filter(x => x.textContent.trim() == 'Benefícios');

/* -------------------------------------------------------------------------- */
/*              CUANDO NECESITAMOS EL SELECTOR HERMANO SIGUIENTE              */
/* -------------------------------------------------------------------------- */

if (beneficios.length > 0)
    job.source_benefit = beneficios[0].nextElementSibling.textContent.trim();

/* -------------------------------------------------------------------------- */
/*                   CUANDO NECESITAMOS LA ETIQUETA ANTERIOR                  */
/* -------------------------------------------------------------------------- */
if (beneficios.length > 0)
    job.source_benefit = beneficios[0].parentElement.textContent.trim();



/* ⟢ ⊱⊱ ⟢  ⟢ ⊱⊱ ⟢  ⟢ ⊱⊱ ⟢  ⟢ ⊱⊱ ⟢  ⟢ ⊱⊱ ⟢  ⟢ ⊱⊱ ⟢  ⟢ ⊱⊱ ⟢  ⟢ ⊱⊱ ⟢  ⟢ ⊱⊱ ⟢  ⟢ ⊱⊱ ⟢  ⟢ ⊱⊱ ⟢  ⟢ ⊱⊱ ⟢  ⟢ ⊱⊱ ⟢  ⟢ ⊱⊱ ⟢  ⟢ ⊱⊱ ⟢  ⟢ ⊱⊱ ⟢  ⟢ ⊱⊱ ⟢ 
                                                                //██████╗░░██████╗
                                                                //██╔══██╗██╔════╝
                                                                //██║░░██║╚█████╗░
                                                                //██║░░██║░╚═══██╗
                                                                //██████╔╝██████╔╝
                                                                //╚═════╝░╚═════╝░
 ⟢ ⊱⊱ ⟢  ⟢ ⊱⊱ ⟢  ⟢ ⊱⊱ ⟢  ⟢ ⊱⊱ ⟢  ⟢ ⊱⊱ ⟢  ⟢ ⊱⊱ ⟢  ⟢ ⊱⊱ ⟢  ⟢ ⊱⊱ ⟢  ⟢ ⊱⊱ ⟢  ⟢ ⊱⊱ ⟢  ⟢ ⊱⊱ ⟢  ⟢ ⊱⊱ ⟢  ⟢ ⊱⊱ ⟢  ⟢ ⊱⊱ ⟢  ⟢ ⊱⊱ ⟢  ⟢ ⊱⊱ ⟢  ⟢ ⊱⊱ ⟢ */

/* -------------------------------------------------------------------------- */
/*                        CONTENIDO EN VARIAS ETIQUETAS                       */
/* -------------------------------------------------------------------------- */

/*
https://www.4minutes.nl/vacature/productiemedewerker-afdeling-voorbereiding-qizini-losser/
descripcion de la cual se inspiro el codigo par extaer los beneficios
*/

/*
    1. EN el querySelector colocamos la etiqueta donde se encuentra el titulo
    2. Realizamos un filtro, en el search colocamos la palabras o palabras que dice que es beneficio o lo que ofrecen
*/
let ben = Array.from(document.querySelectorAll('h2')).filter(x => x.textContent.search(/Wij bieden jou|Wat bieden wij/gmi) > -1)

/*
    3. Validamos si el filtro nos trajo un vector diferente de 0, en caso de ser correcto se procede con la extraccion de la informacion
*/
if (ben.length > 0) {
    ben = ben[0]

    let flag = false
    job.source_benefit = ''
    do {
        /*
            4. Capturamos el selector siguiente a este
            5. Con el nodeName validamos que tipo de etiqueta estamos parados
               este nos sirve para validar la condicion de parada
               para este caso, como los titulos se encuentran en etiquetas H2, cuando encuentre un H2 dejara de tomar la informacion
               
        */
        let sig_etiqueta = ben.nextElementSibling

        if (sig_etiqueta.nodeName == 'H2') {
            flag = true
        } else {

            /*
                6. En caso de que la etiqueta siguiente no sea un titulo ( para este caso un H2)
                   procedemos a concatenar la informacion en nuestra variable
                7. Para poder avanzar, reutilizamos nuestra variable ben para guardar la informacion de donde esta parado,
                   siendo asi, para que este actue como variable de donde esta parado; (Referencia a recorridos de listas ligadas)
            */
            job.source_benefit += `\n ${sig_etiqueta.textContent.trim()}`;
            ben = sig_etiqueta
        }
    } while (flag == false)
    /*
        8. Se creo una bandera para saber cuando parar, este bandera cambia en el if, mientras sea false se continua
           con la extrccion de datos, cuando entra al if, cambiamos esta a true ( Leer #5)
    */
}


// OTRA FORMA cuando tiene la estructura p >>  ul --> li

let benefitRegex = /Benefits:/gi;
        if (job.html.search(benefitRegex) > -1) {
            for (const b of full_html.querySelectorAll("p")) {
                if (b.textContent.search(benefitRegex) > -1 &&
                    b.nextElementSibling.querySelector("li")) {
                    job.source_benefit = b.nextElementSibling.textContent.trim();
                    break;
                }
            }
        }


OTRA FORMA  EN WD5



// EN EL NAVEGADOR: 
job=[];job.source_benefit=''
let ben = Array.from(document.querySelectorAll('p')).filter(x => x.textContent.search(/Benefits/gmi) > -1)
for (let i=0;i<ben.length; i++){
 ben[i]!=null && ben[i].textContent.length>50 ? job.source_benefit=ben[i].textContent.trim() :job.source_benefit=job.source_benefit;
}

//EN UN JSON:
job.source_benefit=''
let ben = Array.from(full_html.querySelectorAll('p')).filter(x => x.textContent.search(/Benefits/gmi) > -1)
for (let i=0;i<ben.length; i++){
 ben[i]!=null && ben[i].textContent.length>50 ? job.source_benefit=ben[i].textContent.trim() :job.source_benefit=job.source_benefit;
}

 // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
//SE METE EL HTML EN EL DIV CUANDO EL JSON NO VIENE CONVERTIDO ASI          
          var div       = document.createElement("div");
          div.innerHTML = full_html;
          job.source_benefit='';
          let ben = Array.from(div.querySelectorAll('p')).filter(x => x.textContent.search(/We offer competitive rates /gmi) > -1);
          ben[0]!=null? job.source_benefit=ben[0].nextElementSibling.textContent.trim() : job.source_benefit='';
//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj