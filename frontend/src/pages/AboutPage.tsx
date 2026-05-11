import { ExternalLink } from 'lucide-react'

const techStack = [
  {
    category: 'Frontend',
    items: [
      { name: 'React 18', url: 'https://react.dev/' },
      { name: 'TypeScript', url: 'https://www.typescriptlang.org/' },
      { name: 'Vite', url: 'https://vitejs.dev/' },
      { name: 'Tailwind CSS', url: 'https://tailwindcss.com/' },
      { name: 'React Router', url: 'https://reactrouter.com/' },
      { name: 'Axios', url: 'https://axios-http.com/' },
      { name: 'Lucide Icons', url: 'https://lucide.dev/' },
    ],
  },
  {
    category: 'Backend',
    items: [
      { name: 'Python', url: 'https://www.python.org/' },
      { name: 'Django', url: 'https://www.djangoproject.com/' },
      { name: 'Django REST Framework', url: 'https://www.django-rest-framework.org/' },
      { name: 'SQLite', url: 'https://www.sqlite.org/' },
    ],
  },
]

export function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-foreground mb-4">
          About This Project
        </h1>
        <p className="text-muted-foreground text-lg mb-8">
          This is a modern full-stack application demonstrating the integration
          between a React frontend and a Django REST API backend.
        </p>

        {/* Tech Stack */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-6">
            Tech Stack
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {techStack.map((stack) => (
              <div
                key={stack.category}
                className="bg-card rounded-xl border border-border p-6"
              >
                <h3 className="text-lg font-semibold text-card-foreground mb-4">
                  {stack.category}
                </h3>
                <ul className="space-y-2">
                  {stack.items.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                      >
                        {item.name}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* How to Run */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-6">
            How to Run
          </h2>
          <div className="bg-card rounded-xl border border-border p-6 space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-card-foreground mb-3">
                1. Start the Django Backend
              </h3>
              <pre className="bg-secondary rounded-lg p-4 text-sm text-foreground overflow-x-auto">
                <code>{`cd backend
source venv/bin/activate
python manage.py runserver`}</code>
              </pre>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-card-foreground mb-3">
                2. Start the React Frontend
              </h3>
              <pre className="bg-secondary rounded-lg p-4 text-sm text-foreground overflow-x-auto">
                <code>{`cd frontend
npm run dev`}</code>
              </pre>
            </div>
            <p className="text-muted-foreground text-sm">
              The frontend runs on port 5173 and proxies API requests to the
              Django backend on port 8000.
            </p>
          </div>
        </section>

        {/* API Endpoints */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-6">
            API Endpoints
          </h2>
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-secondary">
                  <th className="text-left px-4 py-3 font-medium text-card-foreground">
                    Method
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-card-foreground">
                    Endpoint
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-card-foreground">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 rounded bg-accent/20 text-accent text-xs font-medium">
                      GET
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground font-mono">
                    /api/items/
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    List all items
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 rounded bg-primary/20 text-primary text-xs font-medium">
                      POST
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground font-mono">
                    /api/items/
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    Create new item
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 rounded bg-accent/20 text-accent text-xs font-medium">
                      GET
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground font-mono">
                    /api/items/:id/
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    Get single item
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 rounded bg-yellow-500/20 text-yellow-500 text-xs font-medium">
                      PUT
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground font-mono">
                    /api/items/:id/
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    Update item
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 rounded bg-destructive/20 text-destructive text-xs font-medium">
                      DELETE
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground font-mono">
                    /api/items/:id/
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    Delete item
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  )
}
