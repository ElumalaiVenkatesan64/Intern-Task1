import { useMemo, useState } from 'react'
import './App.css'

const products = [
  {
    id: 1,
    name: 'Minimal Desk Lamp',
    price: 39,
    image:
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 2,
    name: 'Wireless Headphones',
    price: 129,
    image:
      'https://images.unsplash.com/photo-1518441758890-290f53dbf1b2?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 3,
    name: 'Ceramic Planter',
    price: 24,
    image:
      'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 4,
    name: 'Everyday Backpack',
    price: 89,
    image:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 5,
    name: 'Smart Water Bottle',
    price: 59,
    image:
      'https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 6,
    name: 'Travel Mug',
    price: 19,
    image:
      'https://images.unsplash.com/photo-1481391032119-d89fee407e44?auto=format&fit=crop&w=600&q=80',
  },
]

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortOrder, setSortOrder] = useState('asc')

  const filteredProducts = useMemo(() => {
    const term = searchTerm.trim().toLowerCase()

    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(term)
    )

    return filtered.sort((a, b) =>
      sortOrder === 'asc' ? a.price - b.price : b.price - a.price
    )
  }, [searchTerm, sortOrder])

  const toggleSortOrder = () =>
    setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))

  return (
    <main className="page">
      <header className="hero">
        <div>
          <p className="eyebrow">Curated picks</p>
          <h1>Products you&apos;ll love</h1>
          <p className="subtitle">
            Browse a selection of thoughtfully designed goods for every day.
            Use the search to find a specific item or sort by price.
          </p>
        </div>
        <div className="controls">
          <input
            className="search"
            type="search"
            placeholder="Search products"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
          <button className="sort" onClick={toggleSortOrder}>
            Sort price: {sortOrder === 'asc' ? 'Low → High' : 'High → Low'}
          </button>
        </div>
      </header>

      <section className="products-grid">
        {filteredProducts.length === 0 ? (
          <p className="empty-state">No products match your search.</p>
        ) : (
          filteredProducts.map((product) => (
            <article key={product.id} className="product-card">
              <div className="product-media">
                <img src={product.image} alt={product.name} loading="lazy" />
              </div>
              <div className="product-body">
                <div>
                  <h2>{product.name}</h2>
                  <p className="price">${product.price.toFixed(2)}</p>
                </div>
                <button className="ghost">Quick view</button>
              </div>
            </article>
          ))
        )}
      </section>
    </main>
  )
}

export default App
