$job = array(); // job = []


// $job['reqid'] = (String) $j ["job_reference"];
$job['title'] = (String) $j ["title"]; //job.title = elem.querySelector(`a`).textContent.trim()
$job['url'] = (String) $j ["url"];
$job['source_location'] = (String) $j["location"]; //¿Es necesario? 
$job['location'] = (String) $j["location"];
$job['source_empname'] = (String) $j ["company"];
$job['html'] = (String) $j["description"]; //Se pone html o jobdes? 
$job['jobdesc'] = (String) $j["description"];
$job['source_jobtype'] = (String) $j ["contracttype"];
$job['source_salary'] = (String) $j ["salary"];
$job['dateposted_raw'] = (String) $j ['date']; //Usamos explode que funciona como un split()
$job['dateposted_raw'] = explode("/", $job['dateposted_raw']);
$job['dateposted_raw'] = $job['dateposted_raw'][1].'/'.$job['dateposted_raw'][0]."/".$job['dateposted_raw'][2]; //en php se concatena con un . y no con un +

// $job['temp'] = 'Juan Bermudez';

// $city = trim((string) $j["city"]);
// $state = trim((string) $j ["state"]);
// $country = trim((string) $j ["country"]);


// $arrloc = array();
// if ($city) $arrloc[] = $city;
// if ($state) $arrloc[] = $state;
// if ($country) $arrloc[] = $country;
// $loc = implode(", ", $arrloc);


// $ob['experience_required'] = (String) $j ['experience'];
// $ob['source_salary'] = (String) $j ['salary'];


// $job['html'] = (String) $j ["body"];
// $job['jobdesc'] = $job['html'];



// $dateposted_raw = trim((String) $j["date"]);

// $job['dateposted_raw'] = date_create($dateposted_raw);
// $job['dateposted_raw'] = date_format($job['dateposted_raw'], "m/d/Y");


ORGANIZAR FECHA 

$date_posted = trim($j['date']);
$date_in_array = explode('/', $date_posted);
$job['dateposted_raw'] = trim($date_in_array[1].
    '/'.$date_in_array[0].
    '/'.$date_in_array[2]);

CUANDO TIENE LA T EN LA FECHA
    $job['dateposted_raw'] = trim((String) $j["date"]);

    $job['dateposted_raw']= explode('T', $job['dateposted_raw'])[0];
    $date_in_array = explode('-', $job['dateposted_raw']);
    $job['dateposted_raw'] = trim($date_in_array[1].
        '/'.$date_in_array[2].
        '/'.$date_in_array[0]);


