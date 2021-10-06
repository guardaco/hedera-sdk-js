"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AccountId = _interopRequireDefault(require("../account/AccountId.cjs"));

var _AccountBalanceQuery = _interopRequireDefault(require("../account/AccountBalanceQuery.cjs"));

var _cryptography = require("@hashgraph/cryptography");

var _Hbar = _interopRequireDefault(require("../Hbar.cjs"));

var _Network = _interopRequireDefault(require("./Network.cjs"));

var _MirrorNetwork = _interopRequireDefault(require("./MirrorNetwork.cjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
class Client {
  /**
   * @protected
   * @hideconstructor
   * @param {ClientConfiguration} [props]
   */
  constructor(props) {
    /**
     * List of mirror network URLs.
     *
     * @internal
     * @type {MirrorNetwork}
     */
    this._mirrorNetwork = new _MirrorNetwork.default(this._createMirrorNetworkChannel());
    /**
     * Map of node account ID (as a string)
     * to the node URL.
     *
     * @internal
     * @type {Network<ChannelT>}
     */

    this._network = new _Network.default(this._createNetworkChannel());
    /**
     * @internal
     * @type {?ClientOperator}
     */

    this._operator = null;
    /**
     * @private
     * @type {Hbar}
     */

    this._maxTransactionFee = new _Hbar.default(2);
    /**
     * @private
     * @type {Hbar}
     */

    this._maxQueryPayment = new _Hbar.default(1);

    if (props != null) {
      if (props.operator != null) {
        this.setOperator(props.operator.accountId, props.operator.privateKey);
      }
    }

    this._signOnDemand = false;
    this._autoValidateChecksums = false;
  }
  /**
   * @param {{[key: string]: (string | AccountId)} | NetworkName} network
   * @returns {void}
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars


  setNetwork(network) {
    throw new Error("not implemented");
  }
  /**
   * @returns {{[key: string]: (string | AccountId)}}
   */


  get network() {
    return this._network.network;
  }
  /**
   * @param {string[] | string | NetworkName} mirrorNetwork
   * @returns {void}
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars


  setMirrorNetwork(mirrorNetwork) {
    throw new Error("not implemented");
  }
  /**
   * @returns {string[]}
   */


  get mirrorNetwork() {
    return this._mirrorNetwork.network;
  }
  /**
   * @param {boolean} signOnDemand
   */


  setSignOnDemand(signOnDemand) {
    this._signOnDemand = signOnDemand;
  }
  /**
   * Set the account that will, by default, pay for transactions and queries built with this client.
   *
   * @param {AccountId | string} accountId
   * @param {PrivateKey | string} privateKey
   * @returns {this}
   */


  setOperator(accountId, privateKey) {
    const key = typeof privateKey === "string" ? _cryptography.PrivateKey.fromString(privateKey) : privateKey;
    return this.setOperatorWith(accountId, key.publicKey, message => Promise.resolve(key.sign(message)));
  }
  /**
   * Sets the account that will, by default, pay for transactions and queries built with
   * this client.
   *
   * @param {AccountId | string} accountId
   * @param {PublicKey | string} publicKey
   * @param {(message: Uint8Array) => Promise<Uint8Array>} transactionSigner
   * @returns {this}
   */


  setOperatorWith(accountId, publicKey, transactionSigner) {
    const accountId_ = accountId instanceof _AccountId.default ? accountId : _AccountId.default.fromString(accountId);
    accountId_.validateChecksum(this);
    this._operator = {
      transactionSigner,
      accountId: accountId_,
      publicKey: publicKey instanceof _cryptography.PublicKey ? publicKey : _cryptography.PublicKey.fromString(publicKey)
    };
    return this;
  }
  /**
   * @param {boolean} value
   * @returns {this}
   */


  setAutoValidateChecksums(value) {
    this._autoValidateChecksums = value;
    return this;
  }
  /**
   * @returns {boolean}
   */


  isAutoValidateChecksumsEnabled() {
    return this._autoValidateChecksums;
  }
  /**
   * @returns {?AccountId}
   */


  get operatorAccountId() {
    return this._operator != null ? this._operator.accountId : null;
  }
  /**
   * @returns {?PublicKey}
   */


  get operatorPublicKey() {
    return this._operator != null ? this._operator.publicKey : null;
  }
  /**
   * @returns {Hbar}
   */


  get maxTransactionFee() {
    return this._maxTransactionFee;
  }
  /**
   * Set the maximum fee to be paid for transactions
   * executed by this client.
   *
   * @param {Hbar} maxTransactionFee
   * @returns {this}
   */


  setMaxTransactionFee(maxTransactionFee) {
    this._maxTransactionFee = maxTransactionFee;
    return this;
  }
  /**
   * @returns {Hbar}
   */


  get maxQueryPayment() {
    return this._maxQueryPayment;
  }
  /**
   * Set the maximum payment allowable for queries.
   *
   * @param {Hbar} maxQueryPayment
   * @returns {Client<ChannelT, MirrorChannelT>}
   */


  setMaxQueryPayment(maxQueryPayment) {
    this._maxQueryPayment = maxQueryPayment;
    return this;
  }
  /**
   * @param {AccountId | string} accountId
   */


  async ping(accountId) {
    await new _AccountBalanceQuery.default({
      accountId
    }).setNodeAccountIds([accountId instanceof _AccountId.default ? accountId : _AccountId.default.fromString(accountId)]).execute(this);
  }
  /**
   * @returns {void}
   */


  close() {
    this._network.close();

    this._mirrorNetwork.close();
  }
  /**
   * @abstract
   * @returns {(address: string) => ChannelT}
   */


  _createNetworkChannel() {
    throw new Error("not implemented");
  }
  /**
   * @abstract
   * @returns {((address: string) => MirrorChannelT)?}
   */


  _createMirrorNetworkChannel() {
    // throw new Error("not implemented");
    return null;
  }

}

exports.default = Client;