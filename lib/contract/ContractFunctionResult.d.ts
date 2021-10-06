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
export default class ContractFunctionResult {
    /**
     * @param {proto.IContractFunctionResult} result
     * @returns {ContractFunctionResult}
     */
    static _fromProtobuf(result: proto.IContractFunctionResult): ContractFunctionResult;
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
    constructor(result: {
        contractId: ContractId | null;
        errorMessage: string | null;
        bloom: Uint8Array;
        gasUsed: Long;
        logs: ContractLogInfo[];
        bytes: Uint8Array;
    });
    /**
     * The smart contract instance whose function was called.
     */
    contractId: ContractId | null;
    bytes: Uint8Array;
    /**
     * Message In case there was an error during smart contract execution.
     */
    errorMessage: string | null;
    /**
     * Bloom filter for record
     */
    bloom: Uint8Array;
    /**
     * Units of gas used  to execute contract.
     */
    gasUsed: Long.Long;
    /**
     * The log info for events returned by the function.
     */
    logs: ContractLogInfo[];
    /**
     * @returns {Uint8Array}
     */
    asBytes(): Uint8Array;
    /**
     * @param {number} [index]
     * @returns {string}
     */
    getString(index?: number | undefined): string;
    /**
     * @private
     * @param {number} [index]
     * @returns {Uint8Array}
     */
    private getBytes;
    /**
     * @param {number} [index]
     * @returns {Uint8Array}
     */
    getBytes32(index?: number | undefined): Uint8Array;
    /**
     * @param {number} [index]
     * @returns {boolean}
     */
    getBool(index?: number | undefined): boolean;
    /**
     * @param {number} [index]
     * @returns {number}
     */
    getInt8(index?: number | undefined): number;
    /**
     * @param {number} [index]
     * @returns {number}
     */
    getInt32(index?: number | undefined): number;
    /**
     * @param {number} [index]
     * @returns {BigNumber}
     */
    getInt64(index?: number | undefined): BigNumber;
    /**
     * @param {number} [index]
     * @returns {BigNumber}
     */
    getInt256(index?: number | undefined): BigNumber;
    /**
     * @param {number} [index]
     * @returns {number}
     */
    getUint8(index?: number | undefined): number;
    /**
     * @param {number} [index]
     * @returns {number}
     */
    getUint32(index?: number | undefined): number;
    /**
     * @param {number} [index]
     * @returns {BigNumber}
     */
    getUint64(index?: number | undefined): BigNumber;
    /**
     * @param {number} [index]
     * @returns {BigNumber}
     */
    getUint256(index?: number | undefined): BigNumber;
    /**
     * @param {number} [index]
     * @returns {string}
     */
    getAddress(index?: number | undefined): string;
    /**
     * @param {number} [index]
     * @returns {Uint8Array}
     */
    _getBytes32(index?: number | undefined): Uint8Array;
}
export namespace proto {
    type IContractFunctionResult = import("@hashgraph/proto").IContractFunctionResult;
    type IContractID = import("@hashgraph/proto").IContractID;
}
import ContractId from "./ContractId.js";
import Long from "long";
import ContractLogInfo from "./ContractLogInfo.js";
import BigNumber from "bignumber.js";
