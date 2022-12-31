//Url: https://iworkfor.nsw.gov.au/jobs/all-keywords/all-agencies/all-organisations--entities/all-categories/all-locations/all-worktypes

$city = trim((string) $j->location->region);
$state = trim((string) $j->location->state);
$country = trim((string) $j->location->country);

$arrloc=array();
if($city) $arrloc[] = $city;
if($state) $arrloc[] = $state;
if($country) $arrloc[] = $country;
$loc = implode(", ", $arrloc);

$job=array();
$job['temp']=2;
$job['title'] = (String) $j->title;
$job['html'] = (String) $j->description;
$job['jobdesc'] = strip_tags($job['html']);//strip_tags(); limpia las etiquetas de html
//$job['source_city'] = $city;
//$job['source_state'] = $state;
//$job['source_country'] = $country;
$job['location'] = $loc;
$multilocation = "-";
$job['source_jobtype'] = (String) $j->contract;
$job['url'] = (String) $j->url."?utm_source=neuvoo";
$job['source_empname'] = (String) $j->company;
$job['source_salary'] =  (String) $j->salary;
 //print_r($job['url']."\n");



 //RemoveTextAfter
if(strpos($job['html'], 'How to Apply')>-1){
    $htmltmp = explode("How to Apply", $job['html']);
    $job['html'] = $htmltmp[0];
}



$job['html'] = array_shift(explode('Interested candidates', $job['html']));

//Para remplazar datos

$search  = array('health.nsw.gov.au', 'https : / / visitwagga.com /', 'http : / / www.', 'ww', '/', 'http', 'default.aspx');
$replace = array('', '', '', '', '', '', '');
$job['html'] = str_replace($search, $replace, $job['html']);



$job['location'] = str_replace(",,", "", $job['location']);
$job['location'] = str_replace(", ,", "", $job['location']);


En boo3.1 -> job.reqid 
En xml-spider-> $job['reqid'] = (String) $j->referencenumber;



// Pra limpiar la descripción

$job['html'] = str_replace("/&amp;/g", "&", $job['html']); 		 

$job['html'] = preg_replace('/Schicke eine WhatsApp an 0176 611 69744|Rufe uns an : 0711-658 692 00/i', "", $job['html']);

if(strpos($job['html'], 'Please send us your application via email.')!==false ){
  $job['html']= explode ('Please send us your application via email.', $job['html'])[0];
}  
if(strpos($job['html'], 'Please send us your application via email')!==false ){
  $job['html']= explode ('Please send us your application via email', $job['html'])[0];
} 
