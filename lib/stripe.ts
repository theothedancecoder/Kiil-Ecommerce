

import Stripe from 'stripe';


if(!process.env.STRIPE_SECRET_KEY){
    throw new Error('Stripe secret key is not set');
}
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!,{
    apiVersion: '2025-05-28.basil', // use the latest api version

})
export default stripe;