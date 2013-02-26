<?php
function count_format($n, $point='.', $sep=',') {
    if ($n < 0) {
        return 0;
    }

    if ($n < 10000) {
        return number_format($n, 0, $point, $sep);
    }

    $d = $n < 1000000 ? 1000 : 1000000;

    $f = round($n / $d, 1);

    return number_format($f, $f - intval($f) ? 1 : 0, $point, $sep) . ($d == 1000 ? 'k' : 'M');
}

function getTwitterCount(){
  $screen_name = 'jpagov';
	$twittercount = json_decode( file_get_contents( 'http://cdn.api.twitter.com/1/users/show.json?screen_name='.$screen_name ) );
	return $twittercount->followers_count;
}
function getFacebookCount(){
  $screen_name = 'myjpa';
	$facebookcount = json_decode( file_get_contents( 'http://graph.facebook.com/'.$screen_name ) );
	return $facebookcount->likes;
}


function getSocialCount(){
	$count = getTwitterCount() + getFacebookCount();
  return count_format($count);
}
echo count_format(getTwitterCount()) . "<br>";
echo count_format(getFacebookCount()) . "<br>";
echo getSocialCount();
?>
