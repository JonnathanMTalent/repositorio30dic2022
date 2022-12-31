$job = array(); // job = []


$job['reqid'] = (String) $j["tag"];
$job['title'] = (String) $j["title"]; //job.title = elem.querySelector(`a`).textContent.trim()
$job['url'] = (String) $j["link"];
$job['html'] = (String) $j["description"]; //Se pone html o jobdes? 
$job['jobdesc'] = (String) $j["description"];


$salary = (String) $j["salary"];
$type = (String) $j["contract-type"];

if ($salary != "") {
    $job['source_salary'] = $salary;
}
if($type !=""){
    $job['source_jobtype'] = $type;
}

$job['dateposted_raw'] = (String) $j['pubDate']; //Usamos explode que funciona como un split()
$job['dateposted_raw'] = explode("-", $job['dateposted_raw']);
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



// PLANTILLA LIMPIA

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