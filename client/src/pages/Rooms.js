import React, { useEffect, useState } from 'react'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import RoomCard from '../components/RoomCard'

export default function Rooms() 
{
  const [rooms, setRooms] = useState([]);
 
  useEffect(() => {
    
    debugger;
    fetch('http://localhost:8000/rooms')
      .then(res => res.json())
      .then(data => setRooms(data))
  }, [])

  const handleDelete = async (id) => {
    await fetch('http://localhost:8000/rooms/' + id, {
      method: 'DELETE'
    })
    const newRooms = rooms.filter(room => room.id != id)
    setRooms(newRooms);
  }

  return (
    <Container>
      <Grid container spacing={3}>
        {rooms.map(room => (
          <Grid item xs={12} md={6} lg={4} key={room.id}>
            <RoomCard room={room} handleDelete={handleDelete} />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}
