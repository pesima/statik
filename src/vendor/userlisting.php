<?php

    require_once 'system/Templater.php';

    /*
     * Here we setup a page with a foreach loop within a template file
     */

    /*Loading template files the 2 methods available*/
    $listing = new Templater("templates/listing.tpl.php");
    $list = array(
        "James Franklin" => "Software Engineer",
        "John Smith" => "Footballer",
        "Mia Amor" => "Programmer",
        "Candy Bar" => "Cricketer",
        "Anita Samsung" => "Singer",
        "James King" => "Dancer",
    );
    $listing->persons = $list;  // We handle the looping in the template file
    $page = new Templater("templates/main.tpl.php");
    /*Setting variables using the 2 methods*/
    $page->title = "Our Users";
    $page->set("body", $listing->parse());
    /*Outputting the data to the end user*/
    $page->publish();