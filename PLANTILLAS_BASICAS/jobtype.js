function Jobtype(jobtyp) {  //recordar escribir las nuevas ocurrencias en minuscula
    var Jobtype=jobtyp.toLowerCase().trim();
    
    var s_jobtype="";
    //var s_jobtype = 'Headquarters';  // Convertir la locacion en hq cuando no este en los if
    
/*  PARA SACAR MAS:  en minuscula la de indexOf
    if (Jobtype.indexOf("") > -1) {
        s_jobtype = (", ");
    }; 
    //Full-time, Part-time, Temporary, Permanent;
*/
    if (Jobtype.indexOf("full time") > -1) {
        s_jobtype = ("Full Time");
    };
    if (Jobtype.indexOf("full-time") > -1) {
        s_jobtype = ("Full Time");
    };
    if (Jobtype.indexOf("fulltime") > -1) {
        s_jobtype = ("Full Time");
    };
    if (Jobtype.indexOf("part-time") > -1) {
        s_jobtype = ("Part Time");
    };
    if (Jobtype.indexOf("parttime") > -1) {
        s_jobtype = ("Part Time");
    };
    if (Jobtype.indexOf("part time") > -1) {
        s_jobtype = ("Part Time");
    };
    if (Jobtype.indexOf("temporary") > -1) {
        s_jobtype = ("Temporary");
    };
    if (Jobtype.indexOf("permanent") > -1) {
        s_jobtype = ("Permanent");
    };
    if (Jobtype.indexOf("CDD") > -1) {
        s_jobtype = ("CDD");
    };
    if (Jobtype.indexOf("CDI") > -1) {
        s_jobtype = ("CDD");
    };
    if(s_jobtype=="")s_jobtype=undefined;

    
    return s_jobtype;
}
