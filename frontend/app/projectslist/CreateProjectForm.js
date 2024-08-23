// CreateProjectForm.js
'use client';

import React from 'react';
import {
  TextField,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  Grid,
  Select,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';

const CreateProjectForm = ({ onClose, onProjectCreated, initialProject }) => {
  const [startDate, setStartDate] = React.useState(
    initialProject ? dayjs(initialProject.start_date) : null
  );
  const [endDate, setEndDate] = React.useState(
    initialProject ? dayjs(initialProject.end_date) : null
  );
  const [category, setCategory] = React.useState(
    initialProject ? initialProject.category : ''
  );
  const [priority, setPriority] = React.useState(
    initialProject ? initialProject.priority : 'Highest'
  );
  const [notification, setNotification] = React.useState(
    initialProject ? initialProject.notification : 'All'
  );
  const [taskPerson, setTaskPerson] = React.useState(
    initialProject ? initialProject.task_person : ''
  );
  const [name, setName] = React.useState(
    initialProject ? initialProject.name : ''
  );
  const [budget, setBudget] = React.useState(
    initialProject ? initialProject.budget : 0
  );
  const [description, setDescription] = React.useState(
    initialProject ? initialProject.description || '' : ''
  );

  const handleCreateProject = async () => {
    // Validate required fields
    if (!name || !category || !taskPerson || !startDate || !endDate || !notification || budget <= 0) {
      toast.error('Please fill in all required fields with valid data.');
      return;
    }

    const projectData = {
      name,
      category,
      start_date: startDate.toISOString(), // Convert to ISO string for backend
      end_date: endDate.toISOString(),     // Convert to ISO string for backend
      notification,
      task_person: taskPerson,
      budget,
      priority,
      description: description || null, // Use null for optional description if empty
    };

    console.log(projectData); // Log the data being sent

    try {
      const response = await fetch('http://localhost:8000/projects/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(projectData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error('Error adding project: ' + (errorData.detail || 'Unknown error'));
        throw new Error('Failed to create project');
      }

      const newProject = await response.json();
      onProjectCreated(newProject);
      toast.success('Project added successfully!');
      onClose(); // Close the form after creating the project
    } catch (error) {
      toast.error('Error adding project: ' + error.message);
    }
  };

  return (
    <div className="p-4 max-w-[700px] w-full bg-white shadow-md rounded-md">
      <h2 className="text-2xl mb-4">{initialProject ? 'Edit Project' : 'Create Project'}</h2>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Project Name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel>Project Category</InputLabel>
            <Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              label="Project Category"
              required
            >
              <MenuItem value="UI/UX Design">UI/UX Design</MenuItem>
              <MenuItem value="Frontend Development">Frontend Development</MenuItem>
              <MenuItem value="Backend Development">Backend Development</MenuItem>
              <MenuItem value="Fullstack Development">Fullstack Development</MenuItem>
              <MenuItem value="Fashion Designer">Fashion Designer</MenuItem>
              <MenuItem value="Graphic Designer">Graphic Designer</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Project Start Date"
              value={startDate}
              onChange={(newValue) => setStartDate(newValue)}
              renderInput={(params) => <TextField {...params} fullWidth required />}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} sm={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Project End Date"
              value={endDate}
              onChange={(newValue) => setEndDate(newValue)}
              renderInput={(params) => <TextField {...params} fullWidth required />}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel>Notification Sent</InputLabel>
            <Select
              value={notification}
              onChange={(e) => setNotification(e.target.value)}
              label="Notification Sent"
              required
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Team Leader Only">Team Leader Only</MenuItem>
              <MenuItem value="Team Member Only">Team Member Only</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Task Assign Person"
            variant="outlined"
            fullWidth
            value={taskPerson}
            onChange={(e) => setTaskPerson(e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Budget"
            variant="outlined"
            fullWidth
            type="number"
            value={budget}
            onChange={(e) => setBudget(parseFloat(e.target.value))}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel>Priority</InputLabel>
            <Select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              label="Priority"
              required
            >
              <MenuItem value="Highest">Highest</MenuItem>
              <MenuItem value="High">High</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="Low">Low</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Description (optional)"
            variant="outlined"
            multiline
            rows={4}
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} className="flex justify-end space-x-2">
          <Button variant="contained" className="mr-2" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={handleCreateProject}>
            {initialProject ? 'Update' : 'Create'}
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default CreateProjectForm;