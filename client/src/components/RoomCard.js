import React from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import DeleteOutlined from '@mui/icons-material/DeleteOutlined'
import { makeStyles } from '@mui/styles'
import Avatar from '@mui/material/Avatar'
import { yellow, green, pink, blue } from '@mui/material/colors'

const useStyles = makeStyles({
  avatar: {
    backgroundColor: (room) => {
      if (room.category == 'work') {
        return yellow[700]
      }
      if (room.category == 'money') {
        return green[500]
      }
      if (room.category == 'todos') {
        return pink[500]
      }
      return blue[500]
    },
  }
})

export default function RoomCard({ room, handleDelete }) {
  const classes = useStyles(room)

  return (
    <div>
      <Card elevation={1}>
        <CardHeader
          avatar={
            <Avatar className={classes.avatar}>
              {room.id}            </Avatar>}

          action={
            <IconButton onClick={() => handleDelete(room.id)}>
              <DeleteOutlined />
            </IconButton>
          }
          title={room.name}          
        />
        <CardContent>
          {<Typography variant="body2" color="textSecondary">
            { room.description }
          </Typography>}
        </CardContent>
      </Card>
    </div>
  )
}