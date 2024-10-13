import {Stars} from '../../components/global/Stars'
const Comments = ({ comment ,rating}: any) => {

   //remove first element from array
  

   if(comment==null)
    return <h1 className="text-2xl text-red font-semibold mb-[2vh] mt-12 ml-[12vw] "></h1>

  const reversedComments = [...comment].reverse()
 


  return (

    
    <div className="mt-[10vh] ">
      

      {reversedComments?.map((com: any, idx: any) => (
        
        <div
          key={idx}
          className="flex flex-col items-start w-[30vw] ml-[12vw] border-y-2 mb-6 border-x-2 rounded-lg border-gray-300"
        >
         
          <div className="text-lg font-semibold border-b-2 border-gray-300 flex justify-between w-full p-4 text-start">
            
            <div className='flex items-center'><p className='mr-2'>{com.postedBy}
            </p>
            <Stars stars={com?.rating}></Stars>
            </div>
            <p>{com.time}</p>

          </div>
          <p className="p-4 text-gray-600">{com.text}</p>
        </div>
      ))}
    
    </div>
  );
};

export default Comments;
