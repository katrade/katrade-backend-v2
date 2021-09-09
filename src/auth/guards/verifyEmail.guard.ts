import { AuthGuard } from "@nestjs/passport";
import { TokenExpiredError } from "jsonwebtoken";
import { UnauthorizedException } from "@nestjs/common";

export class VerifyEmailGuard extends AuthGuard('verifyEmailToken'){
    handleRequest(err, user, info:Error){
        if (info instanceof TokenExpiredError){
            throw new UnauthorizedException('token expired');
        }
        if(!user){
            throw new UnauthorizedException('verify email token malformed');
        }
        return user;
    }
}