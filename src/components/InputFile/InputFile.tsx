import React, { useRef } from 'react'
import { toast } from 'react-toastify'
import config from 'src/constants/configs'

interface InputFileProps {
  setFile: (file?: File) => void
}

export default function InputFile({ setFile }: InputFileProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileFromLocal = event.target.files?.[0]
    if (fileFromLocal && (fileFromLocal.size >= config.maxUploadSize || !fileFromLocal.type.includes('image'))) {
      toast.error('file size exceeds 1MB')
      return
    } else setFile(fileFromLocal)
    console.log(fileFromLocal)
  }
  return (
    <>
      <input
        onClick={(event) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ;(event.target as any).value = null
        }}
        onChange={onFileChange}
        ref={fileInputRef}
        type='file'
        className='hidden'
        accept='.jpg,.jpeg,.png'
      />
      <button
        onClick={() => fileInputRef.current?.click()}
        type='button'
        className='flex h-10 items-center justify-end rounded-sm border bg-white px-6 text-sm text-gray-600 shadow-sm'
      >
        Chọn ảnh
      </button>
    </>
  )
}
