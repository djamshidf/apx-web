export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed',
    });
  }

  try {
    const { name, phone, email, message } = req.body;

    const telegramMessage = `
🔔 Новая заявка с сайта APEX POWER

👤 Имя: ${name}

📞 Телефон: ${phone}

📧 Email: ${email || 'Не указан'}

💬 Сообщение:
${message || 'Не указано'}
`;

    const telegramUrl = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`;

    const telegramResponse = await fetch(telegramUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: process.env.TELEGRAM_CHAT_ID,
        text: telegramMessage,
      }),
    });

    const result = await telegramResponse.json();

    if (!result.ok) {
      throw new Error('Telegram API error');
    }

    return res.status(200).json({
      success: true,
      message: 'Message sent',
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
}