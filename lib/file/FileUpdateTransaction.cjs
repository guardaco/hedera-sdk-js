"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Transaction = _interopRequireWildcard(require("../transaction/Transaction.cjs"));

var _protobuf = require("../cryptography/protobuf.cjs");

var _Timestamp = _interopRequireDefault(require("../Timestamp.cjs"));

var utf8 = _interopRequireWildcard(require("../encoding/utf8.cjs"));

var _FileId = _interopRequireDefault(require("./FileId.cjs"));

var _cryptography = require("@hashgraph/cryptography");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * @namespace proto
 * @typedef {import("@hashgraph/proto").ITransaction} proto.ITransaction
 * @typedef {import("@hashgraph/proto").ISignedTransaction} proto.ISignedTransaction
 * @typedef {import("@hashgraph/proto").TransactionBody} proto.TransactionBody
 * @typedef {import("@hashgraph/proto").ITransactionBody} proto.ITransactionBody
 * @typedef {import("@hashgraph/proto").ITransactionResponse} proto.ITransactionResponse
 * @typedef {import("@hashgraph/proto").IFileUpdateTransactionBody} proto.IFileUpdateTransactionBody
 */

/**
 * @typedef {import("@hashgraph/cryptography").Key} Key
 * @typedef {import("../channel/Channel.js").default} Channel
 * @typedef {import("../client/Client.js").default<*, *>} Client
 * @typedef {import("../account/AccountId.js").default} AccountId
 * @typedef {import("../transaction/TransactionId.js").default} TransactionId
 */

/**
 * Update a new Hedera™ crypto-currency file.
 */
class FileUpdateTransaction extends _Transaction.default {
  /**
   * @param {object} props
   * @param {FileId | string} [props.fileId]
   * @param {Key[] | KeyList} [props.keys]
   * @param {Timestamp | Date} [props.expirationTime]
   * @param {Uint8Array | string} [props.contents]
   * @param {string} [props.fileMemo]
   */
  constructor(props = {}) {
    super();
    /**
     * @private
     * @type {?FileId}
     */

    this._fileId = null;
    /**
     * @private
     * @type {?Key[]}
     */

    this._keys = null;
    /**
     * @private
     * @type {?Timestamp}
     */

    this._expirationTime = null;
    /**
     * @private
     * @type {?Uint8Array}
     */

    this._contents = null;
    /**
     * @private
     * @type {?string}
     */

    this._fileMemo = null;

    if (props.fileId != null) {
      this.setFileId(props.fileId);
    }

    if (props.keys != null) {
      this.setKeys(props.keys);
    }

    if (props.expirationTime != null) {
      this.setExpirationTime(props.expirationTime);
    }

    if (props.contents != null) {
      this.setContents(props.contents);
    }

    if (props.fileMemo != null) {
      this.setFileMemo(props.fileMemo);
    }
  }
  /**
   * @internal
   * @param {proto.ITransaction[]} transactions
   * @param {proto.ISignedTransaction[]} signedTransactions
   * @param {TransactionId[]} transactionIds
   * @param {AccountId[]} nodeIds
   * @param {proto.ITransactionBody[]} bodies
   * @returns {FileUpdateTransaction}
   */


  static _fromProtobuf(transactions, signedTransactions, transactionIds, nodeIds, bodies) {
    const body = bodies[0];
    const update =
    /** @type {proto.IFileUpdateTransactionBody} */
    body.fileUpdate;
    return _Transaction.default._fromProtobufTransactions(new FileUpdateTransaction({
      fileId: update.fileID != null ? _FileId.default._fromProtobuf(update.fileID) : undefined,
      keys: update.keys != null ? update.keys.keys != null ? update.keys.keys.map(key => (0, _protobuf.keyFromProtobuf)(key)) : undefined : undefined,
      expirationTime: update.expirationTime != null ? _Timestamp.default._fromProtobuf(update.expirationTime) : undefined,
      contents: update.contents != null ? update.contents : undefined,
      fileMemo: update.memo != null ? update.memo.value != null ? update.memo.value : undefined : undefined
    }), transactions, signedTransactions, transactionIds, nodeIds, bodies);
  }
  /**
   * @returns {?FileId}
   */


  get fileId() {
    return this._fileId;
  }
  /**
   * Set the keys which must sign any transactions modifying this file. Required.
   *
   * All keys must sign to modify the file's contents or keys. No key is required
   * to sign for extending the expiration time (except the one for the operator account
   * paying for the transaction). Only one key must sign to delete the file, however.
   *
   * To require more than one key to sign to delete a file, add them to a
   * KeyList and pass that here.
   *
   * The network currently requires a file to have at least one key (or key list or threshold key)
   * but this requirement may be lifted in the future.
   *
   * @param {FileId | string} fileId
   * @returns {this}
   */


  setFileId(fileId) {
    this._requireNotFrozen();

    this._fileId = typeof fileId === "string" ? _FileId.default.fromString(fileId) : fileId.clone();
    return this;
  }
  /**
   * @returns {?Key[]}
   */


  get keys() {
    return this._keys;
  }
  /**
   * Set the keys which must sign any transactions modifying this file. Required.
   *
   * All keys must sign to modify the file's contents or keys. No key is required
   * to sign for extending the expiration time (except the one for the operator account
   * paying for the transaction). Only one key must sign to delete the file, however.
   *
   * To require more than one key to sign to delete a file, add them to a
   * KeyList and pass that here.
   *
   * The network currently requires a file to have at least one key (or key list or threshold key)
   * but this requirement may be lifted in the future.
   *
   * @param {Key[] | KeyList} keys
   * @returns {this}
   */


  setKeys(keys) {
    this._requireNotFrozen();

    if (keys instanceof _cryptography.KeyList && keys.threshold != null) {
      throw new Error("Cannot set threshold key as file key");
    }

    this._keys = keys instanceof _cryptography.KeyList ? keys.toArray() : keys;
    return this;
  }
  /**
   * @returns {?Timestamp}
   */


  get expirationTime() {
    return this._expirationTime;
  }
  /**
   * Set the instant at which this file will expire, after which its contents will no longer be
   * available.
   *
   * Defaults to 1/4 of a Julian year from the instant FileUpdateTransaction
   * was invoked.
   *
   * May be extended using FileUpdateTransaction#setExpirationTime(Timestamp).
   *
   * @param {Timestamp | Date} expirationTime
   * @returns {this}
   */


  setExpirationTime(expirationTime) {
    this._requireNotFrozen();

    this._expirationTime = expirationTime instanceof _Timestamp.default ? expirationTime : _Timestamp.default.fromDate(expirationTime);
    return this;
  }
  /**
   * @returns {?Uint8Array}
   */


  get contents() {
    return this._contents;
  }
  /**
   * Set the given byte array as the file's contents.
   *
   * This may be omitted to update an empty file.
   *
   * Note that total size for a given transaction is limited to 6KiB (as of March 2020) by the
   * network; if you exceed this you may receive a HederaPreCheckStatusException
   * with Status#TransactionOversize.
   *
   * In this case, you will need to break the data into chunks of less than ~6KiB and execute this
   * transaction with the first chunk and then use FileAppendTransaction with
   * FileAppendTransaction#setContents(Uint8Array) for the remaining chunks.
   *
   * @param {Uint8Array | string} contents
   * @returns {this}
   */


  setContents(contents) {
    this._requireNotFrozen();

    this._contents = contents instanceof Uint8Array ? contents : utf8.encode(contents);
    return this;
  }
  /**
   * @returns {?string}
   */


  get fileMemo() {
    return this._fileMemo;
  }
  /**
   * @param {string} memo
   * @returns {this}
   */


  setFileMemo(memo) {
    this._requireNotFrozen();

    this._fileMemo = memo;
    return this;
  }
  /**
   * @returns {this}
   */


  clearFileMemo() {
    this._requireNotFrozen();

    this._fileMemo = null;
    return this;
  }
  /**
   * @param {Client} client
   */


  _validateChecksums(client) {
    if (this._fileId != null) {
      this._fileId.validateChecksum(client);
    }
  }
  /**
   * @override
   * @internal
   * @param {Channel} channel
   * @param {proto.ITransaction} request
   * @returns {Promise<proto.ITransactionResponse>}
   */


  _execute(channel, request) {
    return channel.file.updateFile(request);
  }
  /**
   * @override
   * @protected
   * @returns {NonNullable<proto.TransactionBody["data"]>}
   */


  _getTransactionDataCase() {
    return "fileUpdate";
  }
  /**
   * @override
   * @protected
   * @returns {proto.IFileUpdateTransactionBody}
   */


  _makeTransactionData() {
    return {
      fileID: this._fileId != null ? this._fileId._toProtobuf() : null,
      keys: this._keys != null ? {
        keys: this._keys.map(key => (0, _protobuf.keyToProtobuf)(key))
      } : null,
      expirationTime: this._expirationTime != null ? this._expirationTime._toProtobuf() : null,
      contents: this._contents,
      memo: this._fileMemo != null ? {
        value: this._fileMemo
      } : null
    };
  }

} // eslint-disable-next-line @typescript-eslint/unbound-method


exports.default = FileUpdateTransaction;

_Transaction.TRANSACTION_REGISTRY.set("fileUpdate", FileUpdateTransaction._fromProtobuf);