import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Button, 
  TextField, 
  Paper, 
  Typography, 
  Box,
  Avatar,
  IconButton
} from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { useDropzone } from 'react-dropzone';
import { authService } from '../../services/api';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    profilePic: null
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setFormData(prev => ({
      ...prev,
      profilePic: Object.assign(file, {
        preview: URL.createObjectURL(file)
      })
    }));
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    maxFiles: 1
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        if (key !== 'confirmPassword') {
          formDataToSend.append(key, formData[key]);
        }
      });

      const response = await authService.register(formDataToSend);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 500, mx: 'auto', mt: 8 }}>
      <Typography variant="h5" component="h1" gutterBottom>
        Create Account
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        <Box className="flex justify-center mb-4">
          <Box {...getRootProps()} className="cursor-pointer">
            <input {...getInputProps()} />
            <Avatar
              src={formData.profilePic?.preview}
              sx={{ width: 100, height: 100 }}
            />
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
              sx={{ position: 'absolute', bottom: 0, right: 0 }}
            >
              <PhotoCamera />
            </IconButton>
          </Box>
        </Box>

        <TextField
          fullWidth
          margin="normal"
          label="Username"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="Email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="Password"
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="Confirm Password"
          type="password"
          value={formData.confirmPassword}
          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
          required
        />

        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3 }}
        >
          Register
        </Button>

        <Button
          fullWidth
          variant="text"
          sx={{ mt: 1 }}
          onClick={() => navigate('/login')}
        >
          Already have an account? Sign in
        </Button>
      </Box>
    </Paper>
  );
};

export default RegisterForm;