import { Hero } from 'components/home'
import { Layout } from 'components/layouts'
import { ReactElement } from 'react'

const Home = () => {
  return (
    <div>
      <Hero />
    </div>
  )
}

Home.getLayout = (page: ReactElement) => <Layout>{page}</Layout>

export default Home
