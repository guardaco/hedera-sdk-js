/**
 * @typedef {import("long").Long} Long
 * @typedef {import("../client/Client.js").default<*, *>} Client
 */
/**
 * The ID for a crypto-currency contract on Hedera.
 */
export default class ContractId extends Key {
    /**
     * @param {string} text
     * @returns {ContractId}
     */
    static fromString(text: string): ContractId;
    /**
     * @internal
     * @param {proto.IContractID} id
     * @returns {ContractId}
     */
    static _fromProtobuf(id: proto.IContractID): ContractId;
    /**
     * @param {Uint8Array} bytes
     * @returns {ContractId}
     */
    static fromBytes(bytes: Uint8Array): ContractId;
    /**
     * @param {string} address
     * @returns {ContractId}
     */
    static fromSolidityAddress(address: string): ContractId;
    /**
     * @param {number | Long | import("../EntityIdHelper").IEntityId} props
     * @param {(number | Long)=} realm
     * @param {(number | Long)=} num
     */
    constructor(props: number | Long | import("../EntityIdHelper").IEntityId, realm?: (number | Long) | undefined, num?: (number | Long) | undefined);
    shard: import("long").Long;
    realm: import("long").Long;
    num: import("long").Long;
    /**
     * @type {string | null}
     */
    _checksum: string | null;
    /**
     * @returns {string | null}
     */
    get checksum(): string | null;
    /**
     * @deprecated - Use `validateChecksum` instead
     * @param {Client} client
     */
    validate(client: import("../client/Client.js").default<any, any>): void;
    /**
     * @param {Client} client
     */
    validateChecksum(client: import("../client/Client.js").default<any, any>): void;
    /**
     * @internal
     * @returns {proto.IContractID}
     */
    _toProtobuf(): proto.IContractID;
    /**
     * @param {Client} client
     * @returns {string}
     */
    toStringWithChecksum(client: import("../client/Client.js").default<any, any>): string;
    /**
     * @returns {Uint8Array}
     */
    toBytes(): Uint8Array;
    /**
     * @returns {ContractId}
     */
    clone(): ContractId;
}
export type Long = import("long").Long;
export type Client = import("../client/Client.js").default<any, any>;
import { Key } from "@hashgraph/cryptography";
import * as proto from "@hashgraph/proto";
