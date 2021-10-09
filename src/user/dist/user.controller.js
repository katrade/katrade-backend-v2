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
exports.UserController = void 0;
var common_1 = require("@nestjs/common");
var jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
var common_2 = require("@nestjs/common");
var UserController = /** @class */ (function () {
    function UserController(userService, tradeService, inventoryService) {
        this.userService = userService;
        this.tradeService = tradeService;
        this.inventoryService = inventoryService;
    }
    UserController.prototype.findAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userService.findAll()];
                    case 1:
                        user = _a.sent();
                        // let result = await this.UserService.testfuse(user, username);
                        return [2 /*return*/, user];
                }
            });
        });
    };
    UserController.prototype.findUser = function (username) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userService.findUN(username)];
                    case 1:
                        user = _a.sent();
                        // let result = await this.UserService.testfuse(user, username);
                        return [2 /*return*/, user];
                }
            });
        });
    };
    UserController.prototype.findByID = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userService.sBid(id)];
                    case 1:
                        user = _a.sent();
                        return [2 /*return*/, user];
                }
            });
        });
    };
    UserController.prototype.testemail = function (data) {
        return this.userService.sendEmail(data.Email, data.Name);
    };
    UserController.prototype.profilePic = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userService.sBid(userId)];
                    case 1:
                        user = _a.sent();
                        return [2 /*return*/, { profilePic: user.profilePic }];
                }
            });
        });
    };
    UserController.prototype.info = function (req, data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userService.changeInfo(req.user, data)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserController.prototype.getFavourite = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userService.getFavorite(req.user)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    UserController.prototype.pushFavourite = function (req, inventoryId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userService.pushFavourite(req.user.uid, inventoryId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserController.prototype.putFavourite = function (req, inventoryId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userService.pullFavourite(req.user.uid, inventoryId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserController.prototype.setUsername = function (req, newUsername) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userService.setUsername(req.user, newUsername)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserController.prototype.follow = function (req, id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userService.follow(req.user.uid, id)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserController.prototype.unFollow = function (req, id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userService.unFollow(req.user.uid, id)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserController.prototype.checkFollow = function (req, id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userService.checkFollow(req.user.uid, id)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserController.prototype.follower = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userService.getFollow(req.user.uid)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserController.prototype.getFollowById = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userService.getFollow(userId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserController.prototype.getUserFromIdArray = function (idArray) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userService.getUserFromIdArray(idArray)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserController.prototype.uploadFile = function (req, profilePic) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userService.updateProfilePic(req.user.uid, profilePic)];
                    case 1: 
                    // let b64 = file.buffer.toString('base64');
                    // let b6 = Buffer.from(b64, 'base64');
                    // console.log(b6);
                    // return await this.imageService.updateProfilePic(req.user, file.buffer);
                    return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserController.prototype.createRequest = function (req, request) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.tradeService.createRequest(req.user.uid, request)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserController.prototype.getUserRequest = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.tradeService.getUserRequest(req.user.uid)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserController.prototype.getUserPending = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.tradeService.getUserPending(req.user.uid)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserController.prototype.cancelRequest = function (requestId) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.tradeService.cancelRequest(requestId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserController.prototype.acceptRequest = function (requestId) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.tradeService.AcceptRequest(requestId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserController.prototype.getUserProgess = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.tradeService.GetUserProgess(req.user.uid)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserController.prototype.lockRequest = function (requestId, inventoryId) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.tradeService.lockRequestAndInventory(requestId, inventoryId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserController.prototype.cancelLockRequest = function (requestId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.tradeService.cancelLockRequest(requestId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserController.prototype.finishTrade = function (req, requestId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.tradeService.finishTrade(req.user.uid, requestId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserController.prototype.getUserHistory = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.tradeService.findHistory(req.user.uid)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    __decorate([
        common_1.Get('/findAll')
    ], UserController.prototype, "findAll");
    __decorate([
        common_1.Get(),
        __param(0, common_1.Query("username"))
    ], UserController.prototype, "findUser");
    __decorate([
        common_1.Get('/searchID'),
        __param(0, common_1.Query("id"))
    ], UserController.prototype, "findByID");
    __decorate([
        common_1.Get('/sendMail'),
        __param(0, common_1.Body())
    ], UserController.prototype, "testemail");
    __decorate([
        common_1.Get('/profilePic'),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
        __param(0, common_1.Query('id'))
    ], UserController.prototype, "profilePic");
    __decorate([
        common_1.Put('/info'),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
        __param(0, common_1.Req()), __param(1, common_1.Body())
    ], UserController.prototype, "info");
    __decorate([
        common_1.Get('/favourite'),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
        __param(0, common_1.Req())
    ], UserController.prototype, "getFavourite");
    __decorate([
        common_1.Patch('/pushFavourite'),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
        __param(0, common_1.Req()), __param(1, common_1.Body('id'))
    ], UserController.prototype, "pushFavourite");
    __decorate([
        common_1.Patch('/pullFavourite'),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
        __param(0, common_1.Req()), __param(1, common_1.Body('id'))
    ], UserController.prototype, "putFavourite");
    __decorate([
        common_1.Put('/setUsername'),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
        __param(0, common_1.Req()), __param(1, common_1.Query('newUsername'))
    ], UserController.prototype, "setUsername");
    __decorate([
        common_2.Post('/follow'),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
        __param(0, common_1.Req()), __param(1, common_1.Body('id'))
    ], UserController.prototype, "follow");
    __decorate([
        common_2.Post('/unFollow'),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
        __param(0, common_1.Req()), __param(1, common_1.Body('id'))
    ], UserController.prototype, "unFollow");
    __decorate([
        common_1.Get('/checkFollow'),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
        __param(0, common_1.Req()), __param(1, common_1.Query('id'))
    ], UserController.prototype, "checkFollow");
    __decorate([
        common_1.Get('/follow'),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
        __param(0, common_1.Req())
    ], UserController.prototype, "follower");
    __decorate([
        common_1.Get('/getFollowById'),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
        __param(0, common_1.Query('id'))
    ], UserController.prototype, "getFollowById");
    __decorate([
        common_2.Post('/getUserFromIdArray'),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
        __param(0, common_1.Body('data'))
    ], UserController.prototype, "getUserFromIdArray");
    __decorate([
        common_2.Post('/updateProfilePic'),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
        __param(0, common_1.Req()), __param(1, common_1.Body('profilePic'))
    ], UserController.prototype, "uploadFile");
    __decorate([
        common_2.Post('/newRequest'),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
        __param(0, common_1.Req()), __param(1, common_1.Body())
    ], UserController.prototype, "createRequest");
    __decorate([
        common_1.Get('getUserRequest'),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
        __param(0, common_1.Req())
    ], UserController.prototype, "getUserRequest");
    __decorate([
        common_1.Get('/getUserPending'),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
        __param(0, common_1.Req())
    ], UserController.prototype, "getUserPending");
    __decorate([
        common_1.Delete('/cancelRequest'),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
        __param(0, common_1.Query('id'))
    ], UserController.prototype, "cancelRequest");
    __decorate([
        common_1.Patch('/acceptRequest'),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
        __param(0, common_1.Body('id'))
    ], UserController.prototype, "acceptRequest");
    __decorate([
        common_1.Get('/getUserProgess'),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
        __param(0, common_1.Req())
    ], UserController.prototype, "getUserProgess");
    __decorate([
        common_1.Patch('/lockRequest'),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
        __param(0, common_1.Body('id')), __param(1, common_1.Body('inventoryId'))
    ], UserController.prototype, "lockRequest");
    __decorate([
        common_1.Patch('/cancelLockRequest'),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
        __param(0, common_1.Body('id'))
    ], UserController.prototype, "cancelLockRequest");
    __decorate([
        common_2.Post('/finishTrade'),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
        __param(0, common_1.Req()), __param(1, common_1.Body('requestId'))
    ], UserController.prototype, "finishTrade");
    __decorate([
        common_1.Get('/getUserHistory'),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
        __param(0, common_1.Req())
    ], UserController.prototype, "getUserHistory");
    UserController = __decorate([
        common_1.Controller('user')
    ], UserController);
    return UserController;
}());
exports.UserController = UserController;
