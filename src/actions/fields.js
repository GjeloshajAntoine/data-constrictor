export const addField = () => ({
    type : 'ADD_FIELD',
})

export const setType = ({type,id}) => ({
    type : 'SET_TYPE',
    id,
    type
})