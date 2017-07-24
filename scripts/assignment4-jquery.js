$(document).ready(function () {
    /*
     * Common functions
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
        $("table#shoppingCart #total-price-" + productId).html("<strong>$" + (basePrice * quantity).toFixed(
            2) + "</strong>");
    }

    function UpdateGrandTotal() {
        var total = 0;
        for (var i = 0; i < ShoppingCart.shoppingCart.length; i++) {
            var basePrice = ShoppingCart.shoppingCart[i].product.price;
            var quantity = parseInt(ShoppingCart.shoppingCart[i].quantity);
            total += (basePrice * quantity)
        }
        $("table#shoppingCart #grand-total").html("<strong>$" + (total).toFixed(2) + "</strong>")
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
     *  Handlebar Templating for Products
     */
    function HandleBarProductTemplate(cartItem) {
        var shoppingCartSource = $("#shopping-cart-template").html();
        var shoppingCartTemplate = Handlebars.compile(shoppingCartSource);
        var shoppingCartContext = cartItem;
        var shoppingCartHtml = shoppingCartTemplate(shoppingCartContext);
        $("table#shoppingCart tbody").prepend(shoppingCartHtml);
    }
    ////////////////////////////////////////////////////////////////////////////



})