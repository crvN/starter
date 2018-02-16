$(function() {
  //SVG Fallback
  if (!Modernizr.svg) {
    $("img[src*='svg']").attr("src", function() {
      return $(this)
        .attr("src")
        .replace(".svg", ".png");
    });
  }

  //E-mail Ajax Send
  //Documentation & Example: https://github.com/agragregra/uniMail
  $("form").submit(function() {
    //Change
    var th = $(this);
    $.ajax({
      type: "POST",
      url: "mail.php", //Change
      data: th.serialize()
    }).done(function() {
      alert("Thank you!");
      setTimeout(function() {
        // Done Functions
        th.trigger("reset");
      }, 1000);
    });
    return false;
  });

  //Chrome Smooth Scroll
  try {
    $.browserSelector();
    if ($("html").hasClass("chrome")) {
      $.smoothScroll();
    }
  } catch (err) {}

  $("img, a").on("dragstart", function(event) {
    event.preventDefault();
  });
});

$(function() {
  var modalTinyNoFooter = new tingle.modal();
  var btn = document.querySelector(".watch-video");
  btn.addEventListener("click", function(e) {
    e.preventDefault();
    modalTinyNoFooter.open();
  });
  modalTinyNoFooter.setContent(
    document.querySelector(".tingle-demo-tiny").innerHTML
  );
});

$(function() {
  //animations
  $(".show").animated("flipInY");

  function anime(el, animation) {
    var $showMe = $(el);
    $showMe.css("opacity", 0);

    $(window).scroll(function() {
      var bottom_of_window = $(window).scrollTop() + $(window).height();
      var top_of_window = $(window).scrollTop();

      $showMe.each(function(i) {
        var $elm = $showMe.eq(i);
        var bottom_of_elm = $elm.offset().top + $elm.height();

        if (bottom_of_window > bottom_of_elm && top_of_window < bottom_of_elm) {
          if (!$elm.hasClass("in-viewport")) {
            $elm.addClass("in-viewport");

            setTimeout(function() {
              $elm.velocity(animation, {
                stagger: 300,
                drag: true,
                duration: 2000
              });
            }, i * 200);
          }
        }
      });
    });
  }
});

$(window).load(function() {
  $(".loader_inner").fadeOut();
  $(".loader")
    .delay(400)
    .fadeOut("slow");
});
