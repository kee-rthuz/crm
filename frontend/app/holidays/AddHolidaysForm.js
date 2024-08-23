"use client";

import { useState } from 'react';
import { TextField, Button, IconButton, Box, Typography } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

export default function AddHolidays() {
  const [holidayName, setHolidayName] = useState('');
  const [holidayDate, setHolidayDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <Box className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <Box className="flex justify-between items-center mb-4">
        <Typography variant="h6" className="font-semibold">
          Add Holidays
        </Typography>
        <IconButton className="text-gray-500 hover:text-gray-700">
          <CloseIcon />
        </IconButton>
      </Box>
      <form onSubmit={handleSubmit}>
        <Box className="mb-6">
          <TextField
            fullWidth
            id="holidayName"
            label="Holiday Name"
            variant="outlined"
            placeholder="Enter holiday name"
            value={holidayName}
            onChange={(e) => setHolidayName(e.target.value)}
          />
        </Box>
        <Box className="mb-6">
          <TextField
            fullWidth
            id="holidayDate"
            label="Holiday Date"
            variant="outlined"
            placeholder="dd/mm/yyyy"
            value={holidayDate}
            onChange={(e) => setHolidayDate(e.target.value)}
          />
        </Box>
        <Box className="flex justify-end space-x-2">
          <Button
            variant="contained"
            color="inherit"
            className="bg-gray-300 text-gray-700 hover:bg-gray-400"
          >
            Done
          </Button>
          <Button
            type="submit"
            variant="contained"
            className="bg-purple-900 text-white hover:bg-purple-800"
          >
            Add
          </Button>
        </Box>
      </form>
    </Box>
  );
}