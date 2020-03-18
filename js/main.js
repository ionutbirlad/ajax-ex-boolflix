$(document).ready(function () {

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
        console.log(data);
      },
      error: function (err) {
        alert("Qualcosa è andato storto!");
      }
    });
  });












});
