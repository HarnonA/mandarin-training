import React from 'react'
import './App.css'
import { Box, Button, useMediaQuery } from '@chakra-ui/react'
import json from './temporary_db'
import Custom from './Custom'

const shuffle = Object.values(json).sort(() => (Math.random() > .5) ? 1 : -1)
function App() {
  const LANG = ['cn', 'pinyin', 'pt']
  const [isMobile] = useMediaQuery('(max-width: 600px)')
  const [checked, setChecked] = React.useState(false)
  const [index, setIndex] = React.useState(1)
  const MAX_INDEX = 39

  return (
    <Box className="App">
      <Box width={isMobile ? "90%" : "50%"} backgroundColor="#fff" borderRadius="lg" padding="1.6rem">
        {LANG.map((e) => (
          <Custom
            key={e}
            checkDefault={e === 'cn'}
            data={shuffle[index][e]}
            checked={checked}
            setChecked={setChecked}
          />
        ))}
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
