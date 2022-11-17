import React , {useState,useEffect} from 'react'
import './PlanningClock.css';


function PlanningClock(){
            const [time,setTime]=useState(25*60)
            const [BreakLength,setBreakLength]=useState(5)
            const [SessionLength,setSessionLength]=useState(25)
            const [isSession,SetIsSession]=useState(true)
            const [isPlaying,setIsPlaying]=useState(false)

        const handleBreakLengthDown =() =>{
            if(!isPlaying){
                if(BreakLength>1){
                    setBreakLength(BreakLength-1) 
                }
                
            }
        }

        


        const handleBreakLengthUp= () =>{
            if(!isPlaying){
                if(BreakLength<60){
                    setBreakLength(BreakLength+1)
                }
            
            }
        }

        const handleSessionLengthUp=() =>{
            if(!isPlaying){
                if(SessionLength<60){
                    setSessionLength(SessionLength+1)
                    setTime(time-(time%60)+60)   
                }
            
            }
        }

        const handleSessionLengthDown=() =>{
            if(!isPlaying){
                if(SessionLength>1){
                    setSessionLength(SessionLength-1)
                    setTime(time-(time%60)-60)
                }
            
            }
}

const getTime= () =>{
    const minutes=Math.floor(time/60)
    const seconds=time-minutes*60
    return `${minutes<10 ? "0"+minutes : minutes}:${seconds<10? "0"+seconds:seconds}`
}

useEffect(() => {
    if(time > 0 && isPlaying ){
    const interval = setInterval(() => {
        setTime(time - 1);
    } , 100);
    
    return () => clearInterval(interval);

  }
  if(time===0 && isPlaying ){
        setTime(BreakLength*60)
        SetIsSession(!isSession)
        let audio =document.getElementById("beep")
        audio.play()
}



  },[time,isPlaying,isSession,BreakLength]);




const handlePlay = () =>{
          setIsPlaying(!isPlaying)
        }      


const handleReset=()=>{   
    let audio =document.getElementById("beep")
    audio.pause()
    audio.currentTime = 0
    setTime(25*60)
    setBreakLength(5)
    setSessionLength(25)
    setIsPlaying(false)
    SetIsSession(true)
    
    
}

const handlePause =() =>{
setIsPlaying(!isPlaying)
}


return(
    <div className='MainContent'>
        <h1 className='title'>25 + 5 Clock</h1>

        <div className='timingSetting'>
              <div className='BreakLength'>
                 <h4 id='break-label'>Break Length</h4>
                 <div className='ButtonSetting'>
                      <i id="break-increment" onClick={handleBreakLengthUp} className="bi bi-arrow-up-square-fill"  />
                      <h3 id="break-length">{BreakLength}</h3>
                      <i id="break-decrement" onClick={handleBreakLengthDown} className="bi bi-arrow-down-square-fill"/>
                     
                 </div>
               </div>
              <div className='Session Length'>
                 <h4 id='session-label'>Session Length</h4>
                 <div className='ButtonSetting'>
                 <i onClick={handleSessionLengthUp} id='session-increment'className="bi bi-arrow-up-square-fill"></i>
                 <h3 id="session-length">{SessionLength}</h3>
                 <i id='session-decrement' onClick={handleSessionLengthDown} className="bi bi-arrow-down-square-fill"></i>
                 
              </div>
          </div>
      </div>



      <div className='time'>
        <p id='timer-label'>{isSession ? "Session" : "Break" }</p>
        <h1 id="time-left" className={time<60  && "redTime"}>{getTime()}</h1>
        <audio id='beep' preload="auto" src='https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav' />
        
        
       
        <div className='buttons'>
        <i id="start_stop" onClick={handlePlay} className="bi bi-play-fill"/>
        <i id="start_stop" onClick={handlePause} className="bi bi-pause-fill"/>
        <i id="reset" onClick={handleReset} className="bi bi-arrow-clockwise"/>
        </div>
  
      </div>
      <footer className='footer'>
        <p>Designed and Coded by:</p>
        <p className='name'> Sina Parsapour</p>
      </footer>
    </div>
    
)



}

export default PlanningClock;
