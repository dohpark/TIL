// Dictionary()
function Dictionary(items = {}) {
  this.items = items;
}

// getBuffer()
Dictionary.prototype.getBuffer = function () {
  return { ...this.items }; // spread문법 사용
};

// clear()
Dictionary.prototype.clear = function () {
  this.items = {}; // 초기화
};

// size()
Dictionary.prototype.size = function () {
  return Object.keys(this.items).length; // key값으로 구성한 배열로 변환 후 length 값 반환
};

// has(): 개체 존재 여부 확인
Dictionary.prototype.has = function (key) {
  // return value in this.items; <- 배열로 존재하는지 확인
  return this.items.hasOwnProperty(key);
  // Object.hasOwnProperty: 객체 내 특정 key 값이 존재하면 true 반환. key의 value값이 null or undefined이어도 true 반환
};

// set(): 개체(Entity) 추가
Dictionary.prototype.set = function (key, value) {
  this.items[key] = value;
};

// get(): 개체(Entity)의 value 반환
Dictionary.prototype.get = function (key) {
  return this.has(key) ? this.items[key] : undefined; // 있는지 없는지 확인 후 있으면 반환
};

// remove(): 개체 (Entity) 삭제
Dictionary.prototype.remove = function (key) {
  if (this.has(key)) {
    // key가 있는지 없는지 확인 후
    delete this.items[key]; // 삭제
    return true;
  }

  return false;
};

// keys(): 모든 key 값을 배열 형태로 반환
Dictionary.prototype.keys = function () {
  return Object.keys(this.items);
};

// values(): 모든 value 값을 배열 형태로 반환
Dictionary.prototype.values = function () {
  /**
   * let values = [];
   * for (let k in this.items) {
   *   values.push(this.items[k]);
   * }
   * return values;
   */

  return Object.values(this.items);
};

// each()
Dictionary.prototype.each = function (fn) {
  for (let k in this.items) {
    fn(k, this.items[k]);
  }
};

// printDictionary()
function printDictionary(key, value) {
  console.log(`key: ${key}`);
  console.log(`value: ${value}`);
}

let dict = new Dictionary();
dict.set("age", 19);
dict.set("name", "alice");
dict.set("height", 172);
console.log(dict);

dict.remove("age");
console.log(dict);

console.log(dict.has("age"));
console.log(dict.has("name"));
console.log(dict.get("age"));
console.log(dict.get("name"));

console.log(dict.keys());
console.log(dict.values());
dict.each(printDictionary);
