//Clase rudi

$job=array();

$job['temp']=1;
$job['title'] = trim((string) $j["title"]); 
$job['location'] = trim((string) $j["city"]); 
$job['url'] = trim((string) $j["url"]);







$city = trim((string) $j->city);
$state = trim((string) $j->state);
$country = trim((string) $j->country);
$arrloc=array();
if($city) $arrloc[] = $city;
if($state) $arrloc[] = $state;
if($country) $arrloc[] = $country;
$loc = implode(", ", $arrloc);
$job=array();
$job['temp']=1;
$job['title'] = (String) $j->title;
$job['html']  = (String) $j->body;
$job['jobdesc'] = $job['html'];
$job['location'] = $loc;
$job['source_jobtype'] = (String) $j->contract;
$job['url'] = (String) $j->url;
$job['source_empname'] = (String) $j->company;


