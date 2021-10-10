import { AuthGuard } from "@nestjs/passport";
import { TokenExpiredError } from "jsonwebtoken";
import { UnauthorizedException } from "@nestjs/common";

export class ResetPasswordGuard extends AuthGuard('resetPassword'){
    handleRequest(err, user, info:Error){
        if (info instanceof TokenExpiredError){
            throw new UnauthorizedException('token expired');
        }
        if(!user){
            throw new UnauthorizedException('reset password Token malformed');
        }
        if(!user.resetPasswordEmail){
            throw new UnauthorizedException('Token malformed');
        }
        return user;
    }
}