import React from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function PatientCard({
  UserID = -1,
  name,
  lastName,
  imageProfile,
}) {
  if (UserID === -1) {
    return (
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt={name}
            height="140"
            image={imageProfile}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {name.charAt(0).toUpperCase() +
                name.slice(1) +
                ' ' +
                lastName.charAt(0).toUpperCase() +
                lastName.slice(1)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Share</Button>
            <Button size="small">Learn More</Button>
          </CardActions>
        </CardActionArea>
      </Card>
    );
  }

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <Link to={`/home/${UserID}`}>
          <CardMedia
            component="img"
            alt={name}
            height="140"
            image={imageProfile}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {name.charAt(0).toUpperCase() +
                name.slice(1) +
                ' ' +
                lastName.charAt(0).toUpperCase() +
                lastName.slice(1)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Share</Button>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Link>
      </CardActionArea>
    </Card>
  );
}
