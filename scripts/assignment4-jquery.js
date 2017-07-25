$(document).ready(function () {

    /*
     * Shopping cart common functions
     */
    function IncrementQuantity(productId) {
        var quantity = parseInt($("#quantity-" + productId).attr('value'), 10);
        $("#quantity-" + productId).attr('value', quantity + 1);
        ShoppingCart.AddToCart(ProductList.GetProductById(productId));
        UpdateProductTotal(productId, quantity + 1);
        UpdateGrandTotal();
    }

    function DecrementQuantity(productId) {
        var quantity = parseInt($("#quantity-" + productId).attr('value'), 10);
        if (quantity > 1) {
            $("#quantity-" + productId).attr('value', quantity - 1);
            ShoppingCart.RemoveFromCart(ProductList.GetProductById(productId));
            UpdateProductTotal(productId, quantity - 1);
            UpdateGrandTotal();
            return true;
        }
        return false;
    }

    function UpdateProductTotal(productId, quantity) {
        var basePrice = ProductList.GetProductById(productId).price;
        $("table#shoppingCart #total-price-" + productId).html("<strong>$" + (basePrice * quantity).toFixed(2) + "</strong>");
    }

    function UpdateGrandTotal() {
        var total = 0;
        for (var i = 0; i < ShoppingCart.shoppingCart.length; i++) {
            var basePrice = ShoppingCart.shoppingCart[i].product.price;
            var quantity = parseInt(ShoppingCart.shoppingCart[i].quantity);
            total += (basePrice * quantity)
        }
        $("table#shoppingCart #grand-total").html("<strong>$" + (total).toFixed(2) + "</strong>")
        $("table#shoppingCart #grand-total").attr("data-grand-total",(total).toFixed(2));
    }
    ////////////////////////////////////////////////////////////////////////////

    /*
     *  Adding Products to Cart
     */
    $("#productsRow").on("click", "button.js-product-add", function () {
        var productId = $(this).attr("data-product-id");

        if (ShoppingCart.FindProductIndexById(productId) === -1) { //New product is added to the cart
            var cartItem = ShoppingCart.AddToCart(ProductList.GetProductById(productId));
            UpdateGrandTotal();
            HandleBarProductTemplate(cartItem);
        } else { //its not a new product
            IncrementQuantity(productId);
        }
        $('html, body').animate({
            scrollTop: $("table#shoppingCart").offset().top - 100
        }, 'slow');

    })
    ////////////////////////////////////////////////////////////////////////////

    /*
     *  Incrementing / Decrementing Product Quantity
     */
    $("#shoppingCartRow").on("click", "a.js-quantity", function () {
        var productId = $(this).attr("data-product-id");
        var direction = $(this).attr("data-dir");
        switch (direction) {
            case "up":
                IncrementQuantity(productId);
                break;
            case "down":
                DecrementQuantity(productId)
                break;
        }
    })
    ////////////////////////////////////////////////////////////////////////////

    /*
     *  Remove Product from shopping cart
     */
    $("table#shoppingCart tbody").on("click", "button.js-remove-product", function () {
        var productId = $(this).attr('data-product-id');
        var tableRow = $("table#shoppingCart tbody tr#" + productId);
        tableRow.fadeOut(500, function () {
            tableRow.remove();
        });
        ShoppingCart.EmptyProductFromCartById(productId);
        UpdateGrandTotal();
    });
    ////////////////////////////////////////////////////////////////////////////

    /*
     *  Checkout scroll down
     */
    $("#go-checkout").click(function () {
        setTimeout(function () {
            $("html, body").animate({
                scrollTop: $(document).height()
            }, "slow");
        }, 200)

    })
    ////////////////////////////////////////////////////////////////////////////

    /*
     * Append Hidden Field for shopping cart JSON
     */
    $("#checkout-form").submit(function (event) {
        if (ErrorMessages.compoundErrorMessages.length === 0) {
            var data = JSON.stringify(ShoppingCart.shoppingCart);
            var grandTotal = $("table#shoppingCart #grand-total").attr("data-grand-total");
            $('<input type="hidden" name="json"/>').val(data).appendTo('#checkout-form');
            $('<input type="hidden" name="grand-total"/>').val(grandTotal).appendTo('#checkout-form');
        }
    });
    ////////////////////////////////////////////////////////////////////////////

    /*
     *  Handlebar Templating for Products
     */
    var productSource = $("#product-template").html();
    var productTemplate = Handlebars.compile(productSource);
    var productContext = {
        product: ProductList.productList
    };
    var productHtml = productTemplate(productContext);
    $("#productsRow").append(productHtml);
    ////////////////////////////////////////////////////////////////////////////

    /*
     *  Handlebar Templating for Shopping Cart
     */
    function HandleBarProductTemplate(cartItem) {
        var shoppingCartSource = $("#shopping-cart-template").html();
        var shoppingCartTemplate = Handlebars.compile(shoppingCartSource);
        var shoppingCartContext = cartItem;
        var shoppingCartHtml = shoppingCartTemplate(shoppingCartContext);
        $(shoppingCartHtml).hide().prependTo("table#shoppingCart tbody").fadeIn(500);
    }
    ////////////////////////////////////////////////////////////////////////////


})