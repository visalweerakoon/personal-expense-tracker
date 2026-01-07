import React, { useState } from 'react'
import EmojiPickerPopup from '../EmojiPickerPopup';
import Input from '../Input/Input';

// Form component to add a new expense
const AddExpensiveForm = ({ onAddExpense }) => {
    const [income, setIncomeData] = useState({
        category: "",
        amount: "",
        date: "",
        icon: "",
    });

    // Update form state
    const handleChange = (key, value) => setIncomeData({ ...income, [key]: value });

    return (
        <div>
            {/* Emoji picker for category icon */}
            <EmojiPickerPopup
                icon={income.icon}
                onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
            />

            {/* Category input */}
            <Input
                value={income.category}
                onChange={({ target }) => handleChange("category", target.value)}
                label="Category"
                placeholder="Bill payments, Rent, foods ,etc."
                type="text"
            />

            {/* Amount input */}
            <Input
                value={income.amount}
                onChange={({ target }) => handleChange("amount", target.value)}
                label="Amount"
                placeholder=""
                type="number"
            />

            {/* Date input */}
            <Input
                value={income.date}
                onChange={({ target }) => handleChange("date", target.value)}
                label="Date"
                placeholder=""
                type="date"
            />

            {/* Submit button */}
            <div className='flex justify-end mt-6'>
                <button
                    type="button"
                    className='add-btn add-btn-fill'
                    onClick={() => onAddExpense(income)}
                >
                    Add Expense
                </button>
            </div>
        </div>
    );
};

export default AddExpensiveForm;
