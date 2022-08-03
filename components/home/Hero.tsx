import Link from 'next/link'

const Hero = () => {
  return (
    <div className="mt-16 mx-auto max-w-7xl px-4 sm:mt-24">
      <div className="text-center">
        <h1 className="text-3xl tracking-tight font-extrabold sm:text-5xl md:text-6xl">
          <span className="block text-gray-600">The reverse job board for</span>
          <span className="block text-gray-800">React developers</span>
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          <code className="text-gray-900 font-semibold">reactui.dev</code>{' '}
          <span>
            empowers independent developers available for their next gig.
          </span>
          <span className="md:block">
            Stop scouring job boards and sit back as companies reach out to you
            first.
          </span>
        </p>
        <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
          <div className="rounded-md shadow">
            <Link href="/">
              <a className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 md:py-4 md:text-lg md:px-10">
                Get started
              </a>
            </Link>
          </div>
          <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
            <Link href="/">
              <a className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-gray-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10">
                Learn more
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
