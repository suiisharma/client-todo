import { MoonIcon, SunIcon } from "@chakra-ui/icons"
import { Button, useColorMode } from "@chakra-ui/react"

const ColorChanger=()=> {
    const { colorMode, toggleColorMode } = useColorMode('dark')
    return (
      <header>
        <Button onClick={toggleColorMode}>
          {colorMode === 'light' ? <MoonIcon></MoonIcon>:<SunIcon></SunIcon> }
        </Button>
      </header>
    )
  }



  export default ColorChanger