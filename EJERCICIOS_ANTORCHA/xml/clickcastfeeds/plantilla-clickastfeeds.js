$job = array(); // job = []


$job['title'] = (String) $j["title"]; //job.title = elem.querySelector(`a`).textContent.trim()
$job['url'] = (String) $j["url"];
$job['reqid'] = (String) $j["job_reference"];
$job['source_location'] = (String) $j["location"]; //¿Es necesario? 
$job['location'] = (String) $j["location"];
$job['source_empname'] = (String) $j ["company"];
$job['html'] = (String) $j["body"]; //Se pone html o jobdes? 
$job['jobdesc'] = strip_tags($job['html']); 

$type = (String) $j["job_type"];
if($type !=""){
    $job['source_jobtype'] = $type;
}

$job['dateposted_raw'] = (String) $j['posted_at']; //Usamos explode que funciona como un split()
$job['dateposted_raw'] = explode("-", $job['dateposted_raw']);
$job['dateposted_raw'] = $job['dateposted_raw'][1].
'/'.$job['dateposted_raw'][2].
"/".$job['dateposted_raw'][0]; //en php se concatena con un . y no con un +

$job['temp'] = 'Jonnathan 546546';



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
