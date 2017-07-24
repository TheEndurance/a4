function CreateId(name) {
    return name.replace(/\s+/g, '-').toLowerCase();
}

function Product(name, price, image,description="") {
    //public properties (this)
    this.name = name;
    this.price = price;
    this.image = image;
    this.description=description
    this.id = CreateId(this.name);
}

function CartItem(product,quantity){
    this.product = product;
    this.quantity = quantity;
}

var ShoppingCart = function(){
    shoppingCart = new Array();
    var HasProduct = function(product){
        for(var i=0;i<shoppingCart.length;i++){
            if (shoppingCart[i].product.name===product.name){
                return true;
            }
        }
        return false;
    }
    var FindProductIndex = function(product){
        for(var i=0;i<shoppingCart.length;i++){
            if (shoppingCart[i].product.name===product.name){
                return i;
            }
        }
    }
    var AddToCart = function(product){
        if (!HasProduct(product)){
            shoppingCart.push(new CartItem(product,1));
        } else {
            shoppingCart[FindProductIndex(product)].quantity++;
        }
    }
    var RemoveFromCart = function(product){
        "use strict";
        if (HasProduct(product) && shoppingCart[FindProductIndex(product)].quantity===1){
            shoppingCart.splice(FindProductIndex(product),1);
        } else if (HasProduct(product) && shoppingCart[FindProductIndex(product)].quantity > 1){
            shoppingCart[FindProductIndex(product)].quantity--;
        }
    }
    return {
        shoppingCart:shoppingCart,
        AddToCart:AddToCart,
        RemoveFromCart:RemoveFromCart
    }

}();

var phone = new Product("Iphone 6", 199.99, "images/iphone6.jpg");
phone.description = "Apple iPhone 6. Apple iPhone 6 smartphone was launched in September 2014. The phone comes with a 4.70-inch touchscreen display with a resolution of 750 pixels by 1334 pixels at a PPI of 326 pixels per inch.";
var xbox = new Product("Xbox", 299.99, "images/xbox.jpg");
xbox.description = "Each console has a variety of games. Most games released on the original Xbox are backwards compatible and can be played directly on its successor, Xbox 360. Backward compatibility with Xbox 360 titles was added to Xbox One in June 2015, although titles requiring Kinect or USB peripherals will not be supported.";

var productList = new Array(phone, xbox);




window.onload = function () {

    console.log(ShoppingCart.shoppingCart);
}