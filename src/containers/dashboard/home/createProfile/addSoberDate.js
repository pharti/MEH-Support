/* eslint-disable module-resolver/use-alias */
import Calendar from 'components/common/calendar';
import React from 'react';
export default (AddSoberDate = React.memo(function AddSoberDate(props) {
  const {setSoberDate, startDate} = props;
  return (
    <Calendar
      title={true}
      selectedDate={startDate}
      setSelectedDate={setSoberDate}
    />
  );
}));
