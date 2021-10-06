/**
 * @namespace proto
 * @typedef {import("@hashgraph/proto").ITransaction} proto.ITransaction
 * @typedef {import("@hashgraph/proto").ISignedTransaction} proto.ISignedTransaction
 * @typedef {import("@hashgraph/proto").TransactionBody} proto.TransactionBody
 * @typedef {import("@hashgraph/proto").ITransactionBody} proto.ITransactionBody
 * @typedef {import("@hashgraph/proto").ITransactionResponse} proto.ITransactionResponse
 * @typedef {import("@hashgraph/proto").ITokenUpdateTransactionBody} proto.ITokenUpdateTransactionBody
 * @typedef {import("@hashgraph/proto").ITokenID} proto.ITokenID
 */
/**
 * @typedef {import("bignumber.js").default} BigNumber
 * @typedef {import("@hashgraph/cryptography").Key} Key
 * @typedef {import("../channel/Channel.js").default} Channel
 * @typedef {import("../client/Client.js").default<*, *>} Client
 * @typedef {import("../transaction/TransactionId.js").default} TransactionId
 */
/**
 * Update a new Hedera™ crypto-currency token.
 */
export default class TokenUpdateTransaction extends Transaction {
    /**
     * @internal
     * @param {proto.ITransaction[]} transactions
     * @param {proto.ISignedTransaction[]} signedTransactions
     * @param {TransactionId[]} transactionIds
     * @param {AccountId[]} nodeIds
     * @param {proto.ITransactionBody[]} bodies
     * @returns {TokenUpdateTransaction}
     */
    static _fromProtobuf(transactions: proto.ITransaction[], signedTransactions: proto.ISignedTransaction[], transactionIds: TransactionId[], nodeIds: AccountId[], bodies: proto.ITransactionBody[]): TokenUpdateTransaction;
    /**
     * @param {object} [props]
     * @param {TokenId | string} [props.tokenId]
     * @param {string} [props.tokenName]
     * @param {string} [props.tokenSymbol]
     * @param {AccountId | string} [props.treasuryAccountId]
     * @param {Key} [props.adminKey]
     * @param {Key} [props.kycKey]
     * @param {Key} [props.freezeKey]
     * @param {Key} [props.wipeKey]
     * @param {Key} [props.supplyKey]
     * @param {AccountId | string} [props.autoRenewAccountId]
     * @param {Timestamp | Date} [props.expirationTime]
     * @param {Duration | Long | number} [props.autoRenewPeriod]
     * @param {string} [props.tokenMemo]
     * @param {Key} [props.feeScheduleKey]
     */
    constructor(props?: {
        tokenId?: string | TokenId | undefined;
        tokenName?: string | undefined;
        tokenSymbol?: string | undefined;
        treasuryAccountId?: string | AccountId | undefined;
        adminKey?: import("@hashgraph/cryptography").Key | undefined;
        kycKey?: import("@hashgraph/cryptography").Key | undefined;
        freezeKey?: import("@hashgraph/cryptography").Key | undefined;
        wipeKey?: import("@hashgraph/cryptography").Key | undefined;
        supplyKey?: import("@hashgraph/cryptography").Key | undefined;
        autoRenewAccountId?: string | AccountId | undefined;
        expirationTime?: Date | Timestamp | undefined;
        autoRenewPeriod?: number | import("long").Long | Duration | undefined;
        tokenMemo?: string | undefined;
        feeScheduleKey?: import("@hashgraph/cryptography").Key | undefined;
    } | undefined);
    /**
     * @private
     * @type {?TokenId}
     */
    private _tokenId;
    /**
     * @private
     * @type {?string}
     */
    private _tokenName;
    /**
     * @private
     * @type {?string}
     */
    private _tokenSymbol;
    /**
     * @private
     * @type {?AccountId}
     */
    private _treasuryAccountId;
    /**
     * @private
     * @type {?Key}
     */
    private _adminKey;
    /**
     * @private
     * @type {?Key}
     */
    private _kycKey;
    /**
     * @private
     * @type {?Key}
     */
    private _freezeKey;
    /**
     * @private
     * @type {?Key}
     */
    private _wipeKey;
    /**
     * @private
     * @type {?Key}
     */
    private _supplyKey;
    /**
     * @private
     * @type {?AccountId}
     */
    private _autoRenewAccountId;
    /**
     * @private
     * @type {?Timestamp}
     */
    private _expirationTime;
    /**
     * @private
     * @type {?Duration}
     */
    private _autoRenewPeriod;
    /**
     * @private
     * @type {?string}
     */
    private _tokenMemo;
    /**
     * @private
     * @type {?Key}
     */
    private _feeScheduleKey;
    /**
     * @returns {?TokenId}
     */
    get tokenId(): TokenId | null;
    /**
     * @param {TokenId | string} tokenId
     * @returns {this}
     */
    setTokenId(tokenId: TokenId | string): this;
    /**
     * @returns {?string}
     */
    get tokenName(): string | null;
    /**
     * @param {string} name
     * @returns {this}
     */
    setTokenName(name: string): this;
    /**
     * @returns {?string}
     */
    get tokenSymbol(): string | null;
    /**
     * @param {string} symbol
     * @returns {this}
     */
    setTokenSymbol(symbol: string): this;
    /**
     * @returns {?AccountId}
     */
    get treasuryAccountId(): AccountId | null;
    /**
     * @param {AccountId | string} id
     * @returns {this}
     */
    setTreasuryAccountId(id: AccountId | string): this;
    /**
     * @returns {?Key}
     */
    get adminKey(): import("@hashgraph/cryptography").Key | null;
    /**
     * @param {Key} key
     * @returns {this}
     */
    setAdminKey(key: Key): this;
    /**
     * @returns {?Key}
     */
    get kycKey(): import("@hashgraph/cryptography").Key | null;
    /**
     * @param {Key} key
     * @returns {this}
     */
    setKycKey(key: Key): this;
    /**
     * @returns {?Key}
     */
    get freezeKey(): import("@hashgraph/cryptography").Key | null;
    /**
     * @param {Key} key
     * @returns {this}
     */
    setFreezeKey(key: Key): this;
    /**
     * @returns {?Key}
     */
    get wipeKey(): import("@hashgraph/cryptography").Key | null;
    /**
     * @param {Key} key
     * @returns {this}
     */
    setWipeKey(key: Key): this;
    /**
     * @returns {?Key}
     */
    get supplyKey(): import("@hashgraph/cryptography").Key | null;
    /**
     * @param {Key} key
     * @returns {this}
     */
    setsupplyKey(key: Key): this;
    /**
     * @returns {?Timestamp}
     */
    get expirationTime(): Timestamp | null;
    /**
     * @param {Timestamp | Date} time
     * @returns {this}
     */
    setExpirationTime(time: Timestamp | Date): this;
    /**
     * @returns {?AccountId}
     */
    get autoRenewAccountId(): AccountId | null;
    /**
     * @param {AccountId | string} id
     * @returns {this}
     */
    setAutoRenewAccountId(id: AccountId | string): this;
    /**
     * @returns {?Duration}
     */
    get autoRenewPeriod(): Duration | null;
    /**
     * Set the auto renew period for this token.
     *
     * @param {Duration | Long | number} autoRenewPeriod
     * @returns {this}
     */
    setAutoRenewPeriod(autoRenewPeriod: Duration | Long | number): this;
    /**
     * @returns {?string}
     */
    get tokenMemo(): string | null;
    /**
     * @param {string} tokenMemo
     * @returns {this}
     */
    setTokenMemo(tokenMemo: string): this;
    /**
     * @returns {?Key}
     */
    get feeScheduleKey(): import("@hashgraph/cryptography").Key | null;
    /**
     * @param {Key} feeScheduleKey
     * @returns {this}
     */
    setFeeScheduleKey(feeScheduleKey: Key): this;
    /**
     * @returns {this}
     */
    clearTokenMemo(): this;
}
export namespace proto {
    type ITransaction = import("@hashgraph/proto").ITransaction;
    type ISignedTransaction = import("@hashgraph/proto").ISignedTransaction;
    type TransactionBody = import("@hashgraph/proto").TransactionBody;
    type ITransactionBody = import("@hashgraph/proto").ITransactionBody;
    type ITransactionResponse = import("@hashgraph/proto").ITransactionResponse;
    type ITokenUpdateTransactionBody = import("@hashgraph/proto").ITokenUpdateTransactionBody;
    type ITokenID = import("@hashgraph/proto").ITokenID;
}
export type BigNumber = import("bignumber.js").default;
export type Key = import("@hashgraph/cryptography").Key;
export type Channel = import("../channel/Channel.js").default;
export type Client = import("../client/Client.js").default<any, any>;
export type TransactionId = import("../transaction/TransactionId.js").default;
import Transaction from "../transaction/Transaction.js";
import TokenId from "./TokenId.js";
import AccountId from "../account/AccountId.js";
import Timestamp from "../Timestamp.js";
import Duration from "../Duration.js";
