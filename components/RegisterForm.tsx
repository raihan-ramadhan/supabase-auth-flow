import Link from "next/link";
import Separator from "./Separator";
import { Input } from "./Input";

const RegisterForm = () => {
  return (
    <div className="flex flex-col gap-2">
      <Separator />
      <form action="" className="flex flex-col gap-y-2">
        <span>Register</span>
        <div className="flex gap-2">
          <Input type="text" placeholder="First Name" />
          <Input type="text" placeholder="Last Name" />
        </div>
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Create Password" />
        <Input type="password" placeholder="Confirm Password" />
        <div className="flex flex-col">
          <span className="text-sm">
            Already have an account?{" "}
            <Link href={"/login"} className="text-blue-400 underline">
              Login
            </Link>
          </span>
        </div>
        <button
          type="submit"
          className="bg-blue-400 text-background w-full py-3 px-1.5 rounded-2xl block cursor-pointer active:bg-blue-400/80 hover:bg-blue-400/95 font-bold"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
