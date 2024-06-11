import { useState } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';
import './App.css'
import { create, read,isValidDiscription,isValidPartNumber,isValidPrice } from 'finals-prolang-exam-lab'

//heelo
function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
    // Set up state to manage form inputs
  const [partNumber, setPartNumber] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [parts, setParts] = useState([]);
  const [error, setError] = useState('');
  // const [merror, msetError] = useState(false);
  

    // Function to handle form submission
  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    // Call the create function with form input values
    const newPart = { partNumber, price, description };
   // Validation checks
    if (!isValidPartNumber(partNumber)) {
      setError('Invalid part number. It should not contain letters and should be at most 10 characters long.');
      return;
    }
    if (!isValidPrice(price)) {
      setError('Invalid price. Price cannot contain letters.');
      return;
    }
    if (!isValidDiscription(description)) {
      setError('Invalid description. Description length should be at most 26 characters.');
      return;
    }
    
  
        create(newPart);
      toggleModal()
       setParts((prevParts) => [...prevParts, newPart]);
    // Optionally, you can clear the form inputs after submission
    setPartNumber('');
    setPrice('');
    setDescription('');
    setError('')
    
 
   
   
  });

  // Use useEffect to call the read function when the component mounts
  useEffect(() => {
    console.log(read());
  }, [handleSubmit]);

  

   const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  return (
    <>
      <div className='bg-[#faf0ef] min-h-screen w-dvw'>
        <h1 className='text-center p-11 text-[#64241b] text-7xl'>INVENTORY SYSTEM</h1>
        <div className='px-[15rem]'>
          
        
          


          <div className='flex flex-row-reverse py-3'>
            <button data-modal-target="crud-modal" onClick={toggleModal} data-modal-toggle="crud-modal" className="block text-[#230e0b] bg-[#e08b80] hover:bg-[#ad3425] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center " type="button">
  ADD ITEM
</button>
</div>
        {isModalOpen && (
            <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
              <div id="crud-modal" tabIndex="-1" className="relative p-4 w-full max-w-md max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                  <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Create New Product
                    </h3>
                    <button
                      onClick={toggleModal}
                      type="button"
                      className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                      data-modal-toggle="crud-modal"
                    >
                      <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                        />
                      </svg>
                      <span className="sr-only">Close modal</span>
                    </button>
                  </div>
                   {error && (
        <div className="modal">
          <div className="modal-content">
            <span className="close cursor-pointer bg-red-700  m-1" onClick={() => setError('')}>×</span>
            <p className='text-center text-red-700'>{error}</p>
          </div>
        </div>
      )}
                  <form className="p-4 md:p-5" onSubmit={handleSubmit}>
                    <div className="grid gap-4 mb-4 grid-cols-2">
                      <div className="col-span-2">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Part Number
                        </label>
                        <input
                          value={partNumber}
                          onChange={(e) => setPartNumber(e.target.value)}
                          type="text"
                          name="name"
                          id="name"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          placeholder="Type Part Number here"
                          required
                        />
                      </div>
                      <div className="col-span-2 sm:col-span-1">
                        <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Price
                        </label>
                        <input
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                          type="number"
                          name="price"
                          id="price"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          placeholder="$2999"
                          required
                        />
                      </div>
                      <div className="col-span-2">
                        <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Product Description
                        </label>
                        <textarea
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          id="description"
                          rows="4"
                          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Write product description here"
                        ></textarea>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      <svg
                        className="me-1 -ms-1 w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      Add new product
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}
         
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-[#ad3425] uppercase bg-[#e08b80] dark:text-[#ad3425]">
            <tr>
              <th scope="col" className="px-6 py-3">PART NUMBER</th>
              <th scope="col" className="px-6 py-3">PART DESCRIPTION</th>
              <th scope="col" className="px-6 py-3">PRICE</th>
              <th scope="col" className="px-6 py-3"><span className="sr-only">Edit</span></th>
            </tr>
          </thead>
          <tbody>
            {parts.map((part, index) => (
              <tr key={index} className="bg-white border-b  hover:bg-gray-50 ">
                <th scope="row" className="px-6 py-4 font-medium text-[#230e0b] whitespace-nowrap dark:text-white">
                  {part.partNumber}
                </th>
                <td className="px-6 py-4 text-[#230e0b] ">{part.description}</td>
                <td className="px-6 py-4 text-[#230e0b]">₱ {part.price}</td>
                <td className="px-6 py-4 text-[#230e0b] text-right">
                  <a href="#" className="font-medium text-[#230e0b]  hover:underline">Edit</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


          

        </div>
  </div>
      
    </>
  )
}

export default App
