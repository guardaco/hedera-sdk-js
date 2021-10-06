"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tweetnacl = _interopRequireDefault(require("tweetnacl"));

var _Key = _interopRequireDefault(require("./Key.cjs"));

var _array = require("./util/array.cjs");

var _BadKeyError = _interopRequireDefault(require("./BadKeyError.cjs"));

var hex = _interopRequireWildcard(require("./encoding/hex.cjs"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @typedef {import("./PrivateKey.js").Transaction} Transaction
 */
const derPrefix = "302a300506032b6570032100";
const derPrefixBytes = hex.decode(derPrefix);
/**
 * An public key on the Hedera™ network.
 */

class PublicKey extends _Key.default {
  /**
   * @internal
   * @hideconstructor
   * @param {Uint8Array} keyData
   */
  constructor(keyData) {
    super();
    /**
     * @type {Uint8Array}
     * @private
     * @readonly
     */

    this._keyData = keyData;
  }
  /**
   * @param {Uint8Array} data
   * @returns {PublicKey}
   */


  static fromBytes(data) {
    switch (data.length) {
      case 32:
        return new PublicKey(data);

      case 44:
        if ((0, _array.arrayStartsWith)(data, derPrefixBytes)) {
          return new PublicKey(data.subarray(12));
        }

        break;

      default:
    }

    throw new _BadKeyError.default(`invalid public key length: ${data.length} bytes`);
  }
  /**
   * Parse a public key from a string of hexadecimal digits.
   *
   * The public key may optionally be prefixed with
   * the DER header.
   *
   * @param {string} text
   * @returns {PublicKey}
   */


  static fromString(text) {
    return PublicKey.fromBytes(hex.decode(text));
  }
  /**
   * Verify a signature on a message with this public key.
   *
   * @param {Uint8Array} message
   * @param {Uint8Array} signature
   * @returns {boolean}
   */


  verify(message, signature) {
    return _tweetnacl.default.sign.detached.verify(message, signature, this._keyData);
  }
  /**
   * @param {Transaction} transaction
   * @returns {boolean}
   */


  verifyTransaction(transaction) {
    transaction._requireFrozen();

    if (!transaction._isFrozen()) {
      transaction.freeze();
    }

    for (const signedTransaction of transaction._signedTransactions) {
      if (signedTransaction.sigMap != null && signedTransaction.sigMap.sigPair != null) {
        let found = false;

        for (const sigPair of signedTransaction.sigMap.sigPair) {
          const pubKeyPrefix =
          /** @type {Uint8Array} */
          sigPair.pubKeyPrefix;

          if ((0, _array.arrayEqual)(pubKeyPrefix, this._keyData)) {
            found = true;
            const bodyBytes =
            /** @type {Uint8Array} */
            signedTransaction.bodyBytes;
            const signature =
            /** @type {Uint8Array} */
            sigPair.ed25519;

            if (!_tweetnacl.default.sign.detached.verify(bodyBytes, signature, this._keyData)) {
              return false;
            }
          }
        }

        if (!found) {
          return false;
        }
      }
    }

    return true;
  }
  /**
   * @returns {Uint8Array}
   */


  toBytes() {
    return this._keyData.slice();
  }
  /**
   * @returns {string}
   */


  toString() {
    return derPrefix + hex.encode(this._keyData);
  }
  /**
   * @param {PublicKey} other
   * @returns {boolean}
   */


  equals(other) {
    return (0, _array.arrayEqual)(this._keyData, other._keyData);
  }

}

exports.default = PublicKey;