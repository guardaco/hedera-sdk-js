import { Client, credentials } from "@grpc/grpc-js";
import Channel from "./Channel.js";

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
     * @param {string=} cert
     */
    constructor(address, cert) {
        super();

        this.cert = cert;

        let security;
        let options;

        if (this.cert != null) {
            security = credentials.createSsl(Buffer.from(this.cert));
            options = {
                "grpc.ssl_target_name_override": "127.0.0.1",
                "grpc.default_authority": "127.0.0.1",
            };
        } else {
            security = credentials.createInsecure();
        }

        /**
         * @type {Client}
         * @private
         */
        this._client = new Client(address, security, options);
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
                (e, r) => {
                    callback(e, r);
                }
            );
        };
    }
}
