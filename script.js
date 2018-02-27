'use strict';

var coffeeTypes = [
    {
        name: "Mocaccino",
        description: "choco",
        price: 5,
        src: "images/choco.png"
    },{
        name: "Espresso",
        description: "long",
        price: 1,
        src: "images/espresso.png"
    },{
        name: "Capuccino",
        description: "short",
        price: 1,
        src: "images/capuccino.png"
    },{
        name: "Latte Machiatto",
        description: "with milk",
        price: 1.5,
        src: "images/latte machiatto.png"
    },{
        name: "Irish",
        description: "with wiskey",
        price: 2,
        src: "images/irish.png"
    }
];

function CCoffeeShop() {
    this.menu;
    // this.orders;
    this.div;
}

CCoffeeShop.prototype.init = function() {
    // this.menu = {
    //     coffees: []
    // };
    this.order = {
        coffees: [],
        totalPrice: null
    };
    this.div = $('<div id="coffeeContainer"></div>');
    $('#mainContainer').append(this.div);
    this.divOrder = $('#orderContainer');

    for(var i = 0; i < coffeeTypes.length; i++) {
        var coffee = new CCoffee();
        coffee.init(coffeeTypes[i]);
        // this.menu.coffees.push(coffee);      
    }

    // this.div = $('<div id="coffeeRecommended"></div>');
    // $('#recommendedCoffee').append(this.div);

    // for(var i; i <= coffeeTypes.length; i++){
    //     var coffeeRecommend = new CSuggestion();
    //     coffeeRecommend.init(coffeeTypes[i]);
    //     this.menu.coffees.push(coffee);
    // }
};

CCoffeeShop.prototype.addToOrder = function(coffee) {
    var self = this;
    this.order.coffees.push(coffee);
    this.order.totalPrice += coffee.price;
    var coffeeOrder = new CCoffeeOrder();
    coffeeOrder.init(coffee);
    $('#totalPrice').html('Price: ' + this.order.totalPrice + '$');
};

CCoffeeShop.prototype.removeFromOrder = function(coffeeOrder) {
    coffeeOrder.div.remove();
    this.order.coffees.pop(coffeeOrder);
};

CCoffeeShop.prototype.reUpdatePrice = function(coffee){
    this.order.totalPrice -= coffee.price;
    $('#totalPrice').html('Price: ' + this.order.totalPrice + '$');
}

function CCoffee() {
    this.price;
    this.name;
    this.description;
    this.div;
    this.src;
}

CCoffee.prototype.init = function(coffee) {
    var self = this;
    this.price = coffee.price;
    this.name = coffee.name;
    this.src = coffee.src;
    this.description = coffee.description;

    this.div = $('<div id="' + this.name + 'Container" class="coffeeContainer">' 
    + '<span class="coffeeName">' + this.name + '</span>'
    + '<span class="price">' + ' Price: $' + this.price + '<br>' + '</span>'
    + '<img src="' + this.src +'" class="iconCoffee"/></div>');
    this.div.click(function(){
        shop.addToOrder(self);
    });
    shop.div.append(this.div);
};

function CCoffeeOrder() {
    this.price;
    this.name;
    this.description;
    this.div;
}

CCoffeeOrder.prototype.init = function(coffee) {
    var self = this;
    this.price = coffee.price;
    this.name = coffee.name;
    this.description = coffee.description;

    this.div = $('<div id="' + this.name + '" class="orderCoffeeName">' + this.name 
    +'<button id=removeButton>' + 'remove' + '</button>' + '</div>');
    this.div.click(function(){
        shop.removeFromOrder(self);
        shop.reUpdatePrice(self);
    });
    shop.divOrder.append(this.div);
};

var shop = new CCoffeeShop();
shop.init();

// Recently ordered coffees
function CSuggestion() {
    this.name;
    this.description;
    this.price;
    this.div;
}

CSuggestion.prototype.init = function(coffee) {
    this.name = coffee.name;
    this.description = coffee.descriprion;
    this.price = coffee.price;
    
    this.div = $('<div id="' + this.name + 'container">' + this.name + '</div>');
    shop.div.append(this.div);
};
