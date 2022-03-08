import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import DeleteOutlined from "@mui/icons-material/DeleteOutlined";
import CancelOutlined from "@mui/icons-material/CancelOutlined";
import EditOutlined from "@mui/icons-material/EditOutlined";
import { makeStyles } from "@mui/styles";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { yellow, green, pink, blue } from "@mui/material/colors";

const useStyles = makeStyles({
  avatar: {
    backgroundColor: (booking) => {
      if (booking.category == "work") {
        return yellow[700];
      }
      if (booking.category == "money") {
        return green[500];
      }
      if (booking.category == "todos") {
        return pink[500];
      }
      return blue[500];
    },
  },
});

export default function BookingCard({ booking, handleDelete }) {
  const classes = useStyles(booking);

  return (    
      <Card elevation={1}>
        <CardHeader
          avatar={<Avatar className={classes.avatar}>{booking.roomId}</Avatar>}
          action={
            <IconButton onClick={() => handleDelete(booking.id)}>
              <CancelOutlined />
            </IconButton>
          }
          title={booking.roomName}
        />
        <CardContent>
          {
            <>
              <Typography variant="body2" color="textSecondary">
                <div>Booker: {booking.userName}</div>
                <div>Company: {booking.companyName}</div>
                <div>
                  Date: {booking.startDate} - {booking.endDate}
                </div>
              </Typography>
            </>
          }         
        </CardContent>
      </Card>    
  );
}
