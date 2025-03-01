import { HeroGeometric } from '@/components/ui/shape-landing-hero'
import { SignIn } from '@clerk/nextjs'
import React from 'react'

const SignInPage = () => {
  return (
    <main className='flex h-screen w-full  items-center justify-center '>
        <HeroGeometric className='absolute z-0'/>

        <SignIn />
    </main>
  )
}

export default SignInPage