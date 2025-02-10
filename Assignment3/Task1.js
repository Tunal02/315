const orders = [
    {
        id: 101, customer: "Alice",
        products: [
            { name: "Laptop", category: "Electronics", price: 1200, quantity: 1 },
            { name: "Mouse", category: "Electronics", price: 25, quantity: 2 },
            { name: "Notebook", category: "Stationery", price: 5, quantity: 5 } 
        ]
    },
    {
        id: 102, customer: "Bob",
        products: [
            { name: "T-shirt", category: "Clothing", price: 20, quantity: 3 },
            { name: "Jeans", category: "Clothing", price: 40, quantity: 1 },
            { name: "Cap", category: "Accessories", price: 15, quantity: 2 } 
        ]
    }
];

function summarizeOrders(orders) {
    const order = orders.map((e) => {
        let totalAmount = 0; 
        e.products.forEach(product => {
            totalAmount += product.price * product.quantity; 
        });


        const categoryCount = e.products.reduce((accumulator, product) => {
            const category = product.category;
            if (accumulator[category]){
                accumulator[category]++
            }
            else{
                accumulator[category]=1

            }
            return accumulator;
        }, {});

        return { orderID: e.id, customer: e.customer, totalAmount:totalAmount,category:categoryCount }; 
    });

    console.log(order);
}

summarizeOrders(orders);
