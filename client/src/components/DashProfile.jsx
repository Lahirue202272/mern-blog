import { Button, TextInput } from "flowbite-react"
import { HiMail } from "react-icons/hi"
import {useSelector} from "react-redux"

export default function DashProfile() {
    const {currentUser} = useSelector((state) => state.user)
  return (
    <div className="max-w-lg mx-auto p-3 w-full">
        <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
        <form className="flex flex-col gap-4">
            <div className="w-32 h-32 self-center cursor-pointer shadow-md rounded-full overflow-hidden">
                <img src={currentUser.profilePicture} alt="user" 
                className="rounded-full w-full object-cover h-full border-8 border-[lightgray]"/>
            </div>
            <TextInput type="text" id="username" placeholder="username"
             defaultValue={currentUser.username} addon="@"/>
             <TextInput type="email" id="email" placeholder="email"
             defaultValue={currentUser.email} icon={HiMail}/>
             <TextInput type="password" id="password" placeholder="password"/>
             <Button type="submit" className="text-black-600 bg-transparent hover:text-white hover:bg-gradient-to-br hover:from-purple-600 hover:to-blue-500
              focus:ring-4 focus:ring-blue-300 transition-all duration-300" outline>
                Update
             </Button>
        </form>
        <div className="text-red-500 flex justify-between mt-5">
            <span className="cursor-pointer hover:underline">Delete Account</span>
            <span className="cursor-pointer hover:underline">Sign Out</span>
        </div>
    </div>
  )
}
