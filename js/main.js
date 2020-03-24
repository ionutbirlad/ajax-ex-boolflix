$(document).ready(function () {

  // GESTIONE INFO CARD
  $(document).on("click", ".owl-item", function () {
    var myThis = $(this);
    if ($(this).find(".overlay").hasClass("bottom")) {
      $(this).find(".overlay").removeClass("bottom");
      $(this).find(".overlay").css("transform", "translateY(0)", "scale(0)");
      $(this).find(".overlay").css("width", "100%");
      $(this).parents(".row").css("min-height", "300px");
    } else {
      $(this).find(".overlay").addClass("bottom");
      $(this).find(".overlay").css("transform", "translateY(100%)", "scale(1)");
      $(this).find(".overlay").css("width", "200%");
      $(this).parents(".row").css("min-height", "450px");
    }
  });
  $(document).on("mouseleave", ".owl-item", function () {
        $(this).find(".overlay").css("transform", "scale(0)");
        $(this).find(".overlay").css("width", "100%");
        $(this).parents(".row").css("min-height", "300px");
  });
  $(document).on("mouseenter", ".owl-item", function () {
        $(this).find(".overlay").css("transform", "scale(1)");
  });
  // GESTIONE INFO CARD

  // NAV OWL
  var carouselEl = $('.row.movies.owl-carousel');
  var carouselE2 = $('.row.series.owl-carousel');

    $(".large-one .my-next-button").click(function() {
        carouselEl.trigger('next.owl.carousel');
    });

    $(".large-one .my-previous-button").click(function() {
        carouselEl.trigger('prev.owl.carousel');
    });
    $(".large-two .my-next-button").click(function() {
        carouselE2.trigger('next.owl.carousel');
    });

    $(".large-two .my-previous-button").click(function() {
        carouselE2.trigger('prev.owl.carousel');
    });
  // NAV OWL


// MENU NASCOSTO
  $("header .menu .fas.fa-times").click(function () {
    var menu = $("header .menu");
    menu.slideUp();
  });
  $("header .fas.fa-bars").click(function () {
    var menu = $("header .menu");
    menu.slideDown();
    menu.css("display", "flex");
  });
// MENU NASCOSTO


// PROFILE
  $(".actions .fas.fa-sort-down").click(function () {
    if ($("#profile-one").hasClass("active")) {
      $("#profile-one").removeClass("active");
    } else {
      $("#profile-one").toggleClass("active");
    }
  });
// PROFILE


// PARALLAX
  function parallax(element, distance, speed) {
    const item = document.querySelector(element);
    item.style.transform = 'translateY(' + (distance * speed) + 'px)';
    // $(item).css('transform', 'translateY(' + (distance * speed) + 'px)');
  }

  window.addEventListener("scroll", function() {
    parallax("header", window.scrollY, 0.3);
    parallax(".ball-one", window.scrollY, 0.3);
    parallax(".ball-two", window.scrollY, 0.2);
    parallax(".ball-three", window.scrollY, 0.4);
    // parallax(".booflix", window.scrollY, 1);
  });
  // PARALLAX


  // DA RIPETERE SOLO UNA VOLTA PER TEMPLATE
  var source = $("#card-template").html();
  var template = Handlebars.compile(source);
  // DA RIPETERE SOLO UNA VOLTA PER TEMPLATE

  var hiddenCard = $(".card.hidden").clone();


  $(".actions .fas.fa-search").click(function () {

    var moviesOrSeries = $(".type-of-search").val();
    if (moviesOrSeries == "film") {
      $(".row.movies .owl-stage").empty();
      var $owl = $('.row.movies.owl-carousel');
      $owl.trigger('destroy.owl.carousel');
      $owl.html($owl.find('.owl-stage-outer').html()).removeClass('owl-loaded');
    } else if (moviesOrSeries == "serietv") {
      $(".row.series .owl-stage").empty();
      var $owl = $('.row.series.owl-carousel');
      $owl.trigger('destroy.owl.carousel');
      $owl.html($owl.find('.owl-stage-outer').html()).removeClass('owl-loaded');
    }

    ricercaFilm();
  });
  $("#search-text").keypress(function (event) {
    if (event.keyCode == 13) {

      var moviesOrSeries = $(".type-of-search").val();
      if (moviesOrSeries == "film") {
        $(".row.movies .owl-stage").empty();
        var $owl = $('.row.movies.owl-carousel');
        $owl.trigger('destroy.owl.carousel');
        $owl.html($owl.find('.owl-stage-outer').html()).removeClass('owl-loaded');
      } else if (moviesOrSeries == "serietv") {
        $(".row.series .owl-stage").empty();
        var $owl = $('.row.series.owl-carousel');
        $owl.trigger('destroy.owl.carousel');
        $owl.html($owl.find('.owl-stage-outer').html()).removeClass('owl-loaded');
      }

      ricercaFilm();
    }
  });


// PARTI FISSE API
  var baseMovieOrTvShowUrl = "https://api.themoviedb.org/3";
  var baseImageUrl = "https://image.tmdb.org/t/p";
// PARTI FISSE API

  function ricercaFilm() {
    var stringaCercata = $(".actions #search-text").val().toLowerCase();
    $(".actions #search-text").val("");
    // console.log(stringaCercata);
    if (stringaCercata.trim().length > 0) {
      var moviesOrSeries = $(".type-of-search").val();
      if (moviesOrSeries == "film") {
        $.ajax({
          // url: "https://api.themoviedb.org/3/search/movie?api_key=33dde37d29b1d13faeb21d0fefcc0389&query=ritorno+al+futuro",
          url: baseMovieOrTvShowUrl + "/search/movie",
          data: {
            api_key: "33dde37d29b1d13faeb21d0fefcc0389",
            query: stringaCercata,
            language: "it-IT"
          },
          method: "GET",
          success: function (data) {
              // console.log(data);
              var films = data.results;
              // console.log(films);
              for (var i = 0; i < films.length; i++) {
                var film = {
                  image: baseImageUrl + "/w342/" + films[i].poster_path,
                  title: films[i].title,
                  original: films[i].original_title,
                  language: films[i].original_language,
                  rating: Math.ceil(films[i].vote_average / 2)
                };
                  var templateCompiled = template(film);
                  // $(templateCompiled).insertAfter(".row.movies .card:last-child");
                  $(".row.movies").append(templateCompiled);

                // GESTIONE STELLE RATING
                var percentualeRating = (film.rating * 100) / 5;
                // console.log(percentualeRating);
                $(".row.movies .card:last-child").find(".stars-inner").css( "width", percentualeRating + "%");

                // GESTIONE TITOLI
                if (film.title == film.original) {
                  $(".row.movies .card:last-child").find(".titolo").remove();
                }
              }
              $(".row.movies.owl-carousel").owlCarousel({
                  items: 2,
                  margin: 20,
                  loop: true,
                  center: true,
                  dots: false,
                  autoWidth:true,
                  nav: false,
                  navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>','<i class="fa fa-angle-right" aria-hidden="true"></i>']
                });
          },
          error: function (err) {
            alert("Qualcosa è andato storto!");
          }
        });
      } else if (moviesOrSeries == "serietv") {
        $.ajax({
          url: baseMovieOrTvShowUrl + "/search/tv",
          data: {
            api_key: "33dde37d29b1d13faeb21d0fefcc0389",
            query: stringaCercata,
            language: "it-IT"
          },
          method: "GET",
          success: function (data) {
              // console.log(data);
              var series = data.results;
              // console.log(films);
              for (var i = 0; i < series.length; i++) {
                var tvShow = {
                  image: baseImageUrl + "/w342/" + series[i].poster_path,
                  title: series[i].name,
                  original: series[i].original_name,
                  language: series[i].original_language,
                  rating: Math.ceil(series[i].vote_average / 2)
                };
                  var templateCompiled = template(tvShow);
                  // $(templateCompiled).insertAfter(".row.series .card:last-child");
                  $(".row.series").append(templateCompiled);

                // GESTIONE STELLE RATING
                var percentualeRating = (tvShow.rating * 100) / 5;
                // console.log(percentualeRating);
                $(".row.series .card:last-child").find(".stars-inner").css( "width", percentualeRating + "%");

                // GESTIONE TITOLI
                if (tvShow.title == tvShow.original) {
                  $(".row.series .card:last-child").find(".titolo").remove();
                }
              }
              $(".row.series.owl-carousel").owlCarousel({
                  items: 2,
                  margin: 20,
                  loop: true,
                  center: true,
                  dots: false,
                  autoWidth:true,
                  nav: false,
                  navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>','<i class="fa fa-angle-right" aria-hidden="true"></i>']
                });
          },
          error: function (err) {
            alert("Qualcosa è andato storto!");
          }
        });
      }
    }
  }



});
