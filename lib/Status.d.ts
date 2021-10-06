/**
 * @namespace proto
 * @typedef {import("@hashgraph/proto").ResponseCodeEnum} proto.ResponseCodeEnum
 */
declare class Status {
    /**
     * @internal
     * @param {number} code
     * @returns {Status}
     */
    static _fromCode(code: number): Status;
    /**
     * @hideconstructor
     * @internal
     * @param {number} code
     */
    constructor(code: number);
    /** @readonly */
    readonly _code: number;
    /**
     * @returns {string}
     */
    toString(): string;
    /**
     * @returns {proto.ResponseCodeEnum}
     */
    valueOf(): proto.ResponseCodeEnum;
}
declare namespace Status {
    const Ok: Status;
    const InvalidTransaction: Status;
    const PayerAccountNotFound: Status;
    const InvalidNodeAccount: Status;
    const TransactionExpired: Status;
    const InvalidTransactionStart: Status;
    const InvalidTransactionDuration: Status;
    const InvalidSignature: Status;
    const MemoTooLong: Status;
    const InsufficientTxFee: Status;
    const InsufficientPayerBalance: Status;
    const DuplicateTransaction: Status;
    const Busy: Status;
    const NotSupported: Status;
    const InvalidFileId: Status;
    const InvalidAccountId: Status;
    const InvalidContractId: Status;
    const InvalidTransactionId: Status;
    const ReceiptNotFound: Status;
    const RecordNotFound: Status;
    const InvalidSolidityId: Status;
    const Unknown: Status;
    const Success: Status;
    const FailInvalid: Status;
    const FailFee: Status;
    const FailBalance: Status;
    const KeyRequired: Status;
    const BadEncoding: Status;
    const InsufficientAccountBalance: Status;
    const InvalidSolidityAddress: Status;
    const InsufficientGas: Status;
    const ContractSizeLimitExceeded: Status;
    const LocalCallModificationException: Status;
    const ContractRevertExecuted: Status;
    const ContractExecutionException: Status;
    const InvalidReceivingNodeAccount: Status;
    const MissingQueryHeader: Status;
    const AccountUpdateFailed: Status;
    const InvalidKeyEncoding: Status;
    const NullSolidityAddress: Status;
    const ContractUpdateFailed: Status;
    const InvalidQueryHeader: Status;
    const InvalidFeeSubmitted: Status;
    const InvalidPayerSignature: Status;
    const KeyNotProvided: Status;
    const InvalidExpirationTime: Status;
    const NoWaclKey: Status;
    const FileContentEmpty: Status;
    const InvalidAccountAmounts: Status;
    const EmptyTransactionBody: Status;
    const InvalidTransactionBody: Status;
    const InvalidSignatureTypeMismatchingKey: Status;
    const InvalidSignatureCountMismatchingKey: Status;
    const EmptyLiveHashBody: Status;
    const EmptyLiveHash: Status;
    const EmptyLiveHashKeys: Status;
    const InvalidLiveHashSize: Status;
    const EmptyQueryBody: Status;
    const EmptyLiveHashQuery: Status;
    const LiveHashNotFound: Status;
    const AccountIdDoesNotExist: Status;
    const LiveHashAlreadyExists: Status;
    const InvalidFileWacl: Status;
    const SerializationFailed: Status;
    const TransactionOversize: Status;
    const TransactionTooManyLayers: Status;
    const ContractDeleted: Status;
    const PlatformNotActive: Status;
    const KeyPrefixMismatch: Status;
    const PlatformTransactionNotCreated: Status;
    const InvalidRenewalPeriod: Status;
    const InvalidPayerAccountId: Status;
    const AccountDeleted: Status;
    const FileDeleted: Status;
    const AccountRepeatedInAccountAmounts: Status;
    const SettingNegativeAccountBalance: Status;
    const ObtainerRequired: Status;
    const ObtainerSameContractId: Status;
    const ObtainerDoesNotExist: Status;
    const ModifyingImmutableContract: Status;
    const FileSystemException: Status;
    const AutorenewDurationNotInRange: Status;
    const ErrorDecodingBytestring: Status;
    const ContractFileEmpty: Status;
    const ContractBytecodeEmpty: Status;
    const InvalidInitialBalance: Status;
    const InvalidReceiveRecordThreshold: Status;
    const InvalidSendRecordThreshold: Status;
    const AccountIsNotGenesisAccount: Status;
    const PayerAccountUnauthorized: Status;
    const InvalidFreezeTransactionBody: Status;
    const FreezeTransactionBodyNotFound: Status;
    const TransferListSizeLimitExceeded: Status;
    const ResultSizeLimitExceeded: Status;
    const NotSpecialAccount: Status;
    const ContractNegativeGas: Status;
    const ContractNegativeValue: Status;
    const InvalidFeeFile: Status;
    const InvalidExchangeRateFile: Status;
    const InsufficientLocalCallGas: Status;
    const EntityNotAllowedToDelete: Status;
    const AuthorizationFailed: Status;
    const FileUploadedProtoInvalid: Status;
    const FileUploadedProtoNotSavedToDisk: Status;
    const FeeScheduleFilePartUploaded: Status;
    const ExchangeRateChangeLimitExceeded: Status;
    const MaxContractStorageExceeded: Status;
    const TransferAccountSameAsDeleteAccount: Status;
    const TotalLedgerBalanceInvalid: Status;
    const ExpirationReductionNotAllowed: Status;
    const MaxGasLimitExceeded: Status;
    const MaxFileSizeExceeded: Status;
    const ReceiverSigRequired: Status;
    const InvalidTopicId: Status;
    const InvalidAdminKey: Status;
    const InvalidSubmitKey: Status;
    const Unauthorized: Status;
    const InvalidTopicMessage: Status;
    const InvalidAutorenewAccount: Status;
    const AutorenewAccountNotAllowed: Status;
    const TopicExpired: Status;
    const InvalidChunkNumber: Status;
    const InvalidChunkTransactionId: Status;
    const AccountFrozenForToken: Status;
    const TokensPerAccountLimitExceeded: Status;
    const InvalidTokenId: Status;
    const InvalidTokenDecimals: Status;
    const InvalidTokenInitialSupply: Status;
    const InvalidTreasuryAccountForToken: Status;
    const InvalidTokenSymbol: Status;
    const TokenHasNoFreezeKey: Status;
    const TransfersNotZeroSumForToken: Status;
    const MissingTokenSymbol: Status;
    const TokenSymbolTooLong: Status;
    const AccountKycNotGrantedForToken: Status;
    const TokenHasNoKycKey: Status;
    const InsufficientTokenBalance: Status;
    const TokenWasDeleted: Status;
    const TokenHasNoSupplyKey: Status;
    const TokenHasNoWipeKey: Status;
    const InvalidTokenMintAmount: Status;
    const InvalidTokenBurnAmount: Status;
    const TokenNotAssociatedToAccount: Status;
    const CannotWipeTokenTreasuryAccount: Status;
    const InvalidKycKey: Status;
    const InvalidWipeKey: Status;
    const InvalidFreezeKey: Status;
    const InvalidSupplyKey: Status;
    const MissingTokenName: Status;
    const TokenNameTooLong: Status;
    const InvalidWipingAmount: Status;
    const TokenIsImmutable: Status;
    const TokenAlreadyAssociatedToAccount: Status;
    const TransactionRequiresZeroTokenBalances: Status;
    const AccountIsTreasury: Status;
    const TokenIdRepeatedInTokenList: Status;
    const TokenTransferListSizeLimitExceeded: Status;
    const EmptyTokenTransferBody: Status;
    const EmptyTokenTransferAccountAmounts: Status;
    const InvalidScheduleId: Status;
    const ScheduleIsImmutable: Status;
    const InvalidSchedulePayerId: Status;
    const InvalidScheduleAccountId: Status;
    const NoNewValidSignatures: Status;
    const UnresolvableRequiredSigners: Status;
    const ScheduledTransactionNotInWhitelist: Status;
    const SomeSignaturesWereInvalid: Status;
    const TransactionIdFieldNotAllowed: Status;
    const IdenticalScheduleAlreadyCreated: Status;
    const InvalidZeroByteInString: Status;
    const ScheduleAlreadyDeleted: Status;
    const ScheduleAlreadyExecuted: Status;
    const MessageSizeTooLarge: Status;
    const OperationRepeatedInBucketGroups: Status;
    const BucketCapacityOverflow: Status;
    const NodeCapacityNotSufficientForOperation: Status;
    const BucketHasNoThrottleGroups: Status;
    const ThrottleGroupHasZeroOpsPerSec: Status;
    const SuccessButMissingExpectedOperation: Status;
    const UnparseableThrottleDefinitions: Status;
    const InvalidThrottleDefinitions: Status;
    const AccountExpiredAndPendingRemoval: Status;
    const InvalidTokenMaxSupply: Status;
    const InvalidTokenNftSerialNumber: Status;
    const InvalidNftId: Status;
    const MetadataTooLong: Status;
    const BatchSizeLimitExceeded: Status;
    const InvalidQueryRange: Status;
    const FractionDividesByZero: Status;
    const InsufficientPayerBalanceForCustomFee: Status;
    const CustomFeesListTooLong: Status;
    const InvalidCustomFeeCollector: Status;
    const InvalidTokenIdInCustomFees: Status;
    const TokenNotAssociatedToFeeCollector: Status;
    const TokenMaxSupplyReached: Status;
    const SenderDoesNotOwnNftSerialNo: Status;
    const CustomFeeNotFullySpecified: Status;
    const CustomFeeMustBePositive: Status;
    const TokenHasNoFeeScheduleKey: Status;
    const CustomFeeOutsideNumericRange: Status;
    const InvalidCustomFractionalFeesSum: Status;
    const FractionalFeeMaxAmountLessThanMinAmount: Status;
    const CustomScheduleAlreadyHasNoFees: Status;
    const CustomFeeDenominationMustBeFungibleCommon: Status;
    const CustomFractionalFeeOnlyAllowedForFungibleCommon: Status;
    const InvalidCustomFeeScheduleKey: Status;
    const InvalidTokenMintMetadata: Status;
    const InvalidTokenBurnMetadata: Status;
    const CurrentTreasuryStillOwnsNfts: Status;
    const AccountStillOwnsNfts: Status;
    const TreasuryMustOwnBurnedNft: Status;
    const AccountDoesNotOwnWipedNft: Status;
    const AccountAmountTransfersOnlyAllowedForFungibleCommon: Status;
    const MaxNftsInPriceRegimeHaveBeenMinted: Status;
    const PayerAccountDeleted: Status;
    const CustomFeeChargingExceededMaxRecursionDepth: Status;
    const CustomFeeChargingExceededMaxAccountAmounts: Status;
    const InsufficientSenderAccountBalanceForCustomFee: Status;
}
export default Status;
export namespace proto {
    type ResponseCodeEnum = import("@hashgraph/proto").ResponseCodeEnum;
}
