import React from 'react'
import {ChatUI} from '@/components/ChatUi'
import { HeroGeometric } from '@/components/ui/shape-landing-hero'
const ChatPage = () => {
  return (
    <div>
        <HeroGeometric className='absolute z-[-1]'/>
        <ChatUI/>
    </div>
  )
}

export default ChatPage