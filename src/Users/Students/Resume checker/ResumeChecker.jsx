import React, { useState, useEffect } from 'react';
import { auth, storage, firestore } from '../../../index'; // adjust your path
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import './ResumeChecker.css'; // create nice CSS

const ResumeChecker = () => {
  const [userId, setUserId] = useState(null);
  const [file, setFile] = useState(null);
  const [parsedData, setParsedData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadResumeAndGetURL = async (file, userId) => {
    const storageRef = ref(storage, `resumes/${userId}/${file.name}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  };

  const parseResumeFromURL = async (fileURL) => {
    const myHeaders = new Headers();
    myHeaders.append("apikey", "7RSO9M066UzEi1wFQ5N5IDy3NZ11NX7m");

    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
      headers: myHeaders
    };

    const encodedURL = encodeURIComponent(fileURL);
    const response = await fetch(`https://api.apilayer.com/resume_parser/url?url=${encodedURL}`, requestOptions);

    if (!response.ok) {
      throw new Error('Failed to parse resume');
    }

    const result = await response.json();
    return result;
  };

  const handleUpload = async () => {
    if (!file || !userId) {
      alert('Please select a file and login first.');
      return;
    }

    try {
      setLoading(true);
      const fileURL = await uploadResumeAndGetURL(file, userId);

      // Save to Firestore under student's document
      await setDoc(doc(firestore, 'students', userId), {
        resumeURL: fileURL
      }, { merge: true });

      const parsed = await parseResumeFromURL(fileURL);
      setParsedData(parsed);

      alert('Resume uploaded and parsed successfully!');
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="resume-upload-container">
      <h1>Upload Your Resume</h1>

      <input type="file" onChange={handleFileChange} accept=".pdf,.doc,.docx" />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? 'Uploading...' : 'Upload and Parse'}
      </button>

      {parsedData && (
        <div className="parsed-result">
          <h2>Parsed Resume Data:</h2>
          <p><strong>Name:</strong> {parsedData.name}</p>
          <p><strong>Email:</strong> {parsedData.email}</p>
          <p><strong>Phone:</strong> {parsedData.phone}</p>
          <p><strong>Skills:</strong> {parsedData.skills?.join(', ')}</p>
          {/* You can show more fields here */}
        </div>
      )}
    </div>
  );
};

export default ResumeChecker;
