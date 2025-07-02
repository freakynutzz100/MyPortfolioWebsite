import nodemailer from 'nodemailer';

export const sendContactMail = async (req, res) => {
    const { name, email, subject, body } = req.body;
    if (!name || !email || !subject || !body) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.MAIL_ID,
                pass: process.env.APP_PASSWORD
            }
        });

        await transporter.sendMail({
            from: `"${name}" <${email}>`,
            to: 'freetimerenderzz100@gmail.com',
            subject,
            html: `<div>
                <p><strong>From:</strong> ${name} (${email})</p>
                <p><strong>Subject:</strong> ${subject}</p>
                <hr/>
                <div>${body}</div>
            </div>`
        });

        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: 'Failed to send email.' });
    }
};