import { AuthGuard } from '@nestjs/passport';

export class MyAuthGuard extends AuthGuard(['jwt', 'google']) {}
