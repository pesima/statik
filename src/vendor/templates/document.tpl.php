<?php
function highlight($needle, $haystack){ 
    $ind = stripos($haystack, $needle); 
    $len = strlen($needle); 
    if($ind !== false){ 
        return substr($haystack, 0, $ind) . "<span class=\"highlight\">" . substr($haystack, $ind, $len) . "</span>" .
             highlight($needle, substr($haystack, $ind + $len)); 
    } else return $haystack; 
} 
 
if(isset($this->search)) print $this->search; 
?>
<table class="table table-bordered">
  <thead>
    <tr>
      <th><abbr title="Bilangan">Bil.</abbr></th>      
      <th>Tajuk</th>
      <th>Kategori</th>
      <th><abbr title="Teras Strategik Jabatan Perkhidmatan Awam Malaysia">Teras</abbr></th>
      <th>#</th>
    </tr>
  </thead>
  <tbody>
    <?php if (!empty($this->documents)): ?>

    <?php foreach ($this->documents as $docs): 
    $tajuk = $docs['tajuk'];
    $tajuk = (isset($this->highlight)) ? highlight($this->highlight, $tajuk) : $tajuk;
    ?>
    <tr>
      <td><?php echo $docs['bilangan']; ?></td>
      <td><?php echo $tajuk; ?></td>
      <td><?php echo $docs['kategori']; ?></td>
      <td><?php echo $docs['teras']; ?></td>
      <td>
      <?php 
      if(substr($docs['url'], -3) == 'pdf'):
      $url = (substr($docs['url'], -3) !== 'pdf') ? $docs['url'] : 'http://docs.google.com/viewer?url='.$docs['url'];
      ?>
      <a href="<?php echo $url ?>" rel="tooltip" class="btn btn-mini" title="Lihat dokumen"><i class="icon-file-alt"></i> </a>
      <?php endif;?>
      <a href="<?php echo $docs['url'] ?>" rel="tooltip" class="btn btn-mini btn-primary" title="Muat turun dokumen"><i class="icon-download-alt"></i> </a></td>
    </tr>
    <?php endforeach;?>
    <?php else: ?>
     <tr><td colspan="5" style="text-align: center;" class="alert alert-warning"><p>Tiada dokumen ditemui.</p></td></tr>
    <?php endif;?>
  </tbody>
</table> 