"use strict";
exports.__esModule = true;
exports.openInfinityWallet = exports.detectEthereumProvider = void 0;
var deep_link_1 = require("./src/deep-link");
/**
 * Returns a Promise that resolves to the value of window.ethereum if it is
 * set within the given timeout, or null.
 * The Promise will not reject, but an error will be thrown if invalid options
 * are provided.
 *
 * @param options - Options bag.
 * @param options.mustBeInfinityWallet - Whether to only look for InfinityWallet providers.
 * Default: false
 * @param options.silent - Whether to silence console errors. Does not affect
 * thrown errors. Default: false
 * @param options.timeout - Milliseconds to wait for 'ethereum#initialized' to
 * be dispatched. Default: 3000
 * @returns A Promise that resolves with the Provider if it is detected within
 * given timeout, otherwise null.
 */
function detectEthereumProvider(_a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.mustBeInfinityWallet, mustBeInfinityWallet = _c === void 0 ? false : _c, _d = _b.silent, silent = _d === void 0 ? false : _d, _e = _b.timeout, timeout = _e === void 0 ? 3000 : _e;
    _validateInputs();
    var handled = false;
    return new Promise(function (resolve) {
        if (window.ethereum) {
            handleEthereum();
        }
        else {
            window.addEventListener('ethereum#initialized', handleEthereum, { once: true });
            setTimeout(function () {
                handleEthereum();
            }, timeout);
        }
        function handleEthereum() {
            if (handled) {
                return;
            }
            handled = true;
            window.removeEventListener('ethereum#initialized', handleEthereum);
            var ethereum = window.ethereum;
            if (ethereum && (!mustBeInfinityWallet || ethereum.isInfinityWallet)) {
                resolve(ethereum);
            }
            else {
                var message = mustBeInfinityWallet && ethereum
                    ? 'Non-InfinityWallet window.ethereum detected.'
                    : 'Unable to detect window.ethereum.';
                !silent && console.error('@InfinityWallet/detect-provider:', message);
                resolve(null);
            }
        }
    });
    function _validateInputs() {
        if (typeof mustBeInfinityWallet !== 'boolean') {
            throw new Error("@InfinityWallet/detect-provider: Expected option 'mustBeInfinityWallet' to be a boolean.");
        }
        if (typeof silent !== 'boolean') {
            throw new Error("@InfinityWallet/detect-provider: Expected option 'silent' to be a boolean.");
        }
        if (typeof timeout !== 'number') {
            throw new Error("@InfinityWallet/detect-provider: Expected option 'timeout' to be a number.");
        }
    }
}
exports.detectEthereumProvider = detectEthereumProvider;
/**
 * Handle for when no Ethereum Provider is present on the window. In case it has InfinityWallet
 * installed, it will use deeplink to open the current on the wallet dapp explorer. In case it's
 * not installed, it will go to wallet's download page.
 *
 * @param hostname - Hostname of the dapp.
 */
function openInfinityWallet(hostname) {
    var linker = new deep_link_1.DeepLinker({
        onIgnored: function () {
            window.open("https://infinitywallet.io/download");
        }
    });
    if (hostname.includes('://'))
        hostname = hostname.split('://')[1];
    linker.openURL("infinity:?dapp=" + hostname);
}
exports.openInfinityWallet = openInfinityWallet;
