import Link from 'next/link'
import { ReactNode } from 'react'

type FooterItemProps = {
  href: string
  title: ReactNode
}

const FooterItem = ({ href, title, ...props }: FooterItemProps) => (
  <div className="px-5 py-2">
    <Link href={href}>
      <a className="text-base text-gray-500 hover:text-gray-900" {...props}>
        {title}
      </a>
    </Link>
  </div>
)

const menu: FooterItemProps[] = [
  { href: '/about', title: 'About' },
  { href: '/support', title: 'Support' },
  { href: '/', title: 'Open source' },
  { href: '/open', title: 'Open startup' },
  { href: '/', title: 'Analytics' },
]

const submenu: FooterItemProps[] = [
  { href: '/policies/privacy', title: 'Privacy policy' },
  { href: '/policies/terms', title: 'Terms and conditions' },
]

const Footer = () => {
  return (
    <footer>
      <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
        <nav
          className="-mx-5 -my-2 flex flex-wrap justify-center"
          aria-label="Footer"
        >
          {menu.map((item, i) => (
            <FooterItem key={i} href={item.href} title={item.title} />
          ))}
        </nav>
        <nav
          className="-mx-5 -my-2 flex flex-wrap justify-center"
          aria-label="Footer"
        >
          {submenu.map((item, i) => (
            <FooterItem key={i} href={item.href} title={item.title} />
          ))}
        </nav>
        <p className="mt-8 text-center text-base text-gray-400">
          &copy; {new Date().getFullYear()}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
