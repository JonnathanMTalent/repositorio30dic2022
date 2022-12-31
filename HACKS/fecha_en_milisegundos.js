// fecha en numeros
      //     ██████████████████████████████fecha en milissengundos██████████████████████████████████████  /*  
      const formatDate = (value) => {
        let date = new Date(value);
        const withCero = n => n < 10 ? `0${n}` : n;
        return `${withCero(date.getMonth()+1)}/${withCero(date.getDate())}/${date.getFullYear()}`;
      }
          var date1=jobs[i].updated_on;
          var d = new Date(date1);
          job.dateposted_raw=formatDate(d);
          
    //*/// ████████████████████████████████████████████████████████████████████