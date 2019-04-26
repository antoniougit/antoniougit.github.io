$(function () {

  var isMobile;
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    isMobile = true;

    // Mobile height fix
    $('.height-fix').each(function () {
      var h = $(this).height();
      $(this).height(h)
    })
  }

  // Resize resets
  $(window).resize(function () {
    posFilterBar($('.filter').first());
  });

  // Sticky Nav on Mobile
  if (isMobile) {
    $('nav').addClass('fixed');
  } else {
    $('nav').addClass('desk');
  }

  // Canvas particles - particlesJS.load(@dom-id, @path-json, @callback (optional)); //
  particlesJS.load('particles-js', 'scripts/particles.json');

  // Nav position
  var navPos = $('nav').position().top;
  var lastPos = 0;
  var lockTimer;

  $(window).on('scroll', function () {

    var pos = $(window).scrollTop();
    var pos2 = pos + 50;
    var scrollBottom = pos + $(window).height();

    if (!isMobile) {
      if (pos >= navPos + $('nav').height() && lastPos < pos) {
        $('nav').addClass('fixed');
      }
      if (pos < navPos && lastPos > pos) {
        $('nav').removeClass('fixed');
      }
      lastPos = pos;
    }

    // Link Highlighting
    if (pos2 > $('#home').offset().top) {
      highlightLink('home');
    }
    if (pos2 > $('#about').offset().top) {
      highlightLink('about');
    }
    if (pos2 > $('#portfolio').offset().top) {
      highlightLink('portfolio');
    }
    if (pos2 > $('#contact').offset().top ||
      scrollBottom === $(document).height()) {
      highlightLink('contact');
    }

    // Prevent Hover on Scroll
    clearTimeout(lockTimer);
    if (!$('body').hasClass('disable-hover')) {
      $('body').addClass('disable-hover')
    }

    lockTimer = setTimeout(function () {
      $('body').removeClass('disable-hover')
    }, 500);
  });

  function highlightLink(anchor) {
    $('nav .active').removeClass('active');
    $("nav").find('[data-dest="' + anchor + '"]').addClass('active');
  }


  // Event handlers
  $('.page-link').click(function () {
    var anchor = $(this).attr("data-dest");
    $('.link-wrap').removeClass('visible');

    $('nav span').removeClass('active');
    $("nav").find('[data-dest="' + anchor + '"]').addClass('active');

    $('html, body').animate({
      scrollTop: $('#' + anchor).offset().top
    }, 400);
  });

  $('.mdi-menu').click(function () {
    $('.link-wrap').toggleClass('visible');
  });

  posFilterBar($('.filter').first());

  $('.filter').click(function () {
    posFilterBar(this);
  });

  function posFilterBar(elem) {
    var origin = $(elem).parent().offset().left;
    var pos = $(elem).offset().left;
    $('.float-bar').css({
      left: pos - origin,
      width: $(elem).innerWidth()
    });
    $('.float-bar .row').css('left', (pos - origin) * -1);
  }

  // Gallery
  $('#gallery').mixItUp({
    load: {
      filter: '.css'
    }
  });

  function mixClear() {
    setTimeout(function () {
      $('#gallery').removeClass('waypoint')
    }, 2000);
  }

  // Scroll animations
  function onScrollInit(items, elemTrigger) {
    var offset = $(window).height() / 1.6
    items.each(function () {
      var elem = $(this),
        animationClass = elem.attr('data-animation'),
        animationDelay = elem.attr('data-delay');

      elem.css({
        '-webkit-animation-delay': animationDelay,
        '-moz-animation-delay': animationDelay,
        'animation-delay': animationDelay
      });

      var trigger = (elemTrigger) ? trigger : elem;

      trigger.waypoint(function () {
        elem.addClass('animated').addClass(animationClass);
        if (elem.get(0).id === 'gallery') mixClear(); // Optional
      }, {
        triggerOnce: true,
        offset: offset
      });
    });
  }

  setTimeout(function () {
    onScrollInit($('.waypoint'))
  }, 10);

});