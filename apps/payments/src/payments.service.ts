import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';
import { CreateChargeDto } from '@app/common/dto/create-charge.dto';

@Injectable()
export class PaymentsService {
  private readonly stripe = new Stripe(
    this.configService.get('STRIPE_SECRET_KEY'),
    { apiVersion: '2023-10-16' },
  );

  constructor(private readonly configService: ConfigService) {}

  async createCharge({ amount }: CreateChargeDto) {
    return await this.stripe.paymentIntents.create({
      payment_method: 'pm_card_visa',
      amount: amount * 100,
      confirm: true,
      currency: 'krw',
      automatic_payment_methods: { enabled: true, allow_redirects: 'never' },
    });
  }
}
