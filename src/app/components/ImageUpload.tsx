'use client'

import { faSpinner, IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from '@radix-ui/themes'
import axios from 'axios'
import React, { useRef, useState } from 'react'
import Image from 'next/image'

export default function ImageUpload({name, icon }: {name:string; icon: IconDefinition }) {
    const fileInRef = useRef<HTMLInputElement>(null);
    const [url, setUrl] = useState('');
    const [isUploading, setIsUploading] = useState(false);

    async function upload(ev: React.ChangeEvent<HTMLInputElement>) {
        setIsUploading(true);
        const input = ev.target;
        if (input && input.files?.length && input.files.length > 0) {
            const file = input.files[0];
            const data = new FormData();
            data.set("file", file);
        
            const response = await axios.post('/api/upload', data);
            if (response.data.url) {
                setUrl(response.data.url);
            }
            setIsUploading(false);
        }
    }

    return (
        <>
            <div className='bg-gray-100 rounded-md size-24 inline-flex items-center content-center justify-center'>
              {isUploading && (
                <FontAwesomeIcon icon={faSpinner} className='text-gray-400 fa-spin'/>
              )}
              {!isUploading && !url && (
                <FontAwesomeIcon icon={icon} className='text-gray-400'/>
              )}
              {!isUploading && url && (
                <Image src={url} alt={"upload image"} width={1024} height={1024}
                      className="w-auto h-auto max-w-24 max-h-24" />
              )}
           </div>
           <input type='hidden' value={url} name={name}/>
            <div className='mt-2'>
                <input 
                    onChange={upload}
                    ref={fileInRef} 
                    type='file' 
                    className='hidden'/>
                <Button 
                    variant='soft'
                    onClick={() => fileInRef.current?.click()}
                    type='button'>Select File
                </Button>
            </div>
        </>
    )
}
