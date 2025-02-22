import storage from './storage';
require('./localStorage.mock');

describe('storage', () => {
  beforeEach(() => {
    // Limpa o armazenamento simulado antes de cada teste
    window.localStorage.clear();
  });

  test('should store a value by key', () => {
    const key = 'testKey';
    const value = { data: 'testData' };
    storage.set(key, value);

    expect(storage.get(key)).toEqual(value);
  });

  test('should return null for non-existent key', () => {
    expect(storage.get('nonExistentKey')).toBeNull();
  });

  test('should remove a value by key', () => {
    const key = 'testKey';
    const value = { data: 'testData' };
    storage.set(key, value);
    storage.remove(key);

    expect(storage.get(key)).toBeNull();
  });

  test('should clear all stored values', () => {
    storage.set('key1', { data: 'data1' });
    storage.set('key2', { data: 'data2' });
    storage.clear();

    expect(storage.get('key1')).toBeNull();
    expect(storage.get('key2')).toBeNull();
  });
});
