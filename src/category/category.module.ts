import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { MongooseModule,} from '@nestjs/mongoose';
import { categorySchema } from 'src/models/category.model';
import { CategoryController } from './category.controller';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Category', schema: categorySchema}])],
  controllers: [CategoryController],
  providers: [CategoryService]
})
export class CategoryModule {}
