import nodemailer from 'nodemailer';

export async function POST (request) {
    const { email, phoneNumber, message } = await request.json();

    try {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.NEXT_EMAIL,
            pass: process.env.NEXT_GOOGLE_APP_PASSWORD,
          },
        });
        let contactInfo = "";

        if (phoneNumber.trim().length === 0 || phoneNumber.length === 0) {
            contactInfo = `Contact info:\nEmail: ${email}`;
        } else {
            contactInfo = `Contact info:\nEmail: ${email}\nPhone #: ${phoneNumber}`;
        }
        
        const completeMessage = `${contactInfo}\n\n${message}`

        const resData = await transporter.sendMail({
          from: email,
          to: process.env.NEXT_EMAIL,
          subject: `[Message from ${email} in Portfolio]`,
          text: completeMessage,
        });

        console.log(resData);
        
        return new Response(
            JSON.stringify({
                data: "Successfully sent email.",
                error: null
            }), {
                status: 200,
                headers: { "Content-Type": "application/json" }
            }
        )
    } catch (error) {
        console.log(error.message);
        return new Response(
            JSON.stringify({
                data: null,
                error: "Sending email error. Please try again."
            }), {
                status: 400,
                headers: { "Content-Type": "application/json" }
            }
        )
    }
}