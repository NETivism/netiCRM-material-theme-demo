(function($) {

  "use strict";

  // Get viewport
  var viewport;
  var getViewport = function() {
    viewport = {
      width  : $(window).width(),
      height : $(window).height()
    };
  }
  getViewport();

  // Mobile button click
  var mobileBtnClick = function() {
    $(".mbtn, .mlink").on("click", function(e) {
      e.preventDefault();
      console.log(this.id);
      if (!$(this).hasClass("mlink-thememenu")) {
        var btnActive = $(this).hasClass("mbtn") ? "mbtn-active" : "mlink-active";
        console.log(btnActive);
        var panelOpen = "panel-open";
        if ($(this).hasClass(btnActive)) {
          // close
          console.log("close");
          $(this).removeClass(btnActive);
          if ($(".mbtn-active").length == 0 && $(".mlink-active").length == 0) {
            $("body").removeClass(panelOpen);
          }
        } else {
          // open
          console.log("open");
          $(this).addClass(btnActive);
          if ($(".mbtn-active").length > 0 || $(".mlink-active").length > 0) {
            $("body").addClass(panelOpen);
          }
        }
      }
    });
  }

  var mobileSearchEvent = function() {
    var $search = $("#search");
    $("#mbtn-search").unbind('click').on("click", function(){
      if ($search.is(":hidden")) {
        $search.slideDown();
        //$("#search .form-text").focus();
      } else {
        $search.slideUp();
        //$("#search .form-text").blur();
      }
      return false;
    });

    $("#page").on("click", function() {
      if (!$search.is(":hidden")) {
        $search.slideUp();
      }
    });
  }

  // iOS fix for position fixed elements on input focus
  // http://dansajin.com/2012/12/07/fix-position-fixed/
  var fixFixed = function() {
    var $body = $('body');
    $(document)
    .on('focus', 'input', function() {
        $body.addClass('fixfixed');
    })
    .on('blur', 'input', function() {
        $body.removeClass('fixfixed');
    });
  }

  var sidebarToggle = function() {
    var $body = $("body");
    var $st = $("#sidebar-toggle");
    $st.on("click", function(){
      if ($body.hasClass("sidebar-mini")) {
        $body.removeClass("sidebar-mini");
/*        $(".js-accordion").each(function() {
          $(this).addClass("accordion-open");
        });*/
      } else {
        $body.addClass("sidebar-mini");
/*        $(".js-accordion").each(function() {
          $(this).removeClass("accordion-open");
        });*/
      }
    });
  }

  var accordionToggle = function() {
    $(".js-accordion").each(function() {
      var $this = $(this);
      var $title = $this.children(".side-item-title");
      $title.on("click", function(){
        if ($this.hasClass("accordion-open")) {
          $this.removeClass("accordion-open");
        } else {
          $this.addClass("accordion-open");
        }
      });
    });
  }

  var sidebarEvent = function() {
    var $sidebar = $("#sidebar");
    var $body = $("body");
    $sidebar.on({
        mouseenter: function () {
          //stuff to do on mouse enter
          if ($body.hasClass("sidebar-mini")) {
            $("body").addClass("sidebar-mini-open");
          }
        },
        mouseleave: function () {
          //stuff to do on mouse leave
          if ($body.hasClass("sidebar-mini-open")) {
            $("body").removeClass("sidebar-mini-open");
          }
        }
    });
  }

  var headerMenuIcon = function() {
    $(".header ul.menu > li > a").each(function() {
      var t = $(this).text();
      if (t) {
        if ($("body").hasClass("md-c1")) {
          $(this).addClass("mdl-button mdl-js-button mdl-js-ripple-effect")
        } else {
          $(this).addClass("mdl-button mdl-js-button mdl-js-ripple-effect");
        }
        /*
        t = "<span>" + $(this).text() + "</span>";
        if ($(this).hasClass("civicrm-contact")) {
          $(this).html("<i class='material-icons'>&#xE87C;</i>" + t);
        } else if ($(this).hasClass("civicrm-contribute")) {
          $(this).html("<i class='material-icons'>&#xE227;</i>" + t);
        } else if ($(this).hasClass("civicrm-event")) {
          $(this).html("<i class='material-icons'>&#xE878;</i>" + t);
        } else if ($(this).hasClass("civicrm-mailing")) {
          $(this).html("<i class='material-icons'>&#xE158;</i>" + t);
        } else if ($(this).hasClass("civicrm-member")) {
          $(this).html("<i class='material-icons'>&#xE8D3;</i>" + t);
        } else if ($(this).hasClass("civicrm-report")) {
          $(this).html("<i class='material-icons'>&#xE24B;</i>" + t);
        } else if ($(this).attr("href") == "/civicrm/admin?reset=1") {
          $(this).html("<i class='material-icons'>&#xE8B8;</i>" + t);
        } else if ($(this).attr("href") == "http://neticrm.tw/support") {
          $(this).html("<i class='material-icons'>&#xE887;</i>" + t);
        } else if ($(this).attr("href") == "/node/add") {
          $(this).html("<i class='material-icons'>&#xE89C;</i>" + t);
        } else {
          $(this).html(t);
        }
        */
      } else {
        $(this).hide();
      }
    });
  }

  var AddTooltip = function() {
    $(".header .menu li > a").powerTip({
      placement: 's',
    });
    $(".js-powertip").powerTip({
      placement: 's',
    });
    $(".js-powertip-e").powerTip({
      placement: 'e',
    });
    $(".js-powertip-se-alt").powerTip({
      placement: 'se-alt',
    });
  }

  var dontJumpTop = function() {
    $("a[href='#']").on("click", function(e) {
      e.preventDefault();
    });
  }

  var rwdEvent = function(vw) {
    console.log(vw);
    $(".sidebar-inner").slimScroll({
      height: 'auto',
      distance: '5px',
      color: '#ccc',
      size: '5px',
    });
    if (vw >= 768) {
      // desktop
    } else {
      // mobile
    }
  }


  // Document ready
  $(document).ready(function() {
    //mobileBtnClick();
    sidebarToggle();
    accordionToggle();
    headerMenuIcon();
    sidebarEvent();
    AddTooltip();
    dontJumpTop();
    rwdEvent(viewport.width);
  });

  $(window).load(function() {

  });

  // Window resize
  var resizeTimer;
  var windowResize = function() {
    getViewport();
    rwdEvent(viewport.width);
  };

  $(window).resize(function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(windowResize, 250);
  });

  $(window).scroll(function() {
    var scroll = $(window).scrollTop();
  });

})(jQuery);
//})(jq1110);