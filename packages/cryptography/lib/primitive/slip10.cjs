"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.derive = derive;

var hmac = _interopRequireWildcard(require("../primitive/hmac.cjs"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * @param {Uint8Array} parentKey
 * @param {Uint8Array} chainCode
 * @param {number} index
 * @returns {Promise<{ keyData: Uint8Array; chainCode: Uint8Array }>}
 */
async function derive(parentKey, chainCode, index) {
  const input = new Uint8Array(37); // 0x00 + parentKey + index(BE)

  input[0] = 0;
  input.set(parentKey, 1);
  new DataView(input.buffer).setUint32(33, index, false); // set the index to hardened

  input[33] |= 128;
  const digest = await hmac.hash(hmac.HashAlgorithm.Sha512, chainCode, input);
  return {
    keyData: digest.subarray(0, 32),
    chainCode: digest.subarray(32)
  };
}