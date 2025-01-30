'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ArrowRight, CheckCircle, Menu, Moon, Sun, X, Star, ShoppingCart, Shield, Clock, Flame, ArrowDown, BookOpen, Download, Brain, Sparkles, Heart, Zap } from 'lucide-react'

export default function LandingPageImprovedDark() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [timeLeft, setTimeLeft] = useState(3600) // 1 hour in seconds
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [showCart, setShowCart] = useState(false)
  const [cartItems, setCartItems] = useState([
    { name: "Ebook 'Ansiedade: O Medo do Futuro'", price: 27.90 }
  ])

  const aboutRef = useRef<HTMLElement>(null)
  const benefitsRef = useRef<HTMLElement>(null)
  const howItWorksRef = useRef<HTMLElement>(null)
  const testimonialsRef = useRef<HTMLElement>(null)
  const faqRef = useRef<HTMLElement>(null)
  const ctaRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    setIsDarkMode(mediaQuery.matches)

    const handler = () => setIsDarkMode(mediaQuery.matches)
    mediaQuery.addListener(handler)
    return () => mediaQuery.removeListener(handler)
  }, [])

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  const removeFromCart = (index: number) => {
    setCartItems(prevItems => prevItems.filter((_, i) => i !== index))
  }

  const testimonials = [
    {
      name: "Zelia Lima",
      text: "Esse e-book está incrível! Comecei a ler e já estou indicando para outras pessoas. Tenho certeza de que será uma grande ajuda para quem enfrenta esses desafios.",
      rating: 5,
      image: "https://i.postimg.cc/05h1pJg4/image.png",
      occupation: "Professora",
      age: 49
    },
    {
      name: "Keiffison Ferreira",
      text: "Mano, esse ebook mudou tudo pra mim! Sempre lutei com ansiedade e pensamentos negativos, mas o plano de ação é BRABO demais! Simples e direto, me ajudou a controlar a mente e focar no que importa. Em poucas semanas, já vi resultado. Recomendo demais!",
      rating: 5,
      image: "https://i.postimg.cc/x8RrhRCf/personalcomentario2.jpg",
      occupation: "Personal Trainer",
      age: 23
    },
    {
      name: "Felipe Lima",
      text: "Sempre começava mil projetos, mas não conseguia focar nem terminar nada porque minha ansiedade me sabotava. Ficava pensando no resultado e, quando não vinha rápido, já queria desistir. O ebook me ajudou a entender esse ciclo. Tô finalmente tirando as coisas do papel!",
      rating: 5,
      image: "https://i.postimg.cc/Cxv95rQ0/comentarioautonomo-2.jpg",
      occupation: "Autonomo",
      age: 19
    }
  ]

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-gradient-to-b from-gray-900 to-blue-900 text-gray-100' : 'bg-gradient-to-b from-blue-50 to-white text-gray-900'}`}>
      {/* Navbar */}
      <nav className={`${isScrolled ? 'shadow-lg backdrop-blur-md' : ''} ${isDarkMode ? 'bg-gray-900/80' : 'bg-white/80'} py-4 fixed w-full z-50 transition-all duration-300 ease-in-out`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <span className={`text-2xl font-bold ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>AnsieLivre</span>
            <div className="hidden md:flex space-x-8">
              {[
                { name: 'Sobre', ref: aboutRef },
                { name: 'Benefícios', ref: benefitsRef },
                { name: 'Depoimentos', ref: testimonialsRef },
                { name: 'FAQ', ref: faqRef },
                { name: 'Comprar', ref: ctaRef }
              ].map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.ref)}
                  className={`hover:${isDarkMode ? 'text-blue-400' : 'text-blue-600'} transition-colors text-sm font-medium relative group`}
                >
                  {item.name}
                  <span className={`absolute -bottom-1 left-0 w-0 h-0.5 ${isDarkMode ? 'bg-blue-400' : 'bg-blue-600'} transition-all group-hover:w-full`}></span>
                </button>
              ))}
            </div>
            <div className="flex items-center space-x-6">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => setIsDarkMode(!isDarkMode)}
                      className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 ${
                        isDarkMode ? 'bg-blue-600' : 'bg-gray-200'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full transition-transform duration-200 ease-in-out transform ${
                          isDarkMode ? 'translate-x-6 bg-white' : 'translate-x-0 bg-blue-600'
                        }`}
                      >
                        {isDarkMode ? (
                          <Moon size={16} className="text-blue-600" />
                        ) : (
                          <Sun size={16} className="text-white" />
                        )}
                      </div>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{isDarkMode ? 'Modo claro' : 'Modo escuro'}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <Button variant="ghost" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </Button>
              <div className="relative">
                <Button variant="ghost" onClick={() => setShowCart(!showCart)} className="p-2">
                  <ShoppingCart size={24} />
                  {cartItems.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                      {cartItems.length}
                    </span>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-16 left-0 right-0 ${isDarkMode ? 'bg-gray-900/95' : 'bg-white/95'} shadow-md z-40 md:hidden backdrop-blur-lg`}
          >
            <div className="flex flex-col items-center py-4 space-y-4">
              {[
                { name: 'Sobre', ref: aboutRef },
                { name: 'Benefícios', ref: benefitsRef },
                { name: 'Depoimentos', ref: testimonialsRef },
                { name: 'FAQ', ref: faqRef },
                { name: 'Comprar', ref: ctaRef }
              ].map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.ref)}
                  className={`hover:${isDarkMode ? 'text-blue-400' : 'text-blue-600'} transition-colors text-lg font-medium`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Shopping Cart Sidebar */}
      <AnimatePresence>
        {showCart && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className={`fixed top-0 right-0 h-full w-64 ${isDarkMode ? 'bg-gray-900' : 'bg-white'} shadow-lg z-50 p-4`}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Seu Carrinho</h3>
              <Button variant="ghost" onClick={() => setShowCart(false)}>
                <X size={20} />
              </Button>
            </div>
            {cartItems.length === 0 ? (
              <p>Seu carrinho está vazio.</p>
            ) : (
              <>
                {cartItems.map((item, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Capa%20Ebook%20Psicologia%20TDAH%20Minimalista%20Amarelo-HHbxGZBUfLWA4UWBc7NGW60UhSIvGF.png"
                      alt="Miniatura do ebook"
                      width={40}
                      height={53}
                      className="rounded mr-2"
                    />
                    <div className="flex-grow">
                      <p className="text-sm">{item.name}</p>
                      <p className="text-sm font-bold">R${item.price.toFixed(2)}</p>
                    </div>
                    <Button variant="ghost" onClick={() => removeFromCart(index)}>
                      <X size={16} />
                    </Button>
                  </div>
                ))}
                <div className="mt-4">
                  <p className="font-bold mb-2">Total: R${cartItems.reduce((sum, item) => sum + item.price, 0).toFixed(2)}</p>
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={() => window.location.href = 'https://pay.kiwify.com.br/iOAnMtX'}
                  >
                    Finalizar Compra
                  </Button>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className={`absolute inset-0 ${isDarkMode ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900' : 'bg-gradient-to-br from-white via-blue-100 to-white'} opacity-70`}></div>
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-z8r0jSKrXmEFd1qNmV0kBO7sPFXarb.png"
            alt="Ilustração representando ansiedade"
            layout="fill"
            objectFit="cover"
            quality={100}
            priority
            className={`${isDarkMode ? 'opacity-30' : 'opacity-20'}`}
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className={`text-4xl md:text-6xl font-bold mb-6 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>Liberte-se da Ansiedade</h1>
            <p className={`text-xl md:text-3xl mb-8 max-w-3xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} font-semibold`}>
              Descubra o poder de controlar sua mente e conquistar a paz interior que você merece.
            </p>
            <Button 
              onClick={() => scrollToSection(aboutRef)}
              className={`${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'} text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 ease-in-out transform hover:scale-105`}
            >
              Transforme Sua Vida Agora
            </Button>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mt-12"
            >
              <ArrowDown size={32} className={`mx-auto animate-bounce ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre" ref={aboutRef} className={`py-24 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="md:w-1/2"
            >
              <h2 className={`text-3xl font-bold mb-6 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>Sobre o Ebook</h2>
              <div className={`text-lg mb-6 p-6 rounded-lg ${isDarkMode ? 'bg-blue-900 text-gray-100' : 'bg-blue-100 text-gray-800'}`}>
                <p className="font-semibold mb-6">
                  "Ansiedade: O Medo do Futuro" é mais que um simples ebook - é seu guia pessoal para uma vida livre de ansiedade. 
                  Descubra técnicas poderosas, exercícios transformadores e insights revolucionários que irão mudar sua relação com o futuro para sempre.
                </p>
                <ul className="space-y-4 mb-8">
                  {[
                    "Técnicas de mindfulness avançadas",
                    "Estratégias de enfrentamento comprovadas",
                    "Exercícios práticos para resultados rápidos",
                    "Histórias inspiradoras de superação real"
                  ].map((item, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle className="text-green-500 mr-3 flex-shrink-0" size={24} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="relative">
                  <Button 
                    onClick={() => scrollToSection(ctaRef)}
                    className={`
                      ${isDarkMode ? 'bg-green-500 hover:bg-green-600' : 'bg-green-600 hover:bg-green-700'} 
                      text-white font-bold py-3 px-4 sm:py-4 sm:px-6 rounded-lg text-sm sm:text-base md:text-lg lg:text-xl 
                      transition duration-300 ease-in-out transform hover:scale-105 w-full shadow-lg hover:shadow-xl 
                      flex items-center justify-center
                    `}
                  >
                    <span className="mr-2 whitespace-nowrap">Comece Sua Transformação Agora</span>
                    <ArrowRight className="inline-block flex-shrink-0" size={24} />
                  </Button>
                  <span className="absolute -top-3 right-0 bg-blue-400 text-white text-xs font-bold py-1 px-2 rounded-full animate-pulse">
                    Oferta Exclusiva!
                  </span>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="md:w-1/2"
            >
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Capa%20Ebook%20Psicologia%20TDAH%20Minimalista%20Amarelo-HHbxGZBUfLWA4UWBc7NGW60UhSIvGF.png"
                alt="Capa do ebook Ansiedade: O Medo do Futuro"
                width={300}
                height={400}
                className="rounded-lg shadow-xl mx-auto transform hover:scale-105 transition-transform duration-300"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="beneficios" ref={benefitsRef} className={`py-16 ${isDarkMode ? 'bg-gray-900' : 'bg-blue-50'}`}>
        <div className="container mx-auto px-4">
          <h2 className={`text-3xl font-bold mb-12 text-center ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>O Que Você Vai Conquistar</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <BookOpen size={24} />, text: "Domínio total sobre suas emoções" },
              { icon: <Brain size={24} />, text: "Mente livre de pensamentos negativos" },
              { icon: <Sparkles size={24} />, text: "Paz interior em qualquer situação" },
              { icon: <CheckCircle size={24} />, text: "Confiança inabalável no futuro" },
              { icon: <Moon size={24} />, text: "Noites de sono profundo e reparador" },
              { icon: <Shield size={24} />, text: "Resiliência emocional inquebrantável" }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className={`${isDarkMode ? 'bg-gradient-to-br from-gray-800 to-blue-900 text-gray-100' : 'bg-white'} border-none shadow-lg hover:shadow-xl transition-shadow duration-300 h-full transform hover:scale-105`}>
                  <CardHeader>
                    <CardTitle className="flex items-start text-lg">
                      <span className={`mr-3 mt-1 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>{benefit.icon}</span>
                      <span className="flex-1">{benefit.text}</span>
                    </CardTitle>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="como-funciona" ref={howItWorksRef} className={`py-16 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="container mx-auto px-4">
          <h2 className={`text-3xl font-bold mb-12 text-center ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>Como Funciona</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <ShoppingCart size={32} />, text: "Adquira o ebook" },
              { icon: <Download size={32} />, text: "Acesse instantaneamente" },
              { icon: <BookOpen size={32} />, text: "Aplique as técnicas" },
              { icon: <Sparkles size={32} />, text: "Transforme sua vida" }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex flex-col items-center text-center"
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${isDarkMode ? 'bg-blue-900' : 'bg-blue-100'}`}>
                  <span className={isDarkMode ? 'text-blue-400' : 'text-blue-600'}>{step.icon}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.text}</h3>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {index === 0 && "Invista em você mesmo com segurança"}
                  {index === 1 && "Comece sua jornada imediatamente"}
                  {index === 2 && "Veja resultados desde o primeiro dia"}
                  {index === 3 && "Desfrute de uma nova realidade sem ansiedade"}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="depoimentos" ref={testimonialsRef} className={`py-16 ${isDarkMode ? 'bg-gray-900' : 'bg-blue-50'}`}>
        <div className="container mx-auto px-4">
          <h2 className={`text-4xl font-bold mb-12 text-center ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>Histórias de Transformação Real</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Dialog>
                  <DialogTrigger asChild>
                    <Card className={`${isDarkMode ? 'bg-gradient-to-br from-gray-800 to-blue-900 text-gray-100' : 'bg-gradient-to-br from-blue-50 to-blue-100'} border-none shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer overflow-hidden transform hover:scale-105`}>
                      <CardHeader className="pb-2">
                        <div className="flex items-center space-x-4">
                          <Image
                            src={testimonial.image || "/placeholder.svg"}
                            alt={`Foto de ${testimonial.name}`}
                            width={60}
                            height={60}
                            className="rounded-full object-cover w-15 h-15 border-2 border-blue-400 flex-shrink-0"
                          />
                          <div>
                            <CardTitle className="text-lg font-semibold">{testimonial.name}</CardTitle>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {testimonial.occupation}, {testimonial.age} anos
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm mb-4 line-clamp-4 relative">
                          {testimonial.text}
                          <span className="absolute bottom-0 right-0 bg-gradient-to-l from-white dark:from-gray-800 to-transparent w-12 h-6"></span>
                        </p>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={i < Math.floor(testimonial.rating) ? "text-yellow-400" : "text-gray-300"} 
                              size={16} 
                              fill={i < Math.floor(testimonial.rating) ? "currentColor" : "none"} 
                            />
                          ))}
                          <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                            ({testimonial.rating}/5)
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[550px] p-0 overflow-hidden">
                    <div className={`${isDarkMode ? 'bg-gradient-to-br from-blue-900 to-blue-700' : 'bg-gradient-to-br from-blue-200 to-blue-100'} p-6 rounded-t-lg`}>
                      <DialogHeader>
                        <DialogTitle className="flex items-center space-x-4">
                          <Image
                            src={testimonial.image || "/placeholder.svg"}
                            alt={`Foto de ${testimonial.name}`}
                            width={80}
                            height={80}
                            className="rounded-full object-cover w-20 h-20 border-4 border-blue-400 flex-shrink-0 shadow-lg"
                          />
                          <div>
                            <h3 className="text-2xl font-bold">{testimonial.name}</h3>
                            <p className={`text-sm ${isDarkMode ? 'text-blue-200' : 'text-blue-800'}`}>
                              {testimonial.occupation}, {testimonial.age} anos
                            </p>
                          </div>
                        </DialogTitle>
                      </DialogHeader>
                    </div>
                    <div className={`p-6 ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'}`}>
                      <p className="text-lg mb-4">{testimonial.text}</p>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={i < Math.floor(testimonial.rating) ? "text-yellow-400" : "text-gray-300"} 
                            size={24} 
                            fill={i < Math.floor(testimonial.rating) ? "currentColor" : "none"} 
                          />
                        ))}
                        <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                          ({testimonial.rating}/5)
                        </span>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" ref={faqRef} className={`py-16 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="container mx-auto px-4">
          <h2 className={`text-3xl font-bold mb-12 text-center ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>Perguntas Frequentes</h2>
          <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
            {[
              {
                question: "Quanto tempo leva para ver resultados?",
                answer: "Muitos leitores relatam melhorias significativas em suas vidas após apenas algumas semanas de prática consistente das técnicas apresentadas no ebook. No entanto, cada pessoa é única e os resultados podem variar. O importante é a dedicação e a aplicação constante das estratégias."
              },
              {
                question: "O ebook é adequado para todos os níveis de ansiedade?",
                answer: "Absolutamente! O ebook foi cuidadosamente projetado para ajudar pessoas com diferentes níveis de ansiedade, desde leve até severa. As técnicas e estratégias podem ser facilmente adaptadas às necessidades individuais de cada leitor, permitindo uma abordagem personalizada para o controle da ansiedade."
              },
              {
                question: "Como posso acessar o ebook após a compra?",
                answer: "Imediatamente após a conclusão da compra, você receberá um e-mail com instruções detalhadas sobre como baixar e acessar seu ebook. O acesso é instantâneo, permitindo que você comece sua jornada de transformação no momento em que estiver pronto. O conteúdo pode ser acessado em qualquer dispositivo, tornando-o conveniente para leitura em qualquer lugar e a qualquer momento."
              },
              {
                question: "Existe uma garantia de reembolso?",
                answer: "Sim, oferecemos uma garantia de satisfação de 7 dias. Se você não estiver completamente satisfeito com o ebook, pode solicitar um reembolso total dentro deste período, sem questionamentos. Estamos tão confiantes na qualidade e eficácia do nosso conteúdo que queremos que você tenha total tranquilidade ao fazer essa importante investimento em si mesmo."
              }
            ].map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section id="comprar" ref={ctaRef} className={`py-16 ${isDarkMode ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900' : 'bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600'} text-white`}>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-4xl font-bold mb-6">Transforme Sua Vida Hoje</h2>
            <p className="text-xl mb-8">
              Não deixe a ansiedade controlar seu futuro. Dê o primeiro passo para uma vida plena e feliz agora mesmo!
            </p>
            <Card className={`${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'} overflow-hidden transform hover:scale-105 transition-transform duration-300`}>
              <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-400 text-white">
                <CardTitle className="text-3xl font-bold">Oferta Exclusiva</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex-shrink-0">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Capa%20Ebook%20Psicologia%20TDAH%20Minimalista%20Amarelo-HHbxGZBUfLWA4UWBc7NGW60UhSIvGF.png"
                      alt="Visualização do ebook Ansiedade: O Medo do Futuro"
                      width={200}
                      height={267}
                      className="rounded-lg shadow-md"
                    />
                  </div>
                  <div className="flex-grow text-center md:text-left">
                    <p className={`text-5xl font-bold ${isDarkMode ? 'text-blue-400' : 'text-blue-600'} mb-4`}>R$27,90</p>
                    <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-4 text-2xl`}>
                      <span className="line-through">R$97,00</span>
                    </p>
                    <p className={`${isDarkMode ? 'text-green-400' : 'text-green-600'} font-bold text-3xl mb-4`}>
                      71% de desconto!
                    </p>
                    <div className="flex items-center justify-center md:justify-start space-x-2 mb-4">
                      <Clock className="text-blue-500" size={24} />
                      <p className={`text-lg ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                        Oferta por tempo limitado: <span className="font-bold">{formatTime(timeLeft)}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col items-center bg-gradient-to-r from-blue-600 to-blue-400 p-6">
                <Button 
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-full text-xl transition duration-300 ease-in-out transform hover:scale-105 mb-4 flex items-center justify-center"
                  onClick={() => window.location.href = 'https://pay.kiwify.com.br/iOAnMtX'}
                >
                  <span className="mr-2">Comprar Agora</span>
                  <ArrowRight className="ml-2" size={24} />
                </Button>
                <p className="text-sm flex items-center mt-4 text-white">
                  <Shield className="mr-2" size={20} />
                  7 dias de garantia de satisfação ou seu dinheiro de volta
                </p>
              </CardFooter>
            </Card>
            <div className="mt-8 flex items-center justify-center space-x-4">
              <Flame className="text-blue-500" size={24} />
              <p className="text-lg font-semibold">Mais de 1000 pessoas já transformaram suas vidas com este ebook!</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`${isDarkMode ? 'bg-gray-900 text-gray-300' : 'bg-gray-900 text-white'} py-8`}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>&copy; 2023 AnsieLivre. Todos os direitos reservados.</p>
            <div className="mt-4 md:mt-0 flex items-center">
              <Input 
                type="email" 
                placeholder="Receba novidades por e-mail" 
                className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-800 border-gray-700'} text-white mr-2`} 
              />
              <Button className="bg-blue-600 hover:bg-blue-700">
                Inscrever-se
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}