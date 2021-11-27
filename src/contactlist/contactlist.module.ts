import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { contactlistSchema } from "src/models/contactlist.model";
import { ContactlistController } from "./contactlist.controller";
import { ContactlistService } from "./contactlist.service";


@Module({
    imports: [
        MongooseModule.forFeature([
            {name: "Contactlist", schema: contactlistSchema}
        ])
    ],
    controllers: [ContactlistController],
    providers: [ContactlistService],
})
export class ContactlistModule {}