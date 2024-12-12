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
  
  export default statusColor;
  