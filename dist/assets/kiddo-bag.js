/* Kiddo School — School Bag storage: real local-device persistence for
   children's creations via IndexedDB. Shared by Draw & Scribble (save) and
   My School Bag (list/delete). Private by design: nothing leaves the device. */
(() => {
  const DB = 'kiddo-school-bag', STORE = 'creations', LIMIT = 20;
  const KiddoBag = {
    available: typeof indexedDB !== 'undefined' && typeof IDBKeyRange !== 'undefined',
    limit: LIMIT,
    _db: null,
    open() {
      if (!this.available) return Promise.reject(new Error('no-indexeddb'));
      if (this._db) return Promise.resolve(this._db);
      const attempt = () => new Promise((res, rej) => {
        const req = indexedDB.open(DB, 1);
        req.onupgradeneeded = () => {
          const db = req.result;
          if (!db.objectStoreNames.contains(STORE)) {
            const st = db.createObjectStore(STORE, { keyPath: 'id' });
            st.createIndex('createdAt', 'createdAt');
          }
        };
        req.onsuccess = () => { this._db = req.result; res(req.result); };
        req.onerror = () => rej(req.error || new Error('open-failed'));
        req.onblocked = () => rej(new Error('blocked'));
      });
      return attempt().then(db => {
        if (db.objectStoreNames.contains(STORE)) return db;
        // A stale or partially created database without our store: rebuild once.
        try { db.close(); } catch (err) { /* already closed */ }
        this._db = null;
        return new Promise((res, rej) => {
          const del = indexedDB.deleteDatabase(DB);
          del.onsuccess = () => res();
          del.onerror = () => rej(del.error);
          del.onblocked = () => res();
        }).then(attempt);
      });
    },
    _tx(mode) {
      return this.open().then(db => {
        const st = db.transaction(STORE, mode).objectStore(STORE);
        return st;
      });
    },
    save(rec) {
      return this._tx('readwrite').then(st => new Promise((res, rej) => {
        const req = st.put(rec);
        req.onsuccess = () => res(rec); req.onerror = () => rej(req.error);
      }));
    },
    list() {
      return this._tx('readonly').then(st => new Promise((res, rej) => {
        const req = st.getAll();
        req.onsuccess = () => res((req.result || []).sort((a, b) => b.createdAt - a.createdAt));
        req.onerror = () => rej(req.error);
      }));
    },
    remove(id) {
      return this._tx('readwrite').then(st => new Promise((res, rej) => {
        const req = st.delete(id);
        req.onsuccess = () => res(); req.onerror = () => rej(req.error);
      }));
    }
  };
  window.KiddoBag = KiddoBag;
})();
