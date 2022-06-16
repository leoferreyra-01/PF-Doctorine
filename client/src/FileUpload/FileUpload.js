import React from 'react';
import { storage } from './firebase';
import { getUrlStudies } from '../redux/actions';
import Swal from 'sweetalert2';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import s from './file.module.css';

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
          setProgress(progress1 - 2);
          console.log('Upload is ' + progress1 - 2 + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
            default:
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
            default:
              break;
          }
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'File uploaded successfully',
              showConfirmButton: false,
              timer: 1500,
            });
            dispatch(getUrlStudies(downloadURL));
            setProgress(100);
          });
        }
      );
    }
  }, [file]);

  return (
    <div className={s.continer}>
      <form onSubmit={handleSubmit}></form>
      <div className={s.fileSelect}>
        <input id="file1" type="file" onChange={handleOnChange} accept=".pdf" />
      </div>
      <progress value={progress} max="100" />
      <div>{parseInt(progress) === -2 ? 0 : parseInt(progress)} %</div>
    </div>
  );
}
