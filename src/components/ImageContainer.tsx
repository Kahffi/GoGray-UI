
type Props = {
    image: File
}

export default function ImageContainer({ image }: Props) {
    return (
        <div className="w-[150px] aspect-square flex items-center justify-center border rounded-md bg-gray-400">
            <img src={URL.createObjectURL(image)} alt="the Image" />
        </div>
    )
}
