const Comments = ({ comment }: any) => {

   //remove first element from array
  comment.shift()
  const reversedComments = [...comment].reverse()
 

  return (

    
    <div className="mt-[5vh]">
      <h1 className="text-red font-bold mb-[2vh] text-3xl  ml-[12vw]">Comments</h1>

      {reversedComments.map((com: any, idx: any) => (
        
        <div
          key={idx}
          className="flex flex-col items-start w-[30vw] ml-[12vw] border-y-2 mb-6 border-x-2 rounded-lg border-gray-300"
        >
         
          <div className="text-lg font-semibold border-b-2 border-gray-300 flex justify-between w-full p-4 text-start">
            <p>{com.postedBy}</p>
            <p>{com.time}</p>
          </div>
          <p className="p-4 text-gray-600">{com.text}</p>
        </div>
      ))}
    
    </div>
  );
};

export default Comments;
