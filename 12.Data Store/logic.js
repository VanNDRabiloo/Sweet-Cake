var appKey = '71R5wGczaTuLZ8PnmAXjRZOaSk6D2Yj8sJQJQuqB'
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
  $(".product-processed-by-store-cpn").fadeToggle();
  $(this).parents(".custom-select").toggleClass("opened");
  event.stopPropagation();
});

//get all product
// authencation
const options = {
  method: 'POST',
  headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
  body: JSON.stringify({
    grant_type: 'client_credentials',
    client_id: '71R5wGczaTuLZ8PnmAXjRZOaSk6D2Yj8sJQJQuqB',
    client_secret: '0wuicPGyVdXOtDPHs4p5rt2lzFX5nKjP2jCRIphG'
  })
};
fetch('https://api.yotpo.com/oauth/token', options)
  .then(response => response.json())
  .then(response => {
    const utoken = response.access_token
    fetch(`https://api.yotpo.com/v1/apps/${appKey}/products?utoken=${utoken}&count=5`)
      .then(response => response.json())
      .then((data) => {
        if(data?.status?.code === 200) {
          const listProducts = data.products
          if(listProducts?.length > 0){
             listProducts.forEach((item, index) => {
              if(index == 0) return
              else {
                  $('.product-processed-by-store-cpn .list-product').append(`<div class="product-wrapper">
                  <a href="${item.url}" target="blank">
                    <div class="img-product">
                      <img src="${item?.images?.[0]?.original}" alt="" class="gf_image" data-gemlang="en" width="1280" height="720" data-width="100%" data-height="aupx" title="" natural-width="1280" natural-height="720">
                    </div>
                    <div class="detail-product">
                      <div class="name-product">
                        <p>${item?.name}</p>
                      </div>
                      <div class="rating-product">
                        <div class="module gf_module-{{align_lg}} gf_module-{{align_lg}}-lg gf_module-{{align_md}}-md gf_module-{{align_sm}}-sm gf_module-{{align_xs}}-xs {{extraClass}}">
                          <ul class="gf_icon-list gf_icon-list-${index}"></ul>
                        </div>
                        <p class="rating-text rating-text-${index}"></p>
                      </div>
                      <div class="price-product">￥XXXXX<span>(税込)</span></div>
                    </div>
                  </a>
                </div>
                `)
              handleRenderRating(item?.average_score, `.product-processed-by-store-cpn ul.gf_icon-list-${index}`, `.product-processed-by-store-cpn .rating-text-${index}`)
                }
              })
          }
        }
      }
    );
  })
  .catch(err => console.error(err));
  
  
  // handle render rating star
  function handleRenderRating(averageRating, listStarElemt, textElemt, noteAfterScore) {
      const ratingInt = Math.floor(averageRating);
      const ratingDecimal = averageRating%1
      const noRating = 5 - Math.ceil(averageRating);
      for(let i = 0 ; i < ratingInt ; i++) {
        $(listStarElemt).append('<li class="item"><div class="item-content"><i class="fas fa-star"></i></div></li>')
      }
      if(ratingDecimal > 0) {
        $(listStarElemt).append('<li class="item"><div class="item-content"><i class="fas fa-star-half-alt"></i></div></li>')
      }
      for(let i = 0 ; i < noRating ; i++) {
        $(listStarElemt).append('<li class="item"><div class="item-content"><i class="far fa-star"></i></div></li>')
      }
      $(textElemt).text(`${Math.round(averageRating*10)/10} ${noteAfterScore || ''}`)
  }