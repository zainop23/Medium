import { Avatar } from "./BlogCard"
export const Appbar = () => {
  return (
    <div className="border-b flex justify-between px-10 py-4">
    <div className="flex flex-col justify-center text-zinc-950 font-semibold">
        Medium
    </div>

    <div >
        <Avatar name="Zain" size="big" />
    </div>
    </div>
  )
}

export default Appbar