// pages/api/payment/create-qris.js atau app/api/payment/create-qris/route.js

import { NextResponse } from 'next/server';

// Untuk App Router (Next.js 13+)
export async function POST(request) {
  try {
    const body = await request.json();
    // console.log('Received payment request:', body);

    // Validasi data
    if (!body.transaction_details || !body.transaction_details.order_id || !body.transaction_details.gross_amount) {
      return NextResponse.json(
        { error: 'Missing required transaction details', success: false },
        { status: 400 }
      );
    }

    // Server Key Midtrans (dari environment variable)
    const serverKey = process.env.MIDTRANS_SERVER_KEY;
    if (!serverKey) {
      console.error('MIDTRANS_SERVER_KEY not found in environment variables');
      return NextResponse.json(
        { error: 'Server configuration error', success: false },
        { status: 500 }
      );
    }

    // Base64 encode server key
    const auth = Buffer.from(serverKey + ':').toString('base64');

    // Midtrans API endpoint
    const midtransUrl = process.env.MIDTRANS_IS_PRODUCTION === 'true' 
      ? 'https://api.midtrans.com/v2/charge'
      : 'https://api.sandbox.midtrans.com/v2/charge';

    // console.log('Calling Midtrans API:', midtransUrl);

    // Call Midtrans API
    const response = await fetch(midtransUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Basic ${auth}`,
      },
      body: JSON.stringify(body),
    });

    const result = await response.json();
    // console.log('Midtrans response status:', response.status);
    // console.log('Midtrans response:', result);

    if (!response.ok) {
      return NextResponse.json(
        { 
          error: result.error_messages || result.status_message || 'Midtrans API error',
          details: result,
          success: false 
        },
        { status: response.status }
      );
    }

    // Success response
    return NextResponse.json({
      ...result,
      success: true
    });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { 
        error: error.message || 'Internal server error',
        success: false 
      },
      { status: 500 }
    );
  }
}

// Untuk Pages Router (Next.js 12 dan sebelumnya)
export default async function handler(req, res) {
  // Hanya allow POST method
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      error: 'Method not allowed',
      success: false 
    });
  }

  try {
    // console.log('Received payment request:', req.body);

    // Validasi data
    if (!req.body.transaction_details || !req.body.transaction_details.order_id || !req.body.transaction_details.gross_amount) {
      return res.status(400).json({
        error: 'Missing required transaction details',
        success: false
      });
    }

    // Server Key Midtrans
    const serverKey = process.env.MIDTRANS_SERVER_KEY;
    if (!serverKey) {
      console.error('MIDTRANS_SERVER_KEY not found in environment variables');
      return res.status(500).json({
        error: 'Server configuration error',
        success: false
      });
    }

    // Base64 encode server key
    const auth = Buffer.from(serverKey + ':').toString('base64');

    // Midtrans API endpoint
    const midtransUrl = process.env.MIDTRANS_IS_PRODUCTION === 'true' 
      ? 'https://api.midtrans.com/v2/charge'
      : 'https://api.sandbox.midtrans.com/v2/charge';

    // console.log('Calling Midtrans API:', midtransUrl);

    // Call Midtrans API
    const response = await fetch(midtransUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Basic ${auth}`,
      },
      body: JSON.stringify(req.body),
    });

    const result = await response.json();
    // console.log('Midtrans response status:', response.status);
    // console.log('Midtrans response:', result);

    if (!response.ok) {
      return res.status(response.status).json({
        error: result.error_messages || result.status_message || 'Midtrans API error',
        details: result,
        success: false
      });
    }

    // Success response
    res.status(200).json({
      ...result,
      success: true
    });

  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({
      error: error.message || 'Internal server error',
      success: false
    });
  }
}