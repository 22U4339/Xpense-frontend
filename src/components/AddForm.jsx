import React, { useState } from 'react';
import { ListboxOptions,ListboxOption,ListboxButton, Listbox, Transition } from '@headlessui/react';
import { Check, ChevronDown, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import client from '../api/axiosClient';

function AppForm() {
  const transactionTypes = [
    { id: 1, name: 'CREDIT' },
    { id: 2, name: 'DEBIT' },
  ];

  const [selectedType, setSelectedType] = useState(transactionTypes[0]);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async(e) => {
    e.preventDefault();

    // Basic validation
    if (!amount || isNaN(parseFloat(amount))) {
      console.error('Please enter a valid amount.');
      return;
    }
    if (!description.trim()) {
      console.error('Please enter a description.');
      return;
    }

    const formData = {
      type: selectedType.name,
      amount: parseFloat(amount),
      description: description.trim(),
    };

    const token = localStorage.getItem("token");
    await client.post("/transaction",formData)
    console.log('Form Submitted:', formData);

    //Pop-up Alert
    //triggerAlert(["Success","This is a success story"]);
  };



  return (
      <div className="bg-white p-8 w-full max-w-md mx-auto">
        
        <div className="flex items-center mb-6">
          <Link to="/home"
            className="p-2 mr-3 rounded-full bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-200"
            aria-label="Go back"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </Link>
          <h2 className="text-xl font-extrabold text-gray-800">New Transaction</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Transaction Type Select */}
          <div>
            <label htmlFor="transactionType" className="block text-sm font-medium text-slate-800 mb-1">
              Transaction Type
            </label>
            <Listbox value={selectedType} onChange={setSelectedType}>
              {({ open }) => (
                <div className="relative mt-1">
                  <ListboxButton className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-sm border border-slate-300 focus:outline-none focus:ring-2 focus:ring-black-500 focus:border-black-500 sm:text-sm transition-all duration-200">
                    <span className="block truncate">{selectedType.name}</span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <ChevronDown
                        className={`h-5 w-5 text-gray-400 transform transition-transform duration-200 ${open ? 'rotate-180' : 'rotate-0'}`}
                        aria-hidden="true"
                      />
                    </span>
                  </ListboxButton>
                  <Transition
                    show={open}
                    as={React.Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {transactionTypes.map((type) => (
                        <ListboxOption
                          key={type.id}
                          className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                              active ? 'bg-blue-100 text-blue-900' : 'text-gray-900'
                            }`
                          }
                          value={type}
                        >
                          {({ selected, active }) => (
                            <>
                              <span
                                className={`block truncate ${
                                  selected ? 'font-semibold' : 'font-normal'
                                }`}
                              >
                                {type.name}
                              </span>
                              {selected ? (
                                <span
                                  className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                    active ? 'text-blue-600' : 'text-blue-500'
                                  }`}
                                >
                                  <Check className="h-5 w-5" aria-hidden="true" />
                                </span>
                              ) : null}
                            </>
                          )}
                        </ListboxOption>
                      ))}
                    </ListboxOptions>
                  </Transition>
                </div>
              )}
            </Listbox>
          </div>

          {/* Amount Input */}
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-slate-800 mb-1">
              Amount
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition-all duration-200"
              required
            />
          </div>

          {/* Description Textarea */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-slate-800 mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter a brief description of the transaction..."
              maxLength={2048}
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition-all duration-200"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-1 px-2 border border-transparent rounded-md shadow-sm text-lg font-semibold text-white bg-slate-950 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-all duration-200 transform hover:scale-105"
            >
              Submit
            </button>
          </div>
        </form>

      </div>
  );
}

export default AppForm;
