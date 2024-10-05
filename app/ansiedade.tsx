'use client';

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ArrowRight, CheckCircle, Menu, Moon, Sun, X, Star, ShoppingCart, Shield, Clock, Flame, ArrowDown } from "lucide-react"

export default function LandingPageImprovedDark() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [timeLeft, setTimeLeft] = useState(3600) // 1 hour in seconds
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [showCart, setShowCart] = useState(false)
  const [cartItems, setCartItems] = useState([
    { name: "Ebook 'Ansiedade: O Medo do Futuro'", price: 47.90 }
  ])

  const aboutRef = useRef<HTMLElement>(null)
  const benefitsRef = useRef<HTMLElement>(null)
  const testimonialsRef = useRef<HTMLElement>(null)
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
    // Check system preference
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
    const newCartItems = [...cartItems]
    newCartItems.splice(index, 1)
    setCartItems(newCartItems)
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-[#020617] text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      {/* Navbar */}
      <nav className={`${isScrolled ? 'shadow-md' : ''} ${isDarkMode ? 'bg-[#020617] bg-opacity-90' : 'bg-white bg-opacity-90'} py-4 fixed w-full z-50 transition-all duration-300 ease-in-out backdrop-blur-sm`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <span className={`text-2xl font-bold ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>AnsieLivre</span>
          <div className="hidden md:flex space-x-8">
            <button onClick={() => scrollToSection(aboutRef)} className={`hover:${isDarkMode ? 'text-blue-400' : 'text-blue-600'} transition-colors`}>Sobre</button>
            <button onClick={() => scrollToSection(benefitsRef)} className={`hover:${isDarkMode ? 'text-blue-400' : 'text-blue-600'} transition-colors`}>Benefícios</button>
            <button onClick={() => scrollToSection(testimonialsRef)} className={`hover:${isDarkMode ? 'text-blue-400' : 'text-blue-600'} transition-colors`}>Depoimentos</button>
            <button onClick={() => scrollToSection(ctaRef)} className={`hover:${isDarkMode ? 'text-blue-400' : 'text-blue-600'} transition-colors`}>Comprar</button>
          </div>
          <div className="flex items-center space-x-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Switch
                    checked={isDarkMode}
                    onCheckedChange={setIsDarkMode}
                    className="data-[state=checked]:bg-blue-600"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isDarkMode ? 'Modo claro' : 'Modo escuro'}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            {isDarkMode ? <Moon size={20} className="text-blue-400" /> : <Sun size={20} />}
            <Button variant="ghost" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </Button>
            <div className="relative">
              <Button variant="ghost" onClick={() => setShowCart(!showCart)} className="p-2">
                <ShoppingCart size={20} />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                    {cartItems.length}
                  </span>
                )}
              </Button>
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
            className={`fixed top-16 left-0 right-0 ${isDarkMode ? 'bg-[#020617] bg-opacity-95' : 'bg-white bg-opacity-95'} shadow-md z-40 md:hidden backdrop-blur-sm`}
          >
            <div className="flex flex-col items-center py-4 space-y-4">
              <button onClick={() => scrollToSection(aboutRef)} className={`hover:${isDarkMode ? 'text-blue-400' : 'text-blue-600'} transition-colors`}>Sobre</button>
              <button onClick={() => scrollToSection(benefitsRef)} className={`hover:${isDarkMode ? 'text-blue-400' : 'text-blue-600'} transition-colors`}>Benefícios</button>
              <button onClick={() => scrollToSection(testimonialsRef)} className={`hover:${isDarkMode ? 'text-blue-400' : 'text-blue-600'} transition-colors`}>Depoimentos</button>
              <button onClick={() => scrollToSection(ctaRef)} className={`hover:${isDarkMode ? 'text-blue-400' : 'text-blue-600'} transition-colors`}>Comprar</button>
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
            className={`fixed top-0 right-0 h-full w-64 ${isDarkMode ? 'bg-[#020617]' : 'bg-white'} shadow-lg z-50 p-4`}
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
          <div className={`absolute inset-0 ${isDarkMode ? 'bg-black' : 'bg-white'} opacity-50`}></div>
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
            <h1 className={`text-4xl md:text-6xl font-bold mb-6 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>Ansiedade: O Medo do Futuro</h1>
            <p className={`text-xl md:text-3xl mb-8 max-w-3xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} font-semibold`}>
              Descubra como superar a ansiedade e conquistar a paz interior que você merece.
            </p>
            <Button 
              onClick={() => scrollToSection(aboutRef)}
              className={`${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'} text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 ease-in-out transform hover:scale-105`}
            >
              Saiba Mais
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
      <section id="sobre" ref={aboutRef} className={`py-24 ${isDarkMode ? 'bg-[#020617]' : 'bg-white'}`}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="md:w-1/2"
            >
              <h2 className={`text-3xl font-bold mb-6 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>Sobre o Ebook</h2>
              <div className={`text-lg mb-6 p-4 rounded-lg ${isDarkMode ? 'bg-blue-900 text-gray-100' : 'bg-blue-100 text-gray-800'}`}>
                <p className="font-semibold mb-4">
                  "Ansiedade: O Medo do Futuro" é um guia prático e acessível para ajudar você a entender e superar a ansiedade. 
                  Descubra técnicas eficazes, exercícios diários e insights valiosos para transformar sua relação com o futuro.
                </p>
                <ul className="space-y-2 mb-4">
                  {[
                    "Técnicas de mindfulness",
                    "Estratégias de enfrentamento",
                    "Exercícios práticos",
                    "Histórias inspiradoras"
                  ].map((item, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle className="text-green-500 mr-2 flex-shrink-0" size={20} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
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
                className="rounded-lg shadow-xl mx-auto"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="beneficios" ref={benefitsRef} className={`py-16 ${isDarkMode ? 'bg-[#020617]' : 'bg-gray-100'}`}>
        <div className="container mx-auto px-4">
          <h2 className={`text-3xl font-bold mb-12 text-center ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>O Que Você Vai Aprender</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { text: "Técnicas de respiração" },
              { text: "Lidar com pensamentos negativos" },
              { text: "Exercícios de mindfulness" },
              { text: "Plano de ação contra ansiedade" },
              { text: "Melhorar qualidade do sono" },
              { text: "Construir resiliência emocional" }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className={`${isDarkMode ? 'bg-[#0f172a] text-gray-100' : 'bg-white'} border-none shadow-lg hover:shadow-xl transition-shadow duration-300`}>
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <CheckCircle className="text-green-500 mr-2 flex-shrink-0" size={20} />
                      <span>{benefit.text}</span>
                    </CardTitle>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="depoimentos" ref={testimonialsRef} className={`py-16 ${isDarkMode ? 'bg-[#020617]' : 'bg-white'}`}>
        <div className="container mx-auto px-4">
          <h2 className={`text-3xl font-bold mb-12 text-center ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>O Que Nossos Leitores Dizem</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Maria Silva",
                text: "Este ebook mudou minha vida! As técnicas de respiração e mindfulness me ajudaram a controlar minha ansiedade de forma incrível.",
                rating: 5,
                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
              },
              {
                name: "João Santos",
                text: "Finalmente entendi como lidar com meus pensamentos negativos. O plano de ação contra a ansiedade é simplesmente fantástico!",
                rating: 5,
                image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1738&q=80"
              },
              {
                name: "Ana Oliveira",
                text: "Recomendo este ebook para todos que sofrem com ansiedade. As estratégias são práticas e fáceis de implementar no dia a dia.",
                rating: 4,
                image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1738&q=80"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className={`${isDarkMode ? 'bg-[#0f172a] text-gray-100' : 'bg-gray-100'} border-none shadow-lg hover:shadow-xl transition-shadow duration-300`}>
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <Image
                        src={testimonial.image}
                        alt={`Foto de ${testimonial.name}`}
                        width={50}
                        height={50}
                        className="rounded-full object-cover"
                      />
                      <CardTitle className="text-lg font-semibold">{testimonial.name}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-4">{testimonial.text}</p>
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="text-yellow-400" size={16} fill="currentColor" />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="comprar" ref={ctaRef} className={`py-16 ${isDarkMode ? 'bg-[#020617]' : 'bg-blue-600'} text-white`}>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-4xl font-bold mb-6">Transforme Sua Vida Hoje</h2>
            <p className="text-xl mb-8">
              Não deixe a ansiedade controlar seu futuro. Adquira agora o ebook e comece sua jornada para uma vida mais tranquila e feliz.
            </p>
            <Card className={`${isDarkMode ? 'bg-[#0f172a] text-gray-100' : 'bg-white text-gray-900'} overflow-hidden`}>
              <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-400 text-white">
                <CardTitle className="text-3xl font-bold">Oferta Especial</CardTitle>
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
                    <p className={`text-5xl font-bold ${isDarkMode ? 'text-blue-400' : 'text-blue-600'} mb-4`}>R$47,90</p>
                    <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-4 text-2xl`}>
                      <span className="line-through">R$100,00</span>
                    </p>
                    <p className={`${isDarkMode ? 'text-green-400' : 'text-green-600'} font-bold text-3xl mb-4`}>
                      52% de desconto!
                    </p>
                    <div className="flex items-center justify-center md:justify-start space-x-2 mb-4">
                      <Clock className="text-yellow-500" size={24} />
                      <p className={`text-lg ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>
                        Oferta por tempo limitado: <span className="font-bold">{formatTime(timeLeft)}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col items-center bg-gradient-to-r from-blue-600 to-blue-400 p-6">
                <Button 
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-full text-xl transition duration-300 ease-in-out transform hover:scale-105 mb-4"
                  onClick={() => window.location.href = 'https://pay.kiwify.com.br/iOAnMtX'}
                >
                  Comprar Agora <ArrowRight className="ml-2" size={24} />
                </Button>
                <p className="text-sm flex items-center mt-4 text-white">
                  <Shield className="mr-2" size={20} />
                  7 dias de garantia de satisfação ou seu dinheiro de volta
                </p>
              </CardFooter>
            </Card>
            <div className="mt-8 flex items-center justify-center space-x-4">
              <Flame className="text-yellow-500" size={24} />
              <p className="text-lg font-semibold">Mais de 1000 pessoas já transformaram suas vidas com este ebook!</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`${isDarkMode ? 'bg-[#020617] text-gray-300' : 'bg-gray-900 text-white'} py-8`}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>&copy; 2023 AnsieLivre. Todos os direitos reservados.</p>
            <div className="mt-4 md:mt-0">
              <Input 
                type="email" 
                placeholder="Receba novidades por e-mail" 
                className={`${isDarkMode ? 'bg-[#0f172a] border-[#1e293b]' : 'bg-gray-800 border-gray-700'} text-white`} 
              />
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}