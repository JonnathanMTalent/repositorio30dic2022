

$job=array();
$job['temp']="test_01112019";
$job['title'] = (String) $j->title; 
//$job['html']  = (String) $j->description;
//$job['jobdesc'] = $job['html'];
$job['location'] = (String) $j->category. ', CA.';
$job['dateposted_raw'] = (String) $j->pubDate;
$job['url'] = (String) $j->link;
$job['source_empname'] = (String) $j->author;
///////////////////////////////////QUICK APPLY CONTENT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
/*$pattern = '/[a-z0-9_\-\+\.]+@[a-z0-9\-]+\.([a-z]{2,4})(?:\.[a-z]{2})?/i';
preg_match($pattern, $job['html'], $matches);
$pattern2 = '/CV|resume|cover letter|curriculum/i';
preg_match($pattern2, $job['html'], $matches_resume);
if(strlen($matches[0]) > 0 && strlen($matches_resume[0]) > 0)
{
  $job['source_apply_email'] = $matches[0];
}*/


/////////////////////////////////DO NOT DELETE, DO NOT TOUCH, DO NOT MODIFY WITHOUT ASKING!!!!!!!!!!!!!!!!!!!!!
