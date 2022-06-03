import React, { Component } from 'react';
import { storage } from './firebase';
import { getUrlStudies } from '../redux/actions';
import Swal from 'sweetalert2';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable,
} from 'firebase/storage';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export default function FileUpload() {
  const [file, setFile] = useState('');
  const [progress, setProgress] = useState(0);
  const dispatch = useDispatch();
  const handleOnChange = e => {
    console.log(file);

    setFile(e.target.files[0]);
  };

  const handleSubmit = e => {
    e.preventDefault();

    setFile('');
  };

  useEffect(() => {
    console.log(file);
    if (file) {
      // const metadata = {
      //   contentType: 'pdf',
      // };
      const storageRef = ref(storage, '/Studies/' + file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        snapshot => {
          const progress1 =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress1);
          console.log('Upload is ' + progress1 + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        },
        error => {
          switch (error.code) {
            case 'storage/unauthorized':
              break;
            case 'storage/canceled':
              break;

            case 'storage/unknown':
              break;
          }
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
            Swal.fire('File available at');
            dispatch(getUrlStudies(downloadURL));
          });
        }
      );
    }
  }, [file]);

  return (
    <div>
      <form onSubmit={handleSubmit}></form>
      <input type="file" onChange={handleOnChange} />
      <progress value={progress} max="100" />
      <div>{parseInt(progress)} %</div>
    </div>
  );
}
