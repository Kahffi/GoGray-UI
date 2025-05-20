import React, { useState } from "react";
import ImageContainer from "./components/ImageContainer";


export default function App() {
  const [images, setImages] = useState<File[]>([])

  function stageImage(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files

    if (!files || files.length < 1) {
      return
    }

    setImages((prevFiles) => [...prevFiles, ...files])
  }

  function imtobase64(images: File[]) {
    const promises = images.map((image) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(image);

        reader.onload = () => {
          const result = reader.result as string
          resolve(result.split(',')[1])
        }

        reader.onerror = (error) => reject(error)
      })
    })

    return Promise.all(promises)


  }


  async function uploadImages() {
    if (images.length < 1) return

    const base64Images = await imtobase64(images)

    console.log({
      images: base64Images
    })
  }

  return (
    <div className="min-h-dvh">
      {
        images.length > 0 &&
        <div className="flex flex-wrap justify-center gap-3">
          {
            images.map((image) => {
              return <ImageContainer image={image} key={URL.createObjectURL(image)} />
            })
          }
        </div>
      }


      <div className="w-full flex flex-col items-center gap-5 mt-4">
        <div className="bg-amber-200 w-fit p-3 rounded-md">
          <label htmlFor="select-file" className="cursor-pointer">Add Image(s)</label>
          <input type="file" multiple onChange={stageImage} id="select-file" className="hidden" />
        </div>
        <button type="button" onClick={uploadImages} className="bg-green-400 px-5 py-1 rounded-md cursor-pointer">
          Upload
        </button>
      </div>


    </div>
  )
}
