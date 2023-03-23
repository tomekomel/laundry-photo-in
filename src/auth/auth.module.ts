import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './controllers/auth.controller';
import { SessionSerializer } from './serializers/session.serializer';

@Module({
  providers: [AuthService, LocalStrategy, SessionSerializer],
  imports: [UserModule, PassportModule],
  controllers: [AuthController],
})
export class AuthModule {}
