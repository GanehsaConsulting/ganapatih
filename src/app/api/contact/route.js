import nodemailer from "nodemailer";

export async function POST(req) {
  
  try {
    // 1. Check environment variables
    console.log("🔍 Checking environment variables...");
    console.log("EMAIL_USER exists:", !!process.env.EMAIL_USER);
    console.log("EMAIL_PASS exists:", !!process.env.EMAIL_PASS);
    console.log("EMAIL_USER value:", process.env.EMAIL_USER);
    // Don't log password for security
    
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error("❌ Environment variables missing");
      return Response.json({ 
        success: false, 
        message: "Server configuration error - environment variables missing" 
      }, { status: 500 });
    }

    // 2. Parse request body
    console.log("📝 Parsing request body...");
    const body = await req.json();
    console.log("Request body:", body);
    
    const { name, email, message } = body;

    // 3. Validate required fields
    if (!name || !email || !message) {
      console.error("❌ Missing required fields");
      return Response.json({ 
        success: false, 
        message: "Semua field wajib diisi" 
      }, { status: 400 });
    }

    // 4. Create transporter with multiple configurations
    console.log("🚀 Creating email transporter...");
    
    // Try with different Gmail configurations
    const transporterConfigs = [
      {
        name: "Gmail SMTP (secure)",
        config: {
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        }
      },
      {
        name: "Gmail SMTP (TLS)",
        config: {
          host: 'smtp.gmail.com',
          port: 587,
          secure: false,
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
          tls: {
            rejectUnauthorized: false
          }
        }
      },
      {
        name: "Gmail Service",
        config: {
          service: 'gmail',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        }
      }
    ];

    let transporter = null;
    let configUsed = null;

    // Try each configuration
    for (const { name: configName, config } of transporterConfigs) {
      try {
        console.log(`🔧 Trying configuration: ${configName}`);
        transporter = nodemailer.createTransport(config); // Fixed the method name
        
        console.log("✅ Verifying transporter...");
        await transporter.verify();
        
        console.log(`✅ Configuration ${configName} works!`);
        configUsed = configName;
        break;
      } catch (verifyError) {
        console.log(`❌ Configuration ${configName} failed:`, verifyError.message);
        continue;
      }
    }

    if (!transporter || !configUsed) {
      console.error("❌ All transporter configurations failed");
      return Response.json({ 
        success: false, 
        message: "Tidak dapat terhubung ke server email. Periksa konfigurasi email." 
      }, { status: 500 });
    }

    // 5. Prepare email content
    console.log("📧 Preparing email content...");
    const mailOptions = {
      from: `"Pesan Klien Ganapatih" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `🚀 Pesan Baru dari ${name}`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8fafc;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">🚀 Ganapatih Message</h1>
          </div>
          
          <div style="background: white; padding: 30px; margin: 20px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <h2 style="color: #4F46E5; margin-top: 0;">Pesan Baru Diterima!</h2>
            
            <div style="background: #f1f5f9; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #4F46E5;">
              <p style="margin: 5px 0;"><strong>👤 Nama:</strong> ${name}</p>
              <p style="margin: 5px 0;"><strong>📧 Email:</strong> ${email}</p>
              <p style="margin: 5px 0;"><strong>📅 Waktu:</strong> ${new Date().toLocaleString('id-ID')}</p>
            </div>
            
            <div style="background: #ffffff; padding: 20px; border-radius: 8px; border: 2px solid #e2e8f0;">
              <h3 style="color: #334155; margin-top: 0;">💬 Pesan:</h3>
              <div style="line-height: 1.6; color: #475569; white-space: pre-wrap;">${message}</div>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; text-align: center;">
              <p style="color: #64748b; font-size: 12px; margin: 0;">
                Email ini dikirim otomatis dari sistem Ganapatih Message<br>
                Configuration used: ${configUsed}
              </p>
            </div>
          </div>
        </div>
      `,
      text: `
🚀 Ganapatih Message

Pesan Baru Diterima!

👤 Nama: ${name}
📧 Email: ${email}  
📅 Waktu: ${new Date().toLocaleString('id-ID')}

💬 Pesan:
${message}

---
Email ini dikirim otomatis dari sistem Ganapatih Message
Configuration used: ${configUsed}
      `,
    };

    // 6. Send email
    console.log("📤 Sending email...");
    const info = await transporter.sendMail(mailOptions);
    
    console.log("✅ Email sent successfully!");
    console.log("Message ID:", info.messageId);
    console.log("Response:", info.response);

    return Response.json({ 
      success: true, 
      message: "✅ Pesan berhasil dikirim! Terima kasih atas masukannya.",
      messageId: info.messageId,
      configUsed: configUsed
    });

  } catch (error) {
    console.error("❌ DETAILED ERROR:");
    console.error("Error name:", error.name);
    console.error("Error message:", error.message);
    console.error("Error code:", error.code);
    console.error("Error stack:", error.stack);
    
    // Handle specific errors
    let userMessage = "Gagal mengirim pesan. Silakan coba lagi.";
    
    if (error.code === 'EAUTH') {
      userMessage = "❌ Autentikasi email gagal. Periksa kredensial email.";
      console.error("🔍 EAUTH Error - Check your Gmail app password!");
    } else if (error.code === 'ENOTFOUND') {
      userMessage = "❌ Tidak dapat terhubung ke server email.";
    } else if (error.code === 'ETIMEDOUT') {
      userMessage = "❌ Timeout saat mengirim email.";
    } else if (error.code === 'ECONNECTION') {
      userMessage = "❌ Gagal terhubung ke server email.";
    } else if (error.message?.includes('Invalid login')) {
      userMessage = "❌ Login email tidak valid. Periksa username dan password.";
    }

    return Response.json({ 
      success: false, 
      message: userMessage,
      errorCode: error.code,
      errorName: error.name,
      // Only show detailed error in development
      ...(process.env.NODE_ENV === 'development' && {
        detailedError: error.message,
        errorStack: error.stack
      })
    }, { status: 500 });
  }
}