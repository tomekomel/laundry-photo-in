import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';
import { User } from '../../user/entities/user.entity';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  sendRegistrationEmail(user: User) {
    this.mailerService
      .sendMail({
        to: user.email,
        subject: 'Activation email from dryinglaundry.art ✔',
        context: {
          activationLink: `${process.env.DOMAIN}/auth/${user.uuid}/activate`,
          userName: user.name,
        },
        template: 'register',
      })
      .then((success) => {
        Logger.log(`Email was sent successfully to user ${user.email}`);
      })
      .catch((err) => {
        Logger.error(`Email was not sent to user ${user.email}`, err);
      });
  }
}
