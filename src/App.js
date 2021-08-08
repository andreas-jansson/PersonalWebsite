import React from 'react';
import { useState, useEffect, useRef } from 'react';
import './Styles.scss';
import PropagateLoader from "react-spinners/PropagateLoader";
import { useInView } from 'react-intersection-observer';
import Aos from 'aos';
import "aos/dist/aos.css";


const useElementOnScreen = (options) =>{
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  var check2 = false;

  const callbackFunction = (entries) =>{
    const[ entry ] = entries;
    setIsVisible(entry.isIntersecting)
    if(!entry.isIntersecting){
      check2 = false;
      console.log("check false");
      console.log(entry.target.classList)
    }
    else{
      check2=true;
      containerRef.current.classList.add('appear');
      console.log("check true");

    }
  }

  useEffect(()=>{
    const observer = new IntersectionObserver(callbackFunction, options)
    if(containerRef.current) {
      observer.observe(containerRef.current)
    }


    
    return() => {
      if(containerRef.current) {
        observer.unobserve(containerRef.current)
        if(!check2){
          containerRef.current.classList.remove('appear');
          console.log("removing");
        }
        else{
          containerRef.current.classList.add('appear');
          console.log("adding");
    
        }
      }
    }
    },[containerRef, options]);
    return[containerRef, isVisible];
  }

  function handleClick2() {
    console.log("myFunction");
    /*var copyText = "andreas.jansson@protonmail.com";
    copyText.select();
    copyText.setSelectionRange(0, 99999)
    document.execCommand("copy");
    alert("Copied the text: " + copyText.value);*/
  }

  function handleClick3(){
    console.log("clicked");
    var copyTextarea = document.querySelector('.js-copytextarea');
    copyTextarea.focus();
    copyTextarea.select();

  }


function App() {

  const [loading, SetLoading] = useState(false);

  useEffect(()=>{
      SetLoading(true);
      setTimeout(() =>{
        SetLoading(false)
      }, 2600)
}, [])

  const [ containerRef, isVisible] = useElementOnScreen({
    root:null,
    rootMargin:"0px",
    treshold:0.9
  })


  useEffect(()=>{
    Aos.init({duration:2000});
  },[]);


  const [copySuccess, setCopySuccess] = useState('');
  const textAreaRef = useRef(null);

  function copyToClipboard(e) {
    textAreaRef.current.select();
    document.execCommand('copy');
    e.target.focus();
    setCopySuccess('Copied!');
  };

  return (
    
      loading ? 
        <div className="loading-wrapper">
          <div className="loading-text">
          <h1>LOADING...</h1>
          </div>
          <div className="loading-icon">
            <PropagateLoader color={"#2FE0D4"} loading={loading} size={30} />
          </div>
        </div>
        : 
<div className="main">
  <div className="container">
    <div className="section-1">
      <div className="left-side1">
        <div className="icon-section">
          <a className="git-icon" href="https://github.com/andreas-jansson/">
          </a>
          <a className="linkedin-icon" href="https://www.linkedin.com/in/andreas-jansson-1b14b6163/">
          </a>
        </div>
        <div className="introduction-text">
          <div className="text-box">
          <h1>Hi!</h1>
          <p>I'm Andréas Jansson.</p>
          </div>
      </div>
      </div>
      <div className="left-side1">
     <div data-aos="fade-down" className="lamp-container">
      <div className="lamp lamp-1">
        
      </div>
      <div className="lamp lamp-2">
        
      </div>
      <div className="lamp lamp-3">
        
      </div>
      <div className="lamp lamp-4">
        
      </div>
      <div className="lamp lamp-5">
        
      </div>
      </div>
     </div>
    </div>

    <div className="section-2">
    <div className="container-left">
    <div className="text-box-21">
    </div>
    </div>
      <div className="container-right" >
        <div className="text-box-2" ref={containerRef}>
          <h2>Skills</h2>
          <ul> 
          <li>1.</li>
          <li>2.</li>
          <li>3.</li>
          <li>4.</li>
          <li>5.</li>
      </ul>
      </div>
      </div>

    </div>

    <div className="section-3">
      <div className="container-left-3">
        <div className="contact-box">
          <button onClick={copyToClipboard}>andreas.jansson@protonmail.com</button> 
          <form>
          <textarea
           ref={textAreaRef}
           readOnly
            value='andreas.jansson@protonmail.com'/>
      </form>
      </div>
      </div>
      <div className="container-right-3">

      </div>
  </div>
  </div>
</div>
);
}


export default App;
