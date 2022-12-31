//fecha en Aleman // fecha, separador, lenguague , texto a remover
function date_to_change(date_text,  languages, separator, remove, day_position, month_position, year_position) {
    languages = languages.toLowerCase();
    date_text = date_text.trim().toLowerCase();
    date_text = date_text.replace(remove, '')
    switch (languages) {
      case "en":
        date_text = date_text.replace('january', '01').replace('february', '02').replace('march', '03')
        .replace('april', '04').replace('may', '05').replace('june', '06').replace('july', '07')
        .replace('august', '08').replace('september', '09').replace('october', '10')
        .replace('november', '11').replace('december', '12');
        break;
      case "en-s":
        date_text = date_text.replace('jan', '01').replace('feb', '02').replace('mar', '03').replace('apr', '04')
        .replace('may', '05').replace('jun', '06').replace('jul', '07').replace('aug', '08').replace('sep', '09')
        .replace('oct', '10').replace('nov', '11').replace('dec', '12');
        break;
    }
    month = date_text.split(separator)[month_position];
    day = date_text.split(separator)[day_position];
    year = date_text.split(separator)[year_position];
    if (day.length < 2) {
      day = '0' + day;
    }
    date_text = month + '/' + day + '/' + year;
    //jobposted = jobposted.replace(' ', '/').replace(' ', '/');
    return date_text;
  }