import React, { useEffect, useState } from "react";
import {
  Divider,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

import "./styles.css";
import fetchModel from "../../lib/fetchModelData";

/**
 * Define UserList, a React component of Project 4.
 */
function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchModel("/user/list")
      .then((data) => {
        setUsers(Array.isArray(data) ? data : []);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <Typography variant="h6" paragraph>
        Users
      </Typography>
      {loading ? (
        <Typography>Loading users...</Typography>
      ) : (
        <List component="nav">
          {users.map((item) => (
            <React.Fragment key={item._id}>
              <ListItemButton component={Link} to={`/users/${item._id}`}>
                <ListItemText
                  primary={`${item.first_name} ${item.last_name}`}
                  secondary={item.location}
                />
              </ListItemButton>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      )}
    </div>
  );
}

export default UserList;
