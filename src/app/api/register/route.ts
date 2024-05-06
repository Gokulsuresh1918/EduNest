import User from "@/models/users";
import connect from "@/utils/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (request: any) => {
  const { email, password } = await request.json();
console.log(email,password);

  await connect();

  // const existingUser = await User.find({ email });

  // if (existingUser) {
  //   return new NextResponse("User is already existed", { status: 400 });
  // }
  const hashedPassword = await bcrypt.hash(password, 5);

  const newUser = new User({
    email,
    password: hashedPassword,
  });
  try {
    await newUser.save();
    return new NextResponse("User registered successfully", { status: 200 });
  } catch (err: any) {
    console.error(err);
    return new NextResponse("Failed to register user", { status: 500 });
  }
  
};
