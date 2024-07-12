import React, { useEffect, useState, useCallback } from 'react';
import { useForm, FieldErrors } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';

interface Step1FormProps {
  initialValues: any;
  onNext: (data: any) => void;
}

interface Step1FormData {
  fullName: string;
  icNumber: string;
  contactNumber: string;
  email: string;
  receiptAmount: number;
  receiptPreviews?: string[];
}

const Step1Form: React.FC<Step1FormProps> = ({ initialValues, onNext }) => {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<Step1FormData>();
  const [receiptPreviews, setReceiptPreviews] = useState<string[]>([]);
  const [uploadProgress, setUploadProgress] = useState<number[]>([]);

  useEffect(() => {
    if (initialValues) {
      setValue('fullName', initialValues.fullName);
      setValue('icNumber', initialValues.icNumber);
      setValue('contactNumber', initialValues.contactNumber);
      setValue('email', initialValues.email);
      setValue('receiptAmount', initialValues.receiptAmount);
      setReceiptPreviews(initialValues.receiptPreviews || []);
    }
  }, [initialValues, setValue]);

  const handleFormSubmit = (data: Step1FormData) => {
    data.receiptPreviews = receiptPreviews;
    onNext(data);
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const previews = acceptedFiles.map(file => URL.createObjectURL(file));
    setReceiptPreviews(prevPreviews => [...prevPreviews, ...previews]);
    const progressArray = new Array(acceptedFiles.length).fill(0);
    setUploadProgress(prevProgress => [...prevProgress, ...progressArray]);

    acceptedFiles.forEach((file, index) => {
      const progressInterval = setInterval(() => {
        setUploadProgress(prevProgress => {
          const newProgress = [...prevProgress];
          newProgress[receiptPreviews.length + index] += 10;
          if (newProgress[receiptPreviews.length + index] >= 100) {
            clearInterval(progressInterval);
          }
          return newProgress;
        });
      }, 100);
    });
  }, [receiptPreviews]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
    },
    multiple: true
  });

  const handleRemoveImage = (index: number) => {
    setReceiptPreviews(prevPreviews => prevPreviews.filter((_, i) => i !== index));
    setUploadProgress(prevProgress => prevProgress.filter((_, i) => i !== index));
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Full Name as per NRIC</label>
        <input
          {...register('fullName', { required: 'Full Name is required' })}
          type="text"
          className="mt-1 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md p-2"
        />
        {errors.fullName && <span className="text-red-500 text-sm">{errors.fullName.message}</span>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">IC Number</label>
        <input
          {...register('icNumber', { required: 'IC Number is required' })}
          type="text"
          className="mt-1 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md p-2"
        />
        {errors.icNumber && <span className="text-red-500 text-sm">{errors.icNumber.message}</span>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Contact Number</label>
        <input
          {...register('contactNumber', { required: 'Contact Number is required' })}
          type="text"
          className="mt-1 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md p-2"
        />
        {errors.contactNumber && <span className="text-red-500 text-sm">{errors.contactNumber.message}</span>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Email Address</label>
        <input
          {...register('email', { required: 'Email Address is required' })}
          type="email"
          className="mt-1 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md p-2"
        />
        {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Total Receipt Amount (RM)</label>
        <input
          {...register('receiptAmount', { required: 'Receipt Amount is required' })}
          type="number"
          className="mt-1 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md p-2"
        />
        {errors.receiptAmount && <span className="text-red-500 text-sm">{errors.receiptAmount.message}</span>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Upload Photo of Sales Receipt</label>
        {receiptPreviews.length === 0 ? (
          <div {...getRootProps()} className="border-2 border-dashed border-gray-300 p-4 rounded-md mt-1 cursor-pointer text-center">
            <input {...getInputProps()} />
            <p>Drag 'n' drop some files here, or click to select files</p>
            <em className="text-sm">(Only *.jpeg and *.png images will be accepted)</em>
          </div>
        ) : (
          <div className="flex space-x-2 overflow-x-auto mt-2">
            {receiptPreviews.map((preview, index) => (
              <div key={index} className="relative flex-shrink-0 h-24 rounded-md shadow-md my-1">
                <img src={preview} alt="Receipt Preview" className="h-full rounded-md" />
                <button
                  type="button"
                  className="absolute -top-1 -right-1 w-6 bg-red-400 hover:bg-red-500 text-white rounded-full aspect-square"
                  onClick={() => handleRemoveImage(index)}
                >
                  &times;
                </button>
                {uploadProgress[index] < 100 && (
                  <div className="absolute bottom-0 left-0 right-0 bg-blue-500 h-1" style={{ width: `${uploadProgress[index]}%` }} />
                )}
              </div>
            ))}
            <div {...getRootProps()} className="h-24 w-24 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center cursor-pointer">
              <input {...getInputProps()} />
              <span className="text-2xl text-gray-500 px-10">+</span>
            </div>
          </div>
        )}
      </div>
      <button
        type="submit"
        className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
      >
        Next
      </button>
    </form>
  );
};

export default Step1Form;
