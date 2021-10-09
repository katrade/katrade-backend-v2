"use strict";
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
exports.InventoryService = void 0;
var common_1 = require("@nestjs/common");
var mongoose_1 = require("@nestjs/mongoose");
var Fuse = require('fuse.js');
var InventoryService = /** @class */ (function () {
    function InventoryService(inventoryModel, userModel, tradeService) {
        this.inventoryModel = inventoryModel;
        this.userModel = userModel;
        this.tradeService = tradeService;
    }
    InventoryService.prototype.getInventoryByIdArray = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var inventoryArray;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.inventoryModel.find({ _id: { $in: id } })];
                    case 1:
                        inventoryArray = _a.sent();
                        return [2 /*return*/, inventoryArray];
                }
            });
        });
    };
    InventoryService.prototype.findInventoryByUserId = function (uid) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.inventoryModel.find({ owner: uid, lock: 0 })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    InventoryService.prototype.findInventoryById = function (inventoryId) {
        return __awaiter(this, void 0, Promise, function () {
            var i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.inventoryModel.findOne({ _id: inventoryId })];
                    case 1:
                        i = _a.sent();
                        // let user:User = await this.userModel.findOne({_id: i.owner});
                        // if(!i){
                        //     return {message: "Can't find this inventory"};
                        // }
                        // i.pictures = await this.imageService.findAndChangeToBase64Array(i.pictures);
                        return [2 /*return*/, i];
                }
            });
        });
    };
    InventoryService.prototype.getAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var inventory;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.inventoryModel.find({ lock: 0 })];
                    case 1:
                        inventory = _a.sent();
                        return [2 /*return*/, inventory];
                }
            });
        });
    };
    InventoryService.prototype.getUserInventory = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var allUserInventory;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.inventoryModel.find({ owner: userId })];
                    case 1:
                        allUserInventory = _a.sent();
                        return [2 /*return*/, allUserInventory];
                }
            });
        });
    };
    // async getUserInventory(userId: string){
    //     let allUserInventory:Inventory[] = await this.inventoryModel.find({owner: userId});
    //     if(!allUserInventory[0]){
    //         return [];
    //     }
    //     return await this.imageService.changeInventoryOneImageArrayToBase64(allUserInventory);
    // }
    InventoryService.prototype.deleteInventoryById = function (uid, id) {
        return __awaiter(this, void 0, void 0, function () {
            var user, requestArray, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userModel.findOne({ _id: uid })];
                    case 1:
                        user = _a.sent();
                        if (!user.inventories.includes(id)) {
                            return [2 /*return*/, { message: "It's not your thing" }];
                        }
                        return [4 /*yield*/, this.userModel.updateOne({ _id: uid }, { $pull: { inventories: id } })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.inventoryModel.deleteOne({ _id: id })];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.tradeService.findRequestByInventoryId(id)];
                    case 4:
                        requestArray = _a.sent();
                        i = 0;
                        _a.label = 5;
                    case 5:
                        if (!(i < requestArray.length)) return [3 /*break*/, 8];
                        return [4 /*yield*/, this.tradeService.cancelRequest(requestArray[i]._id)];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7:
                        i++;
                        return [3 /*break*/, 5];
                    case 8: return [2 /*return*/, { value: true }];
                }
            });
        });
    };
    InventoryService.prototype.newInv = function (payload, thing) {
        return __awaiter(this, void 0, Promise, function () {
            var user, newThing, tmp;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userModel.findOne({ _id: payload.uid })];
                    case 1:
                        user = _a.sent();
                        newThing = new this.inventoryModel(__assign({ username: user.username, owner: payload.uid, lock: 0, timeStamp: new Date() }, thing));
                        return [4 /*yield*/, this.inventoryModel.create(newThing).then(function (response) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            tmp = response;
                                            return [4 /*yield*/, this.userModel.updateOne({ _id: payload.uid }, { $push: { inventories: [response._id.toString()] } }).then(function () {
                                                    console.log("Already push in " + payload.uid);
                                                })];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, { id: newThing._id.toString() }];
                }
            });
        });
    };
    InventoryService.prototype.changeInventoryPic = function (id, pictures) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.inventoryModel.updateOne({ _id: id }, { $set: { pictures: pictures } })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, { value: true }];
                }
            });
        });
    };
    InventoryService.prototype.searchInventory = function (uid, query) {
        return __awaiter(this, void 0, void 0, function () {
            var list, options, fuse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.inventoryModel.find({ owner: { $ne: uid }, lock: 0 })];
                    case 1:
                        list = _a.sent();
                        options = {
                            includeScore: true,
                            threshold: 0.2,
                            minMatchCharLength: 3,
                            keys: [
                                {
                                    name: 'detail',
                                    weight: 0.1
                                },
                                {
                                    name: 'name',
                                    weight: 0.9
                                }
                            ]
                        };
                        fuse = new Fuse(list, options);
                        return [4 /*yield*/, fuse.search(query)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    InventoryService = __decorate([
        common_1.Injectable(),
        __param(0, mongoose_1.InjectModel('Inventory')),
        __param(1, mongoose_1.InjectModel('User'))
    ], InventoryService);
    return InventoryService;
}());
exports.InventoryService = InventoryService;
