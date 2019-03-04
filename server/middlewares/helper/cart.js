function testEmail(email_address) {
    return /(?:[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*|(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-zA-Z0-9-]*[a-zA-Z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(email_address);
}

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
    testEmail,
    roundPrice,
    shippingCost,
    subTotal
}