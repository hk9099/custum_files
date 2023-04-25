import pandas as pd
import numpy as np
a = "/home/ubuntu/Documents/store_code/Location Page on AWS.csv"

df = pd.read_csv(a)
data = df.values.tolist()

print(data)

for row in data:
    print(row)