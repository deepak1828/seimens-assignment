export interface User {
    id: number;
    username: string;
    email: string;
    address: {
        city: string;
        state: string;
        pincode: number;
    }
}
