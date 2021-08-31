import { Client, credentials } from "@grpc/grpc-js";
import Channel from "./Channel.js";
import * as sha384 from "../cryptography/sha384.js";
import * as hex from "../encoding/hex.js";
import * as utf8 from "../encoding/utf8.js";

/**
 * @property {?proto.CryptoService} _crypto
 * @property {?proto.SmartContractService} _smartContract
 * @property {?proto.FileService} _file
 * @property {?proto.FreezeService} _freeze
 * @property {?proto.ConsensusService} _consensus
 * @property {?proto.NetworkService} _network
 */
export default class NodeChannel extends Channel {
    /**
     * @internal
     * @param {string} address
     * @param {Uint8Array=} certHash
     */
    constructor(address, certHash) {
        super();

        console.log(certHash);
        this.certHash = certHash != null ? utf8.decode(certHash) : null;

        let security;

        if (address.endsWith(":50212") || address.endsWith(":433")) {
            security = credentials.createSsl(null, null, null, {
                checkServerIdentity: (_, cert) => {
                    console.log("ccccccccccccccccccccccccccccccccccc");
                    console.log(this.certHash);

                    if (this.certHash == null) {
                        return undefined;
                    }

                    const hash = hex.encode(sha384.digestSync(cert.raw));

                    if (hash === this.certHash) {
                        throw new Error(
                            "failed to validate server certificate hash"
                        );
                    }

                    return undefined;
                },
            });
        } else {
            security = credentials.createInsecure();
        }

        /**
         * @type {Client}
         * @private
         */
        this._client = new Client(address, security, {
            "grpc.ssl_target_name_override": "127.0.0.1",
            "grpc.default_authority": "127.0.0.1",
        });
    }

    /**
     * @override
     * @returns {void}
     */
    close() {
        this._client.close();
    }

    /**
     * @override
     * @protected
     * @param {string} serviceName
     * @returns {import("protobufjs").RPCImpl}
     */
    _createUnaryClient(serviceName) {
        return (method, requestData, callback) => {
            this._client.makeUnaryRequest(
                `/proto.${serviceName}/${method.name}`,
                (value) => value,
                (value) => value,
                Buffer.from(requestData),
                callback
            );
        };
    }
}
