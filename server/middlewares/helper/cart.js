const roundPrice = (price) => (Math.ceil(price*100)/100);

const shippingCost = (price) => {
    switch(true) {
        case (price == 0): return 0
        case (price < 400): return 9.95
        case (price < 500): return 11.25
        case (price < 600): return 14.25
        case (price < 900): return 24.50
        case (price < 1500): return 42
    }
}

const subTotal = (cart) => {
    let cost = 0;
    for(x in cart) 
        cost += cart[x].price*cart[x].quantity;
    return roundPrice(cost);
}

module.exports = {
    roundPrice,
    shippingCost,
    subTotal
}