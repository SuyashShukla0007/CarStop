import Star from '../../assets/star-svgrepo-com.svg'

type stars={
  stars:number
}
export  const Stars = ({stars}:stars) => {

  if(stars==null)
    return 

  return (
    <div className='flex'>
       {[...Array(stars)].map((_, idx) => (
          <img key={idx} src={Star} alt="" height={20} width={20} />
        ))}
    </div>
  )
}
