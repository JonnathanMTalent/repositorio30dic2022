const formatDate = (value) => {
    let date = new Date(value);
    const withCero = n => n < 10 ? `0${n}` : n;
    return `${withCero(date.getMonth()+1)}/${withCero(date.getDate())}/${date.getFullYear()}`;
  }


Cuadra las fechas

  var dateAux = new Date(job.dateposted_raw);
job.dateposted_raw = dateAux.toLocaleDateString("en-US");


function cambiarFecha(d) {
  date = new Date(d)
  var dd = date.getDate(); 
  var mm = date.getMonth()+1; 
  var yyyy = date.getFullYear(); 
  if(dd<10){dd='0'+dd} 
  if(mm<10){mm='0'+mm};
  return mm+'/'+dd+'/'+yyyy
}