import { Link, useNavigate } from "react-router-dom";
import { signupInput } from "@zainop23/medium-common";
import { ChangeEvent, useState, useCallback } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";
import React from "react";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState<signupInput>({
    name: "",
    username: "",
    password: ""
  });

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setPostInputs((prevInputs) => ({
        ...prevInputs,
        [name]: value
      }));
    },
    []
  );

  async function sendRequest() {
    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`,
        postInputs
      );
      const jwt = await res.data;
      localStorage.setItem("token", jwt);
      navigate("/blogs");
    } catch (e) {
      alert(e);
    }
  }

  return (
    <div className="h-screen flex justify-center flex-col">
      <div className="text-3xl font-bold flex justify-center items-center">
        {type === "signup" ? "Create an Account" : "Sign In"}
      </div>
      <div className="mt-1 text-slate-500 flex justify-center items-center">
        {type === "signin" ? "Don't have an account?" : "Already have an account?"}
        <Link className="pl-1 underline" to={type === "signin" ? "/signup" : "/signin"}>
          {type === "signin" ? "Sign up" : "Login"}
        </Link>
      </div>

      {type === "signup" && (
        <LabelledInput
          name="name"
          label="Name"
          placeholder="Enter your name"
          value={postInputs.name}
          onChange={handleInputChange}
        />
      )}

      <LabelledInput
        name="username"
        label="Username"
        placeholder="zain@gmail.com"
        value={postInputs.username}
        onChange={handleInputChange}
      />

      <LabelledInput
        name="password"
        label="Password"
        placeholder="123456"
        type="password"
        value={postInputs.password}
        onChange={handleInputChange}
      />

      <div className="flex justify-center items-center mt-5 ml-5">
        <button onClick={sendRequest} className="bg-zinc-950 border rounded text-slate-50 font-semibold pt-1 pb-1 pr-40 pl-40">
          {type === "signup" ? "Sign up" : "Sign in"}
        </button>
      </div>
    </div>
  );
};

interface LabelledInputType {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  value?: string;
  name: string;
}

const LabelledInput = React.memo(({ label, placeholder, onChange, type, value, name }: LabelledInputType) => {
  return (
    <div className="ml-60 mr-44 mt-1">
      <div className="font-semibold mt-4 pb-2">{label}</div>
      <input
        name={name}
        value={value}
        className="border border-slate-300 rounded-md p-1 pr-48"
        type={type || "text"}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
});

export default Auth;
