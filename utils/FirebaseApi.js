import firebase from "~/plugins/firebase";

// get data
export const getFirebase = async (param) => {
  let resRef;
  try {
    await firebase.database().ref(param)
      .on('value', (snapshot) => {
        resRef = snapshot.val()
      })
    return resRef
  } catch (error) {
    console.log(error)
  }

}

export default firebase
