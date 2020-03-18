$(document).ready(function () {

  // DA RIPETERE SOLO UNA VOLTA PER TEMPLATE
  var source = $("#card-template").html();
  var template = Handlebars.compile(source);
  // DA RIPETERE SOLO UNA VOLTA PER TEMPLATE


  $(".actions .fas.fa-search").click(function () {
    var stringaCercata = $(".actions #search-text").val().toLowerCase();
    // console.log(stringaCercata);
    var baseUrl = "https://api.themoviedb.org/3";
    $.ajax({
      // url: "https://api.themoviedb.org/3/search/movie?api_key=33dde37d29b1d13faeb21d0fefcc0389&query=ritorno+al+futuro",
      url: baseUrl + "/search/movie",
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
            image: films[i].poster_path,
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
  });












});
