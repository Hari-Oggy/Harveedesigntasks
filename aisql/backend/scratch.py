import pandas as pd
_NULL_STRINGS = {"", "null", "none", "n/a", "na", "nan", "#n/a", "#na", "nil"}
df = pd.DataFrame({"val": ["N/A", "NULL", "none", "nan", "", "real_value"]})

str_cols = df.select_dtypes(include=["object"]).columns
for col in str_cols:
    df[col] = df[col].astype(str).str.strip()

for col in str_cols:
    df[col] = df[col].apply(
        lambda v: None if (isinstance(v, str) and v.lower() in _NULL_STRINGS) else v
    )

df = df.infer_objects()

# Drop fully duplicate rows
before = len(df)
df = df.drop_duplicates()
after = len(df)
df = df.reset_index(drop=True)

print(df["val"].isna().sum())
print(df["val"].tolist())
print(len(df))
