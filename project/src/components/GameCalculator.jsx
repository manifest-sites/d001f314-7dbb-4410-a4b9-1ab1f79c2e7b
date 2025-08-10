import { useState } from 'react'
import { Button, Card, Typography, Space } from 'antd'

const { Title } = Typography

function GameCalculator() {
  const [display, setDisplay] = useState('0')
  const [previousValue, setPreviousValue] = useState(null)
  const [operation, setOperation] = useState(null)
  const [waitingForNext, setWaitingForNext] = useState(false)

  const handleNumber = (number) => {
    if (waitingForNext) {
      setDisplay(String(number))
      setWaitingForNext(false)
    } else {
      setDisplay(display === '0' ? String(number) : display + number)
    }
  }

  const handleOperator = (op) => {
    const currentValue = parseFloat(display)

    if (previousValue === null) {
      setPreviousValue(currentValue)
    } else if (operation) {
      const result = calculate(previousValue, currentValue, operation)
      setDisplay(String(result))
      setPreviousValue(result)
    }

    setWaitingForNext(true)
    setOperation(op)
  }

  const calculate = (prev, current, op) => {
    switch (op) {
      case '+':
        return prev + current
      case '-':
        return prev - current
      case '*':
        return prev * current
      case '/':
        return prev / current
      default:
        return current
    }
  }

  const handleEquals = () => {
    if (operation && previousValue !== null && !waitingForNext) {
      const currentValue = parseFloat(display)
      const result = calculate(previousValue, currentValue, operation)
      setDisplay(String(result))
      setPreviousValue(null)
      setOperation(null)
      setWaitingForNext(true)
    }
  }

  const handleClear = () => {
    setDisplay('0')
    setPreviousValue(null)
    setOperation(null)
    setWaitingForNext(false)
  }

  const handleDecimal = () => {
    if (waitingForNext) {
      setDisplay('0.')
      setWaitingForNext(false)
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.')
    }
  }

  const NumberButton = ({ value, style = {} }) => (
    <Button
      size="large"
      onClick={() => handleNumber(value)}
      className="h-16 text-xl font-bold border-4 border-purple-600 bg-gradient-to-b from-purple-400 to-purple-600 hover:from-purple-300 hover:to-purple-500 text-white shadow-lg transform hover:scale-105 transition-all duration-150"
      style={{
        fontFamily: 'monospace',
        textShadow: '2px 2px 0px rgba(0,0,0,0.5)',
        ...style
      }}
    >
      {value}
    </Button>
  )

  const OperatorButton = ({ symbol, operation: op, style = {} }) => (
    <Button
      size="large"
      onClick={() => handleOperator(op)}
      className="h-16 text-xl font-bold border-4 border-red-600 bg-gradient-to-b from-red-400 to-red-600 hover:from-red-300 hover:to-red-500 text-white shadow-lg transform hover:scale-105 transition-all duration-150"
      style={{
        fontFamily: 'monospace',
        textShadow: '2px 2px 0px rgba(0,0,0,0.5)',
        ...style
      }}
    >
      {symbol}
    </Button>
  )

  const SpecialButton = ({ children, onClick, bgColor = 'blue', style = {} }) => (
    <Button
      size="large"
      onClick={onClick}
      className={`h-16 text-xl font-bold border-4 border-${bgColor}-600 bg-gradient-to-b from-${bgColor}-400 to-${bgColor}-600 hover:from-${bgColor}-300 hover:to-${bgColor}-500 text-white shadow-lg transform hover:scale-105 transition-all duration-150`}
      style={{
        fontFamily: 'monospace',
        textShadow: '2px 2px 0px rgba(0,0,0,0.5)',
        ...style
      }}
    >
      {children}
    </Button>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-4 flex items-center justify-center">
      <Card className="bg-gray-900 border-8 border-yellow-400 shadow-2xl max-w-md w-full">
        <div className="text-center mb-6">
          <Title level={1} className="text-yellow-400 mb-2" style={{ fontFamily: 'monospace', textShadow: '3px 3px 0px rgba(0,0,0,0.7)' }}>
            🎮 GAME CALC 🎮
          </Title>
          <div className="text-green-400 text-sm font-mono mb-4">LEVEL: MATH MASTER</div>
        </div>

        {/* Display Screen */}
        <div className="bg-black border-4 border-gray-600 p-4 mb-6 rounded-lg shadow-inner">
          <div className="text-green-400 font-mono text-xs mb-1">SCORE:</div>
          <div 
            className="text-green-400 font-mono text-3xl text-right min-h-12 flex items-center justify-end break-all"
            style={{ textShadow: '0 0 10px rgba(74, 222, 128, 0.5)' }}
          >
            {display}
          </div>
          {operation && (
            <div className="text-yellow-400 font-mono text-xs text-right mt-1">
              OP: {operation}
            </div>
          )}
        </div>

        {/* Button Grid */}
        <div className="grid grid-cols-4 gap-3">
          {/* Row 1 */}
          <SpecialButton onClick={handleClear} bgColor="red" style={{ borderColor: '#dc2626', background: 'linear-gradient(to bottom, #f87171, #dc2626)' }}>
            CLR
          </SpecialButton>
          <SpecialButton onClick={() => {}} bgColor="yellow" style={{ borderColor: '#d97706', background: 'linear-gradient(to bottom, #fbbf24, #d97706)', color: '#000' }}>
            ±
          </SpecialButton>
          <SpecialButton onClick={() => {}} bgColor="yellow" style={{ borderColor: '#d97706', background: 'linear-gradient(to bottom, #fbbf24, #d97706)', color: '#000' }}>
            %
          </SpecialButton>
          <OperatorButton symbol="÷" operation="/" />

          {/* Row 2 */}
          <NumberButton value={7} />
          <NumberButton value={8} />
          <NumberButton value={9} />
          <OperatorButton symbol="×" operation="*" />

          {/* Row 3 */}
          <NumberButton value={4} />
          <NumberButton value={5} />
          <NumberButton value={6} />
          <OperatorButton symbol="−" operation="-" />

          {/* Row 4 */}
          <NumberButton value={1} />
          <NumberButton value={2} />
          <NumberButton value={3} />
          <OperatorButton symbol="+" operation="+" />

          {/* Row 5 */}
          <NumberButton value={0} style={{ gridColumn: 'span 2' }} />
          <SpecialButton onClick={handleDecimal} bgColor="green" style={{ borderColor: '#059669', background: 'linear-gradient(to bottom, #34d399, #059669)' }}>
            .
          </SpecialButton>
          <SpecialButton onClick={handleEquals} bgColor="emerald" style={{ borderColor: '#047857', background: 'linear-gradient(to bottom, #10b981, #047857)' }}>
            =
          </SpecialButton>
        </div>

        <div className="text-center mt-6">
          <div className="text-yellow-400 font-mono text-xs">
            ⭐ HIGH SCORE: ∞ ⭐
          </div>
          <div className="text-purple-400 font-mono text-xs mt-2">
            PRESS ANY BUTTON TO CONTINUE...
          </div>
        </div>
      </Card>
    </div>
  )
}

export default GameCalculator