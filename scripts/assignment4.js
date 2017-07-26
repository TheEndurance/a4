var ProductList = function () {
    var productList = new Array();

    var AddProduct = function (product) {
        "use strict";
        productList.push(product);
    }
    var GetProductById = function (id) {
        "use strict";
        for (var i = 0; i < productList.length; i++) {
            if (productList[i].id == id) {
                return productList[i];
            }
        }
    }
    return {
        AddProduct: AddProduct,
        GetProductById: GetProductById,
        productList: productList
    }

}();


var ShoppingCart = function () {
    var shoppingCart = new Array();

    //returns -1 if no product is found, otherwise returns the index
    var FindProductIndex = function (product) {
        "use strict";
        for (var i = 0; i < shoppingCart.length; i++) {
            if (shoppingCart[i].product.id === product.id) {
                return i;
            }
        }
        return -1;
    }
    var FindProductIndexById = function (id) {
        "use strict";
        for (var i = 0; i < shoppingCart.length; i++) {
            if (shoppingCart[i].product.id == id) {
                return i;
            }
        }
        return -1;
    }
    var AddToCart = function (product) {
        "use strict";
        if (FindProductIndex(product) === -1) {
            shoppingCart.push(new CartItem(product, 1));
            return shoppingCart[FindProductIndex(product)];

        } else {
            shoppingCart[FindProductIndex(product)].quantity++;
            return null;
        }
    }
    var RemoveFromCart = function (product) {
        "use strict";
        if (FindProductIndex(product) != -1 && shoppingCart[FindProductIndex(product)].quantity === 1) {
            shoppingCart.splice(FindProductIndex(product), 1);
        } else if (FindProductIndex(product) != -1 && shoppingCart[FindProductIndex(product)].quantity > 1) {
            shoppingCart[FindProductIndex(product)].quantity--;
        }
    }

    var EmptyProductFromCartById = function (id) {
        "use strict";
        if (FindProductIndexById(id) !== -1) {
            shoppingCart.splice(FindProductIndexById(id), 1);
        }
    }
    return {
        shoppingCart: shoppingCart,
        AddToCart: AddToCart,
        RemoveFromCart: RemoveFromCart,
        EmptyProductFromCartById: EmptyProductFromCartById,
        FindProductIndexById: FindProductIndexById
    }

}();

function CreateId(name) {
    return name.replace(/\s+/g, '-').toLowerCase();
}

// Product Class
function Product(brand,name, price, image, description) {
    //public properties (this)
    this.brand=brand;
    this.name = name;
    this.price = price;
    this.image = image;
    this.description = description

    this.id = CreateId(this.name);
}


// Cart Item Class
function CartItem(product, quantity) {
    this.product = product;
    this.quantity = quantity;
}

var chuckClassic = new Product("Converse","Chuck Taylor All Star Classic Colours" ,49.99, "images/chuck_classic.jpg", "Color: Red / Style: M9621C");
var chuckNeonFlora = new Product("Converse","Chuck Taylor All Star Neon Floral" ,39.99, "images/chuck_neon_floral.jpg", "Color: Black/White/Aegean Aqua / Style: 654210C");
var chuckNeon = new Product("Converse","Chuck Taylor All Star II Neon" ,79.99, "images/chuck_neon.jpg", "Color: Teal/Navy/White / Style: 151116C");
var nikeAirforce = new Product("Nike","Air Force 1 07 HIGH LV8" ,49.99, "images/nike_airforce.jpg", "Color: Black/Summit White / Style: 806403-006");
var nikeFlyKnit = new Product("Nike","Roshe Two Flyknit V2" ,49.99, "images/nike_flyknit.jpg", "Color: Dark Grey/Cool Grey / Style: 918263-001");
var nikeJordan = new Product("Nike","Jordan Spizike" ,179.99, "images/nike_jordan.jpg", "Color: White/Cement Grey / Style: 315371-122");



ProductList.AddProduct(chuckClassic);
ProductList.AddProduct(chuckNeonFlora);
ProductList.AddProduct(chuckNeon);
ProductList.AddProduct(nikeAirforce);
ProductList.AddProduct(nikeFlyKnit);
ProductList.AddProduct(nikeJordan);