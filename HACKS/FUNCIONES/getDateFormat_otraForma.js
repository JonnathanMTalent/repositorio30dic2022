function formatDate(get_date, sC, pMes, pDia, pAno) {  //Ingreso String con fecha;caracter separador;posicion Mes, Dia y Año
    get_date = get_date.replace(/\,/g,"").trim();
    let monthJob = get_date.split(sC)[pMes].substring(0,3).trim().toLowerCase();
    let dia = parseInt(get_date.split(sC)[pDia],10); dia = dia<10?'0'+dia:dia;
    let dateEN = {"jan":"01","feb":"02","mar":"03","apr":"04","may":"05","jun":"06","jul":"07","aug":"08","sep":"09","oct":"10","nov":"11","dec":"12"}
    typeof dateEN[monthJob]!='undefined'?monthJob = dateEN[monthJob]:monthJob= parseInt(monthJob,10)<10?'0'+monthJob:monthJob;
   return monthJob+"/"+dia+"/"+get_date.split(sC)[pAno].trim();
 }