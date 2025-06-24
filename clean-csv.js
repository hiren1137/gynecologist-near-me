const fs = require('fs');
const path = require('path');

// Function to clean CSV data for Supabase import
function cleanCSV(inputFile, outputFile) {
  try {
    // Read the CSV file
    let csvContent = fs.readFileSync(inputFile, 'utf8');
    
    // Split into lines
    let lines = csvContent.split('\n');
    
    // Process each line
    let cleanedLines = lines.map((line, index) => {
      if (index === 0) {
        // Header line - keep as is
        return line;
      }
      
      // Clean the data line
      return line
        // Fix decimal ratings - convert to integers
        .replace(/,5\.0,/g, ',5,')
        .replace(/,4\.5,/g, ',5,')
        .replace(/,4\.0,/g, ',4,')
        .replace(/,3\.5,/g, ',4,')
        .replace(/,3\.0,/g, ',3,')
        .replace(/,2\.5,/g, ',3,')
        .replace(/,2\.0,/g, ',2,')
        .replace(/,1\.5,/g, ',2,')
        .replace(/,1\.0,/g, ',1,')
        // Handle ratings at the end of line
        .replace(/,5\.0$/g, ',5')
        .replace(/,4\.5$/g, ',5')
        .replace(/,4\.0$/g, ',4')
        .replace(/,3\.5$/g, ',4')
        .replace(/,3\.0$/g, ',3')
        .replace(/,2\.5$/g, ',3')
        .replace(/,2\.0$/g, ',2')
        .replace(/,1\.5$/g, ',2')
        .replace(/,1\.0$/g, ',1')
        // Handle ratings at the beginning
        .replace(/^5\.0,/g, '5,')
        .replace(/^4\.5,/g, '5,')
        .replace(/^4\.0,/g, '4,')
        .replace(/^3\.5,/g, '4,')
        .replace(/^3\.0,/g, '3,')
        .replace(/^2\.5,/g, '3,')
        .replace(/^2\.0,/g, '2,')
        .replace(/^1\.5,/g, '2,')
        .replace(/^1\.0,/g, '1,');
    });
    
    // Join back and write to output file
    const cleanedContent = cleanedLines.join('\n');
    fs.writeFileSync(outputFile, cleanedContent);
    
    console.log(`✅ CSV cleaned successfully!`);
    console.log(`📁 Input: ${inputFile}`);
    console.log(`📁 Output: ${outputFile}`);
    console.log(`📊 Processed ${lines.length - 1} data rows`);
    
  } catch (error) {
    console.error('❌ Error cleaning CSV:', error.message);
  }
}

// Usage
const inputFile = process.argv[2];
const outputFile = process.argv[3] || 'cleaned_gynecologists.csv';

if (!inputFile) {
  console.log('Usage: node clean-csv.js input.csv [output.csv]');
  console.log('Example: node clean-csv.js gynecologists.csv cleaned_gynecologists.csv');
  process.exit(1);
}

cleanCSV(inputFile, outputFile); 