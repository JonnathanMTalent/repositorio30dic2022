//test en concola si la pagina bloquea el jquery

var jq = document.createElement('script');

jq.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js";

document.getElementsByTagName('head')[0].appendChild(jq);

// ... give time for script to load, then type (or see below for non wait option)

jQuery.noConflict();



///