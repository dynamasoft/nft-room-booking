import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import BookingCard from "../components/BookingCard";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import Moment from "react-moment";

export default function Bookings() {
  const [booking, setBooking] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [rooms, setRooms] = React.useState();
  const [roomId, setRoomId] = React.useState();
  const [startDate, setStartDate] = React.useState(Moment.now);
  const [endDate, setEndDate] = React.useState(Moment.now);

  useEffect(() => {
    debugger;
    fetch("http://localhost:8000/bookings")
      .then((res) => res.json())
      .then((data) => setBooking(data));

    fetch("http://localhost:8000/rooms")
      .then((res) => res.json())
      .then((data) =>
      {
        debugger;
        setRooms(data);
        setRoomId(data[0].id);
      });
    
  }, []);

  const handleClickOpen = () => {
    debugger;
    setOpen(true);
  };

  const handleClose = () => {
    debugger;
    setOpen(false);
  };

  const handleDelete = async (id) => {
    await fetch("http://localhost:8000/bookings/" + id, {
      method: "DELETE",
    });
    const newbookings = booking.filter((booking) => booking.id != id);
    setBooking(newbookings);
  };

  const handleSubmit = (e) => {
    debugger;
    e.preventDefault();
   
  }

  const handleSetRoom = (e) =>
  {
    setRoomId(e.target.value);
  }


  return (
    <>
      <Box
        display="flex"
        justifyContent="flex-end"
        style={{ margin: 5, marginTop: 20 }}
      >
        <Button color="secondary" variant="contained" onClick={handleClickOpen}>
          Book A Room
        </Button>
      </Box>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" >
        <DialogTitle>Book A Room </DialogTitle>        
        <DialogContent>
          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <FormControl sx={{ m: 1, minWidth: 20 }} fullWidth >
              <InputLabel id="room-label">Room</InputLabel>
              <Select
                labelId="room-select"
                id="room"
                value={roomId}
                label="Room"
                onChange={handleSetRoom}
                fullWidth
                variant="standard"
              >
                {rooms?.map((room) => (
                  <MenuItem key={room.id} value={room.id}>{room.name}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <LocalizationProvider dateAdapter={AdapterDateFns}>
            <FormControl sx={{ m: 1, minWidth: 20 }} fullWidth >
              <DateTimePicker
                renderInput={(props) => <TextField {...props} />}
                label="Start Date and Time"
                value={startDate}
                onChange={(newValue) => {
                  setStartDate(newValue);
                }}
              />
              </FormControl>
              <FormControl sx={{ m: 1, minWidth: 20 }} fullWidth >
                <DateTimePicker
                renderInput={(props) => <TextField {...props} />}
                label="End Date and Time"
                value={endDate}
                onChange={(newValue) => {
                  setEndDate(newValue);
                }}                
              />
              </FormControl>
            </LocalizationProvider>
           
          </form>
        </DialogContent>
        <DialogActions>
          <Button color="primary" variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button color="secondary" variant="contained" type="submit">
            Book
          </Button>
        </DialogActions>
      </Dialog>

      <Container>
        <Grid container spacing={3}>
          {booking.map((booking) => (
            <Grid item xs={12} md={6} lg={4} key={booking.id}>
              <BookingCard booking={booking} handleDelete={handleDelete} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
