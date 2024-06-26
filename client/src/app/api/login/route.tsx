import { getUserByEmail } from "@/db/models/user";
import { compareTextWithHash } from "@/db/utils/hash";
import { createToken } from "@/lib/jwt";
import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";

const loginInputSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email cannot be empty" })
    .email({ message: "Format Email" }),
  password: z.string().min(1, { message: "Password cannot be empty" }),
});

export const POST = async (request: NextRequest) => {
  try {
    const data = await request.json();
    const parsedData = loginInputSchema.safeParse(data);

    if (!parsedData.success) {
      throw parsedData.error;
    }

    const user = await getUserByEmail(parsedData.data.email);

    if (
      !user ||
      !compareTextWithHash(parsedData.data.password, user.password)
    ) {
      return NextResponse.json(
        { message: "Invalid email or password " },
        { status: 400 }
      );
    }

    const payload = {
      id: user._id,
      email: user.email,
    };

    const token = createToken(payload);
    return NextResponse.json({ message: token });
  } catch (err) {
    if (err instanceof z.ZodError) {
      const errMessage = err.issues[0].message;

      return NextResponse.json({ message: errMessage }, { status: 400 });
    }

    return NextResponse.json(
      { message: "Internal Server Error !" },
      { status: 500 }
    );
  }
};
