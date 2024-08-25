import { Quote } from "../components/Quote";
import {Auth} from "../components/Auth"
export const Signin = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2  h-screen">
      <div className=" flex items-center justify-center"> <Auth type="signin"/> </div>
      <div className="bg-slate-100 flex items-center justify-center ">
        <Quote />
      </div>
    </div>
  );
};
