"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ContractLogInfo = _interopRequireDefault(require("./ContractLogInfo.cjs"));

var _ContractId = _interopRequireDefault(require("./ContractId.cjs"));

var _bignumber = _interopRequireDefault(require("bignumber.js"));

var hex = _interopRequireWildcard(require("../encoding/hex.cjs"));

var utf8 = _interopRequireWildcard(require("../encoding/utf8.cjs"));

var _long = _interopRequireDefault(require("long"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @namespace proto
 * @typedef {import("@hashgraph/proto").IContractFunctionResult} proto.IContractFunctionResult
 * @typedef {import("@hashgraph/proto").IContractID} proto.IContractID
 */

/**
 * The result returned by a call to a smart contract function. This is part of the response to
 * a ContractCallLocal query, and is in the record for a ContractCall or ContractCreateInstance
 * transaction. The ContractCreateInstance transaction record has the results of the call to
 * the constructor.
 */
class ContractFunctionResult {
  /**
   * Constructor isn't part of the stable API
   *
   * @param {object} result
   * @param {?ContractId} result.contractId
   * @param {?string} result.errorMessage
   * @param {Uint8Array} result.bloom
   * @param {Long} result.gasUsed
   * @param {ContractLogInfo[]} result.logs
   * @param {Uint8Array} result.bytes
   */
  constructor(result) {
    /**
     * The smart contract instance whose function was called.
     */
    this.contractId = result.contractId;
    this.bytes = result.bytes;
    /**
     * Message In case there was an error during smart contract execution.
     */

    this.errorMessage = result.errorMessage;
    /**
     * Bloom filter for record
     */

    this.bloom = result.bloom;
    /**
     * Units of gas used  to execute contract.
     */

    this.gasUsed = result.gasUsed;
    /**
     * The log info for events returned by the function.
     */

    this.logs = result.logs;
  }
  /**
   * @param {proto.IContractFunctionResult} result
   * @returns {ContractFunctionResult}
   */


  static _fromProtobuf(result) {
    const contractId =
    /** @type {proto.IContractID | null} */
    result.contractID;
    const gas =
    /** @type {Long | number} */
    result.gasUsed;
    return new ContractFunctionResult({
      bytes:
      /** @type {Uint8Array} */
      result.contractCallResult,
      contractId: contractId != null ? _ContractId.default._fromProtobuf(contractId) : null,
      errorMessage: result.errorMessage != null ? result.errorMessage : null,
      bloom:
      /** @type {Uint8Array} */
      result.bloom,
      gasUsed: gas instanceof _long.default ? gas : _long.default.fromValue(gas),
      logs: (result.logInfo != null ? result.logInfo : []).map(info => _ContractLogInfo.default._fromProtobuf(info))
    });
  }
  /**
   * @returns {Uint8Array}
   */


  asBytes() {
    return this.bytes;
  }
  /**
   * @param {number} [index]
   * @returns {string}
   */


  getString(index) {
    return utf8.decode(this.getBytes(index));
  }
  /**
   * @private
   * @param {number} [index]
   * @returns {Uint8Array}
   */


  getBytes(index) {
    // Len should never be larger than Number.MAX
    // index * 32 is the position of the lenth
    // (index + 1) * 32 onward to (index + 1) * 32 + len will be the elements of the array
    // Arrays in solidity cannot be longer than 1024:
    // https://solidity.readthedocs.io/en/v0.4.21/introduction-to-smart-contracts.html
    const offset = this.getInt32(index);
    const len = new DataView(this.bytes.buffer, this.bytes.byteOffset + offset + 28, 4).getInt32(0);
    return this.bytes.subarray(offset + 32, offset + 32 + len);
  }
  /**
   * @param {number} [index]
   * @returns {Uint8Array}
   */


  getBytes32(index) {
    return this.bytes.subarray((index != null ? index : 0) * 32, (index != null ? index : 0) * 32 + 32);
  }
  /**
   * @param {number} [index]
   * @returns {boolean}
   */


  getBool(index) {
    return this.bytes[(index != null ? index : 0) * 32 + 31] !== 0;
  }
  /**
   * @param {number} [index]
   * @returns {number}
   */


  getInt8(index) {
    return this.bytes[(index != null ? index : 0) * 32 + 31];
  }
  /**
   * @param {number} [index]
   * @returns {number}
   */


  getInt32(index) {
    // .getInt32() interprets as big-endian
    // Using DataView instead of Uint32Array because the latter interprets
    // using platform endianness which is little-endian on x86
    return new DataView(this.bytes.buffer, this.bytes.byteOffset + (index != null ? index : 0) * 32 + 28, 4).getInt32(0);
  }
  /**
   * @param {number} [index]
   * @returns {BigNumber}
   */


  getInt64(index) {
    return new _bignumber.default(hex.encode(this._getBytes32(index != null ? index : 0).subarray(24, 32)), 16);
  }
  /**
   * @param {number} [index]
   * @returns {BigNumber}
   */


  getInt256(index) {
    return new _bignumber.default(hex.encode(this._getBytes32(index != null ? index : 0)), 16);
  }
  /**
   * @param {number} [index]
   * @returns {number}
   */


  getUint8(index) {
    return this.bytes[(index != null ? index : 0) * 32 + 31];
  }
  /**
   * @param {number} [index]
   * @returns {number}
   */


  getUint32(index) {
    // .getUint32() interprets as big-endian
    // Using DataView instead of Uint32Array because the latter interprets
    // using platform endianness which is little-endian on x86
    return new DataView(this.bytes.buffer, this.bytes.byteOffset + (index != null ? index : 0) * 32 + 28, 4).getUint32(0);
  }
  /**
   * @param {number} [index]
   * @returns {BigNumber}
   */


  getUint64(index) {
    return new _bignumber.default(hex.encode(this._getBytes32(index).subarray(24, 32)), 16);
  }
  /**
   * @param {number} [index]
   * @returns {BigNumber}
   */


  getUint256(index) {
    return new _bignumber.default(hex.encode(this._getBytes32(index)), 16);
  }
  /**
   * @param {number} [index]
   * @returns {string}
   */


  getAddress(index) {
    return hex.encode(this.bytes.subarray((index != null ? index : 0) * 32 + 12, (index != null ? index : 0) * 32 + 32));
  }
  /**
   * @param {number} [index]
   * @returns {Uint8Array}
   */


  _getBytes32(index) {
    return this.bytes.subarray((index != null ? index : 0) * 32, (index != null ? index : 0) * 32 + 32);
  }

}

exports.default = ContractFunctionResult;