from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics.pairwise import cosine_similarity

app = Flask(__name__)
CORS(app)

# -------------------------
# LOAD DATA ONCE
# -------------------------

df = pd.read_csv("DATASET.csv")
df["ORIGINAL_PRICE"] = df["PRICE"]

df["DISTANCE"] = (
    df["DISTANCE"]
    .astype(str)
    .str.extract(r'([\d.]+)')[0]
)

df["DISTANCE"] = df["DISTANCE"].astype(float)

# -------------------------
# NORMALIZATION
# -------------------------

price_scaler = MinMaxScaler()
df[["PRICE"]] = price_scaler.fit_transform(df[["PRICE"]])

rating_scaler = MinMaxScaler()
df[["RATING"]] = rating_scaler.fit_transform(df[["RATING"]])

# -------------------------
# ONE HOT ENCODING
# -------------------------

df = pd.get_dummies(
    df,
    columns=["luxury"]
)

# -------------------------
# HOME ROUTE
# -------------------------

@app.route("/")
def home():
    return "Hotel Recommendation API Running"

# -------------------------
# RECOMMENDATION ROUTE
# -------------------------

@app.route("/recommend", methods=["POST"])
def recommend():

    data = request.json

    wifi = int(data["wifi"])
    pool = int(data["pool"])
    parking = int(data["parking"])
    family_friendly = int(data["family_friendly"])

    price = float(data["price"])
    rating = float(data["rating"])

    luxury = data["luxury"]
    city = data["city"]

    filtered_df = df[
        df["CITY"].str.lower() == city.lower()
    ].copy()

    if len(filtered_df) == 0:
        return jsonify(
            {"error": "City not found"}
        ), 404

    

    normalized_price = (
        price_scaler.transform([[price]])[0][0]
    )

    normalized_rating = (
        rating_scaler.transform([[rating]])[0][0]
    )
    max_price = normalized_price + 0.10
    min_price = normalized_price - 0.10

    filtered_df = filtered_df[
    (filtered_df["PRICE"] >= min_price) &
    (filtered_df["PRICE"] <= max_price)
    ]

    if len(filtered_df) == 0:
     return jsonify([])
      
    features = filtered_df.drop(
        columns=[
            "CITY",
            "HOTEL",
            "LOCATION",
            "WEBSITE LINK",
            "IMAGE LINK"
        ]
    )

    features = features.fillna(0)
    features["PRICE"] = features["PRICE"] * 5
    features["RATING"] = features["RATING"] * 2

    user_data = dict.fromkeys(
        features.columns,
        0
    )

    user_data["wifi"] = wifi
    user_data["pool"] = pool
    user_data["parking"] = parking
    user_data["family_friendly"] = family_friendly

    user_data["PRICE"] = normalized_price * 5
    user_data["RATING"] = normalized_rating * 2

    if luxury.upper() == "BUDGET":
        user_data["luxury_Budget"] = 1

    elif luxury.upper() == "MID RANGE":
        user_data["luxury_Mid-range"] = 1

    elif luxury.upper() == "LUXURY":
        user_data["luxury_Luxury"] = 1

    user_vector = pd.DataFrame(
        [user_data]
    )

    user_similarity = cosine_similarity(
        user_vector,
        features
    )

    user_similarity = user_similarity.flatten()

    filtered_df["similarity score"] = user_similarity
    filtered_df["price_diff"] = abs(
    filtered_df["PRICE"] - normalized_price
)

    filtered_df["final_score"] = (
    filtered_df["similarity score"]
    - filtered_df["price_diff"] * 3
)

    top_hotels = (
        filtered_df
        .sort_values(
       by="final_score",
       ascending=False
     )
        .head(10)
    )
    top_hotels = top_hotels.fillna("")

    return jsonify(
        top_hotels[
            [
                "HOTEL",
                "CITY",
                "LOCATION",
                "RATING",
                "ORIGINAL_PRICE",
                "WEBSITE LINK",
                "IMAGE LINK"
            ]
        ].to_dict(
            orient="records"
        )
    )

# -------------------------
# RUN APP
# -------------------------

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)