import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: Number(process.env.EMAIL_SERVER_PORT),
  secure: false,
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
});

interface SendMeetingEmailParams {
  candidateEmail: string;
  meetingTitle: string;
  meetingDate: Date;
  meetingTime: string;
  meetingLink?: string;
}

export async function sendMeetingEmail({
  candidateEmail,
  meetingTitle,
  meetingDate,
  meetingTime,
  meetingLink,
}: SendMeetingEmailParams) {
  const formattedDate = meetingDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const emailContent = `
    <h2>Meeting Invitation</h2>
    <p>You have been invited to: <strong>${meetingTitle}</strong></p>
    <p>Date: ${formattedDate}</p>
    <p>Time: ${meetingTime}</p>
    ${meetingLink ? `<p>Meeting Link: <a href="${meetingLink}">${meetingLink}</a></p>` : ""}
  `;

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: candidateEmail,
    subject: `Meeting Invitation: ${meetingTitle}`,
    html: emailContent,
  });
}