"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HistorySchema = exports.History = void 0;
var mongoose_1 = require("@nestjs/mongoose");
var History = /** @class */ (function () {
    function History() {
    }
    __decorate([
        mongoose_1.Prop()
    ], History.prototype, "sourceUserId");
    __decorate([
        mongoose_1.Prop()
    ], History.prototype, "targetUserId");
    __decorate([
        mongoose_1.Prop()
    ], History.prototype, "sourceUsername");
    __decorate([
        mongoose_1.Prop()
    ], History.prototype, "targetUsername");
    __decorate([
        mongoose_1.Prop()
    ], History.prototype, "sourceInventoryName");
    __decorate([
        mongoose_1.Prop()
    ], History.prototype, "targetInventoryName");
    __decorate([
        mongoose_1.Prop()
    ], History.prototype, "sourceInventoryPicture");
    __decorate([
        mongoose_1.Prop()
    ], History.prototype, "targetInventoryPicture");
    __decorate([
        mongoose_1.Prop()
    ], History.prototype, "timeStamp");
    History = __decorate([
        mongoose_1.Schema()
    ], History);
    return History;
}());
exports.History = History;
exports.HistorySchema = mongoose_1.SchemaFactory.createForClass(History);
