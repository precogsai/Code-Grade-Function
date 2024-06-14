/**
 * Determine the grade based on the scores provided in the array.
 *
 * @param {number[]} arr - A list of float values representing scores.
 * @returns {string} The grade based on the scores:
 *                   'A' - All scores are low (0.1-3.9) and the average score is <= 2.0.
 *                   'B' - All scores are low (0.1-3.9) or medium (4.0-6.9) with medium scores <= 20% and the average score is <= 3.9.
 *                   'C' - Average score is <= 5.5, no critical scores (9.0-10.0), and high scores <= 20%.
 *                   'D' - Critical scores present and <= 20% of the total scores.
 *                   'E' - More than 20% of the scores are critical.
 *                   'No Grade' - If the conditions for the above grades are not met.
 *
 * If the input is not an array, returns 'Please provide an array of scores'.
 */
function find_grade_type(arr) {
  if (!Array.isArray(arr)) {
    return "Please provide an array of scores";
  }
  if (arr.length === 0) {
    return "A";
  }

  // Define the score range thresholds
  const lowThresholdMin = 0.1;
  const lowThresholdMax = 3.9;
  const mediumThresholdMin = 4.0;
  const mediumThresholdMax = 6.9;
  const highThresholdMin = 7.0;
  const highThresholdMax = 8.9;
  const criticalThresholdMin = 9.0;
  const criticalThresholdMax = 10.0;

  // Calculate the counts
  let lowCount = 0;
  let mediumCount = 0;
  let highCount = 0;
  let criticalCount = 0;

  for (let score of arr) {
    if (lowThresholdMin <= score && score <= lowThresholdMax) {
      lowCount++;
    } else if (mediumThresholdMin <= score && score <= mediumThresholdMax) {
      mediumCount++;
    } else if (highThresholdMin <= score && score <= highThresholdMax) {
      highCount++;
    } else if (criticalThresholdMin <= score && score <= criticalThresholdMax) {
      criticalCount++;
    }
  }

  const totalCount = arr.length;
  const average = arr.reduce((sum, score) => sum + score, 0) / totalCount;

  if (average <= 2 && lowCount === totalCount) {
    return "A";
  } else if (
    average <= 3.9 &&
    lowCount + mediumCount === totalCount &&
    mediumCount / totalCount <= 0.2
  ) {
    return "B";
  } else if (
    average <= 5.5 &&
    criticalCount === 0 &&
    highCount / totalCount <= 0.2
  ) {
    return "C";
  } else if (criticalCount / totalCount <= 0.2) {
    return "D";
  } else if (criticalCount / totalCount > 0.2) {
    return "E";
  } else {
    return "No Grade";
  }
}

// Example usage change value to check
const severities1 = [3.0, 3.5, 4.0, 4.5, 3.9];
const severities2 = [2.0, 3.0, 4.5, 4.0];
const severities3 = [4.0, 5.0, 6.0, 7.0, 8];
const severities4 = [9.0, 8.5, 4.0, 2, 3, 5];
const severities5 = [9.5, 4.0, 4.0, 4.0, 8, 9];

// console.log(find_grade_type(severities1));
// console.log(find_grade_type(severities2));
// console.log(find_grade_type(severities3));
// console.log(find_grade_type(severities4));
console.log(find_grade_type(severities5));
