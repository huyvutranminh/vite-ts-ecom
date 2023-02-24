/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config()

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

exports.handler = async (event) => {
  try {
    const { amount } = JSON.parse(event.body)
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'USD',
      payment_method_type: ['card']
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
