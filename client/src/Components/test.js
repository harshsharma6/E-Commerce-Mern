import { useState, useEffect } from "react"
export function Test() {
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    function handleFormData1(e) {
        setPrice(e.target.value)
    }
    function handleFormData2(e) {
        setDescription(e.target.value)
    }
    const product = async () => {
        const data = await fetch('/get/63dccdb1837eb2bf0642e240')
        const result = data.json()
        setPrice(result.price)
        setDescription(result.description)
    }

    useEffect(() => {
        product()
    }, [])

    async function update() {
        const data = await fetch('/update/63dccdb1837eb2bf0642e240', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ price, description })
        })
        const result = await data.json()
        console.log(result)
    }

    return (
        <>
            <div className="home">
                Price - <input type="number" value={price} onChange={handleFormData1} name="price"></input>
                Description - <textarea value={description} onChange={handleFormData2} name="description" />
                <button onClick={update}>Update</button>
            </div>
        </>
    )
}