import { useEffect, useState } from "react";
import {onAuthStateChanged} from 'firebase/auth';
import {auth, db} from '../../../firebase';
import {doc, getDoc} from 'firebase/firestore';




const Flats = () => {

    const [flats, setFlats] = useState([]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            const fetchFlatsData = async () => {
                if(user){
                    const flatsColection = doc(db, 'users', user.uid);
                    const flatDoc = await getDoc(flatsColection);
                    if(flatDoc.exists()){
                        const finalFlatData = flatDoc.data();
                        const flatArr = finalFlatData.flats;
                        setFlats(flatArr);
                    }
                }
            }
            fetchFlatsData();
        })

        return () => unsubscribe();
    }, [])

    return (
        <div>
            <h2>My flats</h2>

            {flats.length === 0 ? (
                <p>No flats available.</p>
            ): (
                <table border = "1">
                    <thead>
                        <tr>
                            <td>City</td>
                            <td>Street Name</td>
                            <td>Street Number</td>
                            <td colSpan={3}>Actions</td>
                        </tr>
                    </thead>
                    <tbody>
                        {flats.map(flat => (
                            <tr key={flat.id}>
                                <td>{flat.city}</td>
                                <td>{flat.streetName}</td>
                                <td>{flat.streetNumber}</td>
                                <td><button>See details here</button></td>
                                <td><button>Edit flat</button></td>
                                <td><button>Delete flat</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
  }

export default Flats