<?php
/**
 * Description of Simple PSD Docs API
 *
 * @author Hariadi Hinta
 */
 
require_once  "vendor/system/Templater.php";
include       "vendor/system/pagination.class.php";
include       "vendor/system/connect.inc.php";

$type = htmlEntities($_GET['type'], ENT_QUOTES);
$type = isset($type) ? (($type === 'pp') ? 1 : (($type === 'spp') ? 2 : 3)) : 1;  // pp: 1, spp: 2, se: 3
$year = isset($_GET['year']) ? htmlEntities($_GET['year'], ENT_QUOTES) : '';
$category = isset($_GET['cat']) ? htmlEntities($_GET['cat'], ENT_QUOTES) : '';
$core = isset($_GET['core']) ? htmlEntities($_GET['core'], ENT_QUOTES) : '';
//$order = isset($_GET['order']) ? htmlEntities($_GET['order'], ENT_QUOTES) : '';
$format = isset($_GET['format']) ? htmlEntities($_GET['format'], ENT_QUOTES) : '';
$row_per_page = isset($_GET['row']) ? htmlEntities($_GET['row'], ENT_QUOTES) : 10;
$page = isset($_GET['page']) ? htmlEntities($_GET['page'], ENT_QUOTES) : 1;
$term = isset($_GET['term']) ? htmlEntities($_GET['term'], ENT_QUOTES) : '';


// INITIAL
$page = (!empty($page)) ? $page : 1;

//remove everything excerpt number
$page = intval(preg_replace('/\D/', '', $page));

$offset =($page > 1) ? intval(($page - 1) * $row_per_page) : 0;


//Document Surat Edaran not ready yet.
if($type === 3) exit('Maaf. Dokumen bagi Surat Edaran masih dalam proses migrasi sistem. ');


// DEBUG
/*
  echo '<p>Current: '.$page.'</p>';
  echo '<p>Offset: '.$offset.'</p>';
$fpdo->debug = function($BaseQuery) {

  echo "<div class=\"well well-small\">";
	echo "<p><strong>Query</strong>: " . $BaseQuery->getQuery(false) . "</p>\n";
	echo "<p><strong>parameters</strong>: " . implode(', ', $BaseQuery->getParameters()) . "</p>\n";
	echo "<p><strong>row count</strong>: " . $BaseQuery->getResult()->rowCount() . "</p>\n";
	// time is impossible to test (each time is other)
	// echo $FluentQuery->getTime() . "\n";
  echo "</div>";
};
*/


// DATABASE START
$query = $fpdo->from('dokumen');

if (!empty($term)) {
  $query = $query->where('tajuk LIKE ?', '%'.$term.'%');
}

if (!empty($year)) {
  $query = $query->where('tahun = ?', $year);
}

if (!empty($category)) {
  $query = $query->where('hubungan:kategori.id', $category)->select('kategori.kategori');
} else {
  $query = $query->select('hubungan:kategori.kategori');
}

if (!empty($core)) {
  $query = $query->where('hubungan:teras.id', $core)->select('teras.teras');
} else {
  $query = $query->select('hubungan:teras.teras');
}

$query = $query->where('hubungan:jenis.id', $type);

$query = $query->orderBy('tahun DESC');


// we need to assign total rows before set limit to query
$row_count = count($query->fetchAll());
//echo $row_count;

$query = $query->limit($row_per_page);



// if $page = 1, offset = 0, $page = 2, offset = 10, $page = 3, offset = 20
$query = $query->offset($offset);

$document =$query->fetchAll();
//

//var_dump($document);



switch ($format) {
  case "json":
    header('Content-Type: application/json'); 
    if (empty($document)) {
      echo json_encode(array('204' => 'No Content'));
    } else {
      echo json_encode($document);
    }
    break;
    
  default:
      $tpl = new Templater("vendor/templates/document.tpl.php");
      
      if($row_count > $row_per_page) {
        $p = new pagination;
        $p->items($row_count);
        $p->limit($row_per_page);
        $p->currentPage($page);
        $p->adjacents(3);
        $p->urlFriendly();
        $p->target("#docs/%");
        $p->nextLabel('');//removing next text
        $p->prevLabel('');//removing previous text
        $p->nextIcon('&raquo;');
        $p->prevIcon('&laquo;');
        $p->show();
      }
      
      if (!empty($term)) {
         $search_count = ($row_count === 0) ? 'Tiada' : $row_count;
         $tpl->search = "<p class=\"well well-small\"><b class=\"text-success\">$search_count</b> keputusan bagi carian <b class=\"text-success\"><i>$term</i></b></p>";  // Put info if user use search
         $tpl->highlight = $term;  // Highlight search term
      }

      $tpl->documents = $document;  // We handle the looping in the template file
      $tpl->publish();

    break;
}

?>