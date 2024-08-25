import { Quote } from "../components/Quote";
import {Auth} from "../components/Auth"
export const Signup = () => {
  return (
    <div className="grid grid-cols-2 h-screen">
      <div> <Auth type="signup"/> </div>
      <div className="bg-slate-100 flex items-center justify-center invisible lg:visible">
        <Quote />
      </div>
    </div>
  );
};
export default Signup;
