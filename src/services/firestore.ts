import { collection, addDoc, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

// Add a new member
export const addMember = async (name: string, email: string) => {
  try {
    const docRef = await addDoc(collection(db, "members"), {
      name,
      email,
      createdAt: new Date(),
    });
    console.log("Member added with ID:", docRef.id);
  } catch (error) {
    console.error("Error adding member:", error);
  }
};

// Get all members
export const getMembers = async () => {
  const querySnapshot = await getDocs(collection(db, "members"));
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// Get a single member by ID
export const getMemberById = async (id: string) => {
  const docRef = doc(db, "members", id);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data() : null;
};
