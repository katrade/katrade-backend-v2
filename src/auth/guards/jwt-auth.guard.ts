import { AuthGuard } from "@nestjs/passport";
import { TokenExpiredError } from "jsonwebtoken";
import { UnauthorizedException } from "@nestjs/common";

export class JwtAuthGuard extends AuthGuard('accessToken'){
    handleRequest(err, user, info:Error){
        if (info instanceof TokenExpiredError){
            throw new UnauthorizedException('token expired');
        }
        return user;
    }
}