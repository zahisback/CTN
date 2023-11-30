import {
  getFirestore,
  collection,
  getDocs,
  setDoc,
  addDoc,
  doc,
  deleteDoc,
  getDoc,
  query,
  where,
  updateDoc,
} from "firebase/firestore/lite";
import { initializeApp } from "firebase/app";
import { CONFIG } from "./configFb";
// import {} from "firebase/firestore";
const app = initializeApp(CONFIG.firebaseConfig);
const db = getFirestore(app);

export const setJob = async (data) => {
  return new Promise(async (resolve, reject) => {
    console.log("setJob()()()() data", data);
    const docRef = await addDoc(collection(db, "Jobs"), data).catch((e) => {
      // const docRef = await setDoc(doc(db, "Jobs"), data).catch((e) => {
      console.log("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", { e });
    });
    console.log("Document written with ID: ", docRef.id);
    resolve(docRef.id);
  });
};

export const setTech = async (data) => {
  return new Promise(async (resolve, reject) => {
    console.log("setJob()()()() data", data);
    const techRef = await addDoc(collection(db, "tech-list"), data)
      .then((docTech) => {
        console.log("tesssssssssssssssssssssssssssssssssssssssssssss".docTech);
      })
      .catch((e) => {
        // const docRef = await setDoc(doc(db, "Jobs"), data).catch((e) => {
        console.log("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", { e });
      });
    console.log("Document written with ID: ", techRef.id);
    resolve(techRef.id);
  });
};

export const settechlist = async (techlist) => {
  return new Promise(async (resolve, reject) => {
    console.log("setJob()()()() data", techlist);
    const docRef = await addDoc(collection(db, "tech-list"), techlist).catch(
      (e) => {
        // const docRef = await setDoc(doc(db, "Jobs"), data).catch((e) => {
        console.log("newwwwwwwwwwwwwwteeeeeeeeeechlist", { e });
      }
    );
    console.log("Document written with ID: ", docRef.id);
    resolve(docRef.id);
  });
};
export const updateAssignedTo = async (id, data) => {
  return new Promise(async (resolve, reject) => {
    console.log("updateAssignedBy()()()() id", id);

    const docRef = doc(db, "Jobs", id);
    await updateDoc(docRef, {
      assignedTo: data.assignedTo,
    });
    resolve(docRef.id);
  });
};
export const updateDispatcher = async (id, data) => {
  return new Promise(async (resolve, reject) => {
    console.log("updateDispatcher()()()() id", id);
    console.log("+++++++++++++++++++++++++++++++++++", data.assignedTo.uid);
    const docRef = doc(db, "Jobs", id);
    await updateDoc(docRef, {
      dispatcher: data.assignedTo.uid,
    });
    resolve(docRef.id);
  });
};
export const updateManager = async (id, data) => {
  return new Promise(async (resolve, reject) => {
    console.log("updateDispatcher()()()() id", id);

    const docRef = doc(db, "Jobs", id);
    await updateDoc(docRef, {
      manager: data,
    });
    resolve(docRef.id);
  });
};

export const AssignedTo = async (id, data) => {
  return new Promise(async (resolve, reject) => {
    console.log("updateAssignedBy()()()() id", id);

    const docRef = doc(db, "Jobs", id);
    await getDocs(docRef, {
      assignedTo: data.assignedTo,
    });
    resolve(docRef.id);
  });
};
export const setJobStatus = async (id, data) => {
  return new Promise(async (resolve, reject) => {
    console.log("updateAssignedBy()()()() id", id);

    const docRef = doc(db, "Jobs", id);
    await updateDoc(docRef, {
      status: data,
    });
    resolve(docRef.id);
  });
};
export const updateChanges = async (id, data) => {
  return new Promise(async (resolve, reject) => {
    console.log("updateChanges()()()() id", id);

    const docRef = doc(db, "Jobs", id);
    await updateDoc(docRef, {
      woNum: data.woNum,
      joblocation: data.joblocation,
      jobZip: data.jobZip,
      jobState: data.jobState,
      estimNeeded: data.estimNeeded,
      jobStatus: data.jobStatus,
      contact: data.contact,
      trade: data.trade,
      nte: data.nte,
      ivrcode: data.ivrcode,
      poNumb: data.poNumb,
      clientName: data.clientName,
      submdate: data.submdate,
      neededdate: data.neededdate,
      urgency: data.urgency,
      callerName: data.callerName,
      callerNumber: data.callerNumber,
      jobdescr: data.jobdescr,
      status: data.status,
      dispId: data.dispId,
    });
    resolve(docRef.id);
  });
};

export const findWoByNumber = (woId, userId) => {
  return new Promise(async (resolve, reject) => {
    let filteredJobsList = [];
    console.log("findWoByNumber--------- data", woId, userId);
    // const docRef = await addDoc(collection(db, "Jobs"), data);
    const q = await query(
      collection(db, "Jobs"),
      where("woNum", "==", woId),
      where("dispatcher", "==", userId)
    );
    // const q = query(collection(db, "Jobs"));
    console.log("findWoByNumber--------- query", q);
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      const Job = {
        id: doc.id,
        data: doc.data(),
      };
      filteredJobsList.push(Job);
      console.log("filteredJobsList:::::::>>>", filteredJobsList);
    });
    resolve(filteredJobsList);
    reject((e) => {
      console.log("No Jobs", e);
    });
  });
};

export const findWoForAdmin = (userId) => {
  return new Promise(async (resolve, reject) => {
    let filteredJobsList = [];
    console.log("findWoForCurrentUser--------- data", userId);
    // const docRef = await addDoc(collection(db, "Jobs"), data);
    const q = await query(
      collection(db, "Jobs"),
      where("Admin", "===", userId)
    );
    // const q = query(collection(db, "Jobs"));
    console.log("findWoForCurrentUser--------- query", q);
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      const Job = {
        id: doc.id,
        data: doc.data(),
      };
      filteredJobsList.push(Job);
      console.log("filteredJobsList:::::::>>>", filteredJobsList);
    });
    resolve(filteredJobsList);
    reject((e) => {
      console.log("No Jobs", e);
    });
  });
};

export const findWoForCurrentUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    let filteredJobsList = [];
    console.log("findWoForCurrentUser--------- data", userId);
    // const docRef = await addDoc(collection(db, "Jobs"), data);
    const q = await query(
      collection(db, "Jobs"),
      where("dispatcher", "==", userId)
    );
    // const q = query(collection(db, "Jobs"));
    console.log("findWoForCurrentUser--------- query", q);
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      const Job = {
        id: doc.id,
        data: doc.data(),
      };
      filteredJobsList.push(Job);
      console.log("filteredJobsList:::::::>>>", filteredJobsList);
    });
    resolve(filteredJobsList);
    reject((e) => {
      console.log("No Jobs", e);
    });
  });
};

export const updateDispatcherData = async (id, data) => {
  return new Promise(async (resolve, reject) => {
    const docRef = doc(db, "Jobs", id);
    await updateDoc(docRef, {
      dispatcherData: data,
    });
    resolve(docRef.id);
  });
};
///// Jobs /////////////
export const dispDoc = async (id, data) => {
  return new Promise(async (resolve, reject) => {
    console.log("updateChanges()()()() id", id);

    const docRef = doc(db, "Jobs", id);
    await dispDoc(docRef, {
      estimTechName: data.estimTechName,
      estimTechCon: data.estimTechCon,
      estimscheduleddate: data.estimscheduleddate,
      estimscheduledtimee: data.estimscheduledtimee,
      estimCost: data.estimCost,
      estimPaidby: data.estimPaidby,
      estimPaymentAdress: data.estimPaymentAdress,
      estimTechproffesion: data.estimTechproffesion,
      estimscheduleddate: data.estimscheduleddate,
      estimscheduledtimee: data.estimscheduledtimee,

      jobDoneTechName: data.jobDoneTechName,
      jobDoneTechCon: data.jobDoneTechCon,
      jobdonescheduledate: data.jobdonescheduledate,
      jobdonescheduledtime: data.jobdonescheduledtime,
      jobDoneCost: data.jobDoneCost,
      jobDonePaidby: data.jobDonePaidby,
      jobDonePaymentAdress: data.jobDonePaymentAdress,
      jobDoneHours: data.jobDoneHours,
      jobDoneTechDescription: data.jobDoneTechDescription,
      jobdoneTechproffesion: data.jobdoneTechproffesion,
      suppliyer: data.suppliyer,
      otherSuppliyer: data.otherSuppliyer,
      material: data.material,

      jobType: data.jobType,
      dispId: data.dispId,
    });
    resolve(docRef.id);
  });
};

export const techDoc = async (id, data) => {
  return new Promise(async (resolve, reject) => {
    const techRef = doc(db, "techlist", id);
    await techDoc(techRef, {
      freeEstimation: this.state.freeEstimation,
      techName: this.state.TechName,
      techCon: this.state.techCon,
      estimCost: this.state.estimCost,
      paidby: this.state.paidby,
      techZip: this.state.techZip,
      techState: this.state.techState,
      techCoverage: this.state.techCoverage,
      techNote: this.state.techNote,
      techTrade: this.state.techTrade,
      techUrgency: this.state.techUrgency,
    });
    resolve(techRef.id);
  });
};

export const handleDeleteJob = async (id) => {
  try {
    console.log("item deleted", id);
    await deleteDoc(doc(db, "Jobs", id));
    console.log("item successfully deleted");
  } catch (error) {
    console.error("Error deleting document:", error);
  }
};

export const getJobs = async () => {
  let JobsList = [];
  // console.log("getJob()()()() data", collectionName);
  // const docRef = await addDoc(collection(db, "Jobs"), data);
  const q = query(collection(db, "Jobs"));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    const Job = {
      id: doc.id,
      data: doc.data(),
    };
    JobsList.push(Job);
    console.log(doc.id, " => ", doc.data());
  });
  return JobsList;
};

export const getTechs = async () => {
  let techList = [];
  console.log("getJob()()()() data?????????????????????????????????");
  // const docRef = await addDoc(collection(db, "Jobs"), data);
  const q = query(collection(db, "tech-list"));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    const techId = {
      id: doc.id,
      data: doc.data(),
    };
    techList.push(techId);
    console.log(doc.id, " ++++++++++++++++++++++++++++++=> ", doc.data());
  });
  return techList;
};
//// Users /////

export const getUser = async (id) => {
  const docRef = doc(db, "Users", id);
  const userSnap = await getDoc(docRef);
  if (userSnap.exists()) {
    return userSnap.data();
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
};
export const getAllDispatchers = async (id) => {
  try {
    let newList = [];
    const q = query(
      collection(db, "Users"),
      where("selectedtype", "==", "Dispatcher")
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " ------------=> ", doc.data());
      newList.push(doc.data());
    });
    return newList;
  } catch (error) {
    console.log("eroorrrrr in get dispatchers", error);
  }
};
export const getAllTeamLeaders = async (id) => {
  try {
    let newList = [];
    const q = query(
      collection(db, "Users"),
      where("selectedtype", "==", "Team leader")
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " ------------=> ", doc.data());
      newList.push(doc.data());
    });
    return newList;
  } catch (error) {
    console.log("eroorrrrr in get teamleaders", error);
  }
};
export const getAllManagers = async (id) => {
  try {
    let newList = [];
    const q = query(
      collection(db, "Users"),
      where("selectedtype", "==", "Manager")
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " ------------=> ", doc.data());
      newList.push(doc.data());
    });
    return newList;
  } catch (error) {
    console.log("eroorrrrr in get teamleaders", error);
  }
};
