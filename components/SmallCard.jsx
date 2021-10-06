import Image from 'next/dist/client/image';

const SmallCard = ({img,location,distance}) => {
 
  return (
    <div  className='flex mt-5 items-center 
     m-2 space-x-4 rounded-xl cursor-pointer
     hover:bg-gray-100 hover:scale-100 transition
      transform duration-200 easy-out '>
      <div className='relative h-16 w-16'>
        <Image 
        src={img}
        layout="fill"
        objectFit="contain"
         className='rounded-lg'
        />
      </div>

      <div>
        <h2>{location}</h2>
        <h3 className='text-gray-500'>{distance}</h3>
      </div>

    </div>
  )
}

export default SmallCard