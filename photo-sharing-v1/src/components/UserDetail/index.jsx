import React, { useEffect, useState } from "react";
import { Typography, Button, Box } from "@mui/material";
import { Link, useParams } from "react-router-dom";

import "./styles.css";
import fetchModel from "../../lib/fetchModelData";

/**
 * Define UserDetail, a React component of Project 4.
 */
function UserDetail() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchModel(`/user/${userId}`)
      .then((model) => setUser(model))
      .finally(() => setLoading(false));
  }, [userId]);

  if (loading) {
    return <Typography>Loading user details...</Typography>;
  }

  if (!user) {
    return <Typography>User not found.</Typography>;
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        {user.first_name} {user.last_name}
      </Typography>
      <Typography variant="subtitle1" color="textSecondary" gutterBottom>
        {user.location}
      </Typography>
      <Typography paragraph>{user.description}</Typography>
      <Typography paragraph>
        <strong>Occupation:</strong> {user.occupation}
      </Typography>
      <Button component={Link} to={`/photos/${userId}`} variant="contained">
        View Photos
      </Button>
    </Box>
  );
}

export default UserDetail;
