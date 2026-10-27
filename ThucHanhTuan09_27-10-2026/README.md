# Tuần 8 — Giỏ hàng & Yêu thích (json-server)

Bộ mã nguồn được tổng hợp từ tài liệu Tuần 8 (Bài 1–4 và thử thách mã giảm giá). Các component mà tài liệu chỉ minh họa từng đoạn đã được hoàn thiện để dùng chung.

## Chạy

1. `npm install`
2. Terminal 1: `npm run server`
3. Terminal 2: `npx expo start`
4. Android Emulator dùng `http://10.0.2.2:3000`; Expo Web/iOS Simulator dùng `http://localhost:3000`. Với điện thoại Android thật, sửa `BASE_URL` ở `src/api/books.ts` thành IP LAN của máy tính (cùng Wi-Fi).

## File bài tập
- Bài 1: `src/store/cartSlice.ts`, `src/hooks/useDebouncedQuantities.ts`, `src/components/CartItemRow.tsx`, `src/screens/CartScreen.tsx`
- Bài 2: `src/hooks/usePersistSlice.ts`, `App.tsx`, `CartScreen.tsx`
- Bài 3: `src/store/wishlistSlice.ts`, `src/components/FavoriteButton.tsx`, `BookCard.tsx`, `BookDetailScreen.tsx`
- Bài 4: `src/components/BookGrid.tsx`, `AccountScreen.tsx`, `WishlistScreen.tsx`
- Thử thách: mã `SALE10`, `BOOK50K` tại `CartScreen.tsx`

Lưu ý: Bộ file này chưa được chạy xác nhận trên thiết bị/emulator trong môi trường hiện tại. Nếu bạn đã tạo dự án Expo riêng, hãy dùng dependencies tương thích với phiên bản Expo của dự án đó thay vì ghi đè package.json tùy tiện.
