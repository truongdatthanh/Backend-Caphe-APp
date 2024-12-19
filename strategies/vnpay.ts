// import { Injectable } from '@nestjs/common';
// import * as crypto from 'crypto';

// @Injectable()
// export class VnPayService
// {
//   private readonly tmnCode = 'WQMLFJV8'; // Thay bằng mã TMN của bạn
//   private readonly secretKey = 'L5OA4NPSYHIV7JG6Y4PCT49N1HDH086W'; // Thay bằng key bí mật
//   private readonly vnpUrl = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html'; // URL Sandbox
//   private vnp_ReturnUrl = 'http://localhost:3000/vnpay_return';

//   generatePaymentUrl ( orderId: string, amount: number, returnUrl: string, clientIp: string ): string
//   {
//     const params: any = {
//       vnp_Version: '2.1.0',
//       vnp_Command: 'pay',
//       vnp_TmnCode: this.tmnCode,
//       vnp_Amount: amount * 100, // Số tiền VND x 100
//       vnp_CurrCode: 'VND',
//       vnp_TxnRef: orderId,
//       vnp_OrderInfo: `Payment for Order ${ orderId }`,
//       vnp_OrderType: 'billpayment',
//       vnp_Locale: 'vn',
//       vnp_ReturnUrl: returnUrl,
//       vnp_IpAddr: clientIp,
//       vnp_CreateDate: this.getCurrentDate(),
//     };

//     // Sắp xếp các tham số theo thứ tự alphabet
//     const sortedParams = Object.keys( params )
//       .sort()
//       .map( ( key ) => `${ key }=${ encodeURIComponent( params[ key ] ) }` )
//       .join( '&' );

//     // Tạo chữ ký
//     const signData = sortedParams;
//     const hmac = crypto.createHmac( 'sha512', this.secretKey );
//     const signature = hmac.update( signData ).digest( 'hex' );

//     // Tạo URL thanh toán
//     return `${ this.vnpUrl }?${ sortedParams }&vnp_SecureHash=${ signature }`;
//   }

//   private getCurrentDate (): string
//   {
//     const now = new Date();
//     const year = now.getFullYear();
//     const month = String( now.getMonth() + 1 ).padStart( 2, '0' );
//     const date = String( now.getDate() ).padStart( 2, '0' );
//     const hours = String( now.getHours() ).padStart( 2, '0' );
//     const minutes = String( now.getMinutes() ).padStart( 2, '0' );
//     const seconds = String( now.getSeconds() ).padStart( 2, '0' );
//     return `${ year }${ month }${ date }${ hours }${ minutes }${ seconds }`;
//   }
// }

import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import * as qs from 'querystring';

@Injectable()
export class VnpayService {
  private readonly tmnCode = 'WQMLFJV8'; // Mã định danh
  private readonly secretKey = 'L5OA4NPSYHIV7JG6Y4PCT49N1HDH086W'; // Chuỗi ký tự bí mật
  private readonly vnpUrl = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html';
  private readonly returnUrl = 'http://localhost:3000/vnpay-return'; // URL callback

  generatePaymentUrl(orderId: string, amount: number, ipAddress: string) {
    const vnp_Params: any = {
      vnp_Version: '2.1.0',
      vnp_Command: 'pay',
      vnp_TmnCode: this.tmnCode,
      vnp_Locale: 'vn',
      vnp_CurrCode: 'VND',
      vnp_TxnRef: orderId, // Mã đơn hàng
      vnp_OrderInfo: `Thanh toan don hang ${orderId}`,
      vnp_OrderType: 'other',
      vnp_Amount: amount * 100, // VNPay tính theo đơn vị đồng
      vnp_ReturnUrl: this.returnUrl,
      vnp_IpAddr: ipAddress,
      vnp_CreateDate: this.getCurrentDate(),
    };

    // Sắp xếp các tham số theo thứ tự
    const sortedParams = this.sortObject(vnp_Params);
    const signData = qs.stringify(sortedParams);

    // Tạo checksum
    const hmac = crypto.createHmac('sha512', this.secretKey);
    const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');

    // Thêm checksum vào URL
    sortedParams['vnp_SecureHash'] = signed;

    const paymentUrl =
      this.vnpUrl + '?' + qs.stringify(sortedParams);
    return paymentUrl;
  }

  // Xác minh checksum từ callback
  verifyCallback(query: any): boolean {
    const secureHash = query['vnp_SecureHash'];
    delete query['vnp_SecureHash'];
    delete query['vnp_SecureHashType'];

    const sortedParams = this.sortObject(query);
    const signData = qs.stringify(sortedParams);

    const hmac = crypto.createHmac('sha512', this.secretKey);
    const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');

    return secureHash === signed;
  }

  // Hàm hỗ trợ
  private sortObject(obj: any) {
    return Object.keys(obj)
      .sort()
      .reduce((result, key) => {
        result[key] = obj[key];
        return result;
      }, {});
  }

  private getCurrentDate(): string {
    const date = new Date();
    const yyyy = date.getFullYear();
    const MM = ('0' + (date.getMonth() + 1)).slice(-2);
    const dd = ('0' + date.getDate()).slice(-2);
    const HH = ('0' + date.getHours()).slice(-2);
    const mm = ('0' + date.getMinutes()).slice(-2);
    const ss = ('0' + date.getSeconds()).slice(-2);
    return `${yyyy}${MM}${dd}${HH}${mm}${ss}`;
  }
}