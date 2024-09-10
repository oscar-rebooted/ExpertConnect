import random
from faker import Faker
import json
from datetime import datetime
import pandas as pd

# Initialize Faker
fake = Faker()

# Function to create a dummy experience entry
def create_experience():
    return json.dumps([{
        "id": fake.uuid4(),
        "title": fake.job(),
        "company": fake.company(),
        "duration": f"{random.randint(1, 10)} years"
    }])

# List of possible networks, countries, and organizations
networks = ["AlphaSights", "Dialectica", "Guidepoint", "Third Bridge"]
countries = ["United States", "Austria", "Japan", "Italy", "Germany", "France", "Canada", "United Kingdom", "Australia", "Switzerland", "Spain", "Portugal", "Belgium", "Netherlands", "Sweden", "Norway", "Denmark", "Finland", "Iceland", "Ireland", "Malta", "Cyprus", "Luxembourg"]
perspective = ["Customer", "Competitor", "Former"]

# Generate 50 new rows
new_rows = []
for _ in range(250):
    new_rows.append({
        "id": random.randint(1, 99999),
        "network": random.choice(networks),
        "perspective": random.choice(perspective),
        "name": fake.name(),
        "title": fake.job(),
        "organization": fake.company(),
        "country": random.choice(countries),
        "experience": json.dumps([create_experience() for _ in range(random.randint(3, 8))]),
        "last_updated": datetime.now().isoformat()
    })

# Convert to DataFrame
df = pd.DataFrame(new_rows)

# Save the updated DataFrame to a new CSV file
output_file_path = 'agg_exp_2.csv'
df.to_csv(output_file_path, index=False)