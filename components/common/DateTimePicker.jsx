import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CustomInput from "./CustomInput";

const DateTimePicker = ({ selectedDate, onDateChange }) => {
  return (
    <div className="w-full">
      <DatePicker
        selected={selectedDate}
        onChange={onDateChange}
        customInput={<CustomInput />}
        minDate={new Date()}
        placeholderText="Select Date and Time"
        showTimeSelect
        timeIntervals={60}
        dateFormat="MM/dd/yyyy hh:mm a"
      />
    </div>
  );
};

export default DateTimePicker;
