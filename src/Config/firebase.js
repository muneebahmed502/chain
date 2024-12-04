import axios from "axios"; // Import axios to make HTTP requests
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore,doc, orderBy,query,setDoc , collection, getDocs, getDoc, addDoc,limit,where} from "firebase/firestore";
import { getAuth,sendPasswordResetEmail,createUserWithEmailAndPassword,signInWithEmailAndPassword,onAuthStateChanged,signOut} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCA7inqCcmffm0UcRcxCZLcBPItzakHIdc",
  authDomain: "chain-perfume.firebaseapp.com",
  projectId: "chain-perfume",
  storageBucket: "chain-perfume.firebasestorage.app",
  messagingSenderId: "546416433606",
  appId: "1:546416433606:web:2becd946ce324debf53ac7",
  measurementId: "G-4FHJ939KJ7"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const db = getFirestore(app);

export async function Registered(userInfo) {
    const { signUpName, signUpEmail, signUpPassword } = userInfo;
  
    try {
      const { user: { uid } } = await createUserWithEmailAndPassword(auth, signUpEmail, signUpPassword);
      const userRef = doc(db, "users", uid);
      await setDoc(userRef, { signUpName, signUpEmail });
  
      // Optional: Sign the user in after registration (if you want to auto-login)
      await signInWithEmailAndPassword(auth, signUpEmail, signUpPassword);
  
      alert('You are registered successfully!');
    } catch (e) {
      alert(e.message);
    }
  }
  
  export async function login(userInfo){
  const { signInEmail, signInPassword} = userInfo
  await signInWithEmailAndPassword(auth, signInEmail, signInPassword)
  alert('logged in sucessfully')
  }
  
  export async function postAdToDb(add){
    try {
      // const storageRef = ref(storage,  `ads/${ad.image.name}`);
      // await uploadBytes(storageRef, ad.image)
      // const url = await getDownloadURL(storageRef)
      // ad.image = url
      await addDoc(collection(db, "addItems"),add )
      alert('Data added successfully!')
    }catch(e){
    console.log(e.message)
    throw new Error('Failed to add data to the database')
    }
    }

    export async function getAllProducts() {
      try {
        // Reference to the "addItems" collection
        const productsRef = collection(db, "addItems");
        
        // Create a query to order by "createdAt" in descending order
        const productsQuery = query(productsRef, orderBy("createdAt", "desc"));
        
        // Execute the query and get the documents
        const querySnapshot = await getDocs(productsQuery);
        
        // Map through the documents and build the products array
        const products = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
    
        console.log("Fetched Products:", products);
        return products;
      } catch (error) {
        console.error("Error fetching products:", error);
        throw new Error("Failed to fetch products");
      }
    }
    

      export async function getSingleProduct(id){
        console.log(id)
      const docRef = doc(db, "addItems", id );
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        return docSnap.data();
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
      }

      export const sendOrderEmail = async (orderDetails) => {
        try {
          await addDoc(collection(db, "orders"), orderDetails);
          console.log("Order added to Firestore:", orderDetails);
      
          // Send order email to backend
          const emailData = {
            email: orderDetails.email, // Customer email
            subject: `Order Confirmation for ${orderDetails.productName}`,
            message: `Thank you for your order!\n\nProduct: ${orderDetails.productName}\nQuantity: ${orderDetails.quantity}\nTotal: $${orderDetails.subtotal}`,
          };
      
          const response = await axios.post('http://localhost:3002/send-email', emailData);
          console.log("Email sent:", response.data);
      
        } catch (error) {
          console.error("Error adding order or sending email:", error);
        }
      };


      export async function getTopThreeProducts() {
        try {
          const productsRef = collection(db, "addItems");
          const productsQuery = query(productsRef, orderBy("createdAt", "desc"), limit(3));
          const querySnapshot = await getDocs(productsQuery);
      
          const products = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
      
          return products;
        } catch (error) {
          console.error("Error fetching top 3 products:", error);
          throw new Error("Failed to fetch top 3 products");
        }
      }

      export async function getMyAddToCart() {
        const auth = getAuth();
        
        // Check if the user is authenticated
        if (!auth.currentUser) {
            console.log("No user is authenticated");
            throw new Error("User is not authenticated");
        }
    
        // Updated to match userId instead of uid
        const q = query(collection(db, "orders"), where("userId", "==", auth.currentUser.uid));
    
        const querySnapshot = await getDocs(q);
        const myAddToCart = [];
        
        querySnapshot.forEach((doc) => {
            const cartItem = doc.data();
            cartItem.id = doc.id;
            myAddToCart.push(cartItem);
        });
        
        console.log("Fetched cart items: ", myAddToCart);
        return myAddToCart;
    }

    export const logout = async () => {
      try {
        await signOut(auth);
      } catch (e) {
        console.error('Logout error:', e.message);
      }
    };
    

    export async function postReview(review){
      try {
        
        await addDoc(collection(db, "addReview"),review )
        alert('review added successfully!')
      }catch(e){
      console.log(e.message)
      throw new Error('Failed to add review to the database')
      }
      }

      export async function getAllReviews() {
        try {
          const reviewRef = collection(db, "addReview");
          const reviewQuery = query(reviewRef, orderBy("createdAt", "desc"));
          const querySnapshot = await getDocs(reviewQuery);
          const reviews = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
      
          console.log("Fetched reviews:", reviews);
          return reviews;
        } catch (error) {
          console.error("Error fetching reviews:", error);
          throw new Error("Failed to fetch reviews");
        }
      }
      
    