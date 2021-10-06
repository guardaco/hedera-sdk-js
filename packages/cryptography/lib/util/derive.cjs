"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.legacy = legacy;

var pbkdf2 = _interopRequireWildcard(require("../primitive/pbkdf2.cjs"));

var hmac = _interopRequireWildcard(require("../primitive/hmac.cjs"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * @param {Uint8Array} seed
 * @param {number} index
 * @returns {Promise<Uint8Array>}
 */
function legacy(seed, index) {
  const password = new Uint8Array(seed.length + 8);
  password.set(seed, 0);
  const view = new DataView(password.buffer, password.byteOffset + seed.length, 8);

  if (index === 0xffffffffff) {
    view.setInt32(0, 0xff);
    view.setInt32(4, index >>> 32);
  } else {
    view.setInt32(0, index < 0 ? -1 : 0);
    view.setInt32(4, index);
  }

  const salt = Uint8Array.from([0xff]);
  return pbkdf2.deriveKey(hmac.HashAlgorithm.Sha512, password, salt, 2048, 32);
}