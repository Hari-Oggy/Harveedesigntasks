# Sample Datasets

This directory contains sample datasets for testing and demonstrating the AI SQL Assistant.

## Available Datasets

### `customers.csv`
**50 customer records** with revenue, city, and signup information.

| Column | Type | Description |
|--------|------|-------------|
| `name` | Text | Customer full name |
| `age` | Number | Customer age |
| `city` | Text | City of residence |
| `revenue` | Number | Total revenue generated |
| `signup_date` | Date | Account signup date |
| `is_premium` | Boolean | Premium membership status |

**Try these queries:**
- *"Show top 10 customers by revenue"*
- *"How many customers are in each city?"*
- *"What is the average revenue for premium vs non-premium customers?"*
- *"Show customers who signed up in 2023"*
- *"Which city has the highest total revenue?"*

---

### `sales_orders.csv`
**72 sales orders** spanning Jan–Dec 2024 across regions, products, and salespersons.

| Column | Type | Description |
|--------|------|-------------|
| `order_id` | Text | Unique order identifier |
| `customer_name` | Text | Customer name |
| `product` | Text | Product purchased |
| `category` | Text | Product category |
| `quantity` | Number | Units ordered |
| `unit_price` | Number | Price per unit |
| `total_amount` | Number | Order total |
| `order_date` | Date | Order date |
| `region` | Text | Sales region (North/South/East/West) |
| `salesperson` | Text | Assigned salesperson |

**Try these queries:**
- *"Show top 10 orders by total amount"*
- *"Which month generated the highest total sales?"*
- *"What is the total revenue by product category?"*
- *"Show all Electronics orders over $2000"*
- *"Which salesperson has the highest total revenue?"*
- *"Find all orders from the North region in Q1 2024"*
- *"What is the average order value by region?"*
- *"Show monthly sales trend for 2024"*

---

## Adding Your Own Data

Upload any CSV or Excel file through the app UI. The system will:
1. Automatically detect column types
2. Create a PostgreSQL table
3. Load your data
4. Enable natural language queries

**Supported formats:** `.csv`, `.xlsx`, `.xls` (max 50MB)
