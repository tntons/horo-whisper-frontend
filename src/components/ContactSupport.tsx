import React from "react";

interface ContactSupportProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactSupport: React.FC<ContactSupportProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-[316px] h-[309px] rounded-lg shadow-lg p-6">
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-[#171717]">Contact Support</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        {/* Modal Content */}
        <div className="text-[12px] text-[#171717] mb-4">
          <p>Please contact us via email at</p>
          <p className="font-bold">support@horowhisper.com</p>
          <p className="mt-4">Or leave us a message below</p>
        </div>

        {/* Message Input */}
        <textarea
          placeholder="Your message"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-[12px]"
          rows={4}
        ></textarea>

        {/* Submit Button */}
        <button
          onClick={onClose} // Replace with your submit logic
          className="mt-4 w-[134px] mx-auto block bg-blue01 text-white text-lg font-medium py-2 rounded-lg"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default ContactSupport;
