import React from 'react'
import { API } from '../libs/api'

export default function day4() {
    const { handleChange } = useRegist()
    const [form,setform]
  return (
    
  )

  async function handleRegist(params:type) {
    try {
        await API.post('/reg',form)
    } catch (error) {
        
    }
    
  }
}
