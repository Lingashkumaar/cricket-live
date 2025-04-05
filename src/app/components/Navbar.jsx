export default function Navbar() {
    return (
      <header className="bg-blue-600 text-white p-4 rounded-lg shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Cricket Scorecard</h1>
          <div className="flex space-x-4">
            <button className="px-4 py-2 bg-blue-700 rounded hover:bg-blue-800 transition">
              Live Matches
            </button>
            <button className="px-4 py-2 bg-blue-700 rounded hover:bg-blue-800 transition">
              Upcoming
            </button>
            <button className="px-4 py-2 bg-blue-700 rounded hover:bg-blue-800 transition">
              Recent
            </button>
          </div>
        </div>
      </header>
    );
  }