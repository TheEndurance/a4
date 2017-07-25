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
function Product(name, price, image, description = "") {
    //public properties (this)
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

var phone = new Product("Iphone 6", 199.99, "images/iphone6.jpg");
var xbox = new Product("Xbox", 299.99, "images/xbox.jpg");
var playstationvr = new Product("Playstation VR", 249.99, "images/vr.jpg");
var nintendoswitch = new Product("Nintendo Switch", 399.99, "images/switch.jpg");
var playstation4 = new Product("Playstation 4", 349.99, "images/ps4.jpg");


phone.description = "Apple iPhone 6. Apple iPhone 6 smartphone was launched in September 2014. The phone comes with a 4.70-inch touchscreen display with a resolution of 750 pixels by 1334 pixels at a PPI of 326 pixels per inch.";
xbox.description = "Each console has a variety of games. Most games released on the original Xbox are backwards compatible and can be played directly on its successor, Xbox 360. Backward compatibility with Xbox 360 titles was added to Xbox One in June 2015, although titles requiring Kinect or USB peripherals will not be supported.";
playstationvr.description = "Discover a new world of unexpected gaming and entertainment experiences with PlayStation®VR. Redefine your expectations of immersion in gaming with moments so intense your intuition takes over. Step into incredible virtual worlds and experience entertainment in new and extraordinary ways.";
nintendoswitch.description = "Introducing Nintendo Switch, the new home video game system from Nintendo. In addition to providing single and multiplayer thrills at home, the Nintendo Switch system can be taken on the go so players can enjoy a full home console experience anytime, anywhere. The mobility of a handheld is now added to the power of a home gaming system, with unprecedented new play styles brought to life by the two new Joy-Con controllers.";
playstation4.description = "PlayStation 4 (PS4) is a line of home video game consoles developed by Sony Interactive Entertainment. Announced as the successor to the PlayStation 3 during a press conference on February 20, 2013, it was launched on November 15 in North America, November 29 in Europe, South America and Australia; and February 22, 2014, in Japan. It competes with Nintendo's Wii U and Microsoft's Xbox One, as part of the eighth generation of video game consoles.";

ProductList.AddProduct(phone);
ProductList.AddProduct(xbox);
ProductList.AddProduct(playstationvr);
ProductList.AddProduct(nintendoswitch);
ProductList.AddProduct(playstation4);