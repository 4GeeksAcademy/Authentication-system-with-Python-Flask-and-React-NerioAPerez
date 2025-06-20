import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";

const urlbase = "https://curly-meme-v6pww7g4vxvr25rg-3001.app.github.dev/api";

export const Private = () => {
    const { store, dispatch } = useGlobalReducer()
    const navigate = useNavigate()
    const privateUserData = async () => {
        try {
            const response = await fetch(`${urlbase}/private`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/jon",
                    "Authorization": "Bearer " + sessionStorage.getItem("access_token")
                },                
            });
            const data = await response.json()
           if (!response.ok){
                throw new Error("Sin Permiso")
           }
           dispatch({type:"set_user", payload: data})
          
        } catch (error) {
            console.log(error)
            dispatch({type:"set_user", payload: false})
            navigate("/")
        }
    };

    useEffect(() =>{
        privateUserData()
    },[])

    return (
        <h1>Hola {store.currentUser && store.currentUser.email}</h1>
    );


};