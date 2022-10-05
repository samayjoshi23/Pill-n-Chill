export interface Order{
    orderId: string;
    userId: string;
    productId: string,
    firstName: string,
    lastName: string,
    contact: number,
    street: string,
    city: string,
    state: string,
    country: string,
    zip: number,
    productName: string,
    quantity: number,
    total: number,
    orderDate: Date,
    orderStatus: string,
    paymentStatus: string,
    paymentMode: string,
}