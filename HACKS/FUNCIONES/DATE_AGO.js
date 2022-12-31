/**
*This function takes the text of a date described as: "n days ago" or "in n months" and returns the date in M/D/Y format.
*@param {string} date_text: text to evaluate.
*@param {String} separator: char between the words (-/,_)
*@param {boolean} is_dateposted: if true the function returns a dateposted else the function returns a dateclosed
*@return {string} dateposted_formated: date in format M/D/Y.
*/
function getDateFromText(date_text, separator, is_dateposted) { 
    const current_data = new Date();
    const current_year = current_data.getFullYear();
    const current_month = current_data.getMonth(); //4
    const days_of_the_months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let leap_year = false;
    if (((current_year % 4 == 0) && (current_year % 100 != 0)) || (current_year % 400 == 0)) {
        days_of_the_months[1] = 29; //is a leap year
        leap_year = true;
    }
    const datetext_aaray = date_text.split(separator);
    let numer_in_datetext = 0;
    let days_conter = 0;
    datetext_aaray.forEach(word => {
        if (word.match(/\d+/)) numer_in_datetext = parseInt(word);
        if (word.match(/Today|Now|Hours?|minutes?|Hoy|Ahora|Horas?|minutos|aujourd'hui|maintenant|heures?/i)) days_conter = 0;
        else if (word.match(/Yesterday|Ayer|Hier/i)) days_conter = 1;
        else if (word.match(/Days?|Días?|jours?/i)) days_conter = numer_in_datetext;
        else if (word.match(/Weeks?|Semanas|semaines?/i)) days_conter = numer_in_datetext * 7;
        else if (word.match(/Months?|Mes(es)?|mois/i)) {
            const n = days_of_the_months.length;
            let index_months;
            if (is_dateposted) index_months = (current_month - numer_in_datetext >= 0) ? current_month - numer_in_datetext : 12 - Math.abs(current_month - numer_in_datetext); //to dateposted
            else index_months = current_month; //to dateclosed
            for (j = 0; j < numer_in_datetext; j++) {
                days_conter += days_of_the_months[(index_months % n + n) % n]; //Accessing the month array circularly
                index_months += 1;
            }
        } else if (word.match(/Years?|Años?|années?/i)) {
            if (leap_year) days_conter = numer_in_datetext * 366;
            else days_conter = numer_in_datetext * 365;
        }
        if (days_conter != 0) return;
    });
    //days of the current month + - days to close the job
    let total_days = current_data.getDate();
    if (is_dateposted) total_days -= days_conter;
    else total_days += days_conter;
    const mls_to_get_dateclosed = current_data.setDate(total_days); //amount of mlg from Jan 1, 1970 to (current date - posted date)
    const dateclosed = new Date(mls_to_get_dateclosed); //posted date
    let month = (dateclosed.getMonth() + 1) < 10 ? `0${(dateclosed.getMonth() + 1)}` : (dateclosed.getMonth() + 1);
    let day = (dateclosed.getDate()) < 10 ? `0${(dateclosed.getDate())}` : (dateclosed.getDate());
    const dateclosed_formated = `${month}/${day}/${dateclosed.getFullYear()}`; //posted date in M/D/Y format 
    return dateclosed_formated;
  }