import firebase from '~/plugins/firebase'

export const postDataFirebase = (params, postData) => {
  const newKey = firebase.database().ref().child(params).push().key;
  let updates = {};
  updates[`/${params}/` + newKey] = {...postData, key: newKey}
  return firebase.database().ref().update(updates, (error) => {
    if (error) {
      console.log(error)
    } else {
      console.log("Data saved successfully!")
    }
  });
}

export const setDataFirebase = (params, id, postData) => {
  firebase.database().ref(`${params}/`+ id).set(postData, (error) => {
    if (error) {
      console.log(error)
    } else {
      console.log("Data edit successfully!")
    }
  });
}

export const deleteDataFirebase = (params, id) => {
  firebase.database().ref(`${params}/`+ id).remove()
}


export const getDataFirebase = async (params) => {
  let response;
  await firebase.database().ref(params).on('value', (snapshot) => {
    if (snapshot.exists()) {
      response = snapshot.val()
    }
  });
  return response
}
