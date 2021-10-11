import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Console } from "console";
import { Model } from "mongoose";
import { Contactlist, Contactuser } from "src/models/contactlist.model";


@Injectable()
export class ContactlistService {
    constructor (
        @InjectModel('Contactlist') private readonly contactlistModel: Model<Contactlist>,
    ){}

    async getcontactlist(userid : string){
        let userroom = await this.contactlistModel.findOne({userId: userid});
        return userroom;
    }

    async newcontactlist(userid : string){
        let contactroom = new this.contactlistModel ({
            userId : userid,
            contactusers : []
        })
        let userroom = await this.contactlistModel.findOne({userId: userid});
        if (!userroom) {
            await this.contactlistModel.create(contactroom).then(() => {
                console.log('Create new contactlist')
            })
        }
    }

    async addcontactlist(body : Contactuser){
        let userroom = await this.contactlistModel.findOne({userId: body.userId});
        if (!(userroom.contactusers.includes(body.contactuser))) {
            console.log('Have this user in contactlist');
            await this.contactlistModel.updateOne({userId: body.userId}, {$push: {contactusers: [body.contactuser]}}).then(() => {
                console.log('Success Add new Contact');
            })
        }
    }
}