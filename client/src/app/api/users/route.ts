import { createUser, getUsers } from "@/db/models/user";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

type UserData = {
  _id: ObjectId;
  name: string;
  username: string;
  email: string;
};

const userInputSchema = z.object({
  name: z.string(),
  username: z.string().min(1, { message: "Username cannot be empty" }),
  email: z
    .string()
    .min(1, { message: "Email cannot be empty" })
    .email({ message: "Format Email" }),
  password: z
    .string({ message: "Required Password" })
    .min(5, { message: "Password must be at least 5 characters" }),
});

export const GET = async (request: NextRequest) => {
  const users: UserData[] | null = await getUsers();

  return NextResponse.json(users);
};

export const POST = async (request: NextRequest) => {
  try {
    const data = await request.json();

    const parsedData = userInputSchema.safeParse(data);

    if (!parsedData.success) {
      throw parsedData.error;
    }

    const users = await getUsers();

    const existsUsername = users.some(
      (el) => parsedData.data.username === el.username
    );

    const existsEmail = users.some((el) => parsedData.data.email === el.email);

    if (existsUsername) {
      return NextResponse.json(
        { message: "username already exists" },
        { status: 400 }
      );
    }
    if (existsEmail) {
      return NextResponse.json(
        { message: "email already exists" },
        { status: 400 }
      );
    }

    const user = await createUser(parsedData.data);

    return NextResponse.json(user);
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
