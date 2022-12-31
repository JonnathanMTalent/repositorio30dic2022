$job = array(); // job = []


$job['reqid'] = (String) $j["id"];
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
$state = trim((string) $j["region"]);
$country = trim((string) $j["country-name"]);

$arrloc = array();
if ($city) $arrloc[] = $city;
if ($state) $arrloc[] = $state;
if ($country) $arrloc[] = $country;
$loc = implode(", ", $arrloc); //var loc = arrloc.join(`, `)


$ob['source_benefit'] = (String) $j['beneficios'];


//PLANTILLA NUEVA LIMPIA

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



//otra forma

$job = array();
$title = (String) $j["title"];
if ($title != "") {
    $job['title'] = $title;
    $job['reqid'] = (String) $j["id"];
    // $job['title'] = (String) $j ["title"];
    $job['url'] = (String) $j["url"];
    $salary = (String) $j["salary"];
    if ($salary != "A COMBINAR") {
        $job['source_salary'] = $salary;
    }
    //A COMBINAR
    // $job['source_jobtype'] = (String) $j ["contract"];
    // $job['source_empname'] = (String) $j ["company"];
    //$job['source_benefit'] = (String) $j["beneficios"];
    if ((String) $j["beneficios"] != "Indefinido") {
        $job['source_benefit'] = strip_tags((String) $j["beneficios"]);
    }
    $job['html'] = (String) $j["content"];
    $job['jobdesc'] = strip_tags($job['html']);
    //content + experience + requirements + studies + escolaridade
    $type = (String) $j["contract"];
    if ($type != "") {
        $job['source_jobtype'] = $type;
    }

    $city = trim((string) $j["city"]);
    $state = trim((string) $j["region"]);
    $country = trim((string) $j["country"]);


    $arrloc = array();
    if ($city) $arrloc[] = $city;
    if ($state) $arrloc[] = $state;
    if ($country) $arrloc[] = $country;
    $loc = implode(", ", $arrloc);

    if ($loc != "") {
        $job['source_location'] = $loc;
        $job['location'] = $loc;
    } else {
        $job['source_location'] = "";
        $job['location'] = "HQ'S Company";
    }


    $job['dateposted_raw'] = (String) $j['date']; //Usamos explode que funciona como un split()
    $job['dateposted_raw'] = explode("/", $job['dateposted_raw']);
    $job['dateposted_raw'] = $job['dateposted_raw'][1].
    '/'.$job['dateposted_raw'][0].
    "/".$job['dateposted_raw'][2]; //en php se concatena con un . y no con un +
    $job['temp'] = 'Jonnathan Monroy';

}
