//ejemplo de uso: job.dateposted_raw = dateAndrea(job.dateposted_raw, " ", 1, 0, 2, ",","",true);
/*
fecha: el texto que se toma de la fecha (anteriormente tomado de algún selector)
separador: con cual caracter está dividido dia, mes y año
day: posición en la que se encuentra el día en la fecha. por ejemplo para '9 septiembre 2019' la posición sería 0.
month: posición en la que se encuentra el mes en la fecha. por ejemplo para '9 septiembre 2019' la posición sería 1.
year: posición en la que se encuentra el año en la fecha. por ejemplo para '9 septiembre 2019' la posición sería 2.
eliminar: text que se desea eliminar en la fecha. Por ejemplo: Sep 9, 2019. Se puede especificar el caracter ","
idioma: actualmente acepta los valores "fr", "es", "it" y "de". Por defecto es "en".
flag3: indicar si el mes viene escrito completo o solo las tres primeras letras. Ejemplos: para '9 septiembre 2019' sería false y para Sep 9, 2019 sería true
*/


function dateAndrea(fecha, separador, day, month, year, eliminar, idioma, flag3) {
  var get_date1 = fecha.replace(eliminar,"");
  if(flag3 === true){
    switch(idioma) {
      case "fr":
        get_date1=get_date1.toLowerCase().replace("jan","01").replace("fév","02").replace("mar","03");
        get_date1=get_date1.toLowerCase().replace("avr","04").replace("mai","05").replace("jui","06");
        get_date1=get_date1.toLowerCase().replace("jui","07").replace("aoû","08").replace("sep","09");
        get_date1=get_date1.toLowerCase().replace("oct","10").replace("nov","11").replace("dec","12");
        break;
      case "it":
        get_date1=get_date1.toLowerCase().replace("gen","01").replace("feb","02").replace("mar","03");
        get_date1=get_date1.toLowerCase().replace("apr","04").replace("mag","05").replace("giu","06");
        get_date1=get_date1.toLowerCase().replace("lug","07").replace("ago","08").replace("set","09");
        get_date1=get_date1.toLowerCase().replace("ott","10").replace("nov","11").replace("dic","12");
        break;
      case "de":
        get_date1=get_date1.toLowerCase().replace("jan","01").replace("feb","02").replace("mär","03");
        get_date1=get_date1.toLowerCase().replace("apr","04").replace("mai","05").replace("jun","06");
        get_date1=get_date1.toLowerCase().replace("jul","07").replace("aug","08").replace("sep","09");
        get_date1=get_date1.toLowerCase().replace("okt","10").replace("nov","11").replace("dez","12");
        break;
      case "es":
        get_date1=get_date1.toLowerCase().replace("ene","01").replace("feb","02").replace("mar","03");
        get_date1=get_date1.toLowerCase().replace("abr","04").replace("may","05").replace("jun","06");
        get_date1=get_date1.toLowerCase().replace("jul","07").replace("ago","08").replace("sep","09");
        get_date1=get_date1.toLowerCase().replace("oct","10").replace("nov","11").replace("dic","12");
        break;
      case "pr":
        get_date1=get_date1.toLowerCase().replace("jan","01").replace("fev","02").replace("mar","03");
        get_date1=get_date1.toLowerCase().replace("abr","04").replace("maio","05").replace("jun","06");
        get_date1=get_date1.toLowerCase().replace("jul","07").replace("ago","08").replace("set","09");
        get_date1=get_date1.toLowerCase().replace("out","10").replace("nov","11").replace("dez","12");
        break;
      default:
        get_date1=get_date1.toLowerCase().replace("jan","01").replace("feb","02").replace("mar","03");
        get_date1=get_date1.toLowerCase().replace("apr","04").replace("may","05").replace("jun","06");
        get_date1=get_date1.toLowerCase().replace("jul","07").replace("aug","08").replace("sep","09");
        get_date1=get_date1.toLowerCase().replace("oct","10").replace("nov","11").replace("dec","12");

    }
  } else {
    switch(idioma) {
      case "fr":
        get_date1=get_date1.toLowerCase().replace("janvier","01").replace("février","02").replace("mars","03");
        get_date1=get_date1.toLowerCase().replace("avril","04").replace("mai","05").replace("juin","06");
        get_date1=get_date1.toLowerCase().replace("juillet","07").replace("août","08").replace("septembre","09");
        get_date1=get_date1.toLowerCase().replace("octobre","10").replace("novembre","11").replace("décembre","12");
        break;
      case "it":
        get_date1=get_date1.toLowerCase().replace("gennaio","01").replace("febbraio","02").replace("marzo","03");
        get_date1=get_date1.toLowerCase().replace("aprile","04").replace("maggio","05").replace("giugno","06");
        get_date1=get_date1.toLowerCase().replace("luglio","07").replace("agosto","08").replace("settembre","09");
        get_date1=get_date1.toLowerCase().replace("ottobre","10").replace("novembre","11").replace("dicembre","12");
        break;
      case "de":
        get_date1=get_date1.toLowerCase().replace("januar","01").replace("februar","02").replace("märz","03");
        get_date1=get_date1.toLowerCase().replace("april","04").replace("mai","05").replace("juni","06");
        get_date1=get_date1.toLowerCase().replace("juli","07").replace("august","08").replace("september","09");
        get_date1=get_date1.toLowerCase().replace("oktober","10").replace("november","11").replace("dezember","12");
        break;
      case "es":
        get_date1=get_date1.toLowerCase().replace("enero","01").replace("febrero","02").replace("marzo","03");
        get_date1=get_date1.toLowerCase().replace("abril","04").replace("mayo","05").replace("junio","06");
        get_date1=get_date1.toLowerCase().replace("julio","07").replace("agosto","08").replace("septiembre","09");
        get_date1=get_date1.toLowerCase().replace("octubre","10").replace("noviembre","11").replace("diciembre","12");
        break;
      case "pr":
        get_date1=get_date1.toLowerCase().replace("janeiro","01").replace("fevereiro","02").replace("março","03");
        get_date1=get_date1.toLowerCase().replace("abril","04").replace("maio","05").replace("junho","06");
        get_date1=get_date1.toLowerCase().replace("julho","07").replace("agosto","08").replace("setembro","09");
        get_date1=get_date1.toLowerCase().replace("outubro","10").replace("novembro","11").replace("dezembro","12");
        break;
      default:
        get_date1=get_date1.toLowerCase().replace("january","01").replace("february","02").replace("march","03");
        get_date1=get_date1.toLowerCase().replace("april","04").replace("may","05").replace("june","06");
        get_date1=get_date1.toLowerCase().replace("july","07").replace("august","08").replace("september","09");
        get_date1=get_date1.toLowerCase().replace("october","10").replace("november","11").replace("december","12");
    }
  }
  get_date1 = get_date1.split(separador)[month] + '/' + get_date1.split(separador)[day] + '/' +get_date1.split(separador)[year];
  return get_date1;
}



