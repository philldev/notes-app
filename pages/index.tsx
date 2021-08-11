import Link from 'next/link';

export default function Home() {
	return (
		<div className='w-full max-w-2xl py-8 mx-auto'>
      <Link href='/docs/buttons'>
        <a>button docs</a>
      </Link>
    </div>
	)
}
