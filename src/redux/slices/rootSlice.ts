import { createSlice } from '@reduxjs/toolkit';

const rootSlice = createSlice({
    name: "root",
    initialState: {
        name: "no name",
        description: "generic dog",
        competitions_attended: 0,
        notable_quality: "retriever",
        date_created: "2022-02-25",
        owner: "no owner"
    },
    reducers: {
        chooseName: (state, action) => {state.name = action.payload},
        chooseDescription: (state, action) => {state.description = action.payload},
        chooseCompetitionsAttended: (state, action) => {state.competitions_attended = action.payload},
        chooseNotableQuality: (state, action) => {state.notable_quality = action.payload},
        chooseDateCreated: (state, action) => {state.date_created = action.payload},
        chooseOwner: (state, action) => { state.owner = action.payload}
    }
})

export const reducer = rootSlice.reducer;
export const { chooseName, chooseDescription, chooseCompetitionsAttended, chooseNotableQuality, chooseDateCreated, chooseOwner } = rootSlice.actions;