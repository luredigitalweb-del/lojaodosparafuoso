import { useEffect, useState } from 'react'
import { Iphone16Pro } from './Iphone16Pro.jsx'
import { Carousel } from './Carousel.jsx'

const WHATSAPP_HREF = 'https://wa.me/5516999862686?text=Olá!%20Quero%20um%20orçamento%20da%20Renew.'
const WPP_ICON = '/whatsapp.png'
const LOGO = '/logo.png'

function WppIcon({ size = 18 }) {
  return (
    <img
      src={WPP_ICON}
      alt="WhatsApp"
      style={{ width: `${size}px`, height: `${size}px`, display: 'inline-block', objectFit: 'contain' }}
    />
  )
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12l5 5L20 7" />
    </svg>
  )
}

function enviarFormulario(e) {
  e.preventDefault()
  const f = e.target
  const nome = f.nome.value.trim()
  const tel = f.telefone.value.trim()
  const veiculo = f.veiculo.value.trim()
  const servico = f.servico.value
  const msg = f.mensagem.value.trim()
  let texto = `Olá, sou o(a) *${nome}*!%0A%0A`
  texto += `📱 WhatsApp: ${tel}%0A`
  texto += `🚗 Veículo: ${veiculo}%0A`
  texto += `🔧 Serviço: ${servico}%0A`
  if (msg) texto += `%0A💬 ${msg}%0A`
  texto += `%0AGostaria de solicitar um orçamento.`
  window.open(`https://wa.me/5516999862686?text=${texto}`, '_blank')
  return false
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('visible')
          io.unobserve(e.target)
        }
      })
    }, { threshold: 0.12 })
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  const year = new Date().getFullYear()

  return (
    <>
      {/* ===== NAVBAR ===== */}
      <header id="navbar" className="navbar-blur fixed top-0 inset-x-0 z-50">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center" onClick={() => setMenuOpen(false)}>
            <img src={LOGO} alt="Renew" className="h-10 w-auto" />
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-renew-ink/80">
            <a href="#servicos" className="hover:text-renew-blue transition">Serviços</a>
            <a href="#diferenciais" className="hover:text-renew-blue transition">Diferenciais</a>
            <a href="#depoimentos" className="hover:text-renew-blue transition">Avaliações</a>
            <a href="#seguradoras" className="hover:text-renew-blue transition">Seguradoras</a>
            <a href="#contato" className="hover:text-renew-blue transition">Contato</a>
          </nav>
          <div className="flex items-center gap-2">
            <a
              href="https://wa.me/5516999862686?text=Olá!%20Gostaria%20de%20um%20orçamento%20da%20Renew."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold"
            >
              <WppIcon size={16} />
              Orçamento
            </a>
            {/* Hamburger button — mobile only */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={menuOpen}
              className="md:hidden relative w-11 h-11 rounded-xl bg-renew-blue/8 hover:bg-renew-blue/15 flex items-center justify-center text-renew-blue transition"
            >
              <span className="relative w-5 h-4 flex flex-col justify-between">
                <span className={`block h-0.5 w-full bg-current rounded-full transition-all ${menuOpen ? 'translate-y-[7px] rotate-45' : ''}`}></span>
                <span className={`block h-0.5 w-full bg-current rounded-full transition-all ${menuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                <span className={`block h-0.5 w-full bg-current rounded-full transition-all ${menuOpen ? '-translate-y-[7px] -rotate-45' : ''}`}></span>
              </span>
            </button>
          </div>
        </div>

        {/* Mobile menu drawer */}
        <div
          className={`md:hidden fixed inset-x-0 top-16 bottom-0 transition-all duration-300 ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
          style={{ background: 'rgba(11,18,32,0.55)', backdropFilter: 'blur(6px)' }}
          onClick={() => setMenuOpen(false)}
        >
          <div
            className={`bg-white border-t border-renew-blue/10 shadow-2xl transition-transform duration-300 ${menuOpen ? 'translate-y-0' : '-translate-y-full'}`}
            onClick={(e) => e.stopPropagation()}
          >
            <nav className="max-w-7xl mx-auto px-5 py-6 flex flex-col">
              {[
                { href: '#servicos', label: 'Serviços' },
                { href: '#diferenciais', label: 'Diferenciais' },
                { href: '#depoimentos', label: 'Avaliações' },
                { href: '#seguradoras', label: 'Seguradoras' },
                { href: '#contato', label: 'Contato' },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between py-4 border-b border-renew-blue/8 text-renew-ink font-semibold text-lg hover:text-renew-blue transition"
                >
                  {item.label}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="text-renew-blue/40">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </a>
              ))}
              <a
                href="https://wa.me/5516999862686?text=Olá!%20Gostaria%20de%20um%20orçamento%20da%20Renew."
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                className="btn-primary mt-6 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full font-bold"
              >
                <WppIcon size={18} />
                SOLICITAR ORÇAMENTO
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* ===== HERO ===== */}
      <section className="relative pt-28 pb-20 lg:pt-36 lg:pb-28 overflow-hidden text-white">
        {/* Background layers */}
        <div className="absolute inset-0 ribbon-bg"></div>
        <div className="absolute inset-0 grid-pattern opacity-20"></div>
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-renew-cyan/20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full bg-renew-orange/20 blur-3xl"></div>
        <div className="light-sweep"></div>

        <div className="relative max-w-7xl mx-auto px-5 lg:px-8 grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left — content */}
          <div className="lg:col-span-7 reveal text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-semibold tracking-wider uppercase mb-6 backdrop-blur">
              <span className="w-1.5 h-1.5 rounded-full bg-renew-orange animate-pulse"></span>
              Premium · 30 anos em Ribeirão Preto
            </div>

            <h1 className="display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl mb-6 leading-[0.95]">
              Seu carro<br />
              <span className="shimmer">como novo.</span><br />
              <span className="text-white/90">Sem compromisso.</span>
            </h1>

            <p className="text-lg lg:text-xl text-white/80 max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
              Funilaria e pintura com tecnologia <strong className="text-white">PPG</strong>, cabine pressurizada e laboratório tintométrico próprio. Atendemos <strong className="text-white">todas as seguradoras</strong>.
            </p>

            <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-8">
              <a
                href="https://wa.me/5516999862686?text=Olá!%20Quero%20solicitar%20um%20orçamento."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2 px-7 py-4 rounded-full font-bold text-base"
              >
                <WppIcon size={20} />
                ORÇAMENTO GRÁTIS
              </a>
              <a href="#servicos" className="btn-ghost-blue inline-flex items-center gap-2 px-7 py-4 rounded-full font-semibold text-base">
                Ver serviços
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </a>
            </div>

            {/* Inline trust */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 justify-center lg:justify-start text-sm text-white/85">
              <div className="flex items-center gap-2">
                <div className="flex text-renew-orange">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01z" />
                    </svg>
                  ))}
                </div>
                <span><strong className="text-white">4.9</strong> no Google</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-white/40 hidden sm:inline-block"></span>
                <span><strong className="text-white">+2.500</strong> carros restaurados</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-white/40 hidden sm:inline-block"></span>
                <span>Atendemos até <strong className="text-white">70km</strong></span>
              </div>
            </div>
          </div>

          {/* Right — visual showcase */}
          <div className="lg:col-span-5 reveal">
            <div className="relative">
              {/* Glow */}
              <div className="absolute -inset-6 bg-gradient-to-br from-renew-cyan/40 to-renew-orange/30 rounded-[2rem] blur-3xl"></div>

              {/* Main card */}
              <div className="relative rounded-[2rem] overflow-hidden border-2 border-white/15 shadow-2xl shadow-black/50 aspect-[4/5]">
                <img src="/fachada.png" alt="Fachada Renew" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-renew-deep via-renew-deep/30 to-transparent"></div>

                {/* Logo overlay */}
                <div className="absolute top-6 left-6 right-6 flex items-start justify-between">
                  <img src={LOGO} alt="Renew" className="h-14 drop-shadow-xl" />
                  <div className="px-3 py-1.5 rounded-full bg-renew-orange text-white text-xs font-black tracking-wider shadow-lg">
                    30 ANOS
                  </div>
                </div>

                {/* Bottom info */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="display text-3xl lg:text-4xl text-white leading-none mb-2">
                    Sua oficina<br /><span className="shimmer">premium.</span>
                  </div>
                  <div className="text-white/70 text-sm">Av. Dr. Antonio Barbosa Filho, 1160</div>
                </div>
              </div>

              {/* Floating badge — PPG */}
              <div className="absolute -left-4 lg:-left-8 top-12 bg-white text-renew-ink rounded-2xl p-3 pr-4 shadow-2xl shadow-black/30 flex items-center gap-3 max-w-[180px] animate-pulse" style={{ animationDuration: '3s' }}>
                <div className="w-10 h-10 rounded-xl grad-blue flex items-center justify-center flex-shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5L20 7" /></svg>
                </div>
                <div>
                  <div className="display text-sm leading-none">Tinta PPG</div>
                  <div className="text-[10px] text-renew-mute">Base d'água</div>
                </div>
              </div>

              {/* Floating badge — Google rating */}
              <div className="absolute -right-2 lg:-right-6 bottom-24 bg-white text-renew-ink rounded-2xl p-3 pr-4 shadow-2xl shadow-black/30 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center flex-shrink-0">
                  <svg width="22" height="22" viewBox="0 0 48 48">
                    <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.3-.1-2.3-.4-3.5z" />
                    <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
                    <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2c-2 1.5-4.5 2.4-7.2 2.4-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.6 39.6 16.2 44 24 44z" />
                    <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.1 5.6l6.2 5.2C41.6 35.6 44 30.2 44 24c0-1.3-.1-2.3-.4-3.5z" />
                  </svg>
                </div>
                <div>
                  <div className="display text-sm leading-none">⭐ 4.9 / 5</div>
                  <div className="text-[10px] text-renew-mute">Avaliações Google</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== WHY TRUST RENEW ===== */}
      <section className="relative overflow-hidden bg-white">
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-renew-cyan/5 blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-renew-orange/5 blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-5 lg:px-8 py-20 lg:py-28">
          <div className="text-center mb-16 reveal max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-renew-blue/8 text-renew-blue text-xs font-bold uppercase tracking-widest mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-renew-blue"></span>
              Por que confiar na Renew
            </div>
            <h2 className="display text-4xl lg:text-5xl xl:text-6xl leading-tight text-renew-ink">
              Tecnologia, experiência e <span className="shimmer-blue">confiança</span> em um só lugar.
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                title: '30 Anos de Experiência',
                desc: 'Tradição e autoridade que poucos têm no mercado automotivo da região.',
                svg: <path d="M12 2l3 6 6 .9-4.5 4.4 1 6.7L12 17l-5.5 3 1-6.7L3 8.9 9 8z" />,
              },
              {
                title: "Pintura PPG Base d'água",
                desc: 'Sistema premium ecológico com fidelidade total de cor e durabilidade.',
                svg: <path d="M12 2C9 6 7 9 7 13a5 5 0 0010 0c0-4-2-7-5-11z" />,
              },
              {
                title: 'Cabine Pressurizada',
                desc: 'Ambiente controlado para acabamento sem imperfeições, pó ou contaminação.',
                svg: <><path d="M3 21V8l9-5 9 5v13" /><path d="M9 21v-6h6v6" /></>,
              },
              {
                title: 'Laboratório Tintométrico',
                desc: 'Cor exata da fábrica reproduzida no nosso laboratório próprio.',
                svg: <path d="M9 3h6v4l4 2v9a3 3 0 01-3 3H8a3 3 0 01-3-3V9l4-2V3z" />,
              },
              {
                title: 'Todas as Seguradoras',
                desc: 'Atendemos qualquer companhia, mesmo sem credenciamento oficial.',
                svg: <><path d="M5 17h14l-1.5-5h-11z" /><circle cx="8" cy="17" r="1.5" /><circle cx="16" cy="17" r="1.5" /></>,
              },
              {
                title: 'Parcelamento no Cartão',
                desc: 'Facilidade no pagamento sem comprometer o orçamento da família.',
                svg: <><rect x="3" y="6" width="18" height="12" rx="2" /><path d="M3 10h18" /></>,
              },
            ].map((it, i) => (
              <div
                key={i}
                className="reveal group bg-white rounded-2xl p-8 lg:p-10 text-center border border-renew-blue/10 hover:border-renew-blue/30 hover:-translate-y-2 transition shadow-sm hover:shadow-2xl hover:shadow-renew-blue/15"
              >
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-renew-blue/8 flex items-center justify-center group-hover:bg-renew-blue/15 group-hover:scale-110 transition">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0050FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {it.svg}
                  </svg>
                </div>
                <h3 className="display text-2xl lg:text-3xl text-renew-ink leading-tight mb-4">{it.title}</h3>
                <p className="text-renew-mute leading-relaxed">{it.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section id="servicos" className="py-24 lg:py-32 bg-white relative overflow-hidden">
        <div className="absolute top-1/3 -right-20 w-96 h-96 rounded-full bg-renew-cyan/5 blur-3xl"></div>
        <div className="absolute bottom-1/3 -left-20 w-96 h-96 rounded-full bg-renew-orange/5 blur-3xl"></div>
        <div className="relative max-w-7xl mx-auto px-5 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16 reveal">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-renew-blue/8 text-renew-blue text-xs font-bold uppercase tracking-widest mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-renew-blue"></span>
              Nossos Serviços
            </div>
            <h2 className="display text-5xl lg:text-6xl mb-5">
              Tudo o que seu carro precisa, <span className="shimmer-blue">no mesmo lugar.</span>
            </h2>
            <p className="text-lg text-renew-mute">
              Cinco especialidades premium executadas por uma equipe certificada, em ambiente controlado.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { img: '/funilariaepintura.png', tag: '01 · ESTRUTURAL', title: 'Funilaria e Pintura', desc: 'Reparos estruturais com acabamento de concessionária. Cabine pressurizada e tinta PPG.', chips: ['PPG', 'Cabine pressurizada'], chipColor: 'blue' },
              { img: '/parachoque.png', tag: '02 · REPARO', title: 'Reparo de Para-choque', desc: 'Restauração completa sem necessidade de troca. Resultado como peça nova.', chips: ['Sem troca', 'Econômico'], chipColor: 'orange' },
              { img: '/martelinhodeouro.png', tag: '03 · PRECISÃO', title: 'Martelinho de Ouro', desc: 'Remoção de amassados sem pintura. Rápido, preciso e sem danificar o acabamento original.', chips: ['Sem pintura', 'Entrega rápida'], chipColor: 'blue' },
              { img: '/micropintura.png', tag: '04 · DETALHE', title: 'Micro Pintura', desc: 'Correção cirúrgica de riscos, lascas e manchas localizadas.', chips: ['Localizada', 'Sem repintar'], chipColor: 'orange' },
              { img: '/cristalizacao.png', tag: '05 · PROTEÇÃO', title: 'Cristalização e Vitrificação', desc: 'Proteção de longa duração para a pintura. Brilho intenso e resistência a intempéries.', chips: ['Longa duração', 'Brilho intenso'], chipColor: 'blue' },
            ].map((s, i) => (
              <div key={i} className="card group reveal relative overflow-hidden">
                <div className="aspect-[16/10] relative overflow-hidden bg-renew-deep">
                  <img src={s.img} alt={s.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/20 backdrop-blur text-white text-xs font-bold tracking-wider">{s.tag}</div>
                </div>
                <div className="p-7">
                  <h3 className="display text-3xl mb-2 text-renew-ink">{s.title}</h3>
                  <p className="text-renew-mute leading-relaxed mb-4">{s.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {s.chips.map((c) => (
                      <span
                        key={c}
                        className={`text-xs font-semibold px-2.5 py-1 rounded-md ${s.chipColor === 'blue' ? 'bg-renew-blue/8 text-renew-blue' : 'bg-renew-orange/10 text-renew-orange-deep'}`}
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {/* CTA card */}
            <div className="card reveal relative overflow-hidden ribbon-bg text-white border-0">
              <div className="absolute inset-0 grid-pattern opacity-20"></div>
              <div className="absolute -right-12 -bottom-12 w-48 h-48 rounded-full bg-renew-orange/40 blur-3xl"></div>
              <div className="relative z-10 p-8 h-full flex flex-col justify-between min-h-[380px]">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-xs font-bold tracking-wider uppercase mb-5">
                    <span className="w-1.5 h-1.5 rounded-full bg-renew-orange animate-pulse"></span>
                    Resposta em minutos
                  </div>
                  <h3 className="display text-4xl mb-3 leading-none">Não sabe qual serviço você precisa?</h3>
                  <p className="text-white/85">Mande uma foto pelo WhatsApp. Nossos especialistas avaliam e te enviam o orçamento sem compromisso.</p>
                </div>
                <a
                  href="https://wa.me/5516999862686?text=Olá!%20Gostaria%20de%20uma%20avaliação."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm self-start mt-6"
                >
                  <WppIcon size={18} />
                  ENVIAR FOTO PELO WHATSAPP
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== WHY RENEW ===== */}
      <section id="diferenciais" className="py-24 lg:py-32 ribbon-bg text-white relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-5 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
          <div className="reveal text-center lg:text-left">
            <div className="text-renew-cyan text-sm font-bold uppercase tracking-widest mb-3">Por que Renew?</div>
            <h2 className="display text-5xl lg:text-6xl mb-6">
              Não é só conserto.<br />É o seu carro <span className="shimmer">devolvido ao original</span> — ou melhor.
            </h2>
            <p className="text-lg text-white/80 mb-10">A combinação rara de tecnologia industrial com cuidado artesanal.</p>

            <ul className="space-y-4 text-left max-w-md mx-auto lg:max-w-none lg:mx-0">
              {[
                <><strong>30 anos</strong> de atuação e credibilidade comprovada</>,
                <>Sistema de Pintura <strong>PPG a base d'água</strong> (ecológico, alta fidelidade de cor)</>,
                <><strong>Laboratório Tintométrico próprio</strong> — cor perfeita garantida</>,
                <><strong>Cabine de pintura pressurizada</strong> — zero imperfeições</>,
                <>Equipe treinada e certificada</>,
                <>Atende <strong>todas as seguradoras</strong> (mesmo sem credenciamento)</>,
                <>Parcelamento no cartão</>,
                <>Pontualidade e agilidade na entrega</>,
              ].map((node, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="check-mark mt-0.5"><CheckIcon /></span>
                  <span className="text-white/90">{node}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="reveal">
            <div className="relative">
              <div className="absolute -inset-6 bg-renew-cyan/20 rounded-3xl blur-3xl"></div>
              <div className="relative rounded-3xl overflow-hidden border border-white/15 shadow-2xl shadow-black/40">
                <img src="/fachada.png" alt="Fachada Renew Funilaria e Pintura" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-renew-deep/70 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur text-white text-xs font-bold tracking-wider uppercase mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-renew-orange"></span>
                    Nossa Sede
                  </div>
                  <div className="display text-3xl text-white leading-tight">Ribeirão Preto/SP</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== INSURANCE ===== */}
      <section id="seguradoras" className="py-24 lg:py-32 bg-white relative overflow-hidden">
        <div className="absolute -top-32 -right-20 w-96 h-96 rounded-full bg-renew-cyan/5 blur-3xl"></div>
        <div className="absolute -bottom-32 -left-20 w-96 h-96 rounded-full bg-renew-orange/5 blur-3xl"></div>
        <div className="relative max-w-7xl mx-auto px-5 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 reveal text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-renew-blue/8 text-renew-blue text-xs font-bold uppercase tracking-widest mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-renew-blue"></span>
                Seguradoras
              </div>
              <h2 className="display text-5xl lg:text-6xl mb-5 text-renew-ink">
                Seu seguro cobre.<br /><span className="shimmer">A Renew atende.</span>
              </h2>
              <p className="text-lg text-renew-mute mb-8">
                Trabalhamos com <strong className="text-renew-ink">todas as companhias de seguro</strong> — mesmo que não sejamos da rede credenciada. Fale com a gente <em>antes</em> de levar seu carro onde mandam.
              </p>
              <a
                href="https://wa.me/5516999862686?text=Olá!%20Quero%20verificar%20se%20meu%20seguro%20cobre%20na%20Renew."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2 px-7 py-4 rounded-full font-bold"
              >
                VERIFICAR MEU SEGURO NO WHATSAPP
              </a>
            </div>
            <div className="lg:col-span-6 reveal">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {['PORTO', 'BRADESCO', 'ALLIANZ', 'ZURICH', 'HDI', 'LIBERTY', 'SOMPO', 'MAPFRE', '+ TODAS'].map((p) => (
                  <div
                    key={p}
                    className="bg-white border border-renew-blue/15 rounded-2xl py-5 px-4 flex items-center justify-center text-renew-mute font-bold tracking-wider hover:text-renew-blue hover:border-renew-blue/40 hover:-translate-y-1 hover:shadow-lg hover:shadow-renew-blue/10 transition"
                  >
                    {p}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SOCIAL MEDIA ===== */}
      <section className="relative overflow-hidden bg-renew-ink text-white py-24 lg:py-32">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(60% 80% at 50% 50%, rgba(0,80,255,0.25) 0%, transparent 70%), linear-gradient(180deg, #0B1220 0%, #001A5C 100%)' }}></div>
        <div className="absolute inset-0 grid-pattern opacity-15"></div>
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-renew-orange/15 blur-3xl"></div>
        <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full bg-renew-cyan/15 blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-5 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — content */}
          <div className="reveal text-center lg:text-left order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-bold uppercase tracking-widest mb-5 backdrop-blur">
              <span className="w-1.5 h-1.5 rounded-full bg-renew-orange animate-pulse"></span>
              Redes Sociais
            </div>

            <h2 className="display text-5xl lg:text-6xl xl:text-7xl mb-6 leading-tight">
              Acompanhe nossos<br /><span className="shimmer">trabalhos no dia a dia.</span>
            </h2>

            <p className="text-lg text-white/80 mb-10 max-w-lg mx-auto lg:mx-0">
              Antes e depois, bastidores, dicas exclusivas e conteúdos sobre cuidado automotivo. Siga a Renew nas redes e veja a diferença que 30 anos de paixão fazem.
            </p>

            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              <a
                href="https://instagram.com/renew.premium"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-6 py-3.5 rounded-full text-white font-bold text-sm shadow-2xl hover:scale-105 transition"
                style={{ background: 'linear-gradient(135deg, #FFB13D 0%, #DD2A7B 50%, #8134AF 100%)' }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="white" stroke="none" />
                </svg>
                @renew.premium
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
              </a>

              <a
                href="https://wa.me/5516999862686"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-[#25D366] text-white font-bold text-sm shadow-2xl hover:scale-105 transition"
              >
                <WppIcon size={20} />
                WhatsApp
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
              </a>
            </div>
          </div>

          {/* Right — iPhone mockup */}
          <div className="reveal order-1 lg:order-2 flex justify-center">
            <div className="relative">
              <div className="absolute -inset-12 bg-gradient-to-br from-renew-orange/30 via-renew-cyan/30 to-renew-orange/30 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }}></div>
              <div className="relative">
                <Iphone16Pro src="/instagram.png" width={300} height={600} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== LOCATION ===== */}
      <section id="contato" className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <div className="reveal text-center lg:text-left">
            <div className="text-renew-blue text-sm font-bold uppercase tracking-widest mb-3">Localização e Contato</div>
            <h2 className="display text-5xl lg:text-6xl mb-6">
              Venha nos visitar<br /><span className="grad-text">em Ribeirão Preto.</span>
            </h2>

            <div className="space-y-5 mb-8 text-left max-w-md mx-auto lg:max-w-none lg:mx-0">
              <div className="flex items-start gap-4">
                <div className="icon-tile flex-shrink-0">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <div className="font-bold text-renew-ink">Endereço</div>
                  <div className="text-renew-mute">Av. Dr. Antonio Barbosa Filho, 1160<br />Ribeirão Preto/SP — CEP 14405-000</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="icon-tile flex-shrink-0">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 2" />
                  </svg>
                </div>
                <div>
                  <div className="font-bold text-renew-ink">Horário</div>
                  <div className="text-renew-mute">Segunda a Sexta · 08:00 às 18:00</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="icon-tile flex-shrink-0">
                  <WppIcon size={22} />
                </div>
                <div>
                  <div className="font-bold text-renew-ink">WhatsApp</div>
                  <a href="https://wa.me/5516999862686" className="text-renew-blue font-semibold hover:underline">(16) 99986-2686</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="icon-tile flex-shrink-0">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
                  </svg>
                </div>
                <div>
                  <div className="font-bold text-renew-ink">Instagram</div>
                  <a href="https://instagram.com/renew.premium" target="_blank" rel="noopener noreferrer" className="text-renew-blue font-semibold hover:underline">@renew.premium</a>
                </div>
              </div>
            </div>
          </div>

          <div className="reveal">
            <div className="rounded-3xl overflow-hidden border border-renew-blue/15 shadow-xl shadow-renew-blue/10">
              <iframe
                title="Mapa Renew"
                src="https://www.google.com/maps?q=Av.+Dr.+Antonio+Barbosa+Filho,+1160,+Ribeirão+Preto,+SP&output=embed"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS (carousel) ===== */}
      <section id="depoimentos" className="py-24 lg:py-32 bg-white relative overflow-hidden">
        <div className="absolute top-1/2 -left-32 w-96 h-96 rounded-full bg-renew-cyan/5 blur-3xl"></div>
        <div className="absolute top-1/2 -right-32 w-96 h-96 rounded-full bg-renew-orange/5 blur-3xl"></div>
        <div className="relative max-w-7xl mx-auto px-5 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12 reveal">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-renew-blue/8 text-renew-blue text-xs font-bold uppercase tracking-widest mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-renew-blue"></span>
              Prova Social
            </div>
            <h2 className="display text-5xl lg:text-6xl mb-5">
              O que nossos clientes dizem <span className="grad-text">após receber o carro.</span>
            </h2>
            <div className="flex items-center justify-center gap-3 mt-6">
              <div className="flex text-renew-orange">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01z" />
                  </svg>
                ))}
              </div>
              <span className="font-bold text-renew-ink">4.9 / 5</span>
              <span className="text-renew-mute text-sm">·</span>
              <a href="https://share.google/BypHWm4AO4mePryBV" target="_blank" rel="noopener noreferrer" className="text-renew-blue text-sm font-semibold hover:underline">
                Ver no Google →
              </a>
            </div>
          </div>

          {/* Carousel */}
          <Carousel testimonials={[
            { initials: 'RM', grad: 'grad-blue', name: 'Ricardo Moreira', loc: 'Ribeirão Preto · há 2 meses', text: '"Levei o carro depois de uma batida feia e voltou impecável. Cor perfeita, acabamento de fábrica. Equipe profissional e atenciosa do começo ao fim."' },
            { initials: 'CS', grad: 'grad-orange', name: 'Camila Silveira', loc: 'Sertãozinho · há 1 mês', text: '"Minha seguradora indicou outra oficina, mas escolhi a Renew e não me arrependi. Trabalho de altíssimo nível e pontualidade rara nesse setor."' },
            { initials: 'JP', grad: 'grad-blue', name: 'João Paulo Nogueira', loc: 'Cravinhos · há 3 meses', text: '"30 anos de mercado se justificam. Martelinho de ouro perfeito, sem repintura, sem marcas. Indico de olhos fechados."' },
            { initials: 'AF', grad: 'grad-orange', name: 'Ana Fernandes', loc: 'Ribeirão Preto · há 2 semanas', text: '"Atendimento humanizado e preço justo. Fizeram a micro pintura em uma manhã e o resultado ficou imperceptível. Equipe de outro nível."' },
            { initials: 'EM', grad: 'grad-blue', name: 'Eduardo Martins', loc: 'Bonfim Paulista · há 4 meses', text: '"Já levei dois carros lá. Cristalização durou meses, brilho impressionante. Recomendo pra quem cuida do carro como se fosse filho."' },
            { initials: 'PL', grad: 'grad-orange', name: 'Patrícia Lima', loc: 'Pradópolis · há 5 meses', text: '"Bati o carro na rodovia e a Renew resolveu direto com a seguradora. Não tive dor de cabeça nenhuma. Voltou melhor que era antes."' },
          ]} />
        </div>
      </section>


      {/* ===== FINAL CTA ===== */}
      <section className="py-24 lg:py-32 ribbon-bg text-white relative overflow-hidden">
        <div className="light-sweep"></div>
        <div className="absolute inset-0 grid-pattern opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-5 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="reveal text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-semibold tracking-wider uppercase mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-renew-orange animate-pulse"></span>
              Atendemos até 70 km de Ribeirão Preto
            </div>
            <h2 className="display text-5xl lg:text-6xl xl:text-7xl mb-6">
              Peça seu orçamento agora.<br /><span className="shimmer">Rápido, sem compromisso.</span>
            </h2>
            <p className="text-lg lg:text-xl text-white/85 mb-8">
              Com quem entende do assunto há 30 anos. Resposta em minutos pelo WhatsApp ou pelo formulário ao lado.
            </p>

            <div className="space-y-3 mb-8 max-w-md mx-auto lg:mx-0 text-left">
              {['Sem custo, sem compromisso', 'Atendimento em até 1 hora', 'Atendemos todas as seguradoras'].map((t) => (
                <div key={t} className="flex items-center gap-3">
                  <span className="check-mark flex-shrink-0"><CheckIcon /></span>
                  <span className="text-white/90">{t}</span>
                </div>
              ))}
            </div>

            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white/90 hover:text-white font-semibold border-b border-white/30 hover:border-white/80 transition pb-1"
            >
              <WppIcon size={18} />
              Prefere WhatsApp? Clique aqui
            </a>
          </div>

          {/* Form card */}
          <div className="reveal">
            <div className="relative">
              <div className="absolute -inset-4 bg-renew-cyan/20 rounded-3xl blur-2xl"></div>
              <form
                className="relative bg-white rounded-3xl p-8 lg:p-10 shadow-2xl shadow-black/40 text-renew-ink"
                onSubmit={enviarFormulario}
              >
                <div className="mb-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-renew-blue/8 text-renew-blue text-xs font-bold uppercase tracking-widest mb-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-renew-blue"></span>
                    Solicitar Orçamento
                  </div>
                  <h3 className="display text-3xl lg:text-4xl text-renew-ink leading-tight">Conte sobre seu carro.</h3>
                  <p className="text-renew-mute text-sm mt-2">Respondemos em poucos minutos durante o horário comercial.</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-renew-mute mb-2">Nome completo</label>
                    <input
                      type="text"
                      name="nome"
                      required
                      placeholder="Como podemos te chamar?"
                      className="w-full px-4 py-3 rounded-xl border border-renew-blue/15 bg-renew-soft focus:bg-white focus:border-renew-blue focus:outline-none focus:ring-4 focus:ring-renew-blue/10 transition text-sm"
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-renew-mute mb-2">WhatsApp</label>
                      <input
                        type="tel"
                        name="telefone"
                        required
                        placeholder="(16) 99999-9999"
                        className="w-full px-4 py-3 rounded-xl border border-renew-blue/15 bg-renew-soft focus:bg-white focus:border-renew-blue focus:outline-none focus:ring-4 focus:ring-renew-blue/10 transition text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-renew-mute mb-2">Veículo</label>
                      <input
                        type="text"
                        name="veiculo"
                        required
                        placeholder="Ex: Honda Civic 2020"
                        className="w-full px-4 py-3 rounded-xl border border-renew-blue/15 bg-renew-soft focus:bg-white focus:border-renew-blue focus:outline-none focus:ring-4 focus:ring-renew-blue/10 transition text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-renew-mute mb-2">Serviço de interesse</label>
                    <select
                      name="servico"
                      required
                      defaultValue=""
                      className="w-full px-4 py-3 rounded-xl border border-renew-blue/15 bg-renew-soft focus:bg-white focus:border-renew-blue focus:outline-none focus:ring-4 focus:ring-renew-blue/10 transition text-sm"
                    >
                      <option value="">Selecione um serviço</option>
                      <option>Funilaria e Pintura</option>
                      <option>Reparo de Para-choque</option>
                      <option>Martelinho de Ouro</option>
                      <option>Micro Pintura</option>
                      <option>Cristalização e Vitrificação</option>
                      <option>Não sei — quero avaliação</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-renew-mute mb-2">Mensagem</label>
                    <textarea
                      name="mensagem"
                      rows="3"
                      placeholder="Conte um pouco sobre o que aconteceu (opcional)"
                      className="w-full px-4 py-3 rounded-xl border border-renew-blue/15 bg-renew-soft focus:bg-white focus:border-renew-blue focus:outline-none focus:ring-4 focus:ring-renew-blue/10 transition text-sm resize-none"
                    />
                  </div>
                  <button type="submit" className="btn-primary w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold text-base mt-2">
                    <WppIcon size={20} />
                    ENVIAR PARA O WHATSAPP
                  </button>
                  <p className="text-xs text-renew-mute text-center mt-3">🔒 Seus dados são tratados com total segurança</p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-renew-ink text-white/70 py-12">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 grid md:grid-cols-3 gap-8 items-start">
          <div>
            <img src={LOGO} alt="Renew" className="h-12 w-auto mb-4" />
            <p className="text-sm leading-relaxed">Funilaria e Pintura Premium. 30 anos transformando carros em Ribeirão Preto e região.</p>
          </div>
          <div>
            <div className="text-white font-bold mb-3 uppercase text-xs tracking-widest">Navegação</div>
            <ul className="space-y-2 text-sm">
              <li><a href="#servicos" className="hover:text-white">Serviços</a></li>
              <li><a href="#diferenciais" className="hover:text-white">Diferenciais</a></li>
              <li><a href="#depoimentos" className="hover:text-white">Avaliações</a></li>
              <li><a href="#contato" className="hover:text-white">Contato</a></li>
            </ul>
          </div>
          <div>
            <div className="text-white font-bold mb-3 uppercase text-xs tracking-widest">Contato</div>
            <ul className="space-y-2 text-sm">
              <li><a href="https://wa.me/5516999862686" className="hover:text-white">(16) 99986-2686</a></li>
              <li><a href="https://instagram.com/renew.premium" target="_blank" rel="noopener noreferrer" className="hover:text-white">@renew.premium</a></li>
              <li>Av. Dr. Antonio Barbosa Filho, 1160 — Ribeirão Preto/SP</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-5 lg:px-8 mt-10 pt-6 border-t border-white/10 text-xs text-white/50 flex flex-wrap justify-between gap-3">
          <span>© {year} Renew Funilaria e Pintura Premium. Todos os direitos reservados.</span>
          <span>Feito com cuidado para quem ama o próprio carro.</span>
        </div>
      </footer>

      {/* ===== FLOATING WHATSAPP ===== */}
      <a
        href={WHATSAPP_HREF}
        target="_blank"
        rel="noopener noreferrer"
        className="wpp-pulse fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:scale-110 transition"
      >
        <WppIcon size={28} />
      </a>
    </>
  )
}
