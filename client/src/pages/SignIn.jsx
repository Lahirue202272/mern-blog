import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import { Link, useNavigate } from 'react-router-dom'
import { HiMail, HiInformationCircle } from "react-icons/hi";
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure} from '../redux/user/userSlice';
import OAuth from '../components/OAuth';

export default function SignIn() {
  const [formData, setFormData] = useState({})
  const { error:errorMessage, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value.trim()
    })
  };
  const handleSubmit = async (e) =>{
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure("Please fill all the fields"));  
    }
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    const data = await res.json();
    if (data.success===false) {
      dispatch(signInFailure(data.message));
    }

    if (res.ok){
      dispatch(signInSuccess(data));
      navigate('/');
    }    
    } catch (error) {
      dispatch(signInFailure(error.message));
    }

  };
  return (
    <div className='min-h-screen mt-20'>
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row
      md:items-center gap-5">
        {/* left side */}
        <div className="flex-1">
            <Link to="/" className="font-bold dark:text-white text-4xl">
              <span className="px-2 py-1 text-white rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                Lahiru's
              </span>
              Blog
          </Link>
          <p className='text-sm mt-5'>
            You can sign in with your email and 
            password
            or with Google.
          </p>
        </div>
        {/* right side */}
        <div className="flex-1">
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div>
              <Label >Your email</Label>
              <TextInput type='email' id="email" placeholder="name@company.com" icon={HiMail} required onChange={handleChange}/>
            </div>
            <div>
              <Label >Your password</Label>
              <TextInput type='password' id="password" placeholder="********" onChange={handleChange}/>
            </div>
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:bg-gradient-to-l focus:ring-purple-200 dark:focus:ring-purple-800" type="submit" disabled={loading}>
              {
                loading ? (
                  <>
                  <Spinner size="sm" aria-label="Info spinner example" className="me-3" light />
                  <span className='pl-3'>Loading...</span>
                  </>
                ): 'Sign In'}
            </Button>
            <OAuth />
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Dont Have an account?</span>
             <Link to="/sign-up" className="text-blue-500 hover:underline">
              Sign Up
            </Link>
          </div>
          {
            errorMessage && (
              <Alert className='mt-5' color='failure' icon={HiInformationCircle}>
                {errorMessage}
              </Alert>
            )
          }
        </div>
      </div>
    </div>
  )
}
