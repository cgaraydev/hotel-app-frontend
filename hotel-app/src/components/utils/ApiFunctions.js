import axios from "axios"

export const api = axios.create({
    baseURL: "http://localhost:8080",
})


/* 
  The addRoom function sends a POST request to the /rooms/add/new-room endpoint 
  with the photo, roomType, and roomPrice data. The photo is sent as a FormData object, 
  which is a built-in JavaScript object that allows you to send files in a POST request. 
  The roomType and roomPrice are sent as regular form data.
  The function then checks the response status code. If the status code is 201, it returns true, 
  indicating that the room was successfully added. Otherwise, it returns false.
*/
export async function addRoom(photo, roomType, roomPrice) {
    const formData = new FormData()
    formData.append("photo", photo)
    formData.append("roomType", roomType)
    formData.append("roomPrice", roomPrice)

    const response = await api.post("/rooms/add/new-room", formData)
    if (response.status === 201) {
        return true
    } else {
        return false
    }

}

/* 
  The getRoomTypes function sends a GET request to the /rooms/room-types endpoint. 
  If the request is successful, it returns the room types data. Otherwise, it throws an error.
*/
export async function getRoomTypes() {
    try {
        const response = await api.get("/rooms/room-types")
        return response.data
    } catch (error) {
        console.error(error)
        throw new Error("Failed to fetch room types")
    }
}
