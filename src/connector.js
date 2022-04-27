"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.InfinityWallet = exports.NoInfinityWalletError = void 0;
var types_1 = require("@web3-react/types");
var NoInfinityWalletError = /** @class */ (function (_super) {
    __extends(NoInfinityWalletError, _super);
    function NoInfinityWalletError() {
        var _this = _super.call(this, 'InfinityWallet not installed') || this;
        _this.name = NoInfinityWalletError.name;
        Object.setPrototypeOf(_this, NoInfinityWalletError.prototype);
        return _this;
    }
    return NoInfinityWalletError;
}(Error));
exports.NoInfinityWalletError = NoInfinityWalletError;
function parseChainId(chainId) {
    return Number.parseInt(chainId, 16);
}
var InfinityWallet = /** @class */ (function (_super) {
    __extends(InfinityWallet, _super);
    /**
     * @param connectEagerly - A flag indicating whether connection should be initiated when the class is constructed.
     * @param options - Options to pass to `@infinitywallet/detect-provider`
     */
    function InfinityWallet(actions, connectEagerly, options) {
        if (connectEagerly === void 0) { connectEagerly = false; }
        var _this = _super.call(this, actions) || this;
        if (connectEagerly && typeof window === 'undefined') {
            throw new Error('connectEagerly = true is invalid for SSR, instead use the connectEagerly method in a useEffect');
        }
        _this.options = options;
        if (connectEagerly)
            void _this.connectEagerly();
        return _this;
    }
    InfinityWallet.prototype.isomorphicInitialize = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.eagerConnection)
                            return [2 /*return*/, this.eagerConnection];
                        return [4 /*yield*/, (this.eagerConnection = Promise.resolve().then(function () { return require('@infinitywallet/detect-provider'); }).then(function (m) { return m["default"](_this.options); })
                                .then(function (provider) {
                                var _a, _b;
                                if (provider) {
                                    _this.provider = provider;
                                    // edge case if e.g. infinitywallet and coinbase wallet are both installed
                                    if ((_a = _this.provider.providers) === null || _a === void 0 ? void 0 : _a.length) {
                                        _this.provider = (_b = _this.provider.providers.find(function (p) { return p.isInfinityWallet; })) !== null && _b !== void 0 ? _b : _this.provider.providers[0];
                                    }
                                    _this.provider.on('connect', function (_a) {
                                        var chainId = _a.chainId;
                                        _this.actions.update({ chainId: parseChainId(chainId) });
                                    });
                                    _this.provider.on('disconnect', function (error) {
                                        _this.actions.reportError(error);
                                    });
                                    _this.provider.on('chainChanged', function (chainId) {
                                        _this.actions.update({ chainId: parseChainId(chainId) });
                                    });
                                    _this.provider.on('accountsChanged', function (accounts) {
                                        if (accounts.length === 0) {
                                            // handle this edge case by disconnecting
                                            _this.actions.reportError(undefined);
                                        }
                                        else {
                                            _this.actions.update({ accounts: accounts });
                                        }
                                    });
                                }
                            }))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /** {@inheritdoc Connector.connectEagerly} */
    InfinityWallet.prototype.connectEagerly = function () {
        return __awaiter(this, void 0, void 0, function () {
            var cancelActivation;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cancelActivation = this.actions.startActivation();
                        return [4 /*yield*/, this.isomorphicInitialize()];
                    case 1:
                        _a.sent();
                        if (!this.provider)
                            return [2 /*return*/, cancelActivation()];
                        return [2 /*return*/, Promise.all([
                                this.provider.request({ method: 'eth_chainId' }),
                                this.provider.request({ method: 'eth_accounts' }),
                            ])
                                .then(function (_a) {
                                var chainId = _a[0], accounts = _a[1];
                                if (accounts.length) {
                                    _this.actions.update({ chainId: parseChainId(chainId), accounts: accounts });
                                }
                                else {
                                    throw new Error('No accounts returned');
                                }
                            })["catch"](function (error) {
                                console.debug('Could not connect eagerly', error);
                                cancelActivation();
                            })];
                }
            });
        });
    };
    /**
     * Initiates a connection.
     *
     * @param desiredChainIdOrChainParameters - If defined, indicates the desired chain to connect to. If the user is
     * already connected to this chain, no additional steps will be taken. Otherwise, the user will be prompted to switch
     * to the chain, if one of two conditions is met: either they already have it added in their extension, or the
     * argument is of type AddEthereumChainParameter, in which case the user will be prompted to add the chain with the
     * specified parameters first, before being prompted to switch.
     */
    InfinityWallet.prototype.activate = function (desiredChainIdOrChainParameters) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!((_b = (_a = this.provider) === null || _a === void 0 ? void 0 : _a.isConnected) === null || _b === void 0 ? void 0 : _b.call(_a)))
                            this.actions.startActivation();
                        return [4 /*yield*/, this.isomorphicInitialize()];
                    case 1:
                        _c.sent();
                        if (!this.provider) {
                            return [2 /*return*/, this.actions.reportError(new NoInfinityWalletError())];
                        }
                        return [2 /*return*/, Promise.all([
                                this.provider.request({ method: 'eth_chainId' }),
                                this.provider.request({ method: 'eth_requestAccounts' }),
                            ])
                                .then(function (_a) {
                                var chainId = _a[0], accounts = _a[1];
                                var receivedChainId = parseChainId(chainId);
                                var desiredChainId = typeof desiredChainIdOrChainParameters === 'number'
                                    ? desiredChainIdOrChainParameters
                                    : desiredChainIdOrChainParameters === null || desiredChainIdOrChainParameters === void 0 ? void 0 : desiredChainIdOrChainParameters.chainId;
                                // if there's no desired chain, or it's equal to the received, update
                                if (!desiredChainId || receivedChainId === desiredChainId)
                                    return _this.actions.update({ chainId: receivedChainId, accounts: accounts });
                                var desiredChainIdHex = "0x".concat(desiredChainId.toString(16));
                                // if we're here, we can try to switch networks
                                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                                return _this.provider.request({
                                    method: 'wallet_switchEthereumChain',
                                    params: [{ chainId: desiredChainIdHex }]
                                })["catch"](function (error) {
                                    if (error.code === 4902 && typeof desiredChainIdOrChainParameters !== 'number') {
                                        // if we're here, we can try to add a new network
                                        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                                        return _this.provider.request({
                                            method: 'wallet_addEthereumChain',
                                            params: [__assign(__assign({}, desiredChainIdOrChainParameters), { chainId: desiredChainIdHex })]
                                        });
                                    }
                                    else {
                                        throw error;
                                    }
                                })
                                    .then(function () { return _this.activate(desiredChainId); });
                            })["catch"](function (error) {
                                _this.actions.reportError(error);
                            })];
                }
            });
        });
    };
    return InfinityWallet;
}(types_1.Connector));
exports.InfinityWallet = InfinityWallet;
