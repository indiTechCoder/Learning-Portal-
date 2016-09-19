var assign = require('object-assign');
var headerReducer = function headerReducer(state=[],action){
	//state = state || initialState;
	switch (action.type){

  	case 'ON_HEADER_CONTENT_SUCCESS' :
    		//return action.agentInfo;
    		return  assign({} , state , {"widgetContent" : action.cmsContent});
		case 'HEADER_COMPONENT_UPDATE' :
				return assign({} , state, action.updatedProps)
		default : return state;

	}
}

module.exports = headerReducer;
