import { useState } from 'react';
import { Link } from 'react-router';
import { Eye, EyeOff, User, Mail, Lock } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from '../lib/axios';

const SignupPage = () => {
  let queryClient = useQueryClient(); 
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  });

  let {mutate:signupMutate,data:authData,isError,isPending}=useMutation({
    mutationKey:['signup'],
    mutationFn: () => axios.post('/auth/signup', formData).then(res => res.data),
    onSuccess:()=>queryClient.invalidateQueries(['user'])
  })

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signupMutate();
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 flex items-center justify-center p-4'>
      <div className='w-full max-w-6xl bg-base-100/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-base-300/50 overflow-hidden'>
        <div className='grid lg:grid-cols-2 min-h-[600px]'>
          {/* Left Side - Signup Form */}
          <div className='p-8 lg:p-12 flex flex-col justify-center'>
            <div className='max-w-md mx-auto w-full'>
              {/* Header */}
              <div className='text-center mb-8'>
                <h1 className='text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2'>
                  Join Streamify
                </h1>
                <p className='text-base-content/60 text-lg'>
                  Create your account and start connecting
                </p>
              </div>

              {/* Form */}
              <form
                onSubmit={handleSubmit}
                className='space-y-6'
              >
                {/* Full Name */}
                <div className='form-control'>
                  <label className='label'>
                    <span className='label-text font-medium'>Full Name</span>
                  </label>
                  <div className='relative'>
                    <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                      <User className='h-5 w-5 text-base-content/40' />
                    </div>
                    <input
                      type='text'
                      name='fullName'
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder='Enter your full name'
                      className='input input-bordered w-full pl-10 bg-base-200/50 border-base-300/50 focus:border-primary focus:bg-base-100 transition-all duration-300'
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div className='form-control'>
                  <label className='label'>
                    <span className='label-text font-medium'>Email</span>
                  </label>
                  <div className='relative'>
                    <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                      <Mail className='h-5 w-5 text-base-content/40' />
                    </div>
                    <input
                      type='email'
                      name='email'
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder='Enter your email'
                      className='input input-bordered w-full pl-10 bg-base-200/50 border-base-300/50 focus:border-primary focus:bg-base-100 transition-all duration-300'
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div className='form-control'>
                  <label className='label'>
                    <span className='label-text font-medium'>Password</span>
                  </label>
                  <div className='relative'>
                    <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                      <Lock className='h-5 w-5 text-base-content/40' />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name='password'
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder='Create a password'
                      className='input input-bordered w-full pl-10 pr-10 bg-base-200/50 border-base-300/50 focus:border-primary focus:bg-base-100 transition-all duration-300'
                      required
                    />
                    <button
                      type='button'
                      className='absolute inset-y-0 right-0 pr-3 flex items-center'
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className='h-5 w-5 text-base-content/40 hover:text-base-content/60' />
                      ) : (
                        <Eye className='h-5 w-5 text-base-content/40 hover:text-base-content/60' />
                      )}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type='submit'
                  className='btn btn-primary w-full text-lg h-12 bg-gradient-to-r from-primary to-secondary border-none hover:scale-[1.02] transition-all duration-300 shadow-lg'
                >
                  {isPending ? 'Signing Up...' : 'Sign Up'}
                </button>

                {/* Divider */}
                <div className='divider text-base-content/40'>or</div>

                {/* Social Login */}
                <button
                  type='button'
                  className='btn btn-outline w-full h-12 hover:scale-[1.02] transition-all duration-300'
                >
                  <svg
                    className='w-5 h-5 mr-2'
                    viewBox='0 0 24 24'
                  >
                    <path
                      fill='currentColor'
                      d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
                    />
                    <path
                      fill='currentColor'
                      d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
                    />
                    <path
                      fill='currentColor'
                      d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
                    />
                    <path
                      fill='currentColor'
                      d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
                    />
                  </svg>
                  Continue with Google
                </button>

                {/* Login Link */}
                <p className='text-center text-base-content/60'>
                  Already have an account?{' '}
                  <Link
                    to='/login'
                    className='link link-primary font-medium hover:text-primary/80 transition-colors'
                  >
                    Sign in here
                  </Link>
                </p>
              </form>
            </div>
          </div>

          {/* Right Side - Image Placeholder */}
          <div className='hidden lg:flex bg-gradient-to-br from-primary/20 to-secondary/20 relative overflow-hidden'>
            {/* Animated Background Elements */}
            <div className='absolute inset-0'>
              <div className='absolute top-1/4 left-1/4 w-32 h-32 bg-primary/10 rounded-full blur-xl animate-pulse'></div>
              <div className='absolute bottom-1/3 right-1/4 w-48 h-48 bg-secondary/10 rounded-full blur-xl animate-pulse delay-1000'></div>
              <div className='absolute top-1/2 right-1/3 w-24 h-24 bg-accent/10 rounded-full blur-xl animate-pulse delay-500'></div>
            </div>

            {/* Content */}
            <div className='relative z-10 flex flex-col justify-center items-center p-12 text-center'>
              <div className='w-64 h-64 bg-base-200/30 rounded-2xl flex items-center justify-center mb-8 backdrop-blur-sm border border-base-300/30'>
                <div className='text-base-content/40'>
                  <img
                    src='../../public/i.png'
                    alt=''
                  />
                </div>
              </div>

              <h2 className='text-3xl font-bold text-base-content/80 mb-4'>
                Welcome to the Future
              </h2>
              <p className='text-base-content/60 text-lg max-w-sm'>
                Join millions of users connecting and sharing in our innovative
                platform
              </p>

              {/* Floating Elements */}
              <div className='absolute top-20 left-20 w-4 h-4 bg-primary rounded-full animate-bounce'></div>
              <div className='absolute bottom-32 left-16 w-3 h-3 bg-secondary rounded-full animate-bounce delay-300'></div>
              <div className='absolute top-40 right-20 w-5 h-5 bg-accent rounded-full animate-bounce delay-700'></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
