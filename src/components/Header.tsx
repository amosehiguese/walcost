import { Link } from '@tanstack/react-router'

export default function Header() {
  return (
    <header className="p-4 bg-gray-800 text-white shadow-lg">
      <div className="container mx-auto">
        <h1 className="text-xl font-semibold">
          <Link to="/" className="hover:text-cyan-400 transition-colors">
            WalCost
          </Link>
        </h1>
      </div>
    </header>
  )
}
