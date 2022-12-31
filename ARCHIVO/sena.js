
////////////////////////////////MENU:  ejercicio 4 entregable

var arreglo=[];

do{
 
    function persona(nombre, cedula, fechaNacimiento, correo,ciudadResidencia, ciudadOrigen,titulo1,artista1,titulo2,artista2,titulo3,artista3){
        let objeto={nombre:nombre, cedula:cedula, fechaNacimiento:fechaNacimiento, correo:correo,ciudadResidencia:ciudadResidencia ,ciudadOrigen:ciudadOrigen ,titulo1:titulo1 , artista1: artista1,titulo2:titulo2 , artista2:artista2,titulo3:titulo3, artista3:artista3 };
         return objeto;
     }
    var repetir=true;
    let menu= prompt('Seleccione 1 para ver los Datos, seleccione 2 para agregar Datos, 3 para salir');
    let posicion=0;

    switch (menu) {
        case "1":
            if(arreglo.length==0){
                alert('Aun no se han ingresado datos, seleccione 2 en el menu e ingrese datos.');
                repetir=true;
            }else{
                do{
                    var repetir2=true;
                    posicion=prompt("Que posicion de persona desea ver (solo numeros del 1 al "+(arreglo.length)+")");
            
                    
                    if(posicion.search(/\D/gmi)==-1){
                        posicion=parseInt(posicion);
                        if(posicion>0 && posicion< arreglo.length+1){
                            alert('los datos de la persona en la posicion  '+posicion+"  serian: Nombre:  "+arreglo[posicion-1].nombre+" ....Cedula: "+arreglo[posicion-1].cedula+" ....Fecha de Nacimiento: "+arreglo[posicion-1].fechaNacimiento+" .... Correo: "+arreglo[posicion-1].correo+" .... Ciudad de residencia: "+arreglo[posicion-1].ciudadResidencia+" ....Ciudad Origen: "+arreglo[posicion-1].ciudadOrigen+" ....Cancion 1: "+arreglo[posicion-1].titulo1+" ....Artista 1: "+arreglo[posicion-1].artista1+" ....Cancion 2: "+arreglo[posicion-1].titulo2+" ....artista 2: "+arreglo[posicion-1].artista2+" .... cancion 3: "+arreglo[posicion-1].titulo3+" .... artista 3"+arreglo[posicion-1].artista3);
                            repetir2=false;
                        }else{
                            alert('ingrese solo números enteros del 1 al '+arreglo.length+', no letras o puntos');
                            repetir2=true;
                        }
            
            
                    }else{
                      alert('ingrese solo números enteros del 1 al 6, no letras o puntos'); repetir2=true;
                    }
                    }while(repetir2);
                
          repetir=true;
            }
          break;
      
        case "2":
            do{
                var repetir3=true;
                agregar=prompt("desea agragar una persona? (s : para si, cualquier letra o numero para volver al menu)");
        
                
                if(agregar=="s" && arreglo.length<6){
                    let cedula= prompt('Ingrese  la cedulade la persona en posicion: '+(arreglo.length+1)+'  :');
                    if(cedula.search(/\D/gmi)==-1 && cedula.search(/\d/gi)>-1 && cedula.search(/[^\w\s]/gi==-1)){
                        cedula=parseInt(cedula);
                    let nombre= prompt('Ingrese el nombre de la persona en posicion: '+(arreglo.length+1)+'  :');
                    let fechaNacimiento= prompt('Ingrese la fecha de nacimiento de la persona en posicion: '+(arreglo.length+1)+'  :');
                    let correo= prompt('Ingrese el correo de la persona en posicion: '+(arreglo.length+1)+'  :');
                    let ciudadResidencia= prompt('Ingrese la ciudad de residencia de la persona en posicion: '+(arreglo.length+1)+'  :');
                    let ciudadOrigen= prompt('Ingrese la ciudad Origen de la persona en posicion: '+(arreglo.length+1)+'  :');
                    let titulo1= prompt('Ingrese el nombre de la cancion 1 de la persona en posicion: '+(arreglo.length+1)+'  :');
                    let artista1= prompt('Ingrese el nombre del artista de la cancion 1 de la persona en posicion: '+(arreglo.length+1)+'  :');
                    let titulo2= prompt('Ingrese el nombre de la cancion 2 de la persona en posicion: '+(arreglo.length+1)+'  :');
                    let artista2= prompt('Ingrese el nombre del artista de la cancion 2 de la persona en posicion: '+(arreglo.length+1)+'  :');
                    let titulo3= prompt('Ingrese el nombre de la cancion 3 de la persona en posicion: '+(arreglo.length+1)+'  :');
                    let artista3= prompt('Ingrese el nombre del artista de la cancion 3 de la persona en posicion: '+(arreglo.length+1)+'  :');


                        
                        let personap=persona(nombre, cedula, fechaNacimiento, correo,ciudadResidencia, ciudadOrigen,titulo1,artista1,titulo2,artista2,titulo3,artista3);
                        arreglo.push(personap);
                            repetir4=false;
                        }else{
                            alert('ingrese solo números enteros, no letras, puntos o caracteres especiales');
                            repetir3=true;
                        }
                    }else{
                        if(agregar=="s" && arreglo.length==6)alert('ya ha llenado el cupo máximo de 6 personas');
                        repetir3=false;
                    }
        
                }while(repetir3);
          
          break;

        case "3":
            repetir=false;
            
            break;
      
        default:
            alert("por fabor ingrese una de las opciones disponibles");
          
      }

    }while(repetir);


////////////////////////////////MENU:  ejercicio 4 simple

var arreglo=[];

do{

    function persona(nombre, cedula){
        let objeto={nombre:nombre, cedula:cedula};
         return objeto;
     }
    var repetir=true;
    let menu= prompt('Seleccione 1 para ver los Datos, seleccione 2 para agregar Datos, 3 para salir');
    let posicion=0;

    switch (menu) {
        case "1":
            if(arreglo.length==0){
                alert('Aun no se han ingresado datos, seleccione 2 en el menu e ingrese datos.');
                repetir=true;
            }else{
                do{
                    var repetir2=true;
                    posicion=prompt("Que posicion de persona desea ver (solo numeros del 1 al "+(arreglo.length)+")");
            
                    
                    if(posicion.search(/\D/gmi)==-1){
                        posicion=parseInt(posicion);
                        if(posicion>0 && posicion< arreglo.length+1){
                            alert('los datos de la persona en la posicion  '+posicion+"  serian: "+arreglo[posicion-1].nombre+" ...."+arreglo[posicion-1].cedula);
                            repetir2=false;
                        }else{
                            alert('ingrese solo números enteros del 1 al '+arreglo.length+', no letras o puntos');
                            repetir2=true;
                        }
            
            
                    }else{
                      alert('ingrese solo números enteros del 1 al 6, no letras o puntos'); repetir2=true;
                    }
                    }while(repetir2);
                
          repetir=true;
            }
          break;
      
        case "2":
            do{
                var repetir3=true;
                agregar=prompt("desea agragar una persona? (s : para si, cualquier letra o numero para volver al menu)");
        
                
                if(agregar=="s" && arreglo.length<6){
                    let nombre= prompt('Ingrese el nombre de la persona en posicion: '+(arreglo.length+1)+'  :');
                    let cedula= prompt('Ingrese  la cedulade la persona en posicion: '+(arreglo.length+1)+'  :');
                    if(cedula.search(/\D/gmi)==-1 && cedula.search(/\d/gi)>-1 && cedula.search(/[^\w\s]/gi==-1)){
                        cedula=parseInt(cedula);
                        
                        let personap=persona(nombre,cedula);
                        arreglo.push(personap);
                            repetir4=false;
                        }else{
                            alert('ingrese solo números enteros, no letras, puntos o caracteres especiales');
                            repetir3=true;
                        }
                    }else{
                        if(agregar=="s" && arreglo.length==6)alert('ya ha llenado el cupo máximo de 6 personas');
                        repetir3=false;
                    }
        
                }while(repetir3);
          
          break;

        case "3":
            repetir=false;
            
            break;
      
        default:
            alert("por fabor ingrese una de las opciones disponibles");
          
      }

    }while(repetir);


    /////////////////////////////////////////////////////////////////////////


    function persona(nombre, cedula){
        let objeto={nombre:nombre, cedula:cedula};
         return objeto;
     }
    arreglo=[];
    do{
        var repetir3=true;
        agregar=prompt("desea agragar una persona? (s : para si, cualquier letra o numero para volver al menu)");

        
        if(agregar=="s" && arreglo.length<6){
            let nombre= prompt('Ingrese el nombre de la persona en posicion: '+(arreglo.length+1)+'  :');
            let cedula= prompt('Ingrese  la cedulade la persona en posicion: '+(arreglo.length+1)+'  :');
            if(cedula.search(/\D/gmi)==-1 && cedula.search(/\d/gi)>-1 && cedula.search(/[^\w\s]/gi==-1)){
                cedula=parseInt(cedula);
                
                let personap=persona(nombre,cedula);
                arreglo.push(personap);
                    repetir4=false;
                }else{
                    alert('ingrese solo números enteros, no letras, puntos o caracteres especiales');
                    repetir3=true;
                }
            }else{
                if(agregar=="s" && arreglo.length==6)alert('ya ha llenado el cupo máximo de 6 personas');
                repetir3=false;
            }

        }while(repetir3);


    // PRIMER EJERCICIO

    do{
        var repetir4=true;
        let nombre= prompt('Ingrese el nombre de la persona en posicion: '+(arreglo.length+1)+'  :');
        let cedula= prompt('Ingrese  la cedulade la persona en posicion: '+(arreglo.length+1)+'  :');

        
        if(cedula.search(/\D/gmi)==-1 && posicion.search(/\d/gi)>-1 && cedula.search(/[^\w\s]/gi==-1)){
            cedula=parseInt(cedula);
            
            let personap=persona(nombre,cedula);
            arreglo.push(personap);
                repetir4=false;
            }else{
                alert('ingrese solo números enteros, no letras, puntos o caracteres especiales');
            }


        }else{
          alert('ingrese solo números enteros del 1 al 6, no letras o puntos'); repetir2=true;
        }
        }while(repetir2);


/////////////////////////////INGRESAR DATOS DE LOS USUARIOS
    for(let i=0; i<3; i++){

        let nombre= prompt('Ingrese el nombre');
        let cedula= prompt('Ingrese  la cedula');
        let persona1=persona(nombre,cedula);
        arreglo.push(persona1);

    }
    for(let x of arreglo){
        alert(x.nombre+"     "+x.cedula);
    }


    if(menu==1 || menu==2){
        if(arreglo.length==0){
            alert('Aun no se han ingresado datos, seleccione 2 en el menu e ingrese datos.');
            repetir=true;
        }else{
            for(let x of arreglo){
                alert(x.nombre+"     "+x.cedula);
            }
      repetir=true;
        }
    }else{
      if(menu==3)repetir=false;
      alert('por favor seleccione uno de los items 1: ver los Datos o 2:agregar Datos');
    }





    🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳
// PRIMER EJERCICIO

    do{
        var repetir=true;
        var baseT= prompt('Ingrese la medida de la base:');
        var alturaT= prompt('Ingrese la medida de la altura:');
        var resultadoArea=0;
        var resultadoPerimetro=0;
        
        if(baseT.search(/\D/gmi)==-1 && alturaT.search(/\D/gmi)==-1){
          baseT=parseInt(baseT);
          alturaT=parseInt(alturaT);
          resultadoArea= (baseT*alturaT)/2;
          resultadoPerimetro=baseT+alturaT+Math.sqrt(baseT*baseT+alturaT*alturaT);
          alert('El area del triangulo seria  '+resultadoArea+ ', El perimetro del triangulo seria: '+resultadoPerimetro);
          repetir=false;
        }else{
          alert('ingrese solo números enteros, no letras o puntos');
        }
        }while(repetir);

🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳


// tercer ejercicioS


do{
    var repetir2=true;
    var vector1=[];
    var vector2=[];
    var vectorSumaOrdenado=[];
    var vectorSuma=[];
    var min=0;
    var minFijo=0;



    do{
        var repetir3=true;
        var lista1=prompt('Lista 1. Ingrese un numero mayor que: 0');
        if(lista1.search(/\D/gmi)==-1 ){ 
            lista1=parseInt(lista1);
            if(0<lista1){
                vector1.push(lista1);
                repetir3=false;
            }
        }else{
            alert('A ingresado datos erroneos, por favor ingrese solo numeros sin letras o puntos');
        }
        }while(repetir3);

    for(let i=0; i<4; i++){
        do{
            var repetir=true;
            var lista1=prompt('Lista 1. Ingrese un numero mayor que: '+vector1[i]);
            if(lista1.search(/\D/gmi)==-1 ){ 
                lista1=parseInt(lista1);
                if(vector1[i]<lista1){
                    vector1.push(lista1);
                    repetir=false;
                }
            }else{
                alert('A ingresado datos erroneos, por favor ingrese solo numeros sin letras o puntos');
            }
            }while(repetir);
    }
////////////////////////////// segundo vector
    do{
        var repetir4=true;
        var lista2=prompt('Lista 2. Ingrese un numero mayor que: 0');
        if(lista2.search(/\D/gmi)==-1 ){ 
            lista2=parseInt(lista2);
            if(0<lista2){
                vector2.push(lista2);
                repetir4=false;
            }
        }else{
            alert('A ingresado datos erroneos, por favor ingrese solo numeros sin letras o puntos');
        }
        }while(repetir4);

    for(let i=0; i<4; i++){
        do{
            var repetir5=true;
            var lista2=prompt('Lista 2. Ingrese un numero mayor que: '+vector2[i]);
            if(lista2.search(/\D/gmi)==-1 ){ 
                lista2=parseInt(lista2);
                if(vector2[i]<lista2){
                    vector2.push(lista2);
                    repetir5=false;
                }
            }else{
                alert('A ingresado datos erroneos, por favor ingrese solo numeros sin letras o puntos');
            }
            }while(repetir5);
    }
///// op
vectorSuma=[...vector1,...vector2];
vector1[4]>vector2[4]?minFijo=vector1[4]:minFijo=vector2[4];


do{
    min=minFijo;
    for(let i=0; i<vectorSuma.length; i++){
        if(vectorSuma[i]<min)min=vectorSuma[i];
      }
      vectorSuma.splice(vectorSuma.indexOf(min),1);
      vectorSumaOrdenado.push(min);
}while(vectorSuma.length>0);



    alert('   Lista 1 :'+vector1);
    alert('   Lista 2 :'+vector2);
    alert('   Lista 3 :'+vectorSumaOrdenado);
    repetir2=false;

    
    }while(repetir2);











    // vector1=[0,5,18,18,27];
    // vector2=[10,18,22,22,32];
    // vectorSuma=[...vector1,...vector2];
    // vector1[4]>vector2[4]?minFijo=vector1[4]:minFijo=vector2[4];
    // vectorSumaOrdenado=[];
///////////////////////////////////////////////////////////////////////////////////////


🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳
SEGUNDO EJERCICIO

do{
    var repetir2=true;
    var edades=[];
    var nombres=[];
    var menores=0;
    var mayores=0;
    var adultoMayor=0;
    var edadMasBaja=120;
    var edadMasAlta=0;
    var promedio=0;
    var nombreEdadAlta="";
    var nombreEdadBaja="";
    for(let i=0; i<10; i++){
        do{
            var repetir=true;
            var edad=prompt('ingrese la edad sin letras o puntos y en un rango entre 1 y 120 años. Persona:'+(i+1));
            if(edad.search(/\D/gmi)==-1 ){ 
                edad=parseInt(edad);
                if(0<edad && edad<121){
                    edades.push(edad);
                    repetir=false;
                    let nombre=prompt('Ingrese el nombre de la persona:'+(i+1));
                    nombres.push(nombre);
                }
            }else{
                alert('A ingresado datos erroneos, por favor lea correctamente');
            }
            }while(repetir);
    }
    for(let i=0; i<edades.length; i++){
        edades[i]<18? menores+=1:
        edades[i]>17 && edades[i]<60 ? mayores+=1:
        edades[i]>59?adultoMayor+=1:"fin";
        if(edades[i]>edadMasAlta)edadMasAlta=edades[i],nombreEdadAlta=nombres[i];
        if(edades[i]<edadMasBaja)edadMasBaja=edades[i],nombreEdadBaja=nombres[i];
        promedio+=edades[i];

    }
    alert('menores:'+menores+',   adultos:'+mayores+',   adultos mayores:'+adultoMayor+'    vector:'+edades);
    alert('Edad mas alta:'+edadMasAlta+'-'+nombreEdadAlta+',   Edad mas baja:'+edadMasBaja+'-'+nombreEdadBaja+'  Promedio '+promedio/(edades.length));
    repetir2=false;

    
    }while(repetir2);






    do{
        var repetir=true;
        var edad=prompt('ingrese la edad sin letras o puntos y en un rango entre 1 y 120 años:');
        if(edad.search(/\D/gmi)==-1 ){ 
            edad=parseInt(edad);
            if(0<edad && edad<121)repetir=false;
        }else{
            alert('A ingresado datos erroneos, por favor lea correctamente');
        }
        }while(repetir);




        do{
            var repetir=true;
            var baseT=prompt('ingrese la medida de la base:');
            var alturaT=prompt('ingrese la medida de la altura:');
            var resultadoArea=0;
            var resultadoPerimetro=0;
            
            if(baseT.search(/\D/gmi)==-1 && alturaT.search(/\D/gmi)==-1){ 
                baseT=parseInt(baseT);
                alturaT=parseInt(alturaT);
                resultadoArea=(baseT*alturaT)/2
            
                alert('El area del triangulo seria: '+resultadoArea);
                repetir=false;
            }else{
                alert('Ingrese solo numeros no letras o puntos');
            }
            
            }while(repetir);






            do{
                var repetir2=true;
                var edades=[0];

                for(let i=0; i<5; i++){
                    do{
                        var repetir=true;
                        var edad=prompt('Ingrese un numero mayor que: '+edades[i]);
                        if(edad.search(/\D/gmi)==-1 ){ 
                            edad=parseInt(edad);
                            if(edades[i]<edad){
                                edades.push(edad);
                                repetir=false;
                            }
                        }else{
                            alert('A ingresado datos erroneos, por favor ingrese solo numeros sin letras o puntos');
                        }
                        }while(repetir);
                }
                // for(let i=0; i<edades.length; i++){
                //     edades[i]<18? menores+=1:
                //     edades[i]>17 && edades[i]<60 ? mayores+=1:
                //     edades[i]>59?adultoMayor+=1:"fin";
                //     if(edades[i]>edadMasAlta)edadMasAlta=edades[i],nombreEdadAlta=nombres[i];
                //     if(edades[i]<edadMasBaja)edadMasBaja=edades[i],nombreEdadBaja=nombres[i];
                //     promedio+=edades[i];
            
                // }
                alert('   vector:'+edades);
                repetir2=false;
            
                
                }while(repetir2);