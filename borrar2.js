let benefitsRegex=/benefit|benefits|perks|beneficios|ventajas|/gmi
let jobtypeRegex=/fulltime|full-time|part-time|full time|partime|parttime|part time|teilzeit|permanent|casual|tempo completo|tempo parcial|tempo-parcial|tempo-completo|emprego permanente|tempo total|cdd|cdi/gmi
let fechasRegex=/\D{1,3}\s\d{1,2}\D\s\d{1,4}|\d{1,2}\.\d{1,2}\.\d{1,4}/gmi
let mesesRegex=/enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre/gmi
let limpiarRegex=/mail|correo|phone|telefono|more|locations|\+|dirección|/gmi

let arrayRegex=[benefitsRegex,jobtypeRegex,fechasRegex,mesesRegex,limpiarRegex];

checkContenedor(document.body, arrayRegex);

function checkContenedor(contenedor,arrayRegex) {
	if (typeof msg == "undefined") msg = console.log;
	msg(`\n \x1b[31m INICIO CONTENEDOR.....\x1b[39m`)
	for(x in arrayRegex){
		let ocurrencia=buscOcurrenciaHTML(contenedor,null,"",arrayRegex[x],false);
		if(ocurrencia)msg(`${"\x1b[41m En el contenedor existe la palabra o expresion: "+ocurrencia}:`)
	}
	msg(`\n \x1b[31m FIN CONTENEDOR.....\x1b[39m`)
}
function buscOcurrenciaHTML(contenedor,selector,string,expR,verHTML) { // jjms
    let resultado;
    let revisar;

    if(contenedor!=null && selector!=null){
        revisar=contenedor?.querySelector(selector)?.innerHTML;
        if(verHTML)return revisar;
        if(revisar?.match(expR)?.length){
        resultado=revisar?.match(expR)[0];
        }
        }else{
            if(contenedor!=null && selector==null){
                revisar=contenedor?.innerHTML;
                if(verHTML)return revisar;
                if(revisar?.match(expR)?.length){
                resultado=revisar?.match(expR)[0];
                }

            }else{
                if(verHTML)return string;}
                if(string?.match(expR)?.length){
                resultado=string?.match(expR)[0];
        }
    }
     return resultado;
}





















104258	Estrategia Especial	[Strategi:reindex-reinsert]fix url in extract, Reindex jobdescription, add experience, add jobtype, add benefits, update temp for update the source_empname. Comunicado,Madelen Brito Carrera: Variable y/o campo source_empname, 
105539	Estrategia Especial	[Strategi:reindex-reinsert] clean location, add lines to clean common expresions: www , https, @, etc,  update temp for update the source_empname. Comunicado,Madelen Brito Carrera: Variable y/o campo source_empname,  Run time AVG: 1318.200 ms
107306	Estrategia Especial	[Strategi:reindex-reinsert] fix error occurrence in  location,  update temp for update the source_empname. Comunicado,Madelen Brito Carrera: Variable y/o campo source_empname,  Run time AVG: 2338.600 ms
164331	Estrategia Especial	[Strategi:maintenace] was in stuck wic, fix stuck, update temp for update the source_empname. Comunicado,Madelen Brito Carrera: Variable y/o campo source_empname (more of seven days of edit) 
186011	Estrategia Especial	[Strategi:maintenace] was in stuck wic, fix stuck, update temp for update the source_empname. Comunicado,Madelen Brito Carrera: Variable y/o campo source_empname (more of seven days of edit) 
63938	Estrategia Especial	[Strategi:maintenace] was in stuck wic, fix stuck, update temp for update the source_empname. Comunicado,Madelen Brito Carrera: Variable y/o campo source_empname (more of seven days of edit) 
119299	Estrategia Especial	[Strategi:reindex-reinsert] fix format of date: add 0; add selector error, add jobtype, add experience,add lines to clean common expresions: www , https, @, etc,  update temp for update the source_empname. Comunicado,Madelen Brito Carrera: Variable y/o campo source_empname, 
211357	CL Rojas	[Strategi:red] fix format of date: add 0 , add lines to clean common expresions: www , https, @, etc, update temp for update the source_empname. Comunicado,Madelen Brito Carrera: Variable y/o campo source_empname, 
69972	CL Rojas	[Strategi:red] fix format of date: add 0 , add lines to clean common expresions: www , https, @, etc, update temp for update the source_empname. Comunicado,Madelen Brito Carrera: Variable y/o campo source_empname, 
211048	CL Rojas	[Strategi:red] fix format of date: add 0 , add lines to clean common expresions: www , https, @, etc, update temp for update the source_empname. Comunicado,Madelen Brito Carrera: Variable y/o campo source_empname, 
206014	CL Rojas	[Strategi:red] add lines to clean common expresions: www , https, @, etc,  add validations for search vars experience and salary,update temp for update the source_empname. Comunicado,Madelen Brito Carrera: Variable y/o campo source_empname, 
72031	CL Rojas	[Strategi:red] fix format of date: add 0 , add lines to clean common expresions: www , https, @, etc, update temp for update the source_empname. Comunicado,Madelen Brito Carrera: Variable y/o campo source_empname, 
	Disminución de meta	english class
	Disminución de meta	english class
	Disminución de meta	english class
260008	CL New	[Strategi:new] index by inland, the waits set are necessary
75572	CL New	[Strategi:new] reindex totally, Run time AVG: 1496.400 ms
89257	Estrategia Especial	[Strategi:new] ticket 123873 of sebastian c, add new validations for clean contact information in jobdesc, update temp, and add multilocation
89257	Estrategia Especial	[Strategi:new] ticket 123873 of sebastian c, add new validations for clean contact information in jobdesc, update temp, and add multilocation
230251	CL Rojas	[Strategi:red] fix format of date: add 0 , add lines to clean common expresions: www , https, @, etc,update temp for update the source_empname. Comunicado,Madelen Brito Carrera: Variable y/o campo source_empname,
75698	CL Rojas	[Strategi:red] fix error ocurrence in location of remote, fix format of date: add 0 , add lines to clean common expresions: www , https, @, etc,update temp for update the source_empname. Comunicado,Madelen Brito Carrera: Variable y/o campo source_empname,
120291	Estrategia Especial	[Strategi:reindex-reinsert] clean date ago, add date with structured data, add selector of jobdesc, add benefits, add jobtype, add experience, update temp for update the source_empname. Comunicado,Madelen Brito Carrera: Variable y/o campo source_empname, add lines to clean common expresions: www , https, @, etc,  Run time AVG: 6306.200 ms
120291	Estrategia Especial	[Strategi:reindex-reinsert] clean date ago, add date with structured data, add selector of jobdesc, add benefits, add jobtype, add experience, update temp for update the source_empname. Comunicado,Madelen Brito Carrera: Variable y/o campo source_empname, add lines to clean common expresions: www , https, @, etc,  Run time AVG: 6306.200 ms
139393 / 195347	Estrategia Especial (3x1)	[Strategi:reindex-reinsert] an internship is offered where the possibility of being hired after free work time is promised. It is queried and this is not indexable. It inactivates, image:  https://ibb.co/BTRw90G // [Strategi:reindex-reinsert] se inactiva porque todos los jobs estan en error 404 y en el homepage dice que han cerrado sus operacines imagen:  https://ibb.co/281VhQ2
120803	Estrategia Especial	[Strategi:reindex-reinsert] change do while by pass_it, update temp for update the source_empname. Comunicado,Madelen Brito Carrera: Variable y/o campo source_empname, Run time AVG: 3313.800 ms
70585	Estrategia Especial	ticket sebastian chalarca , location Forbidden, add validations for location,update temp,  wait for update jobs,
147865	Estrategia Especial	[Strategi:reindex-reinsert] change option Get JobDesc * no, because jobdes is in extract, change do while by pass_it,update temp for update the source_empname. Comunicado,Madelen Brito Carrera: Variable y/o campo source_empname, 
194250	Estrategia Especial	[Strategi:reindex-reinsert] add lines to clean common expresions: www , https, @, etc,  add elements in remove selectors, update temp for update the source_empname. Comunicado,Madelen Brito Carrera: Variable y/o campo source_empname, 
194256	Estrategia Especial	[Strategi:reindex-reinsert] add benefits, fix format of date, add 0, clean spaces in location and jobtype, add other ocurrence of salary, all jobs are expired in the moment, add lines to clean common expresions: www , https, @, etc,  update temp for update the source_empname. Comunicado,Madelen Brito Carrera: Variable y/o campo source_empname, Run time AVG: 2160.000 ms
194310	Estrategia Especial	[Strategi:reindex-reinsert] add salary and experience, add lines to clean common expresions: www , https, @, etc,  add elements in remove selectors,  update temp for update the source_empname. Comunicado,Madelen Brito Carrera: Variable y/o campo source_empname, 
194317	Estrategia Especial	[Strategi:reindex-reinsert] add salary and experience, add lines to clean common expresions: www , https, @, etc,  add elements in remove selectors,  update temp for update the source_empname. Comunicado,Madelen Brito Carrera: Variable y/o campo source_empname, 
194345	Estrategia Especial	[Strategi:reindex-reinsert] add source_location,add salary, add experience change do while by pass_it, Run time AVG: 2733.800 ms
194406	Estrategia Especial	[Strategi:reindex-reinsert] was in stuck reindex jobdescription with fetch,add lines to clean common expresions: www , https, @, etc,   Run time AVG: 1469.000 msupdate temp for update the source_empname. Comunicado,Madelen Brito Carrera: Variable y/o campo source_empname, was necessary to change owner, 
195038	Estrategia Especial	[Strategi:reindex-reinsert] fix occurrence in location, add validation, add experience required, add lines to clean common expresions: www , https, @, etc,  update temp for update the source_empname. Comunicado,Madelen Brito Carrera: Variable y/o campo source_empname, 
195445	Estrategia Especial	[Strategi:reindex-reinsert] add validations for vars experience and salary, add lines to clean common expresions: www , https, @, etc,  add elements in remove selectors, update temp for update the source_empname. Comunicado,Madelen Brito Carrera: Variable y/o campo source_empname,
210321	CL Rojas	[Strategi:reindex-reinsert] fix format of date: add 0 , add lines to clean common expresions: www , https, @, etc, update temp for update the source_empname. Comunicado,Madelen Brito Carrera: Variable y/o campo source_empname, 
207878	CL Rojas	[Strategi:reindex-reinsert] reindex jobdesc, add benefits, add lines to clean common expresions: www , https, @, etc,  add elements in remove selectors,  update temp for update the source_empname. Comunicado,Madelen Brito Carrera: Variable y/o campo source_empname, update expected jobs, Run time AVG: 2048.200 ms
187496	CL Rojas	[Strategi:reindex-reinsert]Another jobsite was found on the homepage, it is add to multilink and reindexed,fix format of date: add 0 , add lines to clean common expresions: www , https, @, etc, update temp for update the source_empname. Comunicado,Madelen Brito Carrera: Variable y/o campo source_empname, 
230306	CL Rojas	[Strategi:reindex-reinsert] add dateposted raw,add lines to clean common expresions: www , https, @, etc,   add experience required, update temp for update the source_empname. Comunicado,Madelen Brito Carrera: Variable y/o campo source_empname, Run time AVG: 1496.000 ms, 
230324	CL Rojas	[Strategi:reindex-reinsert] update expected jobs, add lines to clean common expresions: www , https, @, etc,  update temp for update the source_empname. Comunicado,Madelen Brito Carrera: Variable y/o campo source_empname, 
230326	CL Rojas	[Strategi:reindex-reinsert] fix format of date: add 0 , add lines to clean common expresions: www , https, @, etc, update temp for update the source_empname. Comunicado,Madelen Brito Carrera: Variable y/o campo source_empname,has more jobs with date closed error , update exp jobs
75595	CL Rojas	[Strategi:reindex-reinsert] fix format of date: add 0 , add lines to clean common expresions: www , https, @, etc, fix-update head quarters,update temp for update the source_empname. Comunicado,Madelen Brito Carrera: Variable y/o campo source_empname, 
212847	CL Rojas	[Strategi:reindex-reinsert] fix format of date: add 0 , add lines to clean common expresions: www , https, @, etc,update temp for update the source_empname. Comunicado,Madelen Brito Carrera: Variable y/o campo source_empname, 
207572	CL Rojas	[Strategi:reindex-reinsert] change do while by pass_it, add benefits, fix format of date: add 0; add lines to clean common expresions: www , https, @, etc, update temp for update the source_empname. Comunicado,Madelen Brito Carrera: Variable y/o campo source_empname, 
207572	CL Rojas	[Strategi:reindex-reinsert] change do while by pass_it, add benefits, fix format of date: add 0; add lines to clean common expresions: www , https, @, etc, update temp for update the source_empname. Comunicado,Madelen Brito Carrera: Variable y/o campo source_empname, 