import React, { useEffect, useRef, useState } from 'react';

// ============================================
// CONFIG
// ============================================
const PHONE = '558532763240';
const WHATSAPP_MSG = 'Olá! Vi o site do Lojão dos Parafusos e gostaria de fazer um pedido.';
const WA_LINK = `https://wa.me/${PHONE}?text=${encodeURIComponent(WHATSAPP_MSG)}`;
const PHONE_DISPLAY = '(85) 3276-3240';

// Paleta (espelhada do site oficial)
const C = {
  blue: '#1E3A8A',
  blueDeep: '#152A66',
  blueLight: '#2949A8',
  yellow: '#FFCC00',
  yellowSoft: '#FFD93D',
  green: '#22C55E',
  greenDark: '#16A34A',
  ink: '#0F1A3A',
  bg: '#F5F7FB',
};

// Imagens (Unsplash CDN — URLs estáveis)
const IMG = {
  hero: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=1000&q=80',
  parafusos: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&w=600&q=80',
  ferragens: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=600&q=80',
  eletricas: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&w=600&q=80',
  manuais: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=600&q=80',
  abrasivos: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=600&q=80',
  seguranca: 'https://images.unsplash.com/photo-1601055283742-8b27e81b5553?auto=format&fit=crop&w=600&q=80',
  construcao: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=600&q=80',
  limpeza: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=600&q=80',
  adesivos: 'https://images.unsplash.com/photo-1567361808960-dec9cb578182?auto=format&fit=crop&w=600&q=80',
  automotivo: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=600&q=80',
};

// ============================================
// ÍCONES
// ============================================
const Ico = {
  wa: (p) => <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M17.6 6.3A7.85 7.85 0 0012 4a7.94 7.94 0 00-6.9 11.9L4 20l4.2-1.1a7.94 7.94 0 0011.7-7 7.85 7.85 0 00-2.3-5.6zM12 18.5a6.6 6.6 0 01-3.4-.9l-.2-.1-2.5.7.7-2.4-.2-.2A6.6 6.6 0 1118.6 12 6.6 6.6 0 0112 18.5zm3.6-4.9c-.2-.1-1.2-.6-1.4-.6s-.3-.1-.4.1l-.6.6c-.1.1-.2.2-.4 0a5.4 5.4 0 01-1.6-1 6.1 6.1 0 01-1.1-1.4c-.1-.2 0-.3.1-.4l.3-.4.2-.3v-.3l-.6-1.4c-.1-.4-.3-.3-.4-.3h-.4a.7.7 0 00-.5.2 2 2 0 00-.6 1.5 3.5 3.5 0 00.7 1.9 7.9 7.9 0 003.1 2.7c.4.2.8.3 1 .4a2.4 2.4 0 001.1.1 1.9 1.9 0 001.2-.9 1.5 1.5 0 00.1-.9c-.1-.1-.2-.2-.4-.3z"/></svg>,
  phone: (p) => <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M20 15.5c-1.2 0-2.5-.2-3.6-.6h-.3c-.3 0-.5.1-.7.3l-2.2 2.2c-2.8-1.4-5.2-3.7-6.6-6.6l2.2-2.2c.3-.3.4-.7.2-1-.4-1.1-.6-2.4-.6-3.6 0-.6-.4-1-1-1H4c-.6 0-1 .4-1 1 0 9.4 7.6 17 17 17 .6 0 1-.4 1-1v-3.5c0-.6-.4-1-1-1z"/></svg>,
  arr: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M5 12h14M13 5l7 7-7 7"/></svg>,
  check: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M20 6L9 17l-5-5"/></svg>,
  truck: (p) => <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M3 4h11a2 2 0 012 2v3h3a2 2 0 011.4.6l2 2A2 2 0 0123 13v4a2 2 0 01-2 2h-1.2a3 3 0 01-5.6 0H9.8a3 3 0 01-5.6 0H3a1 1 0 01-1-1V6a2 2 0 011-2zm14 7v2h4l-2-2h-2zM7 16.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm10 0a1.5 1.5 0 110 3 1.5 1.5 0 010-3z"/></svg>,
  hand: (p) => <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M8 11V4.5a1.5 1.5 0 113 0V11h.5V3.5a1.5 1.5 0 113 0V11h.5V5.5a1.5 1.5 0 113 0V13a8 8 0 01-8 8 8 8 0 01-8-8v-2.5a1.5 1.5 0 113 0V13a5 5 0 005 5 5 5 0 005-5h-.5z"/></svg>,
  star: (p) => <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M12 2l3 7 7 .8-5.3 4.8L18 22l-6-3.5L6 22l1.3-7.4L2 9.8 9 9z"/></svg>,
  starOutline: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" {...p}><path d="M12 2l3 7 7 .8-5.3 4.8L18 22l-6-3.5L6 22l1.3-7.4L2 9.8 9 9z"/></svg>,
  pin: (p) => <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M12 2a8 8 0 00-8 8c0 5.4 7 11.5 7.3 11.7a1 1 0 001.4 0C13 21.5 20 15.4 20 10a8 8 0 00-8-8zm0 11a3 3 0 110-6 3 3 0 010 6z"/></svg>,
  clock: (p) => <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm4 11h-5a1 1 0 01-1-1V6a1 1 0 112 0v5h4a1 1 0 110 2z"/></svg>,
  ig: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>,
  bolt: (p) => <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M13 2L3 14h7v8l10-12h-7z"/></svg>,
  menu: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" {...p}><path d="M4 6h16M4 12h16M4 18h16"/></svg>,
};

// ============================================
// LOGO (estilo do site — formas inclinadas tipo parafuso)
// ============================================
const Logo = ({ size = 'md', mono = false }) => {
  const heightMap = {
    sm: { mobile: 32, desktop: 40 },
    md: { mobile: 42, desktop: 56 },
    lg: { mobile: 56, desktop: 72 },
  };
  const h = heightMap[size] || heightMap.md;
  return (
    <a href="#top" className="inline-flex items-center select-none">
      <img
        src="/logo.png"
        alt="Lojão dos Parafusos"
        className="h-auto"
        style={{
          height: 'clamp(' + h.mobile + 'px, ' + (h.desktop / 16) * 2 + 'vw, ' + h.desktop + 'px)',
          width: 'auto',
          filter: mono ? 'brightness(0) invert(1)' : 'none',
        }}
      />
    </a>
  );
};

// ============================================
// CTA
// ============================================
const CTA = ({ children, size = 'md', variant = 'green', className = '', ...rest }) => {
  const sizes = {
    sm: 'px-4 py-2.5 text-sm gap-2',
    md: 'px-6 py-3 text-[14px] gap-2',
    lg: 'px-7 py-4 text-[15px] gap-2.5',
    xl: 'px-9 py-5 text-base gap-3',
  };
  const styles = {
    green: { background: C.green, color: '#fff', boxShadow: '0 8px 22px rgba(34,197,94,0.35)' },
    yellow: { background: C.yellow, color: C.blue, boxShadow: '0 8px 22px rgba(255,204,0,0.4)' },
    blue: { background: C.blue, color: '#fff', boxShadow: '0 8px 22px rgba(30,58,138,0.3)' },
    white: { background: '#fff', color: C.blue, boxShadow: '0 8px 22px rgba(0,0,0,0.1)' },
  };
  return (
    <a
      href={WA_LINK}
      target="_blank"
      rel="noopener noreferrer"
      style={styles[variant]}
      className={`inline-flex items-center justify-center font-black uppercase tracking-wide rounded-lg transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 active:scale-[0.98] ${sizes[size]} ${className}`}
      {...rest}
    >
      {children}
    </a>
  );
};

// ============================================
// HOOK REVEAL
// ============================================
const useReveal = () => {
  const ref = useRef(null);
  useEffect(() => {
    const els = ref.current?.querySelectorAll('.fade-up') ?? [];
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return ref;
};

// ============================================
// IPHONE 16 PRO MOCKUP
// ============================================
const Iphone16Pro = ({ width = 200, height = 400, src, className = '', ...props }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 200 400"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`drop-shadow-2xl ${className}`}
    {...props}
  >
    <path
      fill="#303333"
      d="M196.11,128.09c0-.25-.2-.45-.45-.45-.11.04-.37.03-.69,0V36.69c0-17.84-14.46-32.31-32.31-32.31H37.48C19.63,4.39,5.17,18.85,5.17,36.69v48.99c-.3.02-.55.03-.66-.02-.25,0-.45.2-.45.45,0,0,0,17.29,0,17.29-.03.41.5.49,1.11.48v13.63c-.61,0-1.14.08-1.11.48,0,0,0,28.54,0,28.54-.03.42.5.49,1.11.48v7.95c-.61,0-1.14.08-1.11.48,0,0,0,28.54,0,28.54-.03.42.5.49,1.11.48v178.86c0,17.84,14.46,32.31,32.31,32.31h125.2c17.84,0,32.31-14.46,32.31-32.31v-188.87c.32-.02.58-.03.69.04,1.26.1.03-45.94.45-46.38ZM186.07,362.63c0,13.56-10.99,24.56-24.56,24.56H38.64c-13.56,0-24.56-10.99-24.56-24.56V37.37c0-13.56,10.99-24.56,24.56-24.56h122.87c13.56,0,24.56,10.99,24.56,24.56v325.26Z"
    />
    <path
      fill="#000000"
      d="M161.38,7.29H38.78c-16.54,0-29.95,13.41-29.95,29.95v325.52c0,16.54,13.41,29.95,29.95,29.95h122.6c16.54,0,29.95-13.41,29.95-29.95V37.24c0-16.54-13.41-29.95-29.95-29.95ZM186.07,362.57c0,13.6-11.02,24.62-24.62,24.62H38.7c-13.6,0-24.62-11.02-24.62-24.62V37.43c0-13.6,11.02-24.62,24.62-24.62h122.75c13.6,0,24.62,11.02,24.62,24.62v325.14Z"
    />
    <rect fill="#111" x="14.08" y="12.81" width="171.98" height="374.37" rx="24.62" ry="24.62" />
    {src && (
      <image
        href={src}
        x="14.08"
        y="12.81"
        width="171.98"
        height="374.37"
        preserveAspectRatio="xMidYMid slice"
        clipPath="url(#roundedCorners)"
      />
    )}
    <path
      fill="#000000"
      d="M119.61,33.86h-38.93c-10.48-.18-10.5-15.78,0-15.96,0,0,38.93,0,38.93,0,4.41,0,7.98,3.57,7.98,7.98,0,4.41-3.57,7.98-7.98,7.98Z"
    />
    <defs>
      <clipPath id="roundedCorners">
        <rect x="14.08" y="12.81" width="171.98" height="374.37" rx="24.62" ry="24.62" />
      </clipPath>
    </defs>
  </svg>
);

// ============================================
// GOOGLE LOGO (G colorido)
// ============================================
const GoogleG = (p) => (
  <svg viewBox="0 0 48 48" {...p}>
    <path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3l5.7-5.7C34.1 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.6-.4-3.9z"/>
    <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.7 19 13 24 13c3.1 0 5.8 1.2 7.9 3l5.7-5.7C34.1 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
    <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.6 39.6 16.2 44 24 44z"/>
    <path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.1 5.6l6.2 5.2C40.9 35.8 44 30.4 44 24c0-1.3-.1-2.6-.4-3.9z"/>
  </svg>
);

// ============================================
// CARROSSEL DE DEPOIMENTOS
// ============================================
const Testimonials = () => {
  // ⚠️ Para colocar avaliações REAIS do Google: substitua os textos abaixo
  // copiando direto do perfil do Lojão dos Parafusos no Google Maps.
  const REVIEWS = [
    { name: 'Ricardo Maia', tag: 'Cliente há 10 anos', text: 'Mais de 10 anos comprando aqui. Pedi de manhã, chega à tarde. Pra obra com prazo apertado, isso vale ouro.', initial: 'R', rating: 5, when: 'há 2 semanas' },
    { name: 'José Silva', tag: 'Local Guide', text: 'Atendimento de outro mundo. Vendedor sabe o que vende, indica certo e ainda dá dica. Nada de robô.', initial: 'J', rating: 5, when: 'há 1 mês' },
    { name: 'André Coelho', tag: 'Cliente', text: 'Faço minhas reformas e venho sempre aqui. Preço bom, variedade absurda, nunca me deixaram na mão.', initial: 'A', rating: 5, when: 'há 3 meses' },
    { name: 'Marcos Pereira', tag: 'Local Guide · 24 avaliações', text: 'Entrega super rápida, preço justo e variedade absurda de fixadores. Recomendo demais!', initial: 'M', rating: 5, when: 'há 4 meses' },
    { name: 'Carla Souza', tag: 'Cliente', text: 'Atendimento excelente, equipe muito atenciosa. Achei tudo o que precisava pra minha reforma.', initial: 'C', rating: 5, when: 'há 6 meses' },
  ];

  // Link direto pra página do Google Maps da loja
  const GOOGLE_PLACE = 'https://www.google.com/maps/search/?api=1&query=Loj%C3%A3o+dos+Parafusos+Jangurussu+Fortaleza';
  const GOOGLE_REVIEWS = 'https://www.google.com/maps/place/?q=place_id:ChIJ_____Lojao_dos_Parafusos'; // placeholder; idealmente trocar pelo place_id real

  const [idx, setIdx] = useState(0);
  const [perView, setPerView] = useState(3);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 640) setPerView(1);
      else if (w < 1024) setPerView(2);
      else setPerView(3);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const maxIdx = Math.max(0, REVIEWS.length - perView);
  const safeIdx = Math.min(idx, maxIdx);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => {
      setIdx((i) => (i >= maxIdx ? 0 : i + 1));
    }, 5000);
    return () => clearInterval(t);
  }, [paused, maxIdx]);

  const goPrev = () => setIdx((i) => (i <= 0 ? maxIdx : i - 1));
  const goNext = () => setIdx((i) => (i >= maxIdx ? 0 : i + 1));

  return (
    <div>
      {/* Header com badge Google */}
      <div className="text-center mb-12 fade-up">
        <div className="inline-flex items-center gap-2.5 bg-white rounded-full pl-2 pr-4 py-1.5 mb-6" style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.08)', border: '1px solid #eee' }}>
          <GoogleG className="w-6 h-6" />
          <div className="flex items-center gap-1" style={{ color: '#FBBC04' }}>
            {[...Array(5)].map((_, i) => <Ico.star key={i} className="w-3.5 h-3.5" />)}
          </div>
          <span className="text-xs font-black" style={{ color: '#202124' }}>4,9</span>
          <span className="text-xs" style={{ color: '#5F6368' }}>· Avaliado no Google</span>
        </div>

        <h2 className="font-black tracking-tight leading-[0.95]" style={{ color: C.blue, fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
          O que os clientes falam.
        </h2>
        <p className="text-base md:text-lg mt-4 max-w-xl mx-auto" style={{ color: '#666' }}>
          Avaliações reais de quem já comprou no Lojão.
        </p>
      </div>

      {/* Carrossel */}
      <div
        className="relative fade-up"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${safeIdx * (100 / perView)}%)` }}
          >
            {REVIEWS.map((t, i) => (
              <div
                key={i}
                className="flex-shrink-0 px-2.5"
                style={{ width: `${100 / perView}%` }}
              >
                <div className="bg-white rounded-2xl p-6 md:p-7 h-full flex flex-col" style={{ border: `2px solid #F1F2F4`, boxShadow: '0 8px 25px rgba(30,58,138,0.06)' }}>
                  {/* Topo: Google G + estrelas + data */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <GoogleG className="w-5 h-5" />
                      <div className="flex items-center gap-0.5" style={{ color: '#FBBC04' }}>
                        {[...Array(t.rating)].map((_, k) => <Ico.star key={k} className="w-4 h-4" />)}
                      </div>
                    </div>
                    <span className="text-xs" style={{ color: '#888' }}>{t.when}</span>
                  </div>

                  {/* Texto */}
                  <p className="leading-relaxed mb-6 text-[15px] flex-1" style={{ color: '#3C4043' }}>
                    &ldquo;{t.text}&rdquo;
                  </p>

                  {/* Rodapé */}
                  <div className="flex items-center gap-3 pt-4" style={{ borderTop: `1px solid #F1F2F4` }}>
                    <div className="w-11 h-11 rounded-full grid place-items-center font-black text-lg" style={{ background: C.blue, color: C.yellow }}>
                      {t.initial}
                    </div>
                    <div className="flex-1">
                      <div className="font-black text-sm" style={{ color: '#202124' }}>{t.name}</div>
                      <div className="text-xs" style={{ color: '#5F6368' }}>{t.tag}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Setas */}
        <button
          onClick={goPrev}
          aria-label="Anterior"
          className="hidden md:grid absolute -left-5 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full place-items-center transition-all hover:scale-110 active:scale-95 z-10"
          style={{ background: '#fff', boxShadow: '0 6px 20px rgba(30,58,138,0.18)', color: C.blue }}
        >
          <Ico.arr className="w-5 h-5 rotate-180" />
        </button>
        <button
          onClick={goNext}
          aria-label="Próximo"
          className="hidden md:grid absolute -right-5 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full place-items-center transition-all hover:scale-110 active:scale-95 z-10"
          style={{ background: '#fff', boxShadow: '0 6px 20px rgba(30,58,138,0.18)', color: C.blue }}
        >
          <Ico.arr className="w-5 h-5" />
        </button>
      </div>

      {/* Bolinhas de paginação */}
      <div className="flex justify-center gap-2 mt-8">
        {Array.from({ length: maxIdx + 1 }).map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            aria-label={`Ir para ${i + 1}`}
            className="h-2 rounded-full transition-all"
            style={{
              width: i === safeIdx ? 24 : 8,
              background: i === safeIdx ? C.blue : '#D1D5DB',
            }}
          />
        ))}
      </div>

      {/* CTA Google */}
      <div className="text-center mt-10">
        <a
          href={GOOGLE_PLACE}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-full transition-all hover:-translate-y-0.5 hover:shadow-lg"
          style={{ boxShadow: '0 4px 14px rgba(0,0,0,0.08)', border: '1px solid #E5E7EB' }}
        >
          <GoogleG className="w-5 h-5" />
          <span className="text-sm font-bold" style={{ color: '#202124' }}>Ver todas as avaliações no Google</span>
          <Ico.arr className="w-4 h-4" style={{ color: C.blue }} />
        </a>
      </div>
    </div>
  );
};

// ============================================
// APP
// ============================================
export default function App() {
  const root = useReveal();
  const [menu, setMenu] = useState(false);

  return (
    <div id="top" ref={root} className="min-h-screen overflow-x-hidden" style={{ background: '#fff', color: C.ink }}>

      {/* ============================================
          TOP BAR
      ============================================ */}
      <div className="hidden md:block text-white text-xs" style={{ background: C.blueDeep }}>
        <div className="max-w-7xl mx-auto px-6 h-9 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5"><Ico.pin className="w-3.5 h-3.5" style={{ color: C.yellow }} /> BR-116, KM 10 · Jangurussu · Fortaleza/CE</span>
            <span className="flex items-center gap-1.5"><Ico.clock className="w-3.5 h-3.5" style={{ color: C.yellow }} /> Seg-Sex 7h-18h · Sáb 7h-12h</span>
          </div>
          <div className="flex items-center gap-4">
            <a href={`tel:+${PHONE}`} className="flex items-center gap-1.5 hover:text-yellow-300 transition-colors">
              <Ico.phone className="w-3.5 h-3.5" style={{ color: C.yellow }} /> {PHONE_DISPLAY}
            </a>
            <a href="https://instagram.com/lojaodosparafusosce" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-yellow-300 transition-colors">
              <Ico.ig className="w-3.5 h-3.5" style={{ color: C.yellow }} /> @lojaodosparafusosce
            </a>
          </div>
        </div>
      </div>

      {/* ============================================
          NAVBAR
      ============================================ */}
      <nav className="sticky top-0 z-40 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-5 md:px-6 h-20 md:h-24 flex items-center justify-between gap-4">
          <Logo size="md" />

          {/* Menu Desktop */}
          <div className="hidden lg:flex items-center gap-2">
            <CTA size="md" variant="green">
              <Ico.wa className="w-4 h-4" />
              Peça Agora!
            </CTA>
            <a href="#top" className="px-4 py-2 rounded-md font-black text-sm tracking-wide" style={{ background: C.yellow, color: C.blue }}>
              HOME
            </a>
            <a href="#sobre" className="px-4 py-2 font-black text-sm tracking-wide uppercase hover:text-yellow-500 transition-colors" style={{ color: C.blue }}>
              Quem Somos
            </a>
            <a href="#produtos" className="px-4 py-2 font-black text-sm tracking-wide uppercase hover:text-yellow-500 transition-colors" style={{ color: C.blue }}>
              Produtos
            </a>
            <a href="#contato" className="px-4 py-2 font-black text-sm tracking-wide uppercase hover:text-yellow-500 transition-colors" style={{ color: C.blue }}>
              Fale Conosco
            </a>
          </div>

          {/* Mobile */}
          <div className="flex items-center gap-2 lg:hidden">
            <CTA size="sm" variant="green">
              <Ico.wa className="w-4 h-4" />
              Pedir
            </CTA>
            <button
              onClick={() => setMenu(!menu)}
              className="relative w-11 h-11 rounded-lg flex items-center justify-center transition-all duration-300 hover:bg-blue-50 active:scale-90"
              style={{ color: C.blue }}
              aria-label={menu ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={menu}
            >
              {/* Hamburger animado → X */}
              <span className="relative block w-6 h-5">
                <span
                  className="absolute left-0 right-0 h-[3px] rounded-full transition-all duration-300 ease-out origin-center"
                  style={{
                    background: C.blue,
                    top: menu ? '50%' : 0,
                    transform: menu ? 'translateY(-50%) rotate(45deg)' : 'translateY(0) rotate(0)',
                  }}
                />
                <span
                  className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[3px] rounded-full transition-all duration-200 ease-out"
                  style={{
                    background: C.blue,
                    opacity: menu ? 0 : 1,
                    transform: menu ? 'translateY(-50%) translateX(12px)' : 'translateY(-50%)',
                  }}
                />
                <span
                  className="absolute left-0 right-0 h-[3px] rounded-full transition-all duration-300 ease-out origin-center"
                  style={{
                    background: C.blue,
                    bottom: menu ? '50%' : 0,
                    transform: menu ? 'translateY(50%) rotate(-45deg)' : 'translateY(0) rotate(0)',
                  }}
                />
              </span>
            </button>
          </div>
        </div>

        {/* Mobile menu drawer com slide-down suave */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-out ${menu ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
          style={{ borderTop: menu ? '1px solid #e5e7eb' : '1px solid transparent' }}
        >
          <div className="max-w-7xl mx-auto px-5 py-4 flex flex-col gap-1.5">
            {[
              { label: 'Home', href: '#top' },
              { label: 'Quem Somos', href: '#sobre' },
              { label: 'Produtos', href: '#produtos' },
              { label: 'Entrega', href: '#entrega' },
              { label: 'Fale Conosco', href: '#contato' },
            ].map((l, i) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setMenu(false)}
                className="group relative flex items-center gap-3 px-4 py-3 rounded-lg font-bold text-sm uppercase tracking-wide overflow-hidden"
                style={{
                  color: C.blue,
                  background: 'transparent',
                  transform: menu ? 'translateX(0)' : 'translateX(-20px)',
                  opacity: menu ? 1 : 0,
                  transition: `transform 350ms cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 50}ms, opacity 250ms ease ${i * 50}ms, background 200ms ease`,
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = `${C.yellow}22`; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
              >
                <span className="w-1.5 h-1.5 rounded-full transition-all duration-200 group-hover:w-4" style={{ background: C.yellow }} />
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* ============================================
          HERO — imagem de fundo
      ============================================ */}
      <section className="relative overflow-hidden" style={{ backgroundColor: C.blue }}>
        {/* Banner DESKTOP (horizontal) */}
        <div
          className="hidden md:block absolute inset-0"
          style={{
            backgroundImage: `url(/banner.jpg)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center right',
            backgroundRepeat: 'no-repeat',
          }}
        />
        {/* Banner MOBILE (vertical) */}
        <div
          className="md:hidden absolute inset-0"
          style={{
            backgroundImage: `url(/banner-mobile.jpg)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center bottom',
            backgroundRepeat: 'no-repeat',
          }}
        />

        {/* Overlay desktop — escurece lado esquerdo */}
        <div
          className="hidden md:block absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(90deg, ${C.blue}E6 0%, ${C.blue}99 40%, ${C.blue}33 60%, transparent 80%)`,
          }}
        />
        {/* Overlay mobile — escurece o topo onde fica o texto */}
        <div
          className="md:hidden absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(180deg, ${C.blue}E6 0%, ${C.blue}AA 35%, ${C.blue}33 55%, transparent 70%)`,
          }}
        />

        <div className="relative max-w-7xl mx-auto px-5 sm:px-6 md:px-10 lg:px-16 pt-8 sm:pt-10 md:pt-24 pb-[420px] xs:pb-[460px] sm:pb-[500px] md:pb-32 min-h-[680px] sm:min-h-[740px] md:min-h-[640px] flex items-start md:items-center">
          <div className="fade-up text-white text-center md:text-left max-w-xl lg:pl-4 w-full md:w-auto">
            <div className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] font-black tracking-widest uppercase px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-5 sm:mb-7" style={{ background: C.yellow, color: C.blue }}>
              <Ico.bolt className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span className="hidden xs:inline">30 anos de mercado · </span>Desde 1995
            </div>

            <h1 className="font-black leading-[0.95] tracking-tight mb-5 sm:mb-6" style={{ fontSize: 'clamp(1.75rem, 7vw, 4rem)', textShadow: '0 2px 20px rgba(0,0,0,0.4)' }}>
              <span className="block shimmer-yellow">HÁ 30 ANOS,</span>
              <span className="block text-white">SUA MELHOR SOLUÇÃO</span>
              <span className="block text-white">DA CASA À <span className="shimmer-yellow">INDÚSTRIA!</span></span>
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed mb-7 sm:mb-8 max-w-md mx-auto md:mx-0" style={{ textShadow: '0 1px 8px rgba(0,0,0,0.5)' }}>
              Fixadores, ferramentas, EPIs e tudo o que sua obra precisa.{' '}
              <strong className="text-white">Ligou? Pediu? Chegou!</strong>{' '}
              A entrega mais rápida de Fortaleza e região.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center md:justify-start gap-2.5 sm:gap-3 w-full md:w-auto max-w-xs mx-auto sm:max-w-none">
              <CTA size="xl" variant="green" className="w-full sm:w-auto justify-center !py-3 sm:!py-5 !text-sm sm:!text-base !px-5 sm:!px-8 !gap-2">
                <Ico.wa className="w-4 h-4 sm:w-5 sm:h-5" />
                Peça Agora!
                <Ico.arr className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </CTA>
              <a
                href="#produtos"
                style={{ background: C.yellow, color: C.blue, boxShadow: '0 8px 22px rgba(255,204,0,0.4)' }}
                className="w-full sm:w-auto inline-flex items-center justify-center font-black uppercase tracking-wide rounded-lg transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 active:scale-[0.98] px-5 sm:px-9 py-3 sm:py-5 text-sm sm:text-base gap-2 sm:gap-3"
              >
                Ver Produtos
                <Ico.arr className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          4 FEATURE CARDS (estilo do site)
      ============================================ */}
      <section className="relative py-16 md:py-20 overflow-hidden" style={{ background: C.blue }}>
        <div className="absolute inset-0 opacity-[0.07] pointer-events-none" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, ${C.yellow} 1.5px, transparent 0)`, backgroundSize: '28px 28px' }} />
        <div className="relative max-w-6xl mx-auto px-5 md:px-6">
          {/* Título da seção */}
          <div className="text-center mb-10 md:mb-14 fade-up">
            <div className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] font-black tracking-widest uppercase px-4 py-1.5 rounded-full mb-4" style={{ background: C.yellow, color: C.blue }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: C.blue }} />
              Por que o Lojão
            </div>
            <h2 className="font-black tracking-tight leading-[0.95] text-white mb-3" style={{ fontSize: 'clamp(1.75rem, 5vw, 3rem)' }}>
              Aqui é mais fácil de comprar.
            </h2>
            <p className="text-sm sm:text-base text-white/70 max-w-xl mx-auto">
              Atendimento, entrega e variedade que sua obra precisa — tudo num lugar só.
            </p>
            <div className="mx-auto mt-5 h-1 w-16 rounded-full" style={{ background: C.yellow }} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 justify-items-center">
            {[
              { Icon: Ico.truck, title: 'LIGOU? PEDIU? CHEGOU!', desc: 'A entrega mais rápida de Fortaleza! Receba seus produtos sem sair de casa, com a eficiência da nossa logística.' },
              { Icon: Ico.wa, title: 'WHATSAPP', desc: 'Aqui é mais fácil de comprar! Faça seu pedido diretamente pelo nosso WhatsApp, fale com nossos atendentes.' },
              { Icon: Ico.star, title: 'MELHORES PRODUTOS', desc: 'Aqui você encontra as melhores marcas do mercado! Produtos com a qualidade e variedade que sua demanda precisar.' },
              { Icon: Ico.phone, title: 'ATENDIMENTO PERSONALIZADO', desc: 'Para cada solicitação, nós temos a solução! Contamos com profissionais qualificados para te atender.' },
            ].map(({ Icon, title, desc }, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 md:p-7 text-center fade-up transition-all duration-300 hover:-translate-y-1 w-full max-w-sm"
                style={{ boxShadow: '0 10px 30px rgba(30,58,138,0.10)', border: `2px solid ${C.bg}` }}
              >
                <div className="w-16 h-16 rounded-full grid place-items-center mx-auto mb-4" style={{ background: C.blue }}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-black text-base md:text-lg tracking-tight mb-3 uppercase" style={{ color: C.blue }}>
                  {title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: '#666' }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          NOSSAS SOLUÇÕES
      ============================================ */}
      <section id="produtos" className="py-14 sm:py-20 md:py-28 bg-white relative">
        <div className="max-w-7xl mx-auto px-5 md:px-6">
          <div className="text-center mb-14 fade-up">
            <div className="inline-flex items-center gap-2 text-[11px] font-black tracking-widest uppercase px-4 py-1.5 rounded-full mb-5" style={{ background: `${C.yellow}33`, color: C.blue }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: C.yellow }} />
              Nosso Catálogo
            </div>
            <h2 className="font-black tracking-tight leading-[0.95]" style={{ color: C.blue, fontSize: 'clamp(2.2rem, 5.5vw, 4rem)' }}>
              Nossas Soluções
            </h2>
            <div className="mx-auto mt-5 h-1 w-20 rounded-full" style={{ background: C.yellow }} />
            <p className="text-base md:text-lg mt-6 max-w-xl mx-auto" style={{ color: '#666' }}>
              Mais de 10 mil itens em estoque, das pequenas reformas às grandes obras.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[
              { name: 'Parafusos em Geral', desc: 'Sextavados, allen, autobrocantes, francês e mais.', tag: 'Fixação', img: IMG.parafusos },
              { name: 'Ferragens e Fixadores', desc: 'Porcas, arruelas, buchas e barras roscadas.', tag: 'Essencial', img: IMG.ferragens },
              { name: 'Ferramentas Elétricas', desc: 'Furadeiras, parafusadeiras e esmerilhadeiras.', tag: 'Top de linha', img: IMG.eletricas },
              { name: 'Ferramentas Manuais', desc: 'Chaves, alicates, jogos completos.', tag: 'Pro', img: IMG.manuais },
              { name: 'Cortes e Abrasivos', desc: 'Discos de corte, desbaste, lixas e brocas.', tag: 'Performance', img: IMG.abrasivos },
              { name: 'Equipamento de Segurança', desc: 'EPIs completos: capacete, luva, óculos, bota.', tag: 'NR', img: IMG.seguranca },
              { name: 'Construção Civil', desc: 'Tudo o que sua obra precisa pra não parar.', tag: 'Obra', img: IMG.construcao },
              { name: 'Limpeza e Lubrificação', desc: 'Graxas industriais, óleos e sprays.', tag: 'Manutenção', img: IMG.limpeza },
              { name: 'Adesivos e Colas', desc: 'Selantes, epóxi, silicone e cola industrial.', tag: 'Selagem', img: IMG.adesivos },
              { name: 'Produtos Automotivos', desc: 'Peças, acessórios e produtos de oficina.', tag: 'Auto', img: IMG.automotivo },
            ].map((c, i) => (
              <div
                key={i}
                className="group relative bg-white rounded-2xl overflow-hidden flex flex-col fade-up transition-all duration-300 hover:-translate-y-2"
                style={{ boxShadow: '0 8px 25px rgba(30,58,138,0.08)' }}
              >
                {/* Faixa superior azul com número + tag */}
                <div className="flex items-stretch" style={{ background: C.blue }}>
                  <div className="px-4 py-2.5 flex items-center gap-2 flex-1">
                    <span className="font-black text-sm" style={{ color: C.yellow }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-white/50 text-xs">/</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/80">{c.tag}</span>
                  </div>
                  <div className="px-3 py-2.5 flex items-center gap-1.5 font-black text-[10px] uppercase tracking-widest" style={{ background: C.yellow, color: C.blue }}>
                    <Ico.bolt className="w-3 h-3" />
                    Em estoque
                  </div>
                </div>

                {/* Imagem */}
                <div className="relative aspect-[16/10] overflow-hidden" style={{ background: C.bg }}>
                  <img
                    src={c.img}
                    alt={c.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement.style.background = C.bg; }}
                  />
                  {/* Gradiente sutil de baixo */}
                  <div className="absolute inset-x-0 bottom-0 h-1/2" style={{ background: `linear-gradient(to top, rgba(30,58,138,0.55), transparent)` }} />

                  {/* Bolt animado canto */}
                  <div className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full grid place-items-center transition-transform duration-500 group-hover:rotate-180 group-hover:scale-110" style={{ background: C.yellow, boxShadow: '0 6px 20px rgba(0,0,0,0.2)' }}>
                    <Ico.bolt className="w-7 h-7 -translate-x-1 -translate-y-1" style={{ color: C.blue }} />
                  </div>
                </div>

                {/* Conteúdo */}
                <div className="p-5 md:p-6 flex flex-col flex-1">
                  <h3 className="font-black text-lg md:text-xl leading-tight mb-2 uppercase tracking-tight" style={{ color: C.blue }}>
                    {c.name}
                  </h3>
                  <p className="text-sm leading-relaxed mb-5 flex-1" style={{ color: '#666' }}>
                    {c.desc}
                  </p>

                  {/* Botões */}
                  <div className="flex items-stretch gap-2">
                    <a
                      href={WA_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-xl font-black text-[13px] uppercase tracking-wide transition-all duration-200 hover:brightness-110 active:scale-[0.98]"
                      style={{ background: C.green, color: '#fff', boxShadow: '0 4px 14px rgba(34,197,94,0.3)' }}
                    >
                      <Ico.wa className="w-4 h-4" />
                      Pedir Agora
                    </a>
                    <a
                      href={WA_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Ver mais"
                      className="w-12 inline-flex items-center justify-center rounded-xl transition-all duration-200 hover:brightness-110 active:scale-[0.98]"
                      style={{ background: C.yellow, color: C.blue }}
                    >
                      <Ico.arr className="w-5 h-5" />
                    </a>
                  </div>
                </div>

                {/* Linha amarela inferior no hover */}
                <div className="absolute bottom-0 left-0 right-0 h-1 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" style={{ background: C.yellow }} />
              </div>
            ))}
          </div>

          <div className="text-center mt-12 fade-up">
            <CTA size="xl" variant="green">
              <Ico.wa className="w-5 h-5" />
              Vem Pro Lojão Que Tem
              <Ico.arr className="w-5 h-5" />
            </CTA>
          </div>
        </div>
      </section>

      {/* ============================================
          QUEM SOMOS / 30 ANOS
      ============================================ */}
      <section id="sobre" className="py-14 sm:py-20 md:py-28 relative overflow-hidden text-white" style={{ background: C.blue }}>
        {/* Padrão de pontos amarelos sutil */}
        <div className="absolute inset-0 opacity-[0.07] pointer-events-none" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, ${C.yellow} 1.5px, transparent 0)`, backgroundSize: '28px 28px' }} />
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: `${C.yellow}1A`, filter: 'blur(80px)' }} />

        <div className="relative max-w-7xl mx-auto px-5 md:px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div className="fade-up">
            <div className="inline-block text-[11px] font-black tracking-widest uppercase px-4 py-2 rounded-full mb-5" style={{ background: C.yellow, color: C.blue }}>
              Quem Somos
            </div>
            <h2 className="font-black tracking-tight leading-[0.95] mb-6 text-white" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
              30 anos abastecendo<br />Fortaleza.
            </h2>
            <p className="text-lg leading-relaxed mb-5 text-white/80">
              Começamos em 1995 como uma pequena loja de bairro e hoje somos referência em fixadores, ferramentas e EPIs em todo o estado do Ceará.
            </p>
            <p className="text-lg leading-relaxed mb-8 text-white/80">
              Em 2024 inauguramos nosso <strong style={{ color: C.yellow }}>Centro de Distribuição próprio</strong> e a <strong style={{ color: C.yellow }}>Loja Conceito</strong> na BR-116, garantindo mais estoque e mais agilidade pra você.
            </p>

            <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-8">
              {[
                { n: '30+', label: 'Anos de história' },
                { n: '+5mil', label: 'Clientes atendidos' },
                { n: '10mil+', label: 'Itens em estoque' },
                { n: '100%', label: 'Atendimento humano' },
              ].map((s, i) => (
                <div key={i} className="rounded-xl p-3.5 sm:p-4 border-l-4 flex flex-col justify-between min-h-[92px] sm:min-h-[100px]" style={{ background: 'rgba(255,255,255,0.08)', borderColor: C.yellow, backdropFilter: 'blur(8px)' }}>
                  <div className="font-black text-2xl sm:text-3xl leading-none" style={{ color: C.yellow }}>{s.n}</div>
                  <div className="text-[10px] sm:text-xs uppercase tracking-wider font-bold mt-2 text-white/70 leading-tight">{s.label}</div>
                </div>
              ))}
            </div>

            <CTA size="lg" variant="yellow"><Ico.wa className="w-5 h-5" /> Falar com o Lojão</CTA>
          </div>

          <div className="fade-up relative">
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5]" style={{ boxShadow: `0 30px 60px -20px rgba(30,58,138,0.4)` }}>
              <img src="/fachada.jpg" alt="Loja Conceito Lojão dos Parafusos · BR-116, KM 10" loading="lazy" className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${C.blue}40, transparent)` }} />
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur rounded-2xl p-5">
                <div className="flex items-center gap-1 mb-2" style={{ color: C.yellow }}>
                  {[...Array(5)].map((_, i) => <Ico.star key={i} className="w-4 h-4" />)}
                </div>
                <div className="font-black text-lg leading-tight" style={{ color: C.blue }}>
                  "A entrega mais rápida de Fortaleza"
                </div>
                <div className="text-sm mt-1" style={{ color: '#666' }}>
                  — Mais de 5 mil clientes satisfeitos
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          PRA QUEM É
      ============================================ */}
      <section className="py-14 sm:py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-5 md:px-6">
          <div className="text-center mb-14 fade-up">
            <div className="inline-block text-[11px] font-black tracking-widest uppercase px-4 py-2 rounded-full mb-4" style={{ background: C.yellow, color: C.blue }}>
              Pra quem é
            </div>
            <h2 className="font-black tracking-tight leading-[0.95]" style={{ color: C.blue, fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
              Da grande obra ao<br />fim de semana.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div className="rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 fade-up relative overflow-hidden text-white" style={{ background: C.blue }}>
              <div className="absolute -right-20 -top-20 w-60 h-60 rounded-full" style={{ background: `${C.yellow}1A` }} />
              <div className="relative">
                <div className="inline-block text-[11px] font-black tracking-widest uppercase px-3 py-1 rounded-full mb-6" style={{ background: C.yellow, color: C.blue }}>
                  Empresas · B2B
                </div>
                <h3 className="font-black text-3xl md:text-4xl tracking-tight mb-4 leading-tight">
                  Volume e regularidade pra quem produz.
                </h3>
                <p className="text-white/80 leading-relaxed mb-6">
                  Atendimento dedicado, prazos previsíveis e estoque amplo. Você produz, a gente abastece.
                </p>
                <div className="grid grid-cols-2 gap-2.5 text-sm mb-7">
                  {['Indústrias', 'Construtoras', 'Metalúrgicas', 'Vidraçarias', 'Pré-moldados', 'Postos de molas'].map((t) => (
                    <div key={t} className="flex items-center gap-2 font-semibold text-white/90">
                      <Ico.check className="w-4 h-4 flex-shrink-0" style={{ color: C.yellow }} />
                      {t}
                    </div>
                  ))}
                </div>
                <CTA size="md" variant="yellow"><Ico.wa className="w-4 h-4" /> Falar com vendedor</CTA>
              </div>
            </div>

            <div className="rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 fade-up relative overflow-hidden" style={{ background: C.yellow }}>
              <div className="absolute -right-20 -top-20 w-60 h-60 rounded-full" style={{ background: `${C.blue}1A` }} />
              <div className="relative">
                <div className="inline-block text-[11px] font-black tracking-widest uppercase px-3 py-1 rounded-full mb-6 text-white" style={{ background: C.blue }}>
                  Profissional · B2C
                </div>
                <h3 className="font-black text-3xl md:text-4xl tracking-tight mb-4 leading-tight" style={{ color: C.blue }}>
                  Atendimento direto, preço de fonte.
                </h3>
                <p className="leading-relaxed mb-6" style={{ color: 'rgba(30,58,138,0.8)' }}>
                  Tá fazendo bico, reforma, ou só gosta de mexer com ferramenta? Aqui você acha tudo.
                </p>
                <div className="grid grid-cols-2 gap-2.5 text-sm mb-7">
                  {['Pedreiros', 'Serralheiros', 'Eletricistas', 'Marceneiros', 'Hobistas', 'Makers'].map((t) => (
                    <div key={t} className="flex items-center gap-2 font-semibold" style={{ color: C.blue }}>
                      <Ico.check className="w-4 h-4 flex-shrink-0" />
                      {t}
                    </div>
                  ))}
                </div>
                <CTA size="md" variant="blue"><Ico.wa className="w-4 h-4" /> Falar com vendedor</CTA>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          REDES SOCIAIS
      ============================================ */}
      <section className="py-14 sm:py-20 md:py-28 relative overflow-hidden text-white" style={{ background: C.blue }}>
        <div className="absolute inset-0 pointer-events-none opacity-[0.07]" style={{ backgroundImage: `radial-gradient(circle at 1px 1px, ${C.yellow} 1.5px, transparent 0)`, backgroundSize: '24px 24px' }} />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: 'rgba(220,39,67,0.18)', filter: 'blur(80px)' }} />

        <div className="relative max-w-7xl mx-auto px-5 md:px-6 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* IPHONE — esquerda */}
          <div className="fade-up flex justify-center lg:justify-start relative">
            <div className="absolute inset-0 m-auto w-80 h-80 rounded-full pointer-events-none" style={{
              background: 'radial-gradient(circle, rgba(220,39,67,0.18), rgba(255,204,0,0.12) 40%, transparent 70%)',
              filter: 'blur(50px)',
            }} />
            <div className="relative">
              <Iphone16Pro
                src="/instagram.png"
                width={340}
                height={680}
                className="w-[240px] sm:w-[280px] md:w-[340px] h-auto"
              />
              {/* Badge Online */}
              <div className="absolute -top-2 sm:-top-3 -right-2 sm:-right-3 bg-white rounded-full px-2.5 sm:px-3 py-1 sm:py-1.5 flex items-center gap-1.5" style={{ boxShadow: '0 8px 22px rgba(0,0,0,0.18)' }}>
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#22C55E' }} />
                <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider" style={{ color: C.blue }}>Online</span>
              </div>
              {/* Tag de seguidores */}
              <div className="absolute -bottom-3 sm:-bottom-4 -left-3 sm:-left-6 bg-white rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2 sm:py-3 flex items-center gap-2 sm:gap-3" style={{ boxShadow: '0 12px 30px rgba(0,0,0,0.15)' }}>
                <div className="w-10 h-10 rounded-full grid place-items-center" style={{
                  background: 'linear-gradient(45deg, #f09433, #dc2743, #bc1888)',
                }}>
                  <Ico.ig className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-black text-lg leading-none" style={{ color: C.blue }}>20,6 mil</div>
                  <div className="text-[10px] font-bold uppercase tracking-wider" style={{ color: '#888' }}>Seguidores</div>
                </div>
              </div>
            </div>
          </div>

          {/* TEXTO — direita */}
          <div className="fade-up text-center lg:text-left">
            <div className="inline-flex items-center gap-2 text-[11px] font-black tracking-widest uppercase px-4 py-1.5 rounded-full mb-5" style={{ background: C.yellow, color: C.blue }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: C.blue }} />
              Nos Siga nas Redes
            </div>

            <h2 className="font-black tracking-tight leading-[0.95] mb-6 text-white" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.6rem)' }}>
              Tá rolando muita<br />
              coisa boa no nosso{' '}
              <span style={{
                background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>Instagram.</span>
            </h2>

            <p className="text-base md:text-lg mb-8 max-w-md mx-auto lg:mx-0 text-white/80">
              Promoções "Preço Impossível", lançamentos, dicas de obra e tudo o que sai novo direto da loja. <strong className="text-white">Não fica de fora!</strong>
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <a
                href="https://instagram.com/lojaodosparafusosce"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-7 py-4 rounded-lg font-black text-[14px] uppercase tracking-wide text-white transition-all hover:-translate-y-0.5 active:scale-[0.98]"
                style={{
                  background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
                  boxShadow: '0 8px 22px rgba(220,39,67,0.35)',
                }}
              >
                <Ico.ig className="w-5 h-5" />
                Seguir no Instagram
                <Ico.arr className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com/lojaodosparafusosce"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-bold hover:underline text-white/90"
              >
                @lojaodosparafusosce
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          CTA BANNER AMARELO
      ============================================ */}
      <section className="py-10 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-5 md:px-6">
          <div className="relative rounded-3xl p-8 md:p-14 overflow-hidden fade-up" style={{ background: C.yellow }}>
            <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full" style={{ background: `${C.blue}11` }} />
            <div className="absolute -left-16 -bottom-16 w-60 h-60 rounded-full" style={{ background: '#fff', opacity: 0.4 }} />
            <div className="relative grid md:grid-cols-[1.4fr_1fr] gap-8 items-center">
              <div>
                <div className="inline-block text-[11px] font-black tracking-widest uppercase px-3 py-1 rounded-full mb-4 text-white" style={{ background: C.blue }}>
                  Aproveite
                </div>
                <h3 className="font-black text-3xl md:text-5xl tracking-tighter leading-[1] mb-4" style={{ color: C.blue }}>
                  Precisa de orçamento agora?
                </h3>
                <p className="text-lg" style={{ color: 'rgba(30,58,138,0.85)' }}>
                  Manda a lista no WhatsApp. A gente responde com preço e prazo na hora.
                </p>
              </div>
              <div className="md:justify-self-end">
                <CTA size="xl" variant="green">
                  <Ico.wa className="w-5 h-5" />
                  Fazer orçamento
                  <Ico.arr className="w-4 h-4" />
                </CTA>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          COBERTURA
      ============================================ */}
      <section id="entrega" className="py-14 sm:py-20 md:py-28 relative overflow-hidden text-white" style={{ background: C.blue }}>
        <div className="absolute inset-0 opacity-[0.07] pointer-events-none" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, ${C.yellow} 1.5px, transparent 0)`, backgroundSize: '28px 28px' }} />
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: `${C.yellow}1A`, filter: 'blur(80px)' }} />

        <div className="relative max-w-7xl mx-auto px-5 md:px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div className="fade-up">
            <div className="inline-block text-[11px] font-black tracking-widest uppercase px-4 py-2 rounded-full mb-4" style={{ background: C.yellow, color: C.blue }}>
              Onde entregamos
            </div>
            <h2 className="font-black tracking-tight leading-[0.95] mb-6 text-white" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
              Fortaleza e<br />região metropolitana.
            </h2>
            <p className="text-lg leading-relaxed mb-8 text-white/80">
              Do Centro ao Pécem, da Aldeota ao Castelão. Se sua obra tá rodando, a gente chega.
            </p>
            <div className="rounded-2xl p-6 flex items-start gap-4 mb-6" style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,204,0,0.25)' }}>
              <div className="w-12 h-12 rounded-xl grid place-items-center flex-shrink-0" style={{ background: C.yellow }}>
                <Ico.pin className="w-5 h-5" style={{ color: C.blue }} />
              </div>
              <div>
                <div className="text-[10px] font-black uppercase tracking-wider mb-1" style={{ color: C.yellow }}>Nossa loja</div>
                <div className="font-black text-lg leading-tight text-white">BR-116, KM 10</div>
                <div className="text-sm text-white/70">Jangurussu · Fortaleza/CE</div>
                <div className="text-xs text-white/50 mt-1">CD próprio + Loja Conceito</div>
              </div>
            </div>
            <CTA size="md" variant="yellow"><Ico.wa className="w-4 h-4" /> Consultar entrega</CTA>
          </div>

          {/* Mapa */}
          <div className="fade-up">
            <div className="relative rounded-2xl overflow-hidden" style={{ boxShadow: '0 20px 50px rgba(30,58,138,0.18)', border: `4px solid ${C.yellow}` }}>
              <iframe
                title="Mapa Lojão dos Parafusos"
                src="https://www.google.com/maps?q=BR-116,+10040+-+Jangurussu,+Fortaleza+-+CE&output=embed"
                width="100%"
                style={{ border: 0, display: 'block', height: 'clamp(320px, 50vh, 440px)' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              {/* Card flutuante "Como chegar" */}
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=BR-116,+10040+-+Jangurussu,+Fortaleza+-+CE"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-4 left-4 right-4 md:right-auto md:max-w-[280px] bg-white rounded-xl p-4 flex items-center gap-3 hover:-translate-y-0.5 transition-transform"
                style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.18)' }}
              >
                <div className="w-11 h-11 rounded-lg grid place-items-center flex-shrink-0" style={{ background: C.yellow }}>
                  <Ico.pin className="w-5 h-5" style={{ color: C.blue }} />
                </div>
                <div className="flex-1">
                  <div className="text-[10px] font-black uppercase tracking-wider" style={{ color: '#888' }}>Traçar rota</div>
                  <div className="text-sm font-black leading-tight" style={{ color: C.blue }}>Como chegar →</div>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Bairros atendidos — linha completa */}
        <div className="relative max-w-7xl mx-auto px-5 md:px-6 mt-10">
          <div className="text-center mb-5">
            <div className="text-[11px] font-black tracking-widest uppercase" style={{ color: C.yellow }}>
              <span className="inline-block w-8 h-px align-middle mr-2" style={{ background: C.yellow }} />
              Bairros atendidos
              <span className="inline-block w-8 h-px align-middle ml-2" style={{ background: C.yellow }} />
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-2 fade-up">
            {[
              { name: 'Centro', tag: 'FOR' }, { name: 'Aldeota', tag: 'FOR' }, { name: 'Messejana', tag: 'FOR' },
              { name: 'Montese', tag: 'FOR' }, { name: 'Castelão', tag: 'FOR' }, { name: 'Antônio Bezerra', tag: 'FOR' },
              { name: 'Caucaia', tag: 'RMF' }, { name: 'Maracanaú', tag: 'RMF' },
              { name: 'Eusébio', tag: 'RMF' }, { name: 'Pécem', tag: 'RMF' },
            ].map((c, i) => (
              <div key={i} className="rounded-full px-4 py-2 flex items-center gap-2 hover:-translate-y-0.5 transition-transform" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.18)', backdropFilter: 'blur(8px)' }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: C.yellow }} />
                <span className="font-bold text-sm text-white">{c.name}</span>
                <span className="text-[9px] font-black px-1.5 py-0.5 rounded-full tracking-wider" style={{ background: C.yellow, color: C.blue }}>
                  {c.tag}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          DEPOIMENTOS
      ============================================ */}
      <section className="py-14 sm:py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-5 md:px-6">
          <Testimonials />
        </div>
      </section>

      {/* ============================================
          CTA FINAL
      ============================================ */}
      <section id="contato" className="relative overflow-hidden" style={{ background: C.yellow }}>
        {/* Padrão de pontos azuis sutil */}
        <div className="absolute inset-0 opacity-[0.08] pointer-events-none" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, ${C.blue} 1.5px, transparent 0)`, backgroundSize: '28px 28px' }} />
        {/* Glow decorativo */}
        <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full pointer-events-none" style={{ background: '#fff', opacity: 0.4, filter: 'blur(80px)' }} />
        <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: `${C.blue}22`, filter: 'blur(80px)' }} />

        {/* MASCOTE — posicionada absolutamente (desktop) pra crescer sem limite */}
        <img
          src="/mascote.png"
          alt="Atendente Lojão dos Parafusos"
          className="hidden lg:block absolute right-0 bottom-0 z-10 pointer-events-none"
          style={{
            width: 'min(60vw, 900px)',
            height: 'auto',
            filter: 'drop-shadow(0 20px 40px rgba(15,36,71,0.3))',
          }}
        />

        <div className="relative z-20 max-w-7xl mx-auto px-5 md:px-6 pt-14 sm:pt-16 md:pt-20 lg:pt-24 pb-0 lg:pb-0">
          {/* TEXTO — centralizado na tela inteira */}
          <div className="fade-up text-center pb-10 sm:pb-12 lg:pb-24 flex flex-col items-center mx-auto max-w-2xl">
            <div className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] font-black tracking-widest uppercase px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-5 sm:mb-7 text-white" style={{ background: C.blue }}>
              <Ico.wa className="w-3 h-3 sm:w-3.5 sm:h-3.5" style={{ color: C.yellow }} />
              Resposta em minutos
            </div>

            <h2 className="font-black tracking-tighter leading-[0.9] mb-6 sm:mb-7" style={{ color: C.blue, fontSize: 'clamp(2rem, 9vw, 5.5rem)' }}>
              LIGOU? PEDIU?<br />
              <span className="relative inline-block">
                <span className="relative z-10 text-white">CHEGOU!</span>
                <span className="absolute left-0 bottom-2 right-0 h-3 md:h-4" style={{ background: C.blue, zIndex: 0 }} />
              </span>
            </h2>

            <p className="text-base sm:text-lg md:text-xl mb-7 sm:mb-9 max-w-lg mx-auto" style={{ color: 'rgba(15,36,71,0.8)' }}>
              Atendimento direto pelo WhatsApp. <strong style={{ color: C.blue }}>Sem cadastro, sem formulário, sem enrolação.</strong>
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto">
              <CTA size="xl" variant="green" className="w-full sm:w-auto justify-center">
                <Ico.wa className="w-6 h-6" />
                Peça Agora!
                <Ico.arr className="w-5 h-5" />
              </CTA>
              <a href={`tel:+${PHONE}`} className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-lg font-black text-[14px] sm:text-[15px] uppercase tracking-wide transition-all hover:-translate-y-0.5" style={{ background: C.blue, color: '#fff', boxShadow: '0 8px 22px rgba(15,36,71,0.25)' }}>
                <Ico.phone className="w-5 h-5" style={{ color: C.yellow }} />
                {PHONE_DISPLAY}
              </a>
            </div>

            {/* Selo de confiança */}
            <div className="mt-7 sm:mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm font-bold" style={{ color: 'rgba(15,36,71,0.75)' }}>
              <div className="flex -space-x-2">
                {['R', 'J', 'A', 'M'].map((l, i) => (
                  <div key={i} className="w-7 h-7 sm:w-8 sm:h-8 rounded-full grid place-items-center font-black text-[11px] sm:text-xs border-2" style={{ background: C.blue, color: C.yellow, borderColor: C.yellow }}>
                    {l}
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-0.5" style={{ color: C.blue }}>
                {[...Array(5)].map((_, i) => <Ico.star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4" />)}
              </div>
              <span>+5.000 clientes atendidos</span>
            </div>
          </div>

          {/* MASCOTE — mobile/tablet apenas (desktop usa a versão absoluta acima) */}
          <div className="lg:hidden flex justify-center items-end -mx-5 md:-mx-6">
            <img
              src="/mascote.png"
              alt="Atendente Lojão dos Parafusos"
              className="w-full max-w-[360px] sm:max-w-[480px] md:max-w-[560px] h-auto"
              style={{ filter: 'drop-shadow(0 20px 30px rgba(15,36,71,0.25))' }}
            />
          </div>
        </div>
      </section>

      {/* ============================================
          FOOTER
      ============================================ */}
      <footer className="text-white py-12 sm:py-16" style={{ background: C.blueDeep }}>
        <div className="max-w-7xl mx-auto px-5 md:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 mb-10 sm:mb-12">
            <div>
              <Logo size="md" />
              <p className="mt-5 text-white/50 text-sm leading-relaxed">
                Há 30 anos abastecendo Fortaleza com fixadores, ferramentas e EPIs.
              </p>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-4" style={{ color: C.yellow }}>
                <Ico.pin className="w-4 h-4" />
                <span className="text-[11px] font-black tracking-widest uppercase">Endereço</span>
              </div>
              <p className="text-white/70 text-sm leading-relaxed">
                BR-116, KM 10<br />
                Jangurussu · Fortaleza/CE
              </p>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-4" style={{ color: C.yellow }}>
                <Ico.clock className="w-4 h-4" />
                <span className="text-[11px] font-black tracking-widest uppercase">Atendimento</span>
              </div>
              <p className="text-white/70 text-sm leading-relaxed">
                Seg a Sex · 7h às 18h<br />
                Sábado · 7h às 12h
              </p>
            </div>

            <div>
              <div className="mb-4" style={{ color: C.yellow }}>
                <span className="text-[11px] font-black tracking-widest uppercase">Contato</span>
              </div>
              <a href={`tel:+${PHONE}`} className="flex items-center gap-2 text-white/70 hover:text-yellow-300 transition-colors text-sm mb-2">
                <Ico.phone className="w-4 h-4" />
                {PHONE_DISPLAY}
              </a>
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/70 hover:text-yellow-300 transition-colors text-sm mb-2">
                <Ico.wa className="w-4 h-4" />
                WhatsApp
              </a>
              <a href="https://instagram.com/lojaodosparafusosce" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/70 hover:text-yellow-300 transition-colors text-sm">
                <Ico.ig className="w-4 h-4" />
                @lojaodosparafusosce
              </a>
            </div>
          </div>

          <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/40" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            <div>© {new Date().getFullYear()} Lojão dos Parafusos · Todos os direitos reservados</div>
            <div>Fortaleza · Ceará · Brasil</div>
          </div>
        </div>
      </footer>

      {/* WHATSAPP FLUTUANTE */}
      <a
        href={WA_LINK}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar no WhatsApp"
        className="fixed bottom-5 right-5 z-50 group"
      >
        <span className="absolute inset-0 rounded-full animate-ping opacity-30" style={{ background: C.green }} />
        <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-full grid place-items-center transition-transform group-hover:scale-110" style={{ background: C.green, boxShadow: `0 12px 30px ${C.green}66` }}>
          <Ico.wa className="w-7 h-7 md:w-8 md:h-8 text-white" />
        </div>
      </a>

      <style>{`
        .fade-up { opacity: 0; transform: translateY(24px); transition: opacity .7s ease, transform .7s ease; }
        .fade-up.in { opacity: 1; transform: none; }
        .shimmer-yellow {
          background-image: linear-gradient(
            100deg,
            #FFCC00 0%,
            #FFCC00 38%,
            #FFF5B0 47%,
            #FFFFFF 50%,
            #FFF5B0 53%,
            #FFCC00 62%,
            #FFCC00 100%
          );
          background-size: 250% 100%;
          background-position: 200% 0;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
          animation: shimmerSlide 3.2s ease-in-out infinite;
          animation-delay: 0.8s;
        }
        @keyframes shimmerSlide {
          0% { background-position: 200% 0; }
          50% { background-position: -100% 0; }
          100% { background-position: -100% 0; }
        }
      `}</style>
    </div>
  );
}
