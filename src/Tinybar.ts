import BigNumber from "bignumber.js";
import { Hbar } from "./Hbar";
import { TinybarValueError } from "./errors";
import { UInt64Value } from "google-protobuf/google/protobuf/wrappers_pb";

/**
 * The default denomination of currency for the SDK and in the Hedera protocol.
 *
 * One Tinybar is `1 / 100,000,000` of an HBAR.
 *
 * Note that `number` can only precisely represent integers in the range `[-2^53, 2^53)`;
 * passing `number` values outside of this range will cause an error to be thrown as rounding may
 * have occurred. For all other cases, `BigNumber` may be used.
 *
 * However, the recommended way to handle HBAR amounts with the SDK is to use the `Hbar` class
 * which provides conversion to and from any standard denomination of HBAR. Any method which
 * accepts this type for currency amounts also accepts instances of this class.
 *
 * Note additionally that while `BigNumber` and `Hbar` are arbitrary-precision, the largest range
 * supported by the Hedera protocol is `[-2^63, 2^63)`.
 */
export type Tinybar = number | BigNumber;

const maxTinybarBignum = new BigNumber(2).pow(63).minus(1);
const minTinybarBignum = new BigNumber(2).pow(63).negated();

export function tinybarRangeCheck(amount: Tinybar | Hbar, allowNegative?: "allowNegative"): void {
    const negativeError = "tinybar amount must not be negative in this context";

    if (BigNumber.isBigNumber(amount) || amount instanceof Hbar) {
        if (!allowNegative && amount.isNegative()) {
            throw new TinybarValueError(negativeError, amount);
        }

        const bnAmount = amount instanceof Hbar ? amount.asTinybar() : amount;

        if (bnAmount.lt(minTinybarBignum) || bnAmount.gt(maxTinybarBignum)) {
            throw new TinybarValueError("tinybar amount out of range", bnAmount);
        }
    } else {
        if (!allowNegative && amount < 0) {
            throw new TinybarValueError(negativeError, amount);
        }

        if (!Number.isSafeInteger(amount)) {
            throw new TinybarValueError(
                "tinybar amount out of safe integer range for `number`",
                amount
            );
        }
    }
}

export function tinybarToString(amount: Tinybar | Hbar, allowNegative?: "allowNegative"): string {
    tinybarRangeCheck(amount, allowNegative);

    if (amount instanceof Hbar) {
        return String(amount.asTinybar());
    }
    return String(amount);
}

export function tinybarToUInt64Value(threshold: Tinybar | Hbar): UInt64Value {
    const value = new UInt64Value();
    const tinybar: Tinybar = threshold instanceof Hbar ?
        threshold.asTinybar() :
        threshold;
    if (BigNumber.isBigNumber(tinybar)) {
        tinybarRangeCheck(tinybar);
        value.setValue(tinybar.toNumber());
    } else {
        value.setValue(tinybar);
    }

    return value;
}
