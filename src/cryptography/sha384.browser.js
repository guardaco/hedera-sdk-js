/**
 * @param {Uint8Array} data
 * @returns {Promise<Uint8Array>}
 */
import { sha384 } from 'js-sha512';


// @ts-ignore
export async function digest(data) {
    // https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest
    // eslint-disable-next-line @typescript-eslint/await-thenable
    return new Uint8Array(await sha384.digest(data));
}
