const fields = (state = [], action)=>{
    switch (action.type) {
        case 'ADD_FIELD':            
            return [
                ...state,
                createData('new field','int')

            ]
        case 'SET_TYPE':
            return state.map((f,i)=>
                i === action.id ? {...f,type:action.type} : f
            )
        default:
            return state
    }
}

export default fields

function createData(name, type = "", dataSources = [], constraints = [], protein = []) {
    return { name, type, dataSources, constraints, protein };
  }