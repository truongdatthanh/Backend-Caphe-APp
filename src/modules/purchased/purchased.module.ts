import { Module } from '@nestjs/common';
import { PurchasedService } from './purchased.service';
import { PurchasedController } from './purchased.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PurchasedSchema } from './entities/purchased.entity';

@Module( {
  imports: [MongooseModule.forFeature([{ name: 'Purchased', schema: PurchasedSchema }])],
  controllers: [PurchasedController],
  providers: [PurchasedService],
})
export class PurchasedModule {}
