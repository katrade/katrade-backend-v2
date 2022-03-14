import { Data } from 'ejs';
import * as mongoose from 'mongoose';

export const userSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  username: String,
  password: String,
  address: String,
  email: String,
  phoneNumber: String,
  profilePic: String,
  verifyEmail: Number,
  favourite: [],
  inventories: [],
  requestInbox: [],
  userContacts: [
    {
      userIdContact: String,
      userNameContact: String,
    },
  ],
  student: {
    loginName: String,
    stdCode: String, // stdId
    titleTh: String,
    titleEn: String,
    firstNameTh: String,
    middleNameTh: String,
    lastNameTh: String,
    firstNameEn: String,
    middleNameEn: String,
    lastNameEn: String,
    campusCode: String,
    campusNameTh: String,
    campusNameEn: String,
    facultyCode: String,
    facultyNameTh: String,
    facultyNameEn: String,
    departmentCode: String,
    departmentNameTh: String,
    departmentNameEn: String,
    majorCode: String,
    majorNameTh: String,
    majorNameEn: String,
    nationCode: String,
    nationalityNameTh: String,
    nationalityNameEn: String,
    studentStatusCode: String,
    studentStatusNameTh: String,
    studentStatusNameEn: String,
    studentTypeCode: String,
    studentTypeNameTh: String,
    studentTypeNameEn: String,
    edulevelNameTh: String,
    edulevelNameEn: String,
    studentYear: String,
    email: String,
    mobileNo: String,
  },
});

export interface userContactdata {
  userIdContact: string;
  userNameContact: string;
}

interface Student {
  loginName: string;
  stdCode: string; // stdId
  titleTh: string;
  titleEn: string;
  firstNameTh: string;
  middleNameTh: string | null;
  lastNameTh: string;
  firstNameEn: string;
  middleNameEn: string | null;
  lastNameEn: string;
  campusCode: string;
  campusNameTh: string;
  campusNameEn: string;
  facultyCode: string;
  facultyNameTh: string;
  facultyNameEn: string;
  departmentCode: string;
  departmentNameTh: string;
  departmentNameEn: string;
  majorCode: string;
  majorNameTh: string;
  majorNameEn: string;
  nationCode: string;
  nationalityNameTh: string;
  nationalityNameEn: string;
  studentStatusCode: string;
  studentStatusNameTh: string;
  studentStatusNameEn: string;
  studentTypeCode: string;
  studentTypeNameTh: string;
  studentTypeNameEn: string;
  edulevelNameTh: string;
  edulevelNameEn: string;
  studentYear: string;
  email: string;
  mobileNo: string;
}
interface v1 {
  _id: string;
  firstname: string;
  lastname: string;
  username: string;
  password: string;
  address: string;
  email: string;
  phoneNumber: string;
  profilePic: string;
  verifyEmail: number;
  favourite: string[];
  inventories: string[];
  requestInbox: string[];
  userContacts: userContactdata[];
}

interface v2 {
  isStudent: boolean;
  student: Student;
}

export interface User extends v1, v2 {}
