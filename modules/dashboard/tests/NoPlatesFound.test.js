import NoPlatesFound from '../components/NoPlatesFound'
import React from 'react'
import { render } from 'react-dom'

it('renders without crashing', () => {
  const div = document.createElement('div')
  render(
    <NoPlatesFound />,
    div
  )
})
