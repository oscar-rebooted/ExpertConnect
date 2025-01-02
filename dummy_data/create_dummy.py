import random
from faker import Faker
import json
from datetime import datetime

# Initialize Faker
fake = Faker()

# Function to create a dummy experience entry
def create_experience():
    return {
        "id": fake.uuid4(),
        "title": fake.job(),
        "company": fake.company(),
        "duration": f"{random.randint(1, 10)} years"
    }

# Function to create availability blocks (day and time slots)
def create_availability():
    days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
    slots = ["9 AM - 11 AM", "11 AM - 1 PM", "2 PM - 4 PM", "4 PM - 6 PM"]
    day = random.choice(days)
    available_slots = random.sample(slots, k=random.randint(1, 3))  # Select 1 to 3 slots
    return {"day": day, "slots": available_slots}

# List of possible networks, countries, and organizations
networks = ["AlphaSights", "Dialectica", "Guidepoint", "Third Bridge"]
countries = ["United States", "Austria", "Japan", "Italy", "Germany", "France", "Canada", "United Kingdom", "Australia", "Switzerland", "Spain", "Portugal", "Belgium", "Netherlands", "Sweden", "Norway", "Denmark", "Finland", "Iceland", "Ireland", "Malta", "Cyprus", "Luxembourg"]
perspective = ["Customer", "Competitor", "Former"]

# Generate 50 new rows
new_rows = []
for _ in range(250):
    new_rows.append({
        "id": random.randint(1, 99999),
        "name": fake.name(),
        "title": fake.job(),
        "company": fake.company(),
        "network": random.choice(networks),
        "country": random.choice(countries),
        "perspective": random.choice(perspective),
        "availability": random.choice(["Next week", "This week", "Available"]),
        "experience": [
            create_experience() for _ in range(random.randint(3, 5))  # Generate 3 to 5 experience entries
        ],
        "availabilityBlocks": [
            create_availability() for _ in range(random.randint(1, 4))  # Generate 1 to 4 availability blocks
        ],
        "last_updated": datetime.now().isoformat()
    })

output_file_path = 'experts.json'
with open(output_file_path, 'w') as f:
    json.dump(new_rows, f, indent=4)