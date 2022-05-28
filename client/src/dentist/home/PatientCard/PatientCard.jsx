import React from 'react';
import { NavLink } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import s from './card.module.css';
export default function PatientCard({ ID = -1, name, lastName, imageProfile }) {
  if (ID === -1) {
    return (
      <div className={s.conteiner}>
        <Card className={s.cardc}>
          <CardActionArea>
            {/* <CardMedia
              component="img"
              alt={name}
              height="140"
              image={imageProfile}
            /> */}
            <CardContent className={s.card}>
              <div className={s.name}>
                <Typography gutterBottom variant="h8" component="div">
                  {name.charAt(0).toUpperCase() +
                    name.slice(1) +
                    ' ' +
                    lastName.charAt(0).toUpperCase() +
                    lastName.slice(1)}
                </Typography>
              </div>

              <Typography
                variant="body2"
                color="text.secondary"
                marginLeft="50px"
              >
                Direccion : china DNI: 45468523
              </Typography>
            </CardContent>
            <CardActions className={s.cardactions}>
              <Button size="small">Ver Historia Clinica</Button>
              <Button size="small">Ver Estudios</Button>
            </CardActions>
          </CardActionArea>
        </Card>
      </div>
    );
  }

  return (
    <div className={s.conteiner}>
      <Card className={s.cardc}>
        <CardActionArea>
          <NavLink to={`/home/${ID}`} style={{ textDecoration: 'none' }}>
            {/* <CardMedia
              component="img"
              alt={name}
              height="140"
              image={imageProfile}
            /> */}
            <CardContent className={s.card}>
              <Typography gutterBottom variant="h8" component="div">
                {name.charAt(0).toUpperCase() +
                  name.slice(1) +
                  ' ' +
                  lastName.charAt(0).toUpperCase() +
                  lastName.slice(1)}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                marginLeft="50px"
              >
                Direccion : china DNI: 45468523
              </Typography>
            </CardContent>
            <CardActions className={s.cardactions}>
              <Button size="small">Ver Historia Clinica</Button>
              <Button size="small">Ver Estudios</Button>
            </CardActions>
          </NavLink>
        </CardActionArea>
      </Card>
    </div>
  );
}
