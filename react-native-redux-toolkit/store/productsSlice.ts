import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
}

interface ProductsState {
  items: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  favoriteIds: number[];
}

const initialState: ProductsState = {
  items: [],
  status: 'idle',
  error: null,
  favoriteIds: [],
};

function isProduct(value: unknown): value is Product {
  if (typeof value !== 'object' || value === null) return false;

  const product = value as Record<string, unknown>;
  return (
    typeof product.id === 'number' && Number.isInteger(product.id) &&
    typeof product.title === 'string' &&
    typeof product.price === 'number' && Number.isFinite(product.price) &&
    typeof product.thumbnail === 'string'
  );
}

export const PRODUCTS_URL =
  'https://dummyjson.com/products?limit=10&select=title,price,thumbnail';

export const fetchProducts = createAsyncThunk<
  Product[],
  void,
  { state: { products: ProductsState }; rejectValue: string }
>('products/fetchProducts', async (_, { rejectWithValue, signal }) => {
  const controller = new AbortController();
  const abortRequest = () => controller.abort();
  signal.addEventListener('abort', abortRequest);
  const timeout = setTimeout(() => controller.abort(), 15000);
  try {
    const response = await fetch(PRODUCTS_URL, { signal: controller.signal });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data: unknown = await response.json();
    // Kiểu TypeScript không kiểm tra dữ liệu JSON nhận được lúc chạy.
    if (
      typeof data !== 'object' || data === null ||
      !('products' in data) || !Array.isArray(data.products) ||
      !data.products.every(isProduct)
    ) {
      return rejectWithValue('Dữ liệu sản phẩm không hợp lệ. Vui lòng thử lại.');
    }
    return data.products;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error && error.name === 'AbortError'
        ? 'Yêu cầu quá thời gian. Vui lòng thử lại.'
        : 'Không tải được sản phẩm. Kiểm tra kết nối và thử lại.',
    );
  } finally {
    clearTimeout(timeout);
    signal.removeEventListener('abort', abortRequest);
  }
}, {
  // Tránh gửi thêm yêu cầu khi yêu cầu trước vẫn đang chạy.
  condition: (_, { getState }) => getState().products.status !== 'loading',
});

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    toggleFavorite(state, action: PayloadAction<number>) {
      const id = action.payload;
      if (state.favoriteIds.includes(id)) {
        state.favoriteIds = state.favoriteIds.filter((item) => item !== id);
      } else {
        state.favoriteIds.push(id);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.meta.aborted
          ? 'Đã hủy tải sản phẩm. Vui lòng tải lại.'
          : action.payload ?? 'Đã xảy ra lỗi. Vui lòng thử lại.';
      });
  },
});

export const { toggleFavorite } = productsSlice.actions;
export default productsSlice.reducer;
