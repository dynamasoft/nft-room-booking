import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";
import CancelOutlined from "@material-ui/icons/CancelOutlined";
import EditOutlined from "@material-ui/icons/EditOutlined";
import { makeStyles } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { yellow, green, pink, blue } from "@material-ui/core/colors";

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
