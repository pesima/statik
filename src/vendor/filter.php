<?php
class Filter  
{  
  var $ignore_vars = array();  
  var $remove_chars = array();  
    
  public function process( $var )  
  {  
    array_walk_recursive( $var, array( $this, 'recursive_secure_vars' ) );  
    return $var;  
  }  
  
  private function recursive_secure_vars( &$var, $key )  
  {  
    if( in_array( $key, $this->ignore_vars ) )  
    {  
      return;  
    }  
    if ( get_magic_quotes_gpc() )  
    {  
      $var = stripslashes( $var );  
    }  
    $var = preg_replace( $this->remove_chars, '', $var );  
    $var = htmlspecialchars( $var, ENT_QUOTES );  
    $var = addslashes( $var );  
  }  
}

/* 
  
  Usage
  Example 1:
  Secure all COOKIE variables: 
  
  require 'filter.php';  
  $secure = new Filter();  
  $_COOKIE = $secure->process( $_COOKIE );
  
  ========================================
  
  Usage
  Example 2: Secure POST variables, except password variable
  
  require 'filter.php';  
  $secure = new Filter();  
  $secure->ignore_vars[] = 'password';  
  $_POST = $secure->process( $_POST );  
  
  ========================================
  
  Usage
  Example 3: Secure POST variables, except password variable
  
  require 'filter.php';  
  $secure = new Filter();  
  $secure->ignore_vars[] = 'password';  
  $_POST = $secure->process( $_POST );
  $_POST = $secure->process( $_POST );
  
  ========================================
  
  Usage
  Example 4: Secure request deleting non-digit characters from GET variables
  
  require 'filter.php'; 
  $secure = new Filter();  
  $secure->remove_chars[] = '#[^0-9]#';  
  $_GET = $secure->process( $_GET );  
*/  
?>