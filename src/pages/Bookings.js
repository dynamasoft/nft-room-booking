import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import BookingCard from "../components/BookingCard";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import AdapterDateFns from "@material-ui/lab/AdapterDateFns";
import LocalizationProvider from "@material-ui/lab/LocalizationProvider";
import DateTimePicker from "@material-ui/lab/DateTimePicker";

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
