/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-async-client-component */
'use client'

import { faEnvelope, faPhone, faStar, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, RadioGroup, TextArea, TextField, Theme } from '@radix-ui/themes';
import { useState } from 'react';
import {
  CitySelect,
  CountrySelect,
  StateSelect,
} from "react-country-state-city";

import "react-country-state-city/dist/react-country-state-city.css";
import ImageUpload from './ImageUpload';
import { saveJobAction } from '../actions/jobActions';

export default function JobForm({ orgId }) {
  const [countryId, setCountryId] = useState(0);
  const [stateId, setStateId] = useState(0);
  const [, setCityId] = useState(0);
  const [countryName, setCountryName] = useState('');
  const [stateName, setStateName] = useState('');
  const [cityName, setCityName] = useState('');

  // Updated handleSaveJob to handle FormData
  async function handleSaveJob(event) {
    event.preventDefault(); // Prevent default form submission

    const formData = new FormData(event.target); // Create FormData object from the form

    // Add additional data to FormData
    formData.set('country', countryName.toString());
    formData.set('state', stateName.toString());
    formData.set('city', cityName.toString());
    formData.set('orgId', orgId);

    // Call the saveJobAction
    const jobDoc = await saveJobAction(formData);
    console.log("job doc: ", jobDoc);
  }

  return (
    <Theme>
      <form 
        onSubmit={handleSaveJob}  // Updated to use onSubmit
        className='container mt-6 flex flex-col gap-4'
      >
        <TextField.Root name='title' placeholder='Job title'/>
        <div className='grid grid-cols-3 gap-6 *:grow'>
          <div>
            Remote?
            <RadioGroup.Root defaultValue='hybrid' name='remote'>
              <RadioGroup.Item value='onsite'>On-site</RadioGroup.Item>
              <RadioGroup.Item value='hybrid'>Hybrid-remote</RadioGroup.Item>
              <RadioGroup.Item value='remote'>Fully Remote</RadioGroup.Item>
            </RadioGroup.Root>
          </div>

          <div>
            Full Time?
            <RadioGroup.Root defaultValue='full' name='type'>
              <RadioGroup.Item value='full'>Full Time</RadioGroup.Item>
              <RadioGroup.Item value='part'>Part-Time</RadioGroup.Item>
              <RadioGroup.Item value='project'>Project based</RadioGroup.Item>
            </RadioGroup.Root>
          </div>
          <div >
            Salary 
            <TextField.Root name='salary'>
                <TextField.Slot>
                    $
                </TextField.Slot>
                <TextField.Slot>
                    k/year
                </TextField.Slot>
            </TextField.Root>
          </div>
        </div>
        <div >
            Location
            <div className='flex gap-4 *:grow'>
            <CountrySelect
              onChange={(e) => {
                setCountryId(e.id);
                setCountryName(e.name);

              }}
              placeHolder="Select Country"
            />

            <StateSelect
              countryid={countryId}
              onChange={(e) => {
                setStateId(e.id);
                setStateName(e.name);
              }}
              placeHolder="Select State"
            />

            <CitySelect
              countryid={countryId}
              stateid={stateId}
              onChange={(e) => {
                setCityId(e.id);
                setCityName(e.name);
              }}
              placeHolder="Select City"
            />
          </div>
        </div>
        <div className='flex'>
          <div className='w-1/3'>
            <h3>Job Icon</h3>
            <ImageUpload name='jobIcon' icon={faStar}/>
          </div>

          <div className='grow'>
            <h3> Contact Person</h3>
            <div className='flex gap-2'>
              <div>
                <ImageUpload name='personPhoto' icon={faUser}/>
              </div>
              <div className='grow flex flex-col gap-1'>
              <TextField.Root placeholder='John Doe' type='text' name='name'>
                  <TextField.Slot>
                    <FontAwesomeIcon icon={faUser}/>
                  </TextField.Slot>
                </TextField.Root>                
                <TextField.Root placeholder='Phone' type='tel' name='phone'>
                  <TextField.Slot>
                    <FontAwesomeIcon icon={faPhone}/>
                  </TextField.Slot>
                </TextField.Root>
                <TextField.Root placeholder='Email' type='email' name='email'>
                  <TextField.Slot>
                    <FontAwesomeIcon icon={faEnvelope}/>
                  </TextField.Slot>
                </TextField.Root>
              </div>
            </div>
          </div>
        </div>
          <TextArea placeholder='Job description' name='description' resize={'vertical'}/>
          <div className='flex justify-center'>
            <Button size={3} type="submit">
              <span className='px-8'>Save</span>
            </Button>
          </div>
      </form>
    </Theme>
  )
}
