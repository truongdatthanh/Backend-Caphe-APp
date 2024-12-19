import { Module } from '@nestjs/common';
import { VNPayService } from './vnpay.service';
import { VnpayController } from './vnpay.controller';


@Module({
  controllers: [VnpayController],
  providers: [VNPayService],
})
export class VnpayModule {}
