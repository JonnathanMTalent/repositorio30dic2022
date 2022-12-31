******xml en la herramienta de talent******
$city = trim((string) $j["city"]);
$state = trim((string) $j["state"]);
$country = trim((string) $j["country"]);

$arrloc=array();
if($city) $arrloc[] = $city;
if($state) $arrloc[] = $state;
if($country) $arrloc[] = $country;
$loc = implode(", ", $arrloc);

$job=array();
$job['title'] = trim((String) $j["title"]);
$job['location'] = $loc;
$job['source_city'] = $city;
$job['source_state'] = $state;
$job['source_country'] = $country;
$job['source_empname'] = trim((String) $j["company"]);
$job['source_salary'] = trim((String) $j["salary"]);
$job['source_jobtype'] = trim((String) $j["jobtype"]);
$job['url'] = trim((String) $j["url"]);
$job['reqid'] = (String) $j["referencenumber"];
$job['experience_required'] = trim((String) $j["experience"]);

$jobdate = trim((String) $j["date"]);
$valores = explode(' ', $jobdate);
$month = $valores[2];
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
$date = $month."/".$valores[1]."/".$valores[3];
$job['dateposted_raw'] = $date; 

//$job['client_tag'] = (String) $j["category"];
//$job['job_pixel'] = trim((String) $j["tracking_url"]);
//$ppc = trim((String) $j["sponsored"]);
//$ppc = str_replace('sponsored', '', $ppc);
//$job['source_ppc'] = trim($ppc)*100;
$job['html'] = (String) $j["description"];
$job['html'] = explode('Apply if',$job['html'])[0];
$job['html'] = explode('process by emailing',$job['html'])[0];
$job['jobdesc'] = strip_tags($job["html"]);
$job['temp']=1;
//$job['jobid'] = md5($job['title'].$job['location'].$job['source_city'].$job['source_state'].$job['source_country'].$job['source_empname'].$job['source_salary'].$job['source_jobtype'].$job['reqid'].$job['experience_required'].$job['client_tag'].$job['job_pixel'].$job['source_ppc'].$job['jobdesc'].$job['temp']);
//printDebug($job);
//printDebug($job);