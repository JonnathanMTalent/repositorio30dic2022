job.dateposted_raw = date_general_format(elem.querySelector('td:nth-child(6)').textContent, ' ', {
    'day': [0, 1],
    'text': 1,
    'month': 0,
    'year': 2, // => 2
})
/*job.dateclosed_raw = date_general_format(text, '', {
    'day': [0, 0], // dias, 2 opciones
    'text': 1, // text para la opcion 1
    'month': 1, // mes para la opcion 2
    'year': 2, // año para la opcion 2
})*/

❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️




function date_general_format(date_raw, cut, text_positions = {} /* => day|text||month|year*/ ) {
    let date_return, mm, dd, yy, entre, corte_text;
    try {
        if (date_raw.split(cut).length < 2 || /ago/ig.test(date_raw.split(cut).pop())) {
            // Crear Variables
            entre = 'Option 1';
            let number_dwmy = parseInt(date_raw.split(cut)[text_positions.day[0]], 10),
                number_days = 0,
                day_week_month_year, get_date, date

            if (typeof date_raw.split(cut)[text_positions.text] !== 'undefined') day_week_month_year = date_raw.split(cut)[text_positions.text];
            else day_week_month_year = date_raw.split(cut)[date_raw.split(cut).length - 1];

            // Encontrar fecha & en-es
            if (/today|now|hour|horas|min|seg|hoy/ig.test(day_week_month_year)) number_days = 0;
            if (/yesterday|ayer/ig.test(day_week_month_year)) number_days = 1;
            if (/days|días/ig.test(day_week_month_year)) number_days = number_dwmy;
            if (/week|semana/ig.test(day_week_month_year)) number_days = number_dwmy * 7;
            if (/month|mes|meses/ig.test(day_week_month_year)) number_days = number_dwmy * 30;
            if (/year|año/ig.test(day_week_month_year)) number_days = number_dwmy * 365;

            // convertir fecha
            get_date = new Date().setDate(new Date().getDate() - number_days);
            date = new Date(get_date);
            dd = date.getDate();
            mm = date.getMonth() + 1;
            yy = date.getFullYear().toString();

            // Formatear fecha
            if (dd < 10) dd = '0' + dd;
            if (mm < 10) mm = '0' + mm;
            date_return = `${mm}/${dd}/${yy}`
        } else {
            entre = 'Option 2';
            date_raw = date_raw.replace(/,|\./g, '').trim();
            // Crear Variables
            let date_cut = date_raw.split(cut)
            dd = date_cut[text_positions.day[1]].replace(/[a-z]/ig, '');
            mm = date_cut[text_positions.month];
            yy = date_cut[text_positions.year];

            // Formatear Variables
            if (dd < 10) dd = '0' + dd;
            if (/ene|jan|january|januar/ig.test(mm)) mm = '01'
            if (/feb?v?|february|fév|februar|febrero/ig.test(mm)) mm = '02'
            if (/mar|march|maar|märz|marzo/ig.test(mm)) mm = '03'
            if (/apr|abr|april|avr|abril/ig.test(mm)) mm = '04'
            if (/may|mai|mei|mayo/ig.test(mm)) mm = '05'
            if (/jun|june|juin|juni/ig.test(mm)) mm = '06'
            if (/jul|july|juil|juli/ig.test(mm)) mm = '07'
            if (/aug|ago|august|août|agosto/ig.test(mm)) mm = '08'
            if (/sep|set|september|septiembre/ig.test(mm)) mm = '09'
            if (/oct|out|october|okt|Oktober/ig.test(mm)) mm = '10'
            if (/nov|november/ig.test(mm)) mm = '11'
            if (/dec|dez|december|déc|dezember/ig.test(mm)) mm = '12'

            // formatear fecha
            date_return = `${mm}/${dd}/${yy}`
        }
    } catch (e) { // Si falla algun metodo esto evita que se caiga el spider
        corte_text = JSON.stringify(date_raw.split(cut));
        msg('================= Fallo =================');
        msg(`---- texto: ${date_raw}\n---- cut: ${cut}\n---- format: ${date_return}\n---- posiciones: ${JSON.stringify(text_positions)}\n---- array cut: ${corte_text} | length: ${corte_text.length}\n---- opcion: ${entre}`);
        msg('=========================================');
        msg(e.stack);
        return null;
    };
    if (/[a-z]|\.|\,|\*/ig.test(date_return)) { // Si consigue texto en el formato |# example => feb/22/2022 | NaN/01/NaN | ob/22/undefined 
        corte_text = JSON.stringify(date_raw.split(cut));
        msg('================= mal format =================');
        msg(`---- texto: ${date_raw}\n---- cut: ${cut}\n---- format: ${date_return}\n---- posiciones: ${JSON.stringify(text_positions)}\n---- array cut: ${corte_text} | length: ${corte_text.length}\n---- opcion: ${entre}`);
        msg('=============================================');
        return null;
    } else return date_return // Retornar Formato
}