import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

interface Step2FormProps {
  initialValues: any;
  onBack: (data: any) => void;
  onSubmit: (data: any) => void;
}

interface Step2FormData {
  shareSocial: boolean;
  followA: boolean;
  followB: boolean;
  testDrive: boolean;
  showGallery: boolean;
}

const Step2Form: React.FC<Step2FormProps> = ({ initialValues, onBack, onSubmit }) => {
  const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm<Step2FormData>();

  useEffect(() => {
    if (initialValues) {
      setValue('shareSocial', initialValues.shareSocial || false);
      setValue('followA', initialValues.followA || false);
      setValue('followB', initialValues.followB || false);
      setValue('testDrive', initialValues.testDrive || false);
      setValue('showGallery', initialValues.showGallery || false);
    }
  }, [initialValues, setValue]);

  const handleFormSubmit = (data: Step2FormData) => {
    onSubmit(data);
  };

  const handleBackClick = () => {
    onBack(getValues());
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="flex items-center">
        <input
          {...register('shareSocial')}
          type="checkbox"
          className="mr-2 leading-tight"
        />
        <label className="text-sm font-medium text-gray-700">
          Share the contest via Social Media
        </label>
        {errors.shareSocial && <span className="text-red-500 text-sm">{errors.shareSocial.message}</span>}
      </div>
      <div className="flex items-center">
        <input
          {...register('followA')}
          type="checkbox"
          className="mr-2 leading-tight"
        />
        <label className="text-sm font-medium text-gray-700">
          Like and Follow "A"
        </label>
        {errors.followA && <span className="text-red-500 text-sm">{errors.followA.message}</span>}
      </div>
      <div className="flex items-center">
        <input
          {...register('followB')}
          type="checkbox"
          className="mr-2 leading-tight"
        />
        <label className="text-sm font-medium text-gray-700">
          Like and Follow "B"
        </label>
        {errors.followB && <span className="text-red-500 text-sm">{errors.followB.message}</span>}
      </div>
      <div className="flex items-center">
        <input
          {...register('testDrive')}
          type="checkbox"
          className="mr-2 leading-tight"
        />
        <label className="text-sm font-medium text-gray-700">
          Book a Test Drive
        </label>
        {errors.testDrive && <span className="text-red-500 text-sm">{errors.testDrive.message}</span>}
      </div>
      <div className="flex items-center">
        <input
          {...register('showGallery')}
          type="checkbox"
          className="mr-2 leading-tight"
        />
        <label className="text-sm font-medium text-gray-700">
          Visit Show Gallery
        </label>
        {errors.showGallery && <span className="text-red-500 text-sm">{errors.showGallery.message}</span>}
      </div>
      <div className="flex justify-between">
        <button
          type="button"
          onClick={handleBackClick}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300"
        >
          Back
        </button>
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default Step2Form;
