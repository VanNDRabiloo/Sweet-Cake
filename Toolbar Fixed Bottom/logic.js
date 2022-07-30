let isOpenToolbar = false;
window.addEventListener("scroll", () => {
    const screenWidth = window.innerWidth;
    if ( window.pageYOffset > 600 && !isOpenToolbar) {
        $(".toolbar-fixed-bottom-cpn .toolbar-container.flex-center").fadeIn("slow", function () {
      isOpenToolbar = true;
    });
  } else if (window.pageYOffset <= 600 && isOpenToolbar) {
    $(".toolbar-fixed-bottom-cpn .toolbar-container.flex-center").fadeOut("slow", function () {
      isOpenToolbar = false;
    });
  }
});

 if ( window.pageYOffset > 600 && !isOpenToolbar) {
        $(".toolbar-fixed-bottom-cpn .toolbar-container.flex-center").fadeIn("slow", function () {
      isOpenToolbar = true;
    });
}
$('.toolbar-fixed-bottom-cpn').parent().parent().parent().parent().css("z-index", "3")