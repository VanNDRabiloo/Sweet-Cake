let isOpenToolbar = false;
window.addEventListener("scroll", () => {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 1200 && window.pageYOffset > 600 && !isOpenToolbar) {
        $(".toolbar-fixed-bottom-cpn .toolbar-container.flex-center").fadeIn("slow", function () {
        console.log('fasdfasdf');
      isOpenToolbar = true;
    });
  } else if (window.pageYOffset <= 600 && isOpenToolbar) {
    $(".toolbar-fixed-bottom-cpn .toolbar-container.flex-center").fadeOut("slow", function () {
      isOpenToolbar = false;
    });
  }
});
