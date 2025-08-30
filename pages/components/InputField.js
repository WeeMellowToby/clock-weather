const InputField = ({ label, type, name, placeholder }) => (
    <div className='flex flex-col mr-5 ml-5'>
        <label htmlFor={name} className='text-md font-medium'>{label}</label>
        <input
            type={type}
            name={name}
            placeholder={placeholder}
            className='mt-1 p-2 border-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-600px '
            id={name}
        />
    </div>
);
export default InputField;