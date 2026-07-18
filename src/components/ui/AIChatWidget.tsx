import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Message {
  id: string
  sender: 'user' | 'bot'
  text: string
}

export const AIChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', sender: 'bot', text: 'Hi! I am your AYXVIBE AI Counsellor. Ask me anything about studying abroad, AI courses, or global career paths!' }
  ])
  const [inputValue, setInputValue] = useState('')

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    const userMsg: Message = { id: Date.now().toString(), sender: 'user', text: inputValue }
    setMessages((prev) => [...prev, userMsg])
    setInputValue('')

    // Generate automated mock response
    setTimeout(() => {
      let botResponse = "That sounds interesting! We offer multiple programs in that area. Could you tell me which countries or skills you're most focused on?"
      const text = inputValue.toLowerCase()
      if (text.includes('ielts') || text.includes('toefl') || text.includes('test')) {
        botResponse = 'We have dedicated preparation directories for IELTS, TOEFL, and PTE. You can check our Test Prep section!'
      } else if (text.includes('uk') || text.includes('united kingdom') || text.includes('london')) {
        botResponse = 'Studying in the UK is a great choice! Top universities like Oxford, Cambridge, and Imperial College London are our partners. Check out our Destination UK guide.'
      } else if (text.includes('ai') || text.includes('tech') || text.includes('python')) {
        botResponse = 'Our AI & Technology Academy offers masterclasses on Prompt Engineering, Python, and Data Science. Visit the Academy Hub to learn more.'
      }

      const botMsg: Message = { id: (Date.now() + 1).toString(), sender: 'bot', text: botResponse }
      setMessages((prev) => [...prev, botMsg])
    }, 1000)
  }

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end">
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="w-[360px] h-[480px] rounded-2xl glass-panel-high shadow-glass-hover flex flex-col overflow-hidden mb-4 border border-white/40"
          >
            {/* Header */}
            <div className="bg-primary/95 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-white text-[20px]">psychology</span>
                </div>
                <div>
                  <h3 className="font-headline text-label-md leading-none font-bold">AI Counsellor</h3>
                  <span className="text-[10px] opacity-75">Online • Always helpful</span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/10 rounded-full w-8 h-8 flex items-center justify-center transition-colors"
              >
                <span className="material-symbols-outlined text-white text-[20px]">close</span>
              </button>
            </div>

            {/* Message Area */}
            <div className="flex-grow p-4 overflow-y-auto space-y-3 flex flex-col">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`max-w-[80%] p-3 rounded-2xl text-body-md text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-secondary text-white rounded-br-none self-end'
                      : 'bg-white/60 text-on-surface rounded-bl-none border border-white/40 self-start shadow-sm'
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSend} className="p-3 border-t border-white/20 bg-white/30 backdrop-blur-md flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask me about study or careers..."
                className="flex-grow px-4 py-2.5 rounded-full bg-white/50 border border-[#c5c5d3]/40 focus:outline-none focus:border-secondary/60 text-sm placeholder:text-outline"
              />
              <button
                type="submit"
                className="w-10 h-10 rounded-full bg-secondary hover:bg-secondary-container text-white flex items-center justify-center shadow-md transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">send</span>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button (FAB) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="
          relative
          w-16
          h-16
          rounded-full
          bg-gradient-to-tr
          from-secondary
          to-secondary-container
          text-white
          flex
          items-center
          justify-center
          shadow-[0_0_20px_rgba(0,88,190,0.4)]
          hover:shadow-[0_0_30px_rgba(0,88,190,0.6)]
          hover:scale-110
          active:scale-95
          transition-all
          duration-300
          cursor-pointer
          group
          outline-none
        "
        aria-label="Toggle AI Counsellor Chat"
      >
        {/* Pulsing Aura Ring */}
        <span className="absolute inset-0 rounded-full bg-secondary/30 animate-ping -z-10" />
        
        <span className="material-symbols-outlined text-3xl font-light select-none">
          {isOpen ? 'chat_bubble_outline' : 'psychology'}
        </span>

        {/* Tooltip on hover */}
        {!isOpen && (
          <div className="absolute right-20 bg-on-surface text-white px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none shadow-lg border border-white/10 text-left">
            <div className="font-headline text-[13px] font-bold">AI Counsellor</div>
            <div className="text-[11px] opacity-80 font-body">Ask me anything</div>
          </div>
        )}
      </button>
    </div>
  )
}
export default AIChatWidget
