import pandas as pd
import sqlite3
import os

df = pd.read_csv('agg_exp_2.csv')

db_path = os.path.join(os.path.dirname(os.getcwd()), "db.sqlite")
conn = sqlite3.connect(db_path)

cursor = conn.cursor()

df.to_sql('aggregated_experts', conn, if_exists='append', index=False)

cursor.execute("SELECT * FROM aggregated_experts LIMIT 10")