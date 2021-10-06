/**
 * @namespace proto
 * @typedef {import("@hashgraph/proto").TokenFreezeStatus} proto.TokenFreezeStatus
 * @typedef {import("@hashgraph/proto").TokenKycStatus} proto.TokenKycStatus
 * @typedef {import("@hashgraph/proto").ITokenNftInfo} proto.ITokenNftInfo
 * @typedef {import("@hashgraph/proto").INftID} proto.INftID
 * @typedef {import("@hashgraph/proto").ITimestamp} proto.ITimestamp
 * @typedef {import("@hashgraph/proto").ITokenID} proto.ITokenID
 * @typedef {import("@hashgraph/proto").IAccountID} proto.IAccountID
 * @typedef {import("@hashgraph/proto").IKey} proto.IKey
 * @typedef {import("@hashgraph/proto").IDuration} proto.IDuration
 */
/**
 * @typedef {import("@hashgraph/cryptography").Key} Key
 */
export default class TokenNftInfo {
    /**
     * @internal
     * @param {proto.ITokenNftInfo} info
     * @returns {TokenNftInfo}
     */
    static _fromProtobuf(info: proto.ITokenNftInfo): TokenNftInfo;
    /**
     * @private
     * @param {object} props
     * @param {NftId} props.nftId;
     * @param {AccountId} props.accountId;
     * @param {Timestamp} props.creationTime;
     * @param {Uint8Array | null} props.metadata;
     */
    private constructor();
    /**
     * ID of the nft instance
     *
     * @readonly
     */
    readonly nftId: NftId;
    /**
     * @readonly
     */
    readonly accountId: AccountId;
    /**
     * @readonly
     */
    readonly creationTime: Timestamp;
    /**
     * @readonly
     */
    readonly metadata: Uint8Array | null;
    /**
     * @returns {proto.ITokenNftInfo}
     */
    _toProtobuf(): proto.ITokenNftInfo;
}
export namespace proto {
    type TokenFreezeStatus = import("@hashgraph/proto").TokenFreezeStatus;
    type TokenKycStatus = import("@hashgraph/proto").TokenKycStatus;
    type ITokenNftInfo = import("@hashgraph/proto").ITokenNftInfo;
    type INftID = import("@hashgraph/proto").INftID;
    type ITimestamp = import("@hashgraph/proto").ITimestamp;
    type ITokenID = import("@hashgraph/proto").ITokenID;
    type IAccountID = import("@hashgraph/proto").IAccountID;
    type IKey = import("@hashgraph/proto").IKey;
    type IDuration = import("@hashgraph/proto").IDuration;
}
export type Key = import("@hashgraph/cryptography").Key;
import NftId from "./NftId.js";
import AccountId from "../account/AccountId.js";
import Timestamp from "../Timestamp.js";
