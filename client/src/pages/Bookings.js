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

export default function Bookings() {
  const [booking, setBooking] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [rooms, setRooms] = React.useState(false);
  const [room, setRoom] = React.useState(false);
  const [startDate, setStartDate] = React.useState(false);
  const [endDate, setEndDate] = React.useState(false);

  useEffect(() => {
    debugger;
    fetch("http://localhost:8000/bookings")
      .then((res) => res.json())
      .then((data) => setBooking(data));

    fetch("http://localhost:8000/rooms")
      .then((res) => res.json())
      .then((data) => setRooms(data));
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async (id) => {
    await fetch("http://localhost:8000/bookings/" + id, {
      method: "DELETE",
    });
    const newbookings = booking.filter((booking) => booking.id != id);
    setBooking(newbookings);
  };

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

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Book A Room </DialogTitle>
        <DialogContent>
          <form>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-helper-label">Room</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={room.name}
                label="Age"
                onChange={setRoom}
                fullWidth
                variant="standard"
              >
                {rooms.map((room) => (
                  <MenuItem value={room.id}>{room.name}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                renderInput={(props) => <TextField {...props} />}
                label="DateTimePicker"
                value={startDate}
                onChange={(newValue) => {
                  setStartDate(newValue);
                }}
              />
            </LocalizationProvider>

            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="End Date"
              type="email"
              fullWidth
              variant="standard"
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button color="default" variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button color="secondary" variant="contained" onClick={handleClose}>
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
