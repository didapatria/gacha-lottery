import React from 'react';
import MultiStepForm from './form/MultiStepForm';

const Page: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <h2 className="text-4xl font-bold text-center text-gray-900 mb-10">AEON 40<sup>th</sup> Anniversary Contest</h2>
      <MultiStepForm />
    </div>
  );
};

export default Page;
