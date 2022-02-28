import React, { useState } from 'react';
import { server_calls } from '../../api';
import { useGetData } from '../../custom-hooks';
import { 
        Button,
        CardHeader,
        Dialog,
        DialogActions,
        DialogContent,
        DialogContentText,
        DialogTitle 
    } from '@mui/material';
    import { DogForm } from '../../components'; // ADD THIS

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

interface cardData{
    data:{
      id?:string;
    }
  }

export const Cards = () => {

    let { dogData, getData } = useGetData();
    let [open, setOpen] = useState(false);
    let [cardData, setData] = useState([]) //might need to tweek this
    
    
    // console.log(dogData)    
    // console.log(cardData)

    let handleOpen = () => {
        setOpen(true)
      }
    
      let handleClose = () => {
        setOpen(false)
      }

      let deleteData = async () =>{ //need adjusting to cards
        for (let id in cardData){
          await server_calls.delete(`${cardData[id]}`)
        }
        window.location.reload()
      }  

      const dogName = dogData.name
      let cardnumber = () =>{
          
      }

      console.log(cardData) 

  return (
    <Card sx={{ maxWidth: 300 }}>

      <CardMedia
        component="img"
        alt="dog_pic"
        height="175"
        image="https://via.placeholder.com/175" //link to dog api image
      />

          <CardHeader title={`Name: ${dogName}`} subheader={`Breed: ${dogName}`} />

      <CardContent>
        {/* <Typography gutterBottom variant="h5" component="div">Dog1</Typography> */}

        <Typography variant="body2" color="text.secondary">
          Description: {`${dogName}`}
        </Typography>
      </CardContent>

      <CardActions>
        <Button size="small" onClick={handleOpen}>Update Info</Button>
        <Button size="small" onClick={deleteData}>Delete</Button>
      </CardActions>

      {/* Dog Update Form */}
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Update A Dog</DialogTitle>
          <DialogContent>
            <DialogContentText>Dog id: {cardData[0]}</DialogContentText>
              <DogForm id={`${cardData[0]}`}/>
          </DialogContent>
          <DialogActions>
            <Button onClick = {handleClose} color="primary">Cancel</Button>
            <Button onClick={handleClose} color = "primary">Done</Button> 
          </DialogActions>
        </Dialog>

    </Card>

    
  );
}

