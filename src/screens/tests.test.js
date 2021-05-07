import React from "react";
import CreateGameComponent from "./createGameScreen";
import { render, fireEvent } from "@testing-library/react-native"
 
 
it("should change text", ()=>{
   const {getByText, getByPlaceholderText} = render(<CreateGameComponent/>);
 
   const button = getByText("testbutton");
   const textInput = getByPlaceholderText("emil")
 
   const nyText = "nyText"
 
   fireEvent.changeText(textInput, nyText)
   //fireEvent.press(button)
 
   const createdItem = getByText(nyText)
 
   expect(createdItem).not.toBeNull()
 
 
})
