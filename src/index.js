 import {initializeApp} from 'firebase/app';
 import{
  getFirestore,collection,getDocs, addDoc,deleteDoc,doc,onSnapshot,
  query,where,orderBy,serverTimestamp,getDoc,
  updateDoc
 } from 'firebase/firestore';
 import {
   getAuth, createUserWithEmailAndPassword, 
   signInWithEmailAndPassword,signOut,
   onAuthStateChanged
 }  from 'firebase/auth';
 const firebaseConfig = {
    apiKey: "AIzaSyAfVGDJoUJVddpfozknWejrYTA5nLQhQ6M",
    authDomain: "fir-9-37576.firebaseapp.com",
    projectId: "fir-9-37576",
    storageBucket: "fir-9-37576.appspot.com",
    messagingSenderId: "386179081656",
    appId: "1:386179081656:web:3f5fbf0be33b90272d5b4d"
  };

  //init firebase App
initializeApp(firebaseConfig);
 //init services
const db=getFirestore();
const auth=getAuth();

// collection Ref
const colRef=collection(db,'bookdata');

// Query firebase query
//const q=query(colRef,where("author","==","king"));

// Order data in firebase query
//const q=query(colRef,where("author","==","king"),orderBy('title','desc'));
const q=query(colRef,where("author","==","king"),orderBy('createdAt'));

// onSnapshot(q,(snapshot)=>{
//     let bookdata=[]
//     snapshot.docs.forEach((doc)=>{
//         bookdata.push({...doc.data(), id:doc.id});
//     });
//      console.log(bookdata);
//  });


//get collection data
getDocs(colRef)
 .then((snapshot)=>{
    let bookdata=[]
    snapshot.docs.forEach((doc)=>{
        bookdata.push({...doc.data(), id:doc.id});
    });
     console.log(bookdata);
 }).catch(err=>{console.log(err.message)});

const unsubCol= onSnapshot(colRef,(snapshot)=>{
    let bookdata=[]
    snapshot.docs.forEach((doc)=>{
        bookdata.push({...doc.data(), id:doc.id});
    });
     console.log(bookdata);
 });

 // add a book
 const addBookForm=document.querySelector(".adddata");
 addBookForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    addDoc(colRef,{
        title:addBookForm.title.value,
        author:addBookForm.author.value,
         // Add Document in Firebase at in Order....
         createdAt:serverTimestamp()
    })
    .then(()=>{
        addBookForm.reset();
    })
 })

 // delete a book
 const deleteBookform=document.querySelector(".deletedata");
 deleteBookform.addEventListener("submit",(e)=>{
    e.preventDefault();
    const docRef=doc(db,'bookdata',deleteBookform.id.value);
    deleteDoc(docRef)
    .then(()=>{
        deleteBookform.reset();
 })
 })

 // Fetching a Single Document   Method-1
 const docRef=doc(db,'bookdata','RBpDkmneGym1DHtl913t')

 getDoc(docRef)
   .then((doc)=>{
  //  console.log(doc.data(),doc.id);
 })

 //  Method-2
const unsubDoc=  onSnapshot(docRef,(doc)=>{
    //console.log(doc.data(),doc.id);
 })


 //  Update Documents......
 const updateBook=document.querySelector(".update");
 updateBook.addEventListener("submit",(e)=>{
    e.preventDefault();
    const docRef=doc(db,'bookdata',updateBook.id.value);
    updateDoc(docRef,{
        title:"title Updated"
    }).then(()=>{
     updateBook.reset();
    })
 })


 // SignUp or signinForm users
 const signinForm=document.querySelector(".signup");
 signinForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const email=signinForm.email.value;
    const password=signinForm.password.value;
    createUserWithEmailAndPassword(auth,email,password)
    .then((cred)=>{
        console.log("user Created:",cred.user);
        signinForm.reset();
    }).catch((err)=>{
        console.log(err.message);
    })
 })

// Logout
const logoutForm=document.querySelector(".logout");
logoutForm.addEventListener('click', ()=>{
    signOut(auth)
    .then(()=>{
      //  console.log("User Signed Out..");
    })
})

 //  Login or signin with email and password
 const loginForm=document.querySelector(".login");
 loginForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const email=loginForm.email.value;
    const password=loginForm.email.value;

    signInWithEmailAndPassword(auth,email,password)
    .then((cred)=>{
     //   console.log("User Logged In: " ,cred.user);
    }).catch((err)=>{
        console.log(err.message);
    })

 });

 //  Listening to Auth Changes
 const unsubAuth=onAuthStateChanged(auth,(user)=>{
    console.log("User Status changed..",user);
 })


 //  Unsubscribing from changes...

 const unsubButton=document.querySelector(".unsub");
 unsubButton.addEventListener('click',()=>{
      console.log("Unsubscribing...");
      unsubCol()
      unsubDoc()
      unsubAuth
 });