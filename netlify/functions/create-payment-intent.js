/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config()

const stripe = require('stripe')(
  `sk_test_51MeuNZEU2DgjuENC6Bxsd9QjJVFWLNYOGEEZD2GyznnUPiDqF1XjNNpTCk0ERC20jy1wYvRjb6Di2NT0mJhVEmbD00SMCag3hu`
)

exports.handler = async (event) => {
  try {
    const { amount } = JSON.parse(event.body)
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'USD',
      payment_method_types: ['card']
    })

    return {
      statusCode: 200,
      body: JSON.stringify({ paymentIntent })
    }
  } catch (err) {
    console.log(err)

    return {
      statusCode: 400,
      body: JSON.stringify({ err })
    }
  }
}
