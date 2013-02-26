<div id="users-listing">
    <?php foreach(@$this->persons as $name=>$occupation): ?>
    <div class="person">
        <div class="name"><?php print $name; ?></div>
        <div class="occupation"><?php print $occupation; ?></div>
        <hr />
    </div>
    <?php endforeach;?>
</div>