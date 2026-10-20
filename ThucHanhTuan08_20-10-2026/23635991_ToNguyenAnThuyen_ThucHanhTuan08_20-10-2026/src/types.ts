export type User = {
    id: number;
    name: string;
    email: string;
};

export type AuthResult = {
    token: string;
    user: User;
};

export type Book = {
    id: number;
    title: string;
    author: string;
    category: string;
    price: number;
    image: string;
    description: string;
};

export type Review = {
    id: number;
    bookId: number;
    userId: number;
    userName: string;
    rating: number;
    comment: string;
    createdAt: string;
};
