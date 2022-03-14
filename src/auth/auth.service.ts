import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { MailService } from 'src/mail/mail.service';
import axios from 'axios';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findForSignin(email);
    if (user) {
      let correct = await compare(pass, user.password);
      if (correct) {
        return user;
      }
    }
    return null;
  }

  async getUser(payload: any) {
    const user = await this.userService.findAny({ _id: payload.uid });
    // const profilePic: Image = await this.imageService.findProfilePic(payload.uid);
    // if(profilePic){
    //     user.profilePic = `data:image/jpeg;base64,${profilePic.image.toString('base64')}`;
    // }
    return user;
  }

  async sendResetPasswordEmail(email: string) {
    const user = await this.userService.findAny({ email: email });
    if (!user) {
      return { message: "Can't find user" };
    }
    const token: string = await this.userService.generateResetPasswordToken(
      user.email,
    );
    await this.mailService.sendResetPasswordEmail(user, token);
    return { value: true };
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user._id };
    return {
      accessToken: await this.jwtService.signAsync(payload),
      verifyEmail: user.verifyEmail === 1 ? true : false,
      setUsername: user.username === '' ? false : true,
    };
  }

  async validateNontsriAccount(username: string, password: string) {
    const kuApiResponse = await axios.post(
      'https://myapi.ku.th/auth/login',
      {
        username: username,
        password: password,
      },
      {
        headers: { 'app-key': process.env.appKey },
      },
    );
    return kuApiResponse.data.user;
  }

  async signupWithNontsriAccount(username: string, password: string) {
    const user: any = await this.validateNontsriAccount(username, password)
      .then((user) => user)
      .catch(() => undefined);
  }
}
