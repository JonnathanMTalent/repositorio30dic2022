//cuando hay que limpiar varias veces
var datePosted= div.querySelector('#job-date').textContent.split(':').pop().trim().replace(',','');
datePosted= datePosted.replace(/-/g, ' '); 
job.dateposted_raw = getDateFormat(datePosted," ",1,0,2);


//cuando hay varios formatos de fecha
var datePosted= div.querySelector('#job-date').textContent.split(':').pop().trim().replace(',','');
if (datePosted.indexOf('-') > -1) {  
    datePosted= datePosted.replace(/-/g, ' ');  
    job.dateposted_raw = getDateFormat(datePosted," ",0,1,2);
}else{
    job.dateposted_raw = getDateFormat(datePosted," ",1,0,2);
}





//avajo de la funcion autoejecutable:
function getDateFormat(dateRaw, cut, dayPosition, monthPosition, yearPosition) {
    dateRaw = dateRaw.replace(/\,/g,"").replace(/st|th|nd|rd/gi,'').trim();
       
     let day   =  dateRaw.split(cut)[dayPosition].trim(), 
         month =  dateRaw.split(cut)[monthPosition].trim(), 
         year  = dateRaw.split(cut)[yearPosition].trim();

       if (day < 10 && day.length < 2) {day = "0" + day;}

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
         if(month.search(/dec/i)>-1){month = "12";}
       }

    if (year < 100 && year.length < 3) {year = "20" + year;}
       
var datum = month +"/"+  day +"/"+ year;
    
    return datum;
}

//**************************************************************************************** */
//**************************************************************************************** */
//**************************************************************************************** */

// DATEFORMAT DE DANIEL, TIENE FILTROS QUE LIMPIAN LA FECHA PARE EVITAR ERRORES


function getDateFormat(dateRaw, cut, dayPosition, monthPosition, yearPosition) {
    if(dateRaw.indexOf(",")>-1){     
    dateRaw = dateRaw.replace(/\,/g,"");
    }
    if(dateRaw.indexOf(".")>-1){
       var periods = dateRaw.match(/\./g).length;
       if(periods == 1){dateRaw = dateRaw.replace(/\./g,"").trim();}
    }

     let day   = dateRaw.split(cut)[dayPosition].trim(), 
         month = dateRaw.split(cut)[monthPosition].trim(), 
         year  = dateRaw.split(cut)[yearPosition].trim();

         day = day.replace(/nd|rd|st|th/gi,"").trim();    
      if(day < 10 && day.length < 2){day = "0" + day;}
      if(year.length == 2){year = "20" + year;}
 
     if(dateRaw.search(/[a-z]/gi)>-1){ 
        //English, Dutch, French
         if(month.search(/jan/i)>-1){month = "01";}
         if(month.search(/feb|fév/i)>-1){month = "02";}
         if(month.search(/mar|maar/i)>-1){month = "03";}
         if(month.search(/apr|avr/i)>-1){month = "04";}
         if(month.search(/may|mai|mei/i)>-1){month = "05";}
         if(month.search(/jun|juin/i)>-1){month = "06";}
         if(month.search(/jul|juil/i)>-1){month = "07";}
         if(month.search(/aug|août/i)>-1){month = "08";}
         if(month.search(/sep/i)>-1){month = "09";}
         if(month.search(/oct|okt/i)>-1){month = "10";}
         if(month.search(/nov/i)>-1){month = "11";}
         if(month.search(/dec|déc/i)>-1){month = "12";}
     }
var datum = month +"/"+  day +"/"+ year;
 return datum;
}














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
      else if (word.match(/Yesterday|Ayer|Hier/i)) days_conter = 1,  console.log('yesterday in text = ' + numer_in_datetext);
      else if (word.match(/Days?|Días|JOURS?/i)) days_conter = numer_in_datetext,  console.log('days in text = ' + numer_in_datetext);
      else if (word.match(/Weeks?|Semanas?|SEMAINE/i)) days_conter = numer_in_datetext * 7,  console.log('weeks in text = ' + numer_in_datetext);
      else if (word.match(/Months?|Mes|Meses|MOIS/i)){ 
        console.log('months in text = ' + numer_in_datetext);
        const n = days_of_the_months.length;
        let index_months = (current_month - numer_in_datetext >= 0) ? current_month - numer_in_datetext : 12 - Math.abs(current_month - numer_in_datetext);
        for(j = 0; j< numer_in_datetext; j++){
          days_conter += days_of_the_months[(index_months % n + n) % n]; //Accessing the month array circularly
          index_months+=1;
        }
      }
      else if (word.match(/Years?|Años?/i)){
        console.log('years in text = ' + numer_in_datetext);
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
  