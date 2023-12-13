import { ExecutionContext, createParamDecorator } from '@nestjs/common';

import { User } from '../entities/user.entity';

export const AuthUser = createParamDecorator((data: string, ctx: ExecutionContext) => {
  const user: User = ctx.switchToHttp().getRequest().user;
  if (!user) return;
  return user;
});
