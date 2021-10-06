"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.keyToProtobuf = keyToProtobuf;
exports.keyListToProtobuf = keyListToProtobuf;
exports.keyFromProtobuf = keyFromProtobuf;
exports.keyListFromProtobuf = keyListFromProtobuf;

var _cryptography = require("@hashgraph/cryptography");

var _ContractId = _interopRequireDefault(require("../contract/ContractId.cjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @namespace proto
 * @typedef {import("@hashgraph/proto").IKey} proto.IKey
 * @typedef {import("@hashgraph/proto").IKeyList} proto.IKeyList
 * @typedef {import("@hashgraph/proto").IThresholdKey} proto.IThresholdKey
 */

/**
 * @typedef {import("@hashgraph/cryptography").Key} Key
 */

/**
 * @param {Key} key
 * @returns {proto.IKey}
 */
function keyToProtobuf(key) {
  if (key instanceof _cryptography.PrivateKey) {
    key = key.publicKey;
  }

  if (key instanceof _cryptography.PublicKey) {
    return {
      ed25519: key.toBytes()
    };
  }

  if (key instanceof _cryptography.KeyList) {
    if (key.threshold == null) {
      return {
        keyList: keyListToProtobuf(key)
      };
    } else {
      return {
        thresholdKey: {
          threshold: key.threshold,
          keys: keyListToProtobuf(key)
        }
      };
    }
  }

  if (key instanceof _ContractId.default) {
    return {
      contractID: key._toProtobuf()
    };
  }

  throw new Error(`(BUG) keyToProtobuf: unsupported key type: ${key.constructor.name}`);
}
/**
 * @param {KeyList} list
 * @returns {proto.IKeyList}
 */


function keyListToProtobuf(list) {
  const keys = [];

  for (const key of list) {
    keys.push(keyToProtobuf(key));
  }

  return {
    keys
  };
}
/**
 * @param {proto.IKey} key
 * @returns {KeyList | PublicKey | ContractId}
 */


function keyFromProtobuf(key) {
  if (key.contractID != null) {
    return _ContractId.default._fromProtobuf(key.contractID);
  }

  if (key.ed25519 != null && key.ed25519.byteLength > 0) {
    return _cryptography.PublicKey.fromBytes(key.ed25519);
  }

  if (key.thresholdKey != null && key.thresholdKey.threshold != null) {
    const kl = key.thresholdKey.keys != null ? keyListFromProtobuf(key.thresholdKey.keys) : new _cryptography.KeyList();
    kl.setThreshold(key.thresholdKey.threshold);
    return kl;
  }

  if (key.keyList != null) {
    return keyListFromProtobuf(key.keyList);
  }

  throw new Error(`(BUG) keyFromProtobuf: not implemented key case: ${JSON.stringify(key)}`);
}
/**
 * @param {proto.IKeyList} keys
 * @returns {KeyList}
 */


function keyListFromProtobuf(keys) {
  if (keys.keys == null) {
    return new _cryptography.KeyList();
  }

  return _cryptography.KeyList.from(keys.keys, keyFromProtobuf);
}