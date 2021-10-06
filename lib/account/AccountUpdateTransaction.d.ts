/**
 * @namespace proto
 * @typedef {import("@hashgraph/proto").ITransaction} proto.ITransaction
 * @typedef {import("@hashgraph/proto").ISignedTransaction} proto.ISignedTransaction
 * @typedef {import("@hashgraph/proto").TransactionBody} proto.TransactionBody
 * @typedef {import("@hashgraph/proto").ITransactionBody} proto.ITransactionBody
 * @typedef {import("@hashgraph/proto").ITransactionResponse} proto.ITransactionResponse
 * @typedef {import("@hashgraph/proto").ICryptoUpdateTransactionBody} proto.ICryptoUpdateTransactionBody
 * @typedef {import("@hashgraph/proto").IAccountID} proto.IAccountID
 */
/**
 * @typedef {import("@hashgraph/cryptography").Key} Key
 * @typedef {import("../channel/Channel.js").default} Channel
 * @typedef {import("../client/Client.js").default<*, *>} Client
 * @typedef {import("../transaction/TransactionId.js").default} TransactionId
 */
/**
 * Change properties for the given account.
 */
export default class AccountUpdateTransaction extends Transaction {
    /**
     * @internal
     * @param {proto.ITransaction[]} transactions
     * @param {proto.ISignedTransaction[]} signedTransactions
     * @param {TransactionId[]} transactionIds
     * @param {AccountId[]} nodeIds
     * @param {proto.ITransactionBody[]} bodies
     * @returns {AccountUpdateTransaction}
     */
    static _fromProtobuf(transactions: proto.ITransaction[], signedTransactions: proto.ISignedTransaction[], transactionIds: TransactionId[], nodeIds: AccountId[], bodies: proto.ITransactionBody[]): AccountUpdateTransaction;
    /**
     * @param {object} props
     * @param {AccountId} [props.accountId]
     * @param {Key} [props.key]
     * @param {boolean} [props.receiverSignatureRequired]
     * @param {AccountId} [props.proxyAccountId]
     * @param {Duration | Long | number} [props.autoRenewPeriod]
     * @param {Timestamp | Date} [props.expirationTime]
     * @param {string} [props.accountMemo]
     */
    constructor(props?: {
        accountId?: AccountId | undefined;
        key?: import("@hashgraph/cryptography").Key | undefined;
        receiverSignatureRequired?: boolean | undefined;
        proxyAccountId?: AccountId | undefined;
        autoRenewPeriod?: number | import("long").Long | Duration | undefined;
        expirationTime?: Date | Timestamp | undefined;
        accountMemo?: string | undefined;
    });
    /**
     * @private
     * @type {?AccountId}
     */
    private _accountId;
    /**
     * @private
     * @type {?Key}
     */
    private _key;
    /**
     * @private
     * @type {boolean}
     */
    private _receiverSignatureRequired;
    /**
     * @private
     * @type {?AccountId}
     */
    private _proxyAccountId;
    /**
     * @private
     * @type {?Duration}
     */
    private _autoRenewPeriod;
    /**
     * @private
     * @type {?Timestamp}
     */
    private _expirationTime;
    /**
     * @private
     * @type {?string}
     */
    private _accountMemo;
    /**
     * @returns {?AccountId}
     */
    get accountId(): AccountId | null;
    /**
     * Sets the account ID which is being updated in this transaction.
     *
     * @param {AccountId | string} accountId
     * @returns {AccountUpdateTransaction}
     */
    setAccountId(accountId: AccountId | string): AccountUpdateTransaction;
    /**
     * @returns {?Key}
     */
    get key(): import("@hashgraph/cryptography").Key | null;
    /**
     * @param {Key} key
     * @returns {this}
     */
    setKey(key: Key): this;
    /**
     * @returns {boolean}
     */
    get receiverSignatureRequired(): boolean;
    /**
     * @param {boolean} receiverSignatureRequired
     * @returns {this}
     */
    setReceiverSignatureRequired(receiverSignatureRequired: boolean): this;
    /**
     * @returns {?AccountId}
     */
    get proxyAccountId(): AccountId | null;
    /**
     * @param {AccountId} proxyAccountId
     * @returns {this}
     */
    setProxyAccountId(proxyAccountId: AccountId): this;
    /**
     * @returns {?Duration}
     */
    get autoRenewPeriod(): Duration | null;
    /**
     * @param {Duration | Long | number} autoRenewPeriod
     * @returns {this}
     */
    setAutoRenewPeriod(autoRenewPeriod: Duration | Long | number): this;
    /**
     * @returns {?Timestamp}
     */
    get expirationTime(): Timestamp | null;
    /**
     * @param {Timestamp | Date} expirationTime
     * @returns {this}
     */
    setExpirationTime(expirationTime: Timestamp | Date): this;
    /**
     * @returns {?string}
     */
    get accountMemo(): string | null;
    /**
     * @param {string} memo
     * @returns {this}
     */
    setAccountMemo(memo: string): this;
    /**
     * @returns {this}
     */
    clearAccountMemo(): this;
}
export namespace proto {
    type ITransaction = import("@hashgraph/proto").ITransaction;
    type ISignedTransaction = import("@hashgraph/proto").ISignedTransaction;
    type TransactionBody = import("@hashgraph/proto").TransactionBody;
    type ITransactionBody = import("@hashgraph/proto").ITransactionBody;
    type ITransactionResponse = import("@hashgraph/proto").ITransactionResponse;
    type ICryptoUpdateTransactionBody = import("@hashgraph/proto").ICryptoUpdateTransactionBody;
    type IAccountID = import("@hashgraph/proto").IAccountID;
}
export type Key = import("@hashgraph/cryptography").Key;
export type Channel = import("../channel/Channel.js").default;
export type Client = import("../client/Client.js").default<any, any>;
export type TransactionId = import("../transaction/TransactionId.js").default;
import Transaction from "../transaction/Transaction.js";
import AccountId from "./AccountId.js";
import Duration from "../Duration.js";
import Timestamp from "../Timestamp.js";
