//Función fecha en texto para convertirlo en numeros



// Ingles

    var posted = elem.querySelector("div.card-job__title__posted-at").textContent.trim();
    job.dateposted_raw = dateAgo(posted," ", 1, 2)

    /**
 * [dateAgo Funcion para convertir texto a fechas]
 * @param  {[String]} text                  [Valor en texto extraido]
 * @param  {[String]} char_separator        [Caracter separador] El  que separa cada palabra puede ser espacio, guion, /, etc.
 * @param  {[Number]} position_value_DWMY   [Posición donde esta el valor en numero]
 * @param  {[Number]} position_word_DWMY    [Posición donde esta el valor o Days o Weeks etc]
 * @return {[String]}                       [Retorna un valor en string pero con formato de fecha]
 */
function dateAgo (text, char_separator, position_value_DWMY, position_word_DWMY){
    var numberDWMY = parseInt(text.trim().split(char_separator)[position_value_DWMY],10); //obtengo el valor numerico del dia, sem, mes o año
    if(typeof text.split(char_separator)[position_word_DWMY]!=='undefined'){
    var dayWeekMonthYear = text.split(char_separator)[position_word_DWMY]
    }else{ var dayWeekMonthYear = text.split(char_separator)[text.split(char_separator).length - 1]};
    var date_Now = new Date();  //declaro un objeto tipo fecha
    var nDays = 0;
        if (dayWeekMonthYear.toUpperCase().search(/TODAY|HOUR/g)>-1){nDays = 0;}
        if (dayWeekMonthYear.toUpperCase().indexOf('YESTERDAY')>-1) {nDays = 1;}
        if (dayWeekMonthYear.toUpperCase().indexOf('DAYS')>-1){nDays = numberDWMY;}
        if (dayWeekMonthYear.toUpperCase().indexOf('WEEK')>-1){nDays = numberDWMY * 7;}
        if (dayWeekMonthYear.toUpperCase().indexOf('MONTH')>-1){nDays = numberDWMY * 30;}
        if (dayWeekMonthYear.toUpperCase().indexOf('YEAR')>-1){nDays = numberDWMY * 365;}
        var dateJob    = date_Now.getDate() - nDays;     //resto dias de publicacion a la fecha actual
        var get_date   = date_Now.setDate(dateJob);      //obtengo la cantidad de mseg. desde 1 de Enero de 1970
        var datePosted = new Date(get_date);             //obtengo la fecha de publicacion.
          //Obtengo dia mes y Año
        var dd    = datePosted.getDate();                //devuelve el numero del dia del mes.
        var mm    = datePosted.getMonth()+1;             //getMonth devuelve valores de 0 a 11, se suma uno para llevarlo de 1 a 12.
        var yyyy  = datePosted.getFullYear().toString(); //devuelve el año.
        if (dd < 10){dd ='0'+dd;}
        if (mm<10){mm ='0'+ mm;}
        dateJob= mm +'/'+dd+'/'+yyyy;
    return dateJob;
}




//Frances

var posted = elem.querySelector("div.card-job__title__posted-at").textContent.trim();
    
    job.dateposted_raw = dateAgo(posted," ",4,5)
    /**
 	* [dateAgo Funcion para convertir texto a fechas]
 	* @param  {[String]} text                  [Valor en texto extraido]
 	* @param  {[String]} char_separator        [Caracter separador] El  que separa cada palabra puede ser espacio, guion, /, etc.
 	* @param  {[Number]} position_value_DWMY   [Posición donde esta el valor en numero]
	 * @param  {[Number]} position_word_DWMY    [Posición donde esta el valor o Days o Weeks etc]
 	* @return {[String]}                       [Retorna un valor en string pero con formato de fecha]
 	*/
    function dateAgo (text, char_separator, position_value_DWMY, position_word_DWMY){
      var numberDWMY = parseInt(text.trim().split(char_separator)[position_value_DWMY],10); //obtengo el valor numerico del dia, sem, mes o año
      if(typeof text.split(char_separator)[position_word_DWMY]!=='undefined'){
        var dayWeekMonthYear = text.split(char_separator)[position_word_DWMY]
        }else{ var dayWeekMonthYear = text.split(char_separator)[text.split(char_separator).length - 1]};
      var date_Now = new Date();  //declaro un objeto tipo fecha
      var nDays = 0;
      if (dayWeekMonthYear.toUpperCase().search(/AUJOURD'HUI|HEURES/g)>-1){nDays = 0;}
      if (dayWeekMonthYear.toUpperCase().indexOf('HIER')>-1) {nDays = 1;}
      if (dayWeekMonthYear.toUpperCase().indexOf('JOURS')>-1){nDays = numberDWMY;}
      if (dayWeekMonthYear.toUpperCase().indexOf('SAMEDI')>-1){nDays = numberDWMY * 7;}
      if (dayWeekMonthYear.toUpperCase().indexOf('MOIS')>-1){nDays = numberDWMY * 30;}
      if (dayWeekMonthYear.toUpperCase().indexOf('ANS')>-1){nDays = numberDWMY * 365;}
      var dateJob    = date_Now.getDate() - nDays;     //resto dias de publicacion a la fecha actual
      var get_date   = date_Now.setDate(dateJob);      //obtengo la cantidad de mseg. desde 1 de Enero de 1970
      var datePosted = new Date(get_date);             //obtengo la fecha de publicacion.
      //Obtengo dia mes y Año
      var dd    = datePosted.getDate();                //devuelve el numero del dia del mes.
      var mm    = datePosted.getMonth()+1;             //getMonth devuelve valores de 0 a 11, se suma uno para llevarlo de 1 a 12.
      var yyyy  = datePosted.getFullYear().toString(); //devuelve el año.
      if (dd < 10){dd ='0'+dd;}
      if (mm<10){mm ='0'+ mm;}
      dateJob= mm +'/'+dd+'/'+yyyy;
      return dateJob;
    }



    //Italiano


    function dateAgo (text, char_separator, position_value_DWMY, position_word_DWMY){  
      var numberDWMY = parseInt(text.trim().split(char_separator)[position_value_DWMY],10); //obtengo el valor numerico del dia, sem, mes o año
      if(typeof text.split(char_separator)[position_word_DWMY]!=='undefined'){
        var dayWeekMonthYear = text.split(char_separator)[position_word_DWMY]
        }else{ var dayWeekMonthYear = text.split(char_separator)[text.split(char_separator).length - 1]};
      var date_Now = new Date();  //declaro un objeto tipo fecha
      var nDays = 0;
      if (dayWeekMonthYear.toUpperCase().search(/OGGI|ORA/g)>-1){nDays = 0;}
      if (dayWeekMonthYear.toUpperCase().indexOf('IERI')>-1) {nDays = 1;}
      if (dayWeekMonthYear.toUpperCase().indexOf('GIORNI')>-1){nDays = numberDWMY;}
      if (dayWeekMonthYear.toUpperCase().indexOf('SETTIMANA')>-1){nDays = numberDWMY * 7;}
      if (dayWeekMonthYear.toUpperCase().indexOf('MESE')>-1){nDays = numberDWMY * 30;}
      if (dayWeekMonthYear.toUpperCase().indexOf('MESI')>-1){nDays = numberDWMY * 30;}
      if (dayWeekMonthYear.toUpperCase().indexOf('ANNO')>-1){nDays = numberDWMY * 365;}
      if (dayWeekMonthYear.toUpperCase().indexOf('ANNI')>-1){nDays = numberDWMY * 365;}
      var dateJob    = date_Now.getDate() - nDays;     //resto dias de publicacion a la fecha actual
      var get_date   = date_Now.setDate(dateJob);      //obtengo la cantidad de mseg. desde 1 de Enero de 1970
      var datePosted = new Date(get_date);             //obtengo la fecha de publicacion.
      //Obtengo dia mes y Año
      var dd    = datePosted.getDate();                //devuelve el numero del dia del mes.
      var mm    = datePosted.getMonth()+1;             //getMonth devuelve valores de 0 a 11, se suma uno para llevarlo de 1 a 12.
      var yyyy  = datePosted.getFullYear().toString(); //devuelve el año.
      if (dd < 10){dd ='0'+dd;}  
      if (mm<10){mm ='0'+ mm;}  
      dateJob= mm +'/'+dd+'/'+yyyy;
      return dateJob;
    }







 * [getDateFormat Funcion para convertir el formato de fecha July 12, 2020]
 * @param  {[String]} text                  [Valor en texto extraido]
 * @param  {[String]} cut        			[Caracter separador]
 * @param  {[Number]} dayPosition   		[Posición donde esta el dia valor en numero]
 * @param  {[Number]} monthPosition    		[Posición donde esta el valor del mes]
 * @param  {[Number]} yearPosition    		[Posición donde esta el valor del año]
 * @return {[String]}                       [Retorna un valor en string pero con formato de fecha]
 */
function getDateFormat(dateRaw, cut, dayPosition, monthPosition, yearPosition) {
  dateRaw = dateRaw.replace(/\,/g,"").trim();

  let day   =  dateRaw.split(cut)[dayPosition].trim(), 
      month =  dateRaw.split(cut)[monthPosition].trim(), 
      year  = dateRaw.split(cut)[yearPosition].trim();
  // if(day < 10 && day.length < 2){day = "0" + day;} 

  if(dateRaw.search(/[a-z]/gi)>-1){ 
    if(month.search(/jan/i)>-1){month = "01";}
    if(month.search(/feb|fév/i)>-1){month = "02";}
    if(month.search(/mar/i)>-1){month = "03";}
    if(month.search(/apr|avr/i)>-1){month = "04";}
    if(month.search(/may|mai/i)>-1){month = "05";}
    if(month.search(/jun|juin/i)>-1){month = "06";}
    if(month.search(/jul|juil/i)>-1){month = "07";}
    if(month.search(/aug|août/i)>-1){month = "08";}
    if(month.search(/sep/i)>-1){month = "09";}
    if(month.search(/oct/i)>-1){month = "10";}
    if(month.search(/nov/i)>-1){month = "11";}
    if(month.search(/dec|déc/i)>-1){month = "12";}
  }
  var datum = month +"/"+  day +"/"+ year;
  return datum;
}

// Funcion creada por sara//

var fecha = elem.querySelector("header > div > div > div > div.col-md-3.col-sm-4.col-xs-12");
if(fecha){
fecha = fecha.textContent.split("Posted").pop().trim();
job.dateposted_raw = dateAgo(fecha," ",0,1);
}

/* continua funcion*/

function dateAgo(text, char_separator, position_value_DWMY, position_word_DWMY){  
  var numberDWMY = parseInt(text.trim().split(char_separator)[position_value_DWMY],10); //obtengo el valor numerico del dia, sem, mes o año
  if(typeof text.split(char_separator)[position_word_DWMY]!=='undefined'){
    var dayWeekMonthYear = text.split(char_separator)[position_word_DWMY]
    }else{ var dayWeekMonthYear = text.split(char_separator)[text.split(char_separator).length - 1]};
  var date_Now = new Date();  //declaro un objeto tipo fecha
  var nDays = 0;

  let date = new Date();
  let num;
  let yearAux;

  const esBisiesto = (year) => {
    return (year % 400 === 0) ? true : 
                (year % 100 === 0) ? false : 
                    year % 4 === 0;
  };

switch (date.getMonth()) {
case 0:
    num = 31;
break;
case 1:
    if(esBisiesto(date.getFullYear())){
        num = 29;
        yearAux = 366;
    }else{
        num = 28;
        yearAux = 365;
    }
  break;
case 2:
    num = 31;
  break;
      case 3:
        num = 30;
 break;
      case 4:
  num = 31;
  break;
      case 5:
        num = 30;
  break;
      case 6:
        num = 31;
  break;
      case 7:
        num = 31;
  break;
      case 8:
        num = 30;
  break;
      case 9:
        num = 31;
  break;
      case 10:
        num = 30;
  break;
      case 11:
        num = 31;
  break;
default:
  break;
}


  if (dayWeekMonthYear.toUpperCase().search(/TODAY|HOUR|HORAS|NOW|VANDAAG|UUR/g)>-1){nDays = 0;}
  if (dayWeekMonthYear.toUpperCase().search(/YESTERDAY|AYER|GISTEREN/)>-1) {nDays = 1;}
  if (dayWeekMonthYear.toUpperCase().search(/DAYS|DIAS|DAGEN|DAY|DIA|DAG/)>-1){nDays = numberDWMY;}
  if (dayWeekMonthYear.toUpperCase().search(/WEEKS|SEMANAS|WEKEN|WEEK|SEMANA/)>-1){nDays = numberDWMY * 7;}
  if (dayWeekMonthYear.toUpperCase().search(/MONTH|MESES|MAANDEN|MAAD|MES|MONTHS/)>-1){nDays = numberDWMY * num;}
  if (dayWeekMonthYear.toUpperCase().search(/YEAR|AÑOS|JAAR|AÑO|YEARS/)>-1){nDays = numberDWMY * yearAux;}
  var dateJob    = date_Now.getDate() - nDays;     //resto dias de publicacion a la fecha actual
  var get_date   = date_Now.setDate(dateJob);      //obtengo la cantidad de mseg. desde 1 de Enero de 1970
  var datePosted = new Date(get_date);             //obtengo la fecha de publicacion.
  //Obtengo dia mes y año
  var dd    = datePosted.getDate();                //devuelve el numero del dia del mes.
  var mm    = datePosted.getMonth()+1;             //getMonth devuelve valores de 0 a 11, se suma uno para llevarlo de 1 a 12.
  var yyyy  = datePosted.getFullYear().toString(); //devuelve el año.
  if (dd < 10){dd ='0'+dd;} // dd<10?'0'+dd:dd;
  if (mm<10){mm ='0'+ mm;} //mm<10?'0'+mm:mm;  
  dateJob= mm +'/'+dd+'/'+yyyy;
  return dateJob;
}

///****************************************************/* */
//Segunda funcion//
/*********************************************************** */


/**
*This function takes the text of a publication date described as: "n days ago" or "n months ago" and returns the publication date in M/D/Y format.
*@param {string} date_text: text to evaluate.
*@param {String} separator: char between the words (-/,_)
*@param {boolean} is_dateposted: if true the function returns a dateposted else the function returns a dateclosed
*@return {string} dateposted_formated: date in format M/D/Y.
*/
function getDateFromText(date_text, separator, is_dateposted) { // haace-5-meses
  const current_data = new Date();
  const current_year = current_data.getFullYear();
  const current_month = current_data.getMonth(); //4
  const days_of_the_months = [31,28,31,30,31,30,31,31,30,31,30,31];
  let leap_year = false;
  if(((current_year % 4 == 0) && (current_year % 100 != 0 )) || (current_year % 400 == 0)){
     days_of_the_months[1] = 29; //is a leap year
     leap_year = true;
  }
  const datetext_aaray = date_text.split(separator);
  let numer_in_datetext = 0;
  let days_conter = 0;
  datetext_aaray.forEach(word => {
    if (word.match(/\d+/)) numer_in_datetext = parseInt(word);
    if (word.match(/Today|Now|Hours?|minutes?|Hoy|Ahora|Horas?|minutos?|hui|Heures/i)) days_conter = 0;
    else if (word.match(/Yesterday|Ayer|Hier/i)) days_conter = 1;
    else if (word.match(/Days?|Días|JOURS?/i)) days_conter = numer_in_datetext;
    else if (word.match(/Weeks?|Semanas?|SEMAINE/i)) days_conter = numer_in_datetext * 7;
    else if (word.match(/Months?|Mes|Meses|MOIS/i)){ 
      const n = days_of_the_months.length;
      let index_months = (current_month - numer_in_datetext >= 0) ? current_month - numer_in_datetext : 12 - Math.abs(current_month - numer_in_datetext);
      for(j = 0; j< numer_in_datetext; j++){
        days_conter += days_of_the_months[(index_months % n + n) % n]; //Accessing the month array circularly
        index_months+=1;
      }
    }
    else if (word.match(/Years?|Años?/i)){
      if(leap_year )  days_conter = numer_in_datetext * 366;
      else days_conter = numer_in_datetext * 365;
    } 
    if (days_conter != 0) return;
  });
  //days of the current month + - days to close the job
  let total_days = current_data.getDate();
  if(is_dateposted) total_days-= days_conter;
  else total_days+= days_conter;
  const mls_to_get_dateclosed = current_data.setDate(total_days);//amount of mlg from Jan 1, 1970 to (current date - posted date)
  const dateclosed = new Date(mls_to_get_dateclosed);//posted date
  const dateclosed_formated = (dateclosed.getMonth() + 1) + "/" + dateclosed.getDate() + "/" + dateclosed.getFullYear();//posted date in M/D/Y format 
  return dateclosed_formated;
}