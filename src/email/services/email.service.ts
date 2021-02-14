import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';
import { User } from '../../user/entities/user.entity';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  sendRegistrationEmail(user: User) {
    this.mailerService
      .sendMail({
        to: 'tomekomel@gmail.com',
        subject: 'Activation email from dryinglaundry.com ✔',
        context: {
          code: 'cf1a3f828287',
          username: 'john doe',
        },
      })
      .then((success) => {
        Logger.log(`Email was sent successfully to user ${user.email}`);
      })
      .catch((err) => {
        Logger.error(`Email was not sent to user ${user.email}`, err);
      });
  }
}
