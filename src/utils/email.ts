import { Resend } from "resend";

const resend = new Resend("re_KxeMhJYH_KT3ceVmQubsQSBR2XBocP7p5");

export async function sendEmail(email: string, subject: string, message: number | string) {
  const { data, error } = await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: [email],
    subject,
    html: `
      <strong>${message}</strong>
    `,
    headers: {
      "X-Entity-Ref-ID": "123456789",
    },
  });

  if (error) {
    return { error };
  }

  return data;
}
