'use client'

import { motion } from 'framer-motion'

// Pre-calculate all Math values to prevent hydration mismatches
const ORBITING_BLOCKS = [0, 1, 2, 3].map((i) => ({
  index: i,
  xPath: [0, 200 * Math.cos((i * Math.PI) / 2), 0],
  yPath: [0, 200 * Math.sin((i * Math.PI) / 2), 0],
}))

const CONNECTING_LINES = [0, 60, 120, 180, 240, 300].map((angle, i) => ({
  index: i,
  x2: `${50 + 40 * Math.cos((angle * Math.PI) / 180)}%`,
  y2: `${50 + 40 * Math.sin((angle * Math.PI) / 180)}%`,
}))

export function BlockchainVisual() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="relative w-full max-w-md aspect-square">
        {/* Central Cube */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="relative w-48 h-48">
            {/* 3D Cube Effect */}
            <motion.div
              animate={{
                rotateY: [0, 360],
                rotateX: [0, 15, 0],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
              className="w-full h-full"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Front Face */}
              <div
                className="absolute inset-0 border-4 border-black bg-white"
                style={{ transform: 'translateZ(24px)' }}
              >
                <div className="w-full h-full grid grid-cols-3 grid-rows-3 gap-2 p-4">
                  {[...Array(9)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="bg-black"
                      initial={{ scale: 0 }}
                      animate={{ scale: [0, 1, 0] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.1,
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Back Face */}
              <div
                className="absolute inset-0 border-4 border-black bg-gray-100"
                style={{ transform: 'translateZ(-24px) rotateY(180deg)' }}
              />

              {/* Right Face */}
              <div
                className="absolute inset-0 border-4 border-black bg-gray-50"
                style={{ transform: 'rotateY(90deg) translateZ(24px)' }}
              />

              {/* Left Face */}
              <div
                className="absolute inset-0 border-4 border-black bg-gray-200"
                style={{ transform: 'rotateY(-90deg) translateZ(24px)' }}
              />

              {/* Top Face */}
              <div
                className="absolute inset-0 border-4 border-black bg-white"
                style={{ transform: 'rotateX(90deg) translateZ(24px)' }}
              />

              {/* Bottom Face */}
              <div
                className="absolute inset-0 border-4 border-black bg-gray-100"
                style={{ transform: 'rotateX(-90deg) translateZ(24px)' }}
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Orbiting Blocks */}
        {ORBITING_BLOCKS.map(({ index, xPath, yPath }) => (
          <motion.div
            key={index}
            className="absolute w-12 h-12 border-2 border-black bg-white"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 1, 1, 0],
              rotate: 360,
              x: xPath,
              y: yPath,
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              delay: index * 0.5,
              ease: "linear"
            }}
            style={{
              left: '50%',
              top: '50%',
              marginLeft: -24,
              marginTop: -24,
            }}
          >
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-6 h-6 bg-black" />
            </div>
          </motion.div>
        ))}

        {/* Connecting Lines */}
        <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }}>
          {CONNECTING_LINES.map(({ index, x2, y2 }) => (
            <motion.line
              key={index}
              x1="50%"
              y1="50%"
              x2={x2}
              y2={y2}
              stroke="black"
              strokeWidth="2"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: [0, 1, 0], opacity: [0, 1, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: index * 0.2,
              }}
            />
          ))}
        </svg>

        {/* Corner Blocks */}
        {[
          { top: '10%', left: '10%' },
          { top: '10%', right: '10%' },
          { bottom: '10%', left: '10%' },
          { bottom: '10%', right: '10%' },
        ].map((pos, i) => (
          <motion.div
            key={i}
            className="absolute w-8 h-8 border-2 border-black bg-white"
            style={pos}
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          >
            <div className="w-full h-full grid grid-cols-2 grid-rows-2 gap-1 p-1">
              {[...Array(4)].map((_, j) => (
                <div key={j} className="bg-black" />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
