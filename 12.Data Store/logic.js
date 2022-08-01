$(".data-store-cpn .custom-select").each(function () {
  var classes = $(this).attr("class"),
    id = $(this).attr("id"),
    name = $(this).attr("name");
  var template = '<div class="' + classes + '">';
  template +=
    '<span class="custom-select-trigger">' +
    $(this).attr("placeholder") +
    "</span>";
  template += '<div class="custom-options">';
  $(this)
    .find("option")
    .each(function () {
      template +=
        '<span class="custom-option ' +
        $(this).attr("class") +
        '" data-value="' +
        $(this).attr("value") +
        '">' +
        $(this).html() +
        "</span>";
    });
  template += "</div></div>";

  $(this).wrap('<div class="custom-select-wrapper"></div>');
  $(this).hide();
  $(this).after(template);
});
$(".data-store-cpn .custom-option:first-of-type").hover(
  function () {
    $(this).parents(".custom-options").addClass("option-hover");
  },
  function () {
    $(this).parents(".custom-options").removeClass("option-hover");
  }
);
$(".data-store-cpn .custom-select-trigger").on("click", function () {
  $("html").one("click", function () {
    $(".data-store-cpn .custom-select").removeClass("opened");
  });
  $(".data-store-cpn .data-wrapper").fadeToggle();
  $(this).parents(".custom-select").toggleClass("opened");
  event.stopPropagation();
});