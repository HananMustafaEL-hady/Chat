import type { NextPage } from 'next'
import { UserAuth } from '../components/userAuth'

const Home: NextPage = () => {

  return (
    <div className="container">
      <UserAuth />
    </div>
  )
}

export default Home
