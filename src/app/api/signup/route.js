import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const body = await request.json();

    const firstName = body.firstName?.trim();
    const lastName = body.lastName?.trim();
    const email = body.email?.trim().toLowerCase();

    // The browser's "required" attributes help users,
    // but we must also validate everything on the server.
    if (!firstName || !lastName || !email) {
      return Response.json(
        {
          error: "First name, last name, and email are required.",
        },
        {
          status: 400,
        },
      );
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      return Response.json(
        {
          error: "Please enter a valid email address.",
        },
        {
          status: 400,
        },
      );
    }

    // Prevent extremely large or abusive submissions.
    if (firstName.length > 100 || lastName.length > 100) {
      return Response.json(
        {
          error: "The submitted name is too long.",
        },
        {
          status: 400,
        },
      );
    }

    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      to: [process.env.SIGNUP_RECIPIENT],
      replyTo: email,
      subject: `New Sabal House signup: ${firstName} ${lastName}`,
      text: [
        "A visitor joined the Sabal House list.",
        "",
        `First name: ${firstName}`,
        `Last name: ${lastName}`,
        `Email: ${email}`,
      ].join("\n"),
    });

    if (error) {
      console.error("Resend rejected the email:", error);

      return Response.json(
        {
          error: "We could not submit your information. Please try again.",
        },
        {
          status: 500,
        },
      );
    }

    return Response.json(
      {
        success: true,
        message: "Thank you for joining the list.",
        emailId: data.id,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("Signup route failed:", error);

    return Response.json(
      {
        error: "Something went wrong. Please try again.",
      },
      {
        status: 500,
      },
    );
  }
}
