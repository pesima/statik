<?php

    require_once 'system/Templater.php';

    /*
     * Here we setup the a signup page
     * Showing an example of using a template within another template
     * here we put the signup form inside our main template
     */

    /*Loading template files the 2 methods available*/
    $form = new Templater();
    $form->load("templates/signup-form.tpl.php");
    $page = new Templater("templates/main.tpl.php");
    /*Setting variables using the 2 methods*/
    $page->title = "Signup";
    $page->set("body", $form->parse());
    /*Outputting the data to the end user*/
    $page->publish();