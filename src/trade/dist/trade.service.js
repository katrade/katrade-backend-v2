"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
exports.TradeService = void 0;
var common_1 = require("@nestjs/common");
var mongoose_1 = require("@nestjs/mongoose");
var TradeService = /** @class */ (function () {
    function TradeService(historyModel, requestModel, userModel, inventoryModel) {
        this.historyModel = historyModel;
        this.requestModel = requestModel;
        this.userModel = userModel;
        this.inventoryModel = inventoryModel;
    }
    TradeService.prototype.createRequest = function (uid, request) {
        return __awaiter(this, void 0, void 0, function () {
            var inventory1, inventory2, oldRequest, newRequest, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.inventoryModel.findOne({ _id: request.sourceInventoryId })];
                    case 1:
                        inventory1 = _a.sent();
                        return [4 /*yield*/, this.inventoryModel.findOne({ _id: request.targetInventoryId })];
                    case 2:
                        inventory2 = _a.sent();
                        if (!inventory1 || !inventory2) {
                            return [2 /*return*/, { message: "Inventory has been deleted" }];
                        }
                        if (inventory1 && inventory2) {
                            if (inventory1.owner !== uid && inventory2.owner !== request.targetUserId) {
                                return [2 /*return*/, { message: "mai chai kong meung tang kuu" }];
                            }
                        }
                        if (inventory1) {
                            if (inventory1.owner !== uid) {
                                return [2 /*return*/, { message: "mai chai kong user1" }];
                            }
                            else if (inventory1.lock === 1) {
                                return [2 /*return*/, { message: "sourceInventory lock" }];
                            }
                        }
                        if (inventory2) {
                            if (inventory2.owner !== request.targetUserId.toString()) {
                                return [2 /*return*/, { message: "mai chai kong user2" }];
                            }
                            else if (inventory2.lock === 1) {
                                return [2 /*return*/, { message: "targetInventory lock" }];
                            }
                        }
                        return [4 /*yield*/, this.requestModel.findOne({ sourceInventoryId: request.sourceInventoryId.toString(), targetInventoryId: request.targetInventoryId.toString() })];
                    case 3:
                        oldRequest = _a.sent();
                        if (oldRequest) {
                            return [2 /*return*/, { value: false }];
                        }
                        newRequest = {
                            sourceUserId: uid,
                            timeStamp: new Date(),
                            targetUserId: request.targetUserId.toString(),
                            sourceInventoryId: request.sourceInventoryId.toString(),
                            targetInventoryId: request.targetInventoryId.toString(),
                            sourceUserConfirm: 0,
                            targetUserConfirm: 0,
                            sourceUserFinish: 0,
                            targetUserFinish: 0,
                            state: 0
                        };
                        return [4 /*yield*/, this.requestModel.create(newRequest)];
                    case 4:
                        result = _a.sent();
                        return [4 /*yield*/, this.userModel.updateOne({ _id: request.targetUserId }, { $push: { requestInbox: [result._id.toString()] } })];
                    case 5:
                        _a.sent();
                        return [2 /*return*/, { value: result ? true : false }];
                }
            });
        });
    };
    TradeService.prototype.getUserRequest = function (uid) {
        return __awaiter(this, void 0, void 0, function () {
            var request, result, i, i1, i2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.requestModel.find({ targetUserId: uid, state: 0 })];
                    case 1:
                        request = _a.sent();
                        result = [];
                        i = 0;
                        _a.label = 2;
                    case 2:
                        if (!(i < request.length)) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.inventoryModel.findOne({ _id: request[i].sourceInventoryId })];
                    case 3:
                        i1 = _a.sent();
                        return [4 /*yield*/, this.inventoryModel.findOne({ _id: request[i].targetInventoryId })];
                    case 4:
                        i2 = _a.sent();
                        result.push({
                            requestId: request[i]._id.toString(),
                            sourceInventory: i1,
                            targetInventory: i2,
                            ownerInventoryId: i2._id,
                            state: request[i].state,
                            timeStamp: new Date(request[i].timeStamp.toString()).toLocaleString("en-US", { timeZone: "Asia/Jakarta" })
                        });
                        _a.label = 5;
                    case 5:
                        i++;
                        return [3 /*break*/, 2];
                    case 6: return [2 /*return*/, result];
                }
            });
        });
    };
    TradeService.prototype.getUserPending = function (uid) {
        return __awaiter(this, void 0, void 0, function () {
            var request, result, i, i1, i2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.requestModel.find({ sourceUserId: uid, state: 0 })];
                    case 1:
                        request = _a.sent();
                        result = [];
                        i = 0;
                        _a.label = 2;
                    case 2:
                        if (!(i < request.length)) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.inventoryModel.findOne({ _id: request[i].sourceInventoryId })];
                    case 3:
                        i1 = _a.sent();
                        return [4 /*yield*/, this.inventoryModel.findOne({ _id: request[i].targetInventoryId })];
                    case 4:
                        i2 = _a.sent();
                        result.push({
                            requestId: request[i]._id.toString(),
                            sourceInventory: i1,
                            targetInventory: i2,
                            ownerInventoryId: i1._id,
                            state: request[i].state,
                            timeStamp: new Date(request[i].timeStamp.toString()).toLocaleString("en-US", { timeZone: "Asia/Jakarta" })
                        });
                        _a.label = 5;
                    case 5:
                        i++;
                        return [3 /*break*/, 2];
                    case 6: return [2 /*return*/, result];
                }
            });
        });
    };
    TradeService.prototype.cancelRequest = function (requestId) {
        return __awaiter(this, void 0, void 0, function () {
            var request;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.requestModel.findOne({ _id: requestId })];
                    case 1:
                        request = _a.sent();
                        if (!request) {
                            return [2 /*return*/, { message: "Can't find this request" }];
                        }
                        return [4 /*yield*/, this.userModel.updateOne({ _id: request.targetUserId }, { $pull: { requestInbox: requestId } })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.requestModel.deleteOne({ _id: requestId })];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, { value: true }];
                }
            });
        });
    };
    TradeService.prototype.findRequestByInventoryId = function (inventoryId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.requestModel.find({ $or: [{ sourceInventoryId: inventoryId }, { targetInventoryId: inventoryId }] })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    TradeService.prototype.lockInventory = function (inventoryId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.inventoryModel.updateOne({ _id: inventoryId }, { $set: { lock: 1 } })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    };
    TradeService.prototype.findRequestByInventory2Id = function (inventoryId1, inventoryId2) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.requestModel.find({ $or: [{ sourceInventoryId: inventoryId1 }, { targetInventoryId: inventoryId1 }, { sourceInventoryId: inventoryId2 }, { targetInventoryId: inventoryId2 }] })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    TradeService.prototype.lockRequestAndInventory = function (requestId, inventoryId) {
        return __awaiter(this, void 0, void 0, function () {
            var request, sourceInventory, targetInventory, request2, requests, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.requestModel.findOne({ _id: requestId })];
                    case 1:
                        request = _a.sent();
                        return [4 /*yield*/, this.inventoryModel.findOne({ _id: request.sourceInventoryId })];
                    case 2:
                        sourceInventory = _a.sent();
                        return [4 /*yield*/, this.inventoryModel.findOne({ _id: request.targetInventoryId })];
                    case 3:
                        targetInventory = _a.sent();
                        if (!request) {
                            return [2 /*return*/, { message: "Can't find this request" }];
                        }
                        else if (sourceInventory.lock === 1 || targetInventory.lock === 1) {
                            return [2 /*return*/, { message: "Inventory has been locked" }];
                        }
                        if (!(request.sourceInventoryId === inventoryId.toString())) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.requestModel.updateOne({ _id: requestId }, { $set: { sourceUserConfirm: 1 } })];
                    case 4:
                        _a.sent();
                        request.sourceUserConfirm = 1;
                        return [3 /*break*/, 7];
                    case 5:
                        if (!(request.targetInventoryId === inventoryId.toString())) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.requestModel.updateOne({ _id: requestId }, { $set: { targetUserConfirm: 1 } })];
                    case 6:
                        _a.sent();
                        request.targetUserConfirm = 1;
                        _a.label = 7;
                    case 7: return [4 /*yield*/, this.requestModel.findOne({ _id: requestId })];
                    case 8:
                        request2 = _a.sent();
                        if (!(request2.sourceUserConfirm === 1 && request2.targetUserConfirm === 1)) return [3 /*break*/, 17];
                        return [4 /*yield*/, this.requestModel.updateOne({ _id: requestId }, { $set: { state: 2 } })];
                    case 9:
                        _a.sent();
                        return [4 /*yield*/, this.lockInventory(request.sourceInventoryId)];
                    case 10:
                        _a.sent();
                        return [4 /*yield*/, this.lockInventory(request.targetInventoryId)];
                    case 11:
                        _a.sent();
                        return [4 /*yield*/, this.findRequestByInventory2Id(request.sourceInventoryId, request.targetInventoryId)];
                    case 12:
                        requests = _a.sent();
                        i = 0;
                        _a.label = 13;
                    case 13:
                        if (!(i < requests.length)) return [3 /*break*/, 16];
                        if (requests[i].sourceInventoryId === request.sourceInventoryId && requests[i].targetInventoryId === request.targetInventoryId) {
                            return [3 /*break*/, 15];
                        }
                        return [4 /*yield*/, this.cancelRequest(requests[i]._id)];
                    case 14:
                        _a.sent();
                        _a.label = 15;
                    case 15:
                        i++;
                        return [3 /*break*/, 13];
                    case 16: return [2 /*return*/, { message: "lock" }];
                    case 17: return [2 /*return*/, { message: "update userConfirm" }];
                }
            });
        });
    };
    TradeService.prototype.cancelLockRequest = function (requestId) {
        return __awaiter(this, void 0, void 0, function () {
            var request;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.requestModel.findOne({ _id: requestId })];
                    case 1:
                        request = _a.sent();
                        if (request.state !== 2) {
                            return [2 /*return*/, { value: false }];
                        }
                        return [4 /*yield*/, this.inventoryModel.updateOne({ _id: request.sourceInventoryId }, { $set: { lock: 0 } })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.inventoryModel.updateOne({ _id: request.targetInventoryId }, { $set: { lock: 0 } })];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.cancelRequest(requestId)];
                    case 4: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    TradeService.prototype.AcceptRequest = function (requestId) {
        return __awaiter(this, void 0, void 0, function () {
            var request;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.requestModel.findOne({ _id: requestId })];
                    case 1:
                        request = _a.sent();
                        if (!request) {
                            return [2 /*return*/, { message: "Can't find request" }];
                        }
                        return [4 /*yield*/, this.requestModel.updateOne({ _id: requestId }, { $set: { state: 1 } })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, { value: true }];
                }
            });
        });
    };
    TradeService.prototype.GetUserProgess = function (uid) {
        return __awaiter(this, void 0, void 0, function () {
            var requestArray, result, i, inventory1, inventory2, tmp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.requestModel.find({ $or: [{ sourceUserId: uid }, { targetUserId: uid }], state: { $in: [1, 2] } })];
                    case 1:
                        requestArray = _a.sent();
                        console.log(requestArray);
                        result = [];
                        i = 0;
                        _a.label = 2;
                    case 2:
                        if (!(i < requestArray.length)) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.inventoryModel.findOne({ _id: requestArray[i].sourceInventoryId })];
                    case 3:
                        inventory1 = _a.sent();
                        return [4 /*yield*/, this.inventoryModel.findOne({ _id: requestArray[i].targetInventoryId })];
                    case 4:
                        inventory2 = _a.sent();
                        tmp = void 0;
                        if (inventory1.owner === uid) {
                            tmp = inventory1._id;
                        }
                        else {
                            tmp = inventory2._id;
                        }
                        result.push({
                            requestId: requestArray[i]._id.toString(),
                            sourceInventory: inventory1,
                            targetInventory: inventory2,
                            ownerInventoryId: tmp,
                            state: requestArray[i].state,
                            timeStamp: new Date(requestArray[i].timeStamp.toString()).toLocaleString("en-US", { timeZone: "Asia/Jakarta" })
                        });
                        _a.label = 5;
                    case 5:
                        i++;
                        return [3 /*break*/, 2];
                    case 6: return [2 /*return*/, result];
                }
            });
        });
    };
    TradeService.prototype.finishTrade = function (uid, requestId) {
        return __awaiter(this, void 0, void 0, function () {
            var request, sourceInventory, targetInventory, request2, sourceUser, targetUser, newHistory;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.requestModel.findOne({ _id: requestId })];
                    case 1:
                        request = _a.sent();
                        if (!request) {
                            return [2 /*return*/, { message: "Can't find this request" }];
                        }
                        return [4 /*yield*/, this.inventoryModel.findOne({ _id: request.sourceInventoryId })];
                    case 2:
                        sourceInventory = _a.sent();
                        return [4 /*yield*/, this.inventoryModel.findOne({ _id: request.targetInventoryId })];
                    case 3:
                        targetInventory = _a.sent();
                        if (!(request.sourceUserId === uid)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.requestModel.updateOne({ _id: requestId }, { $set: { sourceUserFinish: 1 } })];
                    case 4:
                        _a.sent();
                        request.sourceUserConfirm = 1;
                        return [3 /*break*/, 7];
                    case 5:
                        if (!(request.targetUserId === uid)) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.requestModel.updateOne({ _id: requestId }, { $set: { targetUserFinish: 1 } })];
                    case 6:
                        _a.sent();
                        request.targetUserConfirm = 1;
                        _a.label = 7;
                    case 7: return [4 /*yield*/, this.requestModel.findOne({ _id: requestId })];
                    case 8:
                        request2 = _a.sent();
                        if (!(request2.sourceUserFinish === 1 && request2.targetUserFinish === 1)) return [3 /*break*/, 17];
                        return [4 /*yield*/, this.userModel.findOne({ _id: request2.sourceUserId })];
                    case 9:
                        sourceUser = _a.sent();
                        return [4 /*yield*/, this.userModel.findOne({ _id: request2.targetUserId })];
                    case 10:
                        targetUser = _a.sent();
                        newHistory = new this.historyModel({
                            sourceUserId: sourceUser._id,
                            targetUserId: targetUser._id,
                            sourceUsername: sourceUser.username,
                            targetUsername: targetUser.username,
                            sourceInventoryName: sourceInventory.name,
                            targetInventoryName: targetInventory.name,
                            sourceInventoryPicture: sourceInventory.pictures[0],
                            targetInventoryPicture: targetInventory.pictures[0],
                            timeStamp: new Date()
                        });
                        return [4 /*yield*/, newHistory.save()];
                    case 11:
                        _a.sent();
                        return [4 /*yield*/, this.cancelRequest(requestId)];
                    case 12:
                        _a.sent();
                        return [4 /*yield*/, this.userModel.updateOne({ _id: sourceUser._id }, { $pull: { inventories: [sourceInventory._id] } })];
                    case 13:
                        _a.sent();
                        return [4 /*yield*/, this.inventoryModel.deleteOne({ _id: sourceInventory._id })];
                    case 14:
                        _a.sent();
                        return [4 /*yield*/, this.userModel.updateOne({ _id: targetUser._id }, { $pull: { inventories: [targetInventory._id] } })];
                    case 15:
                        _a.sent();
                        return [4 /*yield*/, this.inventoryModel.deleteOne({ _id: targetInventory._id })];
                    case 16:
                        _a.sent();
                        return [2 /*return*/, { message: "Finish Trade" }];
                    case 17: return [2 /*return*/, { message: "update userFinish" }];
                }
            });
        });
    };
    TradeService.prototype.findHistory = function (uid) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.historyModel.find({ $or: [{ sourceUserId: uid }, { targetUserId: uid }] })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    TradeService = __decorate([
        common_1.Injectable(),
        __param(0, mongoose_1.InjectModel('History')),
        __param(1, mongoose_1.InjectModel('Request')),
        __param(2, mongoose_1.InjectModel('User')),
        __param(3, mongoose_1.InjectModel('Inventory'))
    ], TradeService);
    return TradeService;
}());
exports.TradeService = TradeService;
