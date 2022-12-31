$title = trim((String) $j["title"]);
$city = trim((string) $j["region"]);
$state = trim((string) $j["state"]);
$country = trim((string) $j["country-name"]);

$id = (String) $j["tag"];
//$empname = (String) $j["company"];

//if($empname == "Eminent Groep"){

$arrloc=array();
if($city) $arrloc[] = $city;
if($state) $arrloc[] = $state;
if($country) $arrloc[] = $country;
$loc = implode(", ", $arrloc); // -- Join en JS

//$pos = strpos($title, "j");


//if($pos == false){


$job=array();
$job['temp'] = "test_04122019";
$job['title'] = $title;
$job['html']  = (String) $j["description"];
$job['jobdesc'] = strip_tags($job['html']);
$job['location'] = trim($loc);
$job['url'] = trim((String) $j["link"]);


//$job['reqid']  = explode("/offre/",$job['url'])[1];
//$job['reqid']  = explode("/",$job['reqid'])[0];
$job['reqid']  = $id;

$salary = trim((String) $j["salary"]);

if($salary != ""){

  $job['source_salary'] = trim((String) $j["salary"]);

}


$jobtype = trim((String) $j["contract-type"]);

if($jobtype != ""){

  $job['source_jobtype'] = trim((String) $j["contract-type"]);
}

//$job['experience_required'] = trim((String) $j["experience"]);
$job['source_location'] = trim((String) $j["location"]);

$job['dateposted_raw']  = (String) $j["pubDate"];
$date = explode("-",$job['dateposted_raw']);

$day = $date[2];
$month = $date[1];
$year = $date[0];


/*$job['dateposted_raw'] = explode(" ",$job['dateposted_raw']);

$day = $job['dateposted_raw'][1];
$month = $job['dateposted_raw'][2];
$year = $job['dateposted_raw'][3];*/


/*if($month == "Oct"){
  $month = "10";
}


if($month == "Nov"){
  $month = "11";
}


if($month == "Dec"){
  $month = "12";
}*/

$job['dateposted_raw'] = $month . "/" . $day . "/" . $year;
//$job['source_empname'] = $empname;

/*}else{


}*/
//$job['logo'] = trim((String) $j["employerLogo"]);

/*foreach($locs as $locs1) {
    foreach($titles as $titles1) {
        $jobx = array();
        $jobx['title'] = $titles1;
        $jobx['location'] = $locs1;
        if ($jobx['location'] === ''|| $job['location'].length < 1) {
            $jobx['location'] = 'FR';
        }
        $jobx['source_location'] = $locs1;
        $jobx['source_jobtype'] = $job['source_jobtype'];
        $jobx['source_empname'] = $job['source_empname'];
        $jobx['url'] = $job['url'];
        $jobx['html'] = $job['html'];
        $jobx['jobdesc'] = $job['jobdesc'];
        $jobx['temp'] = $job['temp'];

        $jobx['dateposted_raw'] = $job['dateposted_raw'];
        $jobx['logo'] = $job['logo'];

        $multi_jobs[] = $jobx;
    }
}*/