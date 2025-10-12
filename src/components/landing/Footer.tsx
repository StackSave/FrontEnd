'use client'

import { Github, Twitter, MessageCircle } from 'lucide-react'

const quickLinks = [
  { name: 'WhatsApp Bot', href: 'https://wa.me/' },
  { name: 'Documentation', href: '#' },
  { name: 'GitHub', href: '#' },
]

const socialLinks = [
  { name: 'GitHub', icon: Github, href: '#' },
  { name: 'Twitter', icon: Twitter, href: '#' },
  { name: 'Discord', icon: MessageCircle, href: '#' },
]

export function Footer() {
  return (
    <footer className="border-t border-black bg-white">
      <div className="container px-4 md:px-6 py-12 md:py-16">
        <div className="flex flex-col md:flex-row justify-between gap-8 mb-12">
          {/* Brand */}
          <div className="max-w-sm">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-black" />
              <span className="font-bold text-xl text-black">StackSave</span>
            </div>
            <p className="text-sm text-gray-600 mb-6">
              Save smart, reach goals faster — your decentralized savings journey starts here.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="text-black hover:text-gray-600 transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold mb-4 text-black text-sm uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-black transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-black flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} StackSave. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-gray-600 hover:text-black transition-colors">
              Privacy
            </a>
            <a href="#" className="text-sm text-gray-600 hover:text-black transition-colors">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
