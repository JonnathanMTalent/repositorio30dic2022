$city = trim((string) $j["city"]);
$city = str_replace('AtlanticBeach', 'Atlantic Beach', $city);
$country = trim((string) $j["region"]);

$arrloc = array();
if ( $j['referencenumber']!='2851753_A') {
    if ($city) $arrloc[] = $city;
    if ($country) $arrloc[] = $country;
    $loc = implode(", ", $arrloc);

    if ($city || $country) {

        $job = array();

        $job['title'] = trim((String) $j["title"]);
        $job['location'] = $loc;
        $job['source_location'] = $loc;

        if ($city) $job['source_city'] = $city;
        if ($country) $job['source_country'] = $country;
        if ($loc == "Washington") {
            $job['location'] = "Washington, District of Columbia, US";
            $job['source_city'] = "Washington";
            $job['source_state'] = "District of Columbia";
            $job['source_country'] = "US";
        }
        if ($loc == "Bedford") {
            $job['location'] = "Bedford, US";
            $job['source_city'] = "Bedford";
            $job['source_country'] = "US";
        }
        $job['dateposted_raw'] = trim((String) $j["date"]);
        $job['dateposted_raw'] = explode("T", $job['dateposted_raw']);
        $job['dateposted_raw'] = $job['dateposted_raw'][0];
        $job['dateposted_raw'] = explode("-", $job['dateposted_raw']);
        $job['dateposted_raw'] = $job['dateposted_raw'][1].
        "/".$job['dateposted_raw'][2].
        "/".$job['dateposted_raw'][0];

        $job['source_empname'] = trim((String) $j["company"]);
        $job['source_jobtype'] = trim((String) $j["jobtype"]);
        $job['url'] = trim((String) $j["url"]);
        $job['reqid'] = $j['referencenumber'];
        //printDebug($j['@attributes']{'id'});
        $job['html'] = (String) $j["description"];
        $job['jobdesc'] = strip_tags($job["html"]);
        $benefit = explode("Advantages", $job["jobdesc"]);
        $job["source_benefit"] = end($benefit);
        $job['temp'] = '2022';
    }
} else {
    $city = trim((string) $j["city"]);
}