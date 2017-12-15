import nodemailer from 'nodemailer';
import promisify from 'es6-promisify';

const { MAIL_PORT: port, MAIL_HOST: host, MAIL_USER: user, MAIL_PASS: pass } = process.env;
const transport = nodemailer.createTransport({ host, port, auth: { user, pass } });

export default async function sendMail(options) {
  const text = `Follow the link to reset your password for Scrooge: ${options.url}`;

  const mailOptions = {
    from: 'Scrooge <noreply@scrooge.com>',
    to: options.user.email,
    subject: options.subject,
    text,
  };
  const promisifiedSendMail = promisify(transport.sendMail, transport);
  return promisifiedSendMail(mailOptions);
};
