import React, { useState } from 'react'
import { addRoom } from "../utils/ApiFunctions"

const AddRoom = () => {
    const [newRoom, setNewRoom] = useState({
        photo: null,
        roomType: "",
        roomPrice: ""
    })

    const [imagePreview, setImagePreview] = useState("")
    const [succesMessage, setSuccesMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    const handleRoomInputChange = (e) => {
        const name = e.target.name
        let value = e.target.value
        if (name === "roomPrice") {
            if (!isNaN(value)) {
                value = parseInt(value)
            } else {
                value = ""
            }
        }
        setNewRoom({ ...newRoom, [name]: value })
    }

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0]
        setNewRoom({ ...newRoom, photo: selectedImage })
        setImagePreview(URL.createObjectURL(selectedImage))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const success = await addRoom(newRoom.photo, newRoom.roomType, newRoom.roomPrice)
            if (success !== undefined) {
                setSuccesMessage("Room added successfully")
                setNewRoom({ photo: null, roomType: "", roomPrice: "" })
                setImagePreview("")
                setErrorMessage("")
            } else {
                setErrorMessage("Failed to add room")
            }
        } catch (error) {
            setErrorMessage(error.message)
        }
    }

    return (
        <div>AddRoom</div>
    )
}

export default AddRoom