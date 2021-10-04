import {Context} from '../../Context/Context'
import { useContext } from 'react'


function DisplayContent(){

    const ctx = useContext(Context)

    // map all content

    const showImages = ctx.imageContainer.map(item => (
        <div className="userImg">
            <img src={item.imgData} alt="Trying to load content"></img>
            <p>{item.name}</p>
        </div>
    ))

    return (
        <div className="imageContainer" id="imgContainer">
            {showImages}
        </div>
    )
}

export default DisplayContent