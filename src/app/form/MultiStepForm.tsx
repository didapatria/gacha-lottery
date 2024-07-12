"use client"

import React, { useState } from 'react';
import Step1Form from './Step1Form';
import Step2Form from './Step2Form';

interface FormData {
  fullName?: string;
  icNumber?: string;
  contactNumber?: string;
  email?: string;
  receiptAmount?: number;
  receiptPreviews?: string[];
  shareSocial?: boolean;
  followA?: boolean;
  followB?: boolean;
  testDrive?: boolean;
  showGallery?: boolean;
}

const MultiStepForm: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({});

  const handleNext = (data: FormData) => {
    setFormData(prevData => ({ ...prevData, ...data }));
    setStep(step + 1);
  };

  const handleBack = (data: FormData) => {
    setFormData(prevData => ({ ...prevData, ...data }));
    setStep(step - 1);
  };

  const handleSubmit = (data: FormData) => {
    setFormData(prevData => ({ ...prevData, ...data }));
    console.log('Form submitted:', { ...formData, ...data });
  };

  return (
    <div className="w-full max-w-4xl bg-white shadow-md rounded-lg overflow-hidden md:flex block">
      <div className="w-full md:w-1/4 bg-gray-100 p-4">
        <div className="space-y-0 md:space-y-4 space-x-4 md:space-x-0 flex md:flex-col flex-row md:items-start">
          <div className={`flex flex-row items-center ${step === 1 ? 'font-bold' : ''}`}>
            <span className={`w-8 aspect-square flex items-center justify-center rounded-full ${step === 1 ? 'bg-blue-500' : 'bg-gray-300'}  text-white mr-2`}>1</span>
            Step 1: Form Input
          </div>
          <div className={`flex flex-row items-center ${step === 2 ? 'font-bold' : ''}`}>
            <span className={`w-8 aspect-square flex items-center justify-center rounded-full ${step === 2 ? 'bg-blue-500' : 'bg-gray-300'}  text-white mr-2`}>2</span>
            Step 2: Bonus Entry
          </div>
        </div>
      </div>
      <div className="md:w-3/4 w-full p-6">
        <div className="space-y-6">
          {step === 1 && <Step1Form initialValues={formData} onNext={handleNext} />}
          {step === 2 && <Step2Form initialValues={formData} onBack={handleBack} onSubmit={handleSubmit} />}
        </div>
      </div>
    </div>
  );
};

export default MultiStepForm;
