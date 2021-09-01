import { Client, credentials } from "@grpc/grpc-js";
import Channel from "./Channel.js";
import * as sha384 from "../cryptography/sha384.js";
import * as hex from "../encoding/hex.js";
import * as utf8 from "../encoding/utf8.js";
import * as https from "https";
import * as tls from "tls";

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
     * @param {Uint8Array=} cert
     */
    constructor(address, certHash, cert) {
        super();

        this.certHash = certHash != null ? utf8.decode(certHash) : null;

        let security;

        // if (cert != null) {
            // security = credentials.createSsl(Buffer.from(cert));
            security = credentials.createSsl(null, null, null, {
                checkServerIdentity: (_, __) => {

                    console.log("fffffffffffffffffffffffffffffffffffff");
                    return undefined;
                }
            });
        // } else {
        //     security = credentials.createInsecure();
        // }

        /**
         * @type {Client}
         * @private
         */
        this._client = new Client(address, security, {
            "grpc.ssl_target_name_override": "127.0.0.1",
            "grpc.default_authority": "127.0.0.1",
            "grpc.http_connect_creds": "0",
        });
    }

    /**
     * @internal
     * @param {string} address
     * @param {Uint8Array=} certHash
     * @returns {Promise<NodeChannel>}
     */
    static async new(address, certHash) {
        let cert = undefined;
        if (address.endsWith(":50212") || address.endsWith(":433")) {
            // process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";
            const response = tls.connect({
                host: "0.previewnet.hedera.com",
                rejectUnauthorized: false,
                ciphers: "ALL",
                port: 50212,
                checkServerIdentity: (_, __) => {
                    console.log("gggggggggggggggggggggggggggggggggg");
                    return undefined;
                }
            }, () => console.log("CONNNECTED -------------------------------------------------"));

            await new Promise((resolved) => setTimeout(resolved, 1000));

            console.log(response.getPeerCertificate(true));
            console.log(response.getCertificate());
            // console.log(response.getX509Certificate());

            // const response = new Promise((reject, resolve) => {
            //     https.get(options, (res) => {
            //         res.socket.connect.getPeerCertificate();
            //     });
            // });
        }

        return new NodeChannel(address, certHash, new Uint8Array());
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
            console.log('eeeeeeeeeeeeeeeeeeee');
            this._client.makeUnaryRequest(
                `/proto.${serviceName}/${method.name}`,
                (value) => value,
                (value) => value,
                Buffer.from(requestData),
                (e, r) => {
                    console.log(e);
                    console.log(r);
                    callback(e, r);
                }
            );
        };
    }
}
