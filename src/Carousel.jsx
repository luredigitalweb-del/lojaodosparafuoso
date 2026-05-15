import { useEffect, useRef, useState } from 'react'

function GoogleG() {
  return (
    <svg width="22" height="22" viewBox="0 0 48 48">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.3-.1-2.3-.4-3.5z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2c-2 1.5-4.5 2.4-7.2 2.4-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.6 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.1 5.6l6.2 5.2C41.6 35.6 44 30.2 44 24c0-1.3-.1-2.3-.4-3.5z" />
    </svg>
  )
}

export function Carousel({ testimonials }) {
  const trackRef = useRef(null)
  const [page, setPage] = useState(0)
  const [perView, setPerView] = useState(1)

  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth
      if (w >= 1024) setPerView(3)
      else if (w >= 640) setPerView(2)
      else setPerView(1)
    }
    calc()
    window.addEventListener('resize', calc)
    return () => window.removeEventListener('resize', calc)
  }, [])

  const totalPages = Math.max(1, testimonials.length - perView + 1)

  // Auto-play
  useEffect(() => {
    const id = setInterval(() => {
      setPage((p) => (p + 1) % totalPages)
    }, 5000)
    return () => clearInterval(id)
  }, [totalPages])

  // Scroll to current page
  useEffect(() => {
    if (!trackRef.current) return
    const track = trackRef.current
    const card = track.querySelector('[data-card]')
    if (!card) return
    const cardWidth = card.getBoundingClientRect().width + 24 // gap
    track.scrollTo({ left: page * cardWidth, behavior: 'smooth' })
  }, [page, perView])

  const next = () => setPage((p) => (p + 1) % totalPages)
  const prev = () => setPage((p) => (p - 1 + totalPages) % totalPages)

  return (
    <div className="reveal">
      <div className="relative">
        {/* Arrows */}
        <button
          onClick={prev}
          aria-label="Anterior"
          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-6 z-10 w-12 h-12 rounded-full bg-white shadow-xl border border-renew-blue/15 items-center justify-center text-renew-blue hover:bg-renew-blue hover:text-white transition"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
        </button>
        <button
          onClick={next}
          aria-label="Próximo"
          className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-6 z-10 w-12 h-12 rounded-full bg-white shadow-xl border border-renew-blue/15 items-center justify-center text-renew-blue hover:bg-renew-blue hover:text-white transition"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
        </button>

        {/* Track */}
        <div
          ref={trackRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <style>{`
            div::-webkit-scrollbar { display: none; }
          `}</style>
          {testimonials.map((t, i) => (
            <div
              key={i}
              data-card
              className="card p-8 relative snap-start flex-shrink-0"
              style={{ width: `calc((100% - ${(perView - 1) * 24}px) / ${perView})` }}
            >
              <div className="absolute top-6 right-6 w-7 h-7 flex items-center justify-center" title="Avaliação do Google">
                <GoogleG />
              </div>
              <div className="flex text-renew-orange mb-3">★★★★★</div>
              <p className="text-renew-ink leading-relaxed mb-6">{t.text}</p>
              <div className="flex items-center gap-3">
                <div className={`w-11 h-11 rounded-full ${t.grad} flex items-center justify-center text-white font-bold`}>{t.initials}</div>
                <div>
                  <div className="font-bold text-renew-ink">{t.name}</div>
                  <div className="text-xs text-renew-mute">{t.loc}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="flex items-center justify-center gap-2 mt-8">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i)}
            aria-label={`Ir para ${i + 1}`}
            className={`h-2 rounded-full transition-all ${i === page ? 'w-8 bg-renew-blue' : 'w-2 bg-renew-blue/25 hover:bg-renew-blue/50'}`}
          />
        ))}
      </div>

      {/* Bottom Google CTA */}
      <div className="mt-10 text-center">
        <a
          href="https://share.google/BypHWm4AO4mePryBV"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white border border-renew-blue/15 hover:border-renew-blue/40 hover:shadow-lg shadow-renew-blue/10 transition"
        >
          <GoogleG />
          <span className="font-bold text-renew-ink">Ver todas as avaliações no Google</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="text-renew-blue">
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>
  )
}
