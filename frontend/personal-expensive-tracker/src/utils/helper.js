import moment from "moment";

// Validate if the given string is a proper email format
export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// Get initials (first letters) from a name string
export const getInitials = (name) => {
  if (!name) return "";

  // Split the name by spaces
  const words = name.split(" ");
  let initials = "";

  // Take the first character of the first two words
  for (let i = 0; i < Math.min(words.length, 2); i++) {
    initials += words[i][0];
  }

  return initials.toUpperCase();
};

// Add comma as thousands separator for better readability
export const addThousandsSeparator = (num) => {
  if (num === null || isNaN(num)) return "";

  const [integerPart, fractionalPart] = num.toString().split(".");

  // Add commas to integer part
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return fractionalPart
    ? `${formattedInteger}.${fractionalPart}`
    : formattedInteger;
};

// Prepare expense data for bar charts
export const prepareExpenseBarChartData = (data = []) => {
  return data.map((item) => ({
    category: item?.category, // Category name for X-axis
    amount: item?.amount,     // Expense amount for Y-axis
  }));
};

// Prepare income data for bar charts
export const prepareIncomeBarChartData = (transactions = []) => {
  if (!Array.isArray(transactions)) return [];

  return transactions.map(item => ({
    name: item.source,               // X-axis label (income source)
    amount: Number(item.amount) || 0 // Y-axis value (amount)
  }));
};

// Prepare expense data for line charts over time
export const prepareExpenseLineChartData = (data = []) => {
  // Sort data by date
  const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

  return sortedData.map((item) => ({
    month: moment(item?.date).format("Do MMM"), // Format date for X-axis
    amount: item?.amount,                       // Expense amount for Y-axis
    category: item?.category,                   // Category name (for reference)
  }));
};
