import { Flex } from '@chakra-ui/react'
import AtomicSpinner from 'atomic-spinner'

const Spinner = () =>{
 return <Flex height={'100vh'} alignItems={'center'} justifyContent={'center'}>
      <AtomicSpinner />
      </Flex>  
} 

export default Spinner