import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Link as MuiLink,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";

import "./styles.css";
import fetchModel from "../../lib/fetchModelData";

const imageMap = {
  "ouster.jpg": require("../../images/ouster.jpg"),
  "malcolm2.jpg": require("../../images/malcolm2.jpg"),
  "malcolm1.jpg": require("../../images/malcolm1.jpg"),
  "ripley1.jpg": require("../../images/ripley1.jpg"),
  "ripley2.jpg": require("../../images/ripley2.jpg"),
  "kenobi1.jpg": require("../../images/kenobi1.jpg"),
  "kenobi2.jpg": require("../../images/kenobi2.jpg"),
  "kenobi3.jpg": require("../../images/kenobi3.jpg"),
  "kenobi4.jpg": require("../../images/kenobi4.jpg"),
  "took1.jpg": require("../../images/took1.jpg"),
  "took2.jpg": require("../../images/took2.jpg"),
  "ludgate1.jpg": require("../../images/ludgate1.jpg"),
};

const formatDate = (dateTime) => {
  if (!dateTime) {
    return "";
  }
  const parsed = new Date(dateTime.replace(" ", "T"));
  return Number.isNaN(parsed.getTime()) ? dateTime : parsed.toLocaleString();
};

function UserPhotos() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([fetchModel(`/user/${userId}`), fetchModel(`/photosOfUser/${userId}`)])
      .then(([userModel, photoModels]) => {
        setUser(userModel);
        setPhotos(Array.isArray(photoModels) ? photoModels : []);
      })
      .finally(() => setLoading(false));
  }, [userId]);

  if (loading) {
    return <Typography>Loading photos...</Typography>;
  }

  if (!user) {
    return <Typography>User not found.</Typography>;
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Photos of {user.first_name} {user.last_name}
      </Typography>
      <Button component={Link} to={`/users/${userId}`} variant="outlined" sx={{ mb: 2 }}>
        Back to Details
      </Button>
      {photos.length === 0 ? (
        <Typography>No photos available for this user.</Typography>
      ) : (
        photos.map((photo) => {
          const photoSrc = imageMap[photo.file_name] || null;

          return (
            <Card key={photo._id} sx={{ mb: 3 }}>
              {photoSrc && (
                <CardMedia
                  component="img"
                  height="320"
                  image={photoSrc}
                  alt={photo.file_name}
                />
              )}
              <CardContent>
                <Typography variant="subtitle1" gutterBottom>
                  {formatDate(photo.date_time)}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  {photo.comments?.length || 0} comment(s)
                </Typography>
                <Divider sx={{ my: 1 }} />
                {photo.comments && photo.comments.length > 0 ? (
                  <List>
                    {photo.comments.map((comment) => (
                      <ListItem key={comment._id} alignItems="flex-start">
                        <ListItemText
                          primary={
                            <>
                              <Typography component="span" variant="body2" color="textSecondary">
                                {formatDate(comment.date_time)}
                              </Typography>
                              {" — "}
                              <MuiLink component={Link} to={`/users/${comment.user._id}`} underline="hover">
                                {comment.user.first_name} {comment.user.last_name}
                              </MuiLink>
                            </>
                          }
                          secondary={comment.comment}
                        />
                      </ListItem>
                    ))}
                  </List>
                ) : (
                  <Typography>No comments for this photo.</Typography>
                )}
              </CardContent>
            </Card>
          );
        })
      )}
    </Box>
  );
}

export default UserPhotos;
