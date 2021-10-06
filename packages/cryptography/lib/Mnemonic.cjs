"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _PrivateKey = _interopRequireDefault(require("./PrivateKey.cjs"));

var _BadMnemonicError = _interopRequireDefault(require("./BadMnemonicError.cjs"));

var _BadMnemonicReason = _interopRequireDefault(require("./BadMnemonicReason.cjs"));

var _legacy = _interopRequireDefault(require("./words/legacy.cjs"));

var _bip = _interopRequireDefault(require("./words/bip39.cjs"));

var sha256 = _interopRequireWildcard(require("./primitive/sha256.cjs"));

var pbkdf2 = _interopRequireWildcard(require("./primitive/pbkdf2.cjs"));

var _tweetnacl = _interopRequireDefault(require("tweetnacl"));

var hmac = _interopRequireWildcard(require("./primitive/hmac.cjs"));

var slip10 = _interopRequireWildcard(require("./primitive/slip10.cjs"));

var entropy = _interopRequireWildcard(require("./util/entropy.cjs"));

var random = _interopRequireWildcard(require("./primitive/random.cjs"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Multi-word mnemonic phrase (BIP-39).
 *
 * Compatible with the official Hedera mobile
 * wallets (24-words or 22-words) and BRD (12-words).
 */
class Mnemonic {
  /**
   * @param {Object} props
   * @param {string[]} props.words
   * @param {boolean} props.legacy
   * @throws {BadMnemonicError}
   * @hideconstructor
   * @private
   */
  constructor({
    words,
    legacy
  }) {
    this.words = words;
    this._isLegacy = legacy;
  }
  /**
   * Returns a new random 24-word mnemonic from the BIP-39
   * standard English word list.
   *
   * @returns {Promise<Mnemonic>}
   */


  static generate() {
    return Mnemonic._generate(24);
  }
  /**
   * Returns a new random 12-word mnemonic from the BIP-39
   * standard English word list.
   *
   * @returns {Promise<Mnemonic>}
   */


  static generate12() {
    return Mnemonic._generate(12);
  }
  /**
   * @param {number} length
   * @returns {Promise<Mnemonic>}
   */


  static async _generate(length) {
    // only 12-word or 24-word lengths are supported
    let neededEntropy;
    if (length === 12) neededEntropy = 16;else if (length === 24) neededEntropy = 32;else {
      throw new Error(`unsupported phrase length ${length}, only 12 or 24 are supported`);
    } // inlined from (ISC) with heavy alternations for modern crypto
    // https://github.com/bitcoinjs/bip39/blob/8461e83677a1d2c685d0d5a9ba2a76bd228f74c6/ts_src/index.ts#L125

    const seed = await random.bytesAsync(neededEntropy);
    const entropyBits = bytesToBinary(Array.from(seed));
    const checksumBits = await deriveChecksumBits(seed);
    const bits = entropyBits + checksumBits;
    const chunks = bits.match(/(.{1,11})/g);
    const words = (chunks != null ? chunks : []).map(binary => _bip.default[binaryToByte(binary)]);
    return new Mnemonic({
      words,
      legacy: false
    });
  }
  /**
   * Construct a mnemonic from a list of words. Handles 12, 22 (legacy), and 24 words.
   *
   * An exception of BadMnemonicError will be thrown if the mnemonic
   * contains unknown words or fails the checksum. An invalid mnemonic
   * can still be used to create private keys, the exception will
   * contain the failing mnemonic in case you wish to ignore the
   * validation error and continue.
   *
   * @param {string[]} words
   * @throws {BadMnemonicError}
   * @returns {Promise<Mnemonic>}
   */


  static async fromWords(words) {
    return await new Mnemonic({
      words,
      legacy: words.length === 22
    })._validate();
  }
  /**
   * Recover a private key from this mnemonic phrase, with an
   * optional passphrase.
   *
   * @param {string} [passphrase]
   * @returns {Promise<PrivateKey>}
   */


  async toPrivateKey(passphrase = "") {
    if (this._isLegacy) {
      if (passphrase.length > 0) {
        throw new Error("legacy 22-word mnemonics do not support passphrases");
      }

      return this.toLegacyPrivateKey();
    }

    return await this._toPrivateKey(passphrase);
  }
  /**
   * Recover a mnemonic phrase from a string, splitting on spaces. Handles 12, 22 (legacy), and 24 words.
   *
   * @param {string} mnemonic
   * @returns {Promise<Mnemonic>}
   */


  static async fromString(mnemonic) {
    return Mnemonic.fromWords(mnemonic.split(/\s|,/));
  }
  /**
   * @returns {Promise<Mnemonic>}
   * @private
   */


  async _validate() {
    // Validate that this is a valid BIP-39 mnemonic
    // as generated by BIP-39's rules.
    // Technically, invalid mnemonics can still be used to generate valid private keys,
    // but if they became invalid due to user error then it will be difficult for the user
    // to tell the difference unless they compare the generated keys.
    // During validation, the following conditions are checked in order
    //  1)) 24 or 12 words
    //  2) All strings in {@link this.words} exist in the BIP-39
    //     standard English word list (no normalization is done)
    //  3) The calculated checksum for the mnemonic equals the
    //     checksum encoded in the mnemonic
    if (this._isLegacy) {
      if (this.words.length !== 22) {
        throw new _BadMnemonicError.default(this, _BadMnemonicReason.default.BadLength, []);
      }

      const unknownWordIndices = this.words.reduce((
      /** @type {number[]} */
      unknowns, word, index) => _legacy.default.includes(word.toLowerCase()) ? unknowns : [...unknowns, index], []);

      if (unknownWordIndices.length > 0) {
        throw new _BadMnemonicError.default(this, _BadMnemonicReason.default.UnknownWords, unknownWordIndices);
      }

      const [seed, checksum] = entropy.legacy1(this.words, _legacy.default);
      const newChecksum = entropy.crc8(seed);

      if (checksum !== newChecksum) {
        throw new _BadMnemonicError.default(this, _BadMnemonicReason.default.ChecksumMismatch, []);
      }
    } else {
      if (!(this.words.length === 12 || this.words.length === 24)) {
        throw new _BadMnemonicError.default(this, _BadMnemonicReason.default.BadLength, []);
      }

      const unknownWordIndices = this.words.reduce((
      /** @type {number[]} */
      unknowns, word, index) => _bip.default.includes(word) ? unknowns : [...unknowns, index], []);

      if (unknownWordIndices.length > 0) {
        throw new _BadMnemonicError.default(this, _BadMnemonicReason.default.UnknownWords, unknownWordIndices);
      } // FIXME: calculate checksum and compare
      // https://github.com/bitcoinjs/bip39/blob/master/ts_src/index.ts#L112


      const bits = this.words.map(word => {
        return _bip.default.indexOf(word).toString(2).padStart(11, "0");
      }).join("");
      const dividerIndex = Math.floor(bits.length / 33) * 32;
      const entropyBits = bits.slice(0, dividerIndex);
      const checksumBits = bits.slice(dividerIndex);
      const entropyBitsRegex = entropyBits.match(/(.{1,8})/g);
      const entropyBytes =
      /** @type {RegExpMatchArray} */
      entropyBitsRegex.map(binaryToByte);
      const newChecksum = await deriveChecksumBits(Uint8Array.from(entropyBytes));

      if (newChecksum !== checksumBits) {
        throw new _BadMnemonicError.default(this, _BadMnemonicReason.default.ChecksumMismatch, []);
      }
    }

    return this;
  }
  /**
   * @private
   * @param {string} passphrase
   * @returns {Promise<PrivateKey>}
   */


  async _toPrivateKey(passphrase = "") {
    const input = this.words.join(" ");
    const salt = `mnemonic${passphrase}`;
    const seed = await pbkdf2.deriveKey(hmac.HashAlgorithm.Sha512, input, salt, 2048, 64);
    const digest = await hmac.hash(hmac.HashAlgorithm.Sha512, "ed25519 seed", seed);
    let keyData = digest.subarray(0, 32);
    let chainCode = digest.subarray(32);

    for (const index of [44, 3030, 0, 0]) {
      ({
        keyData,
        chainCode
      } = await slip10.derive(keyData, chainCode, index));
    }

    const keyPair = _tweetnacl.default.sign.keyPair.fromSeed(keyData);

    return new _PrivateKey.default(keyPair, chainCode);
  }
  /**
   * @returns {Promise<PrivateKey>}
   */


  async toLegacyPrivateKey() {
    let seed;

    if (this._isLegacy) {
      [seed] = entropy.legacy1(this.words, _legacy.default);
    } else {
      seed = await entropy.legacy2(this.words, _bip.default);
    }

    return _PrivateKey.default.fromBytes(seed);
  }
  /**
   * @returns {string}
   */


  toString() {
    return this.words.join(" ");
  }

}
/**
 * @param {string} bin
 * @returns {number}
 */


exports.default = Mnemonic;

function binaryToByte(bin) {
  return parseInt(bin, 2);
}
/**
 * @param {number[]} bytes
 * @returns {string}
 */


function bytesToBinary(bytes) {
  return bytes.map(x => x.toString(2).padStart(8, "0")).join("");
}
/**
 * @param {Uint8Array} entropyBuffer
 * @returns {Promise<string>}
 */


async function deriveChecksumBits(entropyBuffer) {
  const ENT = entropyBuffer.length * 8;
  const CS = ENT / 32;
  const hash = await sha256.digest(entropyBuffer);
  return bytesToBinary(Array.from(hash)).slice(0, CS);
}