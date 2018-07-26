const startingRequest = () => { //Action Creator
  return {  //Action
    type: "STARTING_REQUEST"
  }
}

const finishedRequest = (response) => {
  return {
    type: "FINISHED_REQUEST",
    response: response
  }
}


//We’ll get to use dispatch() twice in a new action called getGraph
// During startingRequest() and finishedRequest(JSON.parse(response)
export const getGraph = (payload) => {
  return dispatch => {
    dispatch(startingRequest());
    return new Promise(function(resolve, reject) {
      let request=new XMLHttpRequest();
      request.open("POST", "/graphql", true);
      request.setRequestHeader("Content-Type", "application/graphql");
      request.send(payload);
      request.onreadystatechange = () => {
        if (request.readyState === 4) {
          resolve(request.responseText)
        }
      }
    }).then(response => dispatch(finishedRequest(JSON.parse(response))))
  }
}
