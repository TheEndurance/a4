var ProductList = function () {
    var productList = new Array();

    var AddProduct = function (product) {
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

var phone = new Product("Iphone 6", 199.99, "images/iphone6.jpg");
phone.description = "Apple iPhone 6. Apple iPhone 6 smartphone was launched in September 2014. The phone comes with a 4.70-inch touchscreen display with a resolution of 750 pixels by 1334 pixels at a PPI of 326 pixels per inch.";
var xbox = new Product("Xbox", 299.99, "images/xbox.jpg");
xbox.description = "Each console has a variety of games. Most games released on the original Xbox are backwards compatible and can be played directly on its successor, Xbox 360. Backward compatibility with Xbox 360 titles was added to Xbox One in June 2015, although titles requiring Kinect or USB peripherals will not be supported.";

ProductList.AddProduct(phone);
ProductList.AddProduct(xbox);

function CreateId(name) {
    return name.replace(/\s+/g, '-').toLowerCase();
}

function Product(name, price, image, description = "") {
    //public properties (this)
    this.name = name;
    this.price = price;
    this.image = image;
    this.description = description
    this.id = CreateId(this.name);
}

function CartItem(product, quantity) {
    this.product = product;
    this.quantity = quantity;
}

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

    var RemoveAllFromCart = function (product) {
        "use strict";
        if (FindProductIndex(product) != -1) {
            shoppingCart.splice(FindProductIndex(product), 1);
        }
    }
    return {
        shoppingCart: shoppingCart,
        AddToCart: AddToCart,
        RemoveFromCart: RemoveFromCart,
        RemoveAllFromCart: RemoveAllFromCart,
        FindProductIndexById: FindProductIndexById
    }

}();



window.onload = function () {}