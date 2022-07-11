import { useRouter } from 'next/router'
import Link from 'next/link'
import Container from './container'

function Header() {
  const router = useRouter()

  return (
    <header className="py-6 text-yellow-800 select-none">
      <Container>
        <nav className="flex space-x-4">
          <h2 className="font-bold min-w-fit">Pasta Quiz</h2>
          <Link href="/">
            <a className={`${router.pathname === "/" ? "underline" : ""}`}>
              Play
            </a>
          </Link>
          <Link href="/learn">
            <a className={`${router.pathname === "/learn" ? "underline" : ""}`}>
              Learn
            </a>
          </Link>
          <Link href="/leaderboard">
            <a className={`${router.pathname === "/leaderboard" ? "underline" : ""}`}>
              Leaderboard
            </a>
          </Link>
        </nav>
      </Container>
    </header>
  )
}

export default Header