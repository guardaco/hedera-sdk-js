/**
 * @typedef {import("../channel/Channel.js").default} Channel
 * @typedef {import("../channel/MirrorChannel.js").default} MirrorChannel
 */
/**
 * @typedef {"mainnet" | "testnet" | "previewnet"} NetworkName
 */
/**
 * @typedef {object} Operator
 * @property {string | PrivateKey} privateKey
 * @property {string | AccountId} accountId
 */
/**
 * @typedef {object} ClientOperator
 * @property {PublicKey} publicKey
 * @property {AccountId} accountId
 * @property {(message: Uint8Array) => Promise<Uint8Array>} transactionSigner
 */
/**
 * @typedef {object} ClientConfiguration
 * @property {{[key: string]: (string | AccountId)} | NetworkName} network
 * @property {string[] | NetworkName | string} [mirrorNetwork]
 * @property {Operator} [operator]
 */
/**
 * @abstract
 * @template {Channel} ChannelT
 * @template {MirrorChannel} MirrorChannelT
 */
export default class Client<ChannelT extends import("../channel/Channel.js").default, MirrorChannelT extends import("../channel/MirrorChannel.js").default> {
    /**
     * @protected
     * @hideconstructor
     * @param {ClientConfiguration} [props]
     */
    protected constructor();
    /**
     * List of mirror network URLs.
     *
     * @internal
     * @type {MirrorNetwork}
     */
    _mirrorNetwork: MirrorNetwork;
    /**
     * Map of node account ID (as a string)
     * to the node URL.
     *
     * @internal
     * @type {Network<ChannelT>}
     */
    _network: Network<ChannelT>;
    /**
     * @internal
     * @type {?ClientOperator}
     */
    _operator: ClientOperator | null;
    /**
     * @private
     * @type {Hbar}
     */
    private _maxTransactionFee;
    /**
     * @private
     * @type {Hbar}
     */
    private _maxQueryPayment;
    _signOnDemand: boolean;
    _autoValidateChecksums: boolean;
    /**
     * @param {{[key: string]: (string | AccountId)} | NetworkName} network
     * @returns {void}
     */
    setNetwork(network: {
        [key: string]: string | AccountId;
    } | NetworkName): void;
    /**
     * @returns {{[key: string]: (string | AccountId)}}
     */
    get network(): {
        [key: string]: string | AccountId;
    };
    /**
     * @param {string[] | string | NetworkName} mirrorNetwork
     * @returns {void}
     */
    setMirrorNetwork(mirrorNetwork: string[] | string | NetworkName): void;
    /**
     * @returns {string[]}
     */
    get mirrorNetwork(): string[];
    /**
     * @param {boolean} signOnDemand
     */
    setSignOnDemand(signOnDemand: boolean): void;
    /**
     * Set the account that will, by default, pay for transactions and queries built with this client.
     *
     * @param {AccountId | string} accountId
     * @param {PrivateKey | string} privateKey
     * @returns {this}
     */
    setOperator(accountId: AccountId | string, privateKey: PrivateKey | string): this;
    /**
     * Sets the account that will, by default, pay for transactions and queries built with
     * this client.
     *
     * @param {AccountId | string} accountId
     * @param {PublicKey | string} publicKey
     * @param {(message: Uint8Array) => Promise<Uint8Array>} transactionSigner
     * @returns {this}
     */
    setOperatorWith(accountId: AccountId | string, publicKey: PublicKey | string, transactionSigner: (message: Uint8Array) => Promise<Uint8Array>): this;
    /**
     * @param {boolean} value
     * @returns {this}
     */
    setAutoValidateChecksums(value: boolean): this;
    /**
     * @returns {boolean}
     */
    isAutoValidateChecksumsEnabled(): boolean;
    /**
     * @returns {?AccountId}
     */
    get operatorAccountId(): AccountId | null;
    /**
     * @returns {?PublicKey}
     */
    get operatorPublicKey(): PublicKey | null;
    /**
     * @returns {Hbar}
     */
    get maxTransactionFee(): Hbar;
    /**
     * Set the maximum fee to be paid for transactions
     * executed by this client.
     *
     * @param {Hbar} maxTransactionFee
     * @returns {this}
     */
    setMaxTransactionFee(maxTransactionFee: Hbar): this;
    /**
     * @returns {Hbar}
     */
    get maxQueryPayment(): Hbar;
    /**
     * Set the maximum payment allowable for queries.
     *
     * @param {Hbar} maxQueryPayment
     * @returns {Client<ChannelT, MirrorChannelT>}
     */
    setMaxQueryPayment(maxQueryPayment: Hbar): Client<ChannelT, MirrorChannelT>;
    /**
     * @param {AccountId | string} accountId
     */
    ping(accountId: AccountId | string): Promise<void>;
    /**
     * @returns {void}
     */
    close(): void;
    /**
     * @abstract
     * @returns {(address: string) => ChannelT}
     */
    _createNetworkChannel(): (address: string) => ChannelT;
    /**
     * @abstract
     * @returns {((address: string) => MirrorChannelT)?}
     */
    _createMirrorNetworkChannel(): ((address: string) => MirrorChannelT) | null;
}
export type Channel = import("../channel/Channel.js").default;
export type MirrorChannel = import("../channel/MirrorChannel.js").default;
export type NetworkName = "mainnet" | "testnet" | "previewnet";
export type Operator = {
    privateKey: string | PrivateKey;
    accountId: string | AccountId;
};
export type ClientOperator = {
    publicKey: PublicKey;
    accountId: AccountId;
    transactionSigner: (message: Uint8Array) => Promise<Uint8Array>;
};
export type ClientConfiguration = {
    network: NetworkName | {
        [key: string]: string | AccountId;
    };
    mirrorNetwork?: string | string[] | undefined;
    operator?: Operator | undefined;
};
import MirrorNetwork from "./MirrorNetwork.js";
import Network from "./Network.js";
import AccountId from "../account/AccountId.js";
import { PrivateKey } from "@hashgraph/cryptography";
import { PublicKey } from "@hashgraph/cryptography";
import Hbar from "../Hbar.js";
