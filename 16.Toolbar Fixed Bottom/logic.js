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

function addProductToCart() {
  const productId = $('.choose-product-option-cpn .product-option-1.active').attr('data-id');
  const qualityToAdd = $('.count-number-product-cpn .num').val()
  let formData = {
   'items': [{
    'id': productId,
    'quantity': qualityToAdd
    }]
  };
  
  if(productId && qualityToAdd >= 1) {
    // add product to cart
    fetch(window.Shopify.routes.root + 'cart/add.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(async (response) => {
      if(response.ok){
        // get cart data
        fetch(window.Shopify.routes.root + 'cart.js')
          .then((response) => response.json())
          .then(data => {
            const priceFormated = new Intl.NumberFormat().format(data.total_price/100);
            $('.toolbar-fixed-bottom-cpn .total-price .number-price').text(priceFormated)
            
            animateCSS('.toolbar-fixed-bottom-cpn .product-added-animation', 'animate__fadeOutTopRight');
            // or
            animateCSS('.toolbar-fixed-bottom-cpn .product-added-animation', 'animate__fadeOutTopRight').then((message) => {
              // Do something after the animation
            });
          })
      } else {
        const data = await response.json();
        showToastMsg({
          title: data.message,
          message: data.description,
          type: "error",
          duration: 5000000
        });
      }
      
    })
    .catch((error) => {
      console.log('Error:', error);
    });
  } else {
    alert('No Product is selected')
  }
}

// animation add product to cart
const animateCSS = (element, animation, prefix = 'animate__') =>
new Promise((resolve, reject) => {
  const animationName = `${animation}`;
  const node = document.querySelector(element);
  node.style.display="flex";
  node.classList.add(`${prefix}animated`, animationName);

  // When the animation ends, we clean the classes and resolve the Promise
  function handleAnimationEnd(event) {
    event.stopPropagation();
    node.classList.remove(`${prefix}animated`, animationName);
    resolve('Animation ended');
    node.style.display="none";
  }

  node.addEventListener('animationend', handleAnimationEnd, {once: true});
});

// Logic toast message when add product err
function showToastMsg({ title = "", message = "", type = "info", duration = 3000 }) {
  const main = document.getElementById("toast");
  if (main) {
    const toast = document.createElement("div");

    // Auto remove toast
    const autoRemoveId = setTimeout(function () {
      main.removeChild(toast);
    }, duration + 1000);

    // Remove toast when clicked
    toast.onclick = function (e) {
      if (e.target.closest(".toast__close")) {
        main.removeChild(toast);
        clearTimeout(autoRemoveId);
      }
    };

    const icons = {
      success: "fas fa-check-circle",
      info: "fas fa-info-circle",
      warning: "fas fa-exclamation-circle",
      error: "fas fa-exclamation-circle"
    };
    const icon = icons[type];
    const delay = (duration / 1000).toFixed(2);

    toast.classList.add("toast", `toast--${type}`);
    toast.style.animation = `slideInLeft ease .3s, fadeOut linear 1s ${delay}s forwards`;

    toast.innerHTML = `
                    <div class="toast__icon">
                        <i class="${icon}"></i>
                    </div>
                    <div class="toast__body">
                        <h3 class="toast__title">${title}</h3>
                        <p class="toast__msg">${message}</p>
                    </div>
                    <div class="toast__close">
                        <i class="fas fa-times"></i>
                    </div>
                `;
    main.appendChild(toast);
  }
}

$('.toolbar-fixed-bottom-cpn .product-added-animation').attr('src',product.images[0])