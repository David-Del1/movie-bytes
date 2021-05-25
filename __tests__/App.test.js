import React from 'react';
import App from '../src/App';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('App', () => {
  it('renders without error', () => {
    render(<App />);
  });
});
