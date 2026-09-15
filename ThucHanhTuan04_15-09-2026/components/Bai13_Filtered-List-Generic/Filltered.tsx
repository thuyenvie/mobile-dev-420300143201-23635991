function filterByName<T extends { name: string }>(
    items: T[],
    keyword: string
): T[] {
    return items.filter((item) =>
        item.name.toLowerCase().includes(keyword.toLowerCase())
    );
}

type User = {
    id: number;
    name: string;
};

type Product = {
    id: number;
    name: string;
    price: number;
};

const users: User[] = [
    { id: 1, name: "Nguyen Van An" },
    { id: 2, name: "Tran Van Binh" },
];

const products: Product[] = [
    { id: 1, name: "iPhone 15", price: 1000 },
    { id: 2, name: "Samsung Galaxy", price: 800 },
];

const filteredUsers = filterByName(users, "nguyen");
const filteredProducts = filterByName(products, "iphone");

console.log(filteredUsers);
console.log(filteredProducts);