import React from 'react'
// import 'jest-dom/extend-expect'
// import 'react-testing-library/cleanup-after-each'
import App from '../src/App'

import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('App', () => {
  it('renders without error', () => {
    render(<App />)
  })
})