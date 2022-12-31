(function () {
    var out = {};
    var next_page_selector = ".ramses";
    var clickable_elem = document.querySelector(next_page_selector); //Esto es un ejemplo de multilink paginado,
    if (typeof pass_it == "undefined") pass_it = {};                // no es basado en un Caso Real
    if (!pass_it["urls"]) {
        out["pass_it"] = {
            "urls": ["https://gruponexxees.gupy.io/"]                //Colocar las urls
        };
    } else {
        out["pass_it"] = pass_it;
    }
    //stop condition
    if (!clickable_elem) {
        if (out["pass_it"]["urls"].length > 0) {
          msg("Cambio de URL");
          var url = out["pass_it"].urls.shift();
          //msg(url);
          window.location.href = url;
          out["has_next_page"] = true;
        }
        else {
          msg("Fin de Paginación");
          out["has_next_page"] = false;
        }
    } else {
        msg("Cambio de Página");
        //go to next page
        clickable_elem.click();
        out["has_next_page"] = true;
    }
    out.waitFor = "tbody > tr";  // COLOCAR EL SELECTOR A ESPERAR
    return out;
})();