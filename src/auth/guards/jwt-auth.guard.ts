import { AuthGuard } from "@nestjs/passport";
import { TokenExpiredError } from "jsonwebtoken";
import { UnauthorizedException } from "@nestjs/common";

export class JwtAuthGuard extends AuthGuard('accessToken'){}