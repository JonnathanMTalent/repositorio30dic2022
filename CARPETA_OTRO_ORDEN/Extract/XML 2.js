// Indexar XML

//https://iworkfor.nsw.gov.au/jobs/all-keywords/all-agencies/all-organisations--entities/all-categories/all-locations/all-worktypes

//http://boo.neuvoo.com/boo3-web/qa/app/index.php?empcode=nsw-government&scanid=25864



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



//Xml con fecha

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

$jobdate = trim((String) $j->date);
$jobdate = explode(' ', $jobdate);
$month = $jobdate[2];

    if(strpos($month, "Jan")!== false){$month = "01";}
    if(strpos($month, "Feb")!== false){$month = "02";}
    if(strpos($month, "Mar")!== false){$month = "03";}
    if(strpos($month, "Apr")!== false){$month = "04";}
    if(strpos($month, "May")!== false){$month = "05";}
    if(strpos($month, "Jun")!== false){$month = "06";}
    if(strpos($month, "Jul")!== false){$month = "07";}
    if(strpos($month, "Aug")!== false){$month = "08";}
    if(strpos($month, "Sep")!== false){$month = "09";}
    if(strpos($month, "Oct")!== false){$month = "10";}
    if(strpos($month, "Nov")!== false){$month = "11";}
    if(strpos($month, "Dec")!== false){$month = "12";}

$date = $month.'/'.$jobdate[1].'/'.$jobdate[3];

$job['dateposted_raw'] = $date;

//$job['source_city'] = $city;
//$job['source_state'] = $state;
//$job['source_country'] = $country;
$job['location'] = $loc;
//$multilocation = "-";
$job['source_jobtype'] = (String) $j->contract;
$job['url'] = (String) $j->url."?utm_source=neuvoo";
$job['source_empname'] = (String) $j->company;
$job['source_salary'] =  (String) $j->salary;
//print_r($job['dateposted_raw']."\n");



//Xml extrayendo fecha

//http://boo1.neuvoo.com/xml-spiders/view/xml-spider2.php?style=dark&id=186477

$job['url'] = trim((String) $j->url)."?utm_source=neuvoo&utm_medium=cpc";
$job['html'] = (String) $j->description;
$job['html'] = explode('How To Apply',$job['html'])[0]; 
$job['html'] = explode('How to Apply',$job['html'])[0];
$job['html'] = explode('Apply',$job['html'])[0];

$job['jobdesc'] = strip_tags($job["html"]);
//$job['client_tag'] = trim((String) $j->category);
//$job['dateposted_raw'] = trim((String) $j->date);
$jobdate = trim((String) $j->date);
$date = date('m/d/Y', strtotime($jobdate));

echo $date;
$job['dateposted_raw'] = $date;
//$multilocation = "caracter_divisor";
$job['source_city'] = $city;
$job['source_state'] = $state;
$job['source_country'] = $country;
print_r($job);



//Otro xml

//http://boo.neuvoo.com/boo3-web/qa/app/index.php?empcode=workclass-sg&scanid=189767



$city = trim((string) $j->city);
$state = trim((string) $j->state);
$country = trim((string) $j->country);

$arrloc = array();
if($city) $arrloc[] = $city;
if($state) $arrloc[] = $state;
if($country) $arrloc[] = $country;
$loc = implode(", ", $arrloc);
if(trim($loc)==='') $loc = 'Singapore';

$job = array();

$job['title'] = trim((String) $j->title);
$job['title'] = {{1F9B9}\x{1F9C0}-\x{1F9C2}\x{1F9D0}-\x{1F9FF}]/u', '', $job['title']);
$job['title'] = array_shift(explode('(', $job['title']));
$job['title'] = array_shift(explode('“', $job['title']));
$job['title'] = array_shift(explode('$', $job['title']));

$job['location'] = $loc;
$job['url'] = (String) $j->url;

$datepost = trim((String) $j->dateposted);
$datepost = explode(' ', $datepost)[0];
$datepost = explode('-', $datepost);
$job['dateposted_raw'] = $datepost[1].'/'.$datepost[2].'/'.$datepost[0];

//$job['source_jobtype'] = trim((String) $j->category[0]);
$job['source_empname'] = trim((String) $j->company);
$job['source_salary'] = trim((String) $j->salary);

$job['html']  = (String) $j->description;
$job['html'] = array_shift(explode('Email your updated resume in ', $job['html']));
$job['html'] = array_shift(explode('Email to:', $job['html']));
$job['html'] = array_shift(explode('https:', $job['html']));
$job['html'] = array_shift(explode('OR Whatsapp', $job['html']));
$job['html'] = array_shift(explode('OR WhatsApp', $job['html']));
$job['html'] = array_shift(explode('HOW TO APPLY', $job['html']));
$job['html'] = array_shift(explode('Interested candidates', $job['html']));

$replace = array('&nbsp;', '&amp;');
$job['html'] = str_replace($replace, '', $job['html']);
$job['jobdesc'] = strip_tags($job["html"]);

$job['temp']=1123;
//print_r($job);
//$job['logo'] = trim((String) $j->logo);
//$job['html'] = trim((String) $j->description);
//$job['jobdesc'] = strip_tags($job['html']);




//XML con multilocation
//URL: https://stellenmarkt.agrajo.com/jobsearch/exports/agrajo-vm1
$city = trim((String) $j->kategorisierung->bundeslaender->bundesland); 
$country = trim((String) $j->kategorisierung->einsatzlaender->einsatzland);
$arrloc=array();
/*if($city) $arrloc[] = $city;
  if($country) $arrloc[] = $country;
  $loc = implode(", ", $arrloc);*/
$arrexp=array();
$conta = 0;
foreach($j->kategorisierung->erfahrungen->erfahrung as $exp){
  $v_funzioni = $exp;
  $arrexp[] = $v_funzioni;
  $conta++;
}  
$exp = implode(", ", $arrexp);
$longaux=explode("bundesland",trim((String)$j->kategorisierung->bundeslaender));
if($j->kategorisierung->bundeslaender->bundesland){
  $contl = 0;   
  foreach($j->kategorisierung->bundeslaender->bundesland as $loc){
    $v_funzioni_loc = $loc.", ".$country;
    $arrloc[] = $v_funzioni_loc;
    $contl++;
  }  
  $loc = implode("/", $arrloc);
}else{
  if($city) $arrloc[] = $city;
  if($country) $arrloc[] = $country;
  $loc = implode(", ", $arrloc);
}
$job=array();
$job['title'] = trim((String) $j->titel);
$job['url'] = trim((String) $j->link)."&utm_source=talent.com";
$job['location'] = $loc;    
//$multilocation = "/";
$job['source_city'] = $city;     
//$job['source_state'] =  $state;
$job['source_country'] = $country;
$job['source_empname'] = trim((String) $j->firma);
$job['logo'] = trim((String) $j->logos -> logo);
$job['reqid'] = trim((String) $j->id);
//$job['client_tag'] = trim((String) $j->category);
$job['source_jobtype'] = trim((String) $j->kategorisierung->anstellungsarten->anstellungsart);
$job['experience_required'] = $exp;
$desc0 = trim((string) $j->volltext);
$desc0 = explode("Für Rückfragen",$desc0)[0];
$desc0 = explode("Sie sich bitte an:",$desc0)[0];
$desc1 = trim((string) $j->kategorisierung->aufgabeText);
$desc2 = trim((string) $j->kategorisierung->qualifikationText);
$arrhtml=array();
if($desc0) $arrhtml[] = $desc0;
if($desc1) $arrhtml[] = $desc1;
if($desc2) $arrhtml[] = $desc2;
$html = implode("</br></br>", $arrhtml);
$job['html'] = $html;
$job['jobdesc'] = strip_tags($job["html"]);
$job['temp']="3"; //Jetzt bewerbenAnne Looff+49 4445 897-222285
if(strpos($job['location'], "/")!==false){
    $multi_location = explode("/", $job['location']);
    foreach($multi_location as $locs){
      $jobx = array();
      $jobx['temp']           = $job['temp'];
      $jobx['title']          = $job['title'];
      $jobx['reqid']          = $job['reqid'];
      $jobx['html']           = $job['html'];
      $jobx['jobdesc']        = $job['jobdesc'];
      $jobx['location']       = $locs;
      $sources = explode(",",$jobx['location']);
      if(count($sources)==2){
        $jobx['source_city']    = $sources[0];
        $jobx['source_country'] = $sources[1];
      }
      if(count($sources)==3){
        $jobx['source_city']    = $sources[0];
        $jobx['source_state']   = $sources[1];
        $jobx['source_country'] = $sources[2];
      }
      $jobx['experience_required']  = $job['experience_required'];
      $jobx['source_jobtype'] = $job['source_jobtype'];
      $jobx['url']            = $job['url'];
      $jobx['source_empname'] = $job['source_empname'];
      $jobx['logo']   = $job['logo'];
      $multi_jobs[] = $jobx;
    }
  }
  else{
    $multi_jobs[] = $job;
  }







  ------------------------------
  
$city = trim((string) $j->children('job', true)->location->municipality);
//$state = trim((string) $j->state);
//$country = trim((string) $j->country);
$arrloc=array();
if($city) $arrloc[] = $city;
$loc = implode(", ", $arrloc);
$job=array();
$job['temp'] = 1;
$job['title'] = (String) $j->title;
$job['html'] = (String) $j->content;
$job['jobdesc'] = strip_tags($job['html']);
$job['location'] = $loc;
$job['dateposted_raw'] = explode('T',(String) $j->updated)[0];
$job['dateposted_raw'] = date("m/d/Y", strtotime($job['dateposted_raw']));
$job['url'] = trim((String) $j->link[@href]);
$job['reqid'] = trim((String) $j[@id]);
//$job['source_jobtype'] = trim((string) $j->children('job', true)->contracttype);
//echo 'einer';
$job['url'] = filter_var($job['url'], FILTER_SANITIZE_URL);
if (!filter_var($job['url'], FILTER_VALIDATE_URL) === false) {
  $multi_jobs[] = $job;
  //Replicaciones  City and ID
  if($job['location']=='Montreal, Canada'){
    $array=['Programmer','Developer','Engineer'];
    $jobx = array();
    for ($i = 0; $i <  $array; ++$i){
      $jobx['temp'] = $job['temp'];
      $jobx['title'] = $array[$i];//new titles
      $jobx['html'] = $job['html'];
      $jobx['jobdesc'] = $job['jobdesc'];
      $jobx['location'] = 'Florida. US';
      $jobx['dateposted_raw'] = $job['dateposted_raw'];
      $jobx['url'] = $job['url'];
      $jobx['reqid'] = $job['reqid'];
      $multi_jobs[] = $jobx;
    }
  }
  if($job['location']=='New England, Canada'){
    $array=['Analist','Administrator','DBA'];
    $jobx = array();
    for ($i = 0; $i <  $array; ++$i){
      $jobx['temp'] = $job['temp'];
      $jobx['title'] = $array[$i];//new titles
      $jobx['html'] = $job['html'];
      $jobx['jobdesc'] = $job['jobdesc'];
      $jobx['location'] = 'Indiana, US';
      $jobx['dateposted_raw'] = $job['dateposted_raw'];
      $jobx['url'] = $job['url'];
      $jobx['reqid'] = $job['reqid'];
      $multi_jobs[] = $jobx; 
    }
  }
  if($job['reqid']==21){
    $array=['Florida. US','Idaho, US','Washintong, US'];
    $jobx = array();
    for ($i = 0; $i <  $array; ++$i){
      $jobx['temp'] = $job['temp'];
      $jobx['title'] = 'System Administrator';
      $jobx['html'] = $job['html'];
      $jobx['jobdesc'] = $job['jobdesc'];
      $jobx['location'] = $array[$i];//new locations
      $jobx['dateposted_raw'] = $job['dateposted_raw'];
      $jobx['url'] = $job['url'];
      $jobx['reqid'] = $job['reqid'];
      $multi_jobs[] = $jobx;
    }
  }
  if($job['reqid']==18){
    $array=['Indiana, US','Montana, US','Pensylvabi, US'];
    $jobx = array();
    for ($i = 0; $i <  $array; ++$i){
      $jobx['temp'] = $job['temp'];
      $jobx['title'] = 'System Engineer';
      $jobx['html'] = $job['html'];
      $jobx['jobdesc'] = $job['jobdesc'];
      $jobx['location'] = $array[$i];//new locations
      $jobx['dateposted_raw'] = $job['dateposted_raw'];
      $jobx['url'] = $job['url'];
      $jobx['reqid'] = $job['reqid'];
      $multi_jobs[] = $jobx; 
    }
  }
  if($job['reqid']==25){
    $array=['Florida, US','Indiana, US','Idah, US'];
    $jobx = array();
    for ($i = 0; $i <  $array; ++$i){
      $jobx['temp'] = $job['temp'];
      $jobx['title'] = 'Database Administrator';
      $jobx['html'] = $job['html'];
      $jobx['jobdesc'] = $job['jobdesc'];
      $jobx['location'] = $array[$i];//new locations
      $jobx['dateposted_raw'] = $job['dateposted_raw'];
      $jobx['url'] = $job['url'];
      $jobx['reqid'] = $job['reqid'];
      $multi_jobs[] = $jobx;
    }
  }
} else {
  echo(" no es una URL valida");
}