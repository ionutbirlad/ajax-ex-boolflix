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
          console.log(films);
          for (var i = 0; i < films.length; i++) {
            var film = {
              image: baseImageUrl + "/w342/" + films[i].poster_path,
              title: films[i].title,
              original: films[i].original_title,
              language: films[i].original_language,
              rating: films[i].vote_average
            };
            var templateCompiled = template(film);
            $(templateCompiled).insertAfter(".row .card:last-child");
          }
        },
        error: function (err) {
          alert("Qualcosa è andato storto!");
        }
      });
    }
  }










});
