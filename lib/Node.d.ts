/**
 * @typedef {import("./account/AccountId.js").default} AccountId
 * @typedef {import("./channel/Channel.js").default} Channel
 */
/**
 * @template {Channel} ChannelT
 * @augments {ManagedNode<ChannelT>}
 */
export default class Node<ChannelT extends import("./channel/Channel.js").default> extends ManagedNode<ChannelT> {
    /**
     * @param {AccountId} accountId
     * @param {string} address
     * @param {(address: string) => ChannelT} channelInitFunction
     */
    constructor(accountId: AccountId, address: string, channelInitFunction: (address: string) => ChannelT);
    accountId: import("./account/AccountId.js").default;
    /** @type {number} */
    delay: number;
    /** @type {number} */
    lastUsed: number;
    /** @type {number} */
    delayUntil: number;
    /** @type {number} */
    useCount: number;
    inUse(): void;
    /**
     * Determines if this node is healthy by checking if this node hasn't been
     * in use for a the required `delay` period. Since this looks at `this.lastUsed`
     * and that value is only set in the `wait()` method, any node that has not
     * returned a bad gRPC status will always be considered healthy.
     *
     * @returns {boolean}
     */
    isHealthy(): boolean;
    increaseDelay(): void;
    decreaseDelay(): void;
    /**
     * This is only ever called if the node itself is down.
     * A node returning a transaction with a bad status code does not indicate
     * the node is down, and hence this method will not be called.
     *
     * @returns {Promise<void>}
     */
    wait(): Promise<void>;
    /**
     * @param {Node<*>} node
     * @returns {number}
     */
    compare(node: Node<any>): number;
}
export type AccountId = import("./account/AccountId.js").default;
export type Channel = import("./channel/Channel.js").default;
import ManagedNode from "./ManagedNode.js";
