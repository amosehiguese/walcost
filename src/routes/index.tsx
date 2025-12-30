import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            WalCost
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Deterministic cost estimator and analyzer for the Walrus decentralized storage protocol
          </p>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-8 border border-gray-700">
            <p className="text-gray-400">
              Coming soon: Quick estimates, analyzer mode, and transparent cost calculations
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
