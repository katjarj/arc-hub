// "use client";
// import React, { useState, useEffect } from "react";
// import {
//   collection,
//   addDoc,
//   onSnapshot,
//   query,
//   deleteDoc,
//   doc,
// } from "firebase/firestore";
// import { fs } from "@/app/firebase/config";

// export default function Home() {
//   const [items, setItems] = useState([]);
//   const [newItem, setNewItem] = useState({
//     name: "",
//     description: "",
//     available: "",
//   });

//   // Add item to database
//   const addItem = async (e) => {
//     e.preventDefault();
//     const { name, description, available } = newItem;
//     if (name && description && available) {
//       await addDoc(collection(fs, "items"), {
//         name: name.trim(),
//         description: description.trim(),
//         available: available.trim(),
//       });
//       setNewItem({ name: "", description: "", available: "" });
//     }
//   };

//   // Read items from database
//   useEffect(() => {
//     const q = query(collection(fs, "items"));
//     const unsubscribe = onSnapshot(q, (snapshot) => {
//       const itemsArr = snapshot.docs.map((doc) => ({
//         ...doc.data(),
//         id: doc.id,
//       }));
//       setItems(itemsArr);
//     });

//     return () => unsubscribe();
//   }, []);

//   // Delete item
//   const deleteItem = async (id) => {
//     await deleteDoc(doc(fs, "items", id));
//   };

//   return (
//     <main className="flex min-h-screen flex-col items-center justify-between sm:p-24 p-4">
//       <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
//         <h1 className="text-4xl p-4 text-center">Add Item Request</h1>
//         <div className="bg-slate-800 p-4 rounded-lg">
//           <form
//             onSubmit={addItem}
//             className="grid grid-cols-6 items-center text-black"
//           >
//             <input
//               name="name"
//               value={newItem.name}
//               onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
//               className="col-span-2 p-3 border"
//               type="text"
//               placeholder="Item Name"
//             />
//             <input
//               name="description"
//               value={newItem.description}
//               onChange={(e) =>
//                 setNewItem({ ...newItem, description: e.target.value })
//               }
//               className="col-span-2 p-3 border mx-2"
//               type="text"
//               placeholder="Description"
//             />
//             <input
//               name="available"
//               value={newItem.available}
//               onChange={(e) =>
//                 setNewItem({ ...newItem, available: e.target.value })
//               }
//               className="col-span-2 p-3 border"
//               type="text"
//               placeholder="Available?"
//             />
//             <button
//               className="col-span-6 mt-4 text-white bg-green-700 hover:bg-green-800 p-3 text-xl rounded"
//               type="submit"
//             >
//               Add Item
//             </button>
//           </form>

//           <ul className="mt-6">
//             {items.map((item) => (
//               <li
//                 key={item.id}
//                 className="my-4 w-full flex justify-between bg-slate-900 text-white rounded"
//               >
//                 <div className="p-4 w-full flex flex-col gap-1">
//                   <span className="font-semibold text-lg capitalize">
//                     {item.name}
//                   </span>
//                   <span className="text-sm">{item.description}</span>
//                   <span className="text-xs italic text-gray-400">
//                     Available: {item.available}
//                   </span>
//                 </div>
//                 <button
//                   onClick={() => deleteItem(item.id)}
//                   className="ml-8 p-4 border-l-2 border-slate-800 hover:bg-slate-800 w-16"
//                 >
//                   X
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </main>
//   );
// }

// "use client";
// import React, { useState, useEffect } from "react";
// import {
//   collection,
//   addDoc,
//   onSnapshot,
//   query,
//   deleteDoc,
//   doc,
//   updateDoc,
//   serverTimestamp,
// } from "firebase/firestore";
// import { fs } from "@/app/firebase/config";
// import { updateCredits } from "./creditManagement";
// import useCurrentUser from "@/app/hooks/useCurrentUser";

// export default function Home() {
//   const [posts, setPosts] = useState([]);
//   const [newPost, setNewPost] = useState({
//     title: "",
//     description: "",
//   });

//   // Add a new post to the Firestore database (without status initially)
//   const addPost = async (e) => {
//     e.preventDefault();
//     const { title, description } = newPost;
//     if (title && description) {
//       await addDoc(collection(fs, "posts"), {
//         title: title.trim(),
//         description: description.trim(),
//         createdAt: serverTimestamp(), // Add timestamp to each post
//         available: true, // Default status to available (you can update it later)
//       });
//       setNewPost({ title: "", description: "" }); // Reset form
//     }
//   };

//   // Read posts from Firestore
//   useEffect(() => {
//     const q = query(collection(fs, "posts"));
//     const unsubscribe = onSnapshot(q, (snapshot) => {
//       const postsArr = snapshot.docs.map((doc) => ({
//         ...doc.data(),
//         id: doc.id,
//       }));
//       setPosts(postsArr);
//     });

//     return () => unsubscribe();
//   }, []);

//   // Delete a post from Firestore
//   const deletePost = async (id) => {
//     await deleteDoc(doc(fs, "posts", id));
//   };

//   const toggleAvailability = async (id, available) => {
//     const postRef = doc(fs, "posts", id);
//     await updateDoc(postRef, {
//       available: !available, // Toggle the current availability
//     });

//     const { user, loading } = useUser(); // Get user profile

//     if (!loading && user) {
//       // Increase the user's credits by 1
//       await updateCredits(user.uid);
//     }
//   };

//   return (
//     <main className="flex min-h-screen flex-col items-center justify-between sm:p-24 p-4">
//       <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
//         <h1 className="text-4xl p-4 text-center">Create a Post</h1>
//         <div className="bg-slate-800 p-4 rounded-lg">
//           <form
//             onSubmit={addPost}
//             className="grid grid-cols-6 items-center text-black"
//           >
//             <input
//               name="title"
//               value={newPost.title}
//               onChange={(e) =>
//                 setNewPost({ ...newPost, title: e.target.value })
//               }
//               className="col-span-2 p-3 border"
//               type="text"
//               placeholder="Post Title"
//             />
//             <textarea
//               name="description"
//               value={newPost.description}
//               onChange={(e) =>
//                 setNewPost({ ...newPost, description: e.target.value })
//               }
//               className="col-span-2 p-3 border mx-2"
//               placeholder="Post Description"
//             />
//             <button
//               className="col-span-6 mt-4 text-white bg-green-700 hover:bg-green-800 p-3 text-xl rounded"
//               type="submit"
//             >
//               Add Post
//             </button>
//           </form>

//           <ul className="mt-6">
//             {posts.map((post) => (
//               <li
//                 key={post.id}
//                 className="my-4 w-full flex justify-between bg-slate-900 text-white rounded"
//               >
//                 <div className="p-4 w-full flex flex-col gap-1">
//                   <span className="font-semibold text-lg capitalize">
//                     {post.title}
//                   </span>
//                   <span className="text-sm">{post.description}</span>
//                   <span className="text-xs italic text-gray-400">
//                     Status: {post.available ? "Available" : "Not Available"}
//                   </span>
//                 </div>
//                 <div className="ml-8 p-4 border-l-2 border-slate-800 hover:bg-slate-800 w-32 flex items-center justify-center">
//                   <button
//                     onClick={() => toggleAvailability(post.id, post.available)}
//                     className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
//                   >
//                     {post.available
//                       ? "Mark as Unavailable"
//                       : "Mark as Available"}
//                   </button>
//                 </div>
//                 <button
//                   onClick={() => deletePost(post.id)}
//                   className="ml-8 p-4 border-l-2 border-slate-800 hover:bg-slate-800 w-16"
//                 >
//                   X
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </main>
//   );
// } 
"use client";
import React, { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  deleteDoc,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { fs } from "@/app/firebase/config";
import useCurrentUser from "@/app/hooks/useCurrentUser";
import { updateCredits } from "./creditManagement"; // Import updateCredits function

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({
    title: "",
    description: "",
  });
  
  // Fetch user profile data using the custom hook - THIS MUST BE AT THE TOP LEVEL
  const { user, loading } = useCurrentUser();

  // Add a new post to the Firestore database
  const addPost = async (e) => {
    e.preventDefault();
    const { title, description } = newPost;
    if (title && description) {
      try {
        await addDoc(collection(fs, "posts"), {
          title: title.trim(),
          description: description.trim(),
          createdAt: serverTimestamp(),
          available: true,
          userId: user?.uid || 'anonymous', // Store the user ID with the post
        });
        setNewPost({ title: "", description: "" }); // Reset form
      } catch (error) {
        console.error("Error adding post:", error);
      }
    }
  };

  // Read posts from Firestore
  useEffect(() => {
    const q = query(collection(fs, "posts"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const postsArr = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setPosts(postsArr);
    });

    return () => unsubscribe();
  }, []);

  // Delete a post from Firestore
  const deletePost = async (id) => {
    try {
      await deleteDoc(doc(fs, "posts", id));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  // Toggle post availability status and update user credits
  const toggleAvailability = async (id, available) => {
    try {
      // First check if we have a valid user
      if (!user || loading) {
        console.log("No user found or still loading user data");
        return;
      }
      
      // Update post availability
      const postRef = doc(fs, "posts", id);
      await updateDoc(postRef, {
        available: !available,
      });
      
      // Update user credits - only if user is authenticated
      console.log("Updating credits for user:", user.uid);
      await updateCredits(user.uid);
      
    } catch (error) {
      console.error("Error toggling availability:", error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between sm:p-24 p-4">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
        <h1 className="text-4xl p-4 text-center">Create a Post</h1>
        {user && (
          <div className="text-center mb-4">
            <p>User: {user.name || user.email || user.uid}</p>
            <p>Credits: {user.credits || 0}</p>
          </div>
        )}
        <div className="bg-slate-800 p-4 rounded-lg">
          <form
            onSubmit={addPost}
            className="grid grid-cols-6 items-center text-black"
          >
            <input
              name="title"
              value={newPost.title}
              onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
              className="col-span-2 p-3 border"
              type="text"
              placeholder="Post Title"
            />
            <textarea
              name="description"
              value={newPost.description}
              onChange={(e) =>
                setNewPost({ ...newPost, description: e.target.value })
              }
              className="col-span-2 p-3 border mx-2"
              placeholder="Post Description"
            />
            <button
              className="col-span-6 mt-4 text-white bg-green-700 hover:bg-green-800 p-3 text-xl rounded"
              type="submit"
              disabled={loading || !user}
            >
              Add Post
            </button>
          </form>

          <ul className="mt-6">
            {posts.map((post) => (
              <li
                key={post.id}
                className="my-4 w-full flex justify-between bg-slate-900 text-white rounded"
              >
                <div className="p-4 w-full flex flex-col gap-1">
                  <span className="font-semibold text-lg capitalize">
                    {post.title}
                  </span>
                  <span className="text-sm">{post.description}</span>
                  <span className="text-xs italic text-gray-400">
                    Status: {post.available ? "Available" : "Not Available"}
                  </span>
                </div>
                <div className="ml-8 p-4 border-l-2 border-slate-800 hover:bg-slate-800 w-32 flex items-center justify-center">
                  <button
                    onClick={() => toggleAvailability(post.id, post.available)}
                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                    disabled={loading || !user}
                  >
                    {post.available ? "Mark as Unavailable" : "Mark as Available"}
                  </button>
                </div>
                <button
                  onClick={() => deletePost(post.id)}
                  className="ml-8 p-4 border-l-2 border-slate-800 hover:bg-slate-800 w-16"
                >
                  X
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}