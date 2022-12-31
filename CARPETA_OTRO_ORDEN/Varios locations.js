//Job location en el jobdata


if (document.querySelector('')){
    job.location = document.querySelector('').textContent.trim();
    job.location = job.location.replace("","").trim();
}


job.location = $("p#fldlocation_location_geographicalareacollection").text().trim().split("(")[0].replace("Europe, ","").trim().split(",").reverse().join(", ");


//Cuando la locación esta vacia


if(job.location.length < 2) { job.location = "GB"; }


if(job.location.search(/Locations/g)>-1) job.location = 'Santa Clara, CA, US';

if(job.location.indexOf("Clayton")>-1){ job.location = "Clayton, Melbourne, AU"; }

if(!job.location) { job.location = "Bladel, Noord-Brabant, NL"; }

job.location = job.location.split(', ').slice(0, 3).join(", ").trim(); //los numeros estan en la posición 3


//Para limpiar numeros y contenido en parentesis

job.location = job.location.replace(/\(.*?\)/g, '').replace(/\[.*?\]/g, '').replace(/\<.*?\>/g, '').replace(/[0-9]/g,'').trim();

job.location = job.location.replace(/1|2|3|4|5|6|7|8|9|0/gi, "");



//Usando constantes y filtros

for(const a of document.querySelectorAll('div')) {
    if (a.textContent.includes('Location')) {
      job.location = a.textContent.trim().replace("Location",'');
    }
}

for(const a of document.querySelectorAll('div')) {
    if (a.textContent.search('Location') > -1) {
      job.location = a.textContent.split('\n').filter(elem => elem.indexOf('Location') > -1)[0].split(":").pop().trim();
      a.remove();
    }
}



//Para voltear la locación

job.location = job.location.split("-").reverse().join(", ");

//Para buscar elemento padre o siguiente elemento

job.location = elem.parentNode.parentNode.nextElementSibling.textContent.trim();



//Locaciones Australia


job.location = job.location.replace("NSW","New South Wales").trim();
job.location = job.location.replace("VIC","Victoria").trim();
job.location = job.location.replace("NT","Northern Territory").trim();
job.location = job.location.replace("WA","Western Australia").trim();
job.location = job.location.replace("SA","South Australia").trim();
job.location = job.location.replace("QA","Queensland").trim();



//Localidades de francia

job.location = job.location.replace("77", "Seine-et-Marne"); 
job.location = job.location.replace("78", "Yvelines");
job.location = job.location.replace("75", "Paris");
job.location = job.location.replace("12", "Aveyron");
job.location = job.location.replace("89", "Yonne");
job.location = job.location.replace("93", "Seine-Saint-Denis");
job.location = job.location.replace("95", "Val-d'Oise");
job.location = job.location.replace("52", "Haute-Marne");
job.location = job.location.replace("70", "Haute-Saône"); 
job.location = job.location.replace("69", "Rhône");
job.location = job.location.replace("54", "Meurthe-et-Moselle"); 
job.location = job.location.replace("30", "Gard");
job.location = job.location.replace("31", "Haute-Garonne");
job.location = job.location.replace("45", "Loiret");
job.location = job.location.replace("08", "Ardennes");
job.location = job.location.replace("51", "Marne");
job.location = job.location.replace("10", "Aube"); 
job.location = job.location.replace("91", "Essonne");
job.location = job.location.replace("92", "Hauts-de-Seine");
job.location = job.location.replace("01", "Ain");
job.location = job.location.replace("85", "Vendée");
job.location = job.location.replace("58", "Nièvre");
job.location = job.location.replace("55", "Meuse"); 
job.location = job.location.replace("57", "Moselle");
job.location = job.location.replace("38", "Isère");
job.location = job.location.replace("79", "Deux-Sèvres");
job.location = job.location.replace("35", "Ille-et-Vilaine");
job.location = job.location.replace("73", "Savoie");
job.location = job.location.replace("13", "Bouches-du-Rhône");
job.location = job.location.replace("44", "Lot");
job.location = job.location.replace("72", "Seine-et-Oise");
job.location = job.location.replace("17", "Cher");
job.location = job.location.replace("37", "Isère");
job.location = job.location.replace("49", "Marne");
job.location = job.location.replace("61", "Pas-de-Calais");
job.location = job.location.replace("86", "");
job.location = job.location.replace("16", "Charente-Inférieure"); 
job.location = job.location.replace("23", "Dordogne");
job.location = job.location.replace("36", "Indre-et-Loire");
job.location = job.location.replace("86", "Vienne");
job.location = job.location.replace("87", "Haute-Vienne");
job.location = job.location.replace("81", "Haute-Vienne");
job.location = job.location.replace("14", "Cantal");
job.location = job.location.replace("25", "Drôme");
job.location = job.location.replace("06", "Ardèche");
job.location = job.location.replace("971","Guadeloupe");
job.location = job.location.replace("972","Martinique");
job.location = job.location.replace("973","Guyane");
job.location = job.location.replace("974","La Réunion");
job.location = job.location.replace("01","Ain, FR");
job.location = job.location.replace("02","Aisne, FR");
job.location = job.location.replace("03","Allier, FR");
job.location = job.location.replace("04","Alpes-de-Haute-Provence, FR");
job.location = job.location.replace("05","Hautes-Alpes, FR");
job.location = job.location.replace("06","Alpes-Maritimes, FR");
job.location = job.location.replace("07","Ardèche, FR");
job.location = job.location.replace("08","Ardennes, FR");
job.location = job.location.replace("09","Ariège, FR");
job.location = job.location.replace("10","Aube, FR");
job.location = job.location.replace("11","Aude, FR");
job.location = job.location.replace("12","Aveyron, FR");
job.location = job.location.replace("13","Bouches-du-Rhône, FR");
job.location = job.location.replace("14","Calvados, FR");
job.location = job.location.replace("15","Cantal, FR");
job.location = job.location.replace("16","Charente, FR"); 
job.location = job.location.replace("17","Charente-Maritime, FR"); 
job.location = job.location.replace("18","Cher, FR");
job.location = job.location.replace("19","Corrèze, FR");
job.location = job.location.replace("21","Côte-d’Or, FR"); 
job.location = job.location.replace("22","Côtes-d’Armor, FR"); 
job.location = job.location.replace("23","Creuse, FR");
job.location = job.location.replace("24","Dordogne, FR");
job.location = job.location.replace("25","Doubs, FR");
job.location = job.location.replace("26","Drôme, FR"); 
job.location = job.location.replace("27","Eure, FR"); 
job.location = job.location.replace("28","Eure-et-Loir, FR"); 
job.location = job.location.replace("29","Finistère, FR"); 
job.location = job.location.replace("30","Gard, FR");
job.location = job.location.replace("31","Haute-Garonne, FR");  
job.location = job.location.replace("32","Gers, FR");
job.location = job.location.replace("33","Gironde, FR");
job.location = job.location.replace("34","Hérault, FR"); 
job.location = job.location.replace("35","Ille-et-Vilaine, FR");
job.location = job.location.replace("36","Indre, FR");
job.location = job.location.replace("37","Indre-et-Loire, FR"); 
job.location = job.location.replace("38","Isère, FR");
job.location = job.location.replace("39","Jura, FR"); 
job.location = job.location.replace("40","Landes, FR");
job.location = job.location.replace("41","Loir-et-Cher, FR");
job.location = job.location.replace("42","Loire, FR");
job.location = job.location.replace("43","Haute-Loire, FR");
job.location = job.location.replace("44","Loire-Atlantique, FR");
job.location = job.location.replace("45","Loiret, FR");
job.location = job.location.replace("46","Lot, FR");
job.location = job.location.replace("47","Lot-et-Garonne, FR");
job.location = job.location.replace("48","Lozère, FR");
job.location = job.location.replace("49","Maine-et-Loire, FR");
job.location = job.location.replace("50","Manche, FR");
job.location = job.location.replace("51","Marne, FR");
job.location = job.location.replace("52","Haute-Marne, FR");
job.location = job.location.replace("53","Mayenne, FR");
job.location = job.location.replace("54","Meurthe-et-Moselle, FR");
job.location = job.location.replace("55","Meuse, FR");
job.location = job.location.replace("56","Morbihan, FR");
job.location = job.location.replace("57","Moselle, FR");
job.location = job.location.replace("58","Nièvre, FR");
job.location = job.location.replace("59","Nord, FR");
job.location = job.location.replace("60","Oise, FR");
job.location = job.location.replace("61","Orne, FR");
job.location = job.location.replace("62","Pas-de-Calais, FR");
job.location = job.location.replace("63","Puy-de-Dôme, FR");
job.location = job.location.replace("64","Pyrénées-Atlantiques, FR");
job.location = job.location.replace("65","Hautes-Pyrénées, FR");
job.location = job.location.replace("66","Pyrénées-Orientales, FR");
job.location = job.location.replace("67","Bas-Rhin, FR");
job.location = job.location.replace("68","Haut-Rhin, FR");
job.location = job.location.replace("69","Rhône, FR");
job.location = job.location.replace("70","Haute-Saône, FR");
job.location = job.location.replace("71","Saône-et-Loire, FR");
job.location = job.location.replace("72","Sarthe, FR");
job.location = job.location.replace("73","Savoie, FR");
job.location = job.location.replace("74","Haute-Savoie, FR");
job.location = job.location.replace("75","Paris, FR");
job.location = job.location.replace("76","Seine-Maritime, FR");
job.location = job.location.replace("77","Seine-et-Marne, FR");
job.location = job.location.replace("78","Yvelines, FR");
job.location = job.location.replace("79","Deux-Sèvres, FR");
job.location = job.location.replace("80","Somme, FR");
job.location = job.location.replace("81","Tarn, FR");
job.location = job.location.replace("82","Tarn-et-Garonne, FR");
job.location = job.location.replace("83","Var, FR");
job.location = job.location.replace("84","Vaucluse, FR");
job.location = job.location.replace("85","Vendée, FR");
job.location = job.location.replace("86","Vienne, FR");
job.location = job.location.replace("87","Haute-Vienne, FR");
job.location = job.location.replace("88","Vosges, FR");
job.location = job.location.replace("89","Yonne, FR");
job.location = job.location.replace("90","Territoire de Belfort, FR");
job.location = job.location.replace("91","Essonne, FR");
job.location = job.location.replace("92","Hauts-de-Seine, FR");
job.location = job.location.replace("93","Seine-Saint-Denis, FR");
job.location = job.location.replace("94","Val-de-Marne, FR");
job.location = job.location.replace("95","Val-d’Oise, FR");
