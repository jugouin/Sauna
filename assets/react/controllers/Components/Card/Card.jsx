import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function MediaCard({ text }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={img}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Sauna
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {text}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Réservez</Button>
      </CardActions>
    </Card>
  );
}
