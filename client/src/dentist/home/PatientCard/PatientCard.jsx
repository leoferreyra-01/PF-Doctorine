import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function PatientCard({ name, lastName, imageProfile }) {
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
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
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

// return (
//   <div>
//     <div>
//       <img src={imageProfile} alt={name} />
//     </div>
//     <div>
//       <h3>{name.charAt(0).toUpperCase() + name.slice(1)}</h3>
//       <h3>{lastName.charAt(0).toUpperCase() + lastName.slice(1)}</h3>
//     </div>
//   </div>
// );
