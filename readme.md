![Grade Types Banner](https://blog.gitguardian.com/content/images/2022/11/22W46-blog-Introducing-Infrastructure-as-Code-Security.png)

# Grade Function

## Overview

The `find_grade_type` function is designed to determine the grade based on an array of float values representing scores. The function evaluates the scores against predefined thresholds and returns a grade according to specified criteria.

## Function Details

### `find_grade_type(arr)`

#### Parameters:

- `arr` (list of float): A list of float values representing scores.

#### Returns:

- `str`: The grade based on the scores. Possible grades are:
  - `'A'` - All scores are low (0.1-3.9) and the average score is <= 2.0.
  - `'B'` - All scores are low (0.1-3.9) or medium (4.0-6.9) with medium scores <= 20% and the average score is <= 3.9.
  - `'C'` - Average score is <= 5.5, no critical scores (9.0-10.0), and high scores <= 20%.
  - `'D'` - Critical scores present and <= 20% of the total scores.
  - `'E'` - More than 20% of the scores are critical.
  - `'No Grade'` - If the conditions for the above grades are not met.
  - `'Please provide an array of scores'` - If the input is not a list.

## Usage

### Example Usage Javascript :

```javascript
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
function findGradeType(arr) {
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
  } else if (criticalCount > 0 && criticalCount / totalCount <= 0.2) {
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
const severities3 = [4.0, 5.0, 6.0, 7.0];
const severities4 = [9.0, 8.5, 4.0, 2, 3, 5];
const severities5 = [9.5, 4.0, 4.0, 4.0, 8, 9];
// console.log(findGradeType(severities1));
// console.log(findGradeType(severities2));
// console.log(findGradeType(severities3));
// console.log(findGradeType(severities4));
console.log(findGradeType(severities5));
```

#### Run code using following command :

```bash
node find_grade_type.js
```

### Example Usage python :

```python
def find_grade_type(arr):
    """
    Determine the grade based on the scores provided in the array.

    Parameters:
    arr (list of float): A list of float values representing scores.

    Returns:
    str: The grade based on the scores:
         'A' - All scores are low (0.1-3.9) and the average score is <= 2.0.
         'B' - All scores are low (0.1-3.9) or medium (4.0-6.9) with medium scores <= 20% and the average score is <= 3.9.
         'C' - Average score is <= 5.5, no critical scores (9.0-10.0), and high scores <= 20%.
         'D' - Critical scores present and <= 20% of the total scores.
         'E' - More than 20% of the scores are critical.
         'No Grade' - If the conditions for the above grades are not met.

    If the input is not a list, returns 'Please provide an array of scores'.
    """
    if not isinstance(arr, list):
        return 'Please provide an array of scores'
    if len(arr) == 0:
        return 'A'

    # Define the score range thresholds
    low_threshold_min = 0.1
    low_threshold_max = 3.9
    medium_threshold_min = 4.0
    medium_threshold_max = 6.9
    high_threshold_min = 7.0
    high_threshold_max = 8.9
    critical_threshold_min = 9.0
    critical_threshold_max = 10.0

    # Calculate the counts
    low_count = sum(1 for score in arr if low_threshold_min <= score <= low_threshold_max)
    medium_count = sum(1 for score in arr if medium_threshold_min <= score <= medium_threshold_max)
    high_count = sum(1 for score in arr if high_threshold_min <= score <= high_threshold_max)
    critical_count = sum(1 for score in arr if critical_threshold_min <= score <= critical_threshold_max)

    total_count = len(arr)
    average = sum(arr) / total_count

    if average <= 2 and low_count == total_count:
        return "A"
    elif average <= 3.9 and low_count + medium_count == total_count and medium_count / total_count <= 0.20:
        return 'B'
    elif average <= 5.5 and critical_count == 0 and high_count / total_count <= 0.20:
        return 'C'
    elif critical_count > 0 and critical_count / total_count <= 0.20:
        return "D"
    elif critical_count / total_count > 0.20:
        return "E"
    else:
        return "No Grade"

# Example usage for all grades
severity_score_a = [2, 2, 2]
severity_score_b = [3.5, 3.0, 4.0, 3.8]
severity_score_c = [3.9, 4.0, 4.5, 5.0]
severity_score_d = [3.0, 4.5, 5.5, 9.0]
severity_score_e = [3.0, 4.0, 5.0, 9.0, 9.5]
invalid_input = "not an array"
empty_input = []

print(find_grade_type(severity_score_a))  # Expected: A
print(find_grade_type(severity_score_b))  # Expected: B
print(find_grade_type(severity_score_c))  # Expected: C
print(find_grade_type(severity_score_d))  # Expected: D
print(find_grade_type(severity_score_e))  # Expected: E
print(find_grade_type(invalid_input))     # Expected: Please provide an array of scores
print(find_grade_type(empty_input))       # Expected: A
```

#### Run code using following command :

```bash
python3 find_grade_type.py
```

## Explanation of Grades :-

### Grade A:

- All scores are between 0.1 and 3.9.
- The average score is less than or equal to 2.0.

### Grade B:

- All scores are either between 0.1 and 3.9 or between 4.0 and 6.9.
- Medium scores (4.0-6.9) are less than or equal to 20% of the total scores.
- The average score is less than or equal to 3.9.

### Grade C:

- The average score is less than or equal to 5.5.
- There are no critical scores (9.0-10.0).
- High scores (7.0-8.9) are less than or equal to 20% of the total scores.

### Grade D:

- There are critical scores present.
- Critical scores are less than or equal to 20% of the total scores.

### Grade E:

- Critical scores are more than 20% of the total scores.

### No Grade:

- If the conditions for the above grades are not met.

### Invalid Input:

- If the input is not a list, the function returns 'Please provide an array of scores'.
- If the list is empty, the function returns 'A'.

# Author

- **Author:** [Abhishek Kumar](https://github.com/A1bhishekk)

## License

This code is part of [Precogs AI](https://www.precogs.ai/) and is licensed under the [MIT License](license.txt).

## Contact

For any questions or suggestions, please feel free to contact the author:

- **Email:** [abhishek@precogs.org]
