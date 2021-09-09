// import { MailerModule } from '@nestjs-modules/mailer';
// import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
// import { Module } from '@nestjs/common';
// import { MailService } from './mail.service';
// import * as path from 'path';
// require('dotenv').config();

// @Module({
//   imports: [MailerModule.forRoot({
//     transport: {
//       host: 'smtp.gmail.com',
//       port: 465,
//       ignoreTLS: true,
//       secure: true,
//       auth: {
//         user: process.env.Email,
//         pass: process.env.Password,
//       },
//     },
//     defaults: {
//       from: '"No Reply" <no-reply@localhost>',
//     },
//     preview: true,
//     template: {
//       dir: path.resolve(__dirname, './templates'),
//       adapter: new HandlebarsAdapter(),
//       options: {
//         strict: true,
//       },
//     },
//   })],
//   providers: [MailService],
//   exports: [MailService],
// })
// export class MailModule {}
