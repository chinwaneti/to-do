import Image from 'next/image';
import { AiOutlineCheck} from 'react-icons/ai';


export default function Welcome() {
  
  return (
    <div
      className='h-screen flex items-center justify-center'
    >
      <div className=''>
        <div
        
      
        >
          <Image
            src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQLKRwqL2qV6n9RK8ZB00w6BB2aZ0YzJ4uufY2W-Nvn6lypS8od0meHHzmEDvmLP1muWo&usqp=CAU'
            alt='logo'
            width={200}
            height={200}
            priority
            className='rounded-2xl ml-[80px]'
          />
          <div className='mt-16 text-gray-50 font-extrabold text-7xl relative'>
            To-do List
            <span className='absolute left-[160px] '>
              <AiOutlineCheck size={70} style={{color:"gray"}}/>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
