$(document).ready(function () {


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
    // item.style.transform = "translateY(${distance * speed}px)";
    $(item).css('transform', 'translateY(' + (distance * speed) + 'px)');
  }

  window.addEventListener("scroll", function() {
    parallax("header", window.scrollY, 0.6);
    parallax(".ball-one", window.scrollY, 0.3);
    parallax(".ball-two", window.scrollY, 0.2);
    parallax(".ball-three", window.scrollY, 0.4);
    parallax(".booflix", window.scrollY, 1);
  });
  // PARALLAX


  // DA RIPETERE SOLO UNA VOLTA PER TEMPLATE
  var source = $("#card-template").html();
  var template = Handlebars.compile(source);
  // DA RIPETERE SOLO UNA VOLTA PER TEMPLATE

  var hiddenCard = $(".card.hidden").clone();


  $(".actions .fas.fa-search").click(function () {
    if ($(".row.movies").hasClass("owl-loaded")) {
      // $(".row.movies").removeClass("owl-loaded");
      // $(".row.movies").removeClass("owl-theme");
      $(".row.movies .owl-stage").empty();
      $(".row.movies .owl-stage").append(hiddenCard);
    }
    // $(".row.movies .card.hidden").siblings().remove();
    ricercaFilm();
  });
  $("#search-text").keypress(function (event) {
    if (event.keyCode == 13) {
      // if ($(".row.movies").hasClass("owl-loaded")) {
      //   // $(".row.movies").removeClass("owl-loaded");
      //   // $(".row.movies").removeClass("owl-theme");
      //   // $(".row.movies").removeClass("owl-drag");
      //   // $(".owl-item").parentsUntil(".row.movies").remove();
      //   // $(".row.movies").find(".owl-nav").remove();
      //   // $(".row.movies").find(".owl-dots").remove();
      //   // $(".row.movies").append(hiddenCard);
      //   $('.owl-carousel').trigger('refresh.owl.carousel');
      // }
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
                  $(templateCompiled).insertAfter(".row.movies .card:last-child");

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
                  nav: true,
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
                  $(templateCompiled).insertAfter(".row.series .card:last-child");

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
                  nav: true,
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
