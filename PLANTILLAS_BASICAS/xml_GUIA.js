// plantilla limpia

$job = array(); // job = []


$job['title'] = (String) $j[""]; //job.title = elem.querySelector(`a`).textContent.trim()
$job['url'] = (String) $j[""];
$job['reqid'] = (String) $j[""];
$job['source_location'] = (String) $j[""]; //¿Es necesario? 
$job['location'] = (String) $j[""];
$job['source_empname'] = (String) $j [""];
$job['html'] = (String) $j[""]; //Se pone html o jobdes? 
$job['jobdesc'] = strip_tags($job['html']); 

$type = (String) $j[""];
if($type !=""){
    $job[''] = $type;
}

$job['dateposted_raw'] = (String) $j['']; //Usamos explode que funciona como un split()
$job['dateposted_raw'] = explode("-", $job['dateposted_raw']);
$job['dateposted_raw'] = $job['dateposted_raw'][2].
'/'.$job['dateposted_raw'][1].
"/".$job['dateposted_raw'][0]; //en php se concatena con un . y no con un +

$job['temp'] = 'Jonnathan 546546';




//plantilla 2


$job = array(); // job = []


$job['reqid'] = (String) $j[""];
$job['title'] = (String) $j["title"]; //job.title = elem.querySelector(`a`).textContent.trim()
$job['url'] = (String) $j["url"];
$job['html'] = (String) $j[""]; //Se pone html o jobdes? 
$job['jobdesc'] = (String) $j["description"];


$salary = (String) $j[""];
$type = (String) $j[""];

if ($salary != "") {
    $job[''] = $salary;
}
if($type !=""){
    $job[''] = $type;
}

$job['dateposted_raw'] = (String) $j['']; //Usamos explode que funciona como un split()
$job['dateposted_raw'] = explode("/", $job['dateposted_raw']);
$job['dateposted_raw'] = $job['dateposted_raw'][1].
'/'.$job['dateposted_raw'][2].
"/".$job['dateposted_raw'][0]; //en php se concatena con un . y no con un +
$job['temp'] = 'jonnathan 564546';



$city = trim((string) $j["region"]);
$state = trim((string) $j["state"]);
$country = trim((string) $j["country-name"]);

$arrloc = array();
if ($city) $arrloc[] = $city;
if ($state) $arrloc[] = $state;
if ($country) $arrloc[] = $country;
$loc = implode(", ", $arrloc); //var loc = arrloc.join(`, `)

$job["location"] = $loc;
$job["source_location"] = $loc;



// tercera plantilla

$job = array(); // job = []


$job['reqid'] = (String) $j["reqid"];
$job['title'] = (String) $j["title"]; //job.title = elem.querySelector(`a`).textContent.trim()
$job['url'] = (String) $j["url"];



$salary = (String) $j["salary"];
$patrón = '/[0-9]/';
preg_match($patrón, $salary, $coincidencias, PREG_OFFSET_CAPTURE);
if ($coincidencias != "") {
    $salary = str_replace("A COMBINAR", "", $salary);
    $job['source_salary'] = $salary;

}

$type = (String) $j["contract"];
if ($type != "") {
    $job['source_jobtype'] = $type;
}


$job['dateposted_raw'] = (String) $j['date']; //Usamos explode que funciona como un split()
$job['dateposted_raw'] = explode("/", $job['dateposted_raw']);
$job['dateposted_raw'] = $job['dateposted_raw'][1].
'/'.$job['dateposted_raw'][0].
"/".$job['dateposted_raw'][2]; //en php se concatena con un . y no con un +

$job['temp'] = 'Jonnathan 46464133';



$city = trim((string) $j["city"]);
$state = trim((string) $j["state"]);
$country = trim((string) $j["country"]);

$arrloc = array();
if ($city) $arrloc[] = $city;
if ($state) $arrloc[] = $state;
if ($country) $arrloc[] = $country;
$loc = implode(", ", $arrloc); //var loc = arrloc.join(`, `)


$ob['source_benefit'] = (String) $j[''];



// cuarta plantilla


$city = trim((string) $j["city"]);
$city = str_replace('', '', $city);
$country = trim((string) $j["country"]);

$arrloc = array();
if ( $j['ref']!='') {
    if ($city) $arrloc[] = $city;
    if ($country) $arrloc[] = $country;
    $loc = implode(", ", $arrloc);

    if ($city || $country) {

        $job = array();

        $job['title'] = trim((String) $j["title"]);
        $job['location'] =trim(String) $j['location'];
        $job['source_location'] = $loc;

        if ($city) $job['source_city'] = $city;
        if ($country) $job['source_country'] = $country;
        if ($loc == "Washington") {
            $job['location'] = ",";
            $job['source_city'] = "";
            $job['source_state'] = " ";
            $job['source_country'] = "";
        }
        if ($loc == "Bedford") {
            $job['location'] = "";
            $job['source_city'] = "";
            $job['source_country'] = "";
        }
        $job['dateposted_raw'] = trim((String) $j["date"]);
        $job['dateposted_raw'] = explode("T", $job['dateposted_raw']);
        $job['dateposted_raw'] = $job['dateposted_raw'][0];
        $job['dateposted_raw'] = explode("-", $job['dateposted_raw']);
        $job['dateposted_raw'] = $job['dateposted_raw'][1].
        "/".$job['dateposted_raw'][2].
        "/".$job['dateposted_raw'][0];

        $job['source_empname'] = trim((String) $j[""]);
        $job['source_jobtype'] = trim((String) $j[""]);
        $job['url'] = trim((String) $j["url"]);
        $job['reqid'] = $j['referencenumber'];
        //printDebug($j['@attributes']{'id'});
        $job['html'] = (String) $j["description"];
        $job['jobdesc'] = strip_tags($job["html"]);
        $benefit = explode("Advantages", $job["jobdesc"]);
        $job["source_benefit"] = end($benefit);
        $job['temp'] = '2022';
    }
} else {
    $city = trim((string) $j["city"]);
}


LIMPIAR NUMEROS
$job['location'] = preg_replace('/[0-9]+/', '', $job['location']);

INDEX OF Y REEMPLAZAR
if(strpos($job['location'], "Département")!== false){$job['location'] = "Département, FR";}