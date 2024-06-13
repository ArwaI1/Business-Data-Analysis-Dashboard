from flask import Flask, jsonify, render_template
import sqlite3
import pandas as pd
from sqlalchemy import create_engine

def create_connection(db_file):
    conn = None
    try:
        conn = sqlite3.connect(db_file)
    except:
        print("db not exist")
    
    return conn


df = pd.read_csv("company.csv")
# print(df)
con = create_connection("my.db")

df.to_sql('company_data', con, if_exists='replace')
con.close();

db_url = 'sqlite:///my.db'
engine = create_engine(db_url, echo= True)
df_2 = pd.read_sql('select * from company_data', engine)
print(df_2)

app = Flask(__name__)

@app.route("/")
def homepage():
    return render_template("index.html")

@app.route('/get-d')
def get_data():
    data = [
    {"status": branches,
     "value": int(total)}
    for branches, total in df_2.groupby('Branch')['Total'].sum().items() ]
    return jsonify(data)


@app.route('/get-d1')
def get_data1():
    piedata = []
    categories = df_2["Product line"].value_counts().index
    values = df_2["Product line"].value_counts().values
    for i in range (len(categories)):
        piedata.append({"category":categories[i], "value": int (values[i])})
    return jsonify(piedata)

@app.route('/get-d2')
def get_data2():
    scatterdata = [
    {"x": rating, "y": margin, "color": '#4233b6', "value": 10}
    for rating, margin in zip(df_2["Rating"], df_2["gross margin percentage"])
    ]
    return jsonify(scatterdata)



@app.route('/get-d3')
def get_data3():
    # Read the CSV file
    df = pd.read_csv('company.csv', parse_dates=['Date'], dayfirst=True)

    # Group the data by date and calculate the sum of the 'Total' column
    grouped_data = df.groupby('Date')['Total'].sum().reset_index()

    # Convert the grouped data to a list of dictionaries
    linedata = [
        {"Date": date.strftime('%d-%m-%Y'), "value": int(total)}
        for date, total in zip(pd.to_datetime(grouped_data['Date']), grouped_data['Total'])
    ]
    return jsonify(linedata)


@app.route('/get-data8')
def get_data8():
    donutdata = []
    categories = df_2["Customer type"].value_counts().index
    values = df_2["Customer type"].value_counts().values
    for i in range (len(categories)):
        donutdata.append({"category":categories[i], "value": int (values[i])})
    return jsonify(donutdata)

@app.route('/get_data9')
def get_data9():
    humandata = []
    categories = df_2["Gender"].value_counts().index
    values = df_2["Gender"].value_counts().values
    for i in range (len(categories)):
        humandata.append({"value": int (values[i]), "category": categories[i]})
    return jsonify(humandata)



@app.route('/get-d_chart5')
def get_data_5():
     data50 = []
     product_line_data = df_2.groupby('Product line')[['Unit price', 'Quantity']].mean().reset_index()

     for index, row in product_line_data.iterrows():
        data50.append({
            "category": row["Product line"],
            "unit_price": row["Unit price"],
            "quantity": row["Quantity"]
        })

     return jsonify(data50)

if __name__ == "__main__":
    app.run(debug=True) 

