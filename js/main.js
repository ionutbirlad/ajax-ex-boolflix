$(document).ready(function () {

  // DA RIPETERE SOLO UNA VOLTA PER TEMPLATE
  var source = $("#card-template").html();
  var template = Handlebars.compile(source);
  // DA RIPETERE SOLO UNA VOLTA PER TEMPLATE


  $(".actions .fas.fa-search").click(function () {
    ricercaFilm();
  });
  $("#search-text").keypress(function (event) {
    if (event.keyCode == 13) {
      ricercaFilm();
    }
  });



  function ricercaFilm() {
    var stringaCercata = $(".actions #search-text").val().toLowerCase();
    $(".actions #search-text").val("");
    // console.log(stringaCercata);
    var baseMovieUrl = "https://api.themoviedb.org/3";
    var baseImageUrl = "https://image.tmdb.org/t/p";
    if (stringaCercata.trim().length > 0) {
      var moviesOrSeries = $(".type-of-search").val();
      if (moviesOrSeries == "film") {
        $.ajax({
          // url: "https://api.themoviedb.org/3/search/movie?api_key=33dde37d29b1d13faeb21d0fefcc0389&query=ritorno+al+futuro",
          url: baseMovieUrl + "/search/movie",
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
                  // center: true,
                  dots: false,
                  autoWidth:true,
                  nav: true
                });
          },
          error: function (err) {
            alert("Qualcosa è andato storto!");
          }
        });
      } else if (moviesOrSeries == "serietv") {
        $.ajax({
          url: baseMovieUrl + "/search/tv",
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
                  title: films[i].name,
                  original: films[i].original_name,
                  language: films[i].original_language,
                  rating: Math.ceil(films[i].vote_average / 2)
                };
                var templateCompiled = template(film);
                $(templateCompiled).insertAfter(".row.series .card:last-child");

                // GESTIONE STELLE RATING
                var percentualeRating = (film.rating * 100) / 5;
                // console.log(percentualeRating);
                $(".row.series .card:last-child").find(".stars-inner").css( "width", percentualeRating + "%");

                // GESTIONE TITOLI
                if (film.title == film.original) {
                  $(".row.series .card:last-child").find(".titolo").remove();
                }
              }
              $(".row.series.owl-carousel").owlCarousel({
                  items: 2,
                  margin: 20,
                  loop: true,
                  // center: true,
                  dots: false,
                  autoWidth:true,
                  nav: true
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
