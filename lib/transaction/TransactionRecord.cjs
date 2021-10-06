"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _TransactionReceipt = _interopRequireDefault(require("./TransactionReceipt.cjs"));

var _TransactionId = _interopRequireDefault(require("./TransactionId.cjs"));

var _Timestamp = _interopRequireDefault(require("../Timestamp.cjs"));

var _Hbar = _interopRequireDefault(require("../Hbar.cjs"));

var _Transfer = _interopRequireDefault(require("../Transfer.cjs"));

var _ContractFunctionResult = _interopRequireDefault(require("../contract/ContractFunctionResult.cjs"));

var _TokenTransferMap = _interopRequireDefault(require("../account/TokenTransferMap.cjs"));

var _TokenNftTransferMap = _interopRequireDefault(require("../account/TokenNftTransferMap.cjs"));

var proto = _interopRequireWildcard(require("@hashgraph/proto"));

var _ScheduleId = _interopRequireDefault(require("../schedule/ScheduleId.cjs"));

var _AssessedCustomFee = _interopRequireDefault(require("../token/AssessedCustomFee.cjs"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @typedef {import("../token/TokenId.js").default} TokenId
 */

/**
 * Response when the client sends the node TransactionGetRecordResponse.
 */
class TransactionRecord {
  /**
   * @private
   * @param {object} props
   * @param {ContractFunctionResult} [props.contractFunctionResult]
   * @param {TransactionReceipt} props.receipt
   * @param {Uint8Array} props.transactionHash
   * @param {Timestamp} props.consensusTimestampstamp
   * @param {TransactionId} props.transactionId
   * @param {string} props.transactionMemo
   * @param {Hbar} props.transactionFee
   * @param {Transfer[]} props.transfers
   * @param {TokenTransferMap} props.tokenTransfers
   * @param {?ScheduleId} props.scheduleRef
   * @param {AssessedCustomFee[]} props.assessedCustomFees
   * @param {TokenNftTransferMap} props.nftTransfers
   */
  constructor(props) {
    /**
     * The status (reach consensus, or failed, or is unknown) and the ID of
     * any new account/file/instance created.
     *
     * @readonly
     */
    this.receipt = props.receipt;
    /**
     * The hash of the Transaction that executed (not the hash of any Transaction that failed
     * for having a duplicate TransactionID).
     *
     * @readonly
     */

    this.transactionHash = props.transactionHash;
    /**
     * The consensus timestamp (or null if didn't reach consensus yet).
     *
     * @readonly
     */

    this.consensusTimestampstamp = props.consensusTimestampstamp;
    /**
     * The ID of the transaction this record represents.
     *
     * @readonly
     */

    this.transactionId = props.transactionId;
    /**
     * The memo that was submitted as part of the transaction (max 100 bytes).
     *
     * @readonly
     */

    this.transactionMemo = props.transactionMemo;
    /**
     * The actual transaction fee charged,
     * not the original transactionFee value from TransactionBody.
     *
     * @readonly
     */

    this.transactionFee = props.transactionFee;
    /**
     * All hbar transfers as a result of this transaction, such as fees, or transfers performed
     * by the transaction, or by a smart contract it calls, or by the creation of threshold
     * records that it triggers.
     *
     * @readonly
     */

    this.transfers = props.transfers;
    /**
     * Record of the value returned by the smart contract function or constructor.
     *
     * @readonly
     */

    this.contractFunctionResult = props.contractFunctionResult != null ? props.contractFunctionResult : null;
    /**
     * All the token transfers from this account
     *
     * @readonly
     */

    this.tokenTransfers = props.tokenTransfers;
    this.scheduleRef = props.scheduleRef;
    this.assessedCustomFees = props.assessedCustomFees;
    this.nftTransfers = props.nftTransfers;
    Object.freeze(this);
  }
  /**
   * @internal
   * @returns {proto.ITransactionRecord}
   */


  _toProtobuf() {
    const tokenTransfers = this.tokenTransfers._toProtobuf();

    const nftTransfers = this.nftTransfers._toProtobuf();

    const tokenTransferLists = [];

    for (const tokenTransfer of tokenTransfers) {
      for (const nftTransfer of nftTransfers) {
        if (tokenTransfer.token != null && nftTransfer.token != null && tokenTransfer.token.shardNum === nftTransfer.token.shardNum && tokenTransfer.token.realmNum === nftTransfer.token.realmNum && tokenTransfer.token.tokenNum === nftTransfer.token.tokenNum) {
          tokenTransferLists.push({
            token: tokenTransfer.token,
            transfers: tokenTransfer.transfers,
            nftTransfers: tokenTransfer.nftTransfers
          });
        } else {
          tokenTransferLists.push(tokenTransfer);
          tokenTransferLists.push(nftTransfer);
        }
      }
    }

    return {
      receipt: this.receipt._toProtobuf(),
      transactionHash: this.transactionHash != null ? this.transactionHash : null,
      consensusTimestamp: this.consensusTimestampstamp != null ? this.consensusTimestampstamp._toProtobuf() : null,
      transactionID: this.transactionId != null ? this.transactionId._toProtobuf() : null,
      memo: this.transactionMemo != null ? this.transactionMemo : null,
      transactionFee: this.transactionFee != null ? this.transactionFee.toTinybars() : null,
      contractCallResult: this.contractFunctionResult != null ? this.contractFunctionResult : null,
      contractCreateResult: this.contractFunctionResult != null ? this.contractFunctionResult : null,
      transferList: this.transfers != null ? {
        accountAmounts: this.transfers.map(transfer => transfer._toProtobuf())
      } : null,
      tokenTransferLists,
      scheduleRef: this.scheduleRef != null ? this.scheduleRef._toProtobuf() : null,
      assessedCustomFees: this.assessedCustomFees.map(fee => fee._toProtobuf())
    };
  }
  /**
   * @internal
   * @param {proto.ITransactionRecord} record
   * @returns {TransactionRecord}
   */


  static _fromProtobuf(record) {
    const contractFunctionResult = record.contractCallResult != null ? _ContractFunctionResult.default._fromProtobuf(record.contractCallResult) : record.contractCreateResult != null ? _ContractFunctionResult.default._fromProtobuf(record.contractCreateResult) : undefined;
    return new TransactionRecord({
      receipt: _TransactionReceipt.default._fromProtobuf(
      /** @type {proto.ITransactionReceipt} */
      record.receipt),
      transactionHash: record.transactionHash != null ? record.transactionHash : new Uint8Array(),
      consensusTimestampstamp: _Timestamp.default._fromProtobuf(
      /** @type {proto.ITimestamp} */
      record.consensusTimestamp),
      transactionId: _TransactionId.default._fromProtobuf(
      /** @type {proto.ITransactionID} */
      record.transactionID),
      transactionMemo: record.memo != null ? record.memo : "",
      transactionFee: _Hbar.default.fromTinybars(record.transactionFee != null ? record.transactionFee : 0),
      transfers: (record.transferList != null ? record.transferList.accountAmounts != null ? record.transferList.accountAmounts : [] : []).map(aa => _Transfer.default._fromProtobuf(aa)),
      contractFunctionResult,
      tokenTransfers: _TokenTransferMap.default._fromProtobuf(record.tokenTransferLists != null ? record.tokenTransferLists : []),
      scheduleRef: record.scheduleRef != null ? _ScheduleId.default._fromProtobuf(record.scheduleRef) : null,
      assessedCustomFees: record.assessedCustomFees != null ? record.assessedCustomFees.map(fee => _AssessedCustomFee.default._fromProtobuf(fee)) : [],
      nftTransfers: _TokenNftTransferMap.default._fromProtobuf(record.tokenTransferLists != null ? record.tokenTransferLists : [])
    });
  }
  /**
   * @param {Uint8Array} bytes
   * @returns {TransactionRecord}
   */


  static fromBytes(bytes) {
    return TransactionRecord._fromProtobuf(proto.TransactionRecord.decode(bytes));
  }
  /**
   * @returns {Uint8Array}
   */


  toBytes() {
    return proto.TransactionRecord.encode(this._toProtobuf()).finish();
  }

}

exports.default = TransactionRecord;