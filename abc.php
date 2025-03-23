<?php

// Database connection details (replace with your actual credentials)
$servername = "localhost";
$username = "your_username";
$password = "your_password";
$dbname = "attendance_db";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Handle attendance marking
if (isset($_POST['mark_attendance'])) {
    $student_id = $_POST['student_id'];
    $date = date("Y-m-d"); // Current date

    // Check if attendance already marked for the day
    $check_sql = "SELECT * FROM attendance WHERE student_id = ? AND date = ?";
    $check_stmt = $conn->prepare($check_sql);
    $check_stmt->bind_param("is", $student_id, $date);
    $check_stmt->execute();
    $check_result = $check_stmt->get_result();

    if ($check_result->num_rows > 0) {
        echo "<script>alert('Attendance already marked for this student today.');</script>";
    } else {
        $insert_sql = "INSERT INTO attendance (student_id, date, present) VALUES (?, ?, 1)";
        $insert_stmt = $conn->prepare($insert_sql);
        $insert_stmt->bind_param("is", $student_id, $date);

        if ($insert_stmt->execute()) {
            echo "<script>alert('Attendance marked successfully.');</script>";
        } else {
            echo "<script>alert('Error: " . $insert_stmt->error . "');</script>";
        }
        $insert_stmt->close();
    }
    $check_stmt->close();

}

// Handle attendance viewing
if (isset($_GET['view_attendance'])) {
    $view_student_id = $_GET['student_id'];
    $view_date_from = $_GET['date_from'];
    $view_date_to = $_GET['date_to'];

    $view_sql = "SELECT * FROM attendance WHERE student_id = ? AND date BETWEEN ? AND ?";
    $view_stmt = $conn->prepare($view_sql);
    $view_stmt->bind_param("iss", $view_student_id, $view_date_from, $view_date_to);
    $view_stmt->execute();
    $view_result = $view_stmt->get_result();
}

// Fetch all students for the attendance marking form
$students_sql = "SELECT * FROM students";
$students_result = $conn->query($students_sql);

?>

<!DOCTYPE html>
<html>
<head>
    <title>Attendance Management System</title>
</head>
<body>

    <h2>Mark Attendance</h2>
    <form method="post">
        <label for="student_id">Student ID:</label>
        <select name="student_id" id="student_id">
            <?php
            if ($students_result->num_rows > 0) {
                while ($row = $students_result->fetch_assoc()) {
                    echo "<option value='" . $row["id"] . "'>" . $row["name"] . " (" . $row["id"] . ")</option>";
                }
            } else {
                echo "<option value=''>No students found</option>";
            }
            ?>
        </select><br><br>
        <input type="submit" name="mark_attendance" value="Mark Present">
    </form>

    <h2>View Attendance</h2>
    <form method="get">
        <label for="student_id">Student ID:</label>
        <input type="number" name="student_id" id="student_id" required><br><br>
        <label for="date_from">From Date:</label>
        <input type="date" name="date_from" id="date_from" required><br><br>
        <label for="date_to">To Date:</label>
        <input type="date" name="date_to" id="date_to" required><br><br>
        <input type="submit" name="view_attendance" value="View Attendance">
    </form>

    <?php if (isset($view_result) && $view_result->num_rows > 0): ?>
        <h2>Attendance Records</h2>
        <table border="1">
            <tr>
                <th>Date</th>
                <th>Present</th>
            </tr>
            <?php while ($row = $view_result->fetch_assoc()): ?>
                <tr>
                    <td><?php echo $row['date']; ?></td>
                    <td><?php echo $row['present'] == 1 ? 'Yes' : 'No'; ?></td>
                </tr>
            <?php endwhile; ?>
        </table>
    <?php elseif (isset($view_result)): ?>
        <p>No attendance records found.</p>
    <?php endif; ?>

</body>
</html>

<?php
$conn->close();
?>
