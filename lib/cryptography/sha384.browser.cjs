"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.digest = digest;

var _jsSha = require("js-sha512");

/**
 * @param {Uint8Array} data
 * @returns {Promise<Uint8Array>}
 */
// @ts-ignore
async function digest(data) {
  // https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest
  // eslint-disable-next-line @typescript-eslint/await-thenable
  return new Uint8Array(await _jsSha.sha384.digest(data));
}