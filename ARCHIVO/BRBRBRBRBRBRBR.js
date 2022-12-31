


 Se realizaron los siguientes scanids= 209333, 209344, 209379, 209599; 

209333  NO TIENE DESCRIPCION                                        agrosolo activo
209344  bien                                                        bevrijdingspop-haarlem	activo
209379  verificar que se quite el corrreo de la descripcion         adservi  activo
209599  bien                                                        bemol  activo

211385
211453
211454
211468

211475

211489   jj   24-hr-services        	activo
211507   jj    alliance-forets-bois     activo
211592   jj  babo-dienstverlening       activo
211779   jj   americanas                activo

214882   jj  bibi                       activo
214947   jj baireshr                    activo    "todos los trabajos vencidos"
214984   jj berg-roses                  activo
215023   jj am-consultoria-integral-en-re  activo   "limpiar en la descripcion la localidad aparece dos veces"

semana 2 lunes:  falta 1

211385
211453
211454
211468
211475

semana 2 martes: faltan 4

12332   migrado 2 status correcto  revisar errores
105205  migrado 2 status correcto  revisar errores caso con paginacion y selector normal next

semana 2 miercoles:

225867 doble meta  caso json de daniel  https://www.prnhealthservices.com/jobs?pg=0
191274  doble meta otro json      The Wendy's Company
153539         caso con job fantastma y con fechas organizadas,
190316    se cambia expected jobs solo tiene 7 y se agrega jobtype.. ya esta migrada

semana 2 jueves:
12184  selector waits are put, lines are removed in pagination, brings 85 active jobs and ran 5 times in succes in the crawl History,no errors logged.
        CASO MUY INTERESANTE DE MULTILOCATION YA QUE ENTRA EN LA DESCRIPCION DEL ESTRACT Y GENERA LA INFO

16507  FINALIZADO
87868  FINALIZADO
97002  FINALIZADO


viernes:









SIN RESOLVER:
150191  party city num 50 jonnathan echeverry  JSON CON BREAKPOINT (estudiarla despues) num 50
64443   kenametal   no trae los jobs VOLVER A REVISAR ESTA EN WORKIN ON IT       
141630 3m  pagina y desde la segunda pagina el extract no funciuona


SABADO 14 de mayo 2022:

23004  la que le puse a enumerar las locaciones para que trajera de 469 a 629
181953  completo
196244  migrado
98861   migrado siguio trayendo un poco menos de jobs
205132 completo y migrado
26830  completo y migrado
183627 completo y migrado



SEMANANA 3 META 36(HUBO REDUCCION DE METAS (4))
LUNES 16/mayo/2022

206088  corregido 
175929  corregido Y migrado


OBJETIVOS DE ESPERAS:
34417   AVG: 22220.400 ms  2030.800     [05/16/2022] , the wait in Before Job Description is eliminated and continues to work normallythe test was repeated 4 times after eliminating the wait
96065      1388.200 ms    1029.800
11177     2717.000     2139.400         2632.800   1876.400 ms
188890   listo


OBJETIVOS DE ESPERAS MARTES:
105903

176662    waitForPageText clear   Description du poste & profil recherché   revisar despues


149703
189182   waitForPageText  waitForPageResources





[Strategy: Jobdata High Load - May 17, 2022 - wait in Before Job Description is add and because the test ran with an error,  it improved and the speed is below 3 seconds.Commented out.wait = true.the test was repeated 4 after, run correct,  - ] trae 37302-- jobs
[Strategy: Jobdata High Load - May 17, 2022 - WaitForPageResources was set on "No",  if the wait for the before jobdesc is deleted, it brings an error. the speed is below 5 seconds- 60% Improvement] trae 9301 jobs

[Strategy: Jobdata High Load - May 17, 2022 -
the selector was changed while waiting for the before jobdesc, since the previous one did not exist in some pages, this was the cause of the error, change status to Active ,
the step test was tested 4 times, the general test 2 times and it worked correctly,- 2427- Improvement] Más de 10889  jobs



miercoles:

204220  extract bien, jobdesc bien,  se comento lineas lista
177880  fianalizado tiene escroll
214294  finializado
12034    se paso a Daniel Hazanow se cambio url del josite   se cambio el extract 25975.200 ms no se pudo reducir el tiempo
218616    Actual  cambiar formato locacion tiene bien el extract y el jobdesc 
162613    hecho


jueves:

196887   migrada y espera eliminada
54431    migrada, espera eliminada, 


Viernes:

Sabado pendiente:
197711  json quedo pendiente y copiado en borar

Sabado terminado:

133756  se cambio la paginacion boton-more
215138  se elimino pic , migrado, clean jobdesc
132914
219547  buen ejemplo de json con paginanacion de my workday
52649  migrado y eliminado esperas
73161  Migrado y agregado no pagination
54164  json muy vacano de my workday jobs
71150  se cambio la paginacion

sig:
112801  
158806


LUNES 23/05/2022

151022
54492   migrada no dio en el company overview no aparece para el expected jobs
118893  migrada y se borraron esperas
17802  migrado y eliminado esperas
197515  se agrego paginacion 
173476 migrado, se agrego bef extract coment wait
53957 migrado, wait eliminada
53432 migrado , se agrego get description , dateposted y jobtype
73003  PEDIRLO DOBLE,,

MARTES 24 DE MAYO DEL 2022: (10 METAS)

1)  182663  tiene un json que no se deja extraer del extract
2)  80518
3)  149239
4)  17034   EMPCODE: cvent   EMPNAME: Cvent
5)  212656  bamboo de Daniel    katch-kan   Katch Kan  falta organizar el cl
SE DAÑO EL SISTEMA A MEDIO DIA


204220
177880
214294
12034
218616
162613
192107
69917
205115
212656
218973
22964
151994
190868
197902
205770
109232
192306
250992
228996
195060
197897
139452
18009


MARTES 31 DE MAYO 2022:

137178   NO ME QUIERE DAR, PREGUNTARLA

1) 171416   Teladoc Health     teladoc-health
2) 210396   Teladoc Health     teladoc-health
3) 73634  -->  empname:  Warner Music Group     empcode: warner-music-group
4) scanid:  119578       -->  empname: Teradyne       empcode: teradyne
5) scanid:  71947       -->  empname:   NBA     empcode: 
6)  scanid:  64445       -->  empname:  Regal Beloit Corporation      empcode: regal-beloit    estrategia:  amarilla
7) scanid:  118169       -->  empname:   Middle Tennessee State University             empcode:   middle-tennessee-state-university       estrategia:  amarilla
8) scanid: 202901        -->  empname:   Monster Energy         empcode: monster-energy       estrategia:  roja
9) scanid: 202914        -->  empname:   Monster Energy         empcode: monster-energy       estrategia:  roja
10) scanid: 202920        -->  empname:   Monster Energy         empcode: monster-energy       estrategia:  roja


miercoles 1 de MAYO:

consultar: 
scanid:  187174       -->  empname:  TDCX        empcode:   tdcx      estrategia:  roja    comentary: pendiente


1)  scanid: 22659        -->  empname: NEORIS           empcode:   neoris     estrategia:  ROJA      comentary:      [Strategy: Manteinance - JUN 01, 2022] change all selectors in extract, the dateposted_raw format was corrected, migrated to talent, change status in talent and neuvoo.Run time AVG: 1346.400 

2)  scanid: 69989        -->  empname:  Olam          empcode:  olam-au    estrategia:  Roja   coment: [Strategy: Manteinance - JUN 01, 2022] location edited, have duplicated jobs ,Run time AVG: 1418.000 



jueves:

1) scanid: 13380        -->  empname:  ST Engineering          empcode:  st-engineering     estrategia: roja      coment: [Strategy: Manteinance - JUN 02, 2022] Reindex ,migrate to talent,  change state in Dinamic and Neuvoo, have expired and duplicated , was necessary all waits in config for to get all jobs. Run time AVG: 5916.600 ms 
2) scanid: 231717     -->  empname:   RGE    empcode: rge      estrategia: new     comentary:  [Strategy: Manteinance - JUN 02, 2022] Index json, have duplicated jobs, migrate to talent, change satus in talent and neuvoo 
3) 155902  no jobs 
4) scanid: 129325     -->  empname:   Singtel    empcode: singtel     estrategia: red     comentary:  [Strategy: Manteinance - JUN 02, 2022] Add lines remove text in step Jobdesc..Run time AVG: 2073.800 ms
5) scanid:  251491       -->  empname:  Tan Tock Seng Hospital        empcode:  tan-tock-seng-hospital       estrategia: roja     comentary: [Strategy: Manteinance - JUN 02, 2022] change waitForPageResources: no, reduce time: Run time AVG:(  AVG: 816.600 ms  ) ; 
6) scanid:  95361       -->  empname:  Tan Tock Seng Hospital       empcode:  tan-tock-seng-hospital      estrategia:      comentary: [Strategy: Manteinance - JUN 02, 2022]  ; change wait waitForPageText: no, migrated to talent, change status in talent and neuvoo, Run time AVG:( Run time AVG: 779.200 ms  )
7) scanid:  12010       -->  empname:  APL      empcode: apl       estrategia:  rojas    comentary: [Strategy: Manteinance - JUN 02, 2022]   add step before extract to run corret in dinamic, have duplicated jobs  , Run time AVG:(Run time AVG: 827.200 ms  )

viernes:
125263 puente QA
150356 Puente QA
105972 --->252601  empcode: acl-automobile-club-du-luxembourg  empname: empcode: Acl Automobile Club Du Luxembourg
87605 --->(252610 )  empcode: aconso        empname: aconso
118746 --->( )  empcode: action-square      empname: Action Square
162151 --->( 252612)  empcode: action-sport      empname: Action Sport asbl
173515 --->(252613)  empcode:  afringa    empname: Afringa
156785    --->(252621)           empcode:  after-digital        empname: After Digital


-----------------------------------------------------------------------------
138188      --->( 252626 )           empcode:   af-toscano-ag       empname: AF Toscano AG


news:
 252632    --->(  )           empcode: anymind-group      empname:  AnyMind Group      estrategia:  new  
 252633   --->( pedirla 2 )           empcode: shopback     empname: ShopBack     estrategia:  new    coment
252639  --->( pedirlo por 3  )           empcode:  maxeon-solar-technologies     empname:  Maxeon Solar Technologies     Maxeon Solar Technologies   estrategia:  new  
 252646  --->( pedirla por 2 )           empcode:  capella-hotels-and-resorts   empname:  Capella Hotels and Resorts     estrategia:  new  



 ****************************************************************************************
 ****************************************************************************************
MAYO:  empeze el 4 de mayo
          reduccion- diarias-días-total-fecha  poner: pedir  
SEMANA 1:   -2,         4     3     10   4-6     10     0        s:  DIRON 2 DE META POR ASISTIR A UNA REUNION RECURSOS HUMANOS
SEMANA 2:   -5,         6     5     25   9-13    21     2*2        s:   HUBO REDUCCION DE 5 METAS EL 13 DE MAYO.
SEMANA 3:   -5,         8     5     35   16-20   27     4*2        HUBO REDUCCION DE 5 METAS EL 20 DE MAYO.
SEMANA 4:   -6,        10     4     34   23-27   26     4*2        SE REDUJERON 6 INDEXACIONES EL 27 DE MAYO.

JUNIO:

          reduccion- diarias-días-total-  fecha
SEMANA 1:   -6,        12     4     42    31-3     pedir 5 dobles      Lunes festivo  viernes 3 de mayo reduccion de 6 de meta
SEMANA 2:     ,        12     5           6-10            
SEMANA 3:     ,               4           13-17          jueves festivo   
SEMANA 4:     ,               4           20-24          lunes festivo  
SEMANA  :     ,               4           27-01          lunes festivo  

SEMANA 1:   
 ****************************************************************************************
 ****************************************************************************************




 ****************************************************************************************
 ****************************************************************************************
 ****************************************************************************************

 SEMANA DEL 6-10 DE JUNIO:

        --->(  )           empcode:  capella-hotels-and-resorts   empname:  Capella Hotels and Resorts 
 ****************************************************************************************
 ****************************************************************************************
 ****************************************************************************************

semana 1:
 ****************************************************************************************
lunes:


1) 172331  --->( 252665 )     empcode: agencias-way   empname: Agencias Way      estrategia:  puente de QA  
2) 130159  --->()  empcode:  agentrisk-gr  empname: Agentrisk  estrategia:  puente de QA   
3-4) META DOBLE APROBADA 119506  --->(252698)  empcode:agent-video-intelligence-ltd    empname: Agent Video Intelligence Ltd  estrategia:  puente de QA  
5) 146164  --->(1/3)  empcode: all-in-analytics  empname:  All In Analytics     estrategia:  puente de QA  
6) 141277  --->()  empcode: alltran  empname: Alltran     estrategia:  puente de QA   



7)   140490 --->(1/3)  empcode: emploinet empname: EmploiNet   estrategia:   puente de QA  
8) 172525   --->(252941)  empcode: emploiscongo  empname:  emploiscongo   estrategia:   puente de QA  
9)
10)
11)
12)

 ****************************************************************************************

martes:

puente QA
1) 113935 --->(252706)  empcode: alpha-plan-gmbh  empname:  Alpha Plan GmbH   estrategia:  puente de QA 
2)  26510  --->(1/3)  empcode:alps-electric-europe-gmbh  empname: ALPS ELECTRIC EUROPE GmbH    estrategia:  puente de QA  
3-4) APROBADA DOBLE,  131981  --->(252733)  empcode:centre-la-tienda-dici-a-compostelle  empname: Centre La Tienda d'ici à Compostelle   estrategia:  puente de QA   
5) 125479 --->(1/3)  empcode:  alphafounders  empname: Alpha Founders     estrategia:  puente de QA 
6) 127842   --->(1/3)  empcode:ceresana  empname:  Ceresana  estrategia:   puente de QA

7) 112414  --->(252759)  empcode: certego  empname: CERTEGO   estrategia:   puente de QA
8) 116052  --->(252764)  empcode:  cesim empname:  Cesim  estrategia:   puente de QA  
9)  
10)
11)
12)


 ****************************************************************************************

mircoles:
1) PEDIR POR 2: 106140   --->(252771)  empcode:chauffage-federspiel  empname:  Chauffage Federspiel  estrategia:   puente de QA  
2)  164469   --->(252784)  empcode: comar-agency empname: Comar Agency   estrategia:   puente de QA  
3) 137569   --->(252767)  empcode: charlier-logistics  empname: Charlier Logistics   estrategia:   puente de QA 
4)   93396  --->(1/3)  empcode: combined-motor-holdings-pty-ltd empname: Combined Motor Holdings Pty Ltd   estrategia:   puente de QA  
5)  155733  --->(1/3)  empcode: comexplorer-sas empname: ComExplorer SAS   estrategia:   puente de QA  
6)  64409   --->(1/3)  empcode:communicationsgraphiques  empname: GrafiCompétences   estrategia:   puente de QA  
7)   172736   --->(1/3)  empcode: compartamos empname: compartamos (guatemala)  estrategia:   puente de QA  
8)   139445   --->(252798)  empcode: conestoga-mall empname:  Conestoga Mall  estrategia:   puente de QA  
9)
10)
11)
12)

 ****************************************************************************************

jueves:
1)  150571  --->(1/3)  empcode:c-trac  empname: C-TRAC   estrategia:   puente de QA  
2)   154039    --->(1/3)  empcode:custeed  empname:  Custeed  estrategia:   puente de QA  
3) 69914     --->(1/3)  empcode: cvbrowser empname:  Cvbrowser  estrategia:   puente de QA  
4)   69914  --->(1/3)  empcode:  cvbrow empname: Cvbrowser   estrategia:   puente de QA  
5)  84375 --->(252828)  empcode:  cws-boco-belux empname: CWS-boco BeLux   estrategia:   puente de QA  
6) 166643   --->(252851)  empcode: cybozu empname: Cybozu   estrategia:   puente de QA  
7)  164217  --->(1/3)  empcode:empleosrodriguez  empname:  Empleosrodriguez  estrategia:   puente de QA  
8)166824  --->(1/3)  empcode: edia empname: Edia   estrategia:   puente de QA 
9)131467   --->(252938)  empcode:  emitech empname:   Emitech  estrategia:   puente de QA 
10)114241   --->(252937)  empcode:emerge  empname:  Emerge  estrategia:   puente de QA  
11)
12)

 ****************************************************************************************

viernes:
1)  170269  --->(252865)  empcode:edenspiekermann  empname:  Edenspiekermann  estrategia:   puente de QA  
2) 139091  --->(252908)  empcode:edutemps  empname:  Edutemps   estrategia:   puente de QA  
3) 
4) 110411  --->(252921)  empcode:  eeu-software empname: EEU Software   estrategia:   puente de QA  
5) 111540  --->(252928)  empcode:  effect-bemanning empname: Effect Bemanning    estrategia:   puente de QA  
6)  132871 -->(1/3)  empcode: efinancialcareers-fr-bi empname: eFinancialCareers Ltd.   estrategia:   puente de QA  
7) 13380  --->(1/3)  empcode: st-engineering empname: ST Engineering   estrategia:   rojas
8)   211596  --->(1)  empcode: ncs-group empname: NCS Group   estrategia:   rojas
9) 129218 --->(252932)  empcode:emerald-cultural-institute  empname:  Emerald Cultural Institute  estrategia:   puente de QA  
10) 
11)  
12) 
 ****************************************************************************************
 ****************************************************************************************
 ****************************************************************************************
 ****************************************************************************************
SEMANA 13-17 DE JUNIO
 ****************************************************************************************
 LUNES:
1)  251488 -->(1/3)  nanyang-technological-university      Nanyang Technological University
1)115235 --->(1/3)  empcode:  keller-ag empname:KELLER AG    estrategia:   puente de QA  
1)  211596 -->(1/3) change expected jobs
2)  21504   --->(active 1 migrado)  empcode: flex empname:Flex    estrategia:   rojas  
3)  211528         govtech-singapore                   GovTech Singapore
4)  153068   --->(1 migrado)  empcode: ibs-sofware empname:   IBS Sofware  estrategia:   rojas  
5)  212528   --->(1 migrado)  empcode: livspace empname:  Livspace   estrategia:   rojas  
6) 229258--->(add datepost)  empcode: certis empname: Certis   estrategia:   rojas  
8)  114719--->(migrado)  empcode: inmobi empname: InMobi   estrategia:   rojas          
9) 171117--->(clean jobdesc)  empcode:singapore-university-of-social-sciences  empname: Singapore University of Social Sciences   estrategia:   rojas           
7)  151627--->(migrated)  empcode: interplex empname: Interplex   estrategia:   rojas          
10) 171782--->(migrated)  empcode:temasek  empname: TEMASEK    estrategia:   rojas           
11) 168519--->(migrated)  empcode:	venture  empname:Venture    estrategia:   rojas         
12) 212226--->(migrated)  empcode: 	singapore-institute-of-technology empname: Singapore Institute of Technology   estrategia:   rojas          

MARTES:

1)  195060  empcode: barrington-220-school-district  empname: Barrington 220 School District  estrategia(rojas)
2)  137178  empcode: exact-sciences-corporation          empname:  Exact Sciences Corporation
3)  119578  empcode:  teradyne empname:  Teradyne
4)  20421  --->(253042)  empcode:  zoo-plus empname: Zoo Plus    estrategia:   puente de QA  
5)  156869   --->(253045)  empcode:zoo-digital  empname: ZOO Digital Group plc   estrategia:   puente de QA  
6)  175138  --->(253048)  empcode: zliide empname:  Zliide  estrategia:   puente de QA  
7)  222574 --->(migrated)  empcode:nestle  empname: Nestlé   estrategia:   rojas 
8)  202449--->(migrated)  empcode:  ikea empname: Ikea   estrategia:   rojas 
9) 189025--->(estructurados)  empcode: pnc empname:PNC    estrategia:   rojas 
10)13509--->(emine date ago y ext date del json)  empcode: ncr empname: NCR Edinburgh   estrategia:   rojas  
11)186532--->(emine date ago y ext date del json)  empcode: ncr empname: NCR Edinburgh   estrategia:   rojas  
12) esta corrige las 2 anteriores 219726--->(se quitaron pics y lineas de msg)  empcode: ncr empname: NCR Edinburgh   estrategia:   rojas  

MIERCOLES:
1) 84051   --->(253049)  empcode: ziemer empname: Ziemer Ophthalmic Systems AG    estrategia:   puente de QA  
2)   169066   --->(253021)  empcode:istanbul-homes  empname:  Istanbul Homes  estrategia:   puente de QA  
3)    224508   --->(1)  empcode:silverein  empname: Silverein  estrategia:   puente de QA  
4)   71902  --->(253077)  empcode: lac-group empname:  LAC Group   estrategia:   puente de QA  
5)  71131--->(253098)  empcode: jan-de-nul empname:JAN DE NUL    estrategia:   puente de QA  
6) 136688--->(253104)  empcode: japantaxi empname: JapanTaxi Co. Ltd.   estrategia:   puente de QA  
7) 105460 --->(253107)  empcode: jarfalla-kommun empname: Jarfalla Kommun   estrategia:   puente de QA  
8)  148928--->(253109)  empcode: jcc-metro-west empname:  JCC MetroWest  estrategia:   puente de QA 
9)  171583  --->(253111)  empcode:jenatec  empname: Jenatec   estrategia:   puente de QA  
10) 14118 --->(253112)  empcode:health-net  empname: Health Net   estrategia:   puente de QA  
11) 227753--->(migrado)  empcode: the-st-james-s-place-wealth-management-group empname: The St. James’s Place Wealth Management Group   estrategia:   rojas  
12) 252646--->(add jobtype)  empcode:	capella-hotels-and-resorts  empname:Capella Hotels and Resorts    estrategia:   rojas  

JUEVES:

1) 107301--->(1/3)  empcode:kavka  empname:Kavka    estrategia:   puente de QA
1) 117879 --->(1/3)empcode:herding  empname: Herding AG Filtertechnik    estrategia:   puente de QA 
1) 154617 --->(1/3)  empcode: kidygo empname: Kidygo   estrategia:   puente de QA 
2) 111174--> 253165      reg de Daniel
3-4)DOBLE 139384 --->(253147)   VALE POR 2 APROBADA empcode: help empname: HELP   estrategia:   puente de QA 
5) 142519  --->(253182)  empcode:kemna  empname:  KEMNA BAU Andreae GmbH & Co. KG   estrategia:   puente de QA
6) 177649 --->(253188)  empcode:kenyans-come-home  empname: Kenyans Come Home  estrategia:   puente de QA 
7) 150589--->(253192)  empcode:kinneir-dufort  empname: Kinneir Dufort   estrategia:   puente de QA 
8) 176013 --->(253194)  empcode:keljob-sn  empname: Keljob   estrategia:   puente de QA   pedir plantilla
9) 172705--->(253129)  empcode: helados-sarita empname: Helados Sarita   estrategia:   puente de QA
10) 229105--->(migrated)  empcode: dyna-mac empname: Dyna-Mac   estrategia:   rojas  
11) 229689 --->(migrated)  empcode:singapore-pools  empname: Singapore Pools   estrategia:   rojas  
12) 105328--->(add variables)  empcode:  fca-group empname: Fiat Chrysler Automobiles   estrategia:   rojas 

viernes:
1) 169817 --->(DANIEL)  empcode: federal-reserve-bank-of-atlanta empname: Federal Reserve Bank of Atlanta
2)124614--->()  empcode: canadian-international-school empname: Canadian International School   estrategia:   rojas 
3)134168 --->(253241)  empcode:mpower-performance  empname: MPOWER Performance    estrategia:   puente de QA  
4) 146781 --->(253255)  empcode:  mq-transforming-mental-health empname: Transforming Mental Health   estrategia:   puente de QA  
5)  175050--->(253261)  empcode:multieskendra  empname: multieskendra   estrategia:   puente de QA  
6) 95883--->(253263)  empcode:  multimedia empname: Multimedia   estrategia:   puente de QA 
7) 228723 --->(migrated)  empcode: trip-com empname: Trip.com   estrategia:   rojas  
8) 229114--->(1)  empcode: patsnap empname: PatSnap    estrategia:   rojas    
9) 229223--->(migrated)  empcode: m-tech  empname: M.Tech   estrategia:   rojas  
10)229108 --->(datos estruc)  empcode:twentycube  empname: 20Cube   estrategia:   rojas 
11)229636--->(migrado)  empcode:flash-coffee  empname: Flash Coffee   estrategia:   rojas 
12) 229403--->(migrated)  empcode: singapore-refining-company empname:  Singapore Refining Company  estrategia:   rojas  

//     ████████████████████████████████████████████████████████████████████  /*  
               
//*/// ████████████████████████████████████████████████████████████████████
MARTES

ticket 105974: 252908 resuelto;
ticket 105973: 252851 resuelto;
ticket 252937: 105986 resuelto;
ticket 105987: 252938 resuelto;
ticket 105988: 212528 resuelto;
  82204--->(253388)  empcode:paperjam  empname: Paperjam   estrategia:   puente QA 
  150709--->(253396)  empcode:  parity-professionals-ltd empname:  Parity Professionals Ltd.   estrategia:   puente de QA  
  124185--->(253403)  empcode: park-hotel-vitznau empname: Park Hotel Vitznau   estrategia:   puente de QA  
 170968--->(253362)  empcode: multipharma empname: multipharma   estrategia:   puente de QA 
 169666--->(253367)  empcode: mvi-promotive  empname:  MVI PROMOTIVE   estrategia:   puente de QA  
 144161--->(253372)  empcode:  my-builder empname: my builder   estrategia:   puente de QA 
 169642 --->(1/3)  empcode: mydral empname: MYDRAL   estrategia:   puente de QA  
  143361--->(1/3)  empcode:  paladin-software empname:  Paladin Software   estrategia:   puente de QA 
 69861--->(1/3)  empcode: paris-jewellers empname: Paris Jewellers   estrategia:   puente de QA 

MIERCOLES

229485--->(migrated)  empcode:  empname:    estrategia:   rojas 
104158--->(migrated)  empcode: raffles  empname: Raffles
229436	--->(migrated)  empcode:  lingo-ace empname: LingoAce   estrategia:   rojas  
229070--->(migrated)  empcode:  empname:    estrategia:   rojas 
212411--->(migrado Reindexarlo mejor despues)
229166--->(migrated) 
229131--->(migrated)
228916--->(migrated) 
212521--->(migrated)

228587--->(1/3)	aztech-technologies	Aztech Technologies	Red
147023--->(1/3)  empcode:  particeep empname:  Particeep   estrategia:   puente de QA 
252633--->(1/3)  empcode:  empname:    estrategia:   rojas  
204220--->(1/3)  empcode:  empname:    estrategia:   rojas
228414--->(1/3) 
 
 JUEVES
    170657--->(253421)  empcode: pasarela empname: Pasarela   estrategia:   puente de QA 
   117740 --->(253408)  empcode:  partner-bank empname:  PARTNER BANK  estrategia:   puente de QA
   108466--->(253430)  empcode: sensu-a-s empname: sensu a/s   estrategia:   puente de QA 
 153971--->(1/3)  empcode: servelec-group empname:servelec group    estrategia:   puente de QA 
102527--->(1/3)  empcode:sfc  empname: CÔNG TY CỔ PHẦN NHIÊN LIỆU SÀI GÒN   estrategia:   puente de QA 
 166353--->(1/3)  empcode: sfglife empname: Sfglife   estrategia:   puente de QA 
127755 --->(253458)  empcode: severin empname:Severin Elektrogeräte GmbH    estrategia:   puente de QA
139497 --->rojas  agregado
184481--->(migrado)  empcode: epi-use empname: EPI-USE   estrategia:   rojas 
13372--->(migrated)  empcode: sembcorp-industries empname: Sembcorp Industries   estrategia:   rojas
69648--->(structured data)  empcode: accor-plus empname: Accor Plus   estrategia:   rojas
212073--->(migrated)  empcode:  nec-corporation empname: NEC Corporation   estrategia:   rojas  
194055--->(migrated)  empcode:wilmar  empname: Wilmar   estrategia:   rojas  
251523--->(migrated)  empcode:wilmar  empname: Wilmar   estrategia:   rojas

VIERNES:
190988--->(migrated)  empcode:wilmar  empname: Wilmar   estrategia:   rojas 
162208 --->(253475)  empcode:het-bemiddelingsbureau  empname: Het Bemiddelingsbureau   estrategia:   puente de QA 
159601--->(253497)  empcode: hetrecruitingkantoor empname:  HetRecruitingKantoor  estrategia:   puente de QA
134406    --->(253509)  empcode: hewlett-packard empname:  Hewlett Packard  estrategia:   puente de QA 
229026--->(migrated)  empcode:  jurong-engineering-limited empname: Jurong Engineering Limited   estrategia:   rojas  
187752--->(migrated)  empcode: trax empname: Trax   estrategia:   rojas  
228372--->(migrated)  empcode: trax empname: Trax   estrategia:   rojas
228510--->(migrated)  empcode: sunningdale-tech empname: Sunningdale Tech   estrategia:   rojas 
124987--->()  empcode: bw-group empname: BW Group   estrategia:   rojas 
145376--->()  empcode:	como-hotels-and-resorts  empname: COMO Hotels and Resorts    estrategia:   rojas  
212241--->(migrated)  empcode: singapore-national-eye empname: Singapore National Eye   estrategia:   rojas  
125002 --->(migrated)  empcode: kingsmen empname: Kingsmen   estrategia:   rojas
//     ████████████████████████████████████████████████████████████████████  /*  
                        PENDIENTES
                        
                        154930 quedo en wo
                        165305  puede ser china NO LA HICE
                        137622  NO TOCAR NO TIENE SELECTORES Y TIENE UN MSN RARO EN EL BOO2
                        162208
                        159601
                        
//*/// ████████████████████████████████████████████████████████████████████






229192	cloud4c-services	Cloud4C Services						Active	3*1	"The description of all jobs is less than 50 characters, indexing is not possible. 
edit feetcode, and edit status of company
jobsite:
https://cloudcserv.cloud4c.com/job/Senior-Anlayst-SOC/9182544/
"
54150	NewYork-Presbyterian/Queens	NewYork-Presbyterian/Queens						Active	1	[Salary and Benefit Strategi]  not found Salary or Benefit migrated to talent spider ok
126237								Active	3*1	[Salary and Benefit Strategi] 126237 not found Salary or Benefit
184825								Active	3*1	[Salary and Benefit Strategi] 184825 not found Salary or Benefit
211479								Active	1	[Salary and Benefit Strategi] 211479 not found Salary or Benefit, edit reqid
82537	memorial-sloan-kettering-cancer-center	Memorial Sloan Kettering Cancer Center						Active	1	[Salary and Benefit Strategi] 82537 not found Salary or Benefit, migrated to talent
252601										
253818		


// jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj /*
130857 feed code perdido  (1/3)  klinikum-osnabruck Klinikum Osnabrück
//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj

playstation  PlayStation 17931
[stratagy: feedcode inexistente, 29/07/2022 ] scanid(17931),
Migreted to talent
Changed status in Talent and Neuvo.
source_benefits(not info);,update exp jobs(y);
logo(ok);  ,scanid asociado (others inacitve) ,
-->status "Dinamic"(Active), 
RuntimeAvg:(extract) pagination(one page)
ppc(no),black list(no), clasification(ok)
//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
valor =1/3     [Salary and Benefit Strategi]  not found Salary or Benefit scanid(85087) reqid is extracted in jobdesc
//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
credit-suisse    Credit Suisse
valor = 1
[Salary and Benefit Strategi]scanid(121852)  not found Salary or Benefit 
clean wait in before jobdesc, clean wait in before pagination
was clean wait in config exp text, an reduce run time AVG
//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
valor =1

havas-group  Havas Group  176095

[Salary and Benefit Strategi]scanid(176095)  not found Salary or Benefit 
migrated to talent, clean waits in config,
//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
valor =1  201874  loblaw-optical-ppc   Loblaw Companies

[Salary and Benefit Strategi]scanid(201874)  not found Salary or Benefit 
migrated to talent, change status in talent and neuvoo
//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
valor =1 106033   university-of-rochester   University of Rochester


[Salary and Benefit Strategi 29/07/2022 ]scanid(106033)  not found Salary or Benefit
clean wait in config
//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
valor =1   109800  fao  FAO

[Salary and Benefit Strategi 29/07/2022 ]scanid(109800)  not found Salary or Benefit
some descriptions are losses, or less at 50 characters, edit format of date_posted
and dateclosed raw, add 0.
//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
valor =1   186914  birch-family-services
[Salary and Benefit Strategi 29/07/2022 ]scanid(186914)  not found Salary or Benefit  
edit source_jobtype, 
//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
valor =1    rising-ground  Rising Ground  204772


[Salary and Benefit Strategi 29/07/2022 ]scanid(204772)  not found Salary or Benefit 
migrated to talent, change status in talent and neuvoo Run time AVG: 1597.200 ms
//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
valor =1   218934  metro-north-railroad  Metro-North Railroad

[Salary and Benefit Strategi 29/07/2022 ]scanid(218934)  add source salary, not fount Benefit
claan three waits in config and reduce runtime avg :1039.400 ms
actualized logo of company
//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
valor = 1   justworks   Justworks  136357

[Salary and Benefit Strategi 29/07/2022 ]scanid(136357)  not found Salary or Benefit 
edit location, clean word remote and change for HQ, clean wait for text in config
//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
valor = 1/3   absolut-care   Absolut Care  140870

[Salary and Benefit Strategi 29/07/2022 ]scanid(140870)  not found Salary or Benefit
//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
valor =1  axa-equitable   Equitable  184826

[Salary and Benefit Strategi 29/07/2022 ]scanid(184826)  add source_benefit, only some 
descriptions have info extract in this,  not found Salary 
//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
valor =1   202486  Eaton  eaton


//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
valor =
//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
valor =
//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
valor =
//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
valor =1/3  202486

[Salary and Benefit Strategi 29/07/2022 ]scanid(202486)   not found salary or benefits
//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
valor =
//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
valor =
//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
valor =
//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
valor =
//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
valor =
//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
valor =
//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
valor =
//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
valor =
//*/ //v jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
valor =
//*/ //valor = valor =jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
valor =
//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
valor =
//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
valor =
//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
valor =
//*/ //valor = jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
valor =
//*/ // jjjjjjvalor =jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
valor =
//*/ // jjjjjjjjjjjjjvalor =jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
valor =
//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
valor =
//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
valor =
//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
valor =
//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
valor =
//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
valor =
//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
valor =
//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
valor =
//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
valor =
//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
valor =
//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
valor =
//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
valor =
//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
valor =
//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
valor =
//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
valor =
//*/ //valor = jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
valor =
//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
valor =
//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
valor =
//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
valor =
//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
valor =
//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
valor =
//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
v
//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj

//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj

//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj

//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj

//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj

//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj

//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj

//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj

//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj

//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj

//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj

//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj

//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj

//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj

//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj

//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj


//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj

//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj

//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj

//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj

//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj

//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj

//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj

//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj

//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj

//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj

//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj

//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj

//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj

//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj

//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj

//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj

//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj

//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj

//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj

//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj

//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj

//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj

//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj

//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj

//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj

//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj

//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj

//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj

//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj

//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj

//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj

//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj

//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj

//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj

//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj

//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj

//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj

//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj

//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj

//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj

//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj

//*/ // jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
20978   cambiar la paginacion do while por passit
172771
200081
212236
212622
212705
227422
227679
228231
228637
228684
228686
228693
228910
228940
229017
229164
229173
229242
229246
229249
229296
229309
229395
229434
229435
229453
229582
229660
229663