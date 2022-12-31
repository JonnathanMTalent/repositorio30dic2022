//pagination

// METODO INLAN

// ACCIONES EN LA CONDICION DE PARADA L13
(function () {  //la paginacion va a validar si todavia tenemos jobs o no
    var out = {};
    out["pass_it"] = pass_it;
    if (out["pass_it"].cont < (out["pass_it"].totalJobs - 1)) { //si el valor de posiciones de job del contador es menor a la cantidad de jobs menos 1, ya que cont empieza de cero
      out["pass_it"].cont += 1; //aumenta 1 al contador ya que debe alcanzar a ser igual a al total , este ultimo que ya tiene todos los jobs desde el beforeextract
      out["has_next_page"] = true; //pasa al siguien job en la descripcion
    }
    //stop condition
    else {//si el valor del conteo es igual al total de jobs que se extrajeron no pasa mas de pagina
      out["has_next_page"] = false;
    }
    msg(out["pass_it"].cont); //muestra el valor del contador
    return out; //retorna el objeto out, con modificaciones en el contador .cont
  })();