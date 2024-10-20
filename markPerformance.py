import csv

class StudentPerformanceTracker:
    def __init__(self):
        self.student_data = {}

    def add_student(self, student_name):
        if student_name not in self.student_data:
            self.student_data[student_name] = []
            print(f"Added student: {student_name}")
        else:
            print(f"Student {student_name} already exists.")

    def record_score(self, student_name, chapter, score):
        if student_name in self.student_data:
            self.student_data[student_name].append({'chapter': chapter, 'score': score})
            print(f"Recorded score of {score} for {student_name} in chapter {chapter}.")
        else:
            print(f"Student {student_name} not found. Please add them first.")

    def display_performance(self, student_name):
        if student_name in self.student_data:
            print(f"Performance for {student_name}:")
            for record in self.student_data[student_name]:
                print(f"Chapter: {record['chapter']}, Score: {record['score']}")
        else:
            print(f"Student {student_name} not found.")

    def save_to_csv(self, filename):
        with open(filename, mode='w', newline='') as file:
            writer = csv.writer(file)
            writer.writerow(["Student Name", "Chapter", "Score"])
            for student, records in self.student_data.items():
                for record in records:
                    writer.writerow([student, record['chapter'], record['score']])
        print(f"Data saved to {filename}")

   

