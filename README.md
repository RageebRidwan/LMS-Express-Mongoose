# 📚 Library Management System API

A RESTful API for managing books and borrowing in a library, built with **Express**, **TypeScript**, and **MongoDB** (Mongoose).

---

## 🚀 Features

- 📖 Create, read, update, delete (CRUD) books
- 🧠 Mongoose schema validation with error formatting
- 📦 Borrow books with business logic validation
  - Checks available copies
  - Deducts quantity and updates availability
- 📊 Aggregation for borrowed book summaries
- 📌 Filtering, sorting, pagination for books
- 🧪 Mongoose pre/post middleware and static/instance methods

---

## 📁 Project Structure
```
src/
├── config/ # Environment & config
├── modules/
│ ├── book/ # Book model, controller, routes, interface
│ ├── borrow/ # Borrow model, controller, routes, interface
│ └── routes/ # All route mappings
├── utils/ # Response formatters
├── server.ts # App entry point
```
