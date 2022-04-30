import React from 'react'
import './App.css'
import { Box, Button, Input, Text, useMediaQuery } from '@chakra-ui/react'
import json from './temporary_db'

const shuffle = Object.values(json).sort(() => (Math.random() > .5) ? 1 : -1)
function App() {
  const [isMobile] = useMediaQuery('(max-width: 600px)')
  const [word, setWord] = React.useState('')
  const [checked, setChecked] = React.useState(false)
  const [isCorrect, setIsCorrect] = React.useState(false)
  const [index, setIndex] = React.useState(1)
  React.useEffect(() => {
    if (checked && word.toLowerCase() === shuffle[index].pt) setIsCorrect(true)
    else setIsCorrect(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked])
  const MAX_INDEX = 39


  return (
    <Box className="App">
      <Box width={isMobile ? "90%" : "50%"} backgroundColor="#fff" borderRadius="lg" padding="1.6rem">
        <Text pb="1rem" fontSize='xl'>{shuffle[index].cn}</Text>
        <Text pb="1rem" fontSize='xl'>{shuffle[index].pinyin}</Text>
        <Input
          value={word}
          width="100%"
          fontSize='xl'
          textAlign="center"
          borderColor={checked ? isCorrect ? 'green.400' : 'red.400' : null}
          onChange={(e) => {
            setWord(e.target.value)
            setChecked(false)
          }}
        />
        {checked && !isCorrect && <Text fontSize='lg' color='red.400'>{shuffle[index].pt}</Text>}
        <Box display='flex' flexDirection={isMobile ? "column" : "row"} mt="1.6rem" justifyContent="center">
          <Button
            backgroundColor='gray.400'
            onClick={() => setChecked(true)}
          >
            Corrigir
          </Button>
          <Button
          disabled={index >= MAX_INDEX}
            mt={isMobile ? "1.6rem" : 0}
            ml={isMobile ? 0 : "1.6rem"}
            backgroundColor='gray.400'
            onClick={() => {
              setWord('')
              setChecked(false)
              setIndex(index + 1)
            }}
          >
            Próxima
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default App;
