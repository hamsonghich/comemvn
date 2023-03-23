import firebase from '~/plugins/firebase'

export const postDataFirebase = (params, postData) => {
  const newKey = firebase.database().ref().child(params).push().key;
  let updates = {};
  updates[`/${params}/` + newKey] = {...postData, key: newKey}
  return firebase.database().ref().update(updates);
}

export const getDataFirebase = async (params) => {
  let response;
  await firebase.database().ref(params).on('value', (snapshot) => {
    if (snapshot.exists()) {
      response = snapshot.val()
    }
  });
  if (response) {
    console.log('tes', response)
    return response
  }
}
