# Demo Redux Toolkit với DummyJSON

Demo React Native / Expo SDK 54 tải 10 sản phẩm từ:
`https://dummyjson.com/products?limit=10&select=title,price,thumbnail`.

## Chạy

Tại thư mục gốc dự án:

```sh
npm install
npm run web
```

Trên PowerShell chặn npm.ps1, dùng `npm.cmd` thay cho `npm`.
Chạy trên Android bằng `npm run android` khi đã có emulator/thiết bị phù hợp.
Màn hình Home render `components/redux-toolkit/index.tsx`.

## Luồng hoạt động

- `store/productsSlice.ts`: kiểu dữ liệu, thunk gọi API, reducer yêu thích và trạng thái request.
- `store/index.ts`: tạo store, suy luận RootState và AppDispatch.
- `store/hooks.ts`: useAppSelector và useAppDispatch có kiểu TypeScript.
- `app/_layout.tsx`: Provider cấp store cho toàn bộ màn hình.
- `components/redux-toolkit/index.tsx`: ghép giao diện, đọc state và dispatch action.
- `Header.tsx`: tiêu đề, thống kê và trạng thái tải/lỗi.
- `ActionButton.tsx`: nút tải lại, bị vô hiệu khi đang tải.
- `ProductItem.tsx`: thông tin sản phẩm và nút yêu thích, nhận dữ liệu qua props.
- `ProductSummary.tsx`: component thứ hai đọc thống kê từ cùng store.

Khi mở màn hình, `dispatch(fetchProducts())` phát action pending. Gọi API thành công
phát fulfilled; HTTP lỗi, mất mạng, JSON sai cấu trúc hoặc quá 15 giây phát rejected.
Hủy promise của thunk bằng `.abort()` cũng hủy request mạng và cho phép tải lại.
Nút tải lại bị vô hiệu khi đang tải; condition trong thunk chặn request trùng.
Tải lại thất bại giữ danh sách cũ. Nút yêu thích chỉ thay đổi state cục bộ,
không ghi dữ liệu lên DummyJSON. Tải lại toàn bộ ứng dụng sẽ mất danh sách yêu thích.

## Kiểm thử

```sh
node scripts/verify-redux.cjs
node scripts/verify-redux.cjs --live
npx tsc --noEmit --incremental false
npm run lint
npx expo export --platform web
```

`--live` gọi DummyJSON thật nên cần Internet; các ca còn lại dùng mock fetch.
Kiểm thử tải trực tiếp reducer/thunk TypeScript của demo và kiểm tra pending,
fulfilled, chặn request trùng, thêm/bỏ thích, state cũ bất biến, HTTP/network error,
giữ sản phẩm cũ, dữ liệu sai, hủy request, timeout, retry và danh sách rỗng. Đây là kiểm thử logic, không thay thế
kiểm tra thao tác giao diện trên thiết bị.

Các tệp `.doc` và `.docx` trong `docs/` là báo cáo đã xuất trước khi sắp xếp lại code.
Script `docs/build_report.py` đã cập nhật đường dẫn mới; các báo cáo cần xuất lại khi sử dụng.

## Tài liệu

- https://docs.expo.dev/versions/v54.0.0/
- https://redux-toolkit.js.org/tutorials/quick-start
- https://redux-toolkit.js.org/api/createAsyncThunk
- https://dummyjson.com/docs/products
