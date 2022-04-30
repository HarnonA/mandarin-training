import React from 'react'
import './App.css'
import { Box, Button, useMediaQuery, Select } from '@chakra-ui/react'
import json from './temporary_db'
import Custom from './Custom'

const LANG = ['cn', 'pinyin', 'pt']
const MAX_INDEX = 39
const OPTIONS = ['Todos', 'Número', 'Data', 'Verbo']

// console.log(Object.values(json).filter((e) => e.categ === 'dois')?.sort(() => (Math.random() > .5) ? 1 : -1))
function App() {
  const [isMobile] = useMediaQuery('(max-width: 600px)')
  const [checked, setChecked] = React.useState(false)
  const [index, setIndex] = React.useState(0)
  const [wordCategory, setWordCategory] = React.useState('Todos')
  const shuffle = React.useMemo(() => {
    let vals = Object.values(json)
    if (vals && wordCategory && wordCategory !== 'Todos')
      vals = vals.filter((e) => e.categ === wordCategory)
    return vals?.sort(() => (Math.random() > .5) ? 1 : -1)
  },
    [wordCategory]
  )


  return (
    <Box className="App">
      <Box width={isMobile ? "90%" : "50%"} backgroundColor="#fff" borderRadius="lg" padding="1.6rem">
        <Select mb="3rem" onChange={(e) => setWordCategory(e.target.value)}>
          {OPTIONS.map((option) => {
            return <option key={option} value={option}>{option}</option>
          })}
        </Select>
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
