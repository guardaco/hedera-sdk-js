export namespace Network {
    /**
     * @param {string} name
     * @returns {{[key: string]: (string | AccountId)}}
     */
    function fromName(name: string): {
        [key: string]: string | AccountId;
    };
    /**
     * @param {string} name
     * @returns {{[key: string]: (string | AccountId)}}
     */
    function fromName(name: string): {
        [key: string]: string | AccountId;
    };
    const MAINNET: {
        "https://grpc-web.myhbarwallet.com": AccountId;
    };
    const TESTNET: {
        "https://grpc-web.testnet.myhbarwallet.com": AccountId;
    };
    const PREVIEWNET: {
        "https://grpc-web.previewnet.myhbarwallet.com": AccountId;
    };
}
/**
 * @augments {Client<NativeChannel, *>}
 */
export default class NativeClient extends Client<NativeChannel, any> {
    /**
     * @param {string | ClientConfiguration} data
     * @returns {NativeClient}
     */
    static fromConfig(data: string | ClientConfiguration): NativeClient;
    /**
     * Construct a client for a specific network.
     *
     * It is the responsibility of the caller to ensure that all nodes in the map are part of the
     * same Hedera network. Failure to do so will result in undefined behavior.
     *
     * The client will load balance all requests to Hedera using a simple round-robin scheme to
     * chose nodes to send transactions to. For one transaction, at most 1/3 of the nodes will be
     * tried.
     *
     * @param {{[key: string]: (string | AccountId)} | import("./Client.js").NetworkName} network
     * @returns {NativeClient}
     */
    static forNetwork(network: import("./Client.js").NetworkName | {
        [key: string]: string | AccountId;
    }): NativeClient;
    /**
     * @param {NetworkName} network
     * @returns {NativeClient}
     */
    static forName(network: NetworkName): NativeClient;
    /**
     * Construct a Hedera client pre-configured for Mainnet access.
     *
     * @returns {NativeClient}
     */
    static forMainnet(): NativeClient;
    /**
     * Construct a Hedera client pre-configured for Testnet access.
     *
     * @returns {NativeClient}
     */
    static forTestnet(): NativeClient;
    /**
     * Construct a Hedera client pre-configured for Previewnet access.
     *
     * @returns {NativeClient}
     */
    static forPreviewnet(): NativeClient;
    /**
     * @param {ClientConfiguration} [props]
     */
    constructor(props?: import("./Client.js").ClientConfiguration | undefined);
}
export type ClientConfiguration = import("./Client.js").ClientConfiguration;
export type NetworkName = import("./Client.js").NetworkName;
import AccountId from "../account/AccountId.js";
import NativeChannel from "../channel/NativeChannel.js";
import Client from "./Client.js";
