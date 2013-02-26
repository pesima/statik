// NOTICE!! DO NOT USE ANY OF THIS JAVASCRIPT
// IT'S ALL JUST JUNK FOR OUR DOCS!
// ++++++++++++++++++++++++++++++++++++++++++

!function ($) {

  $(function(){

    var $window = $(window)
    
    var visited = $.cookie("visited")

    if (visited == null) {
      

      // Show user the search input and short link for a second. 
      setTimeout(function() {
          $("#search-form").animate({width: "50px"}, 500);
          $(".search-input").animate({width: "0px"}, 500);
          $("#pantas").toggleClass('border in'); 
      }, 1500);


        $.cookie('visited', 'yes'); 
        //alert($.cookie("visited"));         
    } else {
      $("#search-form").animate({width: "50px"}, 10);
      $(".search-input").animate({width: "0px"}, 10);
      $("#pantas").toggleClass('border in'); 
    }


    // set cookie
    $.cookie('visited', 'yes', { expires: 360, path: '/' });


    
    $('.navbar-wrapper').height($(".navbar").height());
    $('.navbar').affix({
        offset: $('.navbar').position()
    });
    
    // set required if subcribe focus
    //$("input.subscribe-email[type=email]").attr('required'); //remove and use default browser
    
    /*
    
    
    // Assign .active class to side nav
    $('#btn-pautan').click(function()
    {
      $('i').removeClass('icon-double-angle-up');
      $('i').addClass('icon-double-angle-down');
    });$('#btn-pautan').on('click', '.icon-double-angle-up', function(e){
      e.preventDefault();
      $(this).toggleClass('icon-double-angle-down');
    });
    
    $("input.search-query[type=text]").hover(function()
    {
      //alert($(this).parent().width()); 
      //$(this).parent().animate({"width": "+30%"}, "slow");
      $(this).parent().toggleClass('span4');
      return false;
    });
    
    ///
    
    
    
    ///
    */
    
    $(window).resize(function(){
       
       var width = $(window).width();
       
       console.log('resize called: '+width);
       if(width >= 500 && width <= 1200){
           $('#search-form').removeClass('pull-right').addClass('pull-left');
       }
       else{
           $('#search-form').removeClass('pull-left').addClass('pull-right');
       }
    })
    .resize();//trigger the resize event on page load.
    
    

    $(".search-button").click(function() { 
    var $_searchForm = $("#search-form");
		var $_searchInput = $(".search-input");
		var $_searchButton = $(".search-button");
    
    
		if($_searchInput.width() > 10) {
			$_searchForm.animate({width: $_searchButton.width()+"px"});

			$_searchInput.animate({width: "0px"}, function() { });
		} else { 
			$_searchForm.animate({width: (parseInt($_searchButton.width())+240)+"px"});
			$_searchInput.animate({width: "240px"}, function() { $_searchForm.toggleClass("visible"); this.focus(); });
			
		}
    });
    

    $('#btn-pautan').click(function()
    {
      $('#btn-pautan i').toggleClass('icon-double-angle-down');
      $('div#pantas').toggleClass('border', 100);    
     
    });

    
    // Assign .active class to side nav
    $('.bs-docs-sidenav li a').click(function()
    {
      $('.bs-docs-sidenav li').removeClass('active');
      $(this).parent().addClass('active');
    });

    // side bar

      $('.bs-docs-sidenav').affix()


    // make code pretty
    window.prettyPrint && prettyPrint()

    // add-ons
    $('.add-on :checkbox').on('click', function () {
      var $this = $(this)
        , method = $this.attr('checked') ? 'addClass' : 'removeClass'
      $(this).parents('.add-on')[method]('active')
    })

    // add tipsies to grid for scaffolding
    if ($('#gridSystem').length) {
      $('#gridSystem').tooltip({
          selector: '.show-grid > div:not(.tooltip)'
        , title: function () { return $(this).width() + 'px' }
      })
    }

    // tooltip demo
    $('.tooltip-demo').tooltip({
      selector: "a[rel=tooltip]"
    })

    $('.tooltip-test').tooltip()
    $('.popover-test').popover()

    // popover demo
    $("a[rel=popover]")
      .popover()
      .click(function(e) {
        e.preventDefault()
      })

    // button state demo
    $('#fat-btn')
      .click(function () {
        var btn = $(this)
        btn.button('loading')
        setTimeout(function () {
          btn.button('reset')
        }, 3000)
      })

    // carousel demo
    $('#myCarousel').carousel()

    // javascript build logic
    var inputsComponent = $("#components.download input")
      , inputsPlugin = $("#plugins.download input")
      , inputsVariables = $("#variables.download input")

    // toggle all plugin checkboxes
    $('#components.download .toggle-all').on('click', function (e) {
      e.preventDefault()
      inputsComponent.attr('checked', !inputsComponent.is(':checked'))
    })

    $('#plugins.download .toggle-all').on('click', function (e) {
      e.preventDefault()
      inputsPlugin.attr('checked', !inputsPlugin.is(':checked'))
    })

    $('#variables.download .toggle-all').on('click', function (e) {
      e.preventDefault()
      inputsVariables.val('')
    })

    // request built javascript
    $('.download-btn .btn').on('click', function () {

      var css = $("#components.download input:checked")
            .map(function () { return this.value })
            .toArray()
        , js = $("#plugins.download input:checked")
            .map(function () { return this.value })
            .toArray()
        , vars = {}
        , img = ['glyphicons-halflings.png', 'glyphicons-halflings-white.png']

    $("#variables.download input")
      .each(function () {
        $(this).val() && (vars[ $(this).prev().text() ] = $(this).val())
      })

      $.ajax({
        type: 'POST'
      , url: /\?dev/.test(window.location) ? 'http://localhost:3000' : 'http://bootstrap.herokuapp.com'
      , dataType: 'jsonpi'
      , params: {
          js: js
        , css: css
        , vars: vars
        , img: img
      }
      })
    })
  })

// Modified from the original jsonpi https://github.com/benvinegar/jquery-jsonpi
$.ajaxTransport('jsonpi', function(opts, originalOptions, jqXHR) {
  var url = opts.url;

  return {
    send: function(_, completeCallback) {
      var name = 'jQuery_iframe_' + jQuery.now()
        , iframe, form

      iframe = $('<iframe>')
        .attr('name', name)
        .appendTo('head')

      form = $('<form>')
        .attr('method', opts.type) // GET or POST
        .attr('action', url)
        .attr('target', name)

      $.each(opts.params, function(k, v) {

        $('<input>')
          .attr('type', 'hidden')
          .attr('name', k)
          .attr('value', typeof v == 'string' ? v : JSON.stringify(v))
          .appendTo(form)
      })

      form.appendTo('body').submit()
    }
  }
})

}(window.jQuery)