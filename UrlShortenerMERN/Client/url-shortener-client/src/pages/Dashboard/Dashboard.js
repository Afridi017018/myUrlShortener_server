import React from 'react';
import { useState } from 'react';
import Button from '../../components/Button/Button';
import TextInput from '../../components/TextInput/TextInput';
import "./Dashboard.css"




const Dashboard = ({userId}) => {

    const [addView, setAddView] = useState(false)
    const [payload , setPayload] = useState({
        originalLink: "",
        name: "",
        userId: ""
    })

    const [shortUrl , setShrotUrl] = useState("")

    const handleClick = ()=>{
        if(!payload.originalLink)
         return alert("Original link is needed!")


        fetch(`http://localhost:4000/url/`,{
            method: "POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({...payload,userId:userId})
        })
        .then(response=> response.json())
        .then(data => {
            setShrotUrl(`http://localhost:4000/url/${data.urlCode}`)
        })
        .catch((error) => {
            console.error('Error:', error);
          });
    }


    const emptyUrl = () => {
        return (
            <div className="dashboard__empty-state">
                <p>You don't have any url</p>
                <Button onClick={() => setAddView(true)} label="primary" variant="outlined-primary" />
            </div>
        )

    }

    const addNewUrl = () => {
        return (
            <div className="dashboard__empty-state">

                <TextInput label="Original Url" placeholder="https://www.google.com/" value={payload.originalLink}  onChange={(val) => setPayload({...payload , originalLink: val})} />
                <TextInput label="Name" placeholder="Name" value={payload.name} onChange={(val) => setPayload({...payload , name: val})} />

                <div className="dashboard__add-new-actions">
                    <Button onClick={handleClick} label="Generate a short url" />
                    <Button onClick={() => setAddView(false)} label="Cancel" variant="outlined-primary" />
                </div>


            </div>
        )


    }


    return (
        <div className='dashboard'>
            {
                addView ? addNewUrl() : emptyUrl()
            }
            {
                shortUrl && <p className='shortUrl'>{shortUrl}</p>
            }

        </div>
    );
};

export default Dashboard;