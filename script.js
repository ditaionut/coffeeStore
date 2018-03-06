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
    this.recentArray;
}

CCoffeeShop.prototype.init = function() {
    // this.menu = {
    //     coffees: []
    // };
    this.recentArray = [];
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
      //  coffee.addToOrder()
        // this.menu.coffees.push(coffee);  

    }
};
//--------------ADD COFFEE TO ORDER------------
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
};

function CCoffee() {
    this.price;
    this.name;
    this.description;
    this.src;
    this.div;
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
  //DUPLICATE CODE -1
    this.div.click(function(){
        shop.addToOrder(self);
        var recent = new CCoffee;
        recent.duplicate(coffee);
        shop.recentArray.push(recent);
    });
    shop.div.append(this.div);
};

//---------RECENTLY ADDED----------

CCoffee.prototype.duplicate = function(coffee) {
    this.init(coffee);
    this.div.attr('id', this.name + 'coffeeDuplicate');
    this.div.detach().appendTo('#recommendedCoffee');
};

function CCoffeeRecentlyAdded(){
    this.coffees;
    this.recentCoffees;
}

CCoffeeRecentlyAdded.prototype.init = function(coffee){
    this.coffees = [];
    this.recentCoffees = [];

    for(var i; i < coffeeTypes.length; i++){
        var recentAdded = new CCoffee();
        recentAdded.init(coffeeTypes[i]);
        this.coffee.push(recentAdded);
    }
};

//-------ORDERED COFFEES--------

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
    + '<span class="toolTip">Click to remove</span>'+'</div>');
    this.div.click(function(){
        shop.removeFromOrder(self);
        shop.reUpdatePrice(self);
    });
    shop.divOrder.append(this.div);
};

var shop = new CCoffeeShop();
shop.init();

