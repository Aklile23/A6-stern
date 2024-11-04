import React, { useState } from 'react';
import { useSelectedDate } from '../components/selectedDate ';

const Calendar: React.FC = () => {
  const { setSelectedDate } = useSelectedDate();
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    const daysArray = Array(firstDayOfMonth).fill(null);

    for (let day = 1; day <= daysInMonth; day++) {
      daysArray.push(day);
    }

    return daysArray;
  };

  const handleDateClick = (day: number) => {
    const formattedDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    setSelectedDate(formattedDate); // Set selectedDate in context
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentDate(new Date(Number(event.target.value), currentDate.getMonth(), 1));
  };

  const yearsRange = Array.from({ length: 21 }, (_, i) => currentDate.getFullYear() - 10 + i);

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <button onClick={handlePrevMonth} className="px-2 py-1 text-primary text-sm">
          &#8592;
        </button>
        <div className="text-sm font-semibold flex items-center space-x-2 text-white">
          <span>{currentDate.toLocaleString('default', { month: 'long' })}</span>
          <div className="relative flex items-center">
            <select
              value={currentDate.getFullYear()}
              onChange={handleYearChange}
              className="appearance-none bg-transparent text-white text-sm font-semibold focus:outline-none cursor-pointer pr-6 no-scrollbar"
            >
              {yearsRange.map((year) => (
                <option key={year} value={year} className="bg-gray-800 text-white">
                  {year}
                </option>
              ))}
            </select>
            <span className="absolute right-1 top-1/2 transform -translate-y-1/2 text-primary pointer-events-none">
              &#8595;
            </span>
          </div>
        </div>
        <button onClick={handleNextMonth} className="px-2 py-1 text-primary text-sm">
          &#8594;
        </button>
      </div>

      <div className="w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <table className="w-full text-xs">
          <thead>
            <tr className="grid grid-cols-7 bg-primary text-white text-center">
              <th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: Math.ceil(generateCalendarDays().length / 7) }).map((_, rowIndex) => (
              <tr key={rowIndex} className="grid grid-cols-7">
                {generateCalendarDays()
                  .slice(rowIndex * 7, rowIndex * 7 + 7)
                  .map((day, index) => (
                    <td
                      key={index}
                      className={`h-12 cursor-pointer border border-stroke p-1 text-center transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 ${
                        day ? 'font-medium text-black dark:text-white' : 'bg-gray-100 dark:bg-gray-800'
                      }`}
                      onClick={() => day && handleDateClick(day)}
                    >
                      {day || ''}
                    </td>
                  ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Calendar;
