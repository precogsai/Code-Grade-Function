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

# Example usage change value to check

severities1 = [3.0, 3.5, 4.0, 4.5, 3.9];
severities2 = [2.0, 3.0, 4.5, 4.0];
severities3 = [4.0, 5.0, 6.0, 7.0];
severities4 = [9.0, 8.5, 4.0, 2, 3, 5];
severities5 = [9.5, 4.0, 4.0, 4.0];
print(find_grade_type(severities1))  
