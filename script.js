'use strict';

var coffeeTypes = [
    {
        name: "espresso",
        description: "long",
        price: 1
    },{
        name: "capuccino",
        description: "short",
        price: 1
    },{
        name: "latte machiatto",
        description: "with milk",
        price: 1.5
    },{
        name: "irish",
        description: "with wiskey",
        price: 2
    }
];

function CCoffeeShop() {
    this.menu;
    this.orders;
    this.div;
}

CCoffeeShop.prototype.init = function() {
    this.menu = {
        coffees: []
    };
    this.order = {
        coffees: [],
        totalPrice: null
    };
    this.div = $('<div id="coffeeContainer"><h3><strong>Shop</strong></h3></div>');
    $('#mainContainer').append(this.div);
    this.divOrder = $('#orderContainer');

    for(var i = 0; i < coffeeTypes.length; i++) {
        var coffee = new CCoffee();
        coffee.init(coffeeTypes[i]);
        this.menu.coffees.push(coffee);      
    }
};

CCoffeeShop.prototype.addToOrder = function(coffee) {
    var self = this;
    this.order.coffees.push(coffee) ;
    this.order.totalPrice += coffee.price;

    var coffeeOrder = new CCoffeeOrder();
    coffeeOrder.init(coffee);
    
    console.log(this.order);
};

CCoffeeShop.prototype.removeFromOrder = function(coffeeOrder) {
    coffeeOrder.div.remove();
    this.order.coffees.pop(coffeeOrder);
};

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

    this.div = $('<div id="' + this.name + '">' 
    + '<span class="coffeeName">'
    + '<span class="price">' + this.price + '</span>'
    + '<img src=></>' + this.name + '</span>'+ this.name + '</div>');
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

    this.div = $('<div class="' + this.name + '">' + this.name + '</div>');
    this.div.click(function(){
        shop.removeFromOrder(self);
    });
    shop.divOrder.append(this.div);
};

var shop = new CCoffeeShop();
shop.init();