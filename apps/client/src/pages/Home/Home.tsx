import './Home.module.scss'
import { useEffect, useState } from 'react'

const Home = () => {
  const [gretting, setGretting] = useState('')

  useEffect(() => {
    fetch('/api')
      .then((res) => res.text())
      .then(setGretting)
  }, [])

  return <div>Gritting: {gretting}</div>
}

export default Home
