import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import * as qs from 'querystring';

@Injectable()
export class VNPayService {
  private vnp_TmnCode = 'WQMLFJV8'; // Thay bằng mã TMN của bạn
  private vnp_HashSecret = 'L5OA4NPSYHIV7JG6Y4PCT49N1HDH086W'; // Thay bằng chuỗi bí mật
  private vnp_Url = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html'; // Sandbox URL
  private vnp_ReturnUrl = 'http://localhost:3000/payment/callback'; // URL trả về sau thanh toán

  // Hàm tạo URL thanh toán
  createPaymentUrl(orderId: string, amount: number, ipAddress: string) {
    const date = new Date();
    const createDate = `${date.getFullYear()}${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}${date
      .getHours()
      .toString()
      .padStart(2, '0')}${date.getMinutes().toString().padStart(2, '0')}${date
      .getSeconds()
      .toString()
      .padStart(2, '0')}`;

    const params = {
      vnp_Version: '2.1.0',
      vnp_Command: 'pay',
      vnp_TmnCode: this.vnp_TmnCode,
      vnp_Locale: 'vn',
      vnp_CurrCode: 'VND',
      vnp_TxnRef: orderId,
      vnp_OrderInfo: `Thanh toan don hang ${orderId}`,
      vnp_OrderType: 'other',
      vnp_Amount: amount * 100, // Số tiền tính theo đơn vị nhỏ nhất (VND * 100)
      vnp_ReturnUrl: this.vnp_ReturnUrl,
      vnp_IpAddr: ipAddress,
      vnp_CreateDate: createDate,
    };

    // Sắp xếp tham số theo thứ tự a-z
    const sortedParams = Object.fromEntries(
      Object.entries(params).sort(([keyA], [keyB]) => keyA.localeCompare(keyB)),
    );

    const signData = qs.stringify(sortedParams);
    const hmac = crypto.createHmac('sha512', this.vnp_HashSecret);
    const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');

    // Thêm chữ ký vào params
    const paymentUrl =
      this.vnp_Url + '?' + qs.stringify({ ...sortedParams, vnp_SecureHash: signed });

    return paymentUrl;
  }
}