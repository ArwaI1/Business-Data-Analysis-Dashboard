
![file_2024-06-13_21 35 22](https://github.com/ArwaI1/Business-Data-Analysis-Dashboard/assets/132764476/db086235-f8b1-48c7-b7fc-f12033c7bebf)


# Business-Data-Analysis-Dashboard
A comprehensive data visualization dashboard built with Flask and amCharts 5. The dashboard features scatter plots, pie charts, bar charts, donut charts, and more, providing insights into company sales data including customer demographics, sales trends, and product performance.
# amcharts5-flask-dashboard

This repository contains a data visualization dashboard built using Flask and amCharts 5. The dashboard provides various visualizations, including scatter plots, pie charts, bar charts, donut charts, and human charts, based on a company's sales data.

## Features

- **Scatter Plot**: Visualize the relationship between rating and gross margin percentage.
- **Pie Chart**: Display the distribution of different product lines.
- **Bar Chart**: Show total sales for each branch.
- **Donut Chart**: Illustrate the customer type distribution.
- **Human Chart**: Represent gender distribution.
- **Line Chart**: Track total sales over time.

## Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/amcharts5-flask-dashboard.git
    cd amcharts5-flask-dashboard
    ```

2. **Set up a virtual environment**:
    ```bash
    python -m venv venv
    source venv/bin/activate   # On Windows use `venv\Scripts\activate`
    ```

3. **Install dependencies**:
    ```bash
    pip install -r requirements.txt
    ```

4. **Prepare the database**:
    ```bash
    python setup_db.py
    ```

## Usage

1. **Run the Flask application**:
    ```bash
    flask run
    ```

2. **Open the dashboard**:
    Navigate to `http://127.0.0.1:5000` in your web browser to view the dashboard.

## Data

The data used for this project is stored in a CSV file named `company.csv` and consists of the following columns:
- Invoice ID
- Branch
- City
- Customer type
- Gender
- Product line
- Unit price
- Quantity
- Tax 5%
- Total
- Date
- Time
- Payment
- cogs
- gross margin percentage
- gross income
- Rating

## Endpoints

- `/get-d`: Returns total sales for each branch.
- `/get-d1`: Returns the distribution of product lines.
- `/get-d2`: Returns data for the scatter plot (rating vs. gross margin percentage).
- `/get-d3`: Returns total sales over time.
- `/get-data8`: Returns customer type distribution.
- `/get_data9`: Returns gender distribution.
- `/get-d_chart5`: Returns average unit price and quantity per product line.

