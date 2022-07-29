function handleChooseOptionProduct(event) {
  for (var i = 0, len = $(".choose-product-option-cpn .product-option-1").length; i < len; i++) {
    $(".choose-product-option-cpn .product-option-1")[i].classList.remove('active')
  }
  event.target.classList.toggle('active')
}

function handleChooseOptionProduct2(event) {
  event.target.classList.toggle('active')
}

$(".choose-product-option-cpn .product-option-1")[0].classList.add('active')