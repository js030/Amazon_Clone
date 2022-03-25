const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")
('sk_test_51KhAuBAmCPtFRSSVWm9NffarFDcRbnHaArZ6JEPcB8Tb7SvMcuM3War6LsReQvEL3hAEOD2QELGTpSEqgb2yQHSP00n8exb1ml');


const app = express();

app.use(cors({origin: true}));
app.use(express.json());

app.get('/', (request, response) => response.status(200).send('hello world'));

app.post('/payments/create', async (request, response) => {
    const total = request.query.total;

    console.log('Payment Request Recieved BOOM!!! for this amount >>>', total);

    const paymentIntent = await stripe.paymentIntent.create({
        amount : total,
        currency: "usd",
    });

    response.status(201).send({
        clientSecret : paymentIntent.clientSecret,
    });
});

exports.api = functions.https.onRequest(app);

