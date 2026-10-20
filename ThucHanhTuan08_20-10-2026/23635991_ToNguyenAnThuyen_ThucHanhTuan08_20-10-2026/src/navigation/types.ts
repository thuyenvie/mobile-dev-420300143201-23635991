export type RootStackParamList = {
    Home: undefined;
    Auth: {
        redirect?: "Checkout" | "BookDetail";
        bookId?: number;
    } | undefined;
    Checkout: undefined;
    BookDetail: { bookId: number };
};
