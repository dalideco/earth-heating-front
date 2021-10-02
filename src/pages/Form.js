import React,{useEffect, useMemo, useState,useContext, createContext} from 'react'
import countriesUtility from '../utilities/countriesUtility'
import { useHistory } from "react-router-dom";

const countries= countriesUtility.getCountries();
const formContext = createContext();

function FormInput({name}){

    const {formInputs, setFormInputs}= useContext(formContext)

    const handleChange=(e)=>{
        const {value} = e.target;
        setFormInputs(prev=>({
            ...prev,
            [name] : value
        }))
    }

    return (
        <div className="input">
            <label htmlFor={name}>{name}:</label>
            <div className="input-space">
                <input type="text" 
                    id={name} 
                    placeholder={name} 
                    name={name}
                    value={formInputs[name]} 
                    onChange={handleChange} 
                />
                <div className="line"></div>
            </div>
        </div>
    )
}

function SelectInput({name,options}){
    const {formInputs, setFormInputs}= useContext(formContext)
    
    const handleChange=(e)=>{
        const {value} = e.target;
        setFormInputs(prev=>({
            ...prev,
            [name] : value
        }))
    }

    return (
        <div className="input">
            <label htmlFor={name}>{name}:</label>
            <div className="input-space">
                <select 
                    placeholder={name}
                    name={name} 
                    value={formInputs[name]}
                    onChange={handleChange}
                    id=""
                >
                    {options.map(option=>(
                        <option value={option.country||option}>
                            {option.country||option}
                        </option>
                    ))}
                </select>
                <div className="line"></div>
            </div>
        </div>
    )
}

export default function Form() {

    const history= useHistory();

    const [loadingSubmit, setLoadingSubmit] = useState(false)

    const [formInputs, setFormInputs] = useState({
        email:"",
        country: "Tunisia",
        state:"Ariana",
    })

    const states= useMemo(()=>{
        return countriesUtility.getStates(formInputs.country)
    },[formInputs.country])
    useEffect(()=>{
        setFormInputs(prev=>({
            ...prev, 
            state:states[0]?states[0]:'none'
        }))
    },[states])


    const onSubmit =(e)=>{
        e.preventDefault();
        setLoadingSubmit(true);

        //post to server here

        //add to localStorage
        localStorage.setItem('userData',JSON.stringify(formInputs))

        setTimeout(()=>{
            setLoadingSubmit(false);
        },1000)

        history.push("/home");
    }

    const value={
        formInputs, setFormInputs
    }
    return (
        <formContext.Provider value={value}>
            <div className="country-form">
                <form>
                    <div className="inputs">
                        <FormInput name="email" />
                        <SelectInput name="country" options={countries} />
                        <SelectInput name="state" options={states}/>
                    </div>
                    <button 
                        class="submit-button" 
                        onClick={onSubmit}
                        disabled={loadingSubmit}
                    > {loadingSubmit?'...':'Join'} </button>
                </form>
            </div>
        </formContext.Provider>
    )
}
