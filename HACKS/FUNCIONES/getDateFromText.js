// jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj /*

let dateposted_raw = getDateFromText((doc.querySelector("div.heading-text.el-text > div > p").textContent.trim())," ",true)
let day = dateposted_raw.split("/")[1];
let month = dateposted_raw.split("/")[0];
let year = dateposted_raw.split("/")[2];
if(month < 10){
    month = "0" + month;
}
if(day < 10){
    day = "0" + day;
}
job.dateposted_raw = month + "/" + day + "/" + year;
//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj









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
      else if (word.match(/Yesterday|Ayer|Hier|GISTEREN/i)) days_conter = 1;
      else if (word.match(/Days?|Días|DAG|JOURS?/i)) days_conter = numer_in_datetext;
      else if (word.match(/Weeks?|Semanas?|SEMAINE|WEKEN|WEEK/i)) days_conter = numer_in_datetext * 7;
      else if (word.match(/Months?|Mes|Meses|MOIS|MAANDEN|MAAD/i)){ 
        const n = days_of_the_months.length;
        let index_months = (current_month - numer_in_datetext >= 0) ? current_month - numer_in_datetext : 12 - Math.abs(current_month - numer_in_datetext);
        for(j = 0; j< numer_in_datetext; j++){
          days_conter += days_of_the_months[(index_months % n + n) % n]; //Accessing the month array circularly
          index_months+=1;
        }
      }