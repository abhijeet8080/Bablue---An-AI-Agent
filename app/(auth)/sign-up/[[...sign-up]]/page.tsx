import { HeroGeometric } from '@/components/ui/shape-landing-hero'
import {  SignUp } from '@clerk/nextjs'
import React from 'react'

const SignUpPage = () => {
  return (
    <>
    <main className='flex h-screen w-full items-center justify-center'>
        <HeroGeometric className='absolute z-0'/>
        <SignUp/>
    </main></>
  )
}

export default SignUpPage