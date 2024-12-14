import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Avatar,
  Button,
  TextField,
  IconButton,
  Grid
} from '@mui/material';
import { useDropzone } from 'react-dropzone';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { useQuery, useMutation } from '@tanstack/react-query';
import { userService } from '../../services/api';

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    bio: '',
    profilePic: null
  });

  const { data: profile, isLoading } = useQuery({
    queryKey: ['userProfile'],
    queryFn: userService.getProfile,
    onSuccess: (data) => {
      setFormData(data);
    }
  });

  const updateProfileMutation = useMutation({
    mutationFn: (updatedProfile) => userService.updateProfile(updatedProfile),
    onSuccess: () => {
      setIsEditing(false);
    }
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    Object.keys(formData).forEach(key => {
      formDataToSend.append(key, formData[key]);
    });
    updateProfileMutation.mutate(formDataToSend);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <Box className="p-6">
      <Paper elevation={3} className="p-6">
        <Box className="flex justify-between items-center mb-6">
          <Typography variant="h4">Profile</Typography>
          <IconButton onClick={() => setIsEditing(!isEditing)}>
            <EditIcon />
          </IconButton>
        </Box>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4} className="text-center">
              <Box {...getRootProps()} className="cursor-pointer">
                <input {...getInputProps()} disabled={!isEditing} />
                <Avatar
                  src={formData.profilePic?.preview || profile?.profilePicUrl}
                  sx={{ width: 200, height: 200, mx: 'auto', mb: 2 }}
                />
                {isEditing && (
                  <Typography color="primary">
                    Click to change profile picture
                  </Typography>
                )}
              </Box>
            </Grid>

            <Grid item xs={12} md={8}>
              <Box className="space-y-4">
                <TextField
                  fullWidth
                  label="Username"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  disabled={!isEditing}
                />
                <TextField
                  fullWidth
                  label="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  disabled={!isEditing}
                />
                <TextField
                  fullWidth
                  label="Bio"
                  multiline
                  rows={4}
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  disabled={!isEditing}
                />

                {isEditing && (
                  <Button
                    type="submit"
                    variant="contained"
                    startIcon={<SaveIcon />}
                    className="mt-4"
                  >
                    Save Changes
                  </Button>
                )}
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default UserProfile;