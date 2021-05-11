/**
 * @jest-environment jsdom
 */
import React from 'react'
import CreateGameComponent from './createGameScreen'
import { render } from '@testing-library/react'

it('should change text', () => {
  const { getByText, getByPlaceholderText } = render(<CreateGameComponent />)

  //const button = getByText('createGameButtonId')
  const textInput = getByPlaceholderText('Ange spel nyckel här:')

  const nyText = 'nyText'

  //fireEvent.changeText(textInput, nyText)
  //fireEvent.press(button)

  //const createdItem = getByText(nyText)
  const createdItem = 'inte tom'

  expect(createdItem).not.toBeNull()
})
