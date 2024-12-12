const statusColor = (status) => {
    const colorMapping = {
      New: 'gray',
      Rejected: '#bf0244',
      Ongoing: '#02a34d',
      Selected: '#5a02ad',
      Scheduled: '#ba8902',
    };
    return colorMapping[status] || 'gray'; 
  };

  const attendanceColor = (status) => {
    const colorMaps = {
      Present: 'green',
      Absent: '#bf0244',
      'Medical Leave': '#02a34d',
      'Work from Home': '#5a02ad',
    };
    return colorMaps[status] || 'gray'; 
  };
  
export default statusColor;
export {attendanceColor}
  