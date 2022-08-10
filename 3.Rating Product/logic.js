fetch(`https://api-cdn.yotpo.com/v1/widget/71R5wGczaTuLZ8PnmAXjRZOaSk6D2Yj8sJQJQuqB/products/${product.id}/reviews.json`)
  .then(response => response.json())
  .then((data) => {
    if(data?.status?.code === 200){
      const averageRating = data?.response?.bottomline?.average_score
      const ratingInt = Math.floor(averageRating);
      const ratingDecimal = averageRating%1
      const noRating = 5 - Math.ceil(averageRating);
      for(let i = 0 ; i < ratingInt ; i++) {
        $('.rating-product-cpn ul.gf_icon-list').append('<li class="item"><div class="item-content"><i class="fas fa-star"></i></div></li>')
      }
      if(ratingDecimal > 0) {
        $('.rating-product-cpn ul.gf_icon-list').append('<li class="item"><div class="item-content"><i class="fas fa-star-half-alt"></i></div></li>')
      }
      for(let i = 0 ; i < noRating ; i++) {
        $('.rating-product-cpn ul.gf_icon-list').append('<li class="item"><div class="item-content"><i class="far fa-star"></i></div></li>')
      }
      $('.rating-product-cpn .rating-text').text(`${Math.round(averageRating*10)/10} (XX件)`)
    }
  }
);