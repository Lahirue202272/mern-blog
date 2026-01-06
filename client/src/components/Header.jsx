import { Button, Navbar, TextInput, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon } from "react-icons/fa";


export default function Header() {
  const path = useLocation().pathname;
  return (
    <Navbar className='border-b-2'>
      <Link to="/" className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white">
        <span className="px-2 py-1 text-white rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
          Lahiru's
        </span>
        Blog
      </Link>
      <form>
        <TextInput 
          type="text"
          placeholder="Search..."
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline"
        />
      </form>
      <Button className="w-18 h-10 lg:hidden" color= 'light' pill>
        <AiOutlineSearch />
      </Button>
      <div className="flex gap-2 md:order-2">
        <Button className="w-12 h-10 hidden sm:inline" color= 'light' pill>
          <FaMoon />
        </Button>
        <Link to="/sign-in">
          <Button className="text-black-600 bg-transparent hover:text-white hover:bg-gradient-to-br hover:from-purple-600 hover:to-blue-500
              focus:ring-4 focus:ring-blue-300 transition-all duration-300" outline>
            Sign In
          </Button>
          <NavbarToggle />
        </Link>
      </div>
      <NavbarCollapse>
        <NavbarLink active={path === '/'} as={'div'}><Link to='/'>Home</Link></NavbarLink>
        <NavbarLink active={path === '/about'} as={'div'}><Link to='/about'>About</Link></NavbarLink>
        <NavbarLink active={path === '/projects'} as={'div'}><Link to='/projects'>Projects</Link></NavbarLink>
      </NavbarCollapse>
    </Navbar>
  )
}
