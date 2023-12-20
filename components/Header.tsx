import { fetchUser } from '@/actions/user.action';
import { SignOutButton, currentUser } from '@clerk/nextjs';
import Link from 'next/link'
import React from 'react'

const Header = async () => {
  const _user = await currentUser();
  if (!_user) return (
    <header className='fixed z-50 w-screen justify-center border-b'>
      <div className='container flex flex-row max-w-5xl justify-between p-5 bg-white dark:bg-black'>
        <div className='flex flex-row gap-3'>
          <Link href="/">
            感想畑
          </Link>
          <a href="https://forms.gle/PrKwapdJXZniqSZs6" target='_blank'>
            お問い合わせはこちら
          </a>
        </div>
        <Link href={`/sign-in`}>
          サインイン
        </Link>
      </div>
    </header>
  )
  const user = await fetchUser(_user.id)
  
  return (
    <header className='fixed z-50 w-screen justify-center border-b'>
      <div className='container flex flex-row max-w-5xl justify-between p-5 bg-white dark:bg-black'>
        <div className='flex flex-row gap-3'>
          <Link href="/">
            感想畑
          </Link>
          <a href="https://forms.gle/PrKwapdJXZniqSZs6" target='_blank'>
            お問い合わせはこちら
          </a>
        </div>
        <div className='flex flex-row gap-3'>
          <Link href={`/user/${user.id}`}>
            マイページ
          </Link>
          <Link href={`/lab/${user.affiliation}`}>
            マイラボ
          </Link>
          <SignOutButton>
            サインアウト
          </SignOutButton>
        </div>
      </div>
    </header>
  )
}

export default Header