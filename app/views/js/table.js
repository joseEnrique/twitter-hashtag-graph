$(function unfoldPost() {
  var actionButton = $(".material-card-action a");

  actionButton.on("click", function(e) {
    e.preventDefault();

    $(this).closest(".material-card").toggleClass("triggered");
    $(this).closest(".material-card-action").toggleClass("triggered");

  });
});