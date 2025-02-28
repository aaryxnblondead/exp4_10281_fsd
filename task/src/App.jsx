import React from 'react'
import styled from 'styled-components'
import TaskBoard from './components/TaskBoard'
import { DragDropContext } from 'react-beautiful-dnd'
import TimeDisplay from './components/TimeDisplay'

const AppContainer = styled.div`
  min-height: 100vh
  background: #f1f5f9
`

const Header = styled.header`
  background: white
  padding: 20px
  box-shadow: 0 1px 2px rgba(0,0,0,0.1)
  margin-bottom: 20px
`

const Title = styled.h1`
  margin: 0
  color: #1e293b
  font-size: 24px
`

function App() {
  return (
    <AppContainer>
      <TimeDisplay />
      <Header>
        <Title>Task Management Board</Title>
      </Header>
      <DragDropContext>
        <TaskBoard />
      </DragDropContext>
    </AppContainer>
  )
}

export default App
import './styles/global.css';
