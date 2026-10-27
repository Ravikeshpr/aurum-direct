import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from './App'

describe('Entry Point App Component', () => {
    it('renders header as heading', () => {
        render(<App />)
        const heading = screen.getByRole('heading', { level: 1 })
        expect(heading).toBeInTheDocument()

    })
})