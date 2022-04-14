import { FLUTTER_WAVE_PUBLIC_KEY} from "../config"
export const Config = (amount,customer) => {
    const config = {
        public_key: FLUTTER_WAVE_PUBLIC_KEY,
        tx_ref: Date.now(),
        amount,
        currency: 'UGX',
        payment_options: 'card,mobilemoney,ussd',
        customer: {
          email: customer.email,
          phonenumber: '',
          name: customer.name,
        },
        customizations: {
          title: 'Crane Cloud bill Payment',
          description: 'Payment for project overall usage',
          logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
        },
      };
      return config
    }

  export default Config;