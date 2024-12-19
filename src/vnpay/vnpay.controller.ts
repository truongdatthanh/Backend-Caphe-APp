import { Controller, Get, Query, Req } from '@nestjs/common';
import { VNPayService } from './vnpay.service';

@Controller('payment')
export class VnpayController {
  constructor(private readonly vnpayService: VNPayService) {}

  @Get('/create')
  createPayment(@Req() req, @Query('orderId') orderId: string, @Query('amount') amount: number) {
    const ipAddress = req.ip || '127.0.0.1';
    const paymentUrl = this.vnpayService.createPaymentUrl(orderId, amount, ipAddress);
    return { url: paymentUrl };
  }

  @Get('/callback')
  callbackPayment(@Query() query: any) {
    const { vnp_ResponseCode, vnp_TxnRef, vnp_Amount } = query;

    if (vnp_ResponseCode === '00') {
      return { message: 'Thanh toán thành công', orderId: vnp_TxnRef, amount: vnp_Amount };
    }
    return { message: 'Thanh toán thất bại', orderId: vnp_TxnRef };
  }
}