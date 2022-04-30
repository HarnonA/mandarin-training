import React from 'react'
import './App.css'
import { Box, Input, Checkbox, Text } from '@chakra-ui/react'

function Custom({ data, checked, setChecked, checkDefault = false }) {
  const [word, setWord] = React.useState('')
  const [isCorrect, setIsCorrect] = React.useState(false)
  const [checkState, setCheckState] = React.useState(checkDefault)
  React.useEffect(() => {
    if (!checkState) {
      if (checked && word.toLowerCase() === data) setIsCorrect(true)
      else setIsCorrect(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked])
  
  React.useEffect(() => {
    setWord('')
  }, [data])


  return (
    <Box pb="1rem">
      <Box display="flex">
        <Input
          isDisabled={checkState}
          value={checkState ? data : word}
          width="100%"
          fontSize='xl'
          textAlign="center"
          borderColor={!checkState && checked ? isCorrect ? 'green.400' : 'red.400' : null}
          onChange={(e) => {
            setWord(e.target.value)
            setChecked(false)
          }}
        />
        <Checkbox
          ml="1rem"
          isChecked={checkState}
          onChange={() => setCheckState(!checkState)}
        />
      </Box>
      {!checkState && checked && !isCorrect && <Text fontSize='lg' color='red.400'>{data}</Text>}
    </Box>
  )
}

export default Custom
