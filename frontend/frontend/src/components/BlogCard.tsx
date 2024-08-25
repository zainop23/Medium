
interface BlogCardProps{
    authorName: string,
    title: string,
    content: string,
    publishedDate: string
}
export const BlogCard = ({authorName,title,content, publishedDate}: BlogCardProps) => {

  return (
    <div className="border-b pb-4 border-slate-300">
        <div  className="pt-4">
        <Avatar name={authorName } />  <span className="text-slate-600">{authorName}</span> 
                <Circle />
                <span className="text-slate-400 pl-3 ">{publishedDate}</span>
        </div>

        <div className="font-bold text-xl ">{title}</div>

        <div className="text-slate-500">{content.slice(0,100) + "..."}</div>

        <div className="text-slate-400 pt-4">{`${Math.ceil(content.length / 100)} minutes read` }</div>
        

    </div>
  )
}


export function Avatar({name, size= "small" }: {name: string, size ?: "small" | "big"}){
    return <div className={`relative inline-flex items-center justify-center
    overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 ${size=== 'small'? "w-6 h-6": "w-10 h-10"}`}>
    <span className={`flex flex-col justify-center pb-0.5 
      font-extralight  text-gray-600 dark:text-gray-300 ${size==="small"?"text-xs":"text-md"}`}>
        {name[0]}</span>
</div>
}
function Circle(){
  return <span className="h-1 w-1 rounded-full bg-slate-500"></span>
}

export default BlogCard