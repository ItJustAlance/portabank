$(function() {
  var win_w = $(document).width();
  var win_h = $(window).height();
  
  if ($(".js-slider-card .slide").length > 0) {
    $('.js-slider-card').slick({
      dots: true,
      arrows: false,
      infinite: false,
      variableWidth: true
    });
  }
  
  $(".js-modal-touch").swipe({
    /*
    swipeStatus:function(event, phase, direction, distance)
    {
      var str = "";
      if (phase=="move")
        str="You have moved " + distance +" pixels, past 200 and the handler will fire";
      if (phase=="end")
        str="Handler fired, you swiped " + direction;
      console.log(str);
    },
    triggerOnTouchEnd:false,
    threshold:200
   
     */
    //Generic swipe handler for all directions
    
    swipeStatus: function (event, phase, direction, distance, duration, fingerCount) {
      console.log("swiped " + distance + ' px');
      $(".b-modal").addClass("drag");
      $(".b-modal-wrapper").css({bottom : -distance +"px"})
      console.log(direction);
      if (distance > 150 && direction == 'down') {
        $(".b-modal").removeClass("drag");
        $(".b-modal-wrapper").removeAttr( 'style' );
        $(".b-modal").removeClass("open");
        $("body").removeClass('lock');
        // setTimeout(() => $(".b-modal").fadeOut(300), 300);
        
      }
      if (phase === $.fn.swipe.phases.PHASE_END || phase === $.fn.swipe.phases.PHASE_CANCEL) {
        //The handlers below fire after the status,
        // so we can change the text here, and it will be replaced if the handlers below fire
        $(this).find('#swipe_text').text("No swipe was made");
      }
    },
    pinchStatus: function (event, phase, direction, distance, duration, fingerCount, pinchZoom) {
      $(this).find('#pinch_text').text("pinched " + distance + " px ");
      if (phase === $.fn.swipe.phases.PHASE_END || phase === $.fn.swipe.phases.PHASE_CANCEL) {
        //The handlers below fire after the status,
        // so we can change the text here, and it will be replaced if the handlers below fire
        $(this).find('#pinch_text').text("No pinch was made");
      }
    },
    swipe: function (event, direction, distance, duration, fingerCount) {
      console.log("You swiped " + direction + " with " + fingerCount + " fingers");
      $(".b-modal").removeClass("drag");
      $(".b-modal-wrapper").removeAttr( 'style' );
    },
    pinchIn: function (event, direction, distance, duration, fingerCount, pinchZoom) {
      $(this).find('#pinch_text').text("You pinched " + direction + " by " + distance + "px, zoom scale is " + pinchZoom);
    },
    pinchOut: function (event, direction, distance, duration, fingerCount, pinchZoom) {
      $(this).find('#pinch_text').text("You pinched " + direction + " by " + distance + "px, zoom scale is " + pinchZoom);
    },
    fingers: $.fn.swipe.fingers.ALL
  });
  // if ($(".js-slider-card-one .slide").length > 0){
  //   initSlider();
  // }
  $(".js-btn-modal").on("click", function() {
    let modalName = $(this).data('modal');
  
    let isModal = $('.has-modal').hasClass('open')
    if(isModal){
      $(".popup").removeClass("in");
      $(".b-modal").removeClass("open");
    }
    $("body").addClass('lock');
    $("#" + modalName).addClass("open");
    $("#" + modalName).fadeIn(0);
    // initSlider();
    
    return false
  });
  $(".js-modal-close").on("click", function() {
    $(".popup").removeClass("in");
    $(".b-modal").removeClass("open");
    return false
  });
  $(".js-popup-close").on("click", function() {
    $(".popup").removeClass("in");
    $("body").removeClass("lock");
    return false
  });
  $(".js-btn-popup").on("click", function() {
    let popupName = $(this).data('popup');
  
    let isPopup = $('.has-modal').hasClass('in')
    if(isPopup){
      $(".popup").removeClass("in");
      $(".b-modal").removeClass("open");
    }
    $("body").addClass("lock");
    $("#" + popupName).addClass("in");
    //initSlider();
    return false
  });
  $(".js-swap-placeholder__btn").on("click", function() {
    let inpWrap = $(this).closest(".js-swap-placeholder__wrapper");
    let inpChecked = inpWrap.find(".js-swap-placeholder__checked");
    let inpInput = inpWrap.find(".js-swap-placeholder__input");
    if(inpChecked.is(':checked')) {
      inpInput.attr("placeholder", $(this).data("off"));
    }else {
      inpInput.attr("placeholder", $(this).data("on"));
    }
  });
  $(".js-btn-glass").on("click", function() {
    $(this).toggleClass("active");
  });
  $(".js-login-first-show").on("click", function() {
    $(".js-login-first").show();
    $(".js-login-login").hide();
    $(".arr-back-login").removeClass("show");
  });
  $(".js-login-login-show").on("click", function() {
    $(".js-login-first").hide();
    $(".js-login-login").show();
    $(".arr-back-login").addClass("show");
  });
  
  initSlider();
  function initSlider() {
    if($(".js-slider-card-one .slide").length>0) {
      $('.js-slider-card-one').slick({
        dots: true,
        arrows: false,
        infinite: false,
        variableWidth: false
      });
    }
  }
    if ($('.phone_mask').length) {
        $(".phone_mask").mask("+7 (999) 999-9999");
    }
  if ($('#picker').length) {
  
    var picker = new Lightpick({
      field: document.getElementById('picker'),
      secondField: document.getElementById('picker'),
      singleDate: false,
      inline: true,
      numberOfColumns: 1,
      numberOfMonths: 6,
      format: 'DD MMMM YYYY',
      lang: 'ru',
      locale: {
        tooltip: {
          one: 'день',
          few: 'дня',
          many: 'дней',
        },
        pluralize: function (i, locale) {
          if ('one' in locale && i % 10 === 1 && !(i % 100 === 11)) return locale.one;
          if ('few' in locale && i % 10 === Math.floor(i % 10) && i % 10 >= 2 && i % 10 <= 4 && !(i % 100 >= 12 && i % 100 <= 14)) return locale.few;
          if ('many' in locale && (i % 10 === 0 || i % 10 === Math.floor(i % 10) && i % 10 >= 5 && i % 10 <= 9 || i % 100 === Math.floor(i % 100) && i % 100 >= 11 && i % 100 <= 14)) return locale.many;
          if ('other' in locale) return locale.other;
        
          return '';
        }
      },
      onSelect: function (start, end) {
        // var str = '';
        var now = moment();
        // console.log(now.locale("ru").format('dddd, MMMM DD YYYY, h:mm:ss'));
      
        console.log('start ', start._i)
        let str1 = start ? start.locale("ru").format('DD MMMM YYYY') : 'Начальная дата';
        let str2 = end ? end.locale("ru").format('DD MMMM YYYY') : 'Конечная дата';
        document.getElementById('date1').innerHTML = str1;
        document.getElementById('date2').innerHTML = str2;
      }
    });
  }
  $('.js-tabs').delegate('.js-tab-item:not(.active)', 'click', function() {
    $(this).addClass('active').siblings().removeClass('active')
      .parents('.js-tabs-wrapper').find('.js-tab-box').eq($(this).index()).fadeIn(0).siblings('.js-tab-box').fadeOut(0);
  })
  
  $(".js-btn-open-search").on("click", function() {
    $("body").addClass("search-open");
  });
  $(".js-btn-reset-search").on("click", function() {
    $("body").removeClass("search-open");
  });
  $(".js-toggle-otpr-view__btn").on("click", function() {
    console.log('dddd')
    let wrapper = $(this).closest(".js-toggle-otpr-view-wrapper");
    if(wrapper.find('.js-toggle-otpr-view__checked').is(':checked')) {
      $('body').removeClass('show-otpravka-form-type2');
    } else {
      $('body').addClass('show-otpravka-form-type2');
    }
  });
  
  
  $(".js-btn-swipe-send").swipe({
    
    swipeStatus: function (event, phase, direction, distance, duration, fingerCount) {
      var btn_width = $(".btn-swipe-send").width();
      console.log("swiped " + distance + ' px');
      
      $(".btn-swipe-send").addClass("drag");
      
      console.log(direction);
      if (direction == 'right') {
        $(".btn-swipe-send-wrapper").css({width : distance + 95 +"px"})
      }
      if (distance >= btn_width - 50 && direction == 'right') {
        console.log('!!!!!!')
        
        $(".btn-swipe-send").removeClass("drag");
        $(".btn-swipe-send").addClass("finish");
      
      }
      if (phase === $.fn.swipe.phases.PHASE_END || phase === $.fn.swipe.phases.PHASE_CANCEL) {
        //The handlers below fire after the status,
        // so we can change the text here, and it will be replaced if the handlers below fire
        //$(this).find('#swipe_text').text("No swipe was made");
      }
    },
    pinchStatus: function (event, phase, direction, distance, duration, fingerCount, pinchZoom) {
      //$(this).find('#pinch_text').text("pinched " + distance + " px ");
      if (phase === $.fn.swipe.phases.PHASE_END || phase === $.fn.swipe.phases.PHASE_CANCEL) {
        //The handlers below fire after the status,
        // so we can change the text here, and it will be replaced if the handlers below fire
        //$(this).find('#pinch_text').text("No pinch was made");
      }
    },
    swipe: function (event, direction, distance, duration, fingerCount) {
      console.log("You swiped " + direction + " with " + fingerCount + " fingers");
      $(".btn-swipe-send").removeClass("drag");

      
    },
    pinchIn: function (event, direction, distance, duration, fingerCount, pinchZoom) {
     // $(this).find('#pinch_text').text("You pinched " + direction + " by " + distance + "px, zoom scale is " + pinchZoom);
    },
    pinchOut: function (event, direction, distance, duration, fingerCount, pinchZoom) {
     // $(this).find('#pinch_text').text("You pinched " + direction + " by " + distance + "px, zoom scale is " + pinchZoom);
    },
    fingers: $.fn.swipe.fingers.ALL
  });
});



