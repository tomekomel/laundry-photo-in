import { Injectable } from '@nestjs/common';
import { UserService } from '../../user/services/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validate(name: string, pass: string): Promise<any> {
    const user = await this.userService.findOneByName(name);

    if (user && await user.comparePassword(pass)) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }
}
