import React from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Button } from '@mui/material';
import { chooseName, 
          chooseDescription, 
          chooseCompetitionsAttended, 
          chooseNotableQuality, 
          chooseDateCreated,
          chooseOwner } from '../../redux/slices/rootSlice';
import { Input } from '../sharedComponents/Input';
import { server_calls } from '../../api';
import { useGetData } from '../../custom-hooks';

interface DogFormProps {
    id?:string;
    data?:{}
}

interface DogState {
    name: string;
    description: string;
    competitions_attended: number;
    notable_quality: string;
    date_created: number;
    owner: string;
}

export const DogForm = (props:DogFormProps) => {

    const dispatch = useDispatch();
    let { dogData, getData } = useGetData();
    const store = useStore()
    const name = useSelector<DogState>(state => state.name)
    const { register, handleSubmit } = useForm({ })

    const onSubmit = (data:any, event:any) => {
        console.log(props.id)

        if( props.id!){
            server_calls.update(props.id!, data)
            console.log(`Updated:${data} ${props.id}`)
            window.location.reload()
            event.target.reset();
        } else {
            dispatch(chooseName(data.name))
            server_calls.create(store.getState())
            window.location.reload()
        }
    }

    return (
        <div>
            <form onSubmit = {handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="name">Dog Name</label>
                    <Input {...register('name')} name="name" placeholder='Name' />
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <Input {...register('description')} name="description" placeholder="Description"/>
                </div>
                <div>
                    <label htmlFor="competitions_attended">Competitions Attended</label>
                    <Input {...register('competitions_attended')} name="competitions_attended" placeholder="Competitions Attended"/>
                </div>
                <div>
                    <label htmlFor="notable_quality">Notable Quality</label>
                    <Input {...register('notable_quality')} name="notable_quality" placeholder="Notable Quality"/>
                </div>
                <div>
                    <label htmlFor="date_created">Date Created</label>
                    <Input {...register('date_created')} name="date_created" placeholder="Date Created"/>
                </div>
                <div>
                    <label htmlFor="owner">Owner</label>
                    <Input {...register('owner')} name="owner" placeholder="Owner"/>
                </div>
                <Button type='submit'>Submit</Button>
            </form>
        </div>
    )
}