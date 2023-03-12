'use client'
import { Feed } from '../components';
import {Roboto} from '@next/font/google'
import { useSession } from 'next-auth/react';
import { client } from './client';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500']
})

function App(){
  const {status, data: session} = useSession();

  if(status === 'authenticated') {
    localStorage.setItem('user', JSON.stringify(session.user))

    const {id: _id, name, image} = JSON.parse(localStorage.getItem('user'))

    const doc = {
      _id: _id,
      _type: 'user',
      userName: name,
      image: image
    }
    client.createIfNotExists(doc)
  }

  return (
    <main className={roboto.className}>
      <Feed />
    </main>
  )
}

export default App