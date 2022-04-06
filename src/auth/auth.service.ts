import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { MailService } from 'src/mail/mail.service';
import axios from 'axios';
import { Student, User } from 'src/models/user.model';

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
    const std: Student = await this.validateNontsriAccount(username, password)
      .then((std) => std.student)
      .catch(() => undefined);
    return await this.userService.createStudent(username, password, std);
  }

  async loginWithNontsriAccount(username: string, password: string) {
    if (!username || !password)
      return { msg: 'field is empty', success: false };
    const std: Student = await this.validateNontsriAccount(username, password)
      .then((std) => std.student)
      .catch(() => undefined);
    if (!std) {
      return {
        success: false,
        msg: "Cannot authenticated with my.ku.th"
      }
    }
    const findStudent = await this.userService.findAny({
      isStudent: true,
      studentId: std.stdCode,
    });
    if (!findStudent) {
      const { success, token } = await this.signupWithNontsriAccount(
        username,
        password,
      );
      return {
        success: success,
        DaveTheHornyDuck: token,
        verifyEmail: true,
        setUsername: false,
      };
    }
    return {
      success: true,
      DaveTheHornyDuck: await this.jwtService.signAsync({
        sub: findStudent._id,
      }),
      verifyEmail: findStudent.verifyEmail === 1 ? true : false,
      setUsername: findStudent.username === '' ? false : true,
    };

  }
}
