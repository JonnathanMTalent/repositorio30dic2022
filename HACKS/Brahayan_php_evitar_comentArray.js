$city = trim((string) $j["city"]);
$state = trim((string) $j["state"]);
$country = trim((string) $j["country"]);
$arrloc=array();
if($city) $arrloc[] = $city;
if($state) $arrloc[] = $state;
if($country) $arrloc[] = $country;
// Delete positions that includes "Array"
foreach($arrloc as $key => $validate){
    if(trim($validate)==="Array"){
        unset($arrloc[$key]);
    }
}
$loc = implode(", ", $arrloc);
$job=array();
$job['temp']="1";
$job['title'] = trim((String) $j["title"]);
$job['html'] = (String) $j["description"];
$job['jobdesc'] = strip_tags($job['html']);
$job['location'] = $loc;
$job['source_city'] = $city;
$job['source_state'] = $state;
$job['source_country'] = $country;
$job['source_jobtype'] = trim((String) $j["jobtype"]);
$job['url'] = trim((String) $j["url"]);
$job['source_ppc'] = trim((String) $j["cpc"]);
$job['job_pixel'] = trim((String) $j["tracking_url"]);
$job['source_salary'] = trim((String) $j["salary"]);
$job['source_empname'] = trim((String) $j["company"]);
/*$experience_required = trim((String) $j["job_experience"]);
$job['experience_required'] = ($experience_required) ? "Experience ".$experience_required : '';*/
$job['reqid'] = trim((String) $j["referencenumber"]);
$job['client_tag'] = trim((string) $j["sponsored"]);
$job['logo'] = trim((string) $j["company_logo"]);
$job['source_apply_email '] = trim((string) $j["applyemail "]);
/*$fecha = (String) $j->date;
$job['dateposted_raw'] = date("m/d/Y", strtotime($fecha));*/
//printDebug($j);
// Replace "Array" in variables that include it
foreach($job as $key => $validate){
    if(trim($validate)==="Array"){
        $job[$key]="";
    }
}