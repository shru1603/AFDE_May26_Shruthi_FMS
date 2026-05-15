# API Documentation — Feedback Management System

**Base URL:** `http://127.0.0.1:8000`  
**Interactive Docs:** `http://127.0.0.1:8000/docs` (Swagger UI)

---

## Endpoints Overview

| Method | Endpoint                  | Description                     |
|--------|---------------------------|---------------------------------|
| GET    | `/`                       | Health check                    |
| POST   | `/feedback`               | Submit new feedback             |
| GET    | `/feedback`               | Get all feedback                |
| GET    | `/feedback/{feedback_id}` | Get feedback by ID              |
| PUT    | `/feedback/{feedback_id}` | Update feedback by ID           |
| DELETE | `/feedback/{feedback_id}` | Delete feedback by ID           |
| GET    | `/search`                 | Search and filter feedback      |
| GET    | `/stats`                  | Get dashboard statistics        |

---

## Data Models

### FeedbackCreate (Request Body)

| Field              | Type    | Required | Description                        |
|--------------------|---------|----------|------------------------------------|
| `participant_name` | string  | Yes      | Name of the participant            |
| `program_name`     | string  | Yes      | Name of the training/event/product |
| `rating`           | integer | Yes      | Rating from 1 (Poor) to 5 (Excellent) |
| `comments`         | string  | No       | Optional feedback comments         |

### FeedbackUpdate (Request Body)

All fields are optional. Only provided fields are updated.

| Field              | Type    | Required | Description              |
|--------------------|---------|----------|--------------------------|
| `participant_name` | string  | No       | Updated participant name |
| `program_name`     | string  | No       | Updated program name     |
| `rating`           | integer | No       | Updated rating (1–5)     |
| `comments`         | string  | No       | Updated comments         |

### FeedbackResponse

| Field              | Type     | Description                        |
|--------------------|----------|------------------------------------|
| `feedback_id`      | integer  | Auto-generated unique ID           |
| `participant_name` | string   | Name of the participant            |
| `program_name`     | string   | Name of the training/event/product |
| `rating`           | integer  | Rating (1–5)                       |
| `comments`         | string   | Feedback comments (nullable)       |
| `submitted_at`     | datetime | Timestamp of submission (UTC)      |

---

## Endpoints

---

### 1. Health Check

**GET** `/`

Returns a message confirming the API is running.

**Response — 200 OK**
```json
{
  "message": "Feedback Management System API is running"
}
```

---

### 2. Submit Feedback

**POST** `/feedback`

Creates a new feedback entry.

**Request Body**
```json
{
  "participant_name": "Shruthi B",
  "program_name": "Python Fundamentals",
  "rating": 5,
  "comments": "Very well structured and engaging session."
}
```

**Response — 201 Created**
```json
{
  "feedback_id": 1,
  "participant_name": "Shruthi B",
  "program_name": "Python Fundamentals",
  "rating": 5,
  "comments": "Very well structured and engaging session.",
  "submitted_at": "2026-05-15T10:30:00"
}
```

**Error — 400 Bad Request** *(rating not between 1 and 5)*
```json
{
  "detail": "Rating must be between 1 and 5"
}
```

---

### 3. Get All Feedback

**GET** `/feedback`

Returns a list of all feedback entries, ordered by submission time.

**Response — 200 OK**
```json
[
  {
    "feedback_id": 1,
    "participant_name": "Shruthi B",
    "program_name": "Python Fundamentals",
    "rating": 5,
    "comments": "Very well structured and engaging session.",
    "submitted_at": "2026-05-15T10:30:00"
  },
  {
    "feedback_id": 2,
    "participant_name": "Rahul M",
    "program_name": "React Workshop",
    "rating": 4,
    "comments": "Good content, could use more examples.",
    "submitted_at": "2026-05-15T11:00:00"
  }
]
```

Returns an empty array `[]` if no feedback exists.

---

### 4. Get Feedback by ID

**GET** `/feedback/{feedback_id}`

Returns a single feedback entry matching the given ID.

**Path Parameter**

| Parameter     | Type    | Description         |
|---------------|---------|---------------------|
| `feedback_id` | integer | ID of the feedback  |

**Request Example**
```
GET /feedback/1
```

**Response — 200 OK**
```json
{
  "feedback_id": 1,
  "participant_name": "Shruthi B",
  "program_name": "Python Fundamentals",
  "rating": 5,
  "comments": "Very well structured and engaging session.",
  "submitted_at": "2026-05-15T10:30:00"
}
```

**Error — 404 Not Found**
```json
{
  "detail": "Feedback with id 1 not found"
}
```

---

### 5. Update Feedback

**PUT** `/feedback/{feedback_id}`

Updates one or more fields of an existing feedback entry. Only the fields included in the request body are updated.

**Path Parameter**

| Parameter     | Type    | Description         |
|---------------|---------|---------------------|
| `feedback_id` | integer | ID of the feedback  |

**Request Body** *(partial update example)*
```json
{
  "rating": 4,
  "comments": "Updated: Very good session overall."
}
```

**Response — 200 OK**
```json
{
  "feedback_id": 1,
  "participant_name": "Shruthi B",
  "program_name": "Python Fundamentals",
  "rating": 4,
  "comments": "Updated: Very good session overall.",
  "submitted_at": "2026-05-15T10:30:00"
}
```

**Error — 404 Not Found**
```json
{
  "detail": "Feedback with id 1 not found"
}
```

**Error — 400 Bad Request** *(invalid rating)*
```json
{
  "detail": "Rating must be between 1 and 5"
}
```

---

### 6. Delete Feedback

**DELETE** `/feedback/{feedback_id}`

Permanently deletes a feedback entry.

**Path Parameter**

| Parameter     | Type    | Description         |
|---------------|---------|---------------------|
| `feedback_id` | integer | ID of the feedback  |

**Request Example**
```
DELETE /feedback/1
```

**Response — 200 OK**
```json
{
  "message": "Feedback deleted successfully"
}
```

**Error — 404 Not Found**
```json
{
  "detail": "Feedback with id 1 not found"
}
```

---

### 7. Search and Filter Feedback

**GET** `/search`

Returns feedback filtered by any combination of keyword, rating, and program name. All query parameters are optional.

**Query Parameters**

| Parameter      | Type    | Required | Description                                      |
|----------------|---------|----------|--------------------------------------------------|
| `keyword`      | string  | No       | Searches in participant name, program name, and comments |
| `rating`       | integer | No       | Filter by exact rating (1–5)                     |
| `program_name` | string  | No       | Filter by program/event name (partial match)     |

**Request Examples**

Filter by keyword:
```
GET /search?keyword=python
```

Filter by rating:
```
GET /search?rating=5
```

Filter by program name:
```
GET /search?program_name=React Workshop
```

Combined filters:
```
GET /search?keyword=good&rating=4&program_name=React Workshop
```

**Response — 200 OK**
```json
[
  {
    "feedback_id": 2,
    "participant_name": "Rahul M",
    "program_name": "React Workshop",
    "rating": 4,
    "comments": "Good content, could use more examples.",
    "submitted_at": "2026-05-15T11:00:00"
  }
]
```

Returns an empty array `[]` if no results match.

---

### 8. Dashboard Statistics

**GET** `/stats`

Returns aggregated statistics and the 5 most recent feedback entries for the admin dashboard.

**Response — 200 OK**
```json
{
  "total": 10,
  "avg_rating": 4.2,
  "recent": [
    {
      "feedback_id": 10,
      "participant_name": "Anita R",
      "program_name": "Data Science Bootcamp",
      "rating": 5,
      "comments": "Excellent hands-on experience.",
      "submitted_at": "2026-05-15T14:00:00"
    },
    {
      "feedback_id": 9,
      "participant_name": "Kiran S",
      "program_name": "React Workshop",
      "rating": 4,
      "comments": null,
      "submitted_at": "2026-05-15T13:30:00"
    }
  ]
}
```

| Field        | Type    | Description                              |
|--------------|---------|------------------------------------------|
| `total`      | integer | Total number of feedback entries         |
| `avg_rating` | float   | Average rating rounded to 1 decimal place |
| `recent`     | array   | Up to 5 most recent feedback entries     |

---

## Rating Scale

| Value | Label     |
|-------|-----------|
| 1     | Poor      |
| 2     | Fair      |
| 3     | Good      |
| 4     | Very Good |
| 5     | Excellent |

---

## Error Reference

| Status Code | Meaning                                           |
|-------------|---------------------------------------------------|
| 200         | Success                                           |
| 201         | Resource created successfully                     |
| 400         | Bad request (e.g. invalid rating value)           |
| 404         | Resource not found (feedback ID does not exist)   |
| 422         | Validation error (missing required fields)        |
