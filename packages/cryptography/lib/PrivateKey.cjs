"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tweetnacl = _interopRequireDefault(require("tweetnacl"));

var _PublicKey = _interopRequireDefault(require("./PublicKey.cjs"));

var _Mnemonic = _interopRequireDefault(require("./Mnemonic.cjs"));

var _array = require("./util/array.cjs");

var _keystore = require("./primitive/keystore.cjs");

var _BadKeyError = _interopRequireDefault(require("./BadKeyError.cjs"));

var hex = _interopRequireWildcard(require("./encoding/hex.cjs"));

var _pem = require("./encoding/pem.cjs");

var slip10 = _interopRequireWildcard(require("./primitive/slip10.cjs"));

var _Key = _interopRequireDefault(require("./Key.cjs"));

var random = _interopRequireWildcard(require("./primitive/random.cjs"));

var derive = _interopRequireWildcard(require("./util/derive.cjs"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const derPrefix = "302e020100300506032b657004220420";
const derPrefixBytes = hex.decode(derPrefix);
/**
 * @typedef {object} ProtoSignaturePair
 * @property {(Uint8Array | null)=} pubKeyPrefix
 * @property {(Uint8Array | null)=} ed25519
 */

/**
 * @typedef {object} ProtoSigMap
 * @property {(ProtoSignaturePair[] | null)=} sigPair
 */

/**
 * @typedef {object} ProtoSignedTransaction
 * @property {(Uint8Array | null)=} bodyBytes
 * @property {(ProtoSigMap | null)=} sigMap
 */

/**
 * @typedef {object} Transaction
 * @property {() => boolean} _isFrozen
 * @property {ProtoSignedTransaction[]} _signedTransactions
 * @property {Set<string>} _signerPublicKeys
 * @property {(publicKey: PublicKey, signature: Uint8Array) => Transaction} addSignature
 * @property {() => void} _requireFrozen
 * @property {() => Transaction} freeze
 */

/**
 * A private key on the Hedera™ network.
 */

class PrivateKey extends _Key.default {
  /**
   * @hideconstructor
   * @internal
   * @param {nacl.SignKeyPair} keyPair
   * @param {?Uint8Array} chainCode
   */
  constructor(keyPair, chainCode) {
    super();
    /**
     * @type {nacl.SignKeyPair}
     * @readonly
     * @private
     */

    this._keyPair = keyPair;
    /**
     * @type {?Uint8Array}
     * @readonly
     * @private
     */

    this._chainCode = chainCode;
  }
  /**
   * Generate a random Ed25519 private key.
   *
   * @returns {PrivateKey}
   */


  static generate() {
    // 32 bytes for the secret key
    // 32 bytes for the chain code (to support derivation)
    const entropy = random.bytes(64);
    return new PrivateKey(_tweetnacl.default.sign.keyPair.fromSeed(entropy.subarray(0, 32)), entropy.subarray(32));
  }
  /**
   * Generate a random Ed25519 private key.
   *
   * @returns {Promise<PrivateKey>}
   */


  static async generateAsync() {
    // 32 bytes for the secret key
    // 32 bytes for the chain code (to support derivation)
    const entropy = await random.bytesAsync(64);
    return new PrivateKey(_tweetnacl.default.sign.keyPair.fromSeed(entropy.subarray(0, 32)), entropy.subarray(32));
  }
  /**
   * Construct a private key from bytes.
   *
   * @param {Uint8Array} data
   * @returns {PrivateKey}
   */


  static fromBytes(data) {
    switch (data.length) {
      case 48:
        if ((0, _array.arrayStartsWith)(data, derPrefixBytes)) {
          const keyPair = _tweetnacl.default.sign.keyPair.fromSeed(data.subarray(16));

          return new PrivateKey(keyPair, null);
        }

        break;

      case 32:
        return new PrivateKey(_tweetnacl.default.sign.keyPair.fromSeed(data), null);

      case 64:
        // priv + pub key
        return new PrivateKey(_tweetnacl.default.sign.keyPair.fromSecretKey(data), null);

      default:
    }

    throw new _BadKeyError.default(`invalid private key length: ${data.length} bytes`);
  }
  /**
   * Construct a private key from a hex-encoded string.
   *
   * @param {string} text
   * @returns {PrivateKey}
   */


  static fromString(text) {
    return PrivateKey.fromBytes(hex.decode(text));
  }
  /**
   * Recover a private key from a mnemonic phrase (and optionally a password).
   *
   * @param {Mnemonic | string} mnemonic
   * @param {string} [passphrase]
   * @returns {Promise<PrivateKey>}
   */


  static async fromMnemonic(mnemonic, passphrase = "") {
    return (typeof mnemonic === "string" ? await _Mnemonic.default.fromString(mnemonic) : mnemonic).toPrivateKey(passphrase);
  }
  /**
   * Recover a private key from a keystore, previously created by `.toKeystore()`.
   *
   * This key will _not_ support child key derivation.
   *
   * @param {Uint8Array} data
   * @param {string} [passphrase]
   * @returns {Promise<PrivateKey>}
   * @throws {BadKeyError} If the passphrase is incorrect or the hash fails to validate.
   */


  static async fromKeystore(data, passphrase = "") {
    return PrivateKey.fromBytes(await (0, _keystore.loadKeystore)(data, passphrase));
  }
  /**
   * Recover a private key from a pem string; the private key may be encrypted.
   *
   * This method assumes the .pem file has been converted to a string already.
   *
   * If `passphrase` is not null or empty, this looks for the first `ENCRYPTED PRIVATE KEY`
   * section and uses `passphrase` to decrypt it; otherwise, it looks for the first `PRIVATE KEY`
   * section and decodes that as a DER-encoded  private key.
   *
   * @param {string} data
   * @param {string} [passphrase]
   * @returns {Promise<PrivateKey>}
   */


  static async fromPem(data, passphrase = "") {
    return new PrivateKey(await (0, _pem.read)(data, passphrase), null);
  }
  /**
   * Derive a new private key at the given wallet index.
   *
   * Only currently supported for keys created with `fromMnemonic()`; other keys will throw
   * an error.
   *
   * You can check if a key supports derivation with `.supportsDerivation()`
   *
   * @param {number} index
   * @returns {Promise<PrivateKey>}
   * @throws If this key does not support derivation.
   */


  async derive(index) {
    if (this._chainCode == null) {
      throw new Error("this private key does not support key derivation");
    }

    const {
      keyData,
      chainCode
    } = await slip10.derive(this.toBytes(), this._chainCode, index);

    const keyPair = _tweetnacl.default.sign.keyPair.fromSeed(keyData);

    return new PrivateKey(keyPair, chainCode);
  }
  /**
   * @param {number} index
   * @returns {Promise<PrivateKey>}
   * @throws If this key does not support derivation.
   */


  async legacyDerive(index) {
    const keyBytes = await derive.legacy(this.toBytes().subarray(0, 32), index);
    return PrivateKey.fromBytes(keyBytes);
  }
  /**
   * Get the public key associated with this private key.
   *
   * The public key can be freely given and used by other parties to verify
   * the signatures generated by this private key.
   *
   * @returns {PublicKey}
   */


  get publicKey() {
    return new _PublicKey.default(this._keyPair.publicKey);
  }
  /**
   * Sign a message with this private key.
   *
   * @param {Uint8Array} bytes
   * @returns {Uint8Array} - The signature bytes without the message
   */


  sign(bytes) {
    return _tweetnacl.default.sign.detached(bytes, this._keyPair.secretKey);
  }
  /**
   * @param {Transaction} transaction
   * @returns {Uint8Array}
   */


  signTransaction(transaction) {
    transaction._requireFrozen();

    if (!transaction._isFrozen()) {
      transaction.freeze();
    }

    if (transaction._signedTransactions.length != 1) {
      throw new Error("`PrivateKey.signTransaction()` requires `Transaction` to have a single node `AccountId` set");
    }

    const tx =
    /** @type {ProtoSignedTransaction} */
    transaction._signedTransactions[0];
    const publicKeyHex = hex.encode(this.publicKey.toBytes());

    if (tx.sigMap == null) {
      tx.sigMap = {};
    }

    if (tx.sigMap.sigPair == null) {
      tx.sigMap.sigPair = [];
    }

    for (const sigPair of tx.sigMap.sigPair) {
      if (sigPair.pubKeyPrefix != null && hex.encode(sigPair.pubKeyPrefix) === publicKeyHex) {
        return (
          /** @type {Uint8Array} */
          sigPair.ed25519
        );
      }
    }

    const siganture = this.sign(tx.bodyBytes != null ? tx.bodyBytes : new Uint8Array());
    tx.sigMap.sigPair.push({
      pubKeyPrefix: this.publicKey.toBytes(),
      ed25519: siganture
    });

    transaction._signerPublicKeys.add(publicKeyHex);

    return siganture;
  }
  /**
   * Check if `derive` can be called on this private key.
   *
   * This is only the case if the key was created from a mnemonic.
   *
   * @returns {boolean}
   */


  isDerivable() {
    return this._chainCode != null;
  }
  /**
   * @returns {Uint8Array}
   */


  toBytes() {
    // copy the bytes so they can't be modified accidentally
    return this._keyPair.secretKey.slice(0, 32);
  }
  /**
   * @returns {string}
   */


  toString() {
    return derPrefix + hex.encode(this.toBytes());
  }
  /**
   * Create a keystore with a given passphrase.
   *
   * The key can be recovered later with `fromKeystore()`.
   *
   * Note that this will not retain the ancillary data used for
   * deriving child keys, thus `.derive()` on the restored key will
   * throw even if this instance supports derivation.
   *
   * @param {string} [passphrase]
   * @returns {Promise<Uint8Array>}
   */


  toKeystore(passphrase = "") {
    return (0, _keystore.createKeystore)(this.toBytes(), passphrase);
  }

}

exports.default = PrivateKey;