// Chạy: node scripts/verify-redux.cjs [--live]
// Nạp trực tiếp mã TypeScript của demo, không tạo bản sao reducer để kiểm thử.
const fs = require('node:fs');
const assert = require('node:assert/strict');
const ts = require('typescript');
const { configureStore } = require('@reduxjs/toolkit');

require.extensions['.ts'] = (module, filename) => {
  const source = fs.readFileSync(filename, 'utf8');
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  });
  module._compile(outputText, filename);
};

const { default: reducer, fetchProducts, toggleFavorite } = require('../store/productsSlice.ts');
const makeStore = () => configureStore({ reducer: { products: reducer } });
const originalFetch = global.fetch;

async function main() {
  const store = makeStore();
  const sample = { id: 1, title: 'Test product', price: 9.99, thumbnail: 'https://example.com/1.png' };
  let finishRequest;
  let requests = 0;
  global.fetch = () => {
    requests += 1;
    return new Promise((resolve) => { finishRequest = resolve; });
  };
  const request = store.dispatch(fetchProducts());
  assert.equal(store.getState().products.status, 'loading');
  await store.dispatch(fetchProducts());
  assert.equal(requests, 1);
  finishRequest({ ok: true, json: async () => ({ products: [sample] }) });
  await request;
  assert.equal(store.getState().products.status, 'succeeded');
  assert.deepEqual(store.getState().products.items, [sample]);
  console.log('PASS pending, fulfilled, duplicate request guard');

  const before = store.getState();
  store.dispatch(toggleFavorite(1));
  assert.deepEqual(store.getState().products.favoriteIds, [1]);
  assert.deepEqual(before.products.favoriteIds, []);
  store.dispatch(toggleFavorite(1));
  assert.deepEqual(store.getState().products.favoriteIds, []);
  console.log('PASS add/remove favorite and immutable previous state');

  for (const mock of [
    async () => ({ ok: false, status: 500 }),
    async () => { throw new TypeError('Network unavailable'); },
  ]) {
    global.fetch = mock;
    await store.dispatch(fetchProducts());
    assert.equal(store.getState().products.status, 'failed');
    assert.ok(store.getState().products.error);
    assert.deepEqual(store.getState().products.items, [sample]);
  }
  console.log('PASS HTTP/network error; previous products preserved');

  for (const payload of [null, {}, { products: null }, { products: [null] },
    { products: [{ ...sample, price: '9.99' }] }]) {
    global.fetch = async () => ({ ok: true, json: async () => payload });
    await store.dispatch(fetchProducts());
    assert.equal(store.getState().products.status, 'failed');
    assert.ok(store.getState().products.error);
    assert.deepEqual(store.getState().products.items, [sample]);
  }
  console.log('PASS malformed API data rejected; previous products preserved');

  let fetchSignal;
  global.fetch = (_, { signal }) => {
    fetchSignal = signal;
    return new Promise((_, reject) => {
      signal.addEventListener('abort', () => {
        const error = new Error('Aborted');
        error.name = 'AbortError';
        reject(error);
      }, { once: true });
    });
  };
  const cancelled = store.dispatch(fetchProducts());
  cancelled.abort();
  const cancelledAction = await cancelled;
  assert.equal(cancelledAction.meta.aborted, true);
  assert.equal(fetchSignal.aborted, true);
  assert.equal(store.getState().products.status, 'failed');
  assert.deepEqual(store.getState().products.items, [sample]);
  console.log('PASS cancelling thunk aborts network request');

  const originalSetTimeout = global.setTimeout;
  const originalClearTimeout = global.clearTimeout;
  let expire;
  let timerCleared = false;
  const timer = {};
  try {
    global.setTimeout = (callback, delay) => {
      assert.equal(delay, 15000);
      expire = callback;
      return timer;
    };
    global.clearTimeout = (value) => { timerCleared = value === timer; };
    const timedOut = store.dispatch(fetchProducts());
    expire();
    const timeoutAction = await timedOut;
    assert.equal(timeoutAction.meta.rejectedWithValue, true);
    assert.equal(fetchSignal.aborted, true);
    assert.equal(store.getState().products.status, 'failed');
    assert.deepEqual(store.getState().products.items, [sample]);
    assert.equal(timerCleared, true);
  } finally {
    global.setTimeout = originalSetTimeout;
    global.clearTimeout = originalClearTimeout;
  }
  console.log('PASS timeout aborts request and clears timer');

  global.fetch = async () => ({ ok: true, json: async () => ({ products: [] }) });
  await store.dispatch(fetchProducts());
  assert.equal(store.getState().products.status, 'succeeded');
  assert.equal(store.getState().products.error, null);
  assert.deepEqual(store.getState().products.items, []);
  console.log('PASS retry, error cleared, empty response');

  global.fetch = originalFetch;
  if (process.argv.includes('--live')) {
    const live = makeStore();
    await live.dispatch(fetchProducts()).unwrap();
    const items = live.getState().products.items;
    assert.equal(items.length, 10);
    assert.ok(items.every((item) => typeof item.id === 'number' && typeof item.title === 'string' && typeof item.price === 'number'));
    console.log(`PASS LIVE DummyJSON: ${items.length} products; first=${items[0].title}; price=${items[0].price}`);
  }
}

main().catch((error) => { console.error(error); process.exitCode = 1; })
  .finally(() => { global.fetch = originalFetch; });
