import Config from "../flutterwaveconfig.js"
var assert = require('assert')


describe('test flutterwave configuration', () => {
    it('test should match config file', () => {   
        // no check for the  public_key value
        assert.ok(Config(40,{email:"khal@gmail.com",name:"khal"}),
        {
            tx_ref: Date.now(),
            amount:40,
            currency: 'UGX',
            payment_options: 'card,mobilemoney,ussd',
            customer: {
              email: "khal@gmail.com",
              phonenumber: '',
              name: "khal",
            },
            customizations: {
              title: 'Crane Cloud bill Payment',
              description: 'Payment for project overall usage',
              logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
            },
          }
        );   

    }); 
   
 });