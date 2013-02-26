<?php

    require_once 'system/Templater.php';

    /*Here we setup the most simple usage of the template*/

    $page = new Templater("templates/main.tpl.php");    // Loading the template file
    /*Setting variables using the 2 methods*/
    $page->title = "Home Page";
    $page->set("body", "Welcome to our sample site");
    /*Outputting the data to the end user*/
    $page->publish();