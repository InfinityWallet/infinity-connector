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
exports.InfinityWalletConnector = exports.UserRejectedRequestError = exports.NoEthereumProviderError = void 0;
var abstract_connector_1 = require("@web3-react/abstract-connector");
var tiny_warning_1 = require("tiny-warning");
function parseSendReturn(sendReturn) {
    return sendReturn.hasOwnProperty('result') ? sendReturn.result : sendReturn;
}
var __DEV__ = false;
var NoEthereumProviderError = /** @class */ (function (_super) {
    __extends(NoEthereumProviderError, _super);
    function NoEthereumProviderError() {
        var _this = _super.call(this) || this;
        _this.name = _this.constructor.name;
        _this.message = 'No Ethereum provider was found on window.ethereum.';
        return _this;
    }
    return NoEthereumProviderError;
}(Error));
exports.NoEthereumProviderError = NoEthereumProviderError;
var UserRejectedRequestError = /** @class */ (function (_super) {
    __extends(UserRejectedRequestError, _super);
    function UserRejectedRequestError() {
        var _this = _super.call(this) || this;
        _this.name = _this.constructor.name;
        _this.message = 'The user rejected the request.';
        return _this;
    }
    return UserRejectedRequestError;
}(Error));
exports.UserRejectedRequestError = UserRejectedRequestError;
var InfinityWalletConnector = /** @class */ (function (_super) {
    __extends(InfinityWalletConnector, _super);
    function InfinityWalletConnector(kwargs) {
        var _this = _super.call(this, kwargs) || this;
        _this.isInfinityWallet = true;
        _this.handleNetworkChanged = _this.handleNetworkChanged.bind(_this);
        _this.handleChainChanged = _this.handleChainChanged.bind(_this);
        _this.handleAccountsChanged = _this.handleAccountsChanged.bind(_this);
        _this.handleClose = _this.handleClose.bind(_this);
        return _this;
    }
    InfinityWalletConnector.prototype.handleChainChanged = function (chainId) {
        if (__DEV__) {
            console.log("Handling 'chainChanged' event with payload", chainId);
        }
        this.emitUpdate({ chainId: chainId, provider: window.ethereum });
    };
    InfinityWalletConnector.prototype.handleAccountsChanged = function (accounts) {
        if (__DEV__) {
            console.log("Handling 'accountsChanged' event with payload", accounts);
        }
        if (accounts.length === 0) {
            this.emitDeactivate();
        }
        else {
            this.emitUpdate({ account: accounts[0] });
        }
    };
    InfinityWalletConnector.prototype.handleClose = function (code, reason) {
        if (__DEV__) {
            console.log("Handling 'close' event with payload", code, reason);
        }
        this.emitDeactivate();
    };
    InfinityWalletConnector.prototype.handleNetworkChanged = function (networkId) {
        if (__DEV__) {
            console.log("Handling 'networkChanged' event with payload", networkId);
        }
        this.emitUpdate({ chainId: networkId, provider: window.ethereum });
    };
    InfinityWalletConnector.prototype.activate = function () {
        return __awaiter(this, void 0, void 0, function () {
            var account, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!window.ethereum) {
                            throw new NoEthereumProviderError();
                        }
                        if (window.ethereum.on) {
                            window.ethereum.on('chainChanged', this.handleChainChanged);
                            window.ethereum.on('accountsChanged', this.handleAccountsChanged);
                            window.ethereum.on('close', this.handleClose);
                            window.ethereum.on('networkChanged', this.handleNetworkChanged);
                        }
                        if (window.ethereum.isInfinityWallet) {
                            ;
                            window.ethereum.autoRefreshOnNetworkChange = false;
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, window.ethereum.send('eth_requestAccounts').then(function (sendReturn) { return parseSendReturn(sendReturn)[0]; })];
                    case 2:
                        account = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        if (error_1.code === 4001) {
                            throw new UserRejectedRequestError();
                        }
                        (0, tiny_warning_1["default"])(false, 'eth_requestAccounts was unsuccessful, falling back to enable');
                        return [3 /*break*/, 4];
                    case 4:
                        if (!!account) return [3 /*break*/, 6];
                        return [4 /*yield*/, window.ethereum.enable().then(function (sendReturn) { return sendReturn && parseSendReturn(sendReturn)[0]; })];
                    case 5:
                        // if enable is successful but doesn't return accounts, fall back to getAccount (not happy i have to do this...)
                        account = _a.sent();
                        _a.label = 6;
                    case 6: return [2 /*return*/, __assign({ provider: window.ethereum }, (account ? { account: account } : {}))];
                }
            });
        });
    };
    InfinityWalletConnector.prototype.getProvider = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, window.ethereum];
            });
        });
    };
    InfinityWalletConnector.prototype.getChainId = function () {
        return __awaiter(this, void 0, void 0, function () {
            var chainId, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!window.ethereum) {
                            throw new NoEthereumProviderError();
                        }
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, window.ethereum.send('eth_chainId').then(parseSendReturn)];
                    case 2:
                        chainId = _c.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        _a = _c.sent();
                        (0, tiny_warning_1["default"])(false, 'eth_chainId was unsuccessful, falling back to net_version');
                        return [3 /*break*/, 4];
                    case 4:
                        if (!!chainId) return [3 /*break*/, 8];
                        _c.label = 5;
                    case 5:
                        _c.trys.push([5, 7, , 8]);
                        return [4 /*yield*/, window.ethereum.send('net_version').then(parseSendReturn)];
                    case 6:
                        chainId = _c.sent();
                        return [3 /*break*/, 8];
                    case 7:
                        _b = _c.sent();
                        (0, tiny_warning_1["default"])(false, 'net_version was unsuccessful, falling back to net version v2');
                        return [3 /*break*/, 8];
                    case 8:
                        if (!chainId) {
                            try {
                                chainId = parseSendReturn(window.ethereum.send({ method: 'net_version' }));
                            }
                            catch (_d) {
                                (0, tiny_warning_1["default"])(false, 'net_version v2 was unsuccessful, falling back to manual matches and static properties');
                            }
                        }
                        if (!chainId) {
                            if (window.ethereum.isDapper) {
                                chainId = parseSendReturn(window.ethereum.cachedResults.net_version);
                            }
                            else {
                                chainId =
                                    window.ethereum.chainId ||
                                        window.ethereum.netVersion ||
                                        window.ethereum.networkVersion ||
                                        window.ethereum._chainId;
                            }
                        }
                        return [2 /*return*/, chainId];
                }
            });
        });
    };
    InfinityWalletConnector.prototype.getAccount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var account, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!window.ethereum) {
                            throw new NoEthereumProviderError();
                        }
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, window.ethereum.send('eth_accounts').then(function (sendReturn) { return parseSendReturn(sendReturn)[0]; })];
                    case 2:
                        account = _c.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        _a = _c.sent();
                        (0, tiny_warning_1["default"])(false, 'eth_accounts was unsuccessful, falling back to enable');
                        return [3 /*break*/, 4];
                    case 4:
                        if (!!account) return [3 /*break*/, 8];
                        _c.label = 5;
                    case 5:
                        _c.trys.push([5, 7, , 8]);
                        return [4 /*yield*/, window.ethereum.enable().then(function (sendReturn) { return parseSendReturn(sendReturn)[0]; })];
                    case 6:
                        account = _c.sent();
                        return [3 /*break*/, 8];
                    case 7:
                        _b = _c.sent();
                        (0, tiny_warning_1["default"])(false, 'enable was unsuccessful, falling back to eth_accounts v2');
                        return [3 /*break*/, 8];
                    case 8:
                        if (!account) {
                            account = parseSendReturn(window.ethereum.send({ method: 'eth_accounts' }))[0];
                        }
                        return [2 /*return*/, account];
                }
            });
        });
    };
    InfinityWalletConnector.prototype.deactivate = function () {
        if (window.ethereum && window.ethereum.removeListener) {
            window.ethereum.removeListener('chainChanged', this.handleChainChanged);
            window.ethereum.removeListener('accountsChanged', this.handleAccountsChanged);
            window.ethereum.removeListener('close', this.handleClose);
            window.ethereum.removeListener('networkChanged', this.handleNetworkChanged);
        }
    };
    InfinityWalletConnector.prototype.isAuthorized = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!window.ethereum) {
                            return [2 /*return*/, false];
                        }
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, window.ethereum.send('eth_accounts').then(function (sendReturn) {
                                if (parseSendReturn(sendReturn).length > 0) {
                                    return true;
                                }
                                else {
                                    return false;
                                }
                            })];
                    case 2: return [2 /*return*/, _b.sent()];
                    case 3:
                        _a = _b.sent();
                        return [2 /*return*/, false];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return InfinityWalletConnector;
}(abstract_connector_1.AbstractConnector));
exports.InfinityWalletConnector = InfinityWalletConnector;
