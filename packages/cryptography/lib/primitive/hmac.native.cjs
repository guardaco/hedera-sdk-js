"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hash = hash;
exports.HashAlgorithm = void 0;

var _cryptoJs = _interopRequireDefault(require("crypto-js"));

var utf8 = _interopRequireWildcard(require("../encoding/utf8.cjs"));

var hex = _interopRequireWildcard(require("../encoding/hex.cjs"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @enum {string}
 */
const HashAlgorithm = {
  Sha256: "SHA-256",
  Sha384: "SHA-384",
  Sha512: "SHA-512"
};
/**
 * @param {HashAlgorithm} algorithm
 * @param {Uint8Array | string} secretKey
 * @param {Uint8Array | string} data
 * @returns {Promise<Uint8Array>}
 */

exports.HashAlgorithm = HashAlgorithm;

function hash(algorithm, secretKey, data) {
  const key = typeof secretKey === "string" ? utf8.encode(secretKey) : secretKey;
  const value = typeof data === "string" ? utf8.encode(data) : data;

  const key_ = _cryptoJs.default.enc.Hex.parse(hex.encode(key));

  const value_ = _cryptoJs.default.enc.Hex.parse(hex.encode(value));

  switch (algorithm) {
    case HashAlgorithm.Sha256:
      return Promise.resolve(hex.decode(_cryptoJs.default.HmacSHA256(value_, key_).toString(_cryptoJs.default.enc.Hex)));

    case HashAlgorithm.Sha384:
      return Promise.resolve(hex.decode(_cryptoJs.default.HmacSHA384(value_, key_).toString(_cryptoJs.default.enc.Hex)));

    case HashAlgorithm.Sha512:
      return Promise.resolve(hex.decode(_cryptoJs.default.HmacSHA512(value_, key_).toString(_cryptoJs.default.enc.Hex)));

    default:
      throw new Error("(BUG) Non-Exhaustive switch statement for algorithms");
  }
}