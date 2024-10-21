import styles from '../AddFlat/AddFlat.module.css';
import Grid2 from '@mui/material/Grid2';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {doc,getDoc,updateDoc} from 'firebase/firestore';
import { onAuthStateChanged } from "firebase/auth";
import {auth,db } from '../../../firebase';

const AddFlat = () => {
    const [flatData, setFlatData] = useState({
        id:Date.now(),
        city: '',
        streetName : '',
        streetNumber:'',
        areaSize : '',
        hasAc : false,
        yearBuild: '',
        rentPrice: '',
        dateAvailable: '',
        isFavourite:true
    })

    const navigate = useNavigate();

    const handleChange = (e) =>{
        const {name, value, type, checked} = e.target;
        setFlatData((previous) => ({
            ...previous,
            [name] : type ==='checkbox' ? checked : value,

        }))
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            const unsubscribe = onAuthStateChanged(auth, (user) => {
                const fetchUserData = async () => {
                    if(user){
                        const flatsCollection = doc(db, 'users', user.uid);
                        const flatDoc = await getDoc(flatsCollection);
                        if(flatDoc.exists()){
                            const findFlatData =  flatDoc.data();
                            const flatArr = findFlatData.flats;
                            flatArr.push(flatData);

                            await updateDoc(flatsCollection,{
                                flats:flatArr
                            })
                            navigate('/homepage');
                        }
                    }
                    
                  }
                fetchUserData();

              })
            
              return() => unsubscribe();
            
        }catch(error){
            console.log('Error adding flat',error);
        }
    }

  return (
    <main>
       <h2>Add flat</h2>
       <form className={styles.addFlat_container} onSubmit={handleSubmit}>

       <label>City:
         <input type='text' name='city' value={flatData.city} onChange={handleChange}/>
      </label>

      <label>Street name:
         <input type='text' name='streetName' value={flatData.streetName} onChange={handleChange}/>
      </label>

      <label>Street number:
         <input type='number' name='streetNumber' value={flatData.streetNumber} onChange={handleChange}/>
      </label>

      <label>Area size:
         <input type='number' name='areaSize' value={flatData.areaSize} onChange={handleChange}/>
      </label>

      <label>Has AC:
         <input type='checkbox' name='hasAc' checked={flatData.hasAc} onChange={handleChange}/>
      </label>

      <label>Year built:
         <input type='number' name='yearBuild' value={flatData.yearBuild} onChange={handleChange}/>
      </label>

      <label>Rent Price:
         <input type='number' name='rentPrice' value={flatData.rentPrice} onChange={handleChange}/>
      </label>

      <label>Date available:
         <input type='date' name='dateAvailable' value={flatData.dateAvailable} onChange={handleChange}/>
      </label>

      <button type='submit'>Add flat</button>

         
        {/* <Grid2 container spacing={2} columns= {4} >
           <Grid2 size={1}>
            <input type='text' placeholder="city" name="city" value={flatData.city} onChange={handleChange} />
            </Grid2>
           <Grid2 size={1}>
           <input type='text' placeholder="Street Name" name="streetName" value={flatData.streetName} onChange={handleChange} />
           </Grid2>
           <Grid2 size={1}>
           <label> AC:
              <input type='checkbox' name="hasAC"   checked={flatData.hasAc} onChange={handleChange}/>
           </label>
           </Grid2>

           <Grid2 size={1}>
           <input type='number' placeholder="Street Number" name="streetNumber"   value={flatData.streetNumber} onChange={handleChange}/>
           </Grid2>
           <Grid2 size={1}>
           <input type='number' placeholder="Area Size" name="areaSize"  value={flatData.areaSize} onChange={handleChange}/>
           </Grid2>
           <Grid2 size={1}>      
             <input type='date' placeholder="dateAvailable" name="dateAvailable"  value={flatData.dateAvailable} onChange={handleChange}/>
           </Grid2>

           <Grid2 size={1}>
           <input type='number' placeholder="yearBuild" name="yearBuild"   value={flatData.yearBuild} onChange={handleChange}/>
           </Grid2>
           <Grid2 size={1}>
           <input type='number' placeholder="Rent Price" name="rentPrice"  value={flatData.rentPrice} onChange={handleChange}/>
           </Grid2>
           <Grid2 size={1} className={styles.add_btn}>
            <button className={styles.add_btn} type='submit'>Add</button>
           </Grid2>
        </Grid2> */}
       </form>
    </main>
  )
}

export default AddFlat