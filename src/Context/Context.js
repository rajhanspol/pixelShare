import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import html2canvas from 'html2canvas'
import { firestore } from '../Firebase/firebase';
import { AuthContext } from './AuthContext';

const Context = React.createContext()

function ContextProvider(props){

    const authCtx = useContext(AuthContext)

    const database = firestore.collection('pixelImg')

    const [sideValue, setSideValue] = useState(20)
    const [color, setColor] = useState(`#000000`)

    // Squares will only get colored if mousedown is true
    const [mouseDown, setMouseDown] = useState(false)


    const [bkGroundColor, setBkGroundColor] = useState(`#FFFFFF`)
    const [displayLines, setDisplayLines] = useState(true)

    // Square coloring functions have an if check, if erase is true, instead of coloring squares, it will remove the colour
    const [erase, setErase] = useState(false)

    const [imageName, setImageName] = useState('')
    const [imageContainer, setImageContainer] = useState([])
    const [userContent, setUserContent] = useState([]);


    

    // set grid side value
    function onSliderChange(value){
        setSideValue(value)
    }

    // select draw color
    function selectColor(value){
        setColor(value)
    }


    function squareMouseDown(e){
        if(erase){
            e.target.style.backgroundColor = null
        } else {
            e.target.style.backgroundColor = color
        }
    }


    function stopDraw(){
        setMouseDown(false)
    }

    function startDraw(){
        setMouseDown(true)
    }

    function dragDraw(event){
        if(mouseDown){
            if(event.target.className === 'square'){
                if(erase){
                    event.target.style.backgroundColor = null
                } else {
                event.target.style.backgroundColor = color
                }
            }
        }
    }


    function touchDragDraw(event){
        //console.log(event.touches[0].target.className)
        if(mouseDown){
            // check if the touched event is a square
            if(event.touches[0].target.className === 'square'){
                let x = event.touches[0].clientX
                let y = event.touches[0].clientY
                let hoveredElem = document.elementFromPoint(x, y)
                
                // when touch drags over other elements, check if classname is square. This is to prevent elements from outside the gird to change background colour.
                if(hoveredElem.className === "square"){
                    if(erase){
                        hoveredElem.style.backgroundColor = null
                    } else {
                        hoveredElem.style.backgroundColor = color
                    }
                // When the touch drags on elements outside the grid, set mouseDown to false
                } else {
                    setMouseDown(false)
                }
            } 
        }
        
    }


    function toggleErase(){
        setErase(prevState => !prevState)
    }


    function colorFill(){
        setBkGroundColor(color)
    }

    function toggleLineDisplay(){
        setDisplayLines(prevState => !prevState)
    
    }

    function refreshGrid(){
        document.querySelector(".grid").querySelectorAll("div").forEach(div => 
            div.style.backgroundColor = null )
        setBkGroundColor('#FFFFFF')
        setSideValue(20)
        setDisplayLines(true)
        setImageName("")
    }


    function SaveImage(e){
        e.preventDefault()
        html2canvas(document.querySelector("#capture")).then(canvas => {
            let data = canvas.toDataURL("image/png")
            let newImg = {name: imageName===""? "untitled": imageName, imgData: data}
            setImageContainer(prevState => prevState.concat(newImg))
            refreshGrid()
            
        })
    }

    
    
    
    async function PostToCloud(e){
        e.preventDefault()
        // use html2Canvas to get a snapshot of the image and set the image details in an variable (let data).
         await html2canvas(document.querySelector("#capture")).then(canvas => {
            let data = canvas.toDataURL("image/png")
            let timeStamp = Math.floor(Date.now()/1000)
            let emailId = authCtx.currentUser.email
            let identifier = authCtx.currentUser.uid
            let date = new Date()
            let day = date.getDate();
            let month = date.getMonth()+1;
            let year = date.getFullYear();
            
            // make an object to add this variable along with other details like user details and timestamp.
            let imgToUpload = {
                name: imageName===""? "untitled": imageName, 
                timestamp: timeStamp, 
                imgData: data,
                email: emailId,
                uid: identifier,
                createdAt: `${day}/${month}/${year}`
            }
            
            // upload this object to the database.
            database.add(imgToUpload)
            
        })
        refreshGrid()
         
    }

    async function deleteContent(item){
        await database.doc(item).delete()
    }


    useEffect(() => {
        if(authCtx.currentUser){
        return database
            .orderBy("timestamp", 'desc')
            .onSnapshot(
                (snapshot) => {
                    setUserContent(snapshot.docs.map(doc => 
                        {return {...doc.data(), id: doc.id}}
                        ))               
                })
            } else {
                return null
            }
            
    }, [authCtx.currentUser])




    function imageNameHandler(value){
        setImageName(value)
    }

    //console.log(mouseDown)
    // console.log(color)
    // console.log(imageContainer)
    // console.log(imageName)
    
    return(
        <Context.Provider 
            value={{
                sideValue, onSliderChange, 
                color, selectColor, squareMouseDown, 
                stopDraw, startDraw, dragDraw, 
                bkGroundColor, colorFill,
                displayLines, toggleLineDisplay,
                refreshGrid, toggleErase, erase,
                SaveImage, imageNameHandler, imageName, imageContainer,
                touchDragDraw, PostToCloud, userContent, deleteContent
                
                    }}>
            {props.children}
        </Context.Provider>
    )
}

export {ContextProvider, Context}