import { IncomingMessage } from 'node:http';
import { TLSSocket } from 'node:tls';

interface Options {
    trustProxy?: boolean;
}

export const isHTTPS = (req: IncomingMessage, options: Options ): boolean | undefined => {
    options = options ?? { trustProxy: true }
    // Check x-forwarded-proto header
    options = { trustProxy: true, ...options };
    const _xForwardedProto = options.trustProxy && req.headers && req.headers['x-forwarded-proto'];
    const protoCheck = typeof _xForwardedProto === 'string' && _xForwardedProto === 'https';

    if (protoCheck) {
        return true;
    }

    // Check tlsSocket
    const _encrypted = req.socket && (req.socket as TLSSocket).encrypted;
    const encryptedCheck = _encrypted === true;

    if (encryptedCheck) {
        console.log('encryptedCheck', encryptedCheck);
        return true;
    }

    // No protocol check succeeded
    return undefined;
};
