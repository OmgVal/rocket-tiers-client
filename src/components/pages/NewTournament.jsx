import {
    useState,
    useRef,
    useEffect
} from "react"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function NewTournament({currentUser, setCurrentUser}){
    const [content, setContent] = useState("")
    const [title, setTitle] = useState('')
    const [url, setUrl] = useState("")
    const [ranks, setRanks] = useState("")
    const [reward, setReward] = useState("")
    const [category, setCategory] = useState("")
    const [admin, setAdmin] = useState(false)
    const [msg, setMsg] = useState("")
    const [isInitialRender, setIsInitialRender] = useState(true);


    const username = currentUser.username
    // console.log(currentUser)

    // Cloudinary 
    const [fileInputState, setFileInputState] = useState('')
    const [previewSource, setPreviewSource] = useState('')


    // Multer
    const inputRef = useRef(null)
    const [formImg, setFormImg] = useState('')

    const navigate = useNavigate()

    useEffect (() => {

        const adminCheck = async () => {
            
            if (currentUser == null) return;
            try {
                if (isInitialRender) {
                    setIsInitialRender(false);
					// get the token from local storage
					const token = localStorage.getItem('jwt')
					// make the auth headers
					const options = {
						headers: {
							'Authorization': token
						}
					}
					// hit the auth locked endpoint
					const user = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/${username}`, options)
                    // console.log('newtour:', user)
                    // console.log('newtour:', user.data.admin)

                    if(user.data.admin) return setAdmin(true)
                }
            } catch (err) {
                console.warn(err)
                if(err.response) {
                    setMsg(err.response.data.msg)
                }
            }
        }
        adminCheck()
    }, [currentUser, setCurrentUser, setIsInitialRender, setAdmin])


    const handleFileInputChange = (e) => {
        const file = e.target.files[0]
        previewFile(file);
        setFormImg(file)
    }


    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file); //Converts the file to a url
        reader.onloadend = () => { //Once the reader is done loading
            setPreviewSource(reader.result);

        }
    }


    const handleCreate = async (e) => {
        e.preventDefault()
        if (!previewSource) return;
        try {
            const formData = new FormData()
            formData.append('photo', formImg)
            formData.append('content', content)
            formData.append('title', title)
            formData.append('url', url)
            formData.append('ranks', ranks)
            formData.append('reward', reward)
            formData.append('category', category)
            formData.append('adminId', currentUser.id)
            const options = {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/tournaments`, formData, options)
            if (inputRef) inputRef.current.value = ''
            setContent("")
            setUrl("")
            setCategory("")
            navigate('/tournaments')
        } catch (err) {
            console.warn(err)
            if(err.response) {
                setMsg(err.response.data.msg)
            }
        }
    }   

    const formDisplay = (
        <div className="newTournamentFormBox">
            {msg}
            <h1>New Tournament</h1>
            <div>
                <div style={{ width: '20rem' }}>
                    {previewSource? 
                    <img
                        src={previewSource} alt="User uploaded image"
                        style={{ height: 'auto', width: '100%' }}
                    /> : ''                 
                }
                    <div>
                        <form className="newTournamentForm">
                            <label htmlFor="file" >{previewSource ? 'Image uploaded successfully! Wrong image? Click to upload a new one.' : 'Drag and drop or browse to upload an image'} </label>
                            <input 
                                type="file"
                                id="photo"
                                ref={inputRef}
                                onChange={handleFileInputChange}
                                value={fileInputState}
                                style={{
                                    fontSize: "14pt",         
                                    color: previewSource ? 'transparent' : '',                                    
                                    textAlign: 'center',
                                    accept: ".jpg, .jpeg, .png"
                                }}
                                required
                            />


                            <label htmlFor="url">Stream: </label>
                            <textarea
                                type="text"
                                name="url"
                                id="url"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                style={{ height: "27px", fontSize: "14pt", width: "100%" }}
                                required
                            >Stream:</textarea>
                            <label htmlFor="title">Title: </label>
                            <input
                                type="text"
                                name="title"
                                id="title"
                                value={title}
                                placeholder='title'
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                            <label htmlFor="content">Caption with ranks: </label>
                            <textarea
                                type="text"
                                name="content"
                                id="content"
                                placeholder="Do not forget to add in your ranks here!!"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                style={{ height: "7rem", fontSize: "14pt", width: "100%" }}
                            >Caption:</textarea>

                            <label htmlFor="categoryOpt" className='categoryLabel'>Category: </label>
                            <datalist id='categoryOpt' className='categoryOptions'>
                                <option value='Doubles'></option>
                                <option value='Duel'></option>
                                <option value='Standard'></option>
                                {/* <option value='Platinum'></option>
                                <option value='Diamond'></option>
                                <option value='Champion'></option>
                                <option value='Grand Champion'></option>
                                <option value='Supersonic Legend'></option> */}
                            </datalist>
                            <input
                                className='categoryInput'
                                type="list"
                                name="category"
                                id="category"
                                list='categoryOpt'
                                value={category}
                                placeholder='Select Gamemode'
                                onChange={(e) => setCategory(e.target.value)}
                                required
                            />
                            
                            <label htmlFor="ranks">Ranks: </label>
                            <input
                                type="text"
                                name="ranks"
                                id="ranks"
                                value={ranks}
                                placeholder='Which ranks?'
                                onChange={(e) => setRanks(e.target.value)}
                                required
                            />
                            <label htmlFor="reward">Reward Amount: </label>
                            <input
                                type="text"
                                name="reward"
                                id="reward"
                                value={reward}
                                placeholder='Enter Number'
                                onChange={(e) => setReward(e.target.value)}
                                required
                            />

                            <button type="submit" style={{ backgroundColor: '#FC6767', width: '10rem' }} onClick={handleCreate}>Submit</button>
                        </form>
                        <form>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )

    return (

        <div>
            {msg}
            {admin == true ? formDisplay : "You do not have access, sorry."}
            
        </div>
    )
}