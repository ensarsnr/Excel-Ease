const setCellStyles = (row) => {
    row.eachCell((cell) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFFFEB3B' },  // Sarı renk
      };
        cell.font = { bold: true, size: 12, name: "Arial" };
        cell.alignment = { vertical: 'middle', 'horizontal': 'center' };        
    });
  };
  
  module.exports = { setCellStyles };
  