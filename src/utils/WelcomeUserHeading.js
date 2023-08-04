import { Flex, Text } from '@chakra-ui/react'
import React  from 'react'

const WelcomeUserHeading = ({user}) => {
  return (
    <Flex justifyContent={'center'}>
    <Text
    textAlign={'center'}
    bgGradient= 'linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%)'
    bgClip='text'
    fontSize={['45px','6xl']}
    fontWeight='extrabold'
    >
    Welcome  {user}
    </Text>
    </Flex>
  )
}

export default WelcomeUserHeading