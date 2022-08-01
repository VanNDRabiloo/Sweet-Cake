function handleChooseOptionProduct(event, price) {
  for (var i = 0, len = $(".choose-product-option-cpn .product-option-1").length; i < len; i++) {
    $(".choose-product-option-cpn .product-option-1")[i].classList.remove('active')
  }
  event.target.classList.toggle('active')
  $(".choose-product-option-cpn .price-number span").text(price)
}

function handleChooseOptionProduct2(event) {
  event.target.classList.toggle('active')
}

$(".choose-product-option-cpn .product-option-1")[0].classList.add('active')