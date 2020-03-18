$(document).ready(function () {

  $(".actions .fas.fa-search").click(function () {
    var stringaCercata = $(".actions #search-text").val().toLowerCase();
    // console.log(stringaCercata);
    $.ajax({
      url: "",
      method: "GET",
      success: function (data) {
        
      },
      error: function (err) {
        alert("Qualcosa è andato storto!");
      }
    });
  });












});
