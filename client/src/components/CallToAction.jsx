import { Button } from 'flowbite-react'


export default function CallToAction() {
  return (
    <div className="flex flex-col  sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl 
        rounded-br-3xl text-center">
        <div className='flex-1 justify-center flex flex-col'>
            <h2 className='text-2xl'>
                Want to learn more about JavaScript?
            </h2>
            <p className='text-gray-500 my-2'>
                Checkout these resources with JavaScript Projects
            </p>
            <Button className="text-black-600 bg-transparent hover:text-white hover:bg-gradient-to-br hover:from-purple-600 hover:to-blue-500
                  focus:ring-4 focus:ring-blue-300 transition-all duration-300 rounded-tl-xl rounded-bl-none">
                <a href='https://www.w3schools.com/js/' target='__blank' 
                rel='noopener noreferrer'>
                    Learn More From here
                </a>
            </Button>
        </div>
        <div className="p-7 flex-1">
            <img src="https://bairesdev.mo.cloudinary.net/blog/2023/08/What-Is-JavaScript-Used-For.jpg" />
        </div>
    </div>
  )
}
